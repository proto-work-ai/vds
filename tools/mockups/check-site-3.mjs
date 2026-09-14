/* Проверка интерактива перевода «оригинал 3» (mockups/tailwind/site-3/app.js).

   node tools/mockups/check-site-3.mjs [перевод] [оригинал]

   Одни и те же шаги выполняются в оригинале и в переводе (Chrome без окна):
   первый отзыв и смена через 6 с, клик по точке, «Scroll» → коллекции,
   мобильное меню, отправка формы без перезагрузки. Результаты сверяются. */
import { withBrowser } from './snapshot.mjs';

const url = process.argv[2] ?? 'http://localhost:4623/tailwind/site-3/';
const origUrl = process.argv[3] ?? 'http://localhost:4523/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const wait = (page, ms) => page.eval(`new Promise((r) => setTimeout(r, ${ms}))`);

// Состояние отзывов: текст цитаты, имя, ширины точек.
const TESTI = `(() => {
  const s = document.querySelector('section#testimonials');
  const ps = [...s.querySelectorAll('p')].filter((p) => p.textContent.trim().startsWith('"') && p.textContent.length > 40);
  const card = ps[0]?.parentElement;
  const name = card?.querySelectorAll('p')[1]?.textContent;
  const dots = [...s.querySelectorAll('button')].map((b) => getComputedStyle(b).width);
  return { quote: ps[0]?.textContent.slice(0, 30), name, img: card?.querySelector('img')?.getAttribute('src'), dots, anim: card && getComputedStyle(card).animationName };
})()`;

