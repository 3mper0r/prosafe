import assert from "node:assert/strict";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources(["src/i18n/config.ts", "src/i18n/paths.ts", "src/i18n/format.ts"]);
after(() => compiled.cleanup());
const { localizePath, stripLocale, getPathLocale } = compiled.load("src/i18n/paths.ts");
const { formatMessage, formatPlural } = compiled.load("src/i18n/format.ts");

test("Albanian paths stay unprefixed and English paths live under /en", () => {
  const cases = [
    ["/", "/", "/en"],
    ["/about", "/about", "/en/about"],
    ["/products/brimmed-safety-helmet", "/products/brimmed-safety-helmet", "/en/products/brimmed-safety-helmet"],
    ["/products?category=safety-helmets&industry=construction", "/products?category=safety-helmets&industry=construction", "/en/products?category=safety-helmets&industry=construction"],
    ["/find-your-protection#discovery-results", "/find-your-protection#discovery-results", "/en/find-your-protection#discovery-results"],
    ["/#protection", "/#protection", "/en#protection"],
    ["/?q=1", "/?q=1", "/en?q=1"],
  ];
  for (const [input, sq, en] of cases) {
    assert.equal(localizePath("sq", input), sq, `sq ${input}`);
    assert.equal(localizePath("en", input), en, `en ${input}`);
  }
});

test("localizing is idempotent and switches between languages", () => {
  for (const path of ["/", "/about", "/products?q=helmet#results", "/#protection"]) {
    const en = localizePath("en", path);
    assert.equal(localizePath("en", en), en);
    assert.equal(localizePath("sq", en), path);
  }
});

test("only a whole /en segment marks an English path", () => {
  assert.equal(getPathLocale("/en"), "en");
  assert.equal(getPathLocale("/en/about"), "en");
  assert.equal(getPathLocale("/en?x=1"), "en");
  assert.equal(getPathLocale("/en#top"), "en");
  assert.equal(getPathLocale("/about"), "sq");
  for (const path of ["/enterprise", "/entry/en", "/products/en-route"]) {
    assert.equal(getPathLocale(path), "sq", path);
    assert.equal(stripLocale(path), path, path);
    assert.equal(localizePath("en", path), `/en${path}`, path);
  }
});

test("stripLocale removes only the language prefix", () => {
  assert.equal(stripLocale("/en"), "/");
  assert.equal(stripLocale("/en/products/x?y=1#z"), "/products/x?y=1#z");
  assert.equal(stripLocale("/en?q=1"), "/?q=1");
  assert.equal(stripLocale("/en#protection"), "/#protection");
  assert.equal(stripLocale("/products"), "/products");
});

test("message templates interpolate values and select plural forms", () => {
  const forms = { one: "{count} product", other: "{count} products" };
  assert.equal(formatPlural("en", 1, forms), "1 product");
  assert.equal(formatPlural("en", 0, forms), "0 products");
  assert.equal(formatPlural("sq", 1, { one: "{count} produkt", other: "{count} produkte" }), "1 produkt");
  assert.equal(formatPlural("sq", 3, { one: "{count} produkt", other: "{count} produkte" }), "3 produkte");
  assert.equal(formatMessage("{name} added", { name: "Helmet" }), "Helmet added");
  assert.equal(formatMessage("{missing} stays", {}), "{missing} stays");
});
