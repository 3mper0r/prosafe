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
};

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

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
