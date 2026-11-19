import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Noto_Sans_Malayalam } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
  weight: ["400", "600"],
});

const malayalam = Noto_Sans_Malayalam({ subsets: ["malayalam"], variable: "--font-malayalam", display: "swap", weight: "variable", preload: false });

export const metadata: Metadata = {
  title: "Grand Sapphire Resorts | Twilight in the Hills",
  description: "A quiet-luxury private-villa resort in the Western Ghats of Idukki, Kerala. Where twilight meets tranquility.",
  keywords: ["resort", "luxury", "villa", "Idukki", "Kerala", "Western Ghats", "mountain resort", "boutique hotel"],
  authors: [{ name: "Grand Sapphire Resorts" }],
  creator: "Grand Sapphire Resorts",
  publisher: "Grand Sapphire Resorts",
  formatDetection: { telephone: true },
  openGraph: {
    title: "Grand Sapphire Resorts | Twilight in the Hills",
    description: "A quiet-luxury private-villa resort in the Western Ghats of Idukki, Kerala.",
    type: "website",
    locale: "en_IN",
    siteName: "Grand Sapphire Resorts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Sapphire Resorts | Twilight in the Hills",
    description: "A quiet-luxury private-villa resort in the Western Ghats of Idukki, Kerala.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable} ${malayalam.variable}`}>
      <body className="antialiased">
        <LanguageProvider><SmoothScroll>{children}</SmoothScroll></LanguageProvider>
      </body>
    </html>
  );
}
