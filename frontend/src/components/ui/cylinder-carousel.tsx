"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface CarouselImage {
  src: string;
  alt?: string;
}

export interface CylinderCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number;
  cardWidth?: number;
}

export const CylinderCarousel = React.forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    {
      images,
      className,
      containerClassName,
      cardClassName,
      animationDuration = 40,
      cardWidth = 340,
      ...props
    },
    ref
  ) => {
    const N = images.length;
    const [isPaused, setIsPaused] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [lightboxImage, setLightboxImage] = useState<CarouselImage | null>(null);

    const animationRef = useRef<HTMLDivElement>(null);

    const customStyle = useMemo(
      () =>
        ({
          "--n": String(N),
          "--w": `${cardWidth}px`,
          "--ba": `calc(1turn / ${N})`,
          "--anim-dur": `${animationDuration}s`,
            "--rotate-offset": "0deg",
        }) as React.CSSProperties,
      [N, cardWidth, animationDuration]
    );

    const handleCardClick = (index: number) => {
      setActiveCardIndex(index);
      setLightboxImage(images[index]);
    };

    return (
      <>
        <div
          ref={ref}
          className={cn(
            "w-full h-full min-h-[620px] grid place-items-center overflow-hidden relative cursor-grab active:cursor-grabbing",
            className
          )}
          style={{
            perspective: "1000px",
            maskImage: "linear-gradient(90deg, transparent, #000 10% 90%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10% 90%, transparent)",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          {...props}
        >
          <div
            ref={animationRef}
            className={cn(
              "grid place-items-center [transform-style:preserve-3d]",
              containerClassName
            )}
            style={{
              ...customStyle,
              animation: isPaused ? "none" : "ry var(--anim-dur) linear infinite",
              transformStyle: "preserve-3d",
              transform: `rotateY(var(--rotate-offset))`,
            }}
          >
            {images.map((img, i) => (
              <Image
                key={i}
                src={img.src}
                alt={img.alt || `Resort image ${i + 1}`}
                width={cardWidth}
                height={Math.round(cardWidth * (10 / 7))} // Aspect ratio 7/10
                className={cn(
                  "[grid-area:1/1] object-cover rounded-[20px] border border-white/30 bg-white/5 [backface-visibility:hidden] cursor-pointer transition-all duration-500 shadow-[0_24px_60px_rgba(13,27,46,0.22)]",
                  cardClassName,
                  {
                    'scale-[1.14] z-20 shadow-luxury': i === activeCardIndex,
                  }
                )}
                style={{
                  width: "var(--w)",
                  aspectRatio: "7/10",
                  "--i": i,
                  transform: `rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w)) / tan(0.5 * var(--ba))))`,
                  filter: i === activeCardIndex ? 'none' : 'brightness(0.88) saturate(0.92)',
                  opacity: i === activeCardIndex || (i === (activeCardIndex + 1) % N) || (i === (activeCardIndex - 1 + N) % N) ? 1 : 0.55,
                } as React.CSSProperties}
                loading="lazy"
                onClick={() => handleCardClick(i)}
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={() => setLightboxImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt || "Lightbox image"}
                  width={1000}
                  height={700}
                  className="rounded-lg object-contain w-full h-full"
                />
                <button
                  className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full"
                  onClick={() => setLightboxImage(null)}
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";
