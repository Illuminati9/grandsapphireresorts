import { reservationDetails, resortDetails } from "@/data/reservations";
import { siteDetails } from "@/data/site";
import { readSiteConfig } from "@/lib/site-config";
import { translate, type Locale } from "@/i18n/messages";
import { localePaths } from "@/i18n/routing";

export function ResortStructuredData({ locale }: { locale: Locale }) {
  const { origin } = readSiteConfig();
  const description = translate(locale, siteDetails.description);
  const business = {
    "@context": "https://schema.org",
    "@type": "Resort",
    "@id": `${origin}/#resort`,
    name: siteDetails.name,
    url: `${origin}/`,
    description,
    image: [`${origin}${siteDetails.image}`],
    telephone: reservationDetails.phone || undefined,
    email: reservationDetails.email || undefined,
    address: {
      "@type": "PostalAddress", streetAddress: "Pushpagiri, Thankamony",
      addressLocality: "Idukki", addressRegion: "Kerala", postalCode: "685514", addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 9.8404195, longitude: 77.0652606 },
    hasMap: reservationDetails.mapsUrl || undefined,
    checkinTime: "12:00:00+05:30",
    checkoutTime: "11:00:00+05:30",
    contactPoint: reservationDetails.phone ? {
      "@type": "ContactPoint", name: resortDetails.contactName,
      telephone: reservationDetails.phone, contactType: "reservations",
    } : undefined,
    potentialAction: reservationDetails.bookingUrl ? { "@type": "ReserveAction", target: reservationDetails.bookingUrl } : undefined,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: siteDetails.name,
    url: `${origin}/`,
    inLanguage: ["en-IN", "ml-IN"],
    publisher: { "@id": business["@id"] },
  };
  const pageUrl = `${origin}${localePaths[locale]}`;
  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: translate(locale, siteDetails.title),
    description,
    inLanguage: locale === "ml" ? "ml-IN" : "en-IN",
    isPartOf: { "@id": website["@id"] },
    about: { "@id": business["@id"] },
  };
  return <>{[business, website, page].map(entity => <script key={entity["@id"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(entity).replace(/</g, "\\u003c") }} />)}</>;
}
