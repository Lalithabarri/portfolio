import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

// Production: allow everything and point to the production sitemap.
// Vercel preview deployments: ask crawlers to stay out entirely.
export default function robots(): MetadataRoute.Robots {
  const isVercelPreview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";
  if (isVercelPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteUrl ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
