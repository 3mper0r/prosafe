import type { Locale } from "@/i18n/config";

export type QuoteRequest = {
  company: string;
  contact: string;
  email: string;
  phone: string;
  city: string;
  requirements: string;
  consent: true;
  website: string;
  items: { productId: string; quantity: number }[];
  /** Optional preferred response language. Omitted when the client did not send it. */
  locale?: Locale;
};

/**
 * Language-independent validation error codes. The client renders them through
 * the `quote.form.validation` dictionary; `params` carries interpolated limits.
 */
export type QuoteErrorCode =
  | "invalid_text"
  | "too_long"
  | "control_characters"
  | "single_line"
  | "required"
  | "invalid_email"
  | "consent_required"
  | "rejected"
  | "items_required"
  | "items_too_many"
  | "items_invalid"
  | "item_unavailable"
  | "item_duplicate"
  | "item_quantity"
  | "items_total"
  | "invalid_locale";

export type QuoteFieldError = { code: QuoteErrorCode; params?: { max: number } };

export type QuoteErrors = Partial<Record<keyof QuoteRequest, QuoteFieldError>>;

export type SubmissionResult =
  | { ok: true; reference: string }
  | { ok: false; code: string; message: string; errors?: QuoteErrors };

export type ResolvedQuoteRequest = Omit<QuoteRequest, "items" | "website"> & {
  items: {
    productId: string;
    name: string;
    category: string;
    quantity: number;
    demonstration: true;
  }[];
};
