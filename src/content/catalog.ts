import type { Locale } from "@/i18n/config";
import { PRODUCT_RECORDS, productImageSrc, type ProductId } from "@/features/catalog/products";
import { buildSearchText, matchesSearch, searchTerms } from "@/features/catalog/search";
import type { Product } from "@/features/catalog/types";
import { INDUSTRY_RECORDS, type IndustrySlug } from "@/features/industries/industries";
import { PROTECTION_ZONES, type ProtectionZoneId } from "@/features/protection-explorer/zones";
import { PRODUCT_CATEGORY_IDS, type ProductCategoryId } from "@/lib/product-categories";
import { en } from "./en";
import { sq } from "./sq";
import type { CatalogContent, CategoryContent } from "./types";

const CONTENT: Record<Locale, CatalogContent> = { sq, en };

export type Industry = {
  slug: IndustrySlug;
  name: string;
  description: string;
  introduction: string;
  considerations: readonly { title: string; description: string }[];
  categoryIds: readonly ProductCategoryId[];
  productIds: readonly ProductId[];
  equipmentNote?: string;
};

export type ProtectionZone = {
  id: ProtectionZoneId;
  label: string;
  categoryId: ProductCategoryId;
  position: { x: number; y: number };
};

export type Catalog = ReturnType<typeof buildCatalog>;

/** Join language-independent records with one language's content. Runs once per locale. */
function buildCatalog(locale: Locale) {
  const content = CONTENT[locale];
  const categories = Object.fromEntries(
    PRODUCT_CATEGORY_IDS.map((id) => [id, content.categories[id]]),
  ) as Record<ProductCategoryId, CategoryContent>;

  const products: readonly Product[] = PRODUCT_RECORDS.map((record) => {
    const text = content.products[record.id];
    return {
      id: record.id,
      slug: record.slug,
      categoryId: record.categoryId,
      status: "demonstration",
      name: text.name,
      summary: text.summary,
      description: text.description,
      keywords: text.keywords,
      images: [{ src: productImageSrc(record.categoryId), alt: content.imageAlt }],
      specifications: [
        { label: content.specifications.labels.construction, value: text.construction },
        { label: content.specifications.labels.format, value: text.format },
        { label: content.specifications.labels.manufacturer, value: content.specifications.manufacturer },
        { label: content.specifications.labels.safetyRatings, value: content.specifications.safetyRatings },
      ],
      variants: record.variants.map((variant) => ({
        label: content.variants.labels[variant.kind],
        options: variant.kind === "sizes" || variant.kind === "euSizes"
          ? variant.options
          : variant.options.map((option) => content.variants.colors[option]),
      })),
    };
  });

  // Normalized search text per product, prepared once: name, summary, description,
  // ID/SKU, category label and this language's keywords (same fields as before).
  const searchText = new Map(products.map((product) => [product.id, buildSearchText([
    product.name, product.summary, product.description, product.id, categories[product.categoryId].label, ...product.keywords,
  ])]));

  const industries: readonly Industry[] = INDUSTRY_RECORDS.map((record) => ({ ...content.industries[record.slug], ...record }));

  const zones: readonly ProtectionZone[] = PROTECTION_ZONES.map((zone) => ({ ...zone, label: content.zones[zone.id] }));

  const productById = new Map(products.map((product) => [product.id, product]));
  const productBySlug = new Map(products.map((product) => [product.slug, product]));
  const industryBySlug = new Map(industries.map((industry) => [industry.slug as string, industry]));

  return {
    locale,
    products,
    categories,
    industries,
    zones,
    getProductById: (id: string) => productById.get(id),
    getProductBySlug: (slug: string) => productBySlug.get(slug),
    getIndustryBySlug: (slug: string) => industryBySlug.get(slug),
    getIndustryProducts: (industry: Pick<Industry, "productIds">) =>
      products.filter((product) => (industry.productIds as readonly string[]).includes(product.id)),
    /** Catalog filtering used by /products: optional industry, category and search query. */
    filterProducts({ query, categoryId, industry }: { query: string; categoryId?: ProductCategoryId | ""; industry?: Pick<Industry, "productIds"> }) {
      const terms = searchTerms(query);
      const source = industry ? products.filter((product) => (industry.productIds as readonly string[]).includes(product.id)) : products;
      return source.filter((product) =>
        (!categoryId || product.categoryId === categoryId) && matchesSearch(searchText.get(product.id) ?? "", terms));
    },
  };
}

const cache = new Map<Locale, Catalog>();

/** Localized catalog for `locale`, built on first use and reused for the lifetime of the isolate. */
export function getCatalog(locale: Locale): Catalog {
  let catalog = cache.get(locale);
  if (!catalog) {
    catalog = buildCatalog(locale);
    cache.set(locale, catalog);
  }
  return catalog;
}
