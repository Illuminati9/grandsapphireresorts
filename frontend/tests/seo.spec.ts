import { expect, test } from "@playwright/test";
import { readSiteConfig } from "../src/lib/site-config";
import { siteDetails } from "../src/data/site";

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
