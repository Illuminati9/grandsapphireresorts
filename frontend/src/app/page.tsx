import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import { HeroSection } from "@/components/sections";
import { TrustStripSection } from "@/components/sections";
import { SuitesSection } from "@/components/sections";
import { AmenitiesSection } from "@/components/sections";
import { ExperiencesSection } from "@/components/sections";
import { LocationSection } from "@/components/sections";
import { ResortShowcaseSection } from "@/components/sections";
import { TestimonialsSection } from "@/components/sections";
import { ResortStructuredData } from "@/components/ResortStructuredData";

export default function Home() {
  return (
    <>
      <ResortStructuredData />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <TrustStripSection />
        <SuitesSection />
        <ResortShowcaseSection />
        <AmenitiesSection />
        <ExperiencesSection />
        <TestimonialsSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
