import type { MetadataRoute } from "next";
import { readSiteConfig } from "@/lib/site-config";
import { localePaths } from "@/i18n/routing";
import { siteDetails } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const { origin, indexable } = readSiteConfig();
  if (!indexable) return [];
  const languages = { en: `${origin}/`, ml: `${origin}/ml`, "x-default": `${origin}/` };
  return Object.values(localePaths).map(path => ({
    url: `${origin}${path}`,
    lastModified: siteDetails.lastModified,
    alternates: { languages },
  }));
}
