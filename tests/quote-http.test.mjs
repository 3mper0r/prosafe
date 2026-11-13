import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources();
after(() => compiled.cleanup());
const { createQuoteHandlers, quoteHttpConfigurationValid } = compiled.load("src/features/quote/request/http.server.ts");
const { PRODUCTS } = compiled.load("src/features/catalog/products.ts");
const origin = "https://prosafe.example.test";
const api = `${origin}/api/quote`;
const valid = () => ({
  company: "Test Company", contact: "Test Contact", email: "contact@example.test",
  phone: "", city: "Prishtina", requirements: "Test requirements", consent: true, website: "",
  items: [{ productId: PRODUCTS[0].id, quantity: 2 }],
});
function fixture(adapter, options = {}) {
  let time = 1_700_000_000_000;
  const deliveries = [];
  const delivery = adapter === undefined ? { deliver: async (request, key) => {
    deliveries.push({ request, key });
    return { accepted: true, reference: "test-recorded-acceptance" };
  } } : adapter;
  const handlers = createQuoteHandlers({ delivery, expectedOrigin: origin, secret: "test-form-secret-32-characters-long", now: () => time, ...options });
  return { ...handlers, deliveries, advance: (milliseconds) => { time += milliseconds; } };
}
async function session(handler, age = 2000) {
  const response = await handler.GET();
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = await response.json();
  handler.advance(age);
  return body;
}
function request(token, input = valid(), overrides = {}) {
  const { headers: extra, ...rest } = overrides;
  const headers = new Headers({ Origin: origin, "Content-Type": "application/json", "X-Quote-Token": token, "Idempotency-Key": randomUUID() });
  for (const [name, value] of Object.entries(extra ?? {})) {
    if (value === null) headers.delete(name);
    else headers.set(name, value);
  }
  return new Request(api, { method: "POST", headers, body: JSON.stringify(input), ...rest });
}

test("quote HTTP rejects foreign or missing origins and cross-site fetches", async () => {
  const handler = fixture();
  const { token } = await session(handler);
  for (const headers of [{ Origin: "https://attacker.example.test" }, { Origin: null }, { "Sec-Fetch-Site": "cross-site" }]) {
    const response = await handler.POST(request(token, valid(), { headers }));
    assert.equal(response.status, 403);
    assert.equal((await response.json()).code, "origin");
  }
  assert.equal(handler.deliveries.length, 0);
});

test("quote HTTP accepts the browser Host origin when Next uses an internal hostname", async () => {
  const previousOrigin = process.env.QUOTE_PUBLIC_ORIGIN;
  try {
    delete process.env.QUOTE_PUBLIC_ORIGIN;
    const handler = fixture(undefined, { expectedOrigin: undefined });
    const { token } = await session(handler);
    const headers = {
      Origin: "http://127.0.0.1:3002", Host: "127.0.0.1:3002", "Content-Type": "application/json",
      "X-Quote-Token": token, "Idempotency-Key": randomUUID(),
    };
    const response = await handler.POST(new Request("http://localhost:3002/api/quote", { method: "POST", headers, body: JSON.stringify(valid()) }));
    assert.equal(response.status, 200);
    assert.equal(handler.deliveries.length, 1);
    for (const extra of [
      { Origin: "http://localhost:3002" },
      { Origin: "https://attacker.example.test", "X-Forwarded-Host": "attacker.example.test", "X-Forwarded-Proto": "https" },
    ]) {
      const result = await handler.POST(new Request("http://localhost:3002/api/quote", { method: "POST", headers: { ...headers, ...extra, "Idempotency-Key": randomUUID() }, body: JSON.stringify(valid()) }));
      assert.equal(result.status, 403);
    }
    assert.equal(handler.deliveries.length, 1);
  } finally {
    if (previousOrigin === undefined) delete process.env.QUOTE_PUBLIC_ORIGIN; else process.env.QUOTE_PUBLIC_ORIGIN = previousOrigin;
  }
});

test("quote HTTP pinned public origin takes precedence over internal URL and Host", async () => {
  const previousOrigin = process.env.QUOTE_PUBLIC_ORIGIN;
  try {
    process.env.QUOTE_PUBLIC_ORIGIN = origin;
    const handler = fixture(undefined, { expectedOrigin: undefined });
    const { token } = await session(handler);
    const headers = {
      Origin: origin, Host: "localhost:3002", "Content-Type": "application/json",
      "X-Quote-Token": token, "Idempotency-Key": randomUUID(),
    };
    assert.equal((await handler.POST(new Request("http://localhost:3002/api/quote", { method: "POST", headers, body: JSON.stringify(valid()) }))).status, 200);
    const attackHeaders = { ...headers, Origin: "https://attacker.example.test", Host: "attacker.example.test", "Idempotency-Key": randomUUID() };
    assert.equal((await handler.POST(new Request("http://localhost:3002/api/quote", { method: "POST", headers: attackHeaders, body: JSON.stringify(valid()) }))).status, 403);
    assert.equal(handler.deliveries.length, 1);
  } finally {
    if (previousOrigin === undefined) delete process.env.QUOTE_PUBLIC_ORIGIN; else process.env.QUOTE_PUBLIC_ORIGIN = previousOrigin;
  }
});

