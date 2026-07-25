"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface CarouselImage {
  src: string;
  alt?: string;
}

export interface HorizontalCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
  className?: string;
  width?: number;
  showNavigation?: boolean;
  showCounter?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export const HorizontalCarousel = ({
  images,
  className,
  width = 1100,
  showNavigation = true,
  showCounter = true,
  autoplay = false,
  autoplayInterval = 5000,
}: HorizontalCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxImage, setLightboxImage] = useState<CarouselImage | null>(null);

  const activeItem = images[activeIndex];

  // Auto-play effect
  useEffect(() => {
    if (!autoplay || images.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, images.length]);

  const handleNext = () => {
    if (activeIndex < images.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Pre-calculate rotations for visual variety
  const rotations = useMemo(() => [3, -5, 7, -2, 4, -8, 6, -3], []);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-center p-4 md:p-8", className)}>
      <div
        className="relative grid grid-cols-1 md:grid-cols-[1fr_1fr] md:grid-rows-[auto_1fr_auto] gap-x-8 gap-y-6 w-full"
        style={{ maxWidth: `${width}px`, perspective: "1400px" }}
      >
        {/* Counter */}
        {showCounter && (
          <div className="row-start-1 md:col-start-2 md:row-start-1 text-right font-mono text-sm text-deep-forest/70">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Image Card Stack */}
        <div className="row-start-2 md:col-start-1 md:row-start-1 md:row-span-3 relative w-full aspect-[16/9] md:aspect-[4/3]">
          <AnimatePresence custom={direction}>
            {images.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;

              return (
                <motion.div
                  key={`${item.src}-${index}`}
                  className="absolute inset-0 w-full h-full overflow-hidden border-8 bg-warm-ivory border-white shadow-[0_24px_60px_rgba(13,27,46,0.22)] rounded-2xl cursor-pointer"
                  initial={{
                    x: offset * 18,
                    y: Math.abs(offset) * 8,
                    z: -180 * Math.abs(offset),
                    scale: 0.85 - Math.abs(offset) * 0.05,
                    rotateZ: rotations[index % rotations.length],
                    opacity: isActive ? 1 : 0.5,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  animate={
                    isActive
                      ? {
                          x: [offset * 18, direction === 1 ? -250 : 250, 0],
                          y: [Math.abs(offset) * 8, 0, 0],
                          z: [-250, 180, 280],
                          scale: [0.85, 1.08, 1],
                          rotateZ: [rotations[index % rotations.length], -7, 0],
                          opacity: 1,
                          zIndex: 100,
                        }
                      : {
                          x: offset * 18,
                          y: Math.abs(offset) * 8,
                          z: -180 * Math.abs(offset),
                          rotateZ: rotations[index % rotations.length],
                          scale: 0.85 - Math.abs(offset) * 0.05,
                          opacity: 0.55,
                          zIndex: 10 - Math.abs(offset),
                        }
                  }
                  exit={{
                    x: direction === 1 ? -280 : 280,
                    z: -300,
                    scale: 0.7,
                    rotateZ: direction === 1 ? -12 : 12,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setLightboxImage(item)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt || `Resort image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={isActive}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Text Area */}
        <div className="col-start-1 md:col-start-2 md:row-start-2 flex flex-col justify-center min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem?.src || activeIndex}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-2xl font-bold text-deep-forest mb-3">
                {activeItem?.alt || "Grand Sapphire Resorts"}
              </h3>
              <p className="text-base text-neutral-700 dark:text-neutral-400">
                Discover the tranquil beauty of the Western Ghats through our immersive photography.
                Each image captures the unique charm and luxury that defines the Grand Sapphire experience.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {showNavigation && images.length > 1 && (
          <div className="col-start-1 md:col-start-2 md:row-start-3 flex gap-3 justify-center md:justify-start mt-6 md:mt-4">
            <button
              disabled={activeIndex === 0}
              onClick={handlePrev}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full border-2 border-antique-gold bg-white transition-all shadow-lg",
                activeIndex === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-antique-gold/10 hover:scale-105 hover:shadow-xl"
              )}
              aria-label="Previous image"
            >
              <ArrowLeft className="w-5 h-5 text-antique-gold" />
            </button>
            <button
              disabled={activeIndex === images.length - 1}
              onClick={handleNext}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full border-2 border-antique-gold bg-white transition-all shadow-lg",
                activeIndex === images.length - 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-antique-gold/10 hover:scale-105 hover:shadow-xl"
              )}
              aria-label="Next image"
            >
              <ArrowRight className="w-5 h-5 text-antique-gold" />
            </button>
          </div>
        )}

        {/* Progress Dots */}
        <div className="col-start-1 md:col-span-2 row-start-3 md:row-start-4 flex items-center justify-center gap-2 mt-6">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                "transition-all duration-300 rounded-full",
                idx === activeIndex
                  ? "w-10 h-2 bg-antique-gold"
                  : "w-2 h-2 bg-deep-forest/30 hover:bg-deep-forest/60"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt || "Lightbox"}
                width={1400}
                height={900}
                className="rounded-2xl object-contain w-full shadow-2xl"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -top-16 right-0 text-white text-3xl bg-white/10 backdrop-blur-xl rounded-full w-12 h-12 flex items-center justify-center border border-white/20"
                onClick={() => setLightboxImage(null)}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
