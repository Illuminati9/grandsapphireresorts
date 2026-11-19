"use client";

import { useMotionPreference } from "@/hooks/useMotionPreference";
import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { bookingHref, bookingLinkProps } from "@/data/booking";
import { useLanguage } from "@/components/layout/LanguageProvider";

type BookingButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children?: React.ReactNode;
  variant?: "primary" | "booking" | "secondary" | "ghost";
};

/**
 * BookingButton - Grand Sapphire Resorts styled CTA with Vengeance UI shine effect.
 * Renders a link: by default to the booking page in src/data/booking.ts.
 * Uses design tokens from DESIGN.md:
 * - Primary: near-black green (#00190F) fill, warm ivory text, antique gold hover border
 * - Booking CTA: same as primary + antique gold hover border + scale(1.02)
 * - Secondary: transparent, deep forest text, antique gold border
 * - Ghost: transparent, antique gold text, underline on hover
 */
export const BookingButton = React.forwardRef<HTMLAnchorElement, BookingButtonProps>(
  (
    {
      children,
      href = bookingHref(),
      className = "",
      variant = "booking",
      whileTap = { scale: 0.97 },
      transition = { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
      ...rest
    },
    ref
  ) => {
    const { t } = useLanguage();
    const reduceMotion = useMotionPreference();
    const variantStyles = {
      primary: cn(
        "group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-button min-h-[48px] relative overflow-hidden",
        "bg-primary text-on-primary font-label text-label-caps transition-all duration-normal",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory",
        "disabled:pointer-events-none disabled:opacity-50",
        "[--shine:rgba(255,255,255,0.4)]",
        "hover:border hover:border-antique-gold",
      ),
      booking: cn(
        "group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-button min-h-[48px] relative overflow-hidden",
        "bg-primary text-on-primary font-label text-label-caps transition-all duration-normal",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory",
        "disabled:pointer-events-none disabled:opacity-50",
        "[--shine:rgba(255,255,255,0.4)]",
        "hover:border-antique-gold hover:scale-[1.02]",
        "shadow-sm hero-cta",
      ),
      secondary: cn(
        "group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-button min-h-[48px] relative overflow-hidden",
        "bg-transparent text-deep-forest font-label text-label-caps border border-antique-gold transition-all duration-normal",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory",
        "disabled:pointer-events-none disabled:opacity-50",
        "[--shine:rgba(201,162,39,0.6)]",
        "hover:bg-secondary-container",
      ),
      ghost: cn(
        "group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-button min-h-[48px] relative overflow-hidden",
        "bg-transparent text-antique-gold font-label text-label-caps transition-all duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory",
        "disabled:pointer-events-none disabled:opacity-50",
        "[--shine:rgba(201,162,39,0.6)]",
        "hover:underline",
      ),
    };

    return (
      <motion.a
        ref={ref}
        {...bookingLinkProps(href)}
        {...rest}
        whileHover={reduceMotion ? undefined : { scale: variant === "booking" ? 1.02 : 1.01 }}
        whileTap={reduceMotion ? undefined : whileTap}
        transition={transition}
        className={cn(variantStyles[variant], className)}
      >
        <span
          className="tracking-wide font-light flex items-center justify-center h-full w-full relative z-10"
        >
          {children ?? t("Book Your Stay")}
        </span>

        {/* Border shine effect - uses --shine CSS variable for theme-aware color */}
        {!reduceMotion && <motion.span
          aria-hidden="true"
          data-booking-shine
          className="block absolute inset-0 rounded-button p-px"
          style={{
            background:
              "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
          initial={{ backgroundPosition: "100% 0", opacity: 0 }}
          animate={{ backgroundPosition: ["100% 0", "0% 0"], opacity: [0, 1, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
        />}
      </motion.a>
    );
  }
);

BookingButton.displayName = "BookingButton";
