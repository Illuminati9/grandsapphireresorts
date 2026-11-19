import { expect, test } from "@playwright/test";
import en from "../src/i18n/en.json" with { type: "json" };
import ml from "../src/i18n/ml.json" with { type: "json" };

test("Malayalam messages cover every English key and preserve substitutions", () => {
  expect(Object.keys(ml).sort()).toEqual(Object.keys(en).sort());
  for (const key of Object.keys(en) as (keyof typeof en)[]) {
    expect(ml[key], key).toMatch(/[\u0D00-\u0D7F]/);
    expect(ml[key].match(/\{\w+\}/g)?.sort() ?? [], key).toEqual(en[key].match(/\{\w+\}/g)?.sort() ?? []);
  }
});

for (const width of [320, 375, 768, 1024, 1279, 1280, 1440]) {
  test(`Malayalam layout fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ml");
    await expect(page.locator("html")).toHaveAttribute("lang", "ml");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (width >= 1280) {
      const booking = page.getByRole("navigation", { name: ml["Main navigation"], exact: true }).getByRole("link", { name: ml["Book Now"], exact: true });
      await expect(booking).toBeVisible();
      const bounds = (await booking.boundingBox())!;
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    }
    const region = page.getByRole("region", { name: ml["Guest testimonials carousel"], exact: true });
    await region.scrollIntoViewIfNeeded();
    for (let number = 1; number <= 5; number++) {
      await region.getByRole("button", { name: ml["Show testimonial {number}"].replace("{number}", String(number)), exact: true }).click();
      const card = (await region.getByRole("button", { name: /.+/, exact: false }).filter({ has: page.locator("[id$='-quote']") }).boundingBox())!;
      const stage = (await region.boundingBox())!;
      const controls = (await region.getByRole("button", { name: ml["Next testimonial"], exact: true }).boundingBox())!;
      expect(card.y).toBeGreaterThanOrEqual(stage.y);
      expect(card.y + card.height).toBeLessThanOrEqual(controls.y);
    }
  });
}

test("desktop language links navigate to localized URLs and survive reload", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("link", { name: "Switch to Malayalam", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ml");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("തങ്കമണി, ഇടുക്കിയിലെ ഗ്രാൻഡ് സഫയർ റിസോർട്ട്സ്");
  await expect(page.getByRole("heading", { name: "താമസസൗകര്യങ്ങൾ", exact: true })).toBeAttached();
  await expect(page.getByRole("heading", { name: "റിസോർട്ട് സൗകര്യങ്ങൾ", exact: true })).toBeAttached();
  await expect(page.getByRole("heading", { name: "ഞങ്ങളെ സന്ദർശിക്കൂ", exact: true })).toBeAttached();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ml");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("തങ്കമണി, ഇടുക്കിയിലെ ഗ്രാൻഡ് സഫയർ റിസോർട്ട്സ്");
  await page.getByRole("link", { name: "ഇംഗ്ലീഷിലേക്ക് മാറുക", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Grand Sapphire Resorts in Thankamony, Idukki");
});

test("mobile language links navigate to the translated page", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Switch to Malayalam", exact: true }).click();
  await expect(page).toHaveURL(/\/ml$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: ml["Open menu"], exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ml");
  await expect(page.getByRole("dialog").getByRole("link", { name: "വില്ലകൾ", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("തങ്കമണി, ഇടുക്കിയിലെ ഗ്രാൻഡ് സഫയർ റിസോർട്ട്സ്");
});

test("gallery is keyboard operable and its modal restores focus on Escape", async ({ page }) => {
  await page.goto("/");
  const image = page.getByRole("button", { name: "View image: Grand Sapphire Resorts - Cozy bedroom suite", exact: true });
  await image.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Resort image viewer" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close image viewer" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(image).toBeFocused();
});

test("footer has no placeholder links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('footer a[href="#"], footer a:not([href])')).toHaveCount(0);
  for (const href of await page.locator('footer a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")))) {
    await expect(page.locator(href!)).toHaveCount(1);
  }
});

test("dark OS preference does not create light text on the ivory background", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const colors = await page.locator("body").evaluate(body => ({ color: getComputedStyle(body).color, background: getComputedStyle(body).backgroundColor }));
  expect(colors).toEqual({ color: "rgb(28, 28, 23)", background: "rgb(248, 245, 236)" });
});

test("guest stories provide an explicit autoplay pause control", async ({ page }) => {
  await page.goto("/");
  const pause = page.getByRole("button", { name: "Pause guest stories", exact: true });
  await pause.click();
  await expect(page.getByRole("button", { name: "Play guest stories", exact: true })).toBeVisible();
});

test("language switching still works when preference storage is blocked", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException("Storage disabled", "SecurityError"); };
  });
  await page.goto("/");
  await page.getByRole("link", { name: "Switch to Malayalam", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ml");
  await page.getByRole("link", { name: ml["Switch to English"], exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("each tab keeps the language selected by its URL", async ({ page, context }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const other = await context.newPage();
  await other.goto("/");
  await page.getByRole("link", { name: "Switch to Malayalam", exact: true }).click();
  await expect(page).toHaveURL(/\/ml$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ml");
  await expect(other.locator("html")).toHaveAttribute("lang", "en");
  await other.goto("/ml");
  await expect(other.locator("html")).toHaveAttribute("lang", "ml");
  await page.getByRole("link", { name: ml["Switch to English"], exact: true }).click();
  await expect(other.locator("html")).toHaveAttribute("lang", "ml");
  await other.close();
});

test("gallery navigation covers every image and motion changes preserve the selected slide", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const gallery = page.getByRole("region", { name: "Resort gallery", exact: true });
  await expect(gallery.getByRole("button", { name: "Previous image", exact: true })).toBeDisabled();
  for (let number = 2; number <= 6; number++) {
    await gallery.getByRole("button", { name: "Next image", exact: true }).click();
    await expect(gallery.getByRole("button", { name: `Go to slide ${number}`, exact: true })).toHaveAttribute("aria-current", "true");
  }
  await expect(gallery.getByRole("button", { name: "Next image", exact: true })).toBeDisabled();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(gallery.getByRole("button", { name: "Go to slide 6", exact: true })).toHaveAttribute("aria-current", "true");
  await gallery.getByRole("button", { name: "Go to slide 2", exact: true }).click();
  await expect(gallery.getByRole("heading", { name: "Grand Sapphire Resorts - Outdoor hangout area", exact: true })).toBeVisible();
});

test("failed remote photos use local images and guest initials", async ({ page }) => {
  await page.route("https://lh3.googleusercontent.com/**", route => route.abort());
  await page.route("https://images.unsplash.com/**", route => route.abort());
  await page.goto("/");
  const heroImage = page.getByRole("img", { name: "Grand Sapphire Resort at twilight", exact: true });
  await expect(heroImage).toHaveJSProperty("complete", true);
  await expect.poll(() => heroImage.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(await heroImage.getAttribute("src")).toContain("hangout_area_outside.jpeg");
  await page.locator("#testimonials").scrollIntoViewIfNeeded();
  await expect(page.getByTestId("guest-avatar-fallback")).toHaveCount(5);
});

test("reduced motion disables automatic stories and booking shine while keeping text visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Pause guest stories", exact: true })).toHaveCount(0);
  await expect(page.locator("[data-booking-shine]")).toHaveCount(0);
  const text = page.locator("#hero a span").first();
  await expect(text).toHaveText("Book Your Stay");
  await expect(text).toHaveCSS("mask-image", "none");
});

for (const touch of [true, false]) {
  test(`narrow ${touch ? "touch" : "pointer"} devices avoid initializing decorative WebGL`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: touch, hasTouch: touch });
    const page = await context.newPage();
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { value: function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
        if (this.id === "hero-shader-canvas" && type.includes("webgl")) this.dataset.webglRequested = "true";
        return Reflect.apply(original, this, [type, ...args]);
      } });
    });
    await page.goto("http://127.0.0.1:3100/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("#hero-shader-canvas")).not.toHaveAttribute("data-webgl-requested", "true");
    await expect(page.locator("#hero img")).toHaveAttribute("fetchpriority", "high");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await context.close();
  });
}

test("brand lettering loads a compact web font", async ({ page, request }) => {
  const fonts: string[] = [];
  page.on("request", item => { if (new URL(item.url()).pathname.startsWith("/font/")) fonts.push(item.url()); });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(fonts.length).toBeGreaterThan(0);
  for (const url of fonts) {
    expect(new URL(url).pathname).toMatch(/\.woff2$/);
    const font = await request.get(url);
    expect(font.ok()).toBe(true);
    expect((await font.body()).length).toBeLessThan(50_000);
  }
});

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  for (const locale of ["en", "ml"] as const) {
    test(`${locale} URL hydrates without errors despite conflicting storage with motion ${reducedMotion}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => { if (message.type() === "error" && /hydration|server rendered|react error/i.test(message.text())) errors.push(message.text()); });
      await page.emulateMedia({ reducedMotion });
      await page.addInitScript(language => localStorage.setItem("grand-sapphire-language", language), locale === "en" ? "ml" : "en");
      await page.goto(locale === "ml" ? "/ml" : "/");
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(locale === "ml" ? "തങ്കമണി, ഇടുക്കിയിലെ ഗ്രാൻഡ് സഫയർ റിസോർട്ട്സ്" : "Grand Sapphire Resorts in Thankamony, Idukki");
      await page.locator("footer").scrollIntoViewIfNeeded();
      expect(errors).toEqual([]);
    });
  }
}

