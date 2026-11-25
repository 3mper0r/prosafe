import type { Locale } from "./config";
import { en, type ClientMessages, type Dictionary } from "./dictionaries/en";
import { sq } from "./dictionaries/sq";

/** Static module-scope lookup: no dynamic import or per-request work. */
const dictionaries: Record<Locale, Dictionary> = { sq, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** The small subset of messages that client components need, passed once through LocaleProvider. */
export function getClientMessages(locale: Locale): ClientMessages {
  const { common, header, quoteLink } = dictionaries[locale];
  return { common, header, quoteLink };
}
