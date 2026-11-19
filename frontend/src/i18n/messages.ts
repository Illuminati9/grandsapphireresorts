import en from "./en.json" with { type: "json" };
import ml from "./ml.json" with { type: "json" };

export type Locale = "en" | "ml";
export const messages = { en, ml };

export function translate(locale: Locale, message: string, values: Record<string, string | number> = {}) {
  const key = message.replace(/\s+/g, " ").trim();
  const dictionary: Record<string, string> = messages[locale];
  return (dictionary[key] || message).replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    values[name] === undefined ? placeholder : String(values[name]),
  );
}
