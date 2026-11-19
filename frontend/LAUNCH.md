# Hosting and search launch

## Release

Use the owner-selected Netlify Free account (TechWizard9999), not the previously inspected personal account. No hosting project existed when this work started. Never upgrade the account or buy a domain without an approved price and account owner.

For Git-connected builds, import the exact repository, use `main`, and retain the root `netlify.toml`. GitHub must give the selected Netlify account access to that repository. If repository installation access is unavailable, publish a verified release with the Netlify CLI and record its source commit and deployment ID. A manual CLI deployment does not provide automatic deployment of later GitHub pushes.

Wait for a successful deploy before sharing a URL. Check the public HTTPS page, site assets, language switching and persistence, phone and desktop navigation, gallery dialog, booking and telephone links, map destination, canonical URL, `robots.txt`, `sitemap.xml`, JSON-LD, and sharing image. Retain the first successful deployment as a rollback baseline; later releases can roll back through Netlify's deployment history.

## Domain

A Netlify hostname can be assigned without buying a separate domain. Choose and confirm an available project name; an HTTP 404 at a proposed hostname does not prove it can be reserved.

On 19 November 2026, the .com registry returned an existing registration for `grandsapphireresorts.com` and no record for `grandsapphireidukki.com`. This is a point-in-time registry check, not a registrar reservation or guaranteed checkout availability. A custom domain requires confirmation of the exact name, first-year charge, renewal price, privacy options, account ownership, and payment before registration.

After registering a domain: attach it to the correct Netlify project, follow the DNS records returned for that project, wait for DNS and HTTPS verification, make it the primary domain, set `SITE_URL` to its HTTPS origin, rebuild, and verify canonical/sitemap URLs. Redirect alternative hostnames to the preferred domain. Keep staging and deploy previews out of the index.

## Google ownership and discovery

1. Verify the final domain in Google Search Console using its supplied DNS TXT record, or verify a URL-prefix property using its actual HTML meta token through `GOOGLE_SITE_VERIFICATION`. Never invent a token or claim verification before Google confirms it.
2. Submit `/sitemap.xml` and inspect the homepage with Google's URL Inspection tool. Check the rendered HTML, crawl permissions, canonical selection, and indexing status. A sitemap submission does not guarantee indexing or placement.
3. Have the authorized owner update the existing Google Business Profile with the final website, consistent address and phone, accurate category/hours, and current property photographs. Avoid creating a duplicate listing. Complete any Google-requested business verification with the owner.
4. Check Search Console queries, indexing errors and field Core Web Vitals after real traffic accumulates. A new site has no field performance history. Local audit scores do not establish search rank.

## Content evidence still to collect

The owner has offered to provide sources for displayed room rates, guest reviews/statistics, the 2024 award, eco certification, and commercial font rights. Those sources have not yet been attached to the repository. The technical SEO changes do not validate those claims, and they are excluded from the business schema. Confirm current prices and review provenance before treating them as verified marketing evidence.

The `StormWraithPersonalUse-aYd8g.ttf` filename indicates a personal-use edition; confirm a commercial license with the owner or replace it with a font licensed for the business site. Do not claim a license solely from the filename.

## Search scope

The current indexable surface is one English server-rendered home page. Malayalam is a client preference; there are no distinct Malayalam URLs or hreflang alternates yet. Add server-rendered locale routes with reciprocal alternates before treating Malayalam as an independent search landing page.

There is no guaranteed first position. Google's local results depend on relevance, distance and prominence; website work, a verified Business Profile, useful content, legitimate reviews and other sites' references all contribute.

References: [Google SEO guidance](https://developers.google.com/search/docs/fundamentals/do-i-need-seo), [local ranking](https://support.google.com/business/answer/7091), [business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [localized URLs](https://developers.google.com/search/docs/specialty/international/localized-versions).
