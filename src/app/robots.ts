import type { MetadataRoute } from "next";
import { getSiteOrigin } from "../lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();
  return origin ? {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/quote"] },
    sitemap: `${origin}/sitemap.xml`,
  } : {
    rules: { userAgent: "*", disallow: "/" },
  };
}
