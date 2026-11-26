import assert from "node:assert/strict";
import { after, test } from "node:test";
import { compileQuoteSources } from "./helpers/compile-quote.mjs";

const compiled = await compileQuoteSources([
  "src/lib/site-url.ts", "src/app/sitemap.ts", "src/app/robots.ts",
  "src/features/industries/industries.ts", "src/i18n/config.ts", "src/i18n/paths.ts", "src/i18n/seo.ts",
]);
after(() => compiled.cleanup());
const { getSiteOrigin } = compiled.load("src/lib/site-url.ts");
const { default: robots } = compiled.load("src/app/robots.ts");
const { default: sitemap } = compiled.load("src/app/sitemap.ts");

test("search metadata accepts only an HTTPS origin without URL components", () => {
  assert.equal(getSiteOrigin(""), undefined);
  assert.equal(getSiteOrigin("https://prosafe.example.test/"), "https://prosafe.example.test");
  for (const value of ["invalid", "http://example.test", "https://example.test/path", "https://user:pass@example.test", "https://example.test/?q=1", "https://example.test/#part"]) {
    assert.throws(() => getSiteOrigin(value), /SITE_URL/u);
  }
});

test("unconfigured previews block crawling without inventing sitemap URLs", () => {
  const saved = process.env.SITE_URL;
  try {
    process.env.SITE_URL = "";
    assert.deepEqual(sitemap(), []);
    assert.deepEqual(robots(), { rules: { userAgent: "*", disallow: "/" } });
  } finally {
    if (saved === undefined) delete process.env.SITE_URL; else process.env.SITE_URL = saved;
  }
});

test("configured sitemaps cover current pages, excluding quotes, drafts, and query variants", () => {
  const saved = process.env.SITE_URL;
  const savedIndexing = process.env.SEARCH_INDEXING;
  try {
    process.env.SITE_URL = "https://prosafe.example.test/";
    process.env.SEARCH_INDEXING = "enabled";
    const entries = sitemap();
    const urls = entries.map(({ url }) => url);
    assert.equal(entries.length, 56, "28 indexable pages in each language");
    assert.equal(new Set(urls).size, urls.length);
    assert(urls.includes("https://prosafe.example.test/products/brimmed-safety-helmet"));
    assert(urls.includes("https://prosafe.example.test/industries/construction"));
    assert(urls.includes("https://prosafe.example.test/en/products/brimmed-safety-helmet"));
    assert(urls.includes("https://prosafe.example.test/en"));
    for (const url of urls) assert(!/[?#]/u.test(url) && !/\/(quote|privacy|imprint)$/u.test(url) && !/\/api\//u.test(url));
    assert.deepEqual(robots(), {
      rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/quote", "/en/quote"] },
      sitemap: "https://prosafe.example.test/sitemap.xml",
    });
  } finally {
    if (savedIndexing === undefined) delete process.env.SEARCH_INDEXING; else process.env.SEARCH_INDEXING = savedIndexing;
    if (saved === undefined) delete process.env.SITE_URL; else process.env.SITE_URL = saved;
  }
});
