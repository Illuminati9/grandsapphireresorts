import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Noto_Sans_Malayalam } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import { siteDetails } from "@/data/site";
import { readSiteConfig } from "@/lib/site-config";
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
  metadataBase: new URL(readSiteConfig().origin),
  title: siteDetails.title,
  description: siteDetails.description,
  alternates: { canonical: "/" },
  authors: [{ name: "Grand Sapphire Resorts" }],
  creator: "Grand Sapphire Resorts",
  publisher: "Grand Sapphire Resorts",
  formatDetection: { telephone: true },
  openGraph: {
    title: siteDetails.title,
    description: siteDetails.description,
    url: "/",
    type: "website",
    locale: "en_IN",
    siteName: "Grand Sapphire Resorts",
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.title,
    description: siteDetails.description,
  },
  robots: { index: readSiteConfig().indexable, follow: true },
  verification: { google: readSiteConfig().googleVerification },
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
