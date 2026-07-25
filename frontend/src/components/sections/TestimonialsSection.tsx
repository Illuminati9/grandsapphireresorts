"use client";

import { motion } from "framer-motion";
import { VelocityMarquee, type VelocityMarqueeImage } from "@/components/ui/velocity-marquee";

const testimonialImages: VelocityMarqueeImage[] = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    alt: "Aditya Menon",
    label: "Aditya Menon — Bengaluru, India — Superior Villa",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    alt: "Priya Sharma",
    label: "Priya Sharma — Mumbai, India — Deluxe Mountain View",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    alt: "Rajesh Kumar",
    label: "Rajesh Kumar — Chennai, India — Family Dormitory",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    alt: "Meera Nair",
    label: "Meera Nair — Kochi, India — Superior Villa",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    alt: "Arjun Patel",
    label: "Arjun Patel — Hyderabad, India — Deluxe Mountain View",
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
    alt: "Sneha Reddy",
    label: "Sneha Reddy — Bangalore, India — Superior Villa",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    alt: "Vikram Singh",
    label: "Vikram Singh — Delhi, India — Family Dormitory",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    alt: "Anita Desai",
    label: "Anita Desai — Pune, India — Deluxe Mountain View",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-xl overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-content mx-auto px-lg">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-label-caps font-label text-antique-gold tracking-widest mb-4 block">
              Guest Stories
            </span>
            <h2
              id="testimonials-title"
              className="font-headline text-section-title text-deep-forest mb-4"
            >
              Cherished Memories
            </h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Hear from travellers who found their sanctuary with us — and keep coming back.
            </p>
          </motion.div>
        </div>

        {/* Velocity Marquee Gallery */}
        <VelocityMarquee
          images={testimonialImages}
          backgroundColor="#F8F5EC"
          borderColor="#122E22"
          titleText="GRAND SAPPHIRE"
          imageLabelPrefix="GSR"
          speed={60}
          repeatCount={3}
        />
      </div>
    </section>
  );
}