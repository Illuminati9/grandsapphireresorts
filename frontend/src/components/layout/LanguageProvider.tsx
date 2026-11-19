"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { translate, type Locale } from "@/i18n/messages";

interface LanguageContextValue {
  locale: Locale;
  t: (message: string, values?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en", t: (message, values) => translate("en", message, values),
});

export function LanguageProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const value = useMemo(() => ({ locale, t: (message: string, values?: Record<string, string | number>) => translate(locale, message, values) }), [locale]);

  return <LanguageContext.Provider value={value}>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-button focus:bg-warm-ivory focus:px-6 focus:py-3 focus:text-deep-forest">{value.t("Skip to main content")}</a>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
