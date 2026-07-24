"use client";

import { motion } from "framer-motion";
import { CardImage, CardContent, CardTitle, CardDescription, CardPrice, CardAction } from "@/components/ui";

const suites = [
  {
    id: "deluxe-mountain",
    name: "Deluxe Mountain View",
    description: "Spacious room offering panoramic views of the Western Ghats.",
    price: "₹6,500",
    period: "/night",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0yfFHIoBBYuXvWs2-7_5TynLyLHJGTa58Q-UnuK6-PcTFdVQDz5bkeH_Onqonkcr84qIlhJ5EwOXnWSx-RE6IFSSYlUWtcoPHSyYK71vta_vDfz4p2EHk34ZHRS94z6V-ur6429UhFiWygRrddVLt0RCAK1NO1C7AAPRZck9uWPH7qOcDs_9kxFEwT6qDzKF_eSJBHU8o__RWivML7jIDxFT9B3KworrCPqI0aszdfhHJcDY4ziWwtgyj_HryyebS0OFOSseSCbA",
    alt: "A luxurious hotel room with a large window showing a misty mountain view at sunrise. The room features a plush king-sized bed with crisp white linens, a comfortable seating area, and elegant wooden accents.",
  },
  {
    id: "family-dormitory",
    name: "Family Dormitory",
    description: "Perfect for large groups, featuring comfortable bunk beds and ample space.",
    price: "₹12,000",
    period: "/night",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFx9h_KabMVX-pHtoIYhP5JusxB7lMoUAw__uM1pK6x8r1d1G7tb-8mH6ZAKk6p2wuoz0bZFqpEbw-03nc6w0JsnJVT4vUiTnVvBqYVgr1PBZmUQeYSceFKlJGq2KSVZs7V3p2cbEehC31okAcUXhFcbyq6Rj4jQsN3VhVGgJ_Yuh4I30Bu-Arr60XWbu1_SUXIdpZrTJKbq5Gm2vgdDQQBNfvpVhB91Gx-4wR14x76BihW_bM1Nd6cLxHr59eyg6S8C4eNo9o2Q",
    alt: "A spacious and cozy family dormitory room in a mountain resort. The room has multiple comfortable beds arranged neatly, with warm lighting and wooden paneling on the walls. Large windows let in natural light, revealing a lush green forest outside.",
  },
  {
    id: "superior-villa",
    name: "Superior Villa",
    description: "An exclusive retreat with a private balcony and premium amenities.",
    price: "₹18,500",
    period: "/night",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNXEJ5MUkzmVnVSMYr9unyEJMvxr0N14fD4yMLMGE2ocMuaN80N5344A3sdrVH2mp9POJFUWIekin7D1gPgFTz1rU6TgUCeNBcxoEScj8_NcaJaTzVu0nMS3pxKIXw3UwdIa0gTP0uEzA2sNTyiX-7AXfpSyytezUvEU_uau7RtAB2OIVio4xP2fiYQPLvcIkAZAJHkp1JWKXGRs019qvfNkKtJ8GncASpbfSEemhF7ZZMOiou19RN9src4zHGfo6JE_GVr2LnR7s",
    alt: "A stunning superior villa nestled in a lush hillside. The villa features a modern architectural design with large glass walls, surrounded by dense tropical foliage. A private infinity pool reflects the twilight sky. Warm lights illuminate the interior, contrasting beautifully with the cool, dark exterior environment.",
  },
];

export function SuitesSection() {
  return (
    <section id="villas" className="py-xl max-w-max-width mx-auto px-lg accommodations-section" aria-labelledby="suites-title">
      <div className="mb-12 text-center md:text-left">
        <motion.h2
          id="suites-title"
          className="font-headline text-headline-md text-deep-forest mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Accommodations
        </motion.h2>
        <motion.p
          className="text-on-surface-variant max-w-2xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Discover our thoughtfully designed spaces, blending rustic charm with modern comfort.
        </motion.p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-md accommodations-grid"
        role="list"
        aria-label="Villa options"
      >
        {suites.map((suite, index) => (
          <motion.article
            key={suite.id}
            className="bg-surface rounded-lg overflow-hidden border border-antique-gold/20 group hover:border-antique-gold/50 transition-colors accommodation-card interactive-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            role="listitem"
          >
            <div className="relative h-64 overflow-hidden image-container">
              <CardImage
                src={suite.image}
                alt={suite.alt}
                aspectRatio="video"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 card-image"
              />
            </div>
            <CardContent className="p-6">
              <CardTitle level={3} className="font-headline text-2xl text-deep-forest mb-2">
                {suite.name}
              </CardTitle>
              <CardDescription className="mb-6 min-h-[48px]">{suite.description}</CardDescription>
              <div className="flex justify-between items-end border-t border-surface-variant pt-4">
                <div>
                  <p className="text-sm text-on-surface-variant">Starting from</p>
                  <CardPrice className="text-xl font-semibold text-deep-forest">
                    {suite.price} <span className="text-sm font-normal">{suite.period}</span>
                  </CardPrice>
                </div>
                <CardAction
                  variant="secondary"
                  className="bg-deep-forest text-warm-ivory px-4 py-2 rounded text-sm hover:bg-twilight-navy transition-colors border border-transparent hover:border-antique-gold"
                >
                  Reserve
                </CardAction>
              </div>
            </CardContent>
          </motion.article>
        ))}
      </div>
    </section>
  );
}