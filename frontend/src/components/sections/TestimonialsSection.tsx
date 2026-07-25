"use client";

import { motion, type Variants } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  stayType: string;
  rating: number;
  quote: string;
  image: string;
  verified: boolean;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aditya Menon",
    location: "Bengaluru, India",
    stayType: "Superior Villa",
    rating: 5,
    quote:
      "The moment we arrived, it felt like stepping into another world. The mountain mist, the warm staff, the silence — exactly the reset our family needed. We're already planning our next visit.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    verified: true,
    featured: true,
  },
  {
    id: "t2",
    name: "Priya Sharma",
    location: "Mumbai, India",
    stayType: "Deluxe Mountain View",
    rating: 5,
    quote:
      "Waking up to the Western Ghats from our bedroom window was magical. The staff remembered our anniversary and surprised us with a beautiful setup.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "t3",
    name: "Rajesh Kumar",
    location: "Chennai, India",
    stayType: "Family Dormitory",
    rating: 5,
    quote:
      "Our kids loved the nature trails and campfire evenings. It's rare to find a place where adults can relax while children are equally entertained.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "t4",
    name: "Meera Nair",
    location: "Kochi, India",
    stayType: "Superior Villa",
    rating: 5,
    quote:
      "The private villa with its own pool was beyond expectations. Absolute luxury nestled in pristine nature. Grand Sapphire truly understands hospitality.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "t5",
    name: "Arjun Patel",
    location: "Hyderabad, India",
    stayType: "Deluxe Mountain View",
    rating: 4,
    quote:
      "Perfect weekend getaway. The food was exceptional — fresh, local ingredients prepared beautifully. The spa treatments were the highlight of our trip.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    verified: true,
  },
];

const stats = [
  { value: "500+", label: "Happy Guests" },
  { value: "4.9", label: "Average Rating" },
  { value: "98%", label: "Would Return" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "text-antique-gold fill-antique-gold" : "text-outline-variant"
          }`}
        />
      ))}
    </div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TestimonialsSection() {
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <section
      id="testimonials"
      className="py-2xl bg-gradient-to-b from-surface-container-low to-warm-ivory overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-content mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
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
              className="font-headline text-section-title-lg text-deep-forest mb-4"
            >
              Cherished Memories
            </h2>
            <div className="accent-line mx-auto mb-6" />
            <p className="section-subtitle mx-auto">
              Hear from travellers who found their sanctuary with us — and keep coming back.
            </p>
          </motion.div>
        </div>

        {/* Statistics Strip */}
        <motion.div
          className="flex justify-center gap-12 md:gap-20 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={cardVariants} className="text-center">
              <p className="font-headline text-4xl md:text-5xl text-deep-forest mb-1">
                {stat.value}
              </p>
              <p className="text-label-caps font-label text-on-surface-variant tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Testimonial */}
        {featured && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative bg-deep-forest rounded-luxury p-8 md:p-12 text-warm-ivory overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-antique-gold/5 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-antique-gold/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={featured.image}
                      alt={featured.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-antique-gold/40"
                    />
                    {featured.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-antique-gold rounded-full flex items-center justify-center">
                        <BadgeCheck className="w-4 h-4 text-deep-forest" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <Quote className="w-8 h-8 text-antique-gold/40 mb-3 mx-auto md:mx-0" />
                  <p className="text-editorial text-warm-ivory/90 mb-6 max-w-2xl">
                    {featured.quote}
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div>
                      <p className="font-semibold text-warm-ivory">{featured.name}</p>
                      <p className="text-sm text-warm-ivory/60">{featured.location}</p>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-warm-ivory/20" />
                    <div>
                      <p className="text-xs text-antique-gold font-label tracking-wider">
                        {featured.stayType}
                      </p>
                      <StarRating rating={featured.rating} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Testimonial Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          role="list"
          aria-label="Guest testimonials"
        >
          {rest.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              variants={cardVariants}
              className="glass-card rounded-luxury p-6 md:p-8 group"
              role="listitem"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-outline-variant/30"
                  />
                  {testimonial.verified && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-antique-gold rounded-full flex items-center justify-center">
                      <BadgeCheck className="w-3 h-3 text-deep-forest" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-deep-forest text-sm">{testimonial.name}</p>
                  <p className="text-xs text-on-surface-variant">{testimonial.location}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating rating={testimonial.rating} />
                    <span className="text-xs text-antique-gold font-label">
                      · {testimonial.stayType}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
