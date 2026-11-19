"use client";

import { SectionIcon } from "@/components/ui/SectionIcon";
import { useLanguage } from "@/components/layout/LanguageProvider";

import { motion } from "framer-motion";
import { CardImage, CardTitle, CardDescription } from "@/components/ui";

const amenities = [
  {
    id: "dining",
    name: "Dining & Room Service",
    description: "Savor local delicacies and international cuisine.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_KI5hObTgOVkeOXpOPxpwLJeB1NcikafhcYsY-RcQwBZo6ai466dd-FVQYdp7zcjrJMS8MNMq8pOL4vTH4U6FQuHK6MGyLt5S8m3jtkgth5LvJrH1F4PDxTU6XlLH-XX8x7SKm4cG89Nto6fj-zkRXY6qcwgtjhCT3b_6ZUoY0wlM2b3y3464urMC2JTWizsf0ySTgbpmrs6wPUN44V7K8u8-7hSpD1WhBpNBZ2CJwu8RC7frImkXqa8RREiRdGNgO87mjlRAONM",
    icon: "restaurant",
    large: true,
  },
  {
    id: "pool",
    name: "Swimming Pool",
    description: "Infinity edge with valley views.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUCkc-497h1NpGS_R7xe_-6VOaFs_3HERXYFBuEwbK-cj214YGGZKnkiLSwc321F01L1XtbfgTqOlpv80-3S5RGWroEYluK0qtBe9D5gMeFwV1fsiXJ5BmJr7M5v3elk1eGueF9qtwpvOdpwuaVAdlGw1pkGakrS6mrxZmoREOXfbPcuJPCnKpK_rJOi3-L4F_vukdbpYO92_P9ZuHZYnXRwa37S-f0VOBJ6elrfL5ktRPl-FyQCSEqTN_DvgAsTq8y1KEdX_unQ8",
    icon: "pool",
    large: false,
    rightImage: true,
  },
  {
    id: "campfire",
    name: "Camp Fire",
    description: "Evening gatherings under the starlit sky.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG4fMWpU3OLZiAuSuX_0Gp1DKhySDbc0ehqmLgWZ9GLLil9DisoOKh9RVNwZYrMiDBIwL8x9Az4dVGDpjQFx42PHWru5tbbTQEL-l7gyB_ult9uBYOhPhYb5qqRFcEySwqSUQHBvkE_NDd8szYq_lWBbIiSeduNH0gbr--6nC4je0ITzFZbrgNEymjXfVgek0R-qRw_X3MFLC9sgQ8Qj_5fE5ngTOyFt2YgAJJQgL4ALKFO8b6MpqRdenG6yPqHeNbAw9pJ7r4Emk",
    icon: "local_fire_department",
    large: false,
    dark: true,
  },
  {
    id: "indoor-games",
    name: "Indoor Games",
    description: "Table tennis, carrom, board games, and more.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjt01EUHqsm9ClNSxPtOqvFkVebeYMSiTLDCDkfKuggPSnIQaZiDHesX-f3W2o_iIffZJ-U_vNqeK7ku0tS1_I0eDY7abBQTATX7a4YlcWKSRcc05DkEal-yp-At8G8Gyp4kNtr_rkfJgKdkkCmqpyoBA0FPdsKNaspdTx1hfoREPhV-nuypp0cIQ2FAfnJSReaZmTAVbB1ZTRCPwzkXYp30JA3r92uhMW-1REzrvaZKCf01_IFbT2BDiTPprkcNQ3ZAyMc5b4U8M",
    icon: "sports_esports",
    large: false,
    light: true,
  },
];

export function AmenitiesSection() {
  const { t } = useLanguage();
  return (
    <section id="facilities" className="bg-surface-container-low py-xl facilities-section" aria-labelledby="amenities-title">
      <div className="max-w-content mx-auto px-md sm:px-lg">
        <div className="mb-12">
          <motion.h2
            id="amenities-title"
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t("Resort Facilities")}
          </motion.h2>
          <motion.p
            className="section-subtitle mt-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {t("Everything you need for a comfortable and memorable stay.")}
          </motion.p>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-md auto-rows-[200px] facilities-grid"
          role="list"
          aria-label={t("Facilities")}
        >
          {amenities.map((amenity, index) => {
            if (amenity.large) {
              return (
                <motion.article
                  key={amenity.id}
                  className="col-span-2 row-span-2 relative rounded-lg overflow-hidden border border-antique-gold/30 group facility-large image-container"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  role="listitem"
                >
                  <CardImage
                    src={amenity.image}
                    alt={t("{name} at Grand Sapphire Resorts", { name: t(amenity.name) })}
                    aspectRatio="video"
                    className="w-full h-full object-cover absolute inset-0 facility-large-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <SectionIcon name={amenity.icon} className="text-antique-gold mb-2 h-6 w-6" />
                    <CardTitle level={3} className="font-headline text-2xl text-warm-ivory">
                      {t(amenity.name)}
                    </CardTitle>
                    <CardDescription className="text-warm-ivory/90 text-sm mt-2">
                      {t(amenity.description)}
                    </CardDescription>
                  </div>
                </motion.article>
              );
            }

            if (amenity.rightImage) {
              return (
                <motion.article
                  key={amenity.id}
                  className="col-span-2 row-span-1 relative rounded-lg overflow-hidden border border-antique-gold/30 group bg-surface facility-small image-container"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  role="listitem"
                >
                  <div className="absolute inset-0 flex items-center p-6 gap-6 z-10">
                    <SectionIcon name={amenity.icon} className="text-antique-gold h-9 w-9" />
                    <div>
                      <CardTitle level={3} className="font-headline text-xl text-deep-forest">
                        {t(amenity.name)}
                      </CardTitle>
                      <CardDescription className="text-on-surface-variant text-sm mt-1">
                        {t(amenity.description)}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 w-1/2 h-full">
                    <CardImage
                      src={amenity.image}
                      alt={t("{name} at Grand Sapphire Resorts", { name: t(amenity.name) })}
                      aspectRatio="video"
                      className="w-full h-full object-cover opacity-60 card-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent" />
                  </div>
                </motion.article>
              );
            }

            if (amenity.dark) {
              return (
                <motion.article
                  key={amenity.id}
                  className="col-span-1 row-span-1 relative rounded-lg overflow-hidden border border-antique-gold/30 group bg-deep-forest facility-small image-container"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  role="listitem"
                >
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center z-10">
                    <SectionIcon name={amenity.icon} className="text-amber-glow h-9 w-9 mb-2" />
                    <CardTitle level={3} className="font-headline text-lg text-warm-ivory">
                      {t(amenity.name)}
                    </CardTitle>
                  </div>
                  <CardImage
                    src={amenity.image}
                    alt={t("{name} at Grand Sapphire Resorts", { name: t(amenity.name) })}
                    aspectRatio="video"
                    className="w-full h-full object-cover absolute inset-0 opacity-40 card-image"
                  />
                </motion.article>
              );
            }

            return (
              <motion.article
                key={amenity.id}
                className="col-span-1 row-span-1 relative rounded-lg overflow-hidden border border-antique-gold/30 group bg-surface facility-small"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                role="listitem"
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center z-10">
                  <SectionIcon name={amenity.icon} className="text-antique-gold h-9 w-9 mb-2" />
                  <CardTitle level={3} className="font-headline text-lg text-deep-forest">
                    {t(amenity.name)}
                  </CardTitle>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
