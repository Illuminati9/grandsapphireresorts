"use client";

import { motion } from "framer-motion";
import { CardImage, CardContent, CardTitle, CardAction } from "@/components/ui";

const experiences = [
  {
    id: "jeep-safari",
    name: "Jeep Safari",
    description: "Thrilling off-road adventure through dense forests and rugged terrains.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjt01EUHqsm9ClNSxPtOqvFkVebeYMSiTLDCDkfKuggPSnIQaZiDHesX-f3W2o_iIffZJ-U_vNqeK7ku0tS1_I0eDY7abBQTATX7a4YlcWKSRcc05DkEal-yp-At8G8Gyp4kNtr_rkfJgKdkkCmqpyoBA0FPdsKNaspdTx1hfoREPhV-nuypp0cIQ2FAfnJSReaZmTAVbB1ZTRCPwzkXYp30JA3r92uhMW-1REzrvaZKCf01_IFbT2BDiTPprkcNQ3ZAyMc5b4U8M",
    alt: "An off-road jeep driving through a rugged dirt path in a dense, green forest. The scene is slightly misty, adding a sense of adventure and mystery. The vehicle kicks up a little dust, and sunlight filters through the tall trees.",
  },
  {
    id: "plantation-visit",
    name: "Plantation Visit",
    description: "Guided tour through fragrant spice and lush tea gardens.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVq7Y1HTFjEAgJCHnv2S_wY3I2aiQUrwo1ykyqd_fYSRJla5q1NDEMqJ5ovwVTMpF1fLVcTnSwwgaTrol7V4uhhFP13ySk-S9SI4Xou3Kzq9xS6Oellge6ZpT8R4X2Q6IAZiprayl6P14muNE5jvA2Boyvb_icv4WK7fDZIuR1LKmR2MxmGf--Tdabn-NhbNlZy3GbaBExMyrUhTLXxSKf9Hz3y1__tzXOW6SbpdZGyz5KEifDr3PaNZOdR0KGwkyPOL7hLrt91wk",
    alt: "A lush, green tea plantation covering rolling hills. The neat rows of tea bushes create beautiful patterns across the landscape. In the background, misty mountains rise up under a clear sky. A narrow path winds through the plantation.",
  },
  {
    id: "trekking",
    name: "Trekking",
    description: "Conquer scenic trails and witness breathtaking valley panoramas.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCUNkfJzZAvk8J0cQw1y-zmFpKvYcYTFJvB63-Qv6rUe-C8R26UWTtMw8RECynkay4IKkVyboFIrIPfb2yb1mo_Jgl1H1oR3_RYV4ZXD_bOzw52-u0dD-Y8nCbubl8u08by8cSv9llLRSTDgf-YStU18a85rCMdboN8c9X_u2hjt4V4_YAhRyGQnOtLO3vydheQega1H_dXy7h-Wgz_Jy2sNgqt1aMguyepxB_BmszRzdGEQhlpF47x95q91jZ4RND-HIDz-wEEVs",
    alt: "A scenic hiking trail on a grassy mountain ridge. The trail overlooks a deep, forested valley. The lighting suggests early morning or late afternoon, with soft, golden light highlighting the texture of the grass and rocks.",
  },
  {
    id: "elephant-safari",
    name: "Elephant Safari",
    description: "A gentle ride through the sanctuary observing local wildlife.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9PMo67V6nHUvKBEq7FefipXoSU-tKQR6RiFPjGFUbWLXaKd9keYUZswjYyOY4VWomgtGbCkI_Yd7g_PCq7BGsjnMpXpfGoLv5KlYhoRjugVSVLGQTBPnvmsHeTfXZ6x3JdI4THNvZT3fXqlY-H5iuFfjQ7RS8ifxy8Eonx1_IQOEgACUS-kXXh3heG9SSDTv7nxqwboXmE3oyWDvrEU7Z_EpYBhTYuGRFROX5WvI0g5yPqDXBx6k95JQQ1ZQzxDZjU633jwF70F4",
    alt: "A majestic elephant standing calmly in a forest clearing near a river. The elephant is adorned with a simple, traditional cloth. The surrounding forest is dense and green, with sunlight dappling through the canopy.",
  },
];

export function ExperiencesSection() {
  return (
    <section id="experiences" className="py-xl max-w-content mx-auto px-lg experiences-section" aria-labelledby="experiences-title">
      <div className="flex justify-between items-end mb-12">
        <div>
          <motion.h2
            id="experiences-title"
            className="section-title text-deep-forest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Curated Experiences
          </motion.h2>
          <motion.p
            className="section-subtitle mt-4 max-w-xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Explore the rugged beauty of the Western Ghats with our guided outdoor activities.
          </motion.p>
        </div>
        <div className="hidden md:flex gap-2">
          <button className="w-10 h-10 rounded-full border border-antique-gold/50 flex items-center justify-center text-deep-forest hover:bg-antique-gold/10 transition-colors" aria-label="Previous experience">
            <span className="material-symbols-outlined" data-icon="arrow_back" aria-hidden="true">arrow_back</span>
          </button>
          <button className="w-10 h-10 rounded-full border border-antique-gold/50 flex items-center justify-center text-deep-forest hover:bg-antique-gold/10 transition-colors" aria-label="Next experience">
            <span className="material-symbols-outlined" data-icon="arrow_forward" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-md pb-8 hide-scrollbar snap-x experiences-container" role="list" aria-label="Experiences carousel">
        {experiences.map((experience, index) => (
          <motion.article
            key={experience.id}
            className="min-w-[300px] md:min-w-[350px] bg-surface rounded-lg overflow-hidden border border-antique-gold/20 snap-start experience-card interactive-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            role="listitem"
          >
            <div className="h-48 relative image-container">
              <CardImage
                src={experience.image}
                alt={experience.alt}
                aspectRatio="video"
                className="w-full h-full object-cover card-image"
              />
            </div>
            <CardContent className="p-6">
              <CardTitle level={3} className="font-headline text-xl text-deep-forest mb-2">
                {experience.name}
              </CardTitle>
              <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">{experience.description}</p>
              <CardAction
                variant="ghost"
                className="flex items-center gap-2 text-xs font-label-caps text-label-caps bg-surface-variant px-3 py-1.5 rounded-full text-deep-forest hover:bg-antique-gold/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]" data-icon="add" aria-hidden="true">add</span>
                Add to Itinerary
              </CardAction>
            </CardContent>
          </motion.article>
        ))}
      </div>
    </section>
  );
}