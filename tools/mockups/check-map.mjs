/* Проверка карты макетов: каждая ссылка карты открывается с того же сервера
   (npm run mockups, порт 4320) — страница отрисована, без ошибок скрипта и 404.

   node tools/mockups/check-map.mjs [baseUrl] */
import { withBrowser } from './snapshot.mjs';

const base = (process.argv[2] ?? 'http://localhost:4320/').replace(/\/?$/, '/');
const results = [];

await withBrowser(async (page) => {
  await page.send('Page.addScriptToEvaluateOnNewDocument', {
    // Ошибки скрипта и незагрузившиеся скрипты/стили — провал; картинки считаем отдельно
    // (часть фото оригиналов лежит на внешних адресах или отсутствует в сохранённой копии).
    source: `window.__errors = []; window.__images = [];
      window.addEventListener('error', (e) => {
        if (e.target instanceof HTMLImageElement) window.__images.push(e.target.currentSrc || e.target.src);
        else window.__errors.push(String(e.message || e.target?.src || e.target?.href));
      }, true);`,
  });
  await page.goto(base, 1500);
  const links = await page.eval(
    `[...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => /^http:\\/\\/localhost:43\\d\\d\\//.test(h) && !/\\.(ico|css)$/.test(h))`
  );
  for (const href of [...new Set(links)]) {
    await page.goto(href, 5000);
    const r = await page.eval(`({
      nodes: document.body ? document.body.querySelectorAll('*').length : 0,
      text: (document.body?.innerText || '').trim().length,
      notFound: /404|not found/i.test(document.title) || /^\\s*404/.test(document.body?.innerText || ''),
      errors: window.__errors,
    })`);
    const ok = r.nodes > 50 && r.text > 100 && !r.notFound && r.errors.length === 0;
    results.push({ href: href.slice(base.length) || '/', ok, detail: JSON.stringify(r) });
  }
});

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.href}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не открылось: ${failed} из ${results.length}` : `все ${results.length} ссылок открываются`);
process.exitCode = failed ? 1 : 0;
