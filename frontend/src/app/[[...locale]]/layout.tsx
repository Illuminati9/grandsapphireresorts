import { notFound } from "next/navigation";
import { Inter, Cormorant_Garamond, Noto_Sans_Malayalam } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import { localeFromSegments } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import "../globals.css";

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

type Props = { children: React.ReactNode; params: Promise<{ locale?: string[] }> };

export async function generateMetadata({ params }: Pick<Props, "params">) {
  const locale = localeFromSegments((await params).locale);
  if (!locale) notFound();
  return pageMetadata(locale);
}

export default async function RootLayout({ children, params }: Props) {
  const locale = localeFromSegments((await params).locale);
  if (!locale) notFound();
  return (
    <html lang={locale} className={`${inter.variable} ${cormorantGaramond.variable} ${malayalam.variable}`}>
      <body className="antialiased">
        <LanguageProvider locale={locale}><SmoothScroll>{children}</SmoothScroll></LanguageProvider>
      </body>
    </html>
  );
}
