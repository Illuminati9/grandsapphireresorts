"use client";

import { useLanguage } from "@/components/layout/LanguageProvider";

import { googleReviewSnapshot } from "@/data/google-reviews";
import { motion, type Variants } from "framer-motion";
import { reservationDetails, resortDetails } from "@/data/reservations";
import {
  Headphones,
  Shield,
  Wifi,
  Users,
  Phone,
  Star,
  TreePine,
  Award,
} from "lucide-react";

const trustItems = [
  { icon: Headphones, label: "24/7 Concierge", description: "Always at your service" },
  { icon: Shield, label: "Fully Secured", description: "CCTV & 24hr security" },
  { icon: Wifi, label: "Free High-Speed Wi-Fi", description: "Across all areas" },
  { icon: Users, label: "Family Friendly", description: "Activities for all ages" },
];

const badges = [
  { icon: Star, label: "{rating} Rating", sub: "Google Reviews" },
  { icon: Award, label: "Top Rated", sub: "2024 Resort of the Year" },
  { icon: TreePine, label: "Eco Certified", sub: "Sustainable practises" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TrustStripSection() {
  const { t } = useLanguage();
  return (
    <section
      className="bg-gradient-to-b from-warm-ivory to-surface-container-low border-b border-outline-variant/30 py-12 trust-strip-section"
      aria-label={t("Trust indicators")}
    >
      <div className="max-w-content mx-auto px-6">

        {/* Top row: Trust Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                variants={itemVariants}
                className="flex items-center gap-3 bg-surface-container-lowest rounded-luxury px-5 py-3 border border-antique-gold/20 shadow-warm"
              >
                <div className="w-8 h-8 rounded-full bg-antique-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-antique-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-deep-forest leading-tight">{t(badge.label, { rating: googleReviewSnapshot.rating })}</p>
                  <p className="text-xs text-on-surface-variant">{t(badge.sub)}</p>
                  {badge.icon === Star && <p className="text-xs text-on-surface-variant"><time dateTime={googleReviewSnapshot.checkedOn}>{t(googleReviewSnapshot.displayDate)}</time></p>}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Decorative divider */}
        <div className="decorative-divider">
          <span className="text-xs tracking-widest text-on-surface-variant/60 uppercase font-label whitespace-nowrap">
            {t("Why choose us")}
          </span>
        </div>

        {/* Bottom row: Trust Items + Contact */}
        <motion.div
          className="flex flex-wrap justify-between items-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-deep-forest/5 border border-antique-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-antique-gold/10 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-antique-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-deep-forest">{t(item.label)}</p>
                  <p className="text-xs text-on-surface-variant">{t(item.description)}</p>
                </div>
              </motion.div>
            );
          })}

          {reservationDetails.phone && <motion.a
            variants={itemVariants}
            href={`tel:${reservationDetails.phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-3 bg-deep-forest text-warm-ivory py-3 px-5 rounded-luxury hover:bg-twilight-navy transition-colors duration-300 group"
            aria-label={t("Call {name} for reservations", { name: resortDetails.contactName })}
          >
            <div className="w-8 h-8 rounded-full bg-antique-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-antique-gold/30 transition-colors duration-300">
              <Phone className="w-4 h-4 text-amber-glow" />
            </div>
            <div>
              <p className="text-xs text-warm-ivory/70 font-label">{t("Call {name}", { name: resortDetails.contactName })}</p>
              <p className="text-sm font-semibold text-warm-ivory">{reservationDetails.phone}</p>
            </div>
          </motion.a>}
        </motion.div>
      </div>
    </section>
  );
}
