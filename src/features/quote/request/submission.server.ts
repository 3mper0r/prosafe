import "server-only";
import { createHash } from "node:crypto";
import { PRODUCTS } from "../../catalog/products";
import { PRODUCT_CATEGORIES } from "../../../lib/product-categories";
import { validateQuoteRequest } from "./validation";
import type { ResolvedQuoteRequest, SubmissionResult } from "./types";
import type { QuoteDelivery } from "./delivery.server";

type Outcome = { status: number; body: SubmissionResult };
type Entry = { fingerprint: string; expiresAt: number; pending?: Promise<Outcome>; accepted?: Outcome };
const requests = new Map<string, Entry>();
const MAX_ENTRIES = 1000;
const RETENTION_MS = 24 * 60 * 60 * 1000;

function failure(status: number, code: string, message: string): Outcome {
  return { status, body: { ok: false, code, message } };
}

/** Local deduplication is bounded, contains no contact data, and complements provider idempotency. */
export async function submitQuoteRequest(input: unknown, requestId: string, delivery: QuoteDelivery | null): Promise<Outcome> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(requestId)) {
    return failure(400, "invalid_request_id", "Please refresh the page and try again.");
  }
  const validated = validateQuoteRequest(input, PRODUCTS.map((product) => product.id));
  if (!validated.ok) return { status: 400, body: { ok: false, code: "validation", message: "Review the highlighted fields and your selection.", errors: validated.errors } };
  if (!delivery) return failure(503, "unavailable", "Quotation submission is unavailable in this demo environment. Your selection has been preserved.");
  const value = validated.value;
  const stableRequestId = requestId.toLowerCase();
  const fingerprint = createHash("sha256").update(JSON.stringify({ ...value, items: [...value.items].sort((a, b) => a.productId.localeCompare(b.productId)) })).digest("hex");
  const now = Date.now();
  for (const [id, entry] of requests) if (!entry.pending && entry.expiresAt <= now) requests.delete(id);
  let entry = requests.get(stableRequestId);
  if (entry && entry.fingerprint !== fingerprint) return failure(409, "request_changed", "This request has changed. Start a new submission before trying again.");
  if (entry?.accepted) return entry.accepted;
  if (entry?.pending) return entry.pending;
  if (!entry) {
    if (requests.size >= MAX_ENTRIES) return failure(503, "busy", "Quotation submission is temporarily busy. Please try again shortly.");
    entry = { fingerprint, expiresAt: now + RETENTION_MS };
    requests.set(stableRequestId, entry);
  }
  const request: ResolvedQuoteRequest = {
    company: value.company, contact: value.contact, email: value.email, phone: value.phone, city: value.city,
    requirements: value.requirements, consent: true,
    items: [...value.items].sort((a, b) => a.productId.localeCompare(b.productId)).map((item) => {
      const product = PRODUCTS.find((candidate) => candidate.id === item.productId)!;
      return { productId: product.id, name: product.name, category: PRODUCT_CATEGORIES[product.categoryId].label, quantity: item.quantity, demonstration: true };
    }),
  };
  const activeEntry = entry;
  const pending = (async (): Promise<Outcome> => {
    // Yield before invoking adapters so synchronous throws cannot leave a stale pending entry.
    await Promise.resolve();
    try {
      const acknowledgement = await delivery.deliver(request, `prosafe-quote/${stableRequestId}`);
      if (acknowledgement.accepted !== true || !/^[A-Za-z0-9_-]{1,128}$/u.test(acknowledgement.reference)) throw new Error("Missing acceptance.");
      const outcome: Outcome = { status: 200, body: { ok: true, reference: stableRequestId } };
      activeEntry.accepted = outcome;
      return outcome;
    } catch {
      return failure(502, "delivery_failed", "We could not confirm acceptance of your request. Your selection is preserved. Please retry this request.");
    } finally {
      activeEntry.pending = undefined;
    }
  })();
  activeEntry.pending = pending;
  return pending;
}
