# Hieu Nguyen — Portfolio

A minimal, dark portfolio for software engineering and AI/ML. Built with React, TypeScript, and Vite, with self-hosted fonts, keyboard-accessible navigation, and reduced-motion support. The page has a brief introduction, a projects area, and contact links in the footer.

## Development

Requires Node.js 22.12+ (the cloud environment has Node.js 24).

```sh
npm ci
npm run dev
```

The development server uses port 5173. `npm run build` performs TypeScript checks and creates the deployable `dist/` directory. `npm run preview` serves that production build.

In the cloud workspace, use a writable npm cache:

```sh
cd /workspace/portfolio
export NPM_CONFIG_CACHE=/workspace/.cache/npm
npm ci
npm run dev -- --port 5173 --strictPort
```

## Personalize

Edit `src/content.ts` to update the name, role, short introduction, GitHub profile, and optional public contact email. Without an email, the contact link opens GitHub and the copy button copies the profile link. No email provider, API key, or backend is required.

The projects array is intentionally empty. The page displays a short placeholder until you add real projects. Each project supports:

```ts
{
  id: 'your-project',
  title: 'Project name',
  subtitle: 'A short description',
  category: 'Software engineering', // or 'AI / ML'
  tags: ['React', 'Python'],
  description: 'What you built and why.',
  intention: 'Your approach to the problem.',
  details: ['A meaningful feature or outcome'],
  image: '/projects/your-project.webp', // optional; put the file in public/projects/
  url: 'https://example.com', // optional
}
```

Real projects render as simple rows with expandable case studies. Update the page title and description in `index.html` if you change the profile identity. Colors, spacing, and breakpoints are in `src/styles.css`.

## Browser checks

```sh
npm test
```

The tests exercise desktop and mobile rendering, navigation, the clipboard interaction, accessibility, and layout down to 320 pixels. They use system Chromium when available. Elsewhere, install Chromium with `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing executable.

## Deployment

Run `npm run build` and deploy `dist/` to any static host. The site has no required runtime environment variables and makes no third-party font requests.

### GitHub Pages

The repository contains source code; pushing to `main` alone does not make a website public. A separate `gh-pages` branch contains the production build with asset paths configured for `/portfolio/`.

To enable the website, open [the repository's Pages settings](https://github.com/hieun5/portfolio/settings/pages) and select **Deploy from a branch**, **gh-pages**, and **/ (root)**, then click **Save**. GitHub will display the live URL after deployment completes. Its standard address is `https://hieun5.github.io/portfolio/`; a successful branch push alone does not establish that the website is live.

After changing the site, publish a fresh build with:

```sh
npm run deploy:pages
```

This command builds for the repository subpath, uses your existing Git credentials, preserves any custom-domain `CNAME`, and pushes to `gh-pages` without force-pushing. It leaves the source checkout on its current branch. Configured Pages hosting rebuilds after the branch updates.
