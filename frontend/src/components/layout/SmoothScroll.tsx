"use client";

import { useMotionPreference } from "@/hooks/useMotionPreference";
import { type ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduceMotion = useMotionPreference();

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: { immediate: reduceMotion },
        lerp: reduceMotion ? 1 : 0.08,
        smoothWheel: !reduceMotion,
        syncTouch: false,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
