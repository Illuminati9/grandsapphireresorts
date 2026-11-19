import { readSiteConfig } from "@/lib/site-config";
import { siteDetails } from "@/data/site";
import { reservationDetails, resortDetails } from "@/data/reservations";
import { faqItems } from "@/data/faq";

export const dynamic = "force-static";

/** Plain-text summary of confirmed facts for AI assistants and answer engines. */
export function GET() {
  const { origin } = readSiteConfig();
  const lines = [
    `# ${siteDetails.name}`,
    "",
    `> ${siteDetails.description}`,
    "",
    "## Key facts",
    `- Address: ${resortDetails.address}`,
    `- Map coordinates: 9.8404195, 77.0652606`,
    `- Check-in: ${resortDetails.checkIn} IST; check-out: ${resortDetails.checkOut} IST`,
    reservationDetails.phone ? `- Reservations: ${resortDetails.contactName}, ${reservationDetails.phone}` : null,
    reservationDetails.bookingUrl ? `- Book online: ${reservationDetails.bookingUrl}` : null,
    `- Google Maps listing: ${siteDetails.googlePlaceUrl}`,
    "",
    "## Pages",
    `- [English](${origin}/): rooms, photos, facilities, guest reviews, location and FAQ`,
    `- [Malayalam / മലയാളം](${origin}/ml): the same page in Malayalam`,
    "",
    "## FAQ",
    ...faqItems("en").flatMap(item => [`### ${item.question}`, item.answer, ""]),
  ].filter(line => line !== null);
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
