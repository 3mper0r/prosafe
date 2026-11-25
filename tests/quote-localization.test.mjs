import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources(["src/i18n/dictionaries/en.ts", "src/i18n/dictionaries/sq.ts", "src/i18n/format.ts", "src/features/quote/quote-errors.ts"]);
after(() => compiled.cleanup());
const { validateQuoteRequest } = compiled.load("src/features/quote/request/validation.ts");
const { submitQuoteRequest } = compiled.load("src/features/quote/request/submission.server.ts");
const { createQuoteMessage } = compiled.load("src/features/quote/request/delivery.server.ts");
const { createQuoteHandlers } = compiled.load("src/features/quote/request/http.server.ts");
const { getCatalog } = compiled.load("src/content/catalog.ts");
const dictionaries = { en: compiled.load("src/i18n/dictionaries/en.ts").en, sq: compiled.load("src/i18n/dictionaries/sq.ts").sq };
const english = getCatalog("en");
const ids = english.products.map((product) => product.id);
const valid = (extra = {}) => ({
  company: "Example Company", contact: "Sample Contact", email: "contact@example.test",
  phone: "", city: "Prishtina", requirements: "", consent: true, website: "",
  items: [{ productId: ids[0], quantity: 2 }], ...extra,
});

test("requests without a locale stay valid and produce the same normalized value as before", () => {
  const result = validateQuoteRequest(valid(), ids);
  assert.equal(result.ok, true);
  assert.equal("locale" in result.value, false);
  assert.deepEqual(Object.keys(result.value), ["company", "contact", "email", "phone", "city", "requirements", "consent", "website", "items"]);
});

test("the optional preferred language accepts only sq and en", () => {
  for (const locale of ["sq", "en"]) assert.equal(validateQuoteRequest(valid({ locale }), ids).value.locale, locale);
  for (const locale of ["de", "EN", "", null, 1, ["sq"], { sq: true }]) {
    const result = validateQuoteRequest(valid({ locale }), ids);
    assert.equal(result.ok, false, JSON.stringify(locale));
    assert.deepEqual(result.errors, { locale: { code: "invalid_locale" } });
  }
});

