#!/usr/bin/env node
// One-shot favicon generator.
// Rasterizes assets/branding/logo-small.svg into all the PNG sizes
// (and a multi-resolution favicon.ico) that Safari, iOS, Android and
// Google Search expect. The orange "R" mark is centered on a transparent
// square canvas (fit: contain) so it visually matches the source SVG.
//
// Run:
//   npx --yes -p sharp@0.33 -p png-to-ico@2 node scripts/generate-favicons.mjs
//
// Output:
//   /favicon.ico                                (16+32+48 multi-res)
//   /assets/branding/favicon-16.png
//   /assets/branding/favicon-32.png
//   /assets/branding/favicon-48.png
//   /assets/branding/favicon-96.png
//   /assets/branding/favicon-192.png
//   /assets/branding/favicon-512.png
//   /assets/branding/apple-touch-icon.png       (180x180)

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const srcPath = resolve(root, "assets/branding/logo-small.svg");
const brandDir = resolve(root, "assets/branding");
const icoPath = resolve(root, "favicon.ico");

await mkdir(brandDir, { recursive: true });
const src = await readFile(srcPath);

const outFor = (size) =>
    size === 180
        ? resolve(brandDir, "apple-touch-icon.png")
        : resolve(brandDir, `favicon-${size}.png`);

const sizes = [16, 32, 48, 96, 180, 192, 512];

for (const size of sizes) {
    const out = outFor(size);
    // density: 384 gives sharp enough rasterization headroom for
    // small viewBox SVGs (logo-small.svg is ~37x42 user units).
    await sharp(src, { density: 384 })
        .resize(size, size, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png({ compressionLevel: 9 })
        .toFile(out);
    console.log(`generated ${out}`);
}

const icoBuffer = await pngToIco([
    outFor(16),
    outFor(32),
    outFor(48),
]);
await writeFile(icoPath, icoBuffer);
console.log(`generated ${icoPath}`);
