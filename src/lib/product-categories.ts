/** Stable public identifiers shared by the explorer and catalog. */
export const PRODUCT_CATEGORIES = {
  "safety-helmets": {
    label: "Head protection",
    name: "Safety helmets",
    description:
      "Protective headwear for workplace tasks. Explore helmets suited to the work and environment.",
  },
  "protective-eyewear": {
    label: "Eye protection",
    name: "Protective eyewear",
    description:
      "Workplace eye protection, including safety glasses and goggles for different working environments.",
  },
  "protective-gloves": {
    label: "Hand protection",
    name: "Protective gloves",
    description:
      "Hand protection for a range of workplace tasks, with glove types selected around the work being done.",
  },
  "protective-clothing": {
    label: "Body protection",
    name: "Protective clothing",
    description:
      "Workplace clothing and body coverage, including jackets, trousers, and coveralls for different working environments.",
  },
  "safety-footwear": {
    label: "Foot protection",
    name: "Safety footwear",
    description:
      "Workplace foot protection, including safety shoes and boots selected around the task and working environment.",
  },
} as const;

export type ProductCategoryId = keyof typeof PRODUCT_CATEGORIES;

export const PRODUCT_CATEGORY_IDS = Object.keys(
  PRODUCT_CATEGORIES,
) as ProductCategoryId[];

export function isProductCategoryId(value: string): value is ProductCategoryId {
  return Object.prototype.hasOwnProperty.call(PRODUCT_CATEGORIES, value);
}

export function catalogCategoryHref(id: ProductCategoryId): `/products?category=${ProductCategoryId}` {
  return `/products?category=${id}`;
}

/** Supply only implemented internal destinations; missing entries stay unavailable. */
export type CatalogCategoryLinks = Partial<
  Record<ProductCategoryId, `/${string}`>
>;
