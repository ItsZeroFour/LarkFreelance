/**
 * Генерирует крошечные размытые превью (LQIP) для скриншотов портфолио.
 *
 * Для каждого файла в /public/portfolio делаем WebP шириной 16px и кодируем
 * в base64 data URL. Их подставляем в <Image placeholder="blur">, чтобы
 * картинка появлялась мгновенно (размытая) и плавно проявлялась при загрузке -
 * страница ощущается быстрой даже на медленной сети.
 *
 * Запуск: node scripts/gen-blur.cjs   (перезапускать после изменения картинок)
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "public", "portfolio");

(async () => {
  const entries = [];
  for (const d of fs.readdirSync(ROOT).sort()) {
    const dir = path.join(ROOT, d);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir).sort()) {
      if (!/\.(webp|png|jpe?g)$/i.test(f)) continue;
      const buf = await sharp(path.join(dir, f))
        .resize({ width: 16 })
        .webp({ quality: 40 })
        .toBuffer();
      const url = `data:image/webp;base64,${buf.toString("base64")}`;
      entries.push([`/portfolio/${d}/${f}`, url]);
    }
  }

  let out =
    "/**\n" +
    " * Крошечные размытые превью (LQIP) для скриншотов портфолио.\n" +
    " * Сгенерировано из /public/portfolio. Перегенерировать:\n" +
    " *   node scripts/gen-blur.cjs\n" +
    " */\n" +
    "export const blurData: Record<string, string> = {\n";
  for (const [p, url] of entries) out += `  "${p}": "${url}",\n`;
  out +=
    "};\n\n" +
    "/** Blur-заглушка для пути; undefined - если превью нет. */\n" +
    "export function getBlur(src: string): string | undefined {\n" +
    "  return blurData[src];\n" +
    "}\n";

  fs.writeFileSync(path.join(__dirname, "..", "src", "data", "blurData.ts"), out);
  console.log(`wrote src/data/blurData.ts with ${entries.length} previews`);
})();
