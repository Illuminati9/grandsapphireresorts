import type { MetadataRoute } from "next";
import { readSiteConfig } from "@/lib/site-config";
import { localePaths } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const { origin, indexable } = readSiteConfig();
  return indexable ? Object.values(localePaths).map(path => ({ url: `${origin}${path}`, changeFrequency: "monthly", priority: 1 })) : [];
}
