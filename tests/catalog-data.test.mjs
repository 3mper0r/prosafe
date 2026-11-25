import assert from "node:assert/strict";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources();
after(() => compiled.cleanup());
const { PRODUCT_RECORDS, isProductId } = compiled.load("src/features/catalog/products.ts");
const { INDUSTRY_RECORDS } = compiled.load("src/features/industries/industries.ts");
const { PRODUCT_CATEGORY_IDS } = compiled.load("src/lib/product-categories.ts");
const { PROTECTION_ZONES } = compiled.load("src/features/protection-explorer/zones.ts");
const { en } = compiled.load("src/content/en.ts");
const { sq } = compiled.load("src/content/sq.ts");
const { getCatalog } = compiled.load("src/content/catalog.ts");

/**
 * Public identifiers are part of URLs, stored quotation selections and the
 * quotation API. Changing them is a breaking change and must be deliberate.
 */
const PRODUCT_IDENTIFIERS = [
  ["DEMO-HD-001", "brimmed-safety-helmet", "safety-helmets"],
  ["DEMO-HD-002", "full-brim-work-helmet", "safety-helmets"],
  ["DEMO-HD-003", "chin-strap-work-helmet", "safety-helmets"],
  ["DEMO-EY-001", "clear-safety-glasses", "protective-eyewear"],
  ["DEMO-EY-002", "wraparound-work-glasses", "protective-eyewear"],
  ["DEMO-EY-003", "strap-fit-work-goggles", "protective-eyewear"],
  ["DEMO-HN-001", "knitted-work-gloves", "protective-gloves"],
  ["DEMO-HN-002", "palm-coated-work-gloves", "protective-gloves"],
  ["DEMO-HN-003", "cuff-work-gloves", "protective-gloves"],
  ["DEMO-BD-001", "panelled-work-jacket", "protective-clothing"],
  ["DEMO-BD-002", "pocket-work-trousers", "protective-clothing"],
  ["DEMO-BD-003", "zip-front-work-coverall", "protective-clothing"],
  ["DEMO-FT-001", "lace-up-work-boot", "safety-footwear"],
  ["DEMO-FT-002", "low-cut-work-shoe", "safety-footwear"],
  ["DEMO-FT-003", "pull-on-work-boot", "safety-footwear"],
];
const INDUSTRY_RELATIONSHIPS = {
  construction: ["DEMO-HD-001", "DEMO-EY-001", "DEMO-HN-002", "DEMO-BD-001", "DEMO-FT-001"],
  manufacturing: ["DEMO-EY-002", "DEMO-EY-003", "DEMO-HN-001", "DEMO-HN-002", "DEMO-BD-002", "DEMO-FT-002"],
  "logistics-warehousing": ["DEMO-HN-001", "DEMO-HN-002", "DEMO-BD-002", "DEMO-FT-002", "DEMO-FT-003"],
  "electrical-work": ["DEMO-HD-003", "DEMO-EY-001", "DEMO-HN-001", "DEMO-BD-001", "DEMO-FT-001"],
  "industrial-maintenance": ["DEMO-HD-003", "DEMO-EY-003", "DEMO-HN-003", "DEMO-BD-003", "DEMO-FT-003"],
};

test("product IDs, slugs and category relationships are stable", () => {
  assert.deepEqual(PRODUCT_RECORDS.map((product) => [product.id, product.slug, product.categoryId]), PRODUCT_IDENTIFIERS);
  assert.equal(new Set(PRODUCT_RECORDS.map((product) => product.id)).size, PRODUCT_RECORDS.length);
  assert.equal(new Set(PRODUCT_RECORDS.map((product) => product.slug)).size, PRODUCT_RECORDS.length);
  assert.equal(isProductId("DEMO-HD-001"), true);
  assert.equal(isProductId("demo-hd-001"), false);
});

