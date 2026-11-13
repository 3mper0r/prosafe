import "server-only";
import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { getQuoteDelivery, type QuoteDelivery } from "./delivery.server";
import { QUOTE_LIMITS } from "./limits";
import { submitQuoteRequest } from "./submission.server";

const WINDOW = 10 * 60 * 1000;
const TOKEN_LIFETIME = 2 * 60 * 60 * 1000;
const fallbackSecret = randomBytes(32).toString("hex");

export function quoteHttpConfigurationValid() {
  const origin = process.env.QUOTE_PUBLIC_ORIGIN;
  const secret = process.env.QUOTE_FORM_SECRET;
  if (secret && secret.length < 32) return false;
  if (!origin) return true;
  try {
    const url = new URL(origin);
    return url.origin === origin && (url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname)));
  } catch { return false; }
}

type Options = {
  delivery?: QuoteDelivery | null;
  expectedOrigin?: string;
  secret?: string;
  now?: () => number;
};

/** Dependency injection is for tests; the public route always uses configured delivery. */
export function createQuoteHandlers(options: Options = {}) {
  const now = options.now ?? Date.now;
  const secret = options.secret ?? process.env.QUOTE_FORM_SECRET ?? fallbackSecret;
  const buckets = new Map<string, { count: number; expires: number }>();
  let globalWindow = { count: 0, expires: now() + WINDOW };
  const delivery = () => options.delivery === undefined ? getQuoteDelivery() : options.delivery;
  const available = () => quoteHttpConfigurationValid() && delivery() !== null;
  const sign = (value: string) => createHmac("sha256", secret).update(value).digest("hex");
  const response = (body: unknown, status = 200) => Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...(status === 429 ? { "Retry-After": "600" } : {}) },
  });
  const failure = (status: number, code: string, message: string) => response({ ok: false, code, message }, status);

  function validToken(value: string | null) {
    if (!value || value.length > 200) return false;
    const [timestamp, nonce, signature] = value.split(".");
    if (!timestamp || !/^\d{13}$/.test(timestamp) || !nonce || !/^[a-f0-9-]{36}$/.test(nonce) || !signature || !/^[a-f0-9]{64}$/.test(signature) || value.split(".").length !== 3) return false;
    const age = now() - Number(timestamp);
    return age >= 2000 && age <= TOKEN_LIFETIME && timingSafeEqual(Buffer.from(signature), Buffer.from(sign(`${timestamp}.${nonce}`)));
  }

  return {
    async GET() {
      const value = `${now()}.${randomUUID()}`;
      return response({ available: available(), token: `${value}.${sign(value)}` });
    },
    async POST(request: Request) {
      try {
        // Next.js may use an internal hostname in request.url. Use the actual
        // Host header locally; public deployments can pin QUOTE_PUBLIC_ORIGIN.
        const requestUrl = new URL(request.url);
        const host = request.headers.get("host");
        if (host) requestUrl.host = host;
        const expectedOrigin = options.expectedOrigin ?? process.env.QUOTE_PUBLIC_ORIGIN ?? requestUrl.origin;
        if (request.headers.get("origin") !== expectedOrigin || request.headers.get("sec-fetch-site") === "cross-site") {
          return failure(403, "origin", "Please submit the request from the PROSAFE website.");
        }
        if (!available()) return failure(503, "unavailable", "Quotation submission is unavailable in this demo environment. Your selection has not been sent.");
        if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return failure(415, "payload", "Please use the quotation form to submit your request.");
        const token = request.headers.get("x-quote-token");
        if (!validToken(token)) return failure(403, "session", "Please refresh the submission session, wait a moment, and try again.");
        const key = request.headers.get("idempotency-key") ?? "";
        if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(key)) return failure(400, "request_id", "Please refresh the quotation page and try again.");
        if (globalWindow.expires <= now()) globalWindow = { count: 0, expires: now() + WINDOW };
        for (const [id, bucket] of buckets) if (bucket.expires <= now()) buckets.delete(id);
        const bucketKey = sign(token!);
        const bucket = buckets.get(bucketKey) ?? { count: 0, expires: now() + WINDOW };
        if (bucket.count >= 5 || globalWindow.count >= 50 || (!buckets.has(bucketKey) && buckets.size >= 1000)) return failure(429, "rate_limited", "Too many attempts. Please wait ten minutes before trying again.");
        bucket.count += 1;
        buckets.set(bucketKey, bucket);
        globalWindow.count += 1;
        const length = request.headers.get("content-length");
        if (length && (!/^\d+$/.test(length) || Number(length) > QUOTE_LIMITS.maxPayloadBytes)) return failure(413, "payload", "This request is too large. Please shorten the additional requirements.");
        if (!request.body) return failure(400, "payload", "The quotation request is empty.");
        const reader = request.body.getReader();
        const chunks: Uint8Array[] = [];
        let size = 0;
        try {
          while (true) {
            const chunk = await reader.read();
            if (chunk.done) break;
            size += chunk.value.byteLength;
            if (size > QUOTE_LIMITS.maxPayloadBytes) {
              await reader.cancel();
              return failure(413, "payload", "This request is too large. Please shorten the additional requirements.");
            }
            chunks.push(chunk.value);
          }
        } finally { reader.releaseLock(); }
        let input: unknown;
        try { input = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
        catch { return failure(400, "payload", "The request could not be read. Please use the quotation form."); }
        const result = await submitQuoteRequest(input, key, delivery());
        return response(result.body, result.status);
      } catch {
        return failure(503, "failed", "We could not confirm delivery. Your selection is preserved. Please retry the same request.");
      }
    },
  };
}
