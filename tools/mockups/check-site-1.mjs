/* Проверка интерактива перевода «оригинал 1» (mockups/tailwind/site-1/app.js).

   node tools/mockups/check-site-1.mjs [перевод] [оригинал]

   Один и тот же сценарий прогоняется в оригинале и в переводе (Chrome без окна):
   мобильное меню, «Learn More» в услугах, точки отзывов, отправка формы.
   Каждый пункт: результат в переводе верный и совпадает с оригиналом. */
import { withBrowser } from './snapshot.mjs';

const url = process.argv[2] ?? 'http://localhost:4611/tailwind/site-1/';
const original = process.argv[3] ?? 'http://localhost:4511/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

// Ищем элементы только по тому, что одинаково в обоих: aria-label, тексты, теги.
const SCENARIO = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const out = {};
  const nav = document.querySelector('nav');
  const burger = nav.querySelector('button[aria-label="Toggle menu"]');
  out.burgerVisible = getComputedStyle(burger).display !== 'none';
  burger.click();
  await sleep(600);
  const links = [...nav.querySelectorAll('a')].filter((a) => a.getBoundingClientRect().height > 0 && a.offsetParent && getComputedStyle(a).display === 'block');
  out.menuItems = links.map((a) => a.textContent.trim());
  out.menuHeight = Math.round(links[0]?.parentElement.parentElement.getBoundingClientRect().height ?? 0);
  const lines = [...burger.children].map((l) => getComputedStyle(l));
  out.cross = [lines[0].transform !== 'none', lines[1].opacity, lines[2].transform !== 'none'];
  links[0]?.click();
  await sleep(600);
  out.menuClosed = ![...nav.querySelectorAll('a')].some((a) => a.textContent.trim() === 'Gallery' && getComputedStyle(a).display === 'block');
  out.lineBack = getComputedStyle(burger.children[1]).opacity;
  window.scrollTo(0, 0);
  return out;
})()`;

const SERVICES = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const btns = () => [...document.querySelectorAll('button')].filter((b) => /Learn More|Less Info/.test(b.textContent));
  // Только списки внутри карточек услуг: в тарифах ниже тоже есть пункты с ✓.
  const features = () => btns().flatMap((b) => [...b.parentElement.querySelectorAll('li')]).map((li) => li.textContent);
  btns()[0].scrollIntoView();
  await sleep(300);
  btns()[0].click();
  await sleep(500);
  const a = { labels: btns().map((b) => b.textContent.trim()), features: features() };
  btns()[1].click();
  await sleep(500);
  const b = { labels: btns().map((b) => b.textContent.trim()), features: features() };
  // Клик по самой карточке (не по кнопке) закрывает открытую.
  btns()[1].closest('[style*="cursor: pointer"], [class*="cursor:pointer"]').click();
  await sleep(500);
  const c = { labels: btns().map((b) => b.textContent.trim()), features: features() };
  return { a, b, c };
})()`;

const REVIEWS = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const dot = (n) => document.querySelector('button[aria-label="Review ' + n + '"]');
  dot(1).scrollIntoView();
  await sleep(300);
  const slide = () => dot(1).parentElement.previousElementSibling;
  const read = () => [...slide().children].map((c) => c.textContent);
  dot(3).click();
  await sleep(200);
  const mid = { opacity: Number(getComputedStyle(slide()).opacity).toFixed(1) };
  await sleep(1000);
  const after = read();
  const widths = [1, 2, 3, 4].map((n) => getComputedStyle(dot(n)).width);
  return { mid, after, widths };
})()`;

const FORM = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const f = document.querySelector('section#contact form');
  const input = f.querySelector('input#name');
  input.focus();
  await sleep(300);
  const focusBorder = getComputedStyle(input).borderTopColor;
  input.blur();
  await sleep(300);
  const blurBorder = getComputedStyle(input).borderTopColor;
  // React слушает нативный ввод: значение ставим через сеттер прототипа.
  const set = (el, v) => {
    const proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  set(f.querySelector('#name'), 'Проверка');
  set(f.querySelector('#email'), 'test@example.com');
  f.querySelector('button[type="submit"]').click();
  await sleep(800);
  const box = document.querySelector('section#contact');
  const h3 = [...box.querySelectorAll('h3')].find((h) => h.textContent === 'Thank You!');
  return {
    focusBorder, blurBorder,
    formGone: !box.querySelector('form'),
    title: h3?.textContent ?? null,
    text: h3?.nextElementSibling?.textContent ?? null,
    emoji: h3?.previousElementSibling?.textContent ?? null,
    opacity: h3 ? getComputedStyle(h3.parentElement).opacity : null,
  };
})()`;

