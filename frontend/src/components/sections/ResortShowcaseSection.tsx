"use client";

import { motion } from "framer-motion";
import { HorizontalCarousel } from "@/components/ui/horizontal-carousel";
import { CarouselImage } from "@/components/ui/horizontal-carousel";
import { resortGalleryImages } from "@/data/resort-gallery";

const showcaseImages: CarouselImage[] = resortGalleryImages.map((img) => ({
  src: img.src,
  alt: img.alt || "Grand Sapphire Resorts",
}));

export function ResortShowcaseSection() {
  return (
    <section
      id="resort-showcase"
      className="py-xl max-w-content mx-auto px-lg resort-showcase-section"
      aria-labelledby="showcase-title"
    >
      <div className="text-center mb-12">
        <motion.h2
          id="showcase-title"
          className="section-title text-deep-forest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Resort Showcase
        </motion.h2>
        <motion.p
          className="section-subtitle mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Explore the beauty of Grand Sapphire Resorts through our gallery.
        </motion.p>
      </div>

      <motion.div
        className="w-full bg-warm-ivory rounded-hero p-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <HorizontalCarousel images={showcaseImages} />
      </motion.div>
    </section>
  );
}