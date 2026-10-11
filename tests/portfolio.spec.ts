import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("loads the profile without browser errors and leaves projects for later", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("Hieu Nguyen — Software & AI/ML Engineering");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hieu Nguyen.",
  );
  await expect(
    page.getByText("Software engineering & AI / ML", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Projects coming soon.")).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Find me on GitHub", exact: false }).first(),
  ).toHaveAttribute("href", "https://github.com/hieun5");
  expect(errors).toEqual([]);
});

test("navigation links work on desktop and mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Projects", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByRole("heading", { name: "Get in touch" }),
  ).toBeInViewport();
  await page.getByRole("link", { name: "Back to top" }).click();
  await expect(page).toHaveURL(/#home$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
});

test("contact button copies the actual GitHub link", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy GitHub link" }).click();
  await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "https://github.com/hieun5",
  );
  await expect(page.getByRole("status")).toHaveText(
    "Contact link copied to clipboard.",
  );
});

test("has no serious accessibility violations or narrow-screen overflow", async ({
  page,
}) => {
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
