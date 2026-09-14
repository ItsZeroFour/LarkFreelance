/**
 * Ужимает скриншоты портфолио до разумного размера и переводит всё в WebP.
 *
 * Цель - отдавать картинки статикой (без рантайм-оптимизации Next), чтобы они
 * грузились мгновенно на слабом VPS. Ландшафтные кадры режем до 1280px по
 * ширине, вертикальные (телефоны) - до 720px, качество WebP 80. PNG после
 * конвертации в WebP удаляются.
 *
 * Оригиналы лежат в git - откатить можно `git checkout public/portfolio`.
 * После запуска обязательно: `node scripts/gen-image-sizes.cjs`.
 *
 * Запуск: node scripts/optimize-portfolio.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "public", "portfolio");
const LANDSCAPE_W = 1280;
const PORTRAIT_W = 720;
const QUALITY = 80;

async function processFile(dir, file) {
  const abs = path.join(dir, file);
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) return null;

  const input = fs.readFileSync(abs);
  const meta = await sharp(input).metadata();
  const landscape = (meta.width ?? 0) >= (meta.height ?? 0);
  const targetW = landscape ? LANDSCAPE_W : PORTRAIT_W;

  const out = await sharp(input)
    .resize({ width: targetW, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();

  const webpPath = abs.replace(/\.(png|jpe?g|webp)$/i, ".webp");
  fs.writeFileSync(webpPath, out);
  if (webpPath !== abs) fs.unlinkSync(abs); // убрать исходный PNG/JPG

  return { from: input.length, to: out.length, file: path.basename(webpPath) };
}

(async () => {
  let before = 0;
  let after = 0;
  for (const d of fs.readdirSync(ROOT).sort()) {
    const dir = path.join(ROOT, d);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir).sort()) {
      const r = await processFile(dir, f);
      if (!r) continue;
      before += r.from;
      after += r.to;
      console.log(
        `${d}/${f} -> ${d}/${r.file}  ${(r.from / 1024) | 0}KB -> ${(r.to / 1024) | 0}KB`,
      );
    }
  }
  console.log(
    `\nИтого: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`,
  );
})();
