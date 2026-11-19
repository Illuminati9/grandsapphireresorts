import { expect, test } from "@playwright/test";

for (const locale of ["en", "ml"]) {
  test(`${locale} serves a dated Google snapshot and sourced excerpts without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:3100${locale === "en" ? "/" : "/ml"}`);
    const section = page.locator("#testimonials");
    await expect(section).toContainText("4.8");
    await expect(section).toContainText("530");
    await expect(section).toContainText("2026");
    await expect(section.locator('a[href^="https://maps.app.goo.gl/"]')).toHaveCount(4);
    await expect(section.locator("img")).toHaveCount(0);
    await expect(section).not.toContainText("98%");
    await expect(section).not.toContainText("Aditya Menon");
    await expect(section).not.toContainText("Superior Villa");
    await context.close();
  });
}

test("each selected review preserves its actual author, rating and Google permalink", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const reviews = [
    { name: "RAJESH.V NAIR", rating: 5, url: "https://maps.app.goo.gl/jVNXevLZ6y97Sptz5" },
    { name: "Rahul Reghunath", rating: 4, url: "https://maps.app.goo.gl/Lnnc8bFzMc6BD1Mm9" },
    { name: "bala ram", rating: 4, url: "https://maps.app.goo.gl/qp9m4pkC2tTH63RZ8" },
  ];
  for (const [index, review] of reviews.entries()) {
    await page.getByRole("button", { name: `Show testimonial ${index + 1}`, exact: true }).click();
    const card = page.locator('#testimonials article[aria-hidden="false"]');
    await expect(card).toContainText(review.name);
    await expect(card.getByLabel(`${review.rating} out of 5 stars`, { exact: true })).toBeVisible();
    await expect(card.getByRole("link")).toHaveAttribute("href", review.url);
    await expect(card.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
    await expect(card).not.toContainText("Verified guest");
  }
});
