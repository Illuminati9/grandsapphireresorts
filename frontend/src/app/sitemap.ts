import type { MetadataRoute } from "next";
import { readSiteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const { origin, indexable } = readSiteConfig();
  return indexable ? [{ url: `${origin}/`, changeFrequency: "monthly", priority: 1 }] : [];
}
