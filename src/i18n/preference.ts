import { isLocale, type Locale } from "./config";

/**
 * The visitor's explicit language choice, saved when they use the language
 * switcher. The URL is always authoritative for what is displayed: nothing in
 * the app redirects or re-renders based on this value. It exists so later,
 * separately approved features (for example a non-intrusive suggestion on the
 * unprefixed root, or prefilling a contact preference) can respect a choice the
 * visitor already made, without cookies.
 */
export const LOCALE_PREFERENCE_KEY = "prosafe.locale.v1";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function browserStorage(): StorageLike | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null; // Access itself can throw when storage is blocked.
  }
}

/** The saved language, or null when none, invalid or storage is unavailable. Invalid values are removed. */
export function readLocalePreference(storage: StorageLike | null = browserStorage()): Locale | null {
  if (!storage) return null;
  try {
    const value = storage.getItem(LOCALE_PREFERENCE_KEY);
    if (value === null) return null;
    if (isLocale(value)) return value;
    storage.removeItem(LOCALE_PREFERENCE_KEY);
    return null;
  } catch {
    return null;
  }
}

/** Save an explicit choice. Returns false when storage is unavailable; navigation must not depend on it. */
export function saveLocalePreference(locale: Locale, storage: StorageLike | null = browserStorage()): boolean {
  if (!storage || !isLocale(locale)) return false;
  try {
    storage.setItem(LOCALE_PREFERENCE_KEY, locale);
    return true;
  } catch {
    return false;
  }
}
