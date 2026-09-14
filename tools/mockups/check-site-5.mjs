/* Проверка интерактива перевода «оригинал 5» (mockups/tailwind/site-5/app.js).

   node tools/mockups/check-site-5.mjs [перевод] [оригинал]

   Одни и те же шаги в оригинале и переводе (Chrome без окна): переключение
   отзывов точками и мобильное меню (иконка, панель, закрытие по пункту). */
import { withBrowser } from './snapshot.mjs';

const url = process.argv[2] ?? 'http://localhost:4623/tailwind/site-5/';
const origUrl = process.argv[3] ?? 'http://localhost:4525/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const wait = (page, ms) => page.eval(`new Promise((r) => setTimeout(r, ${ms}))`);

const TESTI = `(() => {
  const s = document.querySelector('section#testimonials');
  const av = s.querySelector('.testimonial-avatar');
  const card = av.parentElement.parentElement;
  return {
    text: card.querySelector('p').textContent.slice(0, 30),
    initials: av.textContent,
    name: av.nextElementSibling.children[0].textContent,
    role: av.nextElementSibling.children[1].textContent,
    stars: card.querySelectorAll('svg').length,
    dots: [...s.querySelectorAll('button')].map((b) => getComputedStyle(b).width + ' ' + getComputedStyle(b).backgroundColor),
  };
})()`;

const MENU = `(() => {
  const nav = document.querySelector('nav');
  const btn = [...nav.querySelectorAll('button')].at(-1);
  const panel = nav.nextElementSibling;
  const cs = getComputedStyle(panel);
  return { visible: getComputedStyle(btn).display !== 'none', icon: [...btn.querySelector('svg').children].map((c) => c.getAttribute('d') ?? c.getAttribute('y1')).join('|'), opacity: Number(cs.opacity).toFixed(2), pe: cs.pointerEvents };
})()`;

async function run(target, isOrig) {
  const out = {};
  await withBrowser(async (page) => {
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errors = [];
        window.addEventListener('error', (e) => window.__errors.push(String(e.message) + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno));
        window.addEventListener('unhandledrejection', (e) => window.__errors.push('promise: ' + String(e.reason)));`,
    });
    await page.goto(target, 4000);
    out.t0 = await page.eval(TESTI);
    await page.eval(`document.querySelectorAll('section#testimonials button')[1].click()`);
    await wait(page, 500);
    out.t1 = await page.eval(TESTI);
    await page.eval(`document.querySelectorAll('section#testimonials button')[2].click()`);
    await wait(page, 500);
    out.t2 = await page.eval(TESTI);
    // Таймера нет: через 7 с отзыв тот же.
    await wait(page, 7000);
    out.t3 = await page.eval(TESTI);

    await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await wait(page, 800);
    out.m0 = await page.eval(MENU);
    await page.eval(`[...document.querySelector('nav').querySelectorAll('button')].at(-1).click()`);
    await wait(page, 150);
    out.mMid = await page.eval(MENU);
    await wait(page, 500);
    out.m1 = await page.eval(MENU);
    out.links = await page.eval(`[...document.querySelector('nav').nextElementSibling.querySelectorAll('a')].map((a) => a.getAttribute('href') + ' ' + a.textContent)`);
    await page.eval(`document.querySelector('nav').nextElementSibling.querySelector('a[href="#gallery"]').click()`);
    await wait(page, 600);
    out.m2 = await page.eval(MENU);
    out.errors = isOrig ? [] : await page.eval(`window.__errors ?? []`);
  });
  return out;
}

const o = await run(origUrl, true);
const t = await run(url, false);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const both = (k) => `оригинал ${JSON.stringify(o[k])} | перевод ${JSON.stringify(t[k])}`;

check('отзывы: при загрузке первый, как в оригинале', t.t0.name === 'Priya Malhotra' && same(o.t0, t.t0), both('t0'));
check('отзывы: вторая точка — Rahul Singhania', t.t1.name === 'Rahul Singhania' && same(o.t1, t.t1), both('t1'));
check('отзывы: третья точка — Ananya Kapoor', t.t2.name === 'Ananya Kapoor' && same(o.t2, t.t2), both('t2'));
check('отзывы: сами не листаются (таймера нет)', same(t.t2, t.t3) && same(o.t2, o.t3), both('t3'));
check('мобильное меню: кнопка видна, панель скрыта', t.m0.visible && same(o.m0, t.m0), both('m0'));
check('мобильное меню: открывается с иконкой X', t.m1.opacity === '1.00' && same(o.m1, t.m1), both('m1'));
check('мобильное меню: панель проявляется плавно (~0.3 с)', Number(t.mMid.opacity) > 0.05 && Number(t.mMid.opacity) < 0.95 && Math.abs(Number(t.mMid.opacity) - Number(o.mMid.opacity)) < 0.25, both('mMid'));
check('мобильное меню: пункты как в оригинале', t.links.length === 6 && same(o.links, t.links), both('links'));
check('мобильное меню: клик по пункту закрывает', t.m2.opacity === '0.00' && same(o.m2, t.m2), both('m2'));
check('нет ошибок скрипта', t.errors.length === 0, JSON.stringify(t.errors));

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не прошло: ${failed} из ${results.length}` : `все ${results.length} проверок прошли`);
process.exitCode = failed ? 1 : 0;
