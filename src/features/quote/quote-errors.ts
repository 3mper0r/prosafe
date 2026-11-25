import { formatMessage } from "@/i18n/format";
import type { QuoteErrorCode, QuoteErrors, QuoteFieldError } from "./request/types";

const ERROR_FIELDS = ["company", "contact", "email", "phone", "city", "requirements", "consent", "items", "website", "locale"] as const;

/** Accept only well-formed field errors with a known code from an API validation response. */
export function readServerErrors(raw: unknown, known: Record<QuoteErrorCode, string>): QuoteErrors {
  const next: QuoteErrors = {};
  if (!raw || typeof raw !== "object") return next;
  for (const [key, value] of Object.entries(raw)) {
    if (!(ERROR_FIELDS as readonly string[]).includes(key) || !value || typeof value !== "object" || !("code" in value) || typeof value.code !== "string" || !Object.hasOwn(known, value.code)) continue;
    const max = "params" in value && value.params && typeof value.params === "object" && "max" in value.params && typeof value.params.max === "number" ? value.params.max : undefined;
    next[key as (typeof ERROR_FIELDS)[number]] = { code: value.code as QuoteErrorCode, ...(max === undefined ? {} : { params: { max } }) };
  }
  return next;
}

/** Localized text for a field error, using the dictionary's `quote.form.validation` templates. */
export function quoteErrorText(messages: Record<QuoteErrorCode, string>, error: QuoteFieldError | undefined): string {
  return error ? formatMessage(messages[error.code], { max: error.params?.max ?? "" }) : "";
}
