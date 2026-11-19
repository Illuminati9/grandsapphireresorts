import type { Metadata } from "next";
import { siteDetails } from "@/data/site";
import { translate, type Locale } from "@/i18n/messages";
import { localePaths } from "@/i18n/routing";
import { readSiteConfig } from "./site-config";

export function pageMetadata(locale: Locale): Metadata {
  const { origin, indexable, googleVerification } = readSiteConfig();
  const title = translate(locale, siteDetails.title);
  const description = translate(locale, siteDetails.description);
  return {
    metadataBase: new URL(origin),
    title,
    description,
    alternates: {
      canonical: `${origin}${localePaths[locale]}`,
      languages: { en: `${origin}/`, ml: `${origin}/ml`, "x-default": `${origin}/` },
    },
    authors: [{ name: siteDetails.name }],
    creator: siteDetails.name,
    publisher: siteDetails.name,
    formatDetection: { telephone: true },
    openGraph: {
      title, description, url: `${origin}${localePaths[locale]}`, type: "website",
      locale: locale === "ml" ? "ml_IN" : "en_IN",
      alternateLocale: locale === "ml" ? "en_IN" : "ml_IN",
      siteName: siteDetails.name,
      images: [{ url: `${origin}/opengraph-image`, width: 1200, height: 630, alt: siteDetails.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/opengraph-image`] },
    robots: { index: indexable, follow: true },
    verification: { google: googleVerification },
  };
}
