import type { ProductCategoryId } from "@/lib/product-categories";
import type { ProductId } from "@/features/catalog/products";

/**
 * Language-independent industry discovery data: slugs and relationships.
 * Names, descriptions and considerations live in `src/content/<locale>.ts`.
 * Editorial browsing suggestions, not task-specific PPE or compliance determinations.
 */
type IndustryRecord = {
  slug: string;
  categoryIds: readonly ProductCategoryId[];
  productIds: readonly ProductId[];
};

export const INDUSTRY_RECORDS = [
  {
    slug: "construction",
    categoryIds: ["safety-helmets", "protective-eyewear", "protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-HD-001", "DEMO-EY-001", "DEMO-HN-002", "DEMO-BD-001", "DEMO-FT-001"],
  },
  {
    slug: "manufacturing",
    categoryIds: ["protective-eyewear", "protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-EY-002", "DEMO-EY-003", "DEMO-HN-001", "DEMO-HN-002", "DEMO-BD-002", "DEMO-FT-002"],
  },
  {
    slug: "logistics-warehousing",
    categoryIds: ["protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-HN-001", "DEMO-HN-002", "DEMO-BD-002", "DEMO-FT-002", "DEMO-FT-003"],
  },
  {
    slug: "electrical-work",
    categoryIds: ["safety-helmets", "protective-eyewear", "protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-HD-003", "DEMO-EY-001", "DEMO-HN-001", "DEMO-BD-001", "DEMO-FT-001"],
  },
  {
    slug: "industrial-maintenance",
    categoryIds: ["safety-helmets", "protective-eyewear", "protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-HD-003", "DEMO-EY-003", "DEMO-HN-003", "DEMO-BD-003", "DEMO-FT-003"],
  },
] as const satisfies readonly IndustryRecord[];

export type IndustrySlug = (typeof INDUSTRY_RECORDS)[number]["slug"];

export function getIndustryRecordBySlug(slug: string) {
  return INDUSTRY_RECORDS.find((industry) => industry.slug === slug);
}

export function industryCatalogHref(industry: { slug: string }, categoryId?: ProductCategoryId) {
  const params = new URLSearchParams({ industry: industry.slug });
  if (categoryId) params.set("category", categoryId);
  return `/products?${params.toString()}` as const;
}
