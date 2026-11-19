import { expect, test } from "@playwright/test";

test("language navigation preserves the correct page through back and forward", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("link", { name: "Switch to Malayalam", exact: true }).click();
  await expect(page).toHaveURL(/\/ml$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ml");
  await page.goBack();
  await expect(page).toHaveURL("http://127.0.0.1:3100/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goForward();
  await expect(page.locator("html")).toHaveAttribute("lang", "ml");
  await expect(page.locator('header a[aria-current="page"]')).toHaveAttribute("href", "/ml");
  await expect(page.locator('footer a[aria-label="Grand Sapphire Resorts - മുഖ്യപേജ്"]')).toHaveAttribute("href", "/ml");
});

test("a language link opened in a new tab renders that URL's language", async ({ page, context }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nextPage = context.waitForEvent("page");
  await page.getByRole("link", { name: "Switch to Malayalam", exact: true }).click({ button: "middle" });
  const other = await nextPage;
  await other.waitForLoadState();
  await expect(other).toHaveURL(/\/ml$/);
  await expect(other.locator("html")).toHaveAttribute("lang", "ml");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await other.close();
});

for (const width of [320, 375, 768, 1024, 1279, 1280, 1440]) {
  test(`navigation fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const navigation = page.getByRole("navigation", { name: "Main navigation" });

    if (width < 1280) {
      await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeVisible();
      await expect(navigation.getByRole("link", { name: "Book Now" })).toBeHidden();
    } else {
      const booking = navigation.getByRole("link", { name: "Book Now" });
      await expect(booking).toBeVisible();
      const bounds = await booking.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("closed menu is absent from accessibility and keyboard navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("dialog", { name: "Mobile menu" })).toHaveCount(0);
    await page.getByRole("link", { name: "Grand Sapphire Resorts - Home", exact: true }).first().focus();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest("#mobile-menu")))).toBe(false);
  });

  test("modal traps focus, closes on Escape, and restores the trigger", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu", exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Mobile menu" });
    const close = dialog.getByRole("button", { name: "Close menu", exact: true });
    await expect(close).toBeFocused();
    await dialog.getByRole("link", { name: "Book Now" }).focus();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("link", { name: "Book Now" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("section navigation closes the menu and scrolls to contact", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Mobile menu" });
    await dialog.getByRole("link", { name: "Location", exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await expect.poll(async () => {
      const bounds = await page.locator("#location").boundingBox();
      return bounds?.y ?? -1;
    }).toBeGreaterThanOrEqual(80);
    await expect.poll(async () => (await page.locator("#location").boundingBox())?.y ?? Infinity).toBeLessThan(130);
  });

  test("booking opens the confirmed property and closes the menu", async ({ page, context }) => {
    await context.route("https://www.booking.com/**", (route) => route.fulfill({
      contentType: "text/html", body: "<title>Booking destination</title>",
    }));
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Mobile menu" });
    const booking = dialog.getByRole("link", { name: "Book Now" });
    await expect(booking).toHaveAttribute("href", "https://www.booking.com/hotel/in/grandsaphireresorts.html");
    await expect(booking).toHaveAttribute("rel", "noopener noreferrer");
    const popupPromise = page.waitForEvent("popup");
    await booking.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL("https://www.booking.com/hotel/in/grandsaphireresorts.html");
    await expect(dialog).toHaveCount(0);
    await popup.close();
  });

  test("resizing to desktop dismisses the modal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Mobile menu" })).toBeVisible();
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.getByRole("dialog", { name: "Mobile menu" })).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Book Now" })).toBeVisible();
  });
});

test("short viewports keep menu links reachable", async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 320 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Mobile menu" });
  const villas = dialog.getByRole("link", { name: "Villas", exact: true });
  expect((await villas.boundingBox())!.y).toBeGreaterThanOrEqual(0);
  await dialog.getByRole("link", { name: "Book Now" }).focus();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "Close menu", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("placeholder reservation details are not published", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="tel:+911234567890"]')).toHaveCount(0);
  await expect(page.getByText("+91 123 456 7890", { exact: true })).toHaveCount(0);
  await expect(page.locator('a[href="mailto:reservations@grandsapphireresorts.com"]')).toHaveCount(0);
  await expect(page.locator('iframe[src*="1234567890"]')).toHaveCount(0);
  await expect(page.locator('a[href="tel:+918547639769"]')).toHaveCount(3);
  await expect(page.locator("#location").getByRole("link", { name: "Get directions on Google Maps" })).toHaveAttribute("href", "https://maps.app.goo.gl/uHHDWyV2Fk9UeRKv8");
  await expect(page.getByTitle("Grand Sapphire Resorts Location")).toHaveAttribute("src", /q=9\.8404195%2C77\.0652606/);
  for (const link of await page.locator('a[aria-label^="Reserve "]').all()) {
    await expect(link).toHaveAttribute("href", "https://www.booking.com/hotel/in/grandsaphireresorts.html");
  }
});
