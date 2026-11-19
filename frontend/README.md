# Grand Sapphire Resorts frontend

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3, Framer Motion, and Lenis. Webpack is explicitly retained for development and production builds during this upgrade. Use Node.js 24 LTS (`nvm use` reads `.nvmrc`).

## Local development

Run from `frontend/`:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. If the operating system reports a file-watcher limit, use `WATCHPACK_POLLING=true npm run dev`.

## Reservation and map details

`src/data/reservations.ts` is the shared source for business details. Its defaults use the owner-supplied information:

- Booking: [Booking.com property page](https://www.booking.com/hotel/in/grandsaphireresorts.html). The supplied share URL redirects here; tracking and challenge query parameters are omitted.
- Reservations: Srinivas, +91 85476 39769.
- Directions: [owner-supplied Google Maps link](https://maps.app.goo.gl/uHHDWyV2Fk9UeRKv8). The embed uses its property marker at 9.8404195, 77.0652606, rather than the camera-center coordinates.
- Address and check-in/out follow the [Google property listing](https://www.google.co.in/travel/hotels/entity/CgsIsrrAuLqxuIzwARAB): Pushpagiri, Thankamony, Idukki, Kerala 685514; 12:00 PM / 11:00 AM.
- No email address has been confirmed, so the email row is hidden by default.

Every Book/Reserve link uses the property booking URL unless a room-specific URL is supplied. Room links do not claim to preselect a room on Booking.com. The site does not process payments or store reservations.

To override a confirmed destination, copy `.env.example` to `.env.local` or set the same variables in the deployment platform. Blank overrides use the confirmed defaults. All `NEXT_PUBLIC_*` values are public and embedded at build time: never put credentials in them, and rebuild after changes.

`npm run check:deployment` validates HTTPS destinations, phone/email formatting, Google embed origins, and the presence of a reservation channel. It rejects the previous placeholder phone number. It does not test third-party availability or make a reservation.

## Language and accessibility

The EN/ML buttons and mobile language selector translate the complete home page using the matching message dictionaries in `src/i18n/`. The selected language persists in local storage and syncs across tabs; it remains usable for the current page when storage is blocked. `LanguageProvider` updates the document language, title, and description after hydration. The static HTML and social sharing metadata default to English; separate locale URLs are not configured.

Malayalam uses a self-hosted Next.js font. Translation keys and interpolation placeholders are checked by the regression suite. Keep both JSON dictionaries in sync when editing copy. Proper names, the resort brand, phone numbers, and prices remain unchanged.

The mobile menu and gallery viewer use native modal dialogs with keyboard access, Escape dismissal, focus restoration, and background scroll locking. A skip link reaches the main content. A measured header offset keeps section links clear of the fixed header through both native and Lenis scrolling. Reduced-motion settings disable automatic stories, decorative shine, parallax, and WebGL animation. The motion preference has a stable server snapshot to avoid hydration mismatches, and changing it preserves the selected gallery image.

External resort photos fall back to a local resort image if unavailable; guest portraits fall back to initials. Section icons use bundled SVGs rather than an external icon font. Dining descriptions and experience controls are available on touch screens.

## Validation

```sh
npm run lint
npm run check:deployment
npm run build
npm run typecheck
npm audit
npx playwright install chromium
npm run test:e2e
```

The 50-check suite serves the production build on port 3100. It covers English and Malayalam at seven widths (320–1440px), language persistence and blocked storage, hydration with both motion preferences, keyboard dialogs, gallery navigation, touch controls, autoplay pause/resume, image fallbacks, dark system themes, booking links, contact details, and configuration validation. Run `npm run build` before it. On a machine with Chrome installed, `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` can use that browser instead of downloading Chromium. Booking.com is stubbed in tests; no transaction is submitted. These checks cover the public home page, not unused component exports or third-party booking internals.

GitHub Actions runs these checks on pull requests and pushes to `main`, using Node 24. Browser downloads and build-time Google font fetching require network access. Lint passes without warnings. The unused gradient text utility flagged by the design check was removed. The detector has one file-and-value-scoped exception for the pre-existing, unused `--transition-spring` token in `globals.css`; it has no consumers in the page, and the bounce-easing rule stays active elsewhere.

## Deployment

Set the deployment project root to `frontend/`, use Node 24+, and run `npm ci` followed by `npm run check:deployment && npm run lint && npm run build`. Use `npm run start` for a Node server or the platform's Next.js adapter. This repository is not configured as a plain static export.

The upgrade replaces `next lint` with the ESLint CLI and flat configuration. Next.js 16 builds validate types but do not invoke lint, so keep the explicit lint step in the deployment pipeline. No deployment is performed by this PR's validation workflow.
