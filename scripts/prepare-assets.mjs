// Run npm run prepare:assets after changing the cloud SVG or original project PNGs.
// Generated images are committed; visitors and production builds do no conversion.
import { chromium } from "@playwright/test";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });

try {
  const page = await browser.newPage();

  async function convert(source, width, destination, quality) {
    const result = await page.evaluate(async ({ source, width, quality }) => {
      const image = new Image();
      image.src = source;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = Math.round(width * image.naturalHeight / image.naturalWidth);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is unavailable.");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const encoded = canvas.toDataURL("image/webp", quality);
      if (!encoded.startsWith("data:image/webp;base64,")) {
        throw new Error("This browser cannot encode WebP images.");
      }
      return encoded.split(",")[1];
    }, { source, width, quality });
    const bytes = Buffer.from(result, "base64");
    await writeFile(destination, bytes);
    console.log(`${destination.slice(root.length + 1)}: ${bytes.length} bytes`);
  }

  const cloudFolder = join(root, "src/assets/sky");
  await mkdir(cloudFolder, { recursive: true });
  const cloudSource = (await readFile(join(root, "scripts/assets/cloud.svg"), "utf8"))
    .replace("<svg ", '<svg width="1600" height="640" ');
  for (const seed of [3, 5, 11, 19]) {
    const svg = cloudSource.replace(/seed="\d+"/, `seed="${seed}"`);
    await convert(`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
      800, join(cloudFolder, `cloud-${seed}.webp`), 0.86);
  }

  const projectFolder = join(root, "public/projects");
  for (const filename of (await readdir(projectFolder)).filter(name => name.endsWith(".png"))) {
    const source = `data:image/png;base64,${(await readFile(join(projectFolder, filename))).toString("base64")}`;
    for (const width of [480, 960]) {
      await convert(source, width,
        join(projectFolder, filename.replace(/\.png$/, `-${width}.webp`)), 0.88);
    }
  }
} finally {
  await browser.close();
}