test("quote HTTP exposes disabled availability and returns unavailable without delivery", async () => {
  const handler = fixture(null);
  const state = await session(handler);
  assert.equal(state.available, false);
  const response = await handler.POST(request(state.token));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});

test("quote HTTP rejects missing, forged, young, and expired session tokens", async () => {
  for (const age of [0, 1999, 2 * 60 * 60 * 1000 + 1]) {
    const handler = fixture();
    const { token } = await session(handler, age);
    const response = await handler.POST(request(token));
    assert.equal(response.status, 403);
    assert.equal((await response.json()).code, "session");
    assert.equal(handler.deliveries.length, 0);
  }
  const handler = fixture();
  const { token } = await session(handler);
  for (const value of [null, "forged", token.slice(0, -1) + (token.endsWith("0") ? "1" : "0")]) {
    const response = await handler.POST(request(token, valid(), { headers: { "X-Quote-Token": value } }));
    assert.equal(response.status, 403);
  }
});

test("quote HTTP requires JSON and a well-formed request identifier", async () => {
  const handler = fixture();
  const { token } = await session(handler);
  for (const contentType of [null, "text/plain", "application/x-www-form-urlencoded"]) {
    const response = await handler.POST(request(token, valid(), { headers: { "Content-Type": contentType } }));
    assert.equal(response.status, 415);
  }
  for (const id of [null, "not-a-uuid"]) assert.equal((await handler.POST(request(token, valid(), { headers: { "Idempotency-Key": id } }))).status, 400);
});

test("quote HTTP rejects malformed JSON and oversized lengths", async () => {
  const handler = fixture();
  const { token } = await session(handler);
  assert.equal((await handler.POST(request(token, valid(), { body: "{invalid JSON" }))).status, 400);
  assert.equal((await handler.POST(request(token, valid(), { headers: { "Content-Length": "32769" } }))).status, 413);
  assert.equal((await handler.POST(request(token, valid(), { headers: { "Content-Length": "unknown" } }))).status, 413);
  assert.equal(handler.deliveries.length, 0);
});

test("quote HTTP bounds streamed payloads even without Content-Length", async () => {
  const handler = fixture();
  const { token } = await session(handler);
  let cancelled = false;
  const chunks = [new Uint8Array(16384), new Uint8Array(16384), new Uint8Array(1)];
  const stream = new ReadableStream({
    pull(controller) { if (chunks.length) controller.enqueue(chunks.shift()); },
    cancel() { cancelled = true; },
  });
  const response = await handler.POST(request(token, valid(), { body: stream, duplex: "half", headers: { "Content-Length": null } }));
  assert.equal(response.status, 413);
  assert.equal(cancelled, true);
  assert.equal(handler.deliveries.length, 0);
});

test("quote HTTP validates catalog IDs, quantities, duplicates, empty items, and privacy consent", async () => {
  const changes = [
    { items: [] },
    { items: [{ productId: "UNKNOWN", quantity: 1 }] },
    { items: [{ productId: PRODUCTS[0].id, quantity: 1000 }] },
    { items: [{ productId: PRODUCTS[0].id, quantity: "2" }] },
    { items: [{ productId: PRODUCTS[0].id, quantity: 1 }, { productId: PRODUCTS[0].id, quantity: 2 }] },
    { consent: false },
    { email: "invalid email" },
    { website: "https://spam.example.test" },
  ];
  for (const change of changes) {
    const handler = fixture();
    const { token } = await session(handler);
    const response = await handler.POST(request(token, { ...valid(), ...change }));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).ok, false);
    assert.equal(handler.deliveries.length, 0);
  }
});

test("quote HTTP acknowledges only accepted test delivery, resolves canonical metadata, and deduplicates", async () => {
  const handler = fixture();
  const { token, available } = await session(handler);
  assert.equal(available, true);
  const id = randomUUID();
  const input = { ...valid(), items: [{ productId: PRODUCTS[0].id, quantity: 2, name: "Client-invented product", description: "Fake performance claims" }] };
  const first = await handler.POST(request(token, input, { headers: { "Idempotency-Key": id } }));
  assert.equal(first.status, 200);
  assert.deepEqual(await first.json(), { ok: true, reference: id });
  const second = await handler.POST(request(token, input, { headers: { "Idempotency-Key": id } }));
  assert.equal(second.status, 200);
  assert.equal(handler.deliveries.length, 1);
  assert.equal(handler.deliveries[0].request.items[0].name, PRODUCTS[0].name);
  assert.equal(JSON.stringify(handler.deliveries).includes("Fake performance"), false);
  assert.equal(handler.deliveries[0].key, `prosafe-quote/${id}`);
});

