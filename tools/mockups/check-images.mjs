/* Поиск битых картинок на страницах макетов.

   node tools/mockups/check-images.mjs [url…]

   Без аргументов — все доступные лендинги и галерея картинок на сервере архива (4320).
   Страница прокручивается до конца, ленивые картинки грузятся сразу; печатает
   адреса картинок, которые не загрузились (img и background-image). */
import { withBrowser, SCROLL_SCRIPT } from './snapshot.mjs';
import { readdirSync } from 'node:fs';

const base = 'http://localhost:4320/';
const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      ...readdirSync('apps/mockups/public/legacy')
        .filter((d) => /^landing-\d+$/.test(d))
        .map((d) => `${base}${d}/`),
      `${base}images/`,
    ];

const broken = new Map();
await withBrowser(async (page) => {
  for (const url of urls) {
    await page.goto(url, 3000);
    await page.eval(SCROLL_SCRIPT);
    const bad = await page.eval(`(async () => {
      for (const i of document.images) i.loading = 'eager';
      const test = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i.naturalWidth > 0); i.onerror = () => res(false); i.src = src; setTimeout(() => res(false), 15000); });
      const srcs = new Set([...document.images].map((i) => i.currentSrc || i.src).filter(Boolean));
      for (const el of document.querySelectorAll('*')) {
        const bg = getComputedStyle(el).backgroundImage;
        for (const m of bg.matchAll(/url\\("?([^")]+)"?\\)/g)) if (!m[1].startsWith('data:')) srcs.add(m[1]);
      }
      const out = [];
      await Promise.all([...srcs].map(async (s) => (await test(s)) || out.push(s)));
      return out;
    })()`);
    for (const src of bad) broken.set(src, [...(broken.get(src) ?? []), url.replace(base, '')]);
    console.log(`${bad.length ? '✗' : '✓'} ${url.replace(base, '')}: битых ${bad.length}`);
  }
});
for (const [src, pages] of broken) console.log(`  ${src}  ←  ${pages.join(', ')}`);
process.exitCode = broken.size ? 1 : 0;
