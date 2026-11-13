import type { ProductCategoryId } from "@/lib/product-categories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  categoryId: ProductCategoryId;
  status: "demonstration";
  summary: string;
  description: string;
  keywords: readonly string[];
  images: readonly { src: string; alt: string }[];
  specifications: readonly { label: string; value: string }[];
  variants: readonly { label: string; options: readonly string[] }[];
};

export type ProductSummary = Pick<Product, "id" | "slug" | "name" | "categoryId" | "summary" | "images">;
