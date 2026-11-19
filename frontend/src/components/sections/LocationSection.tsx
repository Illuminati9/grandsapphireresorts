"use client";

import { SectionIcon } from "@/components/ui/SectionIcon";
import { useLanguage } from "@/components/layout/LanguageProvider";

import { motion } from "framer-motion";
import { reservationDetails, resortDetails } from "@/data/reservations";

export function LocationSection() {
  const { t } = useLanguage();
  return (
    <section id="location" className="mx-auto max-w-content px-md sm:px-lg py-16 lg:py-20 location-section" aria-labelledby="location-title">
      <motion.div
        className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-xl">
          <motion.h2
            id="location-title"
            className="section-title text-deep-forest"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t("Visit Us")}
          </motion.h2>
          <motion.p
            className="section-subtitle mt-4 text-on-surface-variant"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {t("Nestled in the serene Western Ghats of Idukki, Kerala \u2014 where misty mountains meet warm hospitality.")}
          </motion.p>

          <div className="mt-10 space-y-5">
            {[
              { icon: "location_on", label: "Address", value: resortDetails.address },
              { icon: "login", label: "Check-in", value: resortDetails.checkIn },
              { icon: "logout", label: "Check-out", value: resortDetails.checkOut },
              { icon: "call", label: t("Reservations ({name})", { name: resortDetails.contactName }), value: reservationDetails.phone, href: `tel:${reservationDetails.phone.replace(/[^\d+]/g, "")}` },
              { icon: "email", label: "Email", value: reservationDetails.email, href: `mailto:${reservationDetails.email}` },
            ].filter((item) => item.value).map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4 label-caps"
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.08 }}
              >
                <SectionIcon name={item.icon} className="text-antique-gold h-6 w-6 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-on-surface-variant text-body-sm">{t(item.label)}</p>
                  {item.href ? (
                    <a href={item.href} className="break-words text-deep-forest hover:text-antique-gold transition-colors text-body-md">
                      {t(item.value)}
                    </a>
                  ) : (
                    <p className="text-deep-forest text-body-md">{t(item.value)}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          {!reservationDetails.bookingUrl && !reservationDetails.phone && !reservationDetails.email && (
            <p className="mt-8 text-on-surface-variant">{t("Online reservations are currently unavailable.")}</p>
          )}
        </div>

        <div className="relative lg:self-stretch">
          {/* Fixed height below lg: aspect-video + min-height made the box wider
              than a phone screen and pushed the whole page sideways. */}
          <div className="h-[300px] w-full overflow-hidden rounded-hero bg-surface-container-highest shadow-hero lg:h-full lg:min-h-[360px]">
            {reservationDetails.mapEmbedUrl ? <iframe
              title={t("Grand Sapphire Resorts Location")}
              src={reservationDetails.mapEmbedUrl}
              style={{ border: 0 }}
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            /> : (
              <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center text-deep-forest">
                <SectionIcon name="location_on" className="h-9 w-9 text-antique-gold" />
                <p>{t("Idukki, Kerala, India")}</p>
              </div>
            )}
          </div>
          {reservationDetails.mapsUrl && (
            <a href={reservationDetails.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-deep-forest underline underline-offset-4 hover:text-antique-gold focus-ring">
              {t("Get directions on Google Maps")}
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
