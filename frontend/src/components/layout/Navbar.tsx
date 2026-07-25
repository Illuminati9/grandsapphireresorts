"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { BookingButton } from "@/components/ui";

const navLinks = [
  { href: "#villas", label: "Villas" },
  { href: "#facilities", label: "Facilities" },
  { href: "#experiences", label: "Experiences" },
  { href: "#location", label: "Location" },
];

const languages = [
  { code: "EN", name: "English" },
  { code: "ML", name: "മലയാളം" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      <header
        id="mainNav"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-warm-ivory/95 backdrop-blur-lg py-md shadow-[0_1px_3px_rgba(0,0,0,0.05)] nav-scrolled"
            : "bg-deep-forest/70 backdrop-blur-md py-md shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
        }`}
        role="banner"
      >
        <nav className="flex justify-between items-center px-lg max-w-content mx-auto" aria-label="Main navigation">
          <Link
            href="/"
            className={`font-brand text-2xl md:text-3xl font-normal tracking-normal leading-none transition-colors brand-logo ${
              isScrolled ? "text-deep-forest" : "text-warm-ivory"
            }`}
            aria-label="Grand Sapphire Resorts - Home"
          >
            Grand Sapphire Resorts
          </Link>

          <div className="hidden md:flex items-center gap-md">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium hover:text-antique-gold transition-colors duration-300 nav-link ${
                  isScrolled ? "text-deep-forest" : "text-warm-ivory"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className={`flex items-center gap-sm ml-md border-l pl-md ${
              isScrolled ? "border-deep-forest/30" : "border-warm-ivory/30"
            }`}>
              <span className={`font-medium text-sm ${isScrolled ? "text-deep-forest" : "text-warm-ivory"}`}>
                EN
              </span>
              <span className={`font-medium text-sm ${isScrolled ? "text-deep-forest/50" : "text-warm-ivory/50"}`}>
                ML
              </span>
            </div>

            <BookingButton
              variant="booking"
              className="ml-md"
            >
              Book Now
            </BookingButton>
          </div>

          <button
            onClick={toggleMobileMenu}
            className={`md:hidden transition-colors ${
              isScrolled ? "text-deep-forest" : "text-warm-ivory"
            }`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="w-8 h-8" aria-hidden="true" />
          </button>
        </nav>

        <div
          id="mobile-menu"
          className={`md:hidden fixed inset-0 bg-warm-ivory z-50 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-6 p-2 text-deep-forest"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMobileMenu}
                className="font-headline text-2xl text-deep-forest hover:text-antique-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col items-center gap-4 pt-4 border-t border-outline-variant w-full max-w-xs">
              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5 text-antique-gold" aria-hidden="true" />
                <select
                  className="label-caps text-antique-gold bg-transparent border-none outline-none appearance-none cursor-pointer"
                  aria-label="Select language"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <BookingButton variant="booking" className="w-full">
                Book Now
              </BookingButton>
            </div>
          </nav>
        </div>
      </header>

      <div className="h-20" aria-hidden="true" />
    </>
  );
}