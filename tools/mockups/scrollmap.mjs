/* Карта зависимости стилей от прокрутки (параллакс, прозрачность шапки).

   node tools/mockups/scrollmap.mjs <url> <snapDir> [--samples 12]

   Нумерует узлы как snapshot.mjs, затем проходит страницу сверху вниз с шагом
   и на каждой позиции записывает инлайн transform и opacity всех узлов. Узел
   попадает в карту, если его значения меняются с прокруткой, но НЕ меняются,
   если стоять на месте (иначе это обычная анимация, а не параллакс).
   Пишет <snapDir>/scroll.json: { "<data-i>": [{ y, transform, opacity }, ...] }. */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { withBrowser, TAG_SCRIPT } from './snapshot.mjs';

const [url, snapDir, ...rest] = process.argv.slice(2);
if (!url || !snapDir) {
  console.error('usage: node tools/mockups/scrollmap.mjs <url> <snapDir> [--samples 12]');
  process.exit(1);
}
const si = rest.indexOf('--samples');
const SAMPLES = si >= 0 ? Number(rest[si + 1]) : 12;

const READ = `(() => {
  const out = {};
  for (const el of document.querySelectorAll('[data-i]')) {
    const s = el.style;
    if (s.transform || s.opacity) out[el.getAttribute('data-i')] = [s.transform || '', s.opacity || ''];
  }
  return out;
})()`;

await withBrowser(async (page) => {
  await page.goto(url, 4000);
  await page.eval(TAG_SCRIPT);
  const height = await page.eval('document.documentElement.scrollHeight - window.innerHeight');

  // Контроль «стоим на месте»: два замера без прокрутки с паузой.
  const still1 = await page.eval(READ);
  await page.eval('new Promise((r) => setTimeout(r, 1200))');
  const still2 = await page.eval(READ);
  const animated = new Set(Object.keys(still2).filter((id) => JSON.stringify(still1[id]) !== JSON.stringify(still2[id])));

  const samples = [];
  for (let k = 0; k < SAMPLES; k++) {
    const y = Math.round((height * k) / (SAMPLES - 1));
    await page.eval(`window.scrollTo(0, ${y})`);
    await page.eval('new Promise((r) => setTimeout(r, 250))');
    samples.push({ y, values: await page.eval(READ) });
  }

  const map = {};
  const ids = new Set(samples.flatMap((s) => Object.keys(s.values)));
  for (const id of ids) {
    if (animated.has(id)) continue;
    const series = samples.map((s) => ({ y: s.y, transform: s.values[id]?.[0] ?? '', opacity: s.values[id]?.[1] ?? '' }));
    const distinct = new Set(series.map((s) => s.transform + '|' + s.opacity));
    if (distinct.size > 2) map[id] = series;
  }
  writeFileSync(path.join(snapDir, 'scroll.json'), JSON.stringify(map, null, 2));
  console.log(`scrollmap ${url}: зависят от прокрутки ${Object.keys(map).length} узлов (анимированных на месте ${animated.size})`);
});
