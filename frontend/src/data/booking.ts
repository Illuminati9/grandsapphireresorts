/**
 * Booking links. This site does not take bookings itself: every "Book" and
 * "Reserve" button sends the guest to one of these links.
 *
 * - BOOKING_URL: the main booking page (navbar, hero, mobile menu).
 * - ROOM_BOOKING_URLS: optional per-room links for the "Reserve" buttons;
 *   a room left empty uses BOOKING_URL.
 *
 * While a link is empty, its button scrolls to the contact section instead,
 * so no button is ever dead.
 */
export const BOOKING_URL = "";

export const ROOM_BOOKING_URLS: Record<string, string> = {
  "deluxe-mountain": "",
  "family-dormitory": "",
  "superior-villa": "",
};

const FALLBACK_HREF = "#location";

export function bookingHref(roomId?: string): string {
  return (roomId && ROOM_BOOKING_URLS[roomId]) || BOOKING_URL || FALLBACK_HREF;
}

/** Link attributes for a booking href: external links open in a new tab. */
export function bookingLinkProps(href: string) {
  return /^https?:\/\//.test(href)
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };
}
