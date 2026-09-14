/* Проверка интерактива перевода «оригинал 6» (mockups/tailwind/site-6/app.js).

   node tools/mockups/check-site-6.mjs [url перевода] [url оригинала]

   Одни и те же шаги выполняются в оригинале и в переводе (Chrome без окна):
   мобильное меню (открытие, иконка, высота панели, закрытие пунктом),
   смена отзывов по таймеру 5.5 с и клик по точкам, отправка формы без
   перезагрузки. Печатает ✓/✗ по каждому пункту. */
import { withBrowser } from './snapshot.mjs';

const url = process.argv[2] ?? 'http://localhost:4636/tailwind/site-6/';
const original = process.argv[3] ?? 'http://localhost:4536/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const wait = (page, ms) => page.eval(`new Promise((r) => setTimeout(r, ${ms}))`);

// Состояние отзывов: какой слайд виден и какая точка активна.
const TESTIMONIAL = `(() => {
  const dots = [...document.querySelector('button[aria-label="Testimonial 1"]').parentElement.children];
  const slides = [...dots[0].parentElement.previousElementSibling.children];
  return {
    slide: slides.findIndex((s) => getComputedStyle(s).opacity === '1'),
    dot: dots.findIndex((d) => d.getBoundingClientRect().width > 20),
    author: slides.find((s) => getComputedStyle(s).opacity === '1')?.querySelector('blockquote + div')?.textContent,
  };
})()`;

// Меню на телефоне: открыть, снять состояние, закрыть пунктом «Gallery».
const MENU = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const burger = document.querySelector('nav button[aria-label="Toggle menu"]');
  const panel = [...burger.closest('nav').children].find((el) => el.classList.contains('overflow-hidden'));
  const snap = () => ({ h: Math.round(panel.getBoundingClientRect().height), o: getComputedStyle(panel).opacity, icon: burger.querySelector('svg').getAttribute('class') });
  const r = { visible: getComputedStyle(burger).display !== 'none', closed: snap() };
  burger.click();
  await sleep(150);
  r.mid = snap();
  await sleep(600);
  r.open = snap();
  r.items = [...panel.querySelectorAll('a')].map((a) => a.textContent.trim());
  [...panel.querySelectorAll('a')].find((a) => a.textContent.trim() === 'Gallery').click();
  await sleep(700);
  r.afterItem = snap();
  r.hash = location.hash;
  return r;
})()`;

const FORM = `(async () => {
  const f = document.querySelector('section#contact form');
  for (const el of f.querySelectorAll('input, textarea')) {
    el.value = el.type === 'email' ? 'test@example.com' : 'Проверка';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
  window.__marker = 1;
  f.querySelector('button[type=submit]').click();
  await new Promise((r) => setTimeout(r, 500));
  return { sameDocument: window.__marker === 1, formPresent: !!document.querySelector('section#contact form'), text: document.querySelector('section#contact').textContent.length };
})()`;

async function run(target) {
  return withBrowser(async (page) => {
    // Ошибки собираем с самого начала загрузки — иначе падение app.js не видно.
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errors = [];
        window.addEventListener('error', (e) => window.__errors.push(String(e.message) + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno));
        window.addEventListener('unhandledrejection', (e) => window.__errors.push('promise: ' + String(e.reason)));
        // Начальное состояние слайдера — сразу после разбора документа: goto ждёт загрузки картинок,
        // за это время таймер 5.5 с уже может сменить слайд.
        document.addEventListener('DOMContentLoaded', () => {
          const d = document.querySelector('button[aria-label="Testimonial 1"]');
          if (!d) return;
          const slides = [...d.parentElement.previousElementSibling.children];
          window.__t0 = { slide: slides.findIndex((x) => x.classList.contains('[opacity:1]')), dot: [...d.parentElement.children].findIndex((x) => x.classList.contains('w-7')) };
        });`,
    });
    await page.goto(target, 2500);
    const r = {};
    // Отсчёт таймера идёт с монтирования, поэтому снимаем от момента загрузки + запас.
    r.t0 = await page.eval(`window.__t0 ?? null`);
    await wait(page, 5500 - 2500 + 900);
    r.t1 = await page.eval(TESTIMONIAL);
    await page.eval(`document.querySelector('button[aria-label="Testimonial 1"]').click()`);
    await wait(page, 900);
    r.tClick = await page.eval(TESTIMONIAL);
    r.form = await page.eval(FORM);
    await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await page.eval(`window.scrollTo(0, 0)`);
    await wait(page, 800);
    r.menu = await page.eval(MENU);
    r.errors = (await page.eval(`window.__errors ?? []`)).filter((e) => !/figma|runtime/i.test(e) || target === url);
    return r;
  });
}

const [o, t] = [await run(original), await run(url)];
const j = JSON.stringify;

check('отзывы: при загрузке виден первый', t.t0?.slide === 0 && t.t0?.dot === 0, j(t.t0));
check('отзывы: через 5.5 с второй слайд и вторая точка (как в оригинале)', t.t1.slide === 1 && t.t1.dot === 1 && t.t1.author === o.t1.author, `перевод ${j(t.t1)} / оригинал ${j(o.t1)}`);
check('отзывы: клик по первой точке', t.tClick.slide === 0 && t.tClick.dot === 0 && j(t.tClick) === j(o.tClick), `перевод ${j(t.tClick)} / оригинал ${j(o.tClick)}`);
check('мобильное меню: кнопка видна, панель закрыта', t.menu.visible && t.menu.closed.h === o.menu.closed.h && t.menu.closed.h <= 1 && t.menu.closed.o === '0', `перевод ${j(t.menu.closed)} / оригинал ${j(o.menu.closed)} (1px — рамка border-t)`);
check('мобильное меню: раскрывается плавно (промежуточная высота)', t.menu.mid.h > 0 && t.menu.mid.h < t.menu.open.h, `перевод ${j(t.menu.mid)} / оригинал ${j(o.menu.mid)}`);
check('мобильное меню: высота и прозрачность открытой панели как в оригинале', t.menu.open.h === o.menu.open.h && t.menu.open.o === '1', `перевод ${j(t.menu.open)} / оригинал ${j(o.menu.open)}`);
check('мобильное меню: иконка меняется на крестик', /lucide-x/.test(t.menu.open.icon) && /lucide-x/.test(o.menu.open.icon), `перевод ${t.menu.open.icon} / оригинал ${o.menu.open.icon}`);
check('мобильное меню: пункты как в оригинале', j(t.menu.items) === j(o.menu.items), `${j(t.menu.items)} / ${j(o.menu.items)}`);
check('мобильное меню: клик по пункту закрывает и ведёт к разделу', t.menu.afterItem.h === o.menu.afterItem.h && t.menu.afterItem.h <= 1 && /lucide-menu/.test(t.menu.afterItem.icon) && t.menu.hash === '#gallery' && o.menu.hash === '#gallery', `перевод ${j(t.menu.afterItem)} ${t.menu.hash} / оригинал ${j(o.menu.afterItem)}`);
check('форма: отправка не перезагружает страницу, форма остаётся', t.form.sameDocument && t.form.formPresent && o.form.sameDocument, `перевод ${j(t.form)} / оригинал ${j(o.form)}`);
check('нет ошибок скрипта', t.errors.length === 0, j(t.errors));

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не прошло: ${failed} из ${results.length}` : `все ${results.length} проверок прошли`);
process.exitCode = failed ? 1 : 0;
