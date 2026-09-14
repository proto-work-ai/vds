/* Проверка страниц-галерей картинок и иконок (mockups/images.html, icons.html).

   node tools/mockups/check-gallery.mjs [baseUrl]

   Для каждой страницы: карточки отрисованы, у картинок есть название, превью
   загрузились (внешние адреса могут быть недоступны — считаем отдельно), клик
   по карточке открывает лайтбокс с полной версией и подписью, стрелка → листает,
   Escape закрывает. Печатает ✓/✗ по каждому пункту. */
import { withBrowser } from './snapshot.mjs';

const base = (process.argv[2] ?? 'http://localhost:4320/').replace(/\/?$/, '/');
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

await withBrowser(async (page) => {
  await page.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `window.__errors = []; window.addEventListener('error', (e) => window.__errors.push(String(e.message)));`,
  });

  for (const [file, kind] of [
    ['images/', 'image'],
    ['icons/', 'icon'],
  ]) {
    await page.goto(base + file, 3000);
    const r = await page.eval(`(async () => {
      const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
      const cards = [...document.querySelectorAll('[data-lightbox="${kind}"]')];
      const titles = cards.map((c) => c.dataset.title).filter(Boolean).length;
      // Превью с loading="lazy" за пределами экрана не грузятся — для проверки грузим все сразу.
      for (const i of document.querySelectorAll('main img')) i.loading = 'eager';
      await Promise.all([...document.querySelectorAll('main img')].map((i) => i.complete ? null : new Promise((res) => { i.onload = i.onerror = res; setTimeout(res, 8000); })));
      const imgs = [...document.querySelectorAll('main img')];
      const local = imgs.filter((i) => !/^https?:/.test(i.getAttribute('src')));
      const localLoaded = local.filter((i) => i.complete && i.naturalWidth > 0).length;
      if (!cards.length) return { cards: 0 };
      cards[0].click();
      await sleep(200);
      const overlay = [...document.body.children].find((el) => el.getAttribute('role') === 'dialog');
      const open = overlay && !overlay.classList.contains('hidden');
      const title1 = overlay?.querySelector('[data-title]')?.textContent;
      const hasMedia = !!overlay?.querySelector('[data-body] ${kind === 'image' ? 'img' : 'svg'}');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      await sleep(100);
      const title2 = overlay?.querySelector('[data-title]')?.textContent;
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await sleep(100);
      const closed = overlay?.classList.contains('hidden');
      return { cards: cards.length, titles, local: local.length, localLoaded, open, hasMedia, switched: cards.length < 2 || title1 !== title2 || true, title1, title2, closed, errors: window.__errors };
    })()`);
    check(`${file}: карточки отрисованы`, r.cards > 0, JSON.stringify(r));
    check(`${file}: у всех карточек есть название`, r.titles === r.cards, `${r.titles} из ${r.cards}`);
    if (kind === 'image') check(`${file}: локальные картинки загрузились`, r.localLoaded === r.local, `${r.localLoaded} из ${r.local}`);
    check(`${file}: клик открывает полную версию с подписью`, r.open && r.hasMedia && Boolean(r.title1), JSON.stringify({ open: r.open, hasMedia: r.hasMedia, title: r.title1 }));
    check(`${file}: стрелка листает, Escape закрывает`, r.closed && (r.cards < 2 || r.title1 !== r.title2), JSON.stringify({ title1: r.title1, title2: r.title2, closed: r.closed }));
    check(`${file}: нет ошибок скрипта`, (r.errors ?? []).length === 0, JSON.stringify(r.errors));
  }
});

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не прошло: ${failed} из ${results.length}` : `все ${results.length} проверок прошли`);
process.exitCode = failed ? 1 : 0;
