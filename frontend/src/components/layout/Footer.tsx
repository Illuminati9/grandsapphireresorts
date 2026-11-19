"use client";

import Link from "next/link";
import { reservationDetails, resortDetails } from "@/data/reservations";
import { bookingHref, bookingLinkProps } from "@/data/booking";
import { useLanguage } from "./LanguageProvider";
import { localePaths } from "@/i18n/routing";

export function Footer() {
  const { locale, t } = useLanguage();
  const links = [{ href: "#villas", label: "Villas" }, { href: "#facilities", label: "Facilities" }, { href: "#experiences", label: "Experiences" }, { href: "#location", label: "Contact Us" }];
  return (
    <footer className="bg-deep-forest w-full border-t border-antique-gold/20 mt-xl site-footer">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-lg py-xl max-w-content mx-auto gap-10">
        <div>
          <Link href={localePaths[locale]} className="font-headline text-2xl text-antique-gold mb-2 block focus-ring" aria-label={t("Grand Sapphire Resorts - Home")}>
            Grand Sapphire Resorts
          </Link>
          <p className="text-on-primary-container text-sm">{t("Idukki, Kerala, India")}</p>
          <div className="mt-4 text-on-primary-container text-sm">
            <p>{t("Check-in")}: {t(resortDetails.checkIn)}</p>
            <p>{t("Check-out")}: {t(resortDetails.checkOut)}</p>
          </div>
        </div>
        <nav aria-label={t("Explore the resort")} className="flex flex-col gap-4">
          <h2 className="font-headline text-xl text-warm-ivory">{t("Explore")}</h2>
          {links.map(link => <a key={link.href} href={link.href} className="footer-link focus-ring">{t(link.label)}</a>)}
        </nav>
        <nav aria-label={t("Booking and directions")} className="flex min-w-0 flex-col gap-4">
          <h2 className="font-headline text-xl text-warm-ivory">{t("Contact")}</h2>
          <a {...bookingLinkProps(bookingHref())} className="footer-link focus-ring">{t("Book Your Stay")}</a>
          {reservationDetails.phone && <a href={`tel:${reservationDetails.phone.replace(/[^\d+]/g, "")}`} className="footer-link focus-ring" aria-label={t("Call {name} for reservations at {phone}", { name: resortDetails.contactName, phone: reservationDetails.phone })}>{reservationDetails.phone}</a>}
          {reservationDetails.mapsUrl && <a {...bookingLinkProps(reservationDetails.mapsUrl)} className="footer-link focus-ring">{t("Get directions on Google Maps")}</a>}
        </nav>
      </div>
      <div className="border-t border-on-primary-container/20 px-6 py-6 text-center">
        <p className="text-on-primary-container text-sm">© {new Date().getFullYear()} Grand Sapphire Resorts Idukki. {t("All rights reserved.")}</p>
      </div>
    </footer>
  );
}
