import type { Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { sq } from "./dictionaries/sq";

/** Static module-scope lookup: no dynamic import or per-request work. */
const dictionaries: Record<Locale, Dictionary> = { sq, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Internal path for a locale. Albanian is unprefixed; English lives under /en. */
export function localizePath(locale: Locale, path: `/${string}`): string {
  if (locale === "sq") return path;
  return path === "/" ? "/en" : `/en${path}`;
}
