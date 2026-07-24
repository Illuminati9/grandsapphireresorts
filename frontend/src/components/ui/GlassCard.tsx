"use client";

import { HTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "experience" | "amenity";
  hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, variant = "default", hover = true, className = "", ...props }, ref) => {
    const variantStyles = {
      default: "card",
      experience: "rounded-card border border-outline-variant/20 bg-surface-container-low p-0 overflow-hidden",
      amenity: "rounded-chip bg-transparent p-3",
    };

    const hoverStyles = hover ? "hover:shadow-[var(--shadow-card-hover)]" : "";

    return (
      <div
        ref={ref}
        className={`${variantStyles[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: "video" | "square" | "portrait";
}

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt, aspectRatio = "video", className = "", ...props }, ref) => {
    const aspectStyles = {
      video: "aspect-video",
      square: "aspect-square",
      portrait: "aspect-[3/4]",
    };

    return (
      <div
        ref={ref}
        className={`${aspectStyles[aspectRatio]} w-full rounded-t-card overflow-hidden ${className}`}
        {...props}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }
);

CardImage.displayName = "CardImage";

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`p-6 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 2 | 3 | 4;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, level = 3, className = "", ...props }, ref) => {
    const classNames = `text-card-title font-headline ${className}`;
    if (level === 2) {
      return <h2 ref={ref} className={classNames} {...props}>{children}</h2>;
    }
    if (level === 4) {
      return <h4 ref={ref} className={classNames} {...props}>{children}</h4>;
    }
    return <h3 ref={ref} className={classNames} {...props}>{children}</h3>;
  }
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <p ref={ref} className={`text-body-sm text-on-surface-variant ${className}`} {...props}>
        {children}
      </p>
    );
  }
);

CardDescription.displayName = "CardDescription";

export const CardPrice = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <p ref={ref} className={`text-body-md font-medium text-on-surface ${className}`} {...props}>
        {children}
      </p>
    );
  }
);

CardPrice.displayName = "CardPrice";

export interface CardActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "booking";
}

export const CardAction = forwardRef<HTMLButtonElement, CardActionProps>(
  ({ children, className = "", variant = "secondary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`btn-${variant} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CardAction.displayName = "CardAction";