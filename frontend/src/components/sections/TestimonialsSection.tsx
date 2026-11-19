"use client";

import { useMotionPreference } from "@/hooks/useMotionPreference";
import { useLanguage } from "@/components/layout/LanguageProvider";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, Quote, Star } from "lucide-react";
import { googleReviewExcerpts as testimonials, googleReviewSnapshot } from "@/data/google-reviews";

const stats = [
  { value: googleReviewSnapshot.reviewCount, suffix: "", label: "Google reviews" },
  { value: googleReviewSnapshot.rating, suffix: "/5", label: "Google rating" },
  { value: googleReviewSnapshot.fiveStarCount, suffix: "", label: "Five-star ratings" },
];

function circularDistance(index: number, activeIndex: number, length: number) {
  let distance = index - activeIndex;
  if (distance > length / 2) distance -= length;
  if (distance < -length / 2) distance += length;
  return distance;
}

function StarRating({ rating }: { rating: number }) {
  const { t } = useLanguage();
  return (
    <div className="flex shrink-0 gap-0.5" aria-label={t("{rating} out of 5 stars", { rating })}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${
            index < rating ? "fill-antique-gold text-antique-gold" : "text-outline-variant"
          }`}
        />
      ))}
    </div>
  );
}

function StatCounter({ value, suffix, label }: (typeof stats)[number]) {
  const { t } = useLanguage();
  const valueRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(valueRef, { once: true, amount: 0.8 });
  const reduceMotion = useMotionPreference();
  const hasDecimal = value % 1 !== 0;
  const formatValue = useCallback(
    (current: number) => `${hasDecimal ? current.toFixed(1) : Math.round(current).toLocaleString()}${suffix}`,
    [hasDecimal, suffix],
  );

  useEffect(() => {
    if (!inView || !valueRef.current) return;

    if (reduceMotion) {
      valueRef.current.textContent = formatValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.65,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (current) => {
        if (valueRef.current) valueRef.current.textContent = formatValue(current);
      },
    });

    return () => controls.stop();
  }, [formatValue, inView, reduceMotion, value]);

  return (
    <div className="text-center" aria-label={`${formatValue(value)} ${t(label)}`}>
      <p className="mb-1 font-headline text-3xl text-deep-forest sm:text-4xl md:text-5xl">
        <span ref={valueRef} aria-hidden="true">
          {formatValue(value)}
        </span>
      </p>
      <p className="font-label text-[10px] tracking-[0.12em] text-on-surface-variant sm:text-label-caps sm:tracking-widest">
        {t(label)}
      </p>
    </div>
  );
}

function GuestAvatar({ name }: { name: string }) {
  return (
    <span data-testid="guest-avatar-fallback" aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-antique-gold/50 bg-deep-forest font-semibold text-warm-ivory">
      {name.split(/\s+/).map(part => part[0]).join("")}
    </span>
  );
}

export function TestimonialsSection() {
  const { t, locale } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useMotionPreference();

  const changeSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (reduceMotion || isPaused) return;
    const timer = window.setInterval(() => { if (!document.hidden) changeSlide(1); }, 5500);
    return () => window.clearInterval(timer);
  }, [reduceMotion, isPaused, activeIndex]);

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-gradient-to-b from-surface-container-low to-warm-ivory py-2xl"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-content px-6">
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 block font-label text-label-caps tracking-widest text-antique-gold">
            {t("Guest Stories")}
          </span>
          <h2 id="testimonials-title" className="mb-4 font-headline text-section-title-lg text-deep-forest">
            {t("Cherished Memories")}
          </h2>
          <div className="accent-line mx-auto mb-6" />
          <p className="section-subtitle mx-auto">
            {t("Selected excerpts from public Google Maps reviews. Read each full review for context.")}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-4 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <StatCounter {...stat} />
            </motion.div>
          ))}
        </div>

        <p className="mb-8 text-center text-sm text-on-surface-variant">
          {t("Manual snapshot checked on")} <time dateTime={googleReviewSnapshot.checkedOn}>{t(googleReviewSnapshot.displayDate)}</time>.
          {" "}<a href={googleReviewSnapshot.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-ring">{t("Read all reviews on Google Maps")}</a>
        </p>

        <div className={`relative mx-auto max-w-5xl ${locale === "ml" ? "h-[620px] sm:h-[580px]" : "h-[520px] sm:h-[520px] md:h-[550px]"}`} role="region" aria-label={t("Guest testimonials carousel")}>
          <div className="absolute inset-0 overflow-hidden" role="group" aria-label={t("Guest Stories")} aria-live={isPaused ? "polite" : "off"}>
            {testimonials.map((testimonial, index) => {
              const distance = circularDistance(index, activeIndex, testimonials.length);
              const isActive = distance === 0;
              const isVisible = Math.abs(distance) <= 2;

              return (
                <motion.article
                  key={testimonial.id}
                  className="absolute left-1/2 top-1/2 w-[min(79vw,31rem)] rounded-luxury border border-antique-gold/20 bg-deep-forest p-7 text-left text-warm-ivory shadow-hero outline-none focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:ring-offset-4 focus-visible:ring-offset-warm-ivory sm:p-9"
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
                  aria-labelledby={`testimonial-${testimonial.id}-author`}
                  aria-hidden={!isActive}
                >
                  <div className="absolute inset-0 rounded-luxury bg-gradient-to-br from-antique-gold/10 via-transparent to-transparent" />
                  <div className="relative">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <GuestAvatar name={testimonial.name} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p id={`testimonial-${testimonial.id}-author`} className="font-semibold text-warm-ivory">{testimonial.name}</p>
                          </div>
                          <p className="text-xs text-warm-ivory/60">{t("Google Maps reviewer")}</p>
                        </div>
                      </div>
                      <StarRating rating={testimonial.rating} />
                    </div>

                    <Quote className="mb-4 h-8 w-8 text-antique-gold/55" aria-hidden="true" />
                    <p id={`testimonial-${testimonial.id}-quote`} className={`min-h-[5.25rem] text-warm-ivory ${locale === "ml" ? "font-body text-lg leading-relaxed sm:text-xl" : "font-headline text-2xl leading-tight sm:text-[2rem]"}`}>
                      &ldquo;{t(testimonial.quote)}&rdquo;
                    </p>
                    <p className="mt-6 text-xs text-warm-ivory/70">
                      {t(locale === "ml" ? "Translated from an English review excerpt" : "Excerpt from a Google Maps review")}
                    </p>
                    <a href={testimonial.url} target="_blank" rel="noopener noreferrer" tabIndex={isActive ? 0 : -1} className="mt-2 inline-flex min-h-11 items-center text-sm text-antique-gold underline underline-offset-4 focus-ring">
                      {t("Read full review on Google Maps")}
                    </a>
                  </div>
                  {!isActive && <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => setActiveIndex(index)} className="absolute inset-0 cursor-pointer rounded-luxury" />}
                </motion.article>
              );
            })}
          </div>

          <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 sm:gap-3">
            <button
              type="button"
              onClick={() => changeSlide(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-deep-forest/15 bg-warm-ivory text-deep-forest transition hover:border-antique-gold hover:text-antique-gold active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold"
              aria-label={t("Previous testimonial")}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="flex gap-0" aria-label={t("Showing testimonial {current} of {total}", { current: activeIndex + 1, total: testimonials.length })}>
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="flex h-11 w-6 items-center justify-center rounded-full focus-ring sm:w-8"
                  aria-label={t("Show testimonial {number}", { number: index + 1 })}
                  aria-current={index === activeIndex ? "true" : undefined}
                ><span aria-hidden="true" className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-5 bg-antique-gold" : "w-2 bg-deep-forest/25"}`} /></button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => changeSlide(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-deep-forest/15 bg-warm-ivory text-deep-forest transition hover:border-antique-gold hover:text-antique-gold active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold"
              aria-label={t("Next testimonial")}
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            {!reduceMotion && <button type="button" onClick={() => setIsPaused(current => !current)} aria-label={t(isPaused ? "Play guest stories" : "Pause guest stories")} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-deep-forest/15 text-deep-forest focus-ring">
              {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>}
          </div>
        </div>
      </div>
    </section>
  );
}
