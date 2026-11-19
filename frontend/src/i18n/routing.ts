import type { Locale } from "./messages";

export const localePaths: Record<Locale, string> = { en: "/", ml: "/ml" };

export function localeFromSegments(segments?: string[]): Locale | undefined {
  if (!segments?.length) return "en";
  if (segments.length === 1 && segments[0] === "ml") return "ml";
  return undefined;
}
