"use client";

const trustItems = [
  { icon: "support_agent", label: "24/7 ASSISTANCE" },
  { icon: "videocam", label: "CCTV SECURITY" },
  { icon: "wifi", label: "FREE WI-FI" },
  { icon: "family_restroom", label: "FAMILY FRIENDLY" },
];

export function TrustStripSection() {
  return (
    <section className="bg-warm-ivory py-8 border-b border-surface-variant trust-strip-section" aria-label="Trust indicators">
      <div className="max-w-max-width mx-auto px-lg">
        <div className="flex flex-wrap justify-center gap-md items-center trust-strip-content">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-sm bg-surface py-2 px-4 rounded-full border border-antique-gold/20"
            >
              <span className="material-symbols-outlined text-antique-gold" data-icon={item.icon} aria-hidden="true">
                {item.icon}
              </span>
              <span className="font-label-caps text-label-caps text-deep-forest">{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-sm ml-auto bg-deep-forest text-warm-ivory py-2 px-4 rounded-full">
            <span className="material-symbols-outlined" data-icon="call" aria-hidden="true">
              call
            </span>
            <a className="font-label-caps text-label-caps" href="tel:+911234567890">
              +91 123 456 7890
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}