test("every validation error code has a message template in both languages", async () => {
  const source = await readFile(new URL("../src/features/quote/request/validation.ts", import.meta.url), "utf8");
  const emitted = [...new Set([...source.matchAll(/code: "(\w+)"/gu)].map((match) => match[1]))].sort();
  for (const [locale, dictionary] of Object.entries(dictionaries)) {
    assert.deepEqual(Object.keys(dictionary.quote.form.validation).sort(), emitted, locale);
  }
  // Templates use {max} exactly where the validator sends params.max.
  const withParams = [...new Set([...source.matchAll(/code: "(\w+)", params: \{ max:/gu)].map((match) => match[1]))].sort();
  const templated = Object.entries(dictionaries.en.quote.form.validation).filter(([, text]) => text.includes("{max}")).map(([code]) => code).sort();
  assert.deepEqual(templated, withParams);
});

test("English validation messages render exactly as before M9.3", () => {
  const t = dictionaries.en.quote.form.validation;
  const render = (error) => t[error.code].replace("{max}", String(error.params?.max ?? ""));
  const cases = [
    [valid({ company: "x".repeat(121) }), "company", "Use 120 characters or fewer."],
    [valid({ company: "   " }), "company", "This field is required."],
    [valid({ email: "bad" }), "email", "Enter a valid business email address."],
    [valid({ phone: "1\n2" }), "phone", "Use a single line."],
    [valid({ consent: false }), "consent", "Your privacy consent is required to submit this request."],
    [valid({ items: [] }), "items", "Select at least one product before requesting a quote."],
    [valid({ items: [{ productId: ids[0], quantity: 1000 }] }), "items", "Each quantity must be a whole number from 1 to 999."],
    [valid({ items: Array.from({ length: 21 }, () => ({ productId: ids[0], quantity: 1 })) }), "items", "Select no more than 20 products."],
    [valid({ items: ids.slice(0, 6).map((productId) => ({ productId, quantity: 999 })) }), "items", "The selection cannot exceed 5000 total units."],
  ];
  for (const [input, field, message] of cases) assert.equal(render(validateQuoteRequest(input, ids).errors[field]), message, field);
});

test("the internal email keeps canonical IDs and English names and reports the preferred language", async () => {
  for (const [locale, line] of [["sq", "Preferred language: Albanian (sq)"], ["en", "Preferred language: English (en)"], [undefined, "Preferred language: Not specified"]]) {
    let received;
    const adapter = { deliver: async (request) => { received = request; return { accepted: true, reference: "test-acceptance" }; } };
    const result = await submitQuoteRequest(valid(locale ? { locale } : {}), randomUUID(), adapter);
    assert.equal(result.status, 200);
    assert.equal(received.locale, locale);
    assert.deepEqual(received.items, [{ productId: ids[0], name: english.products[0].name, category: english.categories[english.products[0].categoryId].label, quantity: 2, demonstration: true }]);
    const message = createQuoteMessage(received);
    assert.ok(message.text.includes(line), line);
    assert.ok(message.text.includes(`${ids[0]} | ${english.products[0].name} | Head protection | Quantity: 2 | DEMONSTRATION`));
  }
});

test("a changed preferred language with the same request ID is treated as a changed request", async () => {
  const key = randomUUID();
  const failing = { deliver: async () => { throw new Error("provider down"); } };
  assert.equal((await submitQuoteRequest(valid({ locale: "sq" }), key, failing)).status, 502);
  const changed = await submitQuoteRequest(valid({ locale: "en" }), key, failing);
  assert.equal(changed.status, 409);
  assert.equal(changed.body.code, "request_changed");
});

// HTTP contract, with the same safe fixtures as quote-http.test.mjs (no real delivery).
const origin = "https://prosafe.example.test";
function fixture() {
  let time = 1_700_000_000_000;
  const deliveries = [];
  const delivery = { deliver: async (request, key) => { deliveries.push({ request, key }); return { accepted: true, reference: "test-recorded-acceptance" }; } };
  const handlers = createQuoteHandlers({ delivery, expectedOrigin: origin, secret: "test-form-secret-32-characters-long", now: () => time });
  return { ...handlers, deliveries, advance: (ms) => { time += ms; } };
}
async function post(handler, body) {
  const { token } = await (await handler.GET()).json();
  handler.advance(2000);
  const response = await handler.POST(new Request(`${origin}/api/quote`, {
    method: "POST", body: JSON.stringify(body),
    headers: { Origin: origin, "Content-Type": "application/json", "X-Quote-Token": token, "Idempotency-Key": randomUUID() },
  }));
  return { status: response.status, body: await response.json() };
}

test("API validation responses carry structured error codes with parameters", async () => {
  const handler = fixture();
  const { status, body } = await post(handler, valid({ company: "x".repeat(121), consent: false, locale: "de" }));
  assert.equal(status, 400);
  assert.equal(body.ok, false);
  assert.equal(body.code, "validation");
  assert.equal(typeof body.message, "string");
  assert.deepEqual(body.errors, { company: { code: "too_long", params: { max: 120 } }, consent: { code: "consent_required" }, locale: { code: "invalid_locale" } });
  assert.equal(handler.deliveries.length, 0);
});

test("API accepts requests with and without a preferred language", async () => {
  const handler = fixture();
  assert.equal((await post(handler, valid())).status, 200);
  assert.equal((await post(handler, valid({ locale: "sq" }))).status, 200);
  assert.deepEqual(handler.deliveries.map(({ request }) => request.locale), [undefined, "sq"]);
});

test("the client renders API validation errors in the visitor's language (no delivery enabled)", async () => {
  const { readServerErrors, quoteErrorText } = compiled.load("src/features/quote/quote-errors.ts");
  const handler = fixture();
  const { body } = await post(handler, valid({ company: "x".repeat(121), items: [{ productId: "UNKNOWN", quantity: 1 }] }));
  const render = (locale) => {
    const messages = dictionaries[locale].quote.form.validation;
    const errors = readServerErrors(body.errors, messages);
    return [quoteErrorText(messages, errors.company), quoteErrorText(messages, errors.items)];
  };
  assert.deepEqual(render("en"), ["Use 120 characters or fewer.", "A selected product is unavailable. Review your selection."]);
  assert.deepEqual(render("sq"), ["Përdorni 120 karaktere ose më pak.", "Një produkt i përzgjedhur nuk është i disponueshëm. Kontrolloni përzgjedhjen tuaj."]);
  // Malformed or unknown error entries from a response are ignored rather than rendered.
  assert.deepEqual(readServerErrors({ company: "Legacy string message", email: { code: "not_a_code" }, admin: { code: "required" }, phone: { code: "too_long", params: { max: "40" } } }, dictionaries.en.quote.form.validation), { phone: { code: "too_long" } });
  assert.deepEqual(readServerErrors(null, dictionaries.en.quote.form.validation), {});
  assert.equal(handler.deliveries.length, 0);
});

test("Albanian validation messages render with interpolated limits for every rule", () => {
  const t = dictionaries.sq.quote.form.validation;
  const render = (error) => t[error.code].replace("{max}", String(error.params?.max ?? ""));
  const cases = [
    [valid({ company: "x".repeat(121) }), "company", "Përdorni 120 karaktere ose më pak."],
    [valid({ company: "   " }), "company", "Kjo fushë është e detyrueshme."],
    [valid({ company: 5 }), "company", "Shënoni një vlerë tekstuale të vlefshme."],
    [valid({ company: "A\u0000B" }), "company", "Hiqni karakteret e kontrollit që nuk mbështeten."],
    [valid({ email: "bad" }), "email", "Shënoni një adresë të vlefshme email-i biznesi."],
    [valid({ phone: "1\n2" }), "phone", "Përdorni vetëm një rresht."],
    [valid({ consent: false }), "consent", "Pëlqimi juaj për privatësinë është i nevojshëm për ta dërguar këtë kërkesë."],
    [valid({ website: "x" }), "website", "Kjo kërkesë nuk mund të dërgohet. Ju lutemi provoni përsëri."],
    [valid({ items: [] }), "items", "Përzgjidhni të paktën një produkt para se të kërkoni ofertë."],
    [valid({ items: ["x"] }), "items", "Përzgjedhja juaj e produkteve nuk është e vlefshme. Kontrolloni artikujt e përzgjedhur."],
    [valid({ items: [{ productId: ids[0], quantity: 1 }, { productId: ids[0], quantity: 1 }] }), "items", "Çdo produkt mund të shfaqet vetëm një herë. Rregulloni sasinë e tij."],
    [valid({ items: [{ productId: ids[0], quantity: 1000 }] }), "items", "Çdo sasi duhet të jetë numër i plotë nga 1 deri në 999."],
    [valid({ items: Array.from({ length: 21 }, () => ({ productId: ids[0], quantity: 1 })) }), "items", "Përzgjidhni jo më shumë se 20 produkte."],
    [valid({ items: ids.slice(0, 6).map((productId) => ({ productId, quantity: 999 })) }), "items", "Përzgjedhja nuk mund të kalojë 5000 njësi gjithsej."],
    [valid({ locale: "de" }), "locale", "Zgjidhni një gjuhë të mbështetur."],
  ];
  for (const [input, field, message] of cases) assert.equal(render(validateQuoteRequest(input, ids).errors[field]), message, field);
});
