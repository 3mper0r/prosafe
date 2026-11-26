import assert from "node:assert/strict";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources();
after(() => compiled.cleanup());
const { normalizeSearchText, searchTerms, cleanSearchQuery, buildSearchText, matchesSearch, MAX_SEARCH_LENGTH } = compiled.load("src/features/catalog/search.ts");
const { getCatalog } = compiled.load("src/content/catalog.ts");
const en = getCatalog("en");
const sq = getCatalog("sq");
const ids = (products) => products.map((product) => product.id);
const find = (catalog, query, options = {}) => ids(catalog.filterProducts({ query, ...options }));

test("normalization ignores Albanian diacritics and letter case", () => {
  assert.equal(normalizeSearchText("Këpucë mbrojtëse"), "kepuce mbrojtese");
  assert.equal(normalizeSearchText("KËPUCË"), "kepuce");
  assert.equal(normalizeSearchText("Çizme"), "cizme");
  assert.equal(normalizeSearchText("ÇIZME PUNE"), "cizme pune");
  assert.equal(normalizeSearchText("Ndërtimtari"), "ndertimtari");
  assert.equal(normalizeSearchText("DEMO-HD-001"), "demo-hd-001");
  // Already-decomposed input (e + combining diaeresis) matches precomposed ë.
  assert.equal(normalizeSearchText("ë"), normalizeSearchText("ë"));
});

test("Albanian queries match with or without diacritics, in any case", () => {
  const text = buildSearchText(["Këpucë mbrojtëse", "Çizme pune me lidhëse", "DEMO-FT-001"]);
  for (const query of ["kepuce", "këpucë", "KËPUCË", "Kepuce", "cizme", "çizme", "ÇIZME", "mbrojtese lidhese", "LIDHËSE ÇIZME", "demo-ft-001", "DEMO-FT"]) {
    assert.equal(matchesSearch(text, searchTerms(query)), true, query);
  }
  for (const query of ["kepuca", "çizmet", "kepuce xyz"]) assert.equal(matchesSearch(text, searchTerms(query)), false, query);
});

test("query cleanup trims, limits length and splits terms", () => {
  assert.equal(cleanSearchQuery("  hard hat  "), "hard hat");
  assert.equal(cleanSearchQuery(["array"]), "");
  assert.equal(cleanSearchQuery(undefined), "");
  assert.equal(cleanSearchQuery("x".repeat(MAX_SEARCH_LENGTH + 50)).length, MAX_SEARCH_LENGTH);
  assert.deepEqual(searchTerms("  Hard   HAT "), ["hard", "hat"]);
  assert.deepEqual(searchTerms(""), []);
});

test("empty and whitespace queries return the whole (filtered) catalog", () => {
  assert.equal(find(en, "").length, 15);
  assert.equal(find(en, "   ").length, 15);
  assert.deepEqual(find(en, "", { categoryId: "safety-helmets" }), ["DEMO-HD-001", "DEMO-HD-002", "DEMO-HD-003"]);
});

test("unmatched queries return no products", () => {
  assert.deepEqual(find(en, "zzzz"), []);
  assert.deepEqual(find(en, "helmet zzzz"), []);
  assert.deepEqual(find(sq, "zzzz"), []);
});

test("English search behavior is preserved, including IDs, keywords and case", () => {
  assert.deepEqual(find(en, "helmet"), ["DEMO-HD-001", "DEMO-HD-002", "DEMO-HD-003"]);
  assert.deepEqual(find(en, "HARD HAT"), ["DEMO-HD-001", "DEMO-HD-002"]);
  assert.deepEqual(find(en, "demo-ft-002"), ["DEMO-FT-002"]);
  assert.deepEqual(find(en, "DEMO-HN"), ["DEMO-HN-001", "DEMO-HN-002", "DEMO-HN-003"]);
  assert.deepEqual(find(en, "foot protection"), ["DEMO-FT-001", "DEMO-FT-002", "DEMO-FT-003"]);
  assert.deepEqual(find(en, "pants"), ["DEMO-BD-002"]);
});

