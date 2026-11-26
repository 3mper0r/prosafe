import type { MetadataRoute } from "next";
import { getSearchConfig } from "../lib/site-url";
import { LOCALES } from "../i18n/config";
import { absoluteUrl, indexablePaths, languageAlternates } from "../i18n/seo";

/**
 * Both languages of every indexable page, Albanian first, each with reciprocal
 * sq/en/x-default alternates. The same path list drives page canonicals, so the
 * sitemap and page-level metadata always agree. No lastModified: none is tracked.
 * Empty unless indexing is permitted (valid SITE_URL and SEARCH_INDEXING=enabled).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const { origin, indexable } = getSearchConfig();
  if (!origin || !indexable) return [];
  return indexablePaths().flatMap((path) => {
    const languages = languageAlternates(path, origin)!;
    return LOCALES.map((locale) => ({ url: absoluteUrl(locale, path, origin)!, alternates: { languages } }));
  });
}
