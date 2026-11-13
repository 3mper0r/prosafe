import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources();
after(() => compiled.cleanup());
const { validateQuoteRequest, isQuoteEmail } = compiled.load("src/features/quote/request/validation.ts");
const { submitQuoteRequest } = compiled.load("src/features/quote/request/submission.server.ts");
const { getQuoteDelivery, getQuoteDeliveryAvailability, createQuoteMessage } = compiled.load("src/features/quote/request/delivery.server.ts");
const { PRODUCTS } = compiled.load("src/features/catalog/products.ts");
const ids = PRODUCTS.map((product) => product.id);
const valid = () => ({
  company: "Example & Sons", contact: "Sample Contact", email: "Contact@example.test",
  phone: "", city: "Prishtina", requirements: "Please discuss quantities.", consent: true, website: "",
  items: [{ productId: ids[0], quantity: 2 }],
});
const accepted = () => ({ deliver: async () => ({ accepted: true, reference: "provider-acknowledged-id" }) });
function rejected(input, field) {
  const result = validateQuoteRequest(input, ids);
  assert.equal(result.ok, false);
  assert.equal(typeof result.errors[field], "string");
}

test("validates and normalizes business input while accepting ordinary email domains", () => {
  const result = validateQuoteRequest({ ...valid(), company: "  Example   Company  ", email: "hello@EXAMPLE.TEST", requirements: "  Line one\r\nLine two  " }, ids);
  assert.equal(result.ok, true);
  assert.equal(result.value.company, "Example Company");
  assert.equal(result.value.email, "hello@example.test");
  assert.equal(result.value.requirements, "Line one\nLine two");
  assert.equal(isQuoteEmail("owner@gmail.com"), true);
  for (const email of ["bad", "a@@example.test", "a\r\nbcc:x@example.test", "a@localhost", "a..b@example.test", "a@-host.test"]) assert.equal(isQuoteEmail(email), false);
});

test("rejects missing, non-string, overlong, and control-character form fields", () => {
  rejected(null, "company");
  for (const field of ["company", "contact", "email"]) rejected({ ...valid(), [field]: "   " }, field);
  for (const field of ["company", "contact", "email", "phone", "city", "requirements"]) rejected({ ...valid(), [field]: 123 }, field);
  for (const [field, maximum] of Object.entries({ company: 120, contact: 100, email: 254, phone: 40, city: 160, requirements: 3000 })) rejected({ ...valid(), [field]: "x".repeat(maximum + 1) }, field);
  rejected({ ...valid(), company: "Test\u0000Company" }, "company");
  rejected({ ...valid(), phone: "123\nBcc: test" }, "phone");
  rejected({ ...valid(), consent: "true" }, "consent");
  rejected({ ...valid(), consent: false }, "consent");
  rejected({ ...valid(), website: "https://spam.test" }, "website");
});

test("rejects empty, unknown, duplicate, manipulated, and excessive item selections", () => {
  rejected({ ...valid(), items: [] }, "items");
  rejected({ ...valid(), items: "not an array" }, "items");
  rejected({ ...valid(), items: [{ productId: "UNKNOWN", quantity: 1 }] }, "items");
  rejected({ ...valid(), items: [{ productId: ids[0], quantity: 1 }, { productId: ids[0], quantity: 2 }] }, "items");
  for (const quantity of [0, -1, 1.5, "2", 1000, Number.MAX_SAFE_INTEGER, NaN, Infinity]) rejected({ ...valid(), items: [{ productId: ids[0], quantity }] }, "items");
  rejected({ ...valid(), items: Array.from({ length: 21 }, () => ({ productId: ids[0], quantity: 1 })) }, "items");
  rejected({ ...valid(), items: ids.slice(0, 6).map((productId) => ({ productId, quantity: 999 })) }, "items");
});

test("strips client-provided product metadata and forwards only server catalog values", async () => {
  let received;
  const adapter = { deliver: async (request) => { received = request; return { accepted: true, reference: "test-acceptance" }; } };
  const result = await submitQuoteRequest({ ...valid(), items: [{ productId: ids[0], quantity: 2, name: "FAKE PRODUCT", specifications: "FAKE CLAIMS" }] }, randomUUID(), adapter);
  assert.equal(result.body.ok, true);
  assert.equal(received.items[0].name, PRODUCTS[0].name);
  assert.equal(received.items[0].quantity, 2);
  assert.equal(received.items[0].demonstration, true);
  assert.equal(JSON.stringify(received).includes("FAKE"), false);
});

test("never claims success for missing delivery or invalid data", async () => {
  const missing = await submitQuoteRequest(valid(), randomUUID(), null);
  assert.equal(missing.status, 503);
  assert.equal(missing.body.ok, false);
  assert.equal(missing.body.code, "unavailable");
  const empty = await submitQuoteRequest({ ...valid(), items: [] }, randomUUID(), accepted());
  assert.equal(empty.status, 400);
  assert.equal(empty.body.ok, false);
  assert.equal((await submitQuoteRequest(valid(), "bad\r\nid", accepted())).status, 400);
});

test("returns sanitized delivery errors and permits retry with the same key", async () => {
  const id = randomUUID();
  let calls = 0;
  const adapter = { deliver: async () => { calls++; if (calls === 1) throw new Error("SECRET provider error for personal@example.test"); return { accepted: true, reference: "acknowledged" }; } };
  const failed = await submitQuoteRequest(valid(), id, adapter);
  assert.equal(failed.status, 502);
  assert.equal(JSON.stringify(failed).includes("SECRET"), false);
  assert.equal(JSON.stringify(failed).includes("personal@example.test"), false);
  const retried = await submitQuoteRequest(valid(), id, adapter);
  assert.equal(retried.status, 200);
  assert.equal(retried.body.reference, id);
  assert.equal(calls, 2);
});

