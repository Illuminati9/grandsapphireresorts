"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { translate, type Locale } from "@/i18n/messages";

const STORAGE_KEY = "grand-sapphire-language";
const CHANGE_EVENT = "grand-sapphire-language-change";
let memoryLocale: Locale | undefined;

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) { memoryLocale = undefined; listener(); }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, listener);
  };
}

function getLocale(): Locale {
  if (memoryLocale) return memoryLocale;
  try { return window.localStorage.getItem(STORAGE_KEY) === "ml" ? "ml" : "en"; }
  catch { return "en"; }
}

function setLocale(locale: Locale) {
  memoryLocale = locale;
  try { window.localStorage.setItem(STORAGE_KEY, locale); } catch { /* Keep selection usable when storage is blocked. */ }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (message: string, values?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en", setLocale: () => {}, t: (message, values) => translate("en", message, values),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getLocale, () => "en" as Locale);
  const value = useMemo(() => ({ locale, setLocale, t: (message: string, values?: Record<string, string | number>) => translate(locale, message, values) }), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translate(locale, "Grand Sapphire Resorts | Twilight in the Hills");
    document.querySelector('meta[name="description"]')?.setAttribute("content", translate(locale, "A quiet-luxury private-villa resort in the Western Ghats of Idukki, Kerala. Where twilight meets tranquility."));
  }, [locale]);

  return <LanguageContext.Provider value={value}>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-button focus:bg-warm-ivory focus:px-6 focus:py-3 focus:text-deep-forest">{value.t("Skip to main content")}</a>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
