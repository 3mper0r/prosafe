import assert from "node:assert/strict";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources(["src/i18n/config.ts", "src/i18n/preference.ts", "src/i18n/paths.ts"]);
after(() => compiled.cleanup());
const { LOCALE_PREFERENCE_KEY, readLocalePreference, saveLocalePreference } = compiled.load("src/i18n/preference.ts");
const { localizePath } = compiled.load("src/i18n/paths.ts");

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
  };
}
const throwing = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); }, removeItem() { throw new Error("blocked"); } };

test("the preference uses its own key, separate from the quotation selection", () => {
  assert.equal(LOCALE_PREFERENCE_KEY, "prosafe.locale.v1");
  const storage = memoryStorage({ "prosafe.quote.v1": '{"version":1,"items":[]}' });
  assert.equal(saveLocalePreference("en", storage), true);
  assert.deepEqual([...storage.data.keys()].sort(), ["prosafe.locale.v1", "prosafe.quote.v1"]);
  assert.equal(storage.getItem("prosafe.quote.v1"), '{"version":1,"items":[]}');
});

test("only sq and en are saved and read back", () => {
  const storage = memoryStorage();
  assert.equal(readLocalePreference(storage), null);
  for (const locale of ["sq", "en"]) {
    assert.equal(saveLocalePreference(locale, storage), true);
    assert.equal(readLocalePreference(storage), locale);
  }
  for (const value of ["de", "EN", "", "sq-AL", null, 1]) {
    assert.equal(saveLocalePreference(value, storage), false, String(value));
    assert.equal(readLocalePreference(storage), "en", "a rejected value never overwrites the saved choice");
  }
});

test("invalid stored values are ignored and removed", () => {
  for (const value of ["de", "SQ", "", "null", '"en"', "en "]) {
    const storage = memoryStorage({ "prosafe.locale.v1": value });
    assert.equal(readLocalePreference(storage), null, JSON.stringify(value));
    assert.equal(storage.data.has("prosafe.locale.v1"), false);
  }
});

test("blocked or unavailable storage never throws", () => {
  assert.equal(readLocalePreference(throwing), null);
  assert.equal(saveLocalePreference("sq", throwing), false);
  assert.equal(readLocalePreference(null), null);
  assert.equal(saveLocalePreference("en", null), false);
  // Outside a browser there is no window: the defaults resolve to no storage.
  assert.equal(readLocalePreference(), null);
  assert.equal(saveLocalePreference("en"), false);
});

test("switching keeps the page, query string and fragment", () => {
  const cases = [
    ["/products?q=helmet&category=safety-helmets", "/en/products?q=helmet&category=safety-helmets"],
    ["/find-your-protection?industry=construction#discovery-results", "/en/find-your-protection?industry=construction#discovery-results"],
    ["/#protection", "/en#protection"],
    ["/products/brimmed-safety-helmet", "/en/products/brimmed-safety-helmet"],
    ["/industries/logistics-warehousing", "/en/industries/logistics-warehousing"],
    ["/quote", "/en/quote"],
    ["/products/does-not-exist", "/en/products/does-not-exist"],
  ];
  for (const [albanian, english] of cases) {
    assert.equal(localizePath("en", albanian), english);
    assert.equal(localizePath("sq", english), albanian);
    assert.equal(localizePath("en", english), english, "the active language links to the same page");
  }
  assert.equal(localizePath("sq", "/en?q=x#top"), "/?q=x#top");
});
