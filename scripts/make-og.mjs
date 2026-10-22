// Builds the 1200x630 social share image (public/og.png) from the logo and the
// lead product shot. Runs before every build.
import { readFile } from "node:fs/promises";
import sharp from "sharp";

const W = 1200;
const H = 630;
const logo = await readFile("public/brand/zoomlion-logo.svg");
const machine = await sharp("public/machines/zth3513-telehandler.webp").resize({ height: 470 }).png().toBuffer();

const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#333640"/>
  <polygon points="760,0 ${W},0 ${W},${H} 620,${H}" fill="#a4ce4e"/>
  <rect y="${H - 14}" width="${W}" height="14" fill="#a4ce4e"/>
  <text x="70" y="300" font-family="Arial Narrow, Arial, sans-serif" font-weight="800" font-size="76" fill="#ffffff">ZOOMLION</text>
  <text x="70" y="380" font-family="Arial Narrow, Arial, sans-serif" font-weight="800" font-size="76" fill="#a4ce4e">IRELAND</text>
  <text x="70" y="450" font-family="Arial, sans-serif" font-size="28" fill="#d6d8dc">Telehandlers · Aerial platforms · Machinery</text>
  <text x="70" y="540" font-family="Arial, sans-serif" font-size="24" fill="#a9adb5">Authorised distributor: O'Regan Plant Sales, Co. Cork</text>
</svg>`);

await sharp(bg)
  .composite([
    { input: await sharp(logo).resize({ width: 270 }).png().toBuffer(), left: 70, top: 70 },
    { input: machine, left: 720, top: 90 },
  ])
  .png()
  .toFile("public/og.png");
console.log("image: public/og.png");
