/** Supported content languages. Albanian is the default and is served without a URL prefix. */
export const LOCALES = ["sq", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "sq";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
