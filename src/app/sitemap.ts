import type { MetadataRoute } from "next";
import { getSiteOrigin } from "../lib/site-url";
import { PRODUCT_RECORDS } from "../features/catalog/products";
import { INDUSTRY_RECORDS } from "../features/industries/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin) return [];
  const paths = [
    "/", "/about", "/brands", "/contact", "/products", "/industries",
    "/protection-explorer", "/find-your-protection",
    ...INDUSTRY_RECORDS.map(({ slug }) => `/industries/${slug}`),
    ...PRODUCT_RECORDS.map(({ slug }) => `/products/${slug}`),
  ];
  return paths.map((path) => ({ url: `${origin}${path}` }));
}