test("phone users can reach the experience carousel controls and read full descriptions", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const next = page.getByRole("button", { name: "Next experience", exact: true });
  await expect(next).toBeVisible();
  await next.click();
  await expect.poll(() => page.locator("#experiences-carousel").evaluate(element => element.scrollLeft)).toBeGreaterThan(200);
  await page.getByRole("button", { name: "Previous experience", exact: true }).click();
  await expect.poll(() => page.locator("#experiences-carousel").evaluate(element => element.scrollLeft)).toBe(0);
  await expect(page.getByText("Savor local delicacies and international cuisine.", { exact: true })).toHaveCSS("opacity", "1");
});

test("pausing guest stories stops automatic changes and play resumes them", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause guest stories", exact: true }).click();
  const first = page.getByRole("button", { name: "Show testimonial 1", exact: true });
  await expect(first).toHaveAttribute("aria-current", "true");
  await page.clock.install();
  await page.clock.fastForward(6000);
  await expect(first).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Play guest stories", exact: true }).click();
  await page.clock.fastForward(6000);
  await expect(page.getByRole("button", { name: "Show testimonial 2", exact: true })).toHaveAttribute("aria-current", "true");
});

for (const locale of ["en", "ml"] as const) {
  for (const width of [375, 1440]) {
    test(`${locale} section links keep titles below the header at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(locale === "ml" ? "/ml" : "/");
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      for (const id of ["villas", "facilities", "experiences", "location"]) {
        if (width < 1280) await page.locator('header button[aria-controls="mobile-menu"]').click();
        const navigation = width < 1280 ? page.locator("#mobile-menu nav") : page.locator("header nav");
        await navigation.locator(`a[href="#${id}"]`).click();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect.poll(async () => (await page.locator(`#${id}`).boundingBox())!.y).toBeGreaterThanOrEqual(100);
        const title = (await page.locator(`#${id} h2`).boundingBox())!;
        const header = (await page.locator("header").boundingBox())!;
        expect(title.y).toBeGreaterThanOrEqual(header.y + header.height);
      }
    });
  }
}
