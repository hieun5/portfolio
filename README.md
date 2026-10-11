# Hieu Nguyen — Portfolio

A responsive, dark portfolio for software engineering and AI/ML. Built with React, TypeScript, and Vite, with self-hosted fonts, custom SVG artwork, keyboard-accessible navigation, and reduced-motion support.

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

Edit `src/content.ts` to update the name, introduction, interests, GitHub profile, and optional public contact email. Without an email, the contact button opens GitHub and the copy button copies the profile link. No email provider, API key, or backend is required.

The projects array is intentionally empty. The page displays a designed coming-soon section until you add real projects. Each project supports:

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

Real projects automatically enable category filters and accessible case-study dialogs. Update the page title and description in `index.html` if you change the profile identity. Colors, spacing, and breakpoints are in `src/styles.css`.

## Browser checks

```sh
npm test
```

The tests exercise desktop and mobile rendering, navigation, the clipboard interaction, accessibility, and layout down to 320 pixels. They use system Chromium when available. Elsewhere, install Chromium with `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing executable.

## Deployment

Run `npm run build` and deploy `dist/` to any static host. The site has no required runtime environment variables and makes no third-party font requests. It assumes hosting at the domain root; configure Vite's `base` if deploying under a subpath.
