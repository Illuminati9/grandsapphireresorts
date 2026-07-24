"use client";

import { HTMLAttributes, forwardRef } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = "xl",
      as: Component = "div",
      className = "",
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    };

    const baseStyles = "mx-auto px-container w-full";

    return (
      <Component
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "hero" | "dark" | "alt";
  noPadding?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      variant = "default",
      noPadding = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "bg-warm-ivory",
      hero: "bg-twilight-navy",
      dark: "bg-deep-forest",
      alt: "bg-surface-container",
    };

    const paddingStyles = noPadding ? "" : "py-xl";

    return (
      <section
        ref={ref}
        id={id}
        className={`${variantStyles[variant]} ${paddingStyles} ${className}`}
        {...props}
      >
        <Container>{children}</Container>
      </section>
    );
  }
);

Section.displayName = "Section";