test("synchronous adapter failures do not leave an un-retryable pending entry", async () => {
  const id = randomUUID();
  assert.equal((await submitQuoteRequest(valid(), id, { deliver() { throw new Error("fail"); } })).status, 502);
  assert.equal((await submitQuoteRequest(valid(), id, accepted())).status, 200);
});

test("concurrent and completed duplicate submissions share one accepted delivery", async () => {
  const id = randomUUID();
  let calls = 0;
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  const adapter = { deliver: async (_request, key) => { calls++; assert.equal(key, `prosafe-quote/${id}`); await gate; return { accepted: true, reference: "accepted-once" }; } };
  const first = submitQuoteRequest(valid(), id, adapter);
  const second = submitQuoteRequest(valid(), id, adapter);
  await Promise.resolve();
  assert.equal(calls, 1);
  release();
  assert.deepEqual(await first, await second);
  assert.deepEqual(await submitQuoteRequest(valid(), id, adapter), await first);
  assert.equal(calls, 1);
  assert.equal((await submitQuoteRequest({ ...valid(), company: "Changed company" }, id, adapter)).status, 409);
});

test("rejects changed-payload reuse after a failed delivery and tolerates item reordering", async () => {
  const id = randomUUID();
  await submitQuoteRequest(valid(), id, { deliver: async () => { throw new Error("failure"); } });
  assert.equal((await submitQuoteRequest({ ...valid(), city: "Different city" }, id, accepted())).status, 409);
  const pair = { ...valid(), items: [{ productId: ids[0], quantity: 1 }, { productId: ids[1], quantity: 3 }] };
  const pairId = randomUUID();
  assert.deepEqual(await submitQuoteRequest(pair, pairId, accepted()), await submitQuoteRequest({ ...pair, items: [...pair.items].reverse() }, pairId, accepted()));
});

test("escapes user content in HTML while preserving readable plain text", () => {
  const message = createQuoteMessage({ ...valid(), company: '<script>alert("x")</script> & Co', requirements: "<img src=x onerror='bad'>", items: [{ productId: ids[0], name: PRODUCTS[0].name, category: "Head protection", quantity: 2, demonstration: true }] });
  assert.equal(message.html.includes("<script>"), false);
  assert.equal(message.html.includes("<img"), false);
  assert.match(message.html, /&lt;script&gt;/u);
  assert.match(message.html, /&amp; Co/u);
  assert.match(message.html, /&#39;bad&#39;/u);
  assert.match(message.text, /<script>/u);
  assert.equal(message.subject, "PROSAFE — B2B quotation request");
});

test("requires complete valid Resend configuration and rejects runtime fake adapters", async () => {
  const keys = ["QUOTE_DELIVERY_PROVIDER", "QUOTE_RESEND_API_KEY", "QUOTE_FROM_EMAIL", "QUOTE_TO_EMAIL"];
  const saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  try {
    for (const key of keys) delete process.env[key];
    assert.equal(getQuoteDelivery(), null);
    process.env.QUOTE_DELIVERY_PROVIDER = "test";
    assert.equal(getQuoteDelivery(), null);
    process.env.QUOTE_DELIVERY_PROVIDER = "resend";
    process.env.QUOTE_RESEND_API_KEY = "test-key-not-a-real-credential";
    process.env.QUOTE_FROM_EMAIL = "";
    process.env.QUOTE_TO_EMAIL = "recipient@example.test";
    assert.equal(getQuoteDeliveryAvailability(), false);
    process.env.QUOTE_FROM_EMAIL = "sender@example.test\r\nBcc:bad@example.test";
    assert.equal(getQuoteDeliveryAvailability(), false);
    process.env.QUOTE_FROM_EMAIL = "sender@example.test";
    assert.equal(getQuoteDeliveryAvailability(), true);
    const originalFetch = globalThis.fetch;
    try {
      let sent;
      globalThis.fetch = async (url, options) => { sent = { url, options }; return Response.json({ id: "provider-accepted-123" }); };
      const id = randomUUID();
      const result = await submitQuoteRequest(valid(), id, getQuoteDelivery());
      assert.equal(result.status, 200);
      assert.equal(sent.url, "https://api.resend.com/emails");
      assert.equal(sent.options.headers["Idempotency-Key"], `prosafe-quote/${id}`);
      const body = JSON.parse(sent.options.body);
      assert.equal(body.reply_to, valid().email);
      assert.equal(body.to[0], "recipient@example.test");
      assert.equal(body.text.includes(PRODUCTS[0].name), true);
      globalThis.fetch = async () => Response.json({ error: "private provider failure" }, { status: 500 });
      assert.equal((await submitQuoteRequest(valid(), randomUUID(), getQuoteDelivery())).status, 502);
      globalThis.fetch = async () => Response.json({});
      assert.equal((await submitQuoteRequest(valid(), randomUUID(), getQuoteDelivery())).status, 502);
      globalThis.fetch = async () => { throw new DOMException("timed out", "TimeoutError"); };
      assert.equal((await submitQuoteRequest(valid(), randomUUID(), getQuoteDelivery())).status, 502);
    } finally { globalThis.fetch = originalFetch; }
  } finally {
    for (const key of keys) if (saved[key] === undefined) delete process.env[key]; else process.env[key] = saved[key];
  }
});
