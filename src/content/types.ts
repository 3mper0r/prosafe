import type { ColorOption, ProductId, VariantKind } from "@/features/catalog/products";
import type { IndustrySlug } from "@/features/industries/industries";
import type { ProtectionZoneId } from "@/features/protection-explorer/zones";
import type { ProductCategoryId } from "@/lib/product-categories";

/**
 * Localized catalog content for one language. Every `Record` is keyed by the
 * language-independent identifiers in the core data modules, so a missing or
 * unknown product, industry, category or zone is a compile-time error.
 */
export type ProductContent = {
  name: string;
  summary: string;
  description: string;
  /** Extra search terms in this language (matched without diacritics). */
  keywords: readonly string[];
  /** Translatable specification values; shared labels live in `specifications`. */
  construction: string;
  format: string;
};

export type IndustryContent = {
  name: string;
  description: string;
  introduction: string;
  considerations: readonly { title: string; description: string }[];
  equipmentNote?: string;
};

export type CategoryContent = {
  /** Short label used in navigation, filters and cards (e.g. "Head protection"). */
  label: string;
  /** Equipment name used in the Protection Explorer (e.g. "Safety helmets"). */
  name: string;
  description: string;
};

export type CatalogContent = {
  products: Record<ProductId, ProductContent>;
  industries: Record<IndustrySlug, IndustryContent>;
  categories: Record<ProductCategoryId, CategoryContent>;
  zones: Record<ProtectionZoneId, string>;
  /** Alt text for the generic category illustrations used by demo products. */
  imageAlt: string;
  specifications: {
    labels: { construction: string; format: string; manufacturer: string; safetyRatings: string };
    /** Values shared by every demonstration product. */
    manufacturer: string;
    safetyRatings: string;
  };
  variants: {
    labels: Record<VariantKind, string>;
    colors: Record<ColorOption, string>;
  };
};