async function run(page, target) {
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.goto(target, 3000);
  const r = { errors: [] };
  await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await page.eval('new Promise((r) => setTimeout(r, 600))');
  r.menu = await page.eval(SCENARIO);
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.eval('new Promise((r) => setTimeout(r, 600))');
  r.services = await page.eval(SERVICES);
  r.reviews = await page.eval(REVIEWS);
  r.form = await page.eval(FORM);
  r.errors = await page.eval('window.__errors ?? []');
  return r;
}

await withBrowser(async (page) => {
  // Ошибки собираем с самого начала загрузки — иначе падение app.js не видно.
  await page.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `window.__errors = [];
      window.addEventListener('error', (e) => window.__errors.push(String(e.message) + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno));
      window.addEventListener('unhandledrejection', (e) => window.__errors.push('promise: ' + String(e.reason)));`,
  });
  const o = await run(page, original);
  const t = await run(page, url);
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const both = (a, b) => `перевод ${JSON.stringify(a)} / оригинал ${JSON.stringify(b)}`;

  check('меню: кнопка видна на телефоне', t.menu.burgerVisible && o.menu.burgerVisible, both(t.menu.burgerVisible, o.menu.burgerVisible));
  check('меню: открывается с теми же пунктами', t.menu.menuItems.includes('Gallery') && same(t.menu.menuItems, o.menu.menuItems), both(t.menu.menuItems, o.menu.menuItems));
  check('меню: высота панели как в оригинале', Math.abs(t.menu.menuHeight - o.menu.menuHeight) <= 2 && t.menu.menuHeight > 100, both(t.menu.menuHeight, o.menu.menuHeight));
  check('меню: полоски превращаются в крестик', same(t.menu.cross, [true, '0', true]) && same(t.menu.cross, o.menu.cross), both(t.menu.cross, o.menu.cross));
  check('меню: пункт закрывает меню', t.menu.menuClosed && o.menu.menuClosed && t.menu.lineBack === '1', both([t.menu.menuClosed, t.menu.lineBack], [o.menu.menuClosed, o.menu.lineBack]));

  const s = t.services;
  check('услуги: «Learn More» раскрывает преимущества', s.a.features.length === 4 && s.a.labels[0] === 'Less Info ↑' && same(s.a, o.services.a), both(s.a, o.services.a));
  check('услуги: открыта только одна карточка', s.b.labels.filter((l) => l === 'Less Info ↑').length === 1 && same(s.b, o.services.b), both(s.b, o.services.b));
  check('услуги: клик по карточке закрывает', s.c.features.length === 0 && same(s.c, o.services.c), both(s.c, o.services.c));

  check('отзывы: во время смены блок гаснет', Number(t.reviews.mid.opacity) < 1 && Number(o.reviews.mid.opacity) < 1, both(t.reviews.mid, o.reviews.mid));
  check('отзывы: клик по третьей точке показывает третий отзыв', t.reviews.after.join('|').includes('Linda & Tom K.') && same(t.reviews.after, o.reviews.after), both(t.reviews.after, o.reviews.after));
  check('отзывы: активная точка шире', same(t.reviews.widths, ['8px', '8px', '28px', '8px']) && same(t.reviews.widths, o.reviews.widths), both(t.reviews.widths, o.reviews.widths));

  check('форма: золотая рамка при фокусе и обычная после', t.form.focusBorder === o.form.focusBorder && t.form.blurBorder === o.form.blurBorder && t.form.focusBorder !== t.form.blurBorder, both([t.form.focusBorder, t.form.blurBorder], [o.form.focusBorder, o.form.blurBorder]));
  const fields = (f) => ({ formGone: f.formGone, title: f.title, text: f.text, emoji: f.emoji, opacity: f.opacity });
  check('форма: после отправки «Thank You!» как в оригинале', t.form.formGone && t.form.title === 'Thank You!' && same(fields(t.form), fields(o.form)), both(fields(t.form), fields(o.form)));

  check('нет ошибок скрипта', t.errors.length === 0, JSON.stringify(t.errors));
});

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не прошло: ${failed} из ${results.length}` : `все ${results.length} проверок прошли`);
process.exitCode = failed ? 1 : 0;
