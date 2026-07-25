"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  stayType: string;
  rating: number;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: "aditya",
    name: "Aditya Menon",
    location: "Bengaluru, India",
    stayType: "Superior Villa",
    rating: 5,
    quote: "The mountain mist, warm staff, and quiet gave our family the reset we needed.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    location: "Mumbai, India",
    stayType: "Deluxe Mountain View",
    rating: 5,
    quote: "Waking up to the Western Ghats made our anniversary feel truly unforgettable.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "rajesh",
    name: "Rajesh Kumar",
    location: "Chennai, India",
    stayType: "Family Dormitory",
    rating: 5,
    quote: "The children loved the trails and campfires while we had time to properly unwind.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "meera",
    name: "Meera Nair",
    location: "Kochi, India",
    stayType: "Superior Villa",
    rating: 5,
    quote: "Our private villa felt beautifully secluded, with every detail handled thoughtfully.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "arjun",
    name: "Arjun Patel",
    location: "Hyderabad, India",
    stayType: "Deluxe Mountain View",
    rating: 4,
    quote: "The local food and spa were the highlight of a wonderfully easy weekend away.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
];

const stats = [
  { value: "500+", label: "Happy Guests" },
  { value: "4.9", label: "Average Rating" },
  { value: "98%", label: "Would Return" },
];

function circularDistance(index: number, activeIndex: number, length: number) {
  let distance = index - activeIndex;
  if (distance > length / 2) distance -= length;
  if (distance < -length / 2) distance += length;
  return distance;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${
            index < rating ? "fill-antique-gold text-antique-gold" : "text-outline-variant"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const changeSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => changeSlide(1), 5500);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-gradient-to-b from-surface-container-low to-warm-ivory py-2xl"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-content px-6">
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 block font-label text-label-caps tracking-widest text-antique-gold">
            Guest Stories
          </span>
          <h2 id="testimonials-title" className="mb-4 font-headline text-section-title-lg text-deep-forest">
            Cherished Memories
          </h2>
          <div className="accent-line mx-auto mb-6" />
          <p className="section-subtitle mx-auto">
            Hear from travellers who found a sanctuary in the hills and keep coming back.
          </p>
        </div>

        <div className="mb-14 grid grid-cols-3 gap-4 md:mb-16 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-1 font-headline text-3xl text-deep-forest sm:text-4xl md:text-5xl">{stat.value}</p>
              <p className="font-label text-[10px] tracking-[0.12em] text-on-surface-variant sm:text-label-caps sm:tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto h-[432px] max-w-5xl sm:h-[456px] md:h-[492px]" role="region" aria-label="Guest testimonials carousel">
          <div className="absolute inset-0 overflow-hidden" role="list" aria-live="polite">
            {testimonials.map((testimonial, index) => {
              const distance = circularDistance(index, activeIndex, testimonials.length);
              const isActive = distance === 0;
              const isVisible = Math.abs(distance) <= 2;

              return (
                <motion.button
                  key={testimonial.id}
                  type="button"
                  className="absolute left-1/2 top-1/2 w-[min(79vw,31rem)] cursor-pointer rounded-luxury border border-antique-gold/20 bg-deep-forest p-7 text-left text-warm-ivory shadow-hero outline-none focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:ring-offset-4 focus-visible:ring-offset-warm-ivory sm:p-9"
                  initial={false}
                  animate={{
                    x: distance * 245,
                    y: Math.abs(distance) * 18 - 24,
                    rotate: distance * 3.2,
                    scale: isActive ? 1 : 0.9 - Math.max(0, Math.abs(distance) - 1) * 0.05,
                    opacity: isVisible ? (isActive ? 1 : 0.58) : 0,
                    zIndex: 10 - Math.abs(distance),
                  }}
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 155, damping: 22, mass: 0.9 }}
                  style={{ translate: "-50% -50%" }}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Read testimonial from ${testimonial.name}`}
                  aria-hidden={!isVisible}
                  tabIndex={isVisible ? 0 : -1}
                  role="listitem"
                >
                  <div className="absolute inset-0 rounded-luxury bg-gradient-to-br from-antique-gold/10 via-transparent to-transparent" />
                  <div className="relative">
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.image}
                          alt=""
                          className="h-12 w-12 rounded-full border border-antique-gold/50 object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-warm-ivory">{testimonial.name}</p>
                            <BadgeCheck className="h-4 w-4 text-antique-gold" aria-label="Verified guest" />
                          </div>
                          <p className="text-xs text-warm-ivory/60">{testimonial.location}</p>
                        </div>
                      </div>
                      <StarRating rating={testimonial.rating} />
                    </div>

                    <Quote className="mb-4 h-8 w-8 text-antique-gold/55" aria-hidden="true" />
                    <p className="min-h-[5.25rem] font-headline text-2xl leading-tight text-warm-ivory sm:text-[2rem]">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <p className="mt-8 font-label text-xs tracking-[0.12em] text-antique-gold">{testimonial.stayType}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
            <button
              type="button"
              onClick={() => changeSlide(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-deep-forest/15 bg-warm-ivory text-deep-forest transition hover:border-antique-gold hover:text-antique-gold active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="flex gap-2" aria-label={`Showing testimonial ${activeIndex + 1} of ${testimonials.length}`}>
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold ${
                    index === activeIndex ? "w-6 bg-antique-gold" : "w-2 bg-deep-forest/25 hover:bg-deep-forest/50"
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => changeSlide(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-deep-forest/15 bg-warm-ivory text-deep-forest transition hover:border-antique-gold hover:text-antique-gold active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
