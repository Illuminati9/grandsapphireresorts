import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge does not know the custom font sizes in tailwind.config.ts, so
// it read `text-label-caps` as a text colour and dropped the real colour class
// next to it (e.g. `text-on-primary`). Keep this list in sync with
// theme.extend.fontSize.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "hero-desktop",
            "hero-mobile",
            "section-title",
            "section-title-lg",
            "card-title",
            "body-md",
            "body-lg",
            "body-sm",
            "label-caps",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
