"use client";

import { motion } from "framer-motion";

export function LocationSection() {
  const locationInfo = {
    address: "Grand Sapphire Resorts, Idukki, Kerala, India",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    phone: "+91 123 456 7890",
    email: "reservations@grandsapphireresorts.com",
    coordinates: "9.8450° N, 76.9838° E",
  };

  return (
    <section id="location" className="py-xl max-w-content mx-auto px-lg location-section" aria-labelledby="location-title">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <motion.h2
            id="location-title"
            className="section-title text-deep-forest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Visit Us
          </motion.h2>
          <motion.p
            className="section-subtitle mt-4 text-on-surface-variant"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Nestled in the serene Western Ghats of Idukki, Kerala — where misty mountains meet warm hospitality.
          </motion.p>

          <div className="mt-10 space-y-6">
            {[
              { icon: "location_on", label: "Address", value: locationInfo.address },
              { icon: "login", label: "Check-in", value: locationInfo.checkIn },
              { icon: "logout", label: "Check-out", value: locationInfo.checkOut },
              { icon: "call", label: "Phone", value: locationInfo.phone, href: `tel:${locationInfo.phone}` },
              { icon: "email", label: "Email", value: locationInfo.email, href: `mailto:${locationInfo.email}` },
              { icon: "map", label: "Coordinates", value: locationInfo.coordinates },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4 label-caps"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.08 }}
              >
                <span className="material-symbols-outlined text-antique-gold text-xl mt-1 flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <p className="text-on-surface-variant/60 text-body-sm">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-deep-forest hover:text-antique-gold transition-colors text-body-md">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-deep-forest text-body-md">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-video rounded-hero overflow-hidden shadow-hero bg-surface-container-highest">
            <iframe
              title="Grand Sapphire Resorts Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.123456789!2d76.9838!3d9.8450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080b5f3e5e5e5f%3A0x5e5e5e5e5e5e5e5e!2sGrand%20Sapphire%20Resorts!5e0!3m2!1sen!2sin!4v1234567890"
              style={{ border: 0 }}
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}