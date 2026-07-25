"use client";

import React, { useRef, useEffect, useMemo, useImperativeHandle } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface VelocityMarqueeImage {
  src: string;
  alt: string;
  label?: string;
}

export interface VelocityMarqueeProps {
  images: VelocityMarqueeImage[];
  backgroundColor?: string;
  borderColor?: string;
  titleText?: string;
  imageLabelPrefix?: string;
  speed?: number;
  repeatCount?: number;
  className?: string;
}

export const VelocityMarquee = React.forwardRef<HTMLDivElement, VelocityMarqueeProps>(
  (
    {
      images,
      backgroundColor = "#F8F5EC",
      borderColor = "#122E22",
      titleText = "GRAND SAPPHIRE",
      imageLabelPrefix = "GSR",
      speed = 50,
      repeatCount = 4,
      className,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollX = useMotionValue(0);

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    useEffect(() => {
      let animationFrame: number;
      const animate = () => {
        const maxX = images.length * 320;
        scrollX.set((scrollX.get() + speed * 0.02) % maxX);
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speed, images.length]);

    const repeatedImages = useMemo(() => {
      const result: VelocityMarqueeImage[] = [];
      for (let i = 0; i < repeatCount; i++) {
        result.push(...images);
      }
      return result;
    }, [images, repeatCount]);

    const transformX = useTransform(scrollX, [0, images.length * 320 * repeatCount], [0, -images.length * 320 * (repeatCount - 1)]);

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden w-full",
          className
        )}
        style={{ backgroundColor, border: `2px solid ${borderColor}` } as React.CSSProperties}
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <h1 className="font-headline text-6xl md:text-9xl font-bold tracking-widest text-center">
            <span style={{ color: borderColor, opacity: 0.15 }}>{titleText}</span>
          </h1>
        </div>

        <motion.div
          className="flex gap-4 px-4 py-8"
          style={{
            x: transformX,
            willChange: "transform",
          }}
        >
          {repeatedImages.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              className="relative flex-shrink-0 w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
              style={{ flexShrink: 0 }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[10px] group cursor-pointer">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/70 via-deep-forest/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-warm-ivory transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <p className="text-label-caps font-label text-xs tracking-widest text-antique-gold mb-1">
                    {imageLabelPrefix} {String(index % images.length + 1).padStart(2, "0")}
                  </p>
                  <p className="font-headline text-lg md:text-xl font-medium truncate">
                    {img.label || img.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${backgroundColor}, transparent)`,
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-32 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${backgroundColor}, transparent)`,
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-32 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${backgroundColor}, transparent)`,
          }}
        />
      </div>
    );
  }
);

VelocityMarquee.displayName = "VelocityMarquee";