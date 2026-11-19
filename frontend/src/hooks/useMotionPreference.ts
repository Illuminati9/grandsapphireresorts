"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const getSnapshot = () => window.matchMedia(query).matches;
// Keep server HTML and the first hydration render identical. Motion is enabled
// after hydration only when the browser preference allows it.
const getServerSnapshot = () => true;

function subscribe(listener: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", listener);
  return () => preference.removeEventListener("change", listener);
}

export function useMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
