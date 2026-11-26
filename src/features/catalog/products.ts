import type { ProductCategoryId } from "@/lib/product-categories";

/**
 * Language-independent demonstration catalog: identifiers, slugs, category
 * relationships, images and literal option values (sizes). Names, descriptions,
 * keywords, specification text and color names live in `src/content/<locale>.ts`.
 *
 * Replace with verified manufacturer data (e.g. the official WERKVIS catalog),
 * preserving stable IDs. Technical standards and certification identifiers
 * belong here, as language-independent fields, once real products exist.
 */

/** Translatable option values (labels in `src/content/<locale>.ts`). */
export const COLOR_OPTIONS = ["orange", "white", "gray", "black", "clear", "smoke"] as const;
export type ColorOption = (typeof COLOR_OPTIONS)[number];

export type VariantDefinition =
  | { kind: "colors" | "frameColors" | "lensAppearances"; options: readonly ColorOption[] }
  /** Literal values such as S/M/L or EU sizes are not translated. */
  | { kind: "sizes" | "euSizes"; options: readonly string[] };

export type VariantKind = VariantDefinition["kind"];

type ProductRecord = {
  id: string;
  slug: string;
  categoryId: ProductCategoryId;
  variants: readonly VariantDefinition[];
};

export const PRODUCT_RECORDS = [
  { id: "DEMO-HD-001", slug: "brimmed-safety-helmet", categoryId: "safety-helmets", variants: [{ kind: "colors", options: ["orange", "white"] }] },
  { id: "DEMO-HD-002", slug: "full-brim-work-helmet", categoryId: "safety-helmets", variants: [{ kind: "colors", options: ["orange", "gray"] }] },
  { id: "DEMO-HD-003", slug: "chin-strap-work-helmet", categoryId: "safety-helmets", variants: [] },
  { id: "DEMO-EY-001", slug: "clear-safety-glasses", categoryId: "protective-eyewear", variants: [{ kind: "frameColors", options: ["black", "gray"] }] },
  { id: "DEMO-EY-002", slug: "wraparound-work-glasses", categoryId: "protective-eyewear", variants: [{ kind: "lensAppearances", options: ["clear", "smoke"] }] },
  { id: "DEMO-EY-003", slug: "strap-fit-work-goggles", categoryId: "protective-eyewear", variants: [] },
  { id: "DEMO-HN-001", slug: "knitted-work-gloves", categoryId: "protective-gloves", variants: [{ kind: "sizes", options: ["S", "M", "L", "XL"] }] },
  { id: "DEMO-HN-002", slug: "palm-coated-work-gloves", categoryId: "protective-gloves", variants: [{ kind: "sizes", options: ["M", "L", "XL"] }] },
  { id: "DEMO-HN-003", slug: "cuff-work-gloves", categoryId: "protective-gloves", variants: [{ kind: "sizes", options: ["M", "L", "XL"] }] },
  { id: "DEMO-BD-001", slug: "panelled-work-jacket", categoryId: "protective-clothing", variants: [{ kind: "sizes", options: ["S", "M", "L", "XL", "XXL"] }] },
  { id: "DEMO-BD-002", slug: "pocket-work-trousers", categoryId: "protective-clothing", variants: [{ kind: "sizes", options: ["S", "M", "L", "XL"] }] },
  { id: "DEMO-BD-003", slug: "zip-front-work-coverall", categoryId: "protective-clothing", variants: [{ kind: "sizes", options: ["M", "L", "XL", "XXL"] }] },
  { id: "DEMO-FT-001", slug: "lace-up-work-boot", categoryId: "safety-footwear", variants: [{ kind: "euSizes", options: ["40", "41", "42", "43", "44", "45", "46"] }] },
  { id: "DEMO-FT-002", slug: "low-cut-work-shoe", categoryId: "safety-footwear", variants: [{ kind: "euSizes", options: ["39", "40", "41", "42", "43", "44", "45"] }] },
  { id: "DEMO-FT-003", slug: "pull-on-work-boot", categoryId: "safety-footwear", variants: [{ kind: "euSizes", options: ["40", "41", "42", "43", "44", "45"] }] },
] as const satisfies readonly ProductRecord[];

export type ProductId = (typeof PRODUCT_RECORDS)[number]["id"];
export type ProductSlug = (typeof PRODUCT_RECORDS)[number]["slug"];
export type ProductRecordEntry = (typeof PRODUCT_RECORDS)[number];

const PRODUCT_IDS: readonly string[] = PRODUCT_RECORDS.map((product) => product.id);

/** Used by the quotation store and API to accept only catalog products. */
export function isProductId(value: string): value is ProductId {
  return PRODUCT_IDS.includes(value);
}

export function getProductRecordById(id: string) {
  return PRODUCT_RECORDS.find((product) => product.id === id);
}

export function getProductRecordBySlug(slug: string) {
  return PRODUCT_RECORDS.find((product) => product.slug === slug);
}

/** Generic, language-independent category illustration (alt text is localized). */
export function productImageSrc(categoryId: ProductCategoryId): `/images/catalog/${ProductCategoryId}.svg` {
  return `/images/catalog/${categoryId}.svg`;
}
