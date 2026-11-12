/** Stable public identifiers shared by the explorer and the future catalog. */
export const PRODUCT_CATEGORIES = {
  "safety-helmets": {
    name: "Safety helmets",
    description:
      "Protective headwear for workplace tasks. Explore helmets suited to the work and environment.",
  },
  "protective-eyewear": {
    name: "Protective eyewear",
    description:
      "Workplace eye protection, including safety glasses and goggles for different working environments.",
  },
  "protective-gloves": {
    name: "Protective gloves",
    description:
      "Hand protection for a range of workplace tasks, with glove types selected around the work being done.",
  },
  "protective-clothing": {
    name: "Protective clothing",
    description:
      "Workplace clothing and body coverage, including jackets, trousers, and coveralls for different working environments.",
  },
  "safety-footwear": {
    name: "Safety footwear",
    description:
      "Workplace foot protection, including safety shoes and boots selected around the task and working environment.",
  },
} as const;

export type ProductCategoryId = keyof typeof PRODUCT_CATEGORIES;

/** Supply only implemented internal destinations; missing entries stay unavailable. */
export type CatalogCategoryLinks = Partial<
  Record<ProductCategoryId, `/${string}`>
>;