async function run(target, isOrig) {
  const out = {};
  await withBrowser(async (page) => {
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errors = [];
        window.addEventListener('error', (e) => window.__errors.push(String(e.message) + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno));
        window.addEventListener('unhandledrejection', (e) => window.__errors.push('promise: ' + String(e.reason)));`,
    });
    await page.goto(target, 1500);
    // Отзывы видны после вступления: ждём, пока снимем первый кадр.
    await page.eval(`document.querySelector('section#testimonials').scrollIntoView()`);
    await wait(page, 7000);
    // Выровнять фазу интервала неудобно — ловим смену: снимаем состояние до и после 6.5 с.
    out.t0 = await page.eval(TESTI);
    await wait(page, 6500);
    out.t1 = await page.eval(TESTI);
    await page.eval(`document.querySelectorAll('section#testimonials button')[2].click()`);
    await wait(page, 600);
    out.t2 = await page.eval(TESTI);

    // «Scroll» → коллекции.
    await page.eval(`window.scrollTo(0, 0)`);
    await wait(page, 500);
    await page.eval(`[...document.querySelectorAll('section#home span')].find((s) => s.textContent.trim() === 'Scroll').parentElement.click()`);
    await wait(page, 1500);
    out.scroll = await page.eval(`Math.round(document.getElementById('collections').getBoundingClientRect().top)`);

    // Форма: отправка не уводит со страницы.
    out.form = await page.eval(`(async () => {
      const f = document.querySelector('section#contact form');
      for (const el of f.querySelectorAll('input')) el.value = el.type === 'email' ? 'test@example.com' : '1234567';
      window.__marker = 42;
      f.querySelector('button[type=submit]').click();
      await new Promise((r) => setTimeout(r, 500));
      return { alive: window.__marker === 42, stillForm: !!document.querySelector('section#contact form') };
    })()`);

    // Мобильное меню.
    await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await wait(page, 800);
    out.menu = await page.eval(`(async () => {
      const nav = document.querySelector('nav');
      const burger = nav.querySelector('button[aria-label="Toggle menu"]');
      const visible = getComputedStyle(burger).display !== 'none';
      const before = nav.querySelectorAll('a').length;
      burger.click();
      await new Promise((r) => setTimeout(r, 450));
      const spans = [...burger.querySelectorAll('span')].map((s) => getComputedStyle(s).transform);
      const panel = [...nav.children].find((el) => el !== burger && getComputedStyle(el).position === 'absolute');
      const cs = panel && getComputedStyle(panel);
      const links = panel ? [...panel.querySelectorAll('a')].map((a) => a.getAttribute('href') + ' ' + a.textContent) : [];
      const panelStyle = cs && { top: cs.top, bg: cs.backgroundColor, pad: cs.padding, gap: cs.rowGap, anim: cs.animationName, h: Math.round(panel.getBoundingClientRect().height) };
      const linkStyle = panel && (() => { const a = getComputedStyle(panel.querySelector('a')); return { fs: a.fontSize, ls: a.letterSpacing, color: a.color, op: a.opacity }; })();
      panel?.querySelector('a[href="#collections"]')?.click();
      await new Promise((r) => setTimeout(r, 450));
      const closed = ![...nav.children].some((el) => el !== burger && getComputedStyle(el).position === 'absolute');
      const spansClosed = [...burger.querySelectorAll('span')].map((s) => getComputedStyle(s).transform);
      return { visible, before, spans, links, panelStyle, linkStyle, closed, spansClosed };
    })()`);
    out.errors = isOrig ? [] : await page.eval(`window.__errors ?? []`);
  });
  return out;
}

const o = await run(origUrl, true);
const t = await run(url, false);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

check('отзывы: состояние до смены совпадает с оригиналом', same(o.t0.name, t.t0.name) || same(o.t1.name, t.t1.name), `оригинал ${JSON.stringify(o.t0)} | перевод ${JSON.stringify(t.t0)}`);
check('отзывы: через 6 с отзыв сменяется', t.t0.name !== t.t1.name && o.t0.name !== o.t1.name, `оригинал ${o.t0.name}→${o.t1.name} | перевод ${t.t0.name}→${t.t1.name}`);
check('отзывы: клик по третьей точке — Dr. Priya Mehta, как в оригинале', t.t2.name === 'Dr. Priya Mehta' && same(o.t2, t.t2), `оригинал ${JSON.stringify(o.t2)} | перевод ${JSON.stringify(t.t2)}`);
check('отзывы: активная точка 28px, остальные 8px', same(t.t2.dots, ['8px', '8px', '28px']), JSON.stringify(t.t2.dots));
check('отзывы: карточка появляется с fadeInUp', t.t2.anim === 'fadeInUp' && o.t2.anim === 'fadeInUp', `${o.t2.anim} / ${t.t2.anim}`);
check('«Scroll» прокручивает к коллекциям', Math.abs(t.scroll) < 5 && Math.abs(t.scroll - o.scroll) < 5, `оригинал ${o.scroll} | перевод ${t.scroll}`);
check('форма: отправка без перезагрузки', t.form.alive && t.form.stillForm && same(o.form, t.form), `оригинал ${JSON.stringify(o.form)} | перевод ${JSON.stringify(t.form)}`);
check('мобильное меню: бургер виден на телефоне', t.menu.visible && o.menu.visible, JSON.stringify({ o: o.menu.visible, t: t.menu.visible }));
check('мобильное меню: крестик как в оригинале', same(o.menu.spans, t.menu.spans), `оригинал ${JSON.stringify(o.menu.spans)} | перевод ${JSON.stringify(t.menu.spans)}`);
check('мобильное меню: пункты и ссылки как в оригинале', t.menu.links.length === 5 && same(o.menu.links, t.menu.links), `оригинал ${JSON.stringify(o.menu.links)} | перевод ${JSON.stringify(t.menu.links)}`);
check('мобильное меню: вид панели и пунктов как в оригинале', same(o.menu.panelStyle, t.menu.panelStyle) && same(o.menu.linkStyle, t.menu.linkStyle), `оригинал ${JSON.stringify([o.menu.panelStyle, o.menu.linkStyle])} | перевод ${JSON.stringify([t.menu.panelStyle, t.menu.linkStyle])}`);
check('мобильное меню: клик по пункту закрывает, полоски возвращаются', t.menu.closed && same(o.menu.spansClosed, t.menu.spansClosed), `оригинал ${JSON.stringify([o.menu.closed, o.menu.spansClosed])} | перевод ${JSON.stringify([t.menu.closed, t.menu.spansClosed])}`);
check('нет ошибок скрипта', t.errors.length === 0, JSON.stringify(t.errors));

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не прошло: ${failed} из ${results.length}` : `все ${results.length} проверок прошли`);
process.exitCode = failed ? 1 : 0;