test("category, industry and protection-zone identifiers and relationships are stable", () => {
  assert.deepEqual([...PRODUCT_CATEGORY_IDS], ["safety-helmets", "protective-eyewear", "protective-gloves", "protective-clothing", "safety-footwear"]);
  assert.deepEqual(Object.fromEntries(INDUSTRY_RECORDS.map((industry) => [industry.slug, [...industry.productIds]])), INDUSTRY_RELATIONSHIPS);
  assert.deepEqual(PROTECTION_ZONES.map((zone) => [zone.id, zone.categoryId]), [
    ["head", "safety-helmets"], ["eyes", "protective-eyewear"], ["hands", "protective-gloves"], ["body", "protective-clothing"], ["feet", "safety-footwear"],
  ]);
  for (const industry of INDUSTRY_RECORDS) {
    for (const id of industry.productIds) assert.ok(isProductId(id), `${industry.slug} references ${id}`);
    for (const id of industry.categoryIds) assert.ok(PRODUCT_CATEGORY_IDS.includes(id), `${industry.slug} references ${id}`);
  }
});

test("localized content covers exactly the core identifiers in both languages", () => {
  for (const [locale, content] of Object.entries({ en, sq })) {
    assert.deepEqual(Object.keys(content.products).sort(), PRODUCT_RECORDS.map((product) => product.id).sort(), `${locale} products`);
    assert.deepEqual(Object.keys(content.industries).sort(), INDUSTRY_RECORDS.map((industry) => industry.slug).sort(), `${locale} industries`);
    assert.deepEqual(Object.keys(content.categories).sort(), [...PRODUCT_CATEGORY_IDS].sort(), `${locale} categories`);
    assert.deepEqual(Object.keys(content.zones).sort(), PROTECTION_ZONES.map((zone) => zone.id).sort(), `${locale} zones`);
    for (const record of PRODUCT_RECORDS) {
      for (const variant of record.variants) {
        assert.ok(content.variants.labels[variant.kind], `${locale} variant label ${variant.kind}`);
        if (!["sizes", "euSizes"].includes(variant.kind)) for (const option of variant.options) assert.ok(content.variants.colors[option], `${locale} color ${option}`);
      }
    }
  }
});

test("every localized text value is a non-empty trimmed string", () => {
  const walk = (value, path) => typeof value === "string" ? [[path, value]]
    : Array.isArray(value) ? value.flatMap((item, index) => walk(item, `${path}[${index}]`))
    : Object.entries(value).flatMap(([key, item]) => walk(item, `${path}.${key}`));
  for (const [locale, content] of Object.entries({ en, sq })) {
    for (const [path, value] of walk(content, locale)) assert.ok(value.length > 0 && value === value.trim(), path);
  }
});

test("Albanian content sections are explicit English placeholders until M9.4", () => {
  for (const section of Object.keys(en)) assert.equal(sq[section], en[section], `sq.${section}`);
});

test("the resolved catalog keeps language-independent fields in both languages", () => {
  const english = getCatalog("en");
  const albanian = getCatalog("sq");
  assert.equal(getCatalog("en"), english, "built once per locale and reused");
  for (const [index, product] of english.products.entries()) {
    const other = albanian.products[index];
    assert.deepEqual([other.id, other.slug, other.categoryId, other.images.map((image) => image.src)], [product.id, product.slug, product.categoryId, product.images.map((image) => image.src)]);
    assert.equal(product.images[0].src, `/images/catalog/${product.categoryId}.svg`);
  }
  const glasses = english.getProductBySlug("wraparound-work-glasses");
  assert.deepEqual(glasses.variants, [{ label: "Example lens appearances", options: ["Clear", "Smoke"] }]);
  assert.deepEqual(english.getProductById("DEMO-FT-001").variants, [{ label: "Example EU sizes", options: ["40", "41", "42", "43", "44", "45", "46"] }]);
  assert.deepEqual(glasses.specifications.map((spec) => spec.label), ["Construction concept", "Format", "Manufacturer", "Safety ratings"]);
  assert.equal(english.getIndustryBySlug("electrical-work").equipmentNote.startsWith("These generic demos"), true);
  assert.equal(english.getIndustryBySlug("construction").equipmentNote, undefined);
  assert.equal(english.getProductBySlug("missing"), undefined);
});
