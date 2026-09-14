/* Проверка интерактива перевода «оригинал 2» (mockups/tailwind/site-2/app.js).

   node tools/mockups/check-site-2.mjs [url]

   Открывает перевод в Chrome без окна и по шагам проверяет: смену слайдов и
   клик по точкам первого экрана, смену отзывов, мобильное меню, просмотр фото
   в галерее и сообщение после отправки формы. Печатает ✓/✗ по каждому пункту. */
import { withBrowser } from './snapshot.mjs';

const url = process.argv[2] ?? 'http://localhost:4320/tailwind/site-2/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const wait = (page, ms) => page.eval(`new Promise((r) => setTimeout(r, ${ms}))`);

await withBrowser(async (page) => {
  // Ошибки собираем с самого начала загрузки — иначе падение app.js не видно.
  await page.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `window.__errors = [];
      window.addEventListener('error', (e) => window.__errors.push(String(e.message) + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno));
      window.addEventListener('unhandledrejection', (e) => window.__errors.push('promise: ' + String(e.reason)));`,
  });
  await page.goto(url, 2500);
  const early = await page.eval('window.__errors');
  if (early.length) console.log('ошибки при загрузке:', early.join(' | '));

  // Первый экран: активный слой и смена через 6 с.
  const activeLayer = `(() => {
    const hero = document.querySelector('section#home');
    const layers = [...hero.children].filter((el) => el.tagName === 'DIV' && el.querySelector(':scope > img'));
    return { index: layers.findIndex((l) => getComputedStyle(l).opacity === '1' || l.classList.contains('[opacity:1]')), heading: hero.querySelector('h1')?.textContent };
  })()`;
  const h0 = await page.eval(activeLayer);
  check('первый экран: при загрузке активен слайд 1', h0.index === 0, JSON.stringify(h0));
  await wait(page, 6600);
  const h1 = await page.eval(activeLayer);
  check('первый экран: через 6 с переключается слайд', h1.index === 1 && h1.heading !== h0.heading, JSON.stringify(h1));
  await page.eval(`(() => {
    const hero = document.querySelector('section#home');
    const dots = [...hero.children].find((el) => el.tagName === 'DIV' && [...el.children].length >= 2 && [...el.children].every((c) => c.tagName === 'BUTTON'));
    dots.children[2].click();
  })()`);
  await wait(page, 300);
  const h2 = await page.eval(activeLayer);
  check('первый экран: клик по третьей точке', h2.index === 2, JSON.stringify(h2));

  // Отзывы: смена через 5 с.
  const quote = `document.querySelector('section blockquote')?.textContent?.slice(0, 40)`;
  const q0 = await page.eval(quote);
  await wait(page, 5400);
  const q1 = await page.eval(quote);
  check('отзывы: через 5 с сменяется отзыв', Boolean(q0) && q0 !== q1, `${q0} → ${q1}`);

  // Мобильное меню: на узком экране.
  await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await wait(page, 800);
  const menu = await page.eval(`(async () => {
    const nav = document.querySelector('nav');
    const burger = [...nav.querySelectorAll('button')].find((b) => b.querySelectorAll('span').length === 3 && !b.textContent.trim());
    if (!burger) return { burger: false };
    const visible = getComputedStyle(burger).display !== 'none';
    burger.click();
    await new Promise((r) => setTimeout(r, 400));
    const panel = [...nav.children].at(-1);
    const items = [...panel.querySelectorAll('button')].map((b) => b.textContent);
    burger.click();
    await new Promise((r) => setTimeout(r, 200));
    return { burger: true, visible, items, closed: nav.children.length };
  })()`);
  check('мобильное меню: кнопка видна на телефоне', menu.burger && menu.visible, JSON.stringify(menu));
  check('мобильное меню: открывается с пунктами разделов', (menu.items ?? []).includes('Gallery'), JSON.stringify(menu.items));
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await wait(page, 500);

  // Галерея: просмотр фото.
  const lightbox = await page.eval(`(async () => {
    const img = document.querySelector('section#gallery img');
    if (!img) return { img: false };
    (img.closest('[class*="cursor:pointer"]') ?? img.parentElement).click();
    await new Promise((r) => setTimeout(r, 300));
    const overlay = [...document.body.children].at(-1);
    const opened = getComputedStyle(overlay).position === 'fixed' && !!overlay.querySelector('img');
    const first = overlay.querySelector('img')?.getAttribute('src');
    overlay.querySelector('[data-next]')?.click();
    await new Promise((r) => setTimeout(r, 100));
    const second = overlay.querySelector('img')?.getAttribute('src');
    overlay.querySelector('[data-close]')?.click();
    await new Promise((r) => setTimeout(r, 100));
    return { opened, switched: first !== second, closed: !document.body.contains(overlay) };
  })()`);
  check('галерея: фото открывается во весь экран', lightbox.opened, JSON.stringify(lightbox));
  check('галерея: листание и закрытие', lightbox.switched && lightbox.closed, JSON.stringify(lightbox));

  // Форма заявки.
  const form = await page.eval(`(async () => {
    const f = document.querySelector('section#contact form');
    if (!f) return { form: false };
    // Поля обязательные: пустую форму браузер не отправит — так и в оригинале.
    for (const el of f.querySelectorAll('input, textarea, select')) {
      if (el.tagName === 'SELECT') el.selectedIndex = Math.min(1, el.options.length - 1);
      else if (el.type === 'email') el.value = 'test@example.com';
      else if (el.type === 'tel') el.value = '+7 900 000-00-00';
      else el.value = 'Проверка';
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
    f.requestSubmit();
    await new Promise((r) => setTimeout(r, 200));
    const shown = document.querySelector('section#contact')?.textContent.includes('Thank You!');
    [...document.querySelectorAll('section#contact button')].find((b) => /Send Another/.test(b.textContent))?.click();
    await new Promise((r) => setTimeout(r, 200));
    return { shown, back: !!document.querySelector('section#contact form') };
  })()`);
  check('форма: после отправки сообщение, затем снова форма', form.shown && form.back, JSON.stringify(form));

  const errors = await page.eval(`window.__errors ?? []`);
  check('нет ошибок скрипта', errors.length === 0, JSON.stringify(errors));
});

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не прошло: ${failed} из ${results.length}` : `все ${results.length} проверок прошли`);
process.exitCode = failed ? 1 : 0;
