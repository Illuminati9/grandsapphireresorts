import { reservationDetails, resortDetails } from "./reservations";
import { translate, type Locale } from "@/i18n/messages";

export interface FaqItem {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

/** Visible FAQ answers built only from confirmed business details. */
export function faqItems(locale: Locale): FaqItem[] {
  const t = (message: string, values?: Record<string, string>) => translate(locale, message, values);
  const items: (FaqItem | false)[] = [
    {
      question: t("Where is Grand Sapphire Resorts located?"),
      answer: t("The resort is at {address}, in the hills of the Western Ghats in Idukki district.", { address: t(resortDetails.address) }),
      link: reservationDetails.mapsUrl ? { href: reservationDetails.mapsUrl, label: t("Get directions on Google Maps") } : undefined,
    },
    {
      question: t("What are the check-in and check-out times?"),
      answer: t("Check-in is from {checkIn} and check-out is by {checkOut}, India Standard Time.", { checkIn: t(resortDetails.checkIn), checkOut: t(resortDetails.checkOut) }),
    },
    Boolean(reservationDetails.bookingUrl && reservationDetails.phone) && {
      question: t("How do I book a stay?"),
      answer: t("Book online through Booking.com, or call {name} on {phone} for reservations.", { name: resortDetails.contactName, phone: reservationDetails.phone }),
      link: { href: reservationDetails.bookingUrl, label: t("Book Your Stay") },
    },
  ];
  return items.filter((item): item is FaqItem => Boolean(item));
}
