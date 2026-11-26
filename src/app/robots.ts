import type { MetadataRoute } from "next";
import { getSearchConfig } from "../lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const { origin, indexable } = getSearchConfig();
  return indexable ? {
    // Quotation pages in both languages also carry noindex; robots.txt alone does not prevent indexing.
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/quote", "/en/quote"] },
    sitemap: `${origin}/sitemap.xml`,
  } : {
    rules: { userAgent: "*", disallow: "/" },
  };
}
