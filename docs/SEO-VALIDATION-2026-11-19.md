# Bilingual SEO validation — 19 November 2026

Status: implementation and local validation complete. The owner approved the orch-pipeline Gate 2 commit, PR, merge after successful CI, and deployment on 19 November 2026. This document records predeployment validation; production deployment and live verification follow this approval. The existing public release remains the rollback baseline.

## Candidate behavior

English stays at `/`; Malayalam is prerendered at `/ml`. Initial HTML includes the matching language, translated content, title/description, self-canonical and reciprocal `en`/`ml` alternatives with English `x-default`. Language links work without JavaScript. URL language wins over older local-storage preferences, and unsupported paths return 404. The sitemap lists both production pages; previews remain non-indexable.

The H1 identifies the actual resort and locality in both languages, with the existing slogan retained as supporting text. Core location/contact information is readable without JavaScript. Linked `Resort`, `WebSite` and `WebPage` JSON-LD use one stable business identity and confirmed facts. No unsupported ratings/reviews/awards/price offers were added to schema.

## Verification results

- Production build: passed; `/` and `/ml` generated statically.
- Full production regression suite: **77 passed** after the dependency restore and final narrow-screen guard. Includes locale HTML/metadata without JavaScript, invalid routes, seven responsive widths, blocked/conflicting storage, browser history/new tabs, gallery/dialog/booking regressions and mobile decoration/font delivery.
- Independently built deploy-preview configuration: **20 SEO checks passed**. The indexing logic, schema, canonicals and locale routes are unchanged by the final narrow-viewport decoration guard.
- Locale routing and metadata helpers: **100% statements/branches/functions/lines measured** using c8. This is coverage of `src/i18n/routing.ts` and `src/lib/seo.ts`, not an aggregate application-coverage claim.
- Lint and typecheck: passed. Dependency audit: zero reported vulnerabilities in the application dependency tree. Diff whitespace check: passed.
- Independent code review and security review: no actionable findings. Scope included dynamic locale input, metadata/JSON-LD boundaries and the optional offline font generator. Reviews were static; runtime evidence above is from the main task.
- Netlify CLI 27.20.0 offline build and Next.js adapter 5.16.8: passed with the real production hostname. Both pages, sharing image and internal server function packaged successfully. This was a build check, not a deployment.
- Schema.org Validator: English-only and Malayalam-only code snippets extracted from that actual-hostname build each show **0 errors, 0 warnings**. Their linked website/resort entities resolve within the WebPage graph. This does not establish Google rich-result eligibility or completed indexing.
- Browser preview: English/Malayalam desktop and 320px mobile layouts checked; real language links work; no error/warning logs observed during that interaction pass. An additional final phone-screenshot attempt was interrupted by the browser tool; its emulation cleanup could not be confirmed. Final automated mobile checks passed.

## Local Lighthouse results

Lighthouse 13.6.0, default simulated mobile settings, local production server on port 3101. Reports use the CI-only `resort.example` metadata fixture; the separate Netlify build verified the real hostname. These are local lab results, not public-CDN measurements or field Core Web Vitals.

| Language | SEO | Accessibility | Best practices | Performance | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| en | 100 | 100 | 100 | 85 | 4.4 s | 0.001 | 20 ms |
| ml | 100 | 100 | 100 | 84 | 4.5 s | 0.018 | 10 ms |

SEO/accessibility/best-practices scores are 100 in both final runs. Simulated mobile LCP remains above the 2.5-second goal; the candidate must not be described as passing all Core Web Vitals. INP and 75th-percentile field performance were not measured. Run the public-CDN audit after deployment before drawing production performance conclusions.

The first integrated lab runs scored 48/74 for English/Malayalam performance and 96 for accessibility. Changes address demonstrated costs: decorative WebGL is skipped on touch or narrow screens; the hero image has high fetch priority; contact label contrast is corrected. Cold-start variation was reproduced on narrow non-touch screens and covered by a separate failing test before the guard was extended.

The brand font now uses a 19,740-byte WOFF2 subset of the unchanged 618,564-byte source TTF (the earlier server transferred about 249,787 compressed TTF bytes). The optional generator checked all 19 retained glyph recordings and advance widths plus all name/copyright/license records against the source. It validates before atomic replacement using a securely created temporary file. FontTools 4.60.2 and Brotli 1.2.1 were used only in an isolated asset-tool environment; application/build dependencies are unchanged. This preserves lettering and metadata, and does not establish commercial font rights.

## TDD evidence

1. Five new SEO acceptance checks were executed against the old application and failed for the intended missing `/ml`, generic H1, hidden no-JavaScript location content and missing sitemap entry.
2. Mobile WebGL initialization and compact-font delivery each had a focused executed RED test before their fixes. A narrow non-touch test additionally reproduced the remaining cold-rendering path.
3. The final same-behavior checks are GREEN in the 77-test suite. Checkpoint evidence is preserved as logs rather than early commits to honor the user-invoked pipeline's explicit pre-commit gate.
4. A local dependency-install mistake during isolated release preparation was corrected with a lockfile-based reinstall. Final required build/tests were rerun after restoration; production hosting was unaffected. Infrastructure failures were not counted as functional RED evidence.

Commands (from `frontend/`, except the root Netlify build):

```sh
SITE_URL=https://resort.example CONTEXT=production npm run build
SITE_URL=https://resort.example CONTEXT=production PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- --workers=2
npm run lint
npm run typecheck
npm audit --audit-level=moderate
SITE_URL=https://resort.example CONTEXT=production npm run check:deployment
# In an isolated source copy, build with CONTEXT=deploy-preview, then run tests/seo.spec.ts.
# Root of isolated release copy:
SITE_URL=https://grandsapphireresorts.netlify.app CONTEXT=production npx --yes netlify-cli@27.20.0 build --offline --context production
```

## Review and release gate

Approved conventional commit: `feat: add bilingual SEO and improve mobile loading`.

With explicit Gate 2 confirmation received: commit only this task's files, push a PR, require its checks, merge and deploy to the existing `grandsapphireresorts` Netlify project. Verify the public `/` and `/ml` pages, both language metadata sets, robots/sitemap, schema, assets and browser interactions. Use the existing manual CLI publish-path normalization described in the local release record. Retain published deployment `6afeedb42bfdd624da053e35` as the rollback baseline. No plan upgrade or domain purchase is part of this release.

## Remaining owner evidence

Search Console verification and the existing Google Business Profile website update need authorized owner access. Supporting evidence for displayed rates, reviews/statistics, awards, eco certification and commercial font rights is still pending. These changes do not establish ranking, traffic, AI citations or Google indexing. The separate SEO strategy contains evidence-led content and earned-link drafts; no outreach or listings were submitted.

Full local reports, screenshots, schema snippets, patch and logs are retained under the gitignored `.netlify/seo-review-2026-11-19/` folder. Reports and source were reviewed before requesting Gate 2.
