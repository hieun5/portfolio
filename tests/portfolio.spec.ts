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
    page.getByRole("link", { name: "GitHub", exact: true }),
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

test("contact links provide email and phone and copy the email address", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(
    contact.getByRole("link", { name: "hieunguy141@gmail.com" }),
  ).toHaveAttribute("href", "mailto:hieunguy141@gmail.com");
  await expect(
    contact.getByRole("link", { name: "971 407 0001" }),
  ).toHaveAttribute("href", "tel:9714070001");
  await expect(contact.getByRole("link", { name: /github/i })).toHaveCount(0);
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "hieunguy141@gmail.com",
  );
  await expect(page.getByRole("status")).toHaveText(
    "Email address copied to clipboard.",
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
