import type { Metadata } from "next";
import { PRODUCT_RECORDS } from "@/features/catalog/products";
import { INDUSTRY_RECORDS } from "@/features/industries/industries";
import { getSearchConfig, type SearchConfig } from "@/lib/site-url";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "./config";
import { localizePath, type InternalPath } from "./paths";

/**
 * Open Graph locales use language_TERRITORY (https://ogp.me/, default en_US).
 * Albanian uses sq_AL: Kosovo's "XK" is not an ISO 3166-1 assigned code.
 */
export const OG_LOCALES: Record<Locale, string> = { sq: "sq_AL", en: "en_US" };

/**
 * Robots directive for every page that is never indexed: the quotation page,
 * legal drafts and 404s. It is also the root layout's site-wide default, so a
 * page that does not decide for itself (such as vinext's root 404, which skips
 * not-found metadata) is noindex under every configuration.
 */
export const NOINDEX = { index: false, follow: true } as const;

/** hreflang values: plain language codes, x-default points to Albanian. */
export const HREFLANG: Record<Locale, string> = { sq: "sq", en: "en" };

/**
 * Pages eligible for search engines (identical in both languages), as unprefixed
 * paths without query strings. Excluded: the quotation page, legal drafts
 * (noindex), API routes, 404s and search/filter URL variants.
 */
export function indexablePaths(): InternalPath[] {
  return [
    "/", "/about", "/brands", "/contact", "/products", "/industries", "/protection-explorer", "/find-your-protection",
    ...INDUSTRY_RECORDS.map(({ slug }) => `/industries/${slug}` as const),
    ...PRODUCT_RECORDS.map(({ slug }) => `/products/${slug}` as const),
  ];
}

function assertPagePath(path: InternalPath) {
  if (/[?#]/u.test(path) || path === "/en" || path.startsWith("/en/")) {
    throw new Error(`SEO paths must be unprefixed and without query or fragment: ${path}`);
  }
}

/** Absolute URL of `path` in `locale`, or undefined when no SITE_URL is configured. */
export function absoluteUrl(locale: Locale, path: InternalPath, origin = getSearchConfig().origin): string | undefined {
  assertPagePath(path);
  if (!origin) return undefined;
  const localized = localizePath(locale, path);
  // The Albanian home is the bare origin, matching how Next.js and vinext serialize page metadata URLs.
  return localized === "/" ? origin : `${origin}${localized}`;
}

/** sq, en and x-default (Albanian) full URLs for one page. */
export function languageAlternates(path: InternalPath, origin = getSearchConfig().origin): Record<string, string> | undefined {
  if (!origin) return undefined;
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) languages[HREFLANG[locale]] = absoluteUrl(locale, path, origin)!;
  languages["x-default"] = absoluteUrl(DEFAULT_LOCALE, path, origin)!;
  return languages;
}

type PageText = {
  /** Page title segment (the root template adds " | PROSAFE"); omit for the homepage. */
  title?: string;
  /** Full document title, used for og:title when the page has no segment (homepage). */
  fullTitle?: string;
  description: string;
};

/**
 * Metadata for an indexable page: its localized title and description, the
 * indexing decision (index only with a valid SITE_URL and SEARCH_INDEXING=enabled),
 * plus (only with a valid SITE_URL) a self-referencing canonical, reciprocal
 * hreflang alternates and og:url. Open Graph text and locales are always present.
 */
export function indexableMetadata(locale: Locale, path: InternalPath, page: PageText, search: SearchConfig = getSearchConfig()): Metadata {
  assertPagePath(path);
  const { origin, indexable } = search;
  const url = absoluteUrl(locale, path, origin);
  return {
    ...(page.title === undefined ? {} : { title: page.title }),
    description: page.description,
    robots: indexable ? { index: true, follow: true } : NOINDEX,
    ...(url ? { alternates: { canonical: url, languages: languageAlternates(path, origin) } } : {}),
    openGraph: {
      type: "website",
      siteName: "PROSAFE",
      title: page.title === undefined ? page.fullTitle : `${page.title} | PROSAFE`,
      description: page.description,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((other) => other !== locale).map((other) => OG_LOCALES[other]),
      ...(url ? { url } : {}),
    },
  };
}