test("quote HTTP never returns success for delivery failure and allows same-key retries", async () => {
  let calls = 0;
  const handler = fixture({ deliver: async () => { calls++; if (calls === 1) throw new Error("private provider diagnostics"); return { accepted: true, reference: "accepted-retry" }; } });
  const { token } = await session(handler);
  const id = randomUUID();
  const failed = await handler.POST(request(token, valid(), { headers: { "Idempotency-Key": id } }));
  assert.equal(failed.status, 502);
  const body = await failed.json();
  assert.equal(body.ok, false);
  assert.equal(JSON.stringify(body).includes("private provider"), false);
  const retried = await handler.POST(request(token, valid(), { headers: { "Idempotency-Key": id } }));
  assert.equal(retried.status, 200);
  assert.equal(calls, 2);
});

test("quote HTTP rate-limits per-token attempts and resets after ten minutes", async () => {
  const handler = fixture();
  const { token } = await session(handler);
  for (let i = 0; i < 5; i++) assert.equal((await handler.POST(request(token, { ...valid(), consent: false }))).status, 400);
  const limited = await handler.POST(request(token));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "600");
  handler.advance(10 * 60 * 1000);
  assert.equal((await handler.POST(request(token))).status, 200);
});

test("quote HTTP rate-limits global attempts even with newly issued tokens", async () => {
  const handler = fixture();
  for (let i = 0; i < 10; i++) {
    const { token } = await session(handler);
    for (let j = 0; j < 5; j++) assert.equal((await handler.POST(request(token, { ...valid(), consent: false }))).status, 400);
  }
  const { token } = await session(handler);
  assert.equal((await handler.POST(request(token))).status, 429);
});

test("quote HTTP configuration rejects unsafe origins and insufficient form secrets", () => {
  const previousOrigin = process.env.QUOTE_PUBLIC_ORIGIN;
  const previousSecret = process.env.QUOTE_FORM_SECRET;
  try {
    delete process.env.QUOTE_PUBLIC_ORIGIN;
    delete process.env.QUOTE_FORM_SECRET;
    assert.equal(quoteHttpConfigurationValid(), true);
    for (const value of ["http://public.example.test", "https://example.test/path", "https://example.test/", "not-an-origin"]) {
      process.env.QUOTE_PUBLIC_ORIGIN = value;
      assert.equal(quoteHttpConfigurationValid(), false);
    }
    for (const value of ["https://example.test", "http://localhost:3002", "http://127.0.0.1:3002"]) {
      process.env.QUOTE_PUBLIC_ORIGIN = value;
      assert.equal(quoteHttpConfigurationValid(), true);
    }
    process.env.QUOTE_FORM_SECRET = "short";
    assert.equal(quoteHttpConfigurationValid(), false);
  } finally {
    if (previousOrigin === undefined) delete process.env.QUOTE_PUBLIC_ORIGIN; else process.env.QUOTE_PUBLIC_ORIGIN = previousOrigin;
    if (previousSecret === undefined) delete process.env.QUOTE_FORM_SECRET; else process.env.QUOTE_FORM_SECRET = previousSecret;
  }
});

test("blank optional origin and secret use the local origin and a random signing secret", async () => {
  const savedOrigin = process.env.QUOTE_PUBLIC_ORIGIN;
  const savedSecret = process.env.QUOTE_FORM_SECRET;
  try {
    process.env.QUOTE_PUBLIC_ORIGIN = "";
    process.env.QUOTE_FORM_SECRET = "";
    const handler = fixture(undefined, { expectedOrigin: undefined, secret: undefined });
    const { token } = await session(handler);
    const result = await handler.POST(request(token));
    assert.equal(result.status, 200);
    assert.equal(handler.deliveries.length, 1);
  } finally {
    if (savedOrigin === undefined) delete process.env.QUOTE_PUBLIC_ORIGIN; else process.env.QUOTE_PUBLIC_ORIGIN = savedOrigin;
    if (savedSecret === undefined) delete process.env.QUOTE_FORM_SECRET; else process.env.QUOTE_FORM_SECRET = savedSecret;
  }
});

test("a blank form secret never accepts tokens signed with an empty key", async () => {
  const savedSecret = process.env.QUOTE_FORM_SECRET;
  try {
    process.env.QUOTE_FORM_SECRET = "";
    const handler = fixture(undefined, { secret: undefined });
    const issued = "1700000000000.12345678-1234-4234-8234-123456789abc";
    const signature = createHmac("sha256", "").update(issued).digest("hex");
    handler.advance(2000);
    const response = await handler.POST(request(`${issued}.${signature}`));
    assert.equal(response.status, 403);
    assert.equal(handler.deliveries.length, 0);
  } finally {
    if (savedSecret === undefined) delete process.env.QUOTE_FORM_SECRET; else process.env.QUOTE_FORM_SECRET = savedSecret;
  }
});
