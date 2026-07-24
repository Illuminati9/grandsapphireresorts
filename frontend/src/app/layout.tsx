import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
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
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_back,arrow_forward,call,chevron_down,close,directions_car,email,facebook,family_restroom,globe,instagram,keyboard_double_arrow_down,local_airport,local_fire_department,location_on,login,logout,map,menu,pool,restaurant,sports_esports,support_agent,train,twitter,videocam,wifi"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}