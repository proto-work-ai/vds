/* Проверка интерактива перевода «оригинал 9» (mockups/tailwind/site-9/app.js).

   node tools/mockups/check-site-9.mjs [translationUrl] [originalUrl]

   Открывает перевод и оригинал в Chrome без окна, прогоняет на обоих одни и те же
   сценарии и сверяет результат: окно записи (ошибки, WhatsApp, экран успеха,
   закрытие), видео, отзывы (таймер, стрелки, точки), «до и после», FAQ и
   мобильное меню. Печатает ✓/✗ по каждому пункту. */
import { withBrowser } from './snapshot.mjs';

const twUrl = process.argv[2] ?? 'http://localhost:4648/tailwind/site-9/';
const origUrl = process.argv[3] ?? 'http://localhost:4549/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const wait = (page, ms) => page.eval(`new Promise((r) => setTimeout(r, ${ms}))`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Общие помощники в странице: оригинал задаёт стили инлайном, перевод — классами,
// поэтому сравниваем вычисленные стили и тексты.
const HELPERS = `
  window.__sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  window.__btn = (text, root = document) => [...root.querySelectorAll('button')].find((b) => b.textContent.trim() === text && b.getBoundingClientRect().width > 0);
  window.__modal = () => [...document.querySelectorAll('div')].find((d) => getComputedStyle(d).position === 'fixed' && getComputedStyle(d).zIndex === '100');
  // Значение поля как у React: через родной сеттер и событие, иначе контролируемое поле его сбросит.
  window.__set = (el, v) => {
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value').set.call(el, v);
    el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
  };
  window.__modalState = () => {
    const m = window.__modal();
    if (!m) return null;
    const dialog = m.firstElementChild;
    return {
      bg: getComputedStyle(m).backgroundColor,
      dialog: { w: Math.round(dialog.getBoundingClientRect().width), bg: getComputedStyle(dialog).backgroundColor },
      errors: [...m.querySelectorAll('form p')].filter((p) => getComputedStyle(p).color === 'rgb(192, 57, 43)').map((p) => p.textContent),
      redBorders: [...m.querySelectorAll('input, select')].filter((i) => getComputedStyle(i).borderTopColor === 'rgb(192, 57, 43)').length,
      select: m.querySelector('select') ? { img: decodeURIComponent(getComputedStyle(m.querySelector('select')).backgroundImage).slice(0, 60), appearance: getComputedStyle(m.querySelector('select')).appearance } : null,
      title: m.querySelector('h3')?.textContent ?? m.querySelector('h2')?.textContent,
      bodyOverflow: getComputedStyle(document.body).overflow,
    };
  };
`;

