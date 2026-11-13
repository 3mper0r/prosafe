import "server-only";
import type { ResolvedQuoteRequest } from "./types";
import { isQuoteEmail } from "./validation";

export interface QuoteDelivery {
  deliver(request: ResolvedQuoteRequest, idempotencyKey: string): Promise<{ accepted: true; reference: string }>;
}

export function escapeQuoteHtml(value: string): string {
  return value.replace(/[&<>"']/gu, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

export function createQuoteMessage(request: ResolvedQuoteRequest) {
  const lines = [
    "PROSAFE — B2B quotation request",
    "Demonstration equipment; not confirmed inventory or an order.",
    "",
    `Company: ${request.company}`,
    `Contact person: ${request.contact}`,
    `Business email: ${request.email}`,
    `Phone: ${request.phone || "Not provided"}`,
    `Delivery location / city: ${request.city || "Not provided"}`,
    "Privacy consent: given for responding to this quotation request.",
    "",
    "Selected products:",
    ...request.items.map((item) => `${item.productId} | ${item.name} | ${item.category} | Quantity: ${item.quantity} | DEMONSTRATION`),
    "",
    "Additional requirements:",
    request.requirements || "Not provided",
  ];
  const text = lines.join("\n");
  return { subject: "PROSAFE — B2B quotation request", text, html: `<pre style="font-family:Arial,sans-serif;white-space:pre-wrap">${escapeQuoteHtml(text)}</pre>` };
}

function getConfiguration() {
  if (process.env.QUOTE_DELIVERY_PROVIDER !== "resend") return null;
  const apiKey = process.env.QUOTE_RESEND_API_KEY?.trim();
  const from = process.env.QUOTE_FROM_EMAIL?.trim();
  const to = process.env.QUOTE_TO_EMAIL?.trim();
  if (!apiKey || /[\s\u0000-\u001f\u007f]/u.test(apiKey) || !from || !to || !isQuoteEmail(from) || !isQuoteEmail(to)) return null;
  return { apiKey, from, to };
}

export function getQuoteDeliveryAvailability(): boolean {
  return getConfiguration() !== null;
}

export function getQuoteDelivery(): QuoteDelivery | null {
  const config = getConfiguration();
  if (!config) return null;
  return {
    async deliver(request, idempotencyKey) {
      const message = createQuoteMessage(request);
      // Fixed provider URL: configuration cannot turn this into an arbitrary HTTP relay.
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
        body: JSON.stringify({ from: config.from, to: [config.to], reply_to: request.email, ...message }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
        redirect: "error",
      });
      if (!response.ok) throw new Error("Quotation delivery was not accepted.");
      const data: unknown = await response.json();
      if (!data || typeof data !== "object" || !("id" in data) || typeof data.id !== "string" || !/^[A-Za-z0-9_-]{1,128}$/u.test(data.id)) {
        throw new Error("Quotation delivery was not acknowledged.");
      }
      return { accepted: true, reference: data.id };
    },
  };
}
