// Generates optimized images into /public. Run with `npm run assets` after
// adding or changing a file in assets/. Output is committed, so deploys do not
// depend on fonts or sharp being available on the build machine.
//
//   assets/projects/<slug>.(png|jpg|jpeg|webp|svg) -> public/projects/<slug>-{640,960,1280}.webp
//   brand mark + Open Graph image                   -> public/icon.svg, favicon.ico, apple-touch-icon.png, og.png
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'assets', 'projects');
const outDir = path.join(root, 'public', 'projects');
const WIDTHS = [640, 960, 1280];
const RATIO = 10 / 16;

await mkdir(outDir, { recursive: true });

// 1. Project covers
for (const file of await readdir(srcDir)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) continue;
  const slug = path.basename(file, ext);
  for (const w of WIDTHS) {
    const input = path.join(srcDir, file);
    const img = ext === '.svg' ? sharp(input, { density: 72 * (w / 1280) * 2 }) : sharp(input);
    await img
      .resize(w, Math.round(w * RATIO), { fit: 'cover', position: 'centre' })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(outDir, `${slug}-${w}.webp`));
  }
  console.log(`cover  ${slug}`);
}

// 2. Brand mark: a pixel "B" on the accent fill
const B = [
  '.XXXX.',
  '.X...X',
  '.X...X',
  '.XXXX.',
  '.X...X',
  '.X...X',
  '.XXXX.',
];
const cell = 3, ox = 9, oy = 5;
const pixels = B.flatMap((row, y) => [...row].map((c, x) => (c === 'X' ? `<rect x="${ox + (x - 1) * cell}" y="${oy + y * cell}" width="${cell}" height="${cell}"/>` : ''))).join('');
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#fd7300"/><g fill="#211d1b" shape-rendering="crispEdges">${pixels}</g></svg>`;
await writeFile(path.join(root, 'public', 'icon.svg'), iconSvg);
await sharp(Buffer.from(iconSvg), { density: 72 * 180 / 32 }).resize(180, 180).png().toFile(path.join(root, 'public', 'apple-touch-icon.png'));
const ico32 = await sharp(Buffer.from(iconSvg), { density: 72 }).resize(32, 32).png().toBuffer();
// ICO container holding one 32×32 PNG
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(ico32.length, 14); header.writeUInt32LE(22, 18);
await writeFile(path.join(root, 'public', 'favicon.ico'), Buffer.concat([header, ico32]));
console.log('brand  icon.svg, favicon.ico, apple-touch-icon.png');

// 3. Open Graph image (1200×630)
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" fill="#373330"/></pattern>
<style>.s{font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif}.m{font-family:Consolas,'Cascadia Mono',monospace}</style></defs>
<rect width="1200" height="630" fill="#110e0b"/><rect width="1200" height="630" fill="url(#p)" opacity=".7"/>
<g transform="translate(80 80)"><svg width="88" height="88" viewBox="0 0 32 32">${iconSvg.replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg></g>
<text class="m" x="80" y="300" font-size="30" fill="#f4b392" letter-spacing="4">GAME DEVELOPER · UNITY &amp; C#</text>
<text class="s" x="76" y="410" font-size="112" font-weight="700" fill="#f5efeb" letter-spacing="-2">Birkan Zan</text>
<text class="s" x="80" y="490" font-size="34" fill="#cfc9c5">Clean game systems and AI that adapts to how people play.</text>
<rect x="80" y="550" width="120" height="8" rx="4" fill="#fd7300"/>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9, palette: true }).toFile(path.join(root, 'public', 'og.png'));
console.log('og     og.png');