const SCENARIO = {
  modal: `(async () => {
    window.open = (u) => { window.__opened = u; };
    const r = {};
    window.__btn('Book Free Consultation').click();
    await __sleep(400);
    r.opened = __modalState();
    __modal().querySelector('button[type=submit]').click();
    await __sleep(300);
    r.errors = __modalState();
    const m = __modal();
    __set(m.querySelector('input[type=text]'), 'Test');
    __set(m.querySelector('input[type=tel]'), '123');
    __set(m.querySelector('input[type=email]'), 'a@b.c');
    __set(m.querySelector('select'), 'Roman Blinds');
    __set(m.querySelector('textarea'), 'Hi');
    await __sleep(100);
    m.querySelector('button[type=submit]').click();
    await __sleep(300);
    r.success = __modalState();
    r.whatsapp = window.__opened ?? null;
    __btn('Close', __modal()).click();
    await __sleep(600);
    r.closed = __modalState();
    r.overflowAfter = getComputedStyle(document.body).overflow;
    // Закрытие по фону и повторное открытие — снова пустая форма.
    window.__btn('Book Consultation').click();
    await __sleep(400);
    r.reopened = __modalState();
    __modal().querySelector('form').parentElement.click();
    await __sleep(200);
    r.dialogClickKeeps = !!__modal();
    __modal().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await __sleep(300);
    r.backdropCloses = !__modal();
    return r;
  })()`,
  video: `(async () => {
    const r = {};
    document.querySelector('button[aria-label="Play video"]').click();
    await __sleep(300);
    const o = [...document.querySelectorAll('div')].find((d) => getComputedStyle(d).position === 'fixed' && getComputedStyle(d).zIndex === '50' && d.textContent.includes('Video content'));
    r.open = o ? { bg: getComputedStyle(o).backgroundColor, text: o.textContent.trim(), w: Math.round(o.firstElementChild.getBoundingClientRect().width) } : null;
    o?.firstElementChild.click();
    await __sleep(200);
    r.innerKeeps = !!document.querySelector('button[aria-label="Close video"]');
    document.querySelector('button[aria-label="Close video"]')?.click();
    await __sleep(300);
    r.closed = !document.querySelector('button[aria-label="Close video"]');
    return r;
  })()`,
  testimonial: `(() => {
    const bq = document.querySelector('blockquote');
    const card = bq.parentElement;
    const dots = [...card.nextElementSibling.querySelectorAll('button[aria-label^="Testimonial "]')];
    return {
      quote: bq.textContent.slice(0, 30),
      name: card.querySelector('.text-left p').textContent,
      avatar: card.querySelector('img').getAttribute('src').split('/').pop(),
      dots: dots.map((d) => getComputedStyle(d).width + ' ' + getComputedStyle(d).backgroundColor),
    };
  })()`,
  faq: `(async () => {
    const btns = [...document.querySelectorAll('button')].filter((b) => b.classList.contains('py-5') && b.nextElementSibling);
    const state = () => btns.map((b) => ({ rot: getComputedStyle(b.lastElementChild).transform, h: Math.round(b.nextElementSibling.getBoundingClientRect().height) }));
    const r = { count: btns.length, s0: state() };
    btns[1].click(); await __sleep(700); r.s1 = state();
    btns[3].click(); await __sleep(700); r.s2 = state();
    btns[3].click(); await __sleep(700); r.s3 = state();
    return r;
  })()`,
  compare: `(async () => {
    const box = document.querySelector('.cursor-col-resize');
    box.scrollIntoView({ block: 'center' });
    await __sleep(1200);
    const rect = box.getBoundingClientRect();
    const imgs = box.querySelectorAll(':scope > img');
    const after = [...box.children].find((el) => el.textContent.trim() === 'After');
    const read = () => ({ clip: getComputedStyle(imgs[1]).clipPath, handle: Math.round(box.lastElementChild.getBoundingClientRect().left - rect.left), label: getComputedStyle(after).opacity });
    const r = { start: read() };
    const y = rect.top + rect.height / 2;
    box.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: rect.left + rect.width * 0.3, clientY: y }));
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: rect.left + rect.width * 0.05, clientY: y }));
    window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    await __sleep(500);
    r.dragged = read();
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: rect.left + rect.width * 0.8, clientY: y }));
    await __sleep(100);
    r.afterRelease = read();
    return r;
  })()`,
  menu: `(async () => {
    const nav = document.querySelector('nav');
    const t = nav.querySelector('button[aria-label="Toggle menu"]');
    const icon = () => t.querySelector('svg').getAttribute('class');
    const r = { before: { icon: icon(), visible: t.getBoundingClientRect().width > 0 } };
    t.click(); await __sleep(300);
    const panel = nav.lastElementChild;
    r.open = { icon: icon(), items: [...panel.querySelectorAll('a')].map((a) => a.textContent), h: Math.round(panel.getBoundingClientRect().height), bg: getComputedStyle(panel).backgroundColor };
    __btn('Book Consultation', panel).click(); await __sleep(300);
    r.bookFromMenu = !!__modal();
    __modal().querySelector('button[aria-label="Close"]').click(); await __sleep(300);
    t.click(); await __sleep(300);
    r.closed = { icon: icon(), children: nav.children.length };
    return r;
  })()`,
};

