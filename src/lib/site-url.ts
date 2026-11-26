/**
 * Search configuration. Two separate settings, both read from the environment:
 *
 * - SITE_URL: the public HTTPS origin. Enables full-URL canonical, hreflang and
 *   og:url metadata. It does NOT by itself make the site indexable.
 * - SEARCH_INDEXING: indexing permission. Only the exact value "enabled" grants
 *   it; anything else (unset, "disabled", a typo) keeps indexing off.
 *
 * Pages, robots.txt and the sitemap become indexable only when BOTH are valid.
 * Fail-closed: every other combination renders noindex, disallows crawling and
 * keeps the sitemap empty. Quotation pages, legal drafts and 404s are noindex
 * under every configuration.
 */

/** Only an explicitly configured public origin may appear in search metadata. */
export function getSiteOrigin(value = process.env.SITE_URL): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password && url.pathname === "/" && !url.search && !url.hash) {
      return url.origin;
    }
  } catch { /* Report the configuration problem without exposing its value. */ }
  throw new Error("SITE_URL must be an HTTPS origin without credentials, path, query, or fragment.");
}

/** The only SEARCH_INDEXING value that grants indexing permission. */
export const SEARCH_INDEXING_ENABLED = "enabled";

export function isSearchIndexingEnabled(value = process.env.SEARCH_INDEXING): boolean {
  return value === SEARCH_INDEXING_ENABLED;
}

export type SearchConfig = {
  /** Public origin for canonical, hreflang and og:url; undefined when SITE_URL is unset. */
  origin: string | undefined;
  /** True only with a valid SITE_URL and SEARCH_INDEXING=enabled. */
  indexable: boolean;
};

/** The single place that decides whether the site may be indexed. */
export function getSearchConfig(siteUrl = process.env.SITE_URL, searchIndexing = process.env.SEARCH_INDEXING): SearchConfig {
  const origin = getSiteOrigin(siteUrl);
  return { origin, indexable: Boolean(origin) && isSearchIndexingEnabled(searchIndexing) };
}
