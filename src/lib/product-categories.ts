/**
 * Stable public category identifiers shared by the explorer and catalog.
 * Language-independent: names and descriptions live in `src/content/<locale>.ts`.
 */
export const PRODUCT_CATEGORY_IDS = [
  "safety-helmets",
  "protective-eyewear",
  "protective-gloves",
  "protective-clothing",
  "safety-footwear",
] as const;

export type ProductCategoryId = (typeof PRODUCT_CATEGORY_IDS)[number];

export function isProductCategoryId(value: string): value is ProductCategoryId {
  return (PRODUCT_CATEGORY_IDS as readonly string[]).includes(value);
}

export function catalogCategoryHref(id: ProductCategoryId): `/products?category=${ProductCategoryId}` {
  return `/products?category=${id}`;
}

/** Supply only implemented internal destinations; missing entries stay unavailable. */
export type CatalogCategoryLinks = Partial<
  Record<ProductCategoryId, `/${string}`>
>;
