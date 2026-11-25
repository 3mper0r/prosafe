import { DEFAULT_LOCALE, type Locale } from "./config";

/** An application-internal path, optionally with a query string and/or hash. */
export type InternalPath = `/${string}`;

const ENGLISH_PREFIX = "/en";

/** Split "/a/b?x=1#h" into its pathname and the "?x=1#h" suffix. */
function splitPath(path: InternalPath): { pathname: InternalPath; suffix: string } {
  const index = path.search(/[?#]/u);
  if (index === -1) return { pathname: path, suffix: "" };
  const pathname = path.slice(0, index);
  return { pathname: (pathname || "/") as InternalPath, suffix: path.slice(index) };
}

function hasEnglishPrefix(pathname: string): boolean {
  return pathname === ENGLISH_PREFIX || pathname.startsWith(`${ENGLISH_PREFIX}/`);
}

/** Locale of an internal path. Albanian routes are unprefixed; English routes live under /en. */
export function getPathLocale(path: InternalPath): Locale {
  return hasEnglishPrefix(splitPath(path).pathname) ? "en" : DEFAULT_LOCALE;
}

/** Remove any locale prefix, keeping the query string and hash: "/en/products?q=1" → "/products?q=1". */
export function stripLocale(path: InternalPath): InternalPath {
  const { pathname, suffix } = splitPath(path);
  if (!hasEnglishPrefix(pathname)) return path;
  const rest = pathname.slice(ENGLISH_PREFIX.length);
  return `${rest || "/"}${suffix}` as InternalPath;
}

/**
 * Path for `locale`, keeping the query string and hash. Idempotent: an already
 * localized path is first normalized, so this also switches between locales.
 */
export function localizePath(locale: Locale, path: InternalPath): InternalPath {
  const { pathname, suffix } = splitPath(stripLocale(path));
  if (locale === DEFAULT_LOCALE) return `${pathname}${suffix}` as InternalPath;
  return `${pathname === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${pathname}`}${suffix}` as InternalPath;
}
