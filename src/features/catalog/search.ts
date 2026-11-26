/**
 * Catalog search normalization. Pure functions with no framework imports, so
 * they run on the server today and can move to the client later unchanged.
 */

/** Maximum query length kept from the `q` parameter (unchanged behavior). */
export const MAX_SEARCH_LENGTH = 200;

/**
 * Case- and diacritic-insensitive form used for matching: "Këpucë" and "kepuce"
 * normalize identically, as do "Çizme" and "cizme". Decomposes characters (NFD),
 * drops combining marks, then lower-cases.
 */
export function normalizeSearchText(value: string): string {
  return value.normalize("NFD").replace(/\p{M}+/gu, "").toLowerCase();
}

/** Trimmed, length-limited query as displayed back to the user. */
export function cleanSearchQuery(raw: unknown): string {
  return (typeof raw === "string" ? raw : "").trim().slice(0, MAX_SEARCH_LENGTH);
}

/** Whitespace-separated normalized terms; every term must match. */
export function searchTerms(query: string): string[] {
  return normalizeSearchText(query).split(/\s+/u).filter(Boolean);
}

/** Build the normalized text searched for one product (prepared once per locale). */
export function buildSearchText(parts: readonly string[]): string {
  return normalizeSearchText(parts.join(" "));
}

export function matchesSearch(searchText: string, terms: readonly string[]): boolean {
  return terms.every((term) => searchText.includes(term));
}
