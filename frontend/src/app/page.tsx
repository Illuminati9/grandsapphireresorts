"use client";

import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import { HeroSection } from "@/components/sections";
import { TrustStripSection } from "@/components/sections";
import { SuitesSection } from "@/components/sections";
import { AmenitiesSection } from "@/components/sections";
import { ExperiencesSection } from "@/components/sections";
import { LocationSection } from "@/components/sections";
import { ResortShowcaseSection } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" role="main">
        <HeroSection />
        <TrustStripSection />
        <SuitesSection />
        <ResortShowcaseSection />
        <AmenitiesSection />
        <ExperiencesSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}