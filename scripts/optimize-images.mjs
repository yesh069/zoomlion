// Turns the cut-out PNG/JPG product shots in assets/machines/ into trimmed WebP
// copies in public/machines/, skipping ones already up to date. Runs before
// every build.
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/machines";
const OUT = "public/machines";

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const src = path.join(SRC, file);
  const out = path.join(OUT, file.replace(/\.\w+$/, ".webp"));
  const outTime = await stat(out).then((o) => o.mtimeMs).catch(() => 0);
  if (outTime >= (await stat(src)).mtimeMs) continue;
  await sharp(src).trim().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  console.log("image:", out);
}
