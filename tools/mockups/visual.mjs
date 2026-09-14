/* Попиксельное сравнение оригинала и перевода.

   node tools/mockups/visual.mjs <originalUrl> <tailwindUrl> <outDir> [--steps 8] [--width 1440] [--height 900]

   Обе страницы прокручиваются до конца (все появления сработали) и обратно,
   затем на одинаковых позициях прокрутки снимаются скриншоты экрана. Сравнение
   идёт в самом браузере через canvas: пиксель считается разным, если отличие
   по любому каналу больше 24 из 255 (сглаживание шрифтов и JPEG-шум не в счёт).
   Пишет в outDir склейки «оригинал | перевод | разница» (разница — красным)
   и report.json с долей отличий на каждой позиции. */
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { withBrowser, SCROLL_SCRIPT } from './snapshot.mjs';

const [origUrl, twUrl, outDir, ...rest] = process.argv.slice(2);
if (!origUrl || !twUrl || !outDir) {
  console.error('usage: node tools/mockups/visual.mjs <originalUrl> <tailwindUrl> <outDir> [--steps 8]');
  process.exit(1);
}
const opt = (name, def) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? Number(rest[i + 1]) : def;
};
const STEPS = opt('steps', 8);
mkdirSync(outDir, { recursive: true });

const shoot = async (page, url) => {
  await page.goto(url, 3000);
  const height = await page.eval(SCROLL_SCRIPT);
  await page.eval('window.scrollTo(0, 0)');
  await page.eval('new Promise((r) => setTimeout(r, 1500))');
  const viewport = await page.eval('window.innerHeight');
  const positions = Array.from({ length: STEPS }, (_, k) => Math.round(((height - viewport) * k) / Math.max(STEPS - 1, 1)));
  const shots = [];
  for (const y of positions) {
    await page.eval(`window.scrollTo(0, ${y})`);
    // Время на переключение шапки по прокрутке и завершение переходов.
    await page.eval('new Promise((r) => setTimeout(r, 900))');
    const { data } = await page.send('Page.captureScreenshot', { format: 'png' });
    shots.push({ y, data });
  }
  return { height, shots };
};

const result = await withBrowser(async (page) => {
  const a = await shoot(page, origUrl);
  const b = await shoot(page, twUrl);

  // Сравнение и склейка — на пустой странице с canvas.
  await page.goto('about:blank', 100);
  const report = [];
  for (let k = 0; k < a.shots.length; k++) {
    const r = await page.eval(`(async () => {
      const load = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
      const A = await load('data:image/png;base64,${a.shots[k].data}');
      const B = await load('data:image/png;base64,${b.shots[k].data}');
      const w = A.width, h = A.height;
      const ca = new OffscreenCanvas(w, h), cb = new OffscreenCanvas(w, h);
      ca.getContext('2d').drawImage(A, 0, 0); cb.getContext('2d').drawImage(B, 0, 0, w, h);
      const da = ca.getContext('2d').getImageData(0, 0, w, h).data;
      const db = cb.getContext('2d').getImageData(0, 0, w, h).data;
      const out = new OffscreenCanvas(w * 3, h);
      const ctx = out.getContext('2d');
      ctx.drawImage(A, 0, 0); ctx.drawImage(B, w, 0, w, h);
      const diff = ctx.createImageData(w, h);
      let bad = 0;
      for (let p = 0; p < da.length; p += 4) {
        const d = Math.max(Math.abs(da[p] - db[p]), Math.abs(da[p + 1] - db[p + 1]), Math.abs(da[p + 2] - db[p + 2]));
        const g = (da[p] + da[p + 1] + da[p + 2]) / 3 * 0.35;
        if (d > 24) { bad++; diff.data[p] = 255; diff.data[p + 1] = 0; diff.data[p + 2] = 0; }
        else { diff.data[p] = g; diff.data[p + 1] = g; diff.data[p + 2] = g; }
        diff.data[p + 3] = 255;
      }
      ctx.putImageData(diff, w * 2, 0);
      const blob = await out.convertToBlob({ type: 'image/jpeg', quality: 0.7 });
      const buf = new Uint8Array(await blob.arrayBuffer());
      let bin = ''; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
      return { ratio: bad / (w * h), jpeg: btoa(bin) };
    })()`);
    const file = path.join(outDir, `pos-${String(k).padStart(2, '0')}-y${a.shots[k].y}.jpg`);
    writeFileSync(file, Buffer.from(r.jpeg, 'base64'));
    report.push({ y: a.shots[k].y, yTailwind: b.shots[k]?.y, diffPercent: Math.round(r.ratio * 10000) / 100, file });
  }
  return { heights: { original: a.height, tailwind: b.height }, report };
});

writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(result, null, 2));
console.log(`высота: оригинал ${result.heights.original}, перевод ${result.heights.tailwind}`);
for (const r of result.report) console.log(`  y=${r.y}: отличий ${r.diffPercent}%  ${path.basename(r.file)}`);
const worst = Math.max(...result.report.map((r) => r.diffPercent));
console.log(`максимум отличий: ${worst}%`);
