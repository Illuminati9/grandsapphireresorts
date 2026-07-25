"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

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
      cardWidth = 280,
      ...props
    },
    ref
  ) => {
    const N = images.length;

    const customStyle = useMemo(() => ({
      "--n": String(N),
      "--w": `${cardWidth}px`,
      "--ba": `calc(1turn / ${N})`,
      "--anim-dur": `${animationDuration}s`,
    }) as React.CSSProperties, [N, cardWidth, animationDuration]);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-full min-h-[500px] grid place-items-center overflow-hidden relative",
          className
        )}
        style={{
          perspective: "1000px",
          maskImage: "linear-gradient(90deg, transparent, #000 15% 85%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15% 85%, transparent)",
        }}
        {...props}
      >
        <div
          className={cn(
            "grid place-items-center [transform-style:preserve-3d] motion-reduce:!animate-[ry_128s_linear_infinite]",
            containerClassName
          )}
          style={{
            ...customStyle,
            animation: "ry var(--anim-dur) linear infinite",
            transformStyle: "preserve-3d",
          }}
        >
          <style jsx>{`
            @keyframes ry {
              to { transform: rotateY(1turn); }
            }
          `}</style>

          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt || `Resort image ${i + 1}`}
              className={cn(
                "[grid-area:1/1] object-cover rounded-[10px] border border-antique-gold/20 [backface-visibility:hidden]",
                cardClassName
              )}
              style={{
                width: "var(--w)",
                aspectRatio: "7/10",
                "--i": i,
                transform: "rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))",
              } as React.CSSProperties}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";