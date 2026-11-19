import { expect, test } from "@playwright/test";
import { bookingHref, bookingLinkProps } from "../src/data/booking";
import { reservationConfigurationErrors, reservationDetails, type ReservationDetails } from "../src/data/reservations";

const emptyDetails: ReservationDetails = {
  bookingUrl: "", roomBookingUrls: {}, phone: "", email: "", mapsUrl: "", mapEmbedUrl: "",
};

test("confirmed booking and contact details pass the deployment check", () => {
  expect(reservationConfigurationErrors(reservationDetails, true)).toEqual([]);
  expect(reservationDetails.phone).toBe("+91 85476 39769");
  expect(reservationDetails.mapsUrl).toBe("https://maps.app.goo.gl/uHHDWyV2Fk9UeRKv8");
});

test("all suites and unknown room IDs use the main property booking URL", () => {
  for (const id of [undefined, "deluxe-mountain", "family-dormitory", "superior-villa", "unknown", "toString", "__proto__"]) {
    expect(bookingHref(id)).toBe("https://www.booking.com/hotel/in/grandsaphireresorts.html");
  }
});

test("external booking links open safely while local fallbacks stay in-page", () => {
  expect(bookingLinkProps(reservationDetails.bookingUrl)).toEqual({
    href: reservationDetails.bookingUrl, target: "_blank", rel: "noopener noreferrer",
  });
  expect(bookingLinkProps("#location")).toEqual({ href: "#location" });
});

test("deployment rejects missing reservation channels", () => {
  expect(reservationConfigurationErrors(emptyDetails, true)).toHaveLength(1);
  expect(reservationConfigurationErrors({ ...emptyDetails, phone: "+91 85476 39769" }, true)).toEqual([]);
});

for (const bookingUrl of ["javascript:alert(1)", "http://example.com", "https://user:password@example.com", "not-a-url"]) {
  test(`rejects an unsafe booking destination: ${bookingUrl.split(":")[0]}`, () => {
    expect(reservationConfigurationErrors({ ...emptyDetails, bookingUrl })).not.toEqual([]);
  });
}

test("rejects placeholder phone, malformed email, and non-Google map frames", () => {
  expect(reservationConfigurationErrors({ ...emptyDetails, phone: "+91 123 456 7890" })).not.toEqual([]);
  expect(reservationConfigurationErrors({ ...emptyDetails, email: "bad email" })).not.toEqual([]);
  expect(reservationConfigurationErrors({ ...emptyDetails, mapEmbedUrl: "https://example.com/maps/embed" })).not.toEqual([]);
  expect(reservationConfigurationErrors({ ...emptyDetails, mapEmbedUrl: "https://www.google.com/maps?output=embed&q=9.8404195,77.0652606" })).toEqual([]);
});