async function run(url) {
  return withBrowser(async (page) => {
    // Ошибки собираем с самого начала загрузки — иначе падение app.js не видно.
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errors = [];
        window.addEventListener('error', (e) => window.__errors.push(String(e.message) + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno));
        window.addEventListener('unhandledrejection', (e) => window.__errors.push('promise: ' + String(e.reason)));
        window.__t0 = Date.now();
        // Таймер отзывов у страниц идёт в разной фазе (разное время загрузки), поэтому
        // пишем каждую смену отзыва со временем и сверяем порядок и шаг, а не момент.
        window.__quotes = [];
        // Пока документ разбирается, в переводе виден статичный снимок — это ещё не работа скрипта.
        const logQuote = () => {
          if (document.readyState === 'loading') return;
          const q = document.querySelector('blockquote')?.textContent.slice(1, 12);
          if (q && window.__quotes.at(-1)?.q !== q) window.__quotes.push({ q, t: Date.now() - window.__t0 });
        };
        document.addEventListener('DOMContentLoaded', logQuote);
        new MutationObserver(logQuote).observe(document, { childList: true, subtree: true, characterData: true });`,
    });
    const r = {};
    await page.goto(url, 1500);
    await page.eval(HELPERS);
    r.modal = await page.eval(SCENARIO.modal);
    r.video = await page.eval(SCENARIO.video);
    // Отзывы: ждём очередного тика таймера и сразу жмём стрелки и точки — до следующего тика 5,2 с.
    // Два тика таймера без вмешательства — по ним видно порядок и шаг; журнал берём до кликов.
    await page.eval(`new Promise((res) => { const i = setInterval(() => { if (window.__quotes.length >= 3) { clearInterval(i); res(); } }, 20); })`);
    r.quotes = await page.eval(`window.__quotes.slice(0, 3)`);
    const idxNow = `['Sarah', 'James', 'Leila'].findIndex((n) => document.querySelector('blockquote').parentElement.querySelector('.text-left p').textContent.startsWith(n))`;
    r.tStart = await page.eval(idxNow);
    await page.eval(`document.querySelector('button[aria-label="Next testimonial"]').click()`);
    await wait(page, 400);
    r.tNext = await page.eval(SCENARIO.testimonial);
    await page.eval(`document.querySelector('button[aria-label="Previous testimonial"]').click()`);
    await wait(page, 50);
    await page.eval(`document.querySelector('button[aria-label="Previous testimonial"]').click()`);
    await wait(page, 400);
    r.tPrev = await page.eval(SCENARIO.testimonial);
    await page.eval(`document.querySelector('button[aria-label="Testimonial 3"]').click()`);
    await wait(page, 400);
    r.tDot = await page.eval(SCENARIO.testimonial);
    r.faq = await page.eval(SCENARIO.faq);
    r.compare = await page.eval(SCENARIO.compare);
    await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await page.eval(`window.scrollTo(0, 0)`);
    await wait(page, 800);
    r.menu = await page.eval(SCENARIO.menu);
    r.errors = await page.eval(`window.__errors ?? []`);
    return r;
  });
}

const tw = await run(twUrl);
const orig = await run(origUrl);
const pair = (a, b) => `${JSON.stringify(a)} / оригинал ${JSON.stringify(b)}`;
const idx = (t) => ['Sarah', 'James', 'Leila'].findIndex((n) => t.name.startsWith(n));

check('запись: окно открывается кнопкой первого экрана, фон и ширина как в оригинале', tw.modal.opened && same(tw.modal.opened, orig.modal.opened), pair(tw.modal.opened, orig.modal.opened));
check('запись: пустая отправка — ошибки у имени, телефона и услуги', tw.modal.errors?.errors.length === 3 && same(tw.modal.errors, orig.modal.errors), pair(tw.modal.errors, orig.modal.errors));
check('запись: заполненная форма открывает WhatsApp с тем же текстом', !!tw.modal.whatsapp && tw.modal.whatsapp === orig.modal.whatsapp, pair(tw.modal.whatsapp, orig.modal.whatsapp));
check('запись: экран «WhatsApp Opened!»', tw.modal.success?.title === 'WhatsApp Opened!' && same(tw.modal.success, orig.modal.success), pair(tw.modal.success, orig.modal.success));
check('запись: «Close» закрывает окно и возвращает прокрутку', tw.modal.closed === null && tw.modal.overflowAfter === orig.modal.overflowAfter, pair([tw.modal.closed, tw.modal.overflowAfter], [orig.modal.closed, orig.modal.overflowAfter]));
check('запись: кнопка шапки открывает чистую форму', same(tw.modal.reopened, orig.modal.reopened), pair(tw.modal.reopened, orig.modal.reopened));
check('запись: клик внутри окна не закрывает, по фону — закрывает', tw.modal.dialogClickKeeps && tw.modal.backdropCloses && orig.modal.dialogClickKeeps && orig.modal.backdropCloses, pair([tw.modal.dialogClickKeeps, tw.modal.backdropCloses], [orig.modal.dialogClickKeeps, orig.modal.backdropCloses]));
check('видео: окно-заглушка как в оригинале', !!tw.video.open && same(tw.video.open, orig.video.open), pair(tw.video.open, orig.video.open));
check('видео: клик по кадру не закрывает, крестик закрывает', tw.video.innerKeeps && tw.video.closed, JSON.stringify(tw.video));
const firstQuotes = (r) => r.quotes.slice(0, 3).map((x) => x.q);
const steps = (r) => r.quotes.slice(0, 3).map((x, i, a) => (i ? x.t - a[i - 1].t : 0)).slice(1);
check('отзывы: при загрузке первый отзыв, затем по порядку (как в оригинале)', same(firstQuotes(tw), firstQuotes(orig)) && firstQuotes(tw)[0] === 'SanCurtains', pair(tw.quotes.slice(0, 3), orig.quotes.slice(0, 3)));
check('отзывы: смена по таймеру каждые 5,2 с', steps(tw).length === 2 && steps(tw).every((d) => Math.abs(d - 5200) < 250), pair(steps(tw), steps(orig)));
const shift = (r, t, k) => idx(t) === (r.tStart + k + 3) % 3;
check('отзывы: стрелка вперёд — следующий отзыв, точки как в оригинале', shift(tw, tw.tNext, 1) && shift(orig, orig.tNext, 1) && same(tw.tNext.dots, orig.tNext.dots) === (tw.tStart === orig.tStart), pair(tw.tNext, orig.tNext));
check('отзывы: стрелка назад дважды — на один назад от исходного', shift(tw, tw.tPrev, -1) && shift(orig, orig.tPrev, -1), pair(tw.tPrev, orig.tPrev));
check('отзывы: точка 3 — отзыв, ширина и цвет точек', idx(tw.tDot) === 2 && same(tw.tDot, orig.tDot), pair(tw.tDot, orig.tDot));
check('FAQ: сначала все закрыты', tw.faq.count === 5 && same(tw.faq.s0, orig.faq.s0), pair(tw.faq.s0, orig.faq.s0));
check('FAQ: открытие второго — поворот и высота', same(tw.faq.s1, orig.faq.s1), pair(tw.faq.s1, orig.faq.s1));
check('FAQ: открытие четвёртого закрывает второй', same(tw.faq.s2, orig.faq.s2), pair(tw.faq.s2, orig.faq.s2));
check('FAQ: повторный клик закрывает', same(tw.faq.s3, orig.faq.s3), pair(tw.faq.s3, orig.faq.s3));
check('до и после: начальное положение', same(tw.compare.start, orig.compare.start), pair(tw.compare.start, orig.compare.start));
check('до и после: перетаскивание к краю (упор 3%, «After» скрыт)', same(tw.compare.dragged, orig.compare.dragged), pair(tw.compare.dragged, orig.compare.dragged));
check('до и после: после отпускания ручка не двигается', same(tw.compare.afterRelease, orig.compare.afterRelease), pair(tw.compare.afterRelease, orig.compare.afterRelease));
check('мобильное меню: кнопка видна', tw.menu.before.visible && same(tw.menu.before, orig.menu.before), pair(tw.menu.before, orig.menu.before));
check('мобильное меню: пункты, высота, фон, крестик', same(tw.menu.open, orig.menu.open), pair(tw.menu.open, orig.menu.open));
check('мобильное меню: «Book Consultation» открывает запись', tw.menu.bookFromMenu && orig.menu.bookFromMenu, pair(tw.menu.bookFromMenu, orig.menu.bookFromMenu));
check('мобильное меню: закрывается', same(tw.menu.closed, orig.menu.closed), pair(tw.menu.closed, orig.menu.closed));
check('нет ошибок скрипта', tw.errors.length === 0, JSON.stringify(tw.errors));

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не прошло: ${failed} из ${results.length}` : `все ${results.length} проверок прошли`);
process.exitCode = failed ? 1 : 0;
