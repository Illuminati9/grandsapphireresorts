export interface ReservationDetails {
  bookingUrl: string;
  roomBookingUrls: Record<string, string>;
  phone: string;
  email: string;
  mapsUrl: string;
  mapEmbedUrl: string;
}

export const resortDetails = {
  address: "Pushpagiri, Thankamony, Idukki, Kerala 685514, India",
  contactName: "Srinivas",
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
};

// These are public business details, inlined by Next.js at build time.
export const reservationDetails: ReservationDetails = {
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "https://www.booking.com/hotel/in/grandsaphireresorts.html",
  roomBookingUrls: {
    "deluxe-mountain": process.env.NEXT_PUBLIC_BOOKING_DELUXE_URL?.trim() || "",
    "family-dormitory": process.env.NEXT_PUBLIC_BOOKING_FAMILY_URL?.trim() || "",
    "superior-villa": process.env.NEXT_PUBLIC_BOOKING_VILLA_URL?.trim() || "",
  },
  phone: process.env.NEXT_PUBLIC_RESERVATIONS_PHONE?.trim() || "+91 85476 39769",
  email: process.env.NEXT_PUBLIC_RESERVATIONS_EMAIL?.trim() || "",
  mapsUrl: process.env.NEXT_PUBLIC_RESORT_MAPS_URL?.trim() || "https://maps.app.goo.gl/uHHDWyV2Fk9UeRKv8",
  // Marker coordinates from the owner-supplied Maps link (not its camera center).
  mapEmbedUrl: process.env.NEXT_PUBLIC_RESORT_MAP_EMBED_URL?.trim() || "https://www.google.com/maps?q=9.8404195%2C77.0652606&z=16&output=embed",
};

export function reservationConfigurationErrors(details: ReservationDetails, requireContact = false): string[] {
  const errors: string[] = [];
  const urls = {
    NEXT_PUBLIC_BOOKING_URL: details.bookingUrl,
    NEXT_PUBLIC_BOOKING_DELUXE_URL: details.roomBookingUrls["deluxe-mountain"],
    NEXT_PUBLIC_BOOKING_FAMILY_URL: details.roomBookingUrls["family-dormitory"],
    NEXT_PUBLIC_BOOKING_VILLA_URL: details.roomBookingUrls["superior-villa"],
    NEXT_PUBLIC_RESORT_MAPS_URL: details.mapsUrl,
    NEXT_PUBLIC_RESORT_MAP_EMBED_URL: details.mapEmbedUrl,
  };

  for (const [name, value] of Object.entries(urls)) {
    if (!value) continue;
    try {
      const url = new URL(value);
      if (url.protocol !== "https:" || url.username || url.password) throw new Error("Invalid URL");
      const isGoogleMap = url.hostname === "www.google.com" &&
        (url.pathname.startsWith("/maps/embed") || (url.pathname === "/maps" && url.searchParams.get("output") === "embed"));
      if (name === "NEXT_PUBLIC_RESORT_MAP_EMBED_URL" && !isGoogleMap) {
        throw new Error("Invalid map embed");
      }
    } catch {
      errors.push(`${name} must be a valid HTTPS URL${name.endsWith("MAP_EMBED_URL") ? " for a Google Maps embed" : ""}.`);
    }
  }

  if (details.phone && (!/^\+?[\d\s()-]{7,25}$/.test(details.phone) ||
      details.phone.replace(/\D/g, "") === "911234567890")) {
    errors.push("NEXT_PUBLIC_RESERVATIONS_PHONE must be a confirmed reservation number, not the old placeholder.");
  }
  if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
    errors.push("NEXT_PUBLIC_RESERVATIONS_EMAIL must be a valid email address.");
  }
  if (requireContact && !details.bookingUrl && !details.phone && !details.email) {
    errors.push("Set NEXT_PUBLIC_BOOKING_URL, NEXT_PUBLIC_RESERVATIONS_PHONE, or NEXT_PUBLIC_RESERVATIONS_EMAIL before deployment.");
  }

  return errors;
}

const errors = reservationConfigurationErrors(reservationDetails);
if (errors.length) throw new Error(errors.join("\n"));
