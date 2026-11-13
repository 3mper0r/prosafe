import type { MetadataRoute } from "next";
import { getSiteOrigin } from "../lib/site-url";
import { PRODUCTS } from "../features/catalog/products";
import { INDUSTRIES } from "../features/industries/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin) return [];
  const paths = [
    "/", "/about", "/brands", "/contact", "/products", "/industries",
    "/protection-explorer", "/find-your-protection",
    ...INDUSTRIES.map(({ slug }) => `/industries/${slug}`),
    ...PRODUCTS.map(({ slug }) => `/products/${slug}`),
  ];
  return paths.map((path) => ({ url: `${origin}${path}` }));
}
