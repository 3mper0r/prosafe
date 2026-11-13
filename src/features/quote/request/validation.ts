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
      errors[field] = "Enter a valid text value.";
      return "";
    }
    // Bound raw input too, so normalization cannot hide excessive input.
    if (raw.length > QUOTE_LIMITS[field]) errors[field] = `Use ${QUOTE_LIMITS[field]} characters or fewer.`;
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(raw)) errors[field] = "Remove unsupported control characters.";
    if (field !== "requirements" && /[\r\n]/u.test(raw)) errors[field] = "Use a single line.";
    const value = field === "requirements"
      ? raw.normalize("NFKC").replace(/\r\n?/gu, "\n").trim()
      : raw.normalize("NFKC").trim().replace(/\s+/gu, " ");
    if (value.length > QUOTE_LIMITS[field]) errors[field] = `Use ${QUOTE_LIMITS[field]} characters or fewer.`;
    if (required && !value) errors[field] = "This field is required.";
    return value;
  }
  const company = text("company", true);
  const contact = text("contact", true);
  const emailInput = text("email", true);
  const at = emailInput.lastIndexOf("@");
  const email = at >= 0 ? emailInput.slice(0, at) + emailInput.slice(at).toLowerCase() : emailInput;
  if (email && !isQuoteEmail(email)) errors.email = "Enter a valid business email address.";
  const phone = text("phone");
  const city = text("city");
  const requirements = text("requirements");
  if (data.consent !== true) errors.consent = "Your privacy consent is required to submit this request.";
  if (data.website !== undefined && (typeof data.website !== "string" || data.website !== "")) errors.website = "Unable to submit this request. Please try again.";
  const items: QuoteRequest["items"] = [];
  const seen = new Set<string>();
  const allowed = new Set(knownProductIds);
  let total = 0;
  if (!Array.isArray(data.items) || data.items.length < 1) {
    errors.items = "Select at least one product before requesting a quote.";
  } else if (data.items.length > QUOTE_LIMITS.maxItems) {
    errors.items = `Select no more than ${QUOTE_LIMITS.maxItems} products.`;
  } else {
    const candidates: unknown[] = data.items;
    for (const candidate of candidates) {
      if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
        errors.items = "Your product selection is invalid. Review the selected items.";
        continue;
      }
      const item = candidate as Record<string, unknown>;
      if (typeof item.productId !== "string" || !allowed.has(item.productId)) {
        errors.items = "A selected product is unavailable. Review your selection.";
        continue;
      }
      if (seen.has(item.productId)) errors.items = "Each product may appear only once. Adjust its quantity instead.";
      seen.add(item.productId);
      if (typeof item.quantity !== "number" || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > QUOTE_LIMITS.maxQuantity) {
        errors.items = `Each quantity must be a whole number from 1 to ${QUOTE_LIMITS.maxQuantity}.`;
        continue;
      }
      total += item.quantity;
      items.push({ productId: item.productId, quantity: item.quantity });
    }
  }
  if (total > QUOTE_LIMITS.maxTotalQuantity) errors.items = `The selection cannot exceed ${QUOTE_LIMITS.maxTotalQuantity} total units.`;
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { company, contact, email, phone, city, requirements, consent: true, website: "", items } };
}
