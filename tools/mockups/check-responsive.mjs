/* Проверка адаптива лендингов: нет горизонтальной прокрутки и ничего не вылезает за край.

   node tools/mockups/check-responsive.mjs [ширины через запятую] [url…]

   По умолчанию все доступные legacy/landing-N на 320, 375 и 768px. Для каждой ширины
   печатает scrollWidth страницы и до 8 самых широких элементов, выходящих за окно
   (без учёта скрытых через overflow предков и position:fixed вне экрана). */
import { readdirSync } from 'node:fs';
import { withBrowser, SCROLL_SCRIPT } from './snapshot.mjs';

const base = 'http://localhost:4320/';
const [w, ...rest] = process.argv.slice(2);
const widths = (w && /^[\d,]+$/.test(w) ? w : '320,375,768').split(',').map(Number);
const urls = (w && !/^[\d,]+$/.test(w) ? [w, ...rest] : rest).length
  ? (w && !/^[\d,]+$/.test(w) ? [w, ...rest] : rest)
  : readdirSync('apps/mockups/public/legacy')
      .filter((d) => /^landing-\d+$/.test(d))
      .sort((a, b) => Number(a.slice(8)) - Number(b.slice(8)))
      .map((d) => `${base}${d}/`);

let failed = 0;
await withBrowser(async (page) => {
  for (const url of urls) {
    for (const width of widths) {
      await page.send('Emulation.setDeviceMetricsOverride', { width, height: 800, deviceScaleFactor: 1, mobile: width < 768 });
      await page.goto(url, 2500);
      await page.eval(SCROLL_SCRIPT);
      const r = await page.eval(`(() => {
        const W = document.documentElement.clientWidth;
        const clipped = (el) => {
          for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
            const c = getComputedStyle(p);
            // Внутри fixed-блока (скрытые копии для PDF и т. п.) прокрутку страницы не создаёт.
            if (c.position === 'fixed') return true;
            if (/(hidden|clip|auto|scroll)/.test(c.overflowX)) { const r = p.getBoundingClientRect(); if (r.right <= W + 1 && r.left >= -1) return true; }
          }
          return false;
        };
        const out = [];
        for (const el of document.body.querySelectorAll('*')) {
          const c = getComputedStyle(el);
          if (c.display === 'none' || c.visibility === 'hidden' || c.position === 'fixed') continue;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          if ((r.right > W + 1 || r.left < -1) && !clipped(el)) {
            out.push({ over: Math.round(Math.max(r.right - W, -r.left)), w: Math.round(r.width), tag: el.tagName.toLowerCase(), text: (el.innerText || el.getAttribute('alt') || '').trim().slice(0, 40), cls: String(el.className).slice(0, 90) });
          }
        }
        // только «корневые» нарушители: убрать тех, чей родитель уже в списке по той же причине
        out.sort((a, b) => b.over - a.over);
        return { scroll: document.documentElement.scrollWidth, W, bad: out.slice(0, 8), total: out.length };
      })()`);
      const ok = r.scroll <= r.W + 1 && r.total === 0;
      if (!ok) failed++;
      console.log(`${ok ? '✓' : '✗'} ${url.replace(base, '')} ${width}px: scrollWidth ${r.scroll}, вылезает ${r.total}`);
      for (const b of r.bad) console.log(`    +${b.over}px ${b.tag} w=${b.w} «${b.text}» ${b.cls}`);
    }
  }
});
console.log(failed ? `не прошло: ${failed}` : 'все ширины в порядке');
process.exitCode = failed ? 1 : 0;
