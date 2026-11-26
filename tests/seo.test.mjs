import assert from "node:assert/strict";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources([
  "src/lib/site-url.ts", "src/i18n/config.ts", "src/i18n/paths.ts", "src/i18n/seo.ts", "src/app/sitemap.ts", "src/app/robots.ts",
]);
after(() => compiled.cleanup());
const { indexableMetadata, indexablePaths, languageAlternates, absoluteUrl, OG_LOCALES } = compiled.load("src/i18n/seo.ts");
const { default: sitemap } = compiled.load("src/app/sitemap.ts");
const { default: robots } = compiled.load("src/app/robots.ts");
const ORIGIN = "https://prosaferks.com";

function withEnv(values, run) {
  const saved = { SITE_URL: process.env.SITE_URL, SEARCH_INDEXING: process.env.SEARCH_INDEXING };
  try {
    for (const [key, value] of Object.entries(values)) if (value === undefined) delete process.env[key]; else process.env[key] = value;
    return run();
  } finally {
    for (const [key, value] of Object.entries(saved)) if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
}
/** SITE_URL only (SEARCH_INDEXING unset): metadata URLs without indexing. */
const withSiteUrl = (value, run) => withEnv({ SITE_URL: value, SEARCH_INDEXING: undefined }, run);
/** Both settings: indexing permitted. */
const withIndexing = (run) => withEnv({ SITE_URL: ORIGIN, SEARCH_INDEXING: "enabled" }, run);
const page = { title: "Rreth nesh", description: "Përshkrim." };

test("with SITE_URL unset: no canonical, hreflang or og:url; empty sitemap; crawling disallowed", () => {
  withSiteUrl(undefined, () => {
    for (const locale of ["sq", "en"]) {
      const metadata = indexableMetadata(locale, "/about", page);
      assert.equal(metadata.alternates, undefined);
      assert.equal(metadata.openGraph.url, undefined);
      assert.equal(metadata.title, "Rreth nesh");
      assert.equal(metadata.description, "Përshkrim.");
    }
    assert.deepEqual(sitemap(), []);
    assert.deepEqual(robots(), { rules: { userAgent: "*", disallow: "/" } });
  });
  withSiteUrl("", () => assert.deepEqual(sitemap(), []));
});

test("self-referencing canonical and reciprocal sq/en/x-default alternates", () => {
  withSiteUrl(ORIGIN, () => {
    for (const path of ["/", "/about", "/products/brimmed-safety-helmet", "/industries/electrical-work"]) {
      const sq = indexableMetadata("sq", path, page).alternates;
      const en = indexableMetadata("en", path, page).alternates;
      const albanianUrl = path === "/" ? ORIGIN : `${ORIGIN}${path}`;
      const englishUrl = path === "/" ? `${ORIGIN}/en` : `${ORIGIN}/en${path}`;
      assert.equal(sq.canonical, albanianUrl, `sq canonical ${path}`);
      assert.equal(en.canonical, englishUrl, `en canonical ${path}`);
      const expected = { sq: albanianUrl, en: englishUrl, "x-default": albanianUrl };
      assert.deepEqual(sq.languages, expected, `sq alternates ${path}`);
      assert.deepEqual(en.languages, expected, `en alternates ${path} (reciprocal)`);
    }
  });
});

test("canonical URLs never contain search parameters or fragments", () => {
  withSiteUrl(ORIGIN, () => {
    for (const bad of ["/products?q=helmet", "/find-your-protection?industry=construction", "/#protection", "/en/about", "/en"]) {
      assert.throws(() => indexableMetadata("sq", bad, page), /unprefixed and without query or fragment/u, bad);
      assert.throws(() => absoluteUrl("en", bad), /unprefixed/u, bad);
    }
    // The catalog and Find Your Protection canonicals are the base page, whatever filters are applied.
    assert.equal(indexableMetadata("en", "/products", page).alternates.canonical, `${ORIGIN}/en/products`);
  });
});

test("Open Graph uses language_TERRITORY locales with the other language as alternate", () => {
  assert.deepEqual(OG_LOCALES, { sq: "sq_AL", en: "en_US" });
  for (const value of Object.values(OG_LOCALES)) assert.match(value, /^[a-z]{2}_[A-Z]{2}$/u);
  withSiteUrl(ORIGIN, () => {
    const sq = indexableMetadata("sq", "/about", page).openGraph;
    assert.deepEqual(sq, { type: "website", siteName: "PROSAFE", title: "Rreth nesh | PROSAFE", description: "Përshkrim.", locale: "sq_AL", alternateLocale: ["en_US"], url: `${ORIGIN}/about` });
    const en = indexableMetadata("en", "/", { fullTitle: "PROSAFE — Safety Without Compromise.", description: "D." }).openGraph;
    assert.equal(en.title, "PROSAFE — Safety Without Compromise.");
    assert.equal(en.locale, "en_US");
    assert.deepEqual(en.alternateLocale, ["sq_AL"]);
    assert.equal(en.url, `${ORIGIN}/en`);
  });
});

test("sitemap: 56 unique full URLs, both languages, reciprocal alternates, no timestamps", () => {
  withIndexing(() => {
    const entries = sitemap();
    const paths = indexablePaths();
    assert.equal(paths.length, 28);
    assert.equal(entries.length, 56);
    const urls = entries.map((entry) => entry.url);
    assert.equal(new Set(urls).size, 56, "no duplicates");
    for (const entry of entries) {
      assert.match(entry.url, /^https:\/\/prosaferks\.com(\/[a-z]|$)/u, "no trailing slash on the home URL");
      assert.equal("lastModified" in entry, false);
      const { sq, en, "x-default": xDefault } = entry.alternates.languages;
      assert.ok(urls.includes(sq) && urls.includes(en), "alternates point to listed URLs");
      assert.equal(xDefault, sq);
      assert.ok(entry.url === sq || entry.url === en, "each entry is one of its own alternates");
    }
    // Deterministic order: Albanian then English for each page in indexablePaths() order.
    assert.deepEqual(urls.slice(0, 4), [ORIGIN, `${ORIGIN}/en`, `${ORIGIN}/about`, `${ORIGIN}/en/about`]);
    assert.deepEqual(sitemap(), entries);
  });
});

test("sitemap excludes quotation, legal drafts, API, 404 and filter URLs", () => {
  withIndexing(() => {
    for (const url of sitemap().map((entry) => entry.url)) {
      assert.doesNotMatch(url, /\/(quote|privacy|imprint)$|\/api\/|does-not-exist|[?#]/u, url);
    }
  });
});

test("robots.txt with indexing enabled: allow, but exclude API and both quotation pages", () => {
  withIndexing(() => {
    assert.deepEqual(robots(), { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/quote", "/en/quote"] }, sitemap: `${ORIGIN}/sitemap.xml` });
  });
});

test("invalid SITE_URL values are rejected instead of producing wrong URLs", () => {
  for (const value of ["http://prosaferks.com", "https://prosaferks.com/path", "https://user:pass@prosaferks.com", "https://prosaferks.com/?x=1", "not a url"]) {
    withEnv({ SITE_URL: value, SEARCH_INDEXING: "enabled" }, () => {
      assert.throws(() => sitemap(), /SITE_URL/u, value);
      assert.throws(() => indexableMetadata("sq", "/about", page), /SITE_URL/u, value);
    });
  }
  // A trailing slash on a valid origin is normalized.
  withSiteUrl("https://prosaferks.com/", () => assert.equal(languageAlternates("/about").en, `${ORIGIN}/en/about`));
});
