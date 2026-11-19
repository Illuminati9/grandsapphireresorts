"use client";

import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useLenis } from "lenis/react";
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

function containMenuFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;

  const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), select:not([disabled])',
  )).filter((element) => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isMobileMenuOpen && !menu.open) menu.showModal();
    if (!isMobileMenuOpen && menu.open) menu.close();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const wasStopped = lenis?.isStopped;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (!wasStopped) lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMobileMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
        <nav className="flex justify-between items-center gap-sm px-md sm:px-lg max-w-content mx-auto" aria-label="Main navigation">
          <Link
            href="/"
            className={`font-brand text-xl sm:text-2xl xl:text-3xl xl:shrink-0 font-normal tracking-normal leading-tight xl:leading-none transition-colors brand-logo ${
              isScrolled ? "text-deep-forest" : "text-warm-ivory"
            }`}
            aria-label="Grand Sapphire Resorts - Home"
          >
            Grand Sapphire Resorts
          </Link>

          <div className="hidden xl:flex items-center gap-md">
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
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className={`xl:hidden -mr-2 p-2 transition-colors ${
              isScrolled ? "text-deep-forest" : "text-warm-ivory"
            }`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="w-8 h-8" aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* Native modal keeps background content inert and restores trigger focus. */}
        <dialog
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-warm-ivory p-6 pt-20 text-deep-forest open:flex flex-col items-center overflow-y-auto"
          aria-label="Mobile menu"
          onClose={closeMobileMenu}
          onKeyDown={containMenuFocus}
          data-lenis-prevent
        >
          <button
            type="button"
            onClick={closeMobileMenu}
            className="absolute top-6 right-6 min-h-12 min-w-12 p-2 text-deep-forest focus-ring"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          <nav className="my-auto flex shrink-0 flex-col items-center gap-6" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
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

              <BookingButton variant="booking" className="w-full" onClick={closeMobileMenu}>
                Book Now
              </BookingButton>
            </div>
          </nav>
        </dialog>

      <div className="h-20" aria-hidden="true" />
    </>
  );
}
