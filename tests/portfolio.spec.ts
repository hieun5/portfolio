import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("loads the profile and studyAI project without browser errors", async (
  { page },
  testInfo,
) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("Hieu Nguyen — Software & AI/ML Engineering");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hieu Nguyen.",
  );
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
  await expect(page.getByRole("banner")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "About me", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Projects coming soon.")).toHaveCount(0);
  const project = page.locator(".project-card");
  await expect(project).toHaveCount(1);
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
    .toBe(1600);
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

test("the sky journey reaches About me, contact links, and projects", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("link", { name: "Scroll to explore" }).click();
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
  await expect(page.locator(".sky-scene")).toHaveAttribute("data-motion", "off");
  await expect(page.locator("#work")).toHaveCSS("opacity", "1");
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
