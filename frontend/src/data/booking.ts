/**
 * Booking links. This site does not take bookings itself: every "Book" and
 * "Reserve" button sends the guest to one of these links.
 *
 * - BOOKING_URL: the confirmed Booking.com property page (navbar, hero, mobile menu).
 * - ROOM_BOOKING_URLS: optional per-room links for the "Reserve" buttons;
 *   a room left empty uses BOOKING_URL.
 *
 * Owner-confirmed defaults and optional public environment overrides live in
 * reservations.ts. A missing main destination falls back to contact.
 */
import { reservationDetails } from "./reservations";

export const BOOKING_URL = reservationDetails.bookingUrl;

export const ROOM_BOOKING_URLS = reservationDetails.roomBookingUrls;

const FALLBACK_HREF = "#location";

export function bookingHref(roomId?: string): string {
  const roomUrl = roomId && Object.hasOwn(ROOM_BOOKING_URLS, roomId) ? ROOM_BOOKING_URLS[roomId] : "";
  return roomUrl || BOOKING_URL || FALLBACK_HREF;
}

/** Link attributes for a booking href: external links open in a new tab. */
export function bookingLinkProps(href: string) {
  return /^https?:\/\//.test(href)
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };
}
