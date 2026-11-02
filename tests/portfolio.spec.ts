import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("loads the profile and project cards without browser errors", async (
  { page },
  testInfo,
) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("Hieu Nguyen — Software & AI/ML Engineering");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "HIEU NGUYEN...",
  );
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("HIEU NGUYEN...");
  await expect(page.locator("body")).toHaveCSS("font-family", /Inter Variable/);
  await expect(page.getByRole("banner")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "About me", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Projects coming soon.")).toHaveCount(0);
  await expect(page.locator(".project-card")).toHaveCount(4);
  const project = page.getByRole("article", { name: "studyAI", exact: true });
  await expect(project.getByRole("heading", { name: "studyAI" })).toBeVisible();
  const github = project.getByRole("link", { name: "View studyAI on GitHub" });
  await expect(github).toHaveAttribute(
    "href",
    "https://github.com/hieun5/studyAI",
  );
  const screenshot = project.getByRole("img");
  await screenshot.scrollIntoViewIfNeeded();
  await expect(screenshot).toBeVisible();
  await expect
    .poll(() => screenshot.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  await expect.poll(() => screenshot.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(/-(480|960)\.webp$/);
  await expect(page.locator("#work")).toHaveCSS("opacity", "1");
  if (testInfo.project.name === "desktop") {
    await page.mouse.move(0, 0);
    await expect(github).toHaveCSS("opacity", "0");
    await project.hover();
    await expect(github).toHaveCSS("opacity", "1");
    await page.mouse.move(0, 0);
    await expect(github).toHaveCSS("opacity", "0");
    await github.focus();
    await expect(github).toHaveCSS("opacity", "1");
  } else {
    await expect(github).toHaveCSS("opacity", "1");
  }
  await expect(
    project.getByRole("list", { name: "studyAI technologies" }),
  ).toContainText("Ollama");
  for (const [name, url] of [
    ["lolProPredictor", "https://github.com/hieun5/lolPredict"],
    ["Blockwise", "https://github.com/hieun5/blockwise"],
    ["Hieu’s Reviews", "https://github.com/hieun5/hieu-sreviews"],
  ]) {
    const card = page.getByRole("article", { name, exact: true });
    await expect(card.getByRole("link", { name: `View ${name} on GitHub` })).toHaveAttribute("href", url);
    const preview = card.getByRole("img");
    await preview.scrollIntoViewIfNeeded();
    await expect.poll(() => preview.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect.poll(() => preview.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(/-(480|960)\.webp$/);
  }
  await expect(
    page.getByRole("heading", { name: "Technical Skills", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Get in touch", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("contentinfo"),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "GitHub", exact: true }),
  ).toHaveAttribute("href", "https://github.com/hieun5");
  expect(errors).toEqual([]);
});

test("navigation reaches About me, contact links, and projects", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("link", { name: "Scroll to About me", exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.getByRole("heading", { name: "About me", exact: true })).toBeInViewport();
  const contacts = page.getByRole("navigation", { name: "Contact links" });
  await expect(contacts.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute("href", "https://github.com/hieun5");
  await expect(contacts.getByRole("link", { name: "LinkedIn", exact: true })).toHaveAttribute("href", "https://www.linkedin.com/in/h1eunguyen/");
  await expect(
    contacts.getByRole("link", { name: "Email", exact: true }),
  ).toHaveAttribute(
    "href",
    "https://mail.google.com/mail/?view=cm&fs=1&to=hieunguy141%40gmail.com",
  );
  await contacts.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(
    page.getByRole("heading", { name: "Projects", exact: true }),
  ).toBeInViewport();
  await expect(page.locator("#work")).toHaveCSS("opacity", "1");
});

test("name dots delete and retype without layout shifts and respect reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const dots = page.locator(".typing-dots");
  await expect(dots).toHaveCSS("animation-name", "type-dots");
  const states = await dots.evaluate(async element => {
    const animation = element.getAnimations()[0];
    await animation.ready;
    animation.pause();
    const result = [];
    for (const time of [0, 2280, 3780]) {
      animation.currentTime = time;
      result.push({ clip: getComputedStyle(element).clipPath, width: element.getBoundingClientRect().width });
    }
    return result;
  });
  expect(states[0].clip).not.toBe(states[1].clip);
  expect(states[0].clip).toBe(states[2].clip);
  expect(states[0].width).toBe(states[1].width);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(dots).toHaveCSS("animation-name", "none");
  await expect(dots).toHaveCSS("clip-path", "inset(0px)");
});

test("has no serious accessibility violations or narrow-screen overflow", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        ),
      )
      .toBeLessThanOrEqual(1);
  }
});
