import assert from "node:assert/strict";
import { after, test } from "node:test";
import { readFile } from "node:fs/promises";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources([
  "src/lib/site-url.ts", "src/i18n/config.ts", "src/i18n/paths.ts", "src/i18n/seo.ts", "src/app/sitemap.ts", "src/app/robots.ts",
]);
after(() => compiled.cleanup());
const { getSearchConfig, isSearchIndexingEnabled } = compiled.load("src/lib/site-url.ts");
const { indexableMetadata, NOINDEX } = compiled.load("src/i18n/seo.ts");
const { default: sitemap } = compiled.load("src/app/sitemap.ts");
const { default: robots } = compiled.load("src/app/robots.ts");
const ORIGIN = "https://prosaferks.com";
const DISALLOW_ALL = { rules: { userAgent: "*", disallow: "/" } };

function withEnv(values, run) {
  const saved = { SITE_URL: process.env.SITE_URL, SEARCH_INDEXING: process.env.SEARCH_INDEXING };
  try {
    for (const [key, value] of Object.entries(values)) if (value === undefined) delete process.env[key]; else process.env[key] = value;
    return run();
  } finally {
    for (const [key, value] of Object.entries(saved)) if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
}
const observe = () => {
  const page = indexableMetadata("en", "/about", { title: "About", description: "D." });
  return {
    config: getSearchConfig(),
    canonical: page.alternates?.canonical,
    xDefault: page.alternates?.languages?.["x-default"],
    ogUrl: page.openGraph.url,
    sitemap: sitemap().length,
    robots: robots(),
  };
};

test("configuration matrix: indexing requires a valid SITE_URL and SEARCH_INDEXING=enabled", () => {
  const off = (canonical) => ({ indexable: false, canonical, sitemap: 0, robots: DISALLOW_ALL });
  const matrix = [
    ["neither configured", {}, { origin: undefined, ...off(undefined) }],
    ["SITE_URL only", { SITE_URL: ORIGIN }, { origin: ORIGIN, ...off(`${ORIGIN}/en/about`) }],
    ["SITE_URL + disabled", { SITE_URL: ORIGIN, SEARCH_INDEXING: "disabled" }, { origin: ORIGIN, ...off(`${ORIGIN}/en/about`) }],
    ["SEARCH_INDEXING only", { SEARCH_INDEXING: "enabled" }, { origin: undefined, ...off(undefined) }],
    ["empty SITE_URL + enabled", { SITE_URL: "", SEARCH_INDEXING: "enabled" }, { origin: undefined, ...off(undefined) }],
    ["both configured", { SITE_URL: ORIGIN, SEARCH_INDEXING: "enabled" }, { origin: ORIGIN, indexable: true, canonical: `${ORIGIN}/en/about`, sitemap: 56, robots: { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/quote", "/en/quote"] }, sitemap: `${ORIGIN}/sitemap.xml` } }],
  ];
  for (const [name, env, expected] of matrix) {
    withEnv({ SITE_URL: undefined, SEARCH_INDEXING: undefined, ...env }, () => {
      const result = observe();
      assert.deepEqual(
        { origin: result.config.origin, indexable: result.config.indexable, canonical: result.canonical, sitemap: result.sitemap, robots: result.robots },
        expected, name);
      assert.equal(result.ogUrl, result.canonical, `${name}: og:url follows the canonical`);
      assert.equal(result.xDefault, expected.canonical && `${ORIGIN}/about`, `${name}: x-default`);
    });
  }
});

test("invalid SEARCH_INDEXING values fail closed", () => {
  for (const value of ["", "true", "1", "yes", "Enabled", "ENABLED", " enabled", "enabled ", "on", "disabled"]) {
    assert.equal(isSearchIndexingEnabled(value), false, JSON.stringify(value));
    withEnv({ SITE_URL: ORIGIN, SEARCH_INDEXING: value }, () => {
      const result = observe();
      assert.equal(result.config.indexable, false, value);
      assert.equal(result.sitemap, 0, value);
      assert.deepEqual(result.robots, DISALLOW_ALL, value);
    });
  }
  assert.equal(isSearchIndexingEnabled("enabled"), true);
  assert.equal(isSearchIndexingEnabled(undefined), false);
});

test("invalid SITE_URL values are rejected whatever SEARCH_INDEXING says", () => {
  for (const searchIndexing of [undefined, "enabled"]) {
    for (const value of ["http://prosaferks.com", "https://prosaferks.com/path", "https://u:p@prosaferks.com", "https://prosaferks.com/?q=1", "nonsense"]) {
      withEnv({ SITE_URL: value, SEARCH_INDEXING: searchIndexing }, () => {
        assert.throws(() => getSearchConfig(), /SITE_URL/u, value);
        assert.throws(() => robots(), /SITE_URL/u, value);
        assert.throws(() => sitemap(), /SITE_URL/u, value);
      });
    }
  }
});

test("quotation, legal drafts and 404s use an explicit noindex under every configuration", async () => {
  assert.deepEqual(NOINDEX, { index: false, follow: true });
  // These modules render JSX, so check their metadata wiring in source: each uses NOINDEX and never indexableMetadata.
  const files = {
    "src/views/quote.tsx": "quoteMetadata", "src/views/privacy.tsx": "privacyMetadata", "src/views/imprint.tsx": "imprintMetadata",
    "src/views/not-found.tsx": "notFoundMetadata",
    "src/views/product-not-found.tsx": "productNotFoundMetadata", "src/views/industry-not-found.tsx": "industryNotFoundMetadata",
  };
  for (const [file, fn] of Object.entries(files)) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    const body = source.slice(source.indexOf(`function ${fn}`), source.indexOf("\n}\n", source.indexOf(`function ${fn}`)));
    assert.match(body, /robots: NOINDEX/u, file);
    assert.doesNotMatch(body, /indexableMetadata|alternates|canonical/u, file);
  }
  for (const file of ["src/views/product-detail.tsx", "src/views/industry-detail.tsx"]) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    assert.match(source, /: \{ title: [^}]*notFoundTitle, robots: NOINDEX \}/u, `${file}: unknown slugs are noindex without alternates`);
  }
  for (const tree of ["(sq)", "en"]) {
    for (const [file, fn] of [["not-found.tsx", "notFoundMetadata"], ["products/[slug]/not-found.tsx", "productNotFoundMetadata"], ["industries/[slug]/not-found.tsx", "industryNotFoundMetadata"]]) {
      const source = await readFile(new URL(`../src/app/${tree}/${file}`, import.meta.url), "utf8");
      assert.match(source, new RegExp(`export const metadata = ${fn}\\("(sq|en)"\\);`, "u"), `${tree}/${file}`);
    }
  }
});

test("sitemap entries and robots.txt agree when indexing is enabled", () => {
  withEnv({ SITE_URL: ORIGIN, SEARCH_INDEXING: "enabled" }, () => {
    const urls = sitemap().map((entry) => entry.url);
    const disallowed = robots().rules.disallow;
    assert.equal(urls.length, 56);
    for (const url of urls) {
      const path = url.slice(ORIGIN.length) || "/";
      assert.ok(!disallowed.some((prefix) => path === prefix || path.startsWith(prefix.endsWith("/") ? prefix : `${prefix}/`)), `${url} is not blocked by robots.txt`);
    }
  });
});