test("category, industry and search filters combine", () => {
  const construction = en.getIndustryBySlug("construction");
  assert.deepEqual(find(en, "", { industry: construction }), ["DEMO-HD-001", "DEMO-EY-001", "DEMO-HN-002", "DEMO-BD-001", "DEMO-FT-001"]);
  assert.deepEqual(find(en, "", { industry: construction, categoryId: "safety-footwear" }), ["DEMO-FT-001"]);
  assert.deepEqual(find(en, "boot", { industry: construction, categoryId: "safety-footwear" }), ["DEMO-FT-001"]);
  assert.deepEqual(find(en, "shoe", { industry: construction, categoryId: "safety-footwear" }), []);
  assert.deepEqual(find(en, "helmet", { categoryId: "safety-footwear" }), []);
  const maintenance = en.getIndustryBySlug("industrial-maintenance");
  assert.deepEqual(find(en, "gloves", { industry: maintenance }), ["DEMO-HN-003"]);
});

const HELMETS = ["DEMO-HD-001", "DEMO-HD-002", "DEMO-HD-003"];
const BOOTS = ["DEMO-FT-001", "DEMO-FT-003"];
const FOOTWEAR = ["DEMO-FT-001", "DEMO-FT-002", "DEMO-FT-003"];

test("Albanian search matches Albanian terms with or without diacritics, in any case", () => {
  for (const query of ["helmetë", "helmete", "HELMETË", "kaskë", "kaske", "KASKE"]) assert.deepEqual(find(sq, query), HELMETS, query);
  for (const query of ["çizme", "cizme", "ÇIZME", "Cizme"]) assert.deepEqual(find(sq, query), BOOTS, query);
  for (const query of ["këpucë", "kepuce", "KËPUCË"]) assert.deepEqual(find(sq, query), FOOTWEAR, query);
  assert.deepEqual(find(sq, "doreza"), ["DEMO-HN-001", "DEMO-HN-002", "DEMO-HN-003"]);
  assert.deepEqual(find(sq, "syze"), ["DEMO-EY-001", "DEMO-EY-002", "DEMO-EY-003"]);
  assert.deepEqual(find(sq, "mbrojtja e kokes"), HELMETS);
  assert.deepEqual(find(sq, "kombinezon"), ["DEMO-BD-003"]);
});

test("Albanian search also matches English trade terms but shows Albanian results", () => {
  assert.deepEqual(find(sq, "helmet"), HELMETS);
  assert.deepEqual(find(sq, "hard hat"), ["DEMO-HD-001", "DEMO-HD-002"]);
  assert.deepEqual(find(sq, "boots"), BOOTS);
  assert.deepEqual(find(sq, "gloves"), ["DEMO-HN-001", "DEMO-HN-002", "DEMO-HN-003"]);
  assert.deepEqual(find(sq, "safety glasses"), ["DEMO-EY-001"]);
  assert.deepEqual(find(sq, "coverall"), ["DEMO-BD-003"]);
  assert.deepEqual(find(sq, "head protection"), HELMETS);
  const results = sq.filterProducts({ query: "helmet" });
  assert.deepEqual(results.map((product) => product.name), ["Helmetë mbrojtëse me strehë", "Helmetë pune me strehë rrethore", "Helmetë pune me rrip nënmjekre"]);
});

test("PMP and PPE abbreviations match every product in Albanian only", () => {
  for (const query of ["PMP", "pmp", "PPE", "pajisje mbrojtese personale"]) assert.equal(find(sq, query).length, 15, query);
  assert.deepEqual(find(sq, "pmp helmetë"), HELMETS);
  assert.deepEqual(find(en, "ppe"), [], "English results are unchanged (no aliases)");
});

test("English search does not match Albanian-only terms", () => {
  for (const query of ["kaskë", "kepuce", "çizme", "doreza"]) assert.deepEqual(find(en, query), [], query);
});

test("IDs and SKUs match in both languages", () => {
  for (const catalog of [sq, en]) {
    assert.deepEqual(find(catalog, "DEMO-EY-002"), ["DEMO-EY-002"]);
    assert.deepEqual(find(catalog, "demo-hn"), ["DEMO-HN-001", "DEMO-HN-002", "DEMO-HN-003"]);
  }
});

test("Albanian combined filters and unmatched queries", () => {
  const construction = sq.getIndustryBySlug("construction");
  assert.deepEqual(find(sq, "cizme", { industry: construction, categoryId: "safety-footwear" }), ["DEMO-FT-001"]);
  assert.deepEqual(find(sq, "helmet", { industry: construction }), ["DEMO-HD-001"]);
  assert.deepEqual(find(sq, "kaske", { categoryId: "safety-footwear" }), []);
  assert.deepEqual(find(sq, "", { industry: construction }).length, 5);
  assert.deepEqual(find(sq, "xyzxyz"), []);
});
