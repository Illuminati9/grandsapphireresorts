"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-deep-forest w-full border-t border-antique-gold/20 mt-xl site-footer" role="contentinfo">
      <div className="flex flex-col md:flex-row justify-between items-center px-lg py-xl max-w-content mx-auto gap-md">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <Link
            href="/"
            className="font-headline text-headline-md text-antique-gold mb-2 block"
            aria-label="Grand Sapphire Resorts - Home"
          >
            Grand Sapphire Resorts
          </Link>
          <p className="text-on-primary-container text-sm">Idukki, Kerala, India</p>
          <div className="mt-4 text-on-primary-container text-sm">
            <p>Check-in: 2:00 PM</p>
            <p>Check-out: 11:00 AM</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left">
          <nav aria-label="Legal links" className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-on-primary-container hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-on-primary-container hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
            >
              Terms of Service
            </Link>
          </nav>

          <nav aria-label="Contact links" className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-on-primary-container hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className="text-on-primary-container hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
            >
              Careers
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-on-primary-container/20 py-6 text-center">
        <p className="text-on-primary-container text-sm opacity-80">
          © 2024 Grand Sapphire Resorts Idukki. All rights reserved.
        </p>
      </div>
    </footer>
  );
}