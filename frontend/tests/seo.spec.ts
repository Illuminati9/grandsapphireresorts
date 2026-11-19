import { expect, test } from "@playwright/test";
import { readSiteConfig } from "../src/lib/site-config";
import { siteDetails } from "../src/data/site";
import ml from "../src/i18n/ml.json" with { type: "json" };
import { localeFromSegments } from "../src/i18n/routing";
import { pageMetadata } from "../src/lib/seo";

test("locale routing accepts exactly the two published languages", () => {
  expect(localeFromSegments()).toBe("en");
  expect(localeFromSegments([])).toBe("en");
  expect(localeFromSegments(["ml"])).toBe("ml");
  for (const segments of [["en"], ["ML"], ["fr"], ["ml", "rooms"], ["<script>"], [".."]]) {
    expect(localeFromSegments(segments)).toBeUndefined();
  }
});

for (const locale of ["en", "ml"] as const) {
  test(`${locale} metadata keeps production and preview indexing rules`, () => {
    const metadata = pageMetadata(locale);
    expect(metadata.title).toBe(locale === "en" ? siteDetails.title : ml[siteDetails.title as keyof typeof ml]);
    expect(metadata.alternates?.canonical).toBe(`${readSiteConfig().origin}${locale === "en" ? "/" : "/ml"}`);
    expect(metadata.robots).toMatchObject({ index: readSiteConfig().indexable, follow: true });
  });
}

for (const { locale, path, heading } of [
  { locale: "en", path: "/", heading: "Grand Sapphire Resorts in Thankamony, Idukki" },
  { locale: "ml", path: "/ml", heading: "തങ്കമണി, ഇടുക്കിയിലെ ഗ്രാൻഡ് സഫയർ റിസോർട്ട്സ്" },
] as const) {
  test(`${locale} has crawlable localized HTML and reciprocal language metadata`, async ({ browser, request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:3100${path}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    expect(new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!).href).toBe(`${readSiteConfig().origin}${path}`);
    for (const [language, suffix] of [["en", "/"], ["ml", "/ml"], ["x-default", "/"]]) {
      expect(new URL((await page.locator(`link[rel="alternate"][hreflang="${language}"]`).getAttribute("href"))!).href).toBe(`${readSiteConfig().origin}${suffix}`);
    }
    const description = locale === "ml" ? ml[siteDetails.description as keyof typeof ml] : siteDetails.description;
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", locale === "ml" ? "ml_IN" : "en_IN");
    const business = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    expect(business.description).toBe(description);
    expect(business["@id"]).toBe(`${readSiteConfig().origin}/#resort`);
    const entities = await page.locator('script[type="application/ld+json"]').allTextContents();
    const website = entities.map(text => JSON.parse(text)).find(entity => entity["@type"] === "WebSite");
    const webPage = entities.map(text => JSON.parse(text)).find(entity => entity["@type"] === "WebPage");
    expect(website).toMatchObject({ name: siteDetails.name, url: `${readSiteConfig().origin}/` });
    expect(webPage).toMatchObject({ inLanguage: locale === "ml" ? "ml-IN" : "en-IN", about: { "@id": business["@id"] } });
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", new RegExp(`^${readSiteConfig().origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/opengraph-image`));
    await expect(page.locator('header a[hreflang="en"]')).toHaveAttribute("href", "/");
    await expect(page.locator('header a[hreflang="ml"]')).toHaveAttribute("href", "/ml");
    await context.close();
  });

  test(`${locale} core location information is readable without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:3100${path}`);
    await expect(page.locator('#location a[href="tel:+918547639769"]')).toHaveCount(1);
    const hidden = await page.locator('#hero h1, #location h2, #location a[href^="tel:"]').evaluateAll(elements => elements.filter(element => {
      for (let current: Element | null = element; current; current = current.parentElement) {
        const style = getComputedStyle(current);
        if (style.opacity === "0" || style.visibility === "hidden" || style.display === "none") return true;
      }
      return false;
    }).map(element => element.textContent));
    expect(hidden).toEqual([]);
    await context.close();
  });
}

test("only supported locale URLs are authored pages", async ({ request }) => {
  for (const path of ["/en", "/ML", "/fr", "/ml/rooms", "/ml%3Cscript%3E"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test("production uses its confirmed origin while previews cannot be indexed", () => {
  const env = { SITE_URL: "https://resort.example", CONTEXT: "production" };
  expect(readSiteConfig(env)).toMatchObject({ origin: "https://resort.example", indexable: true });
  expect(readSiteConfig({ ...env, CONTEXT: "deploy-preview", DEPLOY_PRIME_URL: "https://preview.example" })).toMatchObject({ origin: env.SITE_URL, indexable: false });
  expect(readSiteConfig({ URL: "https://assigned.netlify.app", CONTEXT: "production" }).origin).toBe("https://assigned.netlify.app");
  expect(readSiteConfig({})).toMatchObject({ origin: "http://localhost:3000", indexable: false });
});

for (const SITE_URL of ["http://resort.example", "https://user:pass@resort.example", "https://resort.example/path", "https://resort.example/?q=x", "https://resort.example/#x", "https://localhost", "javascript:alert(1)"]) {
  test(`rejects an invalid production origin: ${SITE_URL}`, () => {
    expect(() => readSiteConfig({ SITE_URL, CONTEXT: "production" })).toThrow();
  });
}

test("production requires a public origin", () => {
  expect(() => readSiteConfig({ CONTEXT: "production" })).toThrow();
});

test("search engines receive the title, description and business data without JavaScript", async ({ request }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain(`<title>${siteDetails.title}</title>`);
  expect(html).toContain(siteDetails.description);
  const data = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  expect(data).toBeTruthy();
  const business = JSON.parse(data!);
  expect(business).toMatchObject({ "@type": "Resort", name: "Grand Sapphire Resorts", telephone: "+91 85476 39769", address: { postalCode: "685514", addressRegion: "Kerala" }, geo: { latitude: 9.8404195, longitude: 77.0652606 } });
  expect(business).not.toHaveProperty("aggregateRating");
  expect(business).not.toHaveProperty("review");
  expect(business).not.toHaveProperty("award");
});

test("canonical, robots and sitemap agree on the build's public origin", async ({ page, request }) => {
  const config = readSiteConfig();
  await page.goto("/");
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(new URL(canonical!).href).toBe(`${config.origin}/`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", config.indexable ? "index, follow" : "noindex, follow");
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(config.indexable ? "Allow: /" : "Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  if (config.indexable) {
    expect(await robots.text()).toContain(`Sitemap: ${config.origin}/sitemap.xml`);
    expect(await sitemap.text()).toContain(`<loc>${config.origin}/</loc>`);
    expect(await sitemap.text()).toContain(`<loc>${config.origin}/ml</loc>`);
  } else expect(await sitemap.text()).not.toContain("<loc>");
});

test("sharing image is a generated 1200 by 630 PNG", async ({ request }) => {
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const bytes = await image.body();
  expect(bytes.readUInt32BE(16)).toBe(1200);
  expect(bytes.readUInt32BE(20)).toBe(630);
});
