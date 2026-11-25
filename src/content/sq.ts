import { en } from "./en";
import type { CatalogContent } from "./types";

/**
 * Albanian catalog content (default language).
 *
 * Every section below is a temporary English placeholder until the M9.4
 * translation phase; tests list the placeholder sections explicitly. Manufacturer
 * names, product IDs, sizes and technical identifiers are never translated.
 * Use "Këpucë mbrojtëse" for Safety footwear and "Ndërtimtari" for Construction.
 */
export const sq = {
  // English placeholders pending Albanian translation (M9.4).
  products: en.products,
  industries: en.industries,
  categories: en.categories,
  zones: en.zones,
  imageAlt: en.imageAlt,
  specifications: en.specifications,
  variants: en.variants,
} as const satisfies CatalogContent;
