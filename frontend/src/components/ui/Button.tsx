"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "booking";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-label transition-all duration-normal focus-ring";

    const variantStyles = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      booking: "btn-booking",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-label-caps",
      lg: "px-8 py-4 text-label-caps",
    };

    const widthStyles = fullWidth ? "w-full sm:w-auto" : "";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";