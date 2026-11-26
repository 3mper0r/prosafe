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
 *
 * An invalid SITE_URL fails the production build (prerendering), but at runtime
 * it only disables search metadata and indexing, so the Worker still starts and
 * every other route keeps working. A runtime fallback cannot change pages that
 * were already prerendered: build and runtime values must match.
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

/** Set by Next.js and vinext while they prerender during a production build. */
const isProductionBuild = () => process.env.NEXT_PHASE === "phase-production-build";

let reportedInvalidSiteUrl = false;

/** The single place that decides whether the site may be indexed. */
export function getSearchConfig(siteUrl = process.env.SITE_URL, searchIndexing = process.env.SEARCH_INDEXING): SearchConfig {
  let origin: string | undefined;
  try {
    origin = getSiteOrigin(siteUrl);
  } catch (error) {
    // Strict at build time: an invalid value must never be baked into a release.
    if (isProductionBuild()) throw error;
    // Runtime: fail closed (no URLs, not indexable). Log once per Worker instance, without the value.
    if (!reportedInvalidSiteUrl) {
      reportedInvalidSiteUrl = true;
      console.error("Configuration error: SITE_URL must be an HTTPS origin without credentials, path, query, or fragment. Canonical URLs and search indexing are disabled.");
    }
    return { origin: undefined, indexable: false };
  }
  return { origin, indexable: Boolean(origin) && isSearchIndexingEnabled(searchIndexing) };
}
