import assert from "node:assert/strict";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources([
  "src/i18n/config.ts", "src/i18n/dictionaries/en.ts", "src/i18n/dictionaries/sq.ts", "src/i18n/get-dictionary.ts",
]);
after(() => compiled.cleanup());
const { en } = compiled.load("src/i18n/dictionaries/en.ts");
const { sq } = compiled.load("src/i18n/dictionaries/sq.ts");
const { getClientMessages } = compiled.load("src/i18n/get-dictionary.ts");

/** Namespaces that still use the English placeholder in Albanian. Empty since M9.4 Batch 3. */
const ALBANIAN_PLACEHOLDERS = [];
/** Namespaces translated into Albanian (M9.4 Batches 1–2 approved; Batch 3 pending review). */
const ALBANIAN_TRANSLATED = [
  "common", "meta", "header", "footer", "quoteLink", "home", "about", "brands", "contact", "notFound",
  "riskNote", "demoNotice", "productCard", "catalog", "productDetail", "productNotFound", "industries",
  "industryDetail", "industryNotFound", "industryEquipment", "findYourProtection", "explorer", "addToQuote",
  "businessPage", "privacy", "imprint", "quote",
];

function leaves(value, path = []) {
  if (typeof value === "string") return [[path.join("."), value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => leaves(item, [...path, index]));
  return Object.entries(value).flatMap(([key, item]) => leaves(item, [...path, key]));
}
const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/gu)].map((match) => match[1]).sort();

test("both dictionaries have exactly the same keys, array lengths and value types", () => {
  const shape = (value) =>
    typeof value === "string" ? "string"
      : Array.isArray(value) ? value.map(shape)
      : Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]));
  assert.deepEqual(shape(sq), shape(en));
});

/** Fragments appended to other text, so they intentionally start with one space. */
const LEADING_SPACE = /^(catalog\.resultFilter(Industry|Category|AllCategories)|catalog\.resultSearch\.(one|other)|addToQuote\.storageUnavailable)$/u;

test("every message is a non-empty, trimmed string", () => {
  for (const [locale, dictionary] of Object.entries({ en, sq })) {
    for (const [key, value] of leaves(dictionary)) {
      const expected = LEADING_SPACE.test(key) ? ` ${value.trim()}` : value.trim();
      assert.ok(value.trim().length > 0 && value === expected, `${locale}.${key} is empty or has unexpected whitespace`);
    }
  }
});

/** Templates that receive a value in two forms; each language may use either form. */
const ALTERNATE_PLACEHOLDERS = { industryLower: "industry", categoryLower: "category" };
const canonical = (names) => [...new Set(names.map((name) => ALTERNATE_PLACEHOLDERS[name] ?? name))].sort();

test("templates use the same placeholders in both languages", () => {
  const english = new Map(leaves(en));
  for (const [key, value] of leaves(sq)) assert.deepEqual(canonical(placeholders(value)), canonical(placeholders(english.get(key))), `sq.${key}`);
});

test("plural messages provide both Albanian/English plural categories with the same placeholders", () => {
  const plurals = (value, path = []) => value && typeof value === "object" && !Array.isArray(value)
    ? ("one" in value && "other" in value ? [[path.join("."), value]] : Object.entries(value).flatMap(([key, item]) => plurals(item, [...path, key])))
    : [];
  for (const [locale, dictionary] of Object.entries({ en, sq })) {
    const found = plurals(dictionary);
    assert.ok(found.length >= 5, `${locale} plural messages`);
    for (const [key, forms] of found) {
      assert.deepEqual(Object.keys(forms).sort(), ["one", "other"], `${locale}.${key}`);
      assert.deepEqual(canonical(placeholders(forms.one)), canonical(placeholders(forms.other)), `${locale}.${key}`);
    }
  }
  assert.deepEqual(new Intl.PluralRules("sq").resolvedOptions().pluralCategories.sort(), ["one", "other"]);
});

test("internal paths are identical in both languages", () => {
  const english = new Map(leaves(en));
  for (const [key, value] of leaves(sq)) {
    if (key.endsWith(".href")) assert.equal(value, english.get(key), `sq.${key}`);
  }
});

test("the official slogan is never translated", () => {
  for (const [locale, dictionary] of Object.entries({ en, sq })) {
    assert.match(dictionary.meta.defaultTitle, /Safety Without Compromise\.$/u, `${locale}.meta.defaultTitle`);
    assert.match(dictionary.meta.description, /Safety Without Compromise\.$/u, `${locale}.meta.description`);
  }
});

test("translation status: placeholders and drafts are explicit and complete", () => {
  assert.deepEqual([...ALBANIAN_PLACEHOLDERS, ...ALBANIAN_TRANSLATED].sort(), Object.keys(en).sort(), "every namespace is classified");
  for (const namespace of ALBANIAN_PLACEHOLDERS) assert.equal(sq[namespace], en[namespace], `sq.${namespace} should be the English placeholder`);
  // Translated namespaces may keep only deliberate English: the slogan, brand and identifiers.
  const SAME_IN_BOTH = /^(PROSAFE(\s\/\s\d+)?|PROSAFE — Safety Without Compromise\.|\/[\w/-]*|Kosova|B2B|[\s/{}\w—.]*\{\w+\}[\s/{}—.]*|\{name\} — Demo|\{category\} \/ DEMO)$/u;
  for (const namespace of ALBANIAN_TRANSLATED) {
    const english = new Map(leaves(en[namespace]));
    const untranslated = leaves(sq[namespace]).filter(([key, value]) => value === english.get(key) && !SAME_IN_BOTH.test(value)).map(([key]) => `${namespace}.${key}`);
    assert.deepEqual(untranslated, [], "translated namespaces must not contain English leftovers");
  }
  const total = leaves(en).length;
  const placeholderCount = ALBANIAN_PLACEHOLDERS.reduce((sum, namespace) => sum + leaves(en[namespace]).length, 0);
  console.log(`dictionary messages: ${total} per language; Albanian translated: ${total - placeholderCount}; English placeholders: ${placeholderCount}`);
});

test("only the small client subset is passed through LocaleProvider", () => {
  for (const locale of ["sq", "en"]) {
    const messages = getClientMessages(locale);
    assert.deepEqual(Object.keys(messages).sort(), ["addToQuote", "common", "header", "quoteLink"]);
    const bytes = Buffer.byteLength(JSON.stringify(messages));
    assert.ok(bytes < 2048, `client messages for ${locale} are ${bytes} bytes`);
  }
});
