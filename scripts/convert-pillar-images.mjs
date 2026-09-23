import { readdir } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const imageDir = resolve(projectRoot, "public", "images", "illustrations", "pillars");
const files = (await readdir(imageDir)).filter((file) => extname(file).toLowerCase() === ".png");

for (const file of files) {
  const source = join(imageDir, file);
  const destination = join(imageDir, file.replace(/\.png$/i, ".webp"));
  await sharp(source).webp({ quality: 86, effort: 6 }).toFile(destination);
}

console.log(`Converted ${files.length} pillar illustrations to WebP.`);
