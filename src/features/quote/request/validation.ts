import { isLocale } from "@/i18n/config";
import { QUOTE_LIMITS } from "./limits";
import type { QuoteErrors, QuoteRequest } from "./types";

export function isQuoteEmail(value: string): boolean {
  if (value.length > QUOTE_LIMITS.email || /[\s\u0000-\u001f\u007f]/u.test(value)) return false;
  const parts = value.split("@");
  if (parts.length !== 2 || parts[0].length > 64) return false;
  return /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/u.test(parts[0])
    && !parts[0].startsWith(".") && !parts[0].endsWith(".") && !parts[0].includes("..")
    && /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/u.test(parts[1]);
}

export function validateQuoteRequest(input: unknown, knownProductIds: readonly string[]):
  | { ok: true; value: QuoteRequest }
  | { ok: false; errors: QuoteErrors } {
  const errors: QuoteErrors = {};
  const data = input && typeof input === "object" && !Array.isArray(input)
    ? input as Record<string, unknown>
    : {};
  function text(field: "company" | "contact" | "email" | "phone" | "city" | "requirements", required = false) {
    const raw = data[field];
    if (raw === undefined && !required) return "";
    if (typeof raw !== "string") {
      errors[field] = { code: "invalid_text" };
      return "";
    }
    // Bound raw input too, so normalization cannot hide excessive input.
    if (raw.length > QUOTE_LIMITS[field]) errors[field] = { code: "too_long", params: { max: QUOTE_LIMITS[field] } };
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(raw)) errors[field] = { code: "control_characters" };
    if (field !== "requirements" && /[\r\n]/u.test(raw)) errors[field] = { code: "single_line" };
    const value = field === "requirements"
      ? raw.normalize("NFKC").replace(/\r\n?/gu, "\n").trim()
      : raw.normalize("NFKC").trim().replace(/\s+/gu, " ");
    if (value.length > QUOTE_LIMITS[field]) errors[field] = { code: "too_long", params: { max: QUOTE_LIMITS[field] } };
    if (required && !value) errors[field] = { code: "required" };
    return value;
  }
  const company = text("company", true);
  const contact = text("contact", true);
  const emailInput = text("email", true);
  const at = emailInput.lastIndexOf("@");
  const email = at >= 0 ? emailInput.slice(0, at) + emailInput.slice(at).toLowerCase() : emailInput;
  if (email && !isQuoteEmail(email)) errors.email = { code: "invalid_email" };
  const phone = text("phone");
  const city = text("city");
  const requirements = text("requirements");
  if (data.consent !== true) errors.consent = { code: "consent_required" };
  if (data.website !== undefined && (typeof data.website !== "string" || data.website !== "")) errors.website = { code: "rejected" };
  const items: QuoteRequest["items"] = [];
  const seen = new Set<string>();
  const allowed = new Set(knownProductIds);
  let total = 0;
  if (!Array.isArray(data.items) || data.items.length < 1) {
    errors.items = { code: "items_required" };
  } else if (data.items.length > QUOTE_LIMITS.maxItems) {
    errors.items = { code: "items_too_many", params: { max: QUOTE_LIMITS.maxItems } };
  } else {
    const candidates: unknown[] = data.items;
    for (const candidate of candidates) {
      if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
        errors.items = { code: "items_invalid" };
        continue;
      }
      const item = candidate as Record<string, unknown>;
      if (typeof item.productId !== "string" || !allowed.has(item.productId)) {
        errors.items = { code: "item_unavailable" };
        continue;
      }
      if (seen.has(item.productId)) errors.items = { code: "item_duplicate" };
      seen.add(item.productId);
      if (typeof item.quantity !== "number" || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > QUOTE_LIMITS.maxQuantity) {
        errors.items = { code: "item_quantity", params: { max: QUOTE_LIMITS.maxQuantity } };
        continue;
      }
      total += item.quantity;
      items.push({ productId: item.productId, quantity: item.quantity });
    }
  }
  if (total > QUOTE_LIMITS.maxTotalQuantity) errors.items = { code: "items_total", params: { max: QUOTE_LIMITS.maxTotalQuantity } };
  // Optional preferred language; requests that omit it remain valid and unchanged.
  const locale = data.locale;
  if (locale !== undefined && (typeof locale !== "string" || !isLocale(locale))) errors.locale = { code: "invalid_locale" };
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { company, contact, email, phone, city, requirements, consent: true, website: "", items, ...(typeof locale === "string" && isLocale(locale) ? { locale } : {}) } };
}
