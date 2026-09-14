/* Проверка анимаций и поведения лендинга mockups/landing-2 против оригинала 2.

   node tools/mockups/check-landing-2-motion.mjs [originalUrl] [translationUrl]

   По умолчанию оригинал http://localhost:4332/, перевод http://localhost:4320/landing-2/.
   Методика как в check-landing-1-motion.mjs: один сценарий (загрузка, прокрутка,
   наведение через CDP, клики, таймеры) на обеих страницах, на каждом кадре
   пишутся computed-стили, по записи считаются задержка, длительность, прогресс
   в середине и конечное значение. Печатает ✓/✗, код выхода 1 при ошибках. */
import { withBrowser } from './snapshot.mjs';

const ORIG = process.argv[2] ?? 'http://localhost:4332/';
const TW = process.argv[3] ?? 'http://localhost:4320/landing-2/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (ok, name, extra = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

// ---------- поиск элементов: одинаковые выражения для обеих страниц ----------
const FIND = `(() => {
  const txt = (sel, t) => [...document.querySelectorAll(sel)].find((e) => e.textContent.trim() === t);
  const hero = () => document.getElementById('home');
  const heroBox = () => hero()?.querySelector('h1')?.parentElement;
  const dots = (sec, n) => [...sec.children].find((el) => el.children.length === n && [...el.children].every((c) => c.tagName === 'BUTTON'));
  const testi = () => txt('h2', 'What Our Clients Say')?.closest('section');
  const testiCard = () => testi()?.querySelector('blockquote')?.parentElement;
  const nav = () => document.querySelector('nav');
  let lb = null;
  return {
    nav,
    logo: () => nav().querySelector('img').parentElement,
    navLink: () => txt('nav .hidden-mobile button', 'Gallery'),
    navUnder: () => txt('nav .hidden-mobile button', 'Gallery').querySelector('span'),
    navQuote: () => nav().querySelector('.luxury-btn'),
    burger: () => nav().querySelector('.mobile-menu-btn'),
    burgerSpan: (i) => nav().querySelectorAll('.mobile-menu-btn span')[i],
    menuPanel: () => [...nav().children].find((c, i) => i > 0 && c.tagName === 'DIV'),
    heroLayer: (i) => [...hero().children].filter((e) => e.tagName === 'DIV' && e.querySelector(':scope > img'))[i],
    heroImg: (i) => [...hero().children].filter((e) => e.tagName === 'DIV' && e.querySelector(':scope > img'))[i].querySelector('img'),
    heroPart: (i) => heroBox().children[i],
    heroStats: () => document.querySelector('.hero-stats'),
    heroDot: (i) => dots(hero(), 3).children[i],
    scrollFloat: () => txt('#home span', 'Scroll').parentElement,
    explore: () => txt('#home button', 'Explore Collections'),
    consult: () => txt('#home button', 'Get Free Consultation'),
    marquee: () => txt('span', '✦ Custom Measurements').parentElement,
    collHead: () => document.querySelector('#collections .reveal-item'),
    collCard: (i) => document.querySelector('.collections-grid').children[i],
    collImg: (i) => document.querySelector('.collections-grid').children[i].querySelector('img'),
    collInfo: (i) => document.querySelector('.collections-grid').children[i].children[2],
    collDesc: (i) => document.querySelector('.collections-grid').children[i].querySelector('p'),
    collView: (i) => [...document.querySelector('.collections-grid').children[i].querySelectorAll('span')].find((s) => s.textContent.trim() === 'View →'),
    collBtn: () => document.querySelector('.collections-grid').nextElementSibling,
    aboutLeft: () => document.querySelector('#about .reveal-left'),
    aboutRight: () => document.querySelector('#about .reveal-right'),
    feat: () => txt('#about div', 'Bespoke Service').parentElement,
    statsBar: () => txt('h2', 'The San Curtains Promise').closest('section').querySelector('.reveal-item'),
    promiseHead: () => txt('h2', 'The San Curtains Promise').parentElement,
    reason: (i) => document.querySelector('.reasons-grid').children[i],
    reasonPart: (i, c) => document.querySelector('.reasons-grid').children[i].querySelector('.' + c),
    galleryHead: () => document.querySelector('#gallery .reveal-item'),
    galleryCard: (i) => document.querySelector('.gallery-grid').children[i],
    galleryImg: (i) => document.querySelector('.gallery-grid').children[i].querySelector('img'),
    galleryOverlay: (i) => document.querySelector('.gallery-grid').children[i].querySelector('.gallery-overlay'),
    lightbox: () => (lb && lb.isConnected ? lb : (lb = [...document.querySelectorAll('#gallery > div, body > div')].find((d) => { const s = getComputedStyle(d); return s.position === 'fixed' && s.zIndex === '9999'; }) || null)),
    testiHead: () => txt('h2', 'What Our Clients Say').parentElement,
    testiCard,
    testiName: () => testiCard().querySelector('.font-cinzel'),
    testiDot: (i) => testiCard().nextElementSibling.children[i],
    testiThumb: (i) => testiCard().nextElementSibling.nextElementSibling.children[i],
    contactLeft: () => document.querySelector('#contact .reveal-left'),
    contactRight: () => document.querySelector('#contact .reveal-right'),
    nameInput: () => document.querySelector('#contact input'),
    submit: () => document.querySelector('#contact button[type=submit]'),
    thanks: () => txt('#contact h3', 'Thank You!'),
    footSocial: () => txt('footer div', 'IN'),
    footLink: () => txt('footer span', 'Silk Royale'),
    footBottom: () => txt('footer span', 'Sitemap'),
    toTop: () => document.querySelector('button[title="Back to top"]'),
    stat500: () => txt('#home div', '500+'),
  };
})()`;

const REC = `window.__rec = (specs, ms) => new Promise((res) => {
  const F = window.__F || (window.__F = ${FIND});
  const out = specs.map(() => []);
  const t0 = performance.now();
  const tick = () => {
    const t = performance.now() - t0;
    specs.forEach(([expr, prop], k) => {
      let el = null;
      try { el = new Function('F', 'return ' + expr)(F); } catch {}
      let v = null;
      if (el && el.isConnected) {
        if (prop === 'height') v = String(el.getBoundingClientRect().height);
        else if (prop === 'text') v = el.textContent.trim();
        else if (prop.startsWith('before:')) v = getComputedStyle(el, '::before')[prop.slice(7)];
        else v = getComputedStyle(el)[prop];
      }
      out[k].push([Math.round(t + (window.__abs ? t0 : 0)), v]);
    });
    if (t < ms) requestAnimationFrame(tick); else res(out);
  };
  tick();
});`;

const nums = (v) => {
  if (v == null) return null;
  if (v === 'none') return [1, 0, 0, 1, 0, 0];
  const m = String(v).match(/-?\d*\.?\d+(e-?\d+)?/g)?.map(Number) ?? [];
  if (/^rgb\(/.test(v)) m.push(1);
  return m;
};
const dist = (a, b) => {
  const n = Math.max(a.length, b.length);
  let s = 0;
  for (let i = 0; i < n; i++) s += ((a[i] ?? 0) - (b[i] ?? 0)) ** 2;
  return Math.sqrt(s);
};
function analyze(track) {
  const pts = track.filter(([, v]) => v != null).map(([t, v]) => [t, nums(v), v]);
  if (!pts.length) return { missing: true };
  const v0 = pts[0][1];
  const vEnd = pts[pts.length - 1][1];
  const total = dist(v0, vEnd);
  const final = pts[pts.length - 1][2];
  if (total < 1e-3) return { static: true, final, start: null, dur: 0 };
  const p = pts.map(([t, v]) => [t, dist(v, v0) / total]);
  const s = p.find(([, x]) => x > 0.02);
  let e = p.length - 1;
  while (e > 0 && Math.abs(p[e - 1][1] - 1) < 0.02) e--;
  const start = s[0];
  const end = p[e][0];
  const dur = end - start;
  const midT = start + dur / 2;
  const mid = p.reduce((best, q) => (Math.abs(q[0] - midT) < Math.abs(best[0] - midT) ? q : best))[1];
  return { start, dur, mid: +mid.toFixed(2), final, first: pts[0][2] };
}
const near = (a, b, abs, rel = 0) => Math.abs(a - b) <= Math.max(abs, rel * Math.max(Math.abs(a), Math.abs(b)));
const sameVal = (a, b) => {
  const x = nums(a), y = nums(b);
  if (!x || !y) return a === b;
  return dist(x, y) <= 0.02 * Math.max(1, Math.sqrt(y.reduce((s, q) => s + q * q, 0)) / 10) + 0.02;
};
const fmt = (r) => (r.missing ? 'нет элемента' : r.static ? `без анимации, ${r.final}` : `задержка ${r.start}мс, длит. ${r.dur}мс, середина ${r.mid}, итог ${r.final}`);
function compare(name, o, t, { delay = true, curve = true } = {}) {
  const probs = [];
  if (o.missing || t.missing) probs.push('нет элемента');
  else {
    if (!sameVal(o.final, t.final)) probs.push('итог');
    // Мгновенный скачок (без перехода) анимацией не считается.
    const anim = (r) => !r.static && r.dur > 40;
    if (anim(o) !== anim(t)) probs.push('наличие анимации');
    else if (anim(o)) {
      if (!near(o.dur, t.dur, 70, 0.2)) probs.push('длительность');
      if (delay && !near(o.start, t.start, 80, 0.2)) probs.push('задержка');
      if (curve && Math.abs(o.mid - t.mid) > 0.18) probs.push('кривая');
    }
  }
  check(!probs.length, name, (probs.length ? probs.join(', ') + ': ' : '') + `оригинал: ${fmt(o)} | перевод: ${fmt(t)}`);
}
const BASE = (load) => analyze(load[0]).start ?? 0;

// Фаза события относительно периода таймера (мс), по кругу.
const phase = (x, base, P) => (x == null ? null : (((x - base) % P) + P) % P);
const phaseNear = (a, b, P, tol) => a != null && b != null && Math.min(Math.abs(a - b), P - Math.abs(a - b)) <= tol;
const rebase = (r, b) => (r.start == null ? r : { ...r, start: r.start - b });
// Первое изменение текста/значения дорожки (абсолютное время).
const changeAt = (track, from = 0) => {
  const pts = track.filter(([tt, v]) => v != null && tt >= from);
  const f = pts[0]?.[1];
  return pts.find(([, v]) => v !== f)?.[0] ?? null;
};

async function session(url, width, fn, loadSpecs = []) {
  return withBrowser(async (page) => {
    await page.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errs=[];addEventListener('error',e=>{__errs.push(String((e.target&&(e.target.src||e.target.href))||e.message))},true);
        document.addEventListener('DOMContentLoaded',()=>{document.documentElement.style.scrollBehavior='auto'});const __ce=console.error;console.error=(...a)=>{__errs.push(a.join(' '));__ce(...a)};
        ${REC}
        (function poll(){try{const F=window.__F||(window.__F=${FIND});const el=F.heroPart(0);if(el&&getComputedStyle(el).animationName!=='none'){window.__base=performance.now();return;}}catch(e){}setTimeout(poll,10)})();
        window.__abs = true;
        window.__load = __rec(${JSON.stringify(loadSpecs)}, 2600).then((r) => { window.__abs = false; return r; });`,
    });
    const api = {
      page,
      goto: (settle = 300) => page.goto(url, settle),
      eval: (e) => page.eval(e),
      rec: (specs, ms) => page.eval(`__rec(${JSON.stringify(specs)}, ${ms})`),
      recAbs: (specs, ms) => page.eval(`(async () => { window.__abs = true; const r = await __rec(${JSON.stringify(specs)}, ${ms}); window.__abs = false; return r; })()`),
      async recWhile(specs, ms, action) {
        await page.eval(`window.__cur = __rec(${JSON.stringify(specs)}, ${ms}); 0`);
        await action();
        return page.eval('window.__cur');
      },
      until: (ms) => page.eval(`new Promise((r) => setTimeout(r, Math.max(0, ${ms} - performance.now())))`),
      // Ждать до момента «монтирование страницы + ms» (у перевода load приходит позже из-за внешних фото).
      // Момент старта анимаций страницы (у перевода Tailwind CDN может грузиться долго).
      base: () => page.eval('new Promise((r) => { const w = () => (window.__base != null ? r(window.__base) : setTimeout(w, 50)); w(); })'),
      async untilBase(ms) { await api.until((await api.base()) + ms); },
      async center(expr) {
        return page.eval(`(() => { const F = window.__F || (window.__F = ${FIND}); const el = ${expr}; const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; })()`);
      },
      async scrollTo(expr, offset = 100) {
        await page.eval(`(() => { const F = window.__F || (window.__F = ${FIND}); const el = ${expr}; window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - ${offset}, behavior: 'instant' }); })()`);
      },
      mouse: (x, y) => page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }),
      async click(expr) {
        const [x, y] = await api.center(expr);
        await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
        await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
        await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
      },
    };
    return fn(api);
  });
}
async function both(width, fn, loadSpecs) {
  const run = async (url) => {
    for (let i = 0; ; i++) {
      try {
        return await session(url, width, fn, loadSpecs);
      } catch (e) {
        if (i < 4 && /EBUSY|DevToolsActivePort|ECONNREFUSED|ENOENT/.test(String(e))) { await sleep(1500); continue; }
        throw e;
      }
    }
  };
  return { o: await run(ORIG), t: await run(TW) };
}

const HOVERS = [
  ['Шапка: пункт меню — цвет', 'F.navLink()', [['F.navLink()', 'color'], ['F.navUnder()', 'width']], 600],
  ['Шапка: Get Quote', 'F.navQuote()', [['F.navQuote()', 'color'], ['F.navQuote()', 'before:transform']], 700],
  ['Первый экран: Explore Collections', 'F.explore()', [['F.explore()', 'transform'], ['F.explore()', 'boxShadow']], 600],
  ['Первый экран: Get Free Consultation', 'F.consult()', [['F.consult()', 'color'], ['F.consult()', 'before:transform']], 700],
  ['Коллекции: карточка', 'F.collCard(1)', [['F.collCard(1)', 'transform'], ['F.collCard(1)', 'boxShadow'], ['F.collImg(1)', 'transform'], ['F.collInfo(1)', 'transform'], ['F.collDesc(1)', 'opacity'], ['F.collDesc(1)', 'maxHeight'], ['F.collView(1)', 'opacity']], 1000],
  ['Коллекции: наведение на надпись карточки', 'F.collView(4)', [['F.collCard(4)', 'transform'], ['F.collImg(4)', 'transform'], ['F.collView(4)', 'opacity']], 1000],
  ['О нас: карточка преимущества', 'F.feat()', [['F.feat()', 'borderTopColor'], ['F.feat()', 'backgroundColor']], 600],
  ['Галерея: карточка', 'F.galleryCard(2)', [['F.galleryImg(2)', 'transform'], ['F.galleryOverlay(2)', 'opacity']], 900],
  ['Причины: карточка', 'F.reason(1)', [['F.reason(1)', 'backgroundColor'], ['F.reasonPart(1, "reason-title")', 'color'], ['F.reasonPart(1, "reason-desc")', 'color'], ['F.reasonPart(1, "reason-icon")', 'color']], 700],
  ['Заявка: кнопка отправки', 'F.submit()', [['F.submit()', 'transform'], ['F.submit()', 'boxShadow']], 600],
  ['Подвал: соцсеть', 'F.footSocial()', [['F.footSocial()', 'backgroundColor'], ['F.footSocial()', 'color']], 600],
  ['Подвал: ссылка', 'F.footLink()', [['F.footLink()', 'color']], 600],
  ['Подвал: нижняя ссылка', 'F.footBottom()', [['F.footBottom()', 'color']], 600],
  ['Кнопка «наверх»', 'F.toTop()', [['F.toTop()', 'backgroundColor'], ['F.toTop()', 'color']], 600],
];

const LOAD = [
  ['F.heroPart(0)', 'opacity'], ['F.heroPart(0)', 'transform'],
  ['F.heroPart(1)', 'opacity'], ['F.heroPart(2)', 'opacity'],
  ['F.heroPart(3)', 'width'], ['F.heroPart(4)', 'opacity'], ['F.heroPart(5)', 'opacity'],
  ['F.heroStats()', 'opacity'], ['F.heroStats()', 'transform'],
];

// ================= десктоп 1440 =================
const desk = await both(1440, async (s) => {
  const r = {};
  await s.goto(300);
  r.load = await s.eval('window.__load');
  r.base = await s.base();

  // Бесконечные: бегущая строка, пульс логотипа, «Scroll».
  r.inf = await s.rec([['F.marquee()', 'transform'], ['F.logo()', 'boxShadow'], ['F.scrollFloat()', 'transform']], 3000);

  // Таймеры: отзывы (5 с) и первый экран (6 с) — от загрузки страницы.
  await s.untilBase(4600);
  r.auto = await s.recAbs([
    ['F.heroLayer(0)', 'opacity'], ['F.heroLayer(1)', 'opacity'], ['F.heroPart(1)', 'opacity'], ['F.heroDot(1)', 'width'], ['F.heroPart(1)', 'text'],
    ['F.testiCard()', 'opacity'], ['F.testiDot(1)', 'width'], ['F.testiThumb(1)', 'opacity'], ['F.testiName()', 'text'], ['F.heroImg(1)', 'transform'],
  ], 6500);

  // Появление при прокрутке — снизу вверх, чтобы блок появлялся впервые.
  r.reveal = {};
  const plan = [
    ['Заявка: колонки', 'F.contactLeft()', 150, [['F.contactLeft()', 'opacity'], ['F.contactRight()', 'opacity'], ['F.contactLeft()', 'transform'], ['F.contactRight()', 'transform']]],
    ['Отзывы: заголовок', 'F.testiHead()', 250, [['F.testiHead()', 'opacity'], ['F.testiHead()', 'transform']]],
    ['Галерея: карточки', 'F.galleryCard(0)', 60, [0, 1, 2, 3, 4].map((i) => [`F.galleryCard(${i})`, 'opacity']).concat([['F.galleryCard(0)', 'transform']])],
    ['Причины: карточки', 'F.reason(0)', 60, [0, 1, 2, 3].map((i) => [`F.reason(${i})`, 'opacity'])],
    ['Причины: заголовок и цифры', 'F.statsBar()', 120, [['F.statsBar()', 'opacity'], ['F.promiseHead()', 'opacity']]],
    ['О нас: колонки', 'F.aboutLeft()', 120, [['F.aboutLeft()', 'opacity'], ['F.aboutLeft()', 'transform'], ['F.aboutRight()', 'opacity'], ['F.aboutRight()', 'transform']]],
    ['Коллекции: карточки', 'F.collCard(0)', 60, [0, 1, 2, 3].map((i) => [`F.collCard(${i})`, 'opacity']).concat([['F.collCard(0)', 'transform'], ['F.collBtn()', 'opacity']])],
    ['Коллекции: заголовок', 'F.collHead()', 250, [['F.collHead()', 'opacity'], ['F.collHead()', 'transform']]],
  ];
  for (const [name, expr, off, specs] of plan) {
    await s.scrollTo(expr, off);
    r.reveal[name] = await s.rec(specs, 1600);
  }

  // Прокручиваем всё, чтобы появления закончились.
  await s.eval(`(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}})()`);
  await sleep(1200);
  await s.eval('scrollTo(0,0)');
  await sleep(700);
  r.navScroll = await s.recWhile([['F.nav()', 'backgroundColor'], ['F.nav()', 'paddingTop']], 900, () => s.eval('scrollTo(0, 400)'));

  r.hover = {};
  for (const [name, target, specs, ms] of HOVERS) {
    await s.scrollTo(target, 350);
    await s.mouse(700, 2);
    if (/explore|consult/.test(target)) await s.eval(`new Promise((res) => { const F = window.__F; const f = F.heroPart(1).textContent; const t0 = performance.now(); const w = () => (F.heroPart(1).textContent !== f || performance.now() - t0 > 6500 ? res() : setTimeout(w, 30)); w(); })`);
    await sleep(800);
    const [x, y] = await s.center(target);
    const on = await s.recWhile(specs, ms, () => s.mouse(x, y));
    const off = await s.recWhile(specs, ms, () => s.mouse(700, 2));
    r.hover[name] = { on, off };
  }

  // Галерея: просмотр фото.
  await s.scrollTo('F.galleryCard(1)', 300);
  r.lightbox = await s.recWhile([['F.lightbox()', 'opacity']], 600, () => s.click('F.galleryCard(1)'));
  r.lightboxImg = await s.eval(`(() => { const F = window.__F; const b = F.lightbox(); return b ? b.querySelector('img').getAttribute('alt') + ' | ' + b.textContent.trim().slice(0, 40) : null; })()`);
  await s.eval(`(() => { const F = window.__F; const b = F.lightbox(); const next = [...b.querySelectorAll('button')].find((x) => x.textContent.trim() === '›'); next.click(); })()`);
  await sleep(100);
  r.lightboxNext = await s.eval(`window.__F.lightbox()?.querySelector('img')?.getAttribute('alt')`);
  await s.eval(`(() => { const b = window.__F.lightbox(); [...b.querySelectorAll('button')].find((x) => x.textContent.trim() === '×').click(); })()`);
  await sleep(100);
  r.lightboxClosed = await s.eval(`!window.__F.lightbox()`);

  // Отзывы: клик по миниатюре.
  await s.scrollTo('F.testiThumb(3)', 500);
  // Миниатюра через одну от активной — клик всегда меняет отзыв, независимо от фазы таймера.
  await s.eval(`window.__ti = ([0, 1, 2, 3].find((i) => getComputedStyle(window.__F.testiThumb(i)).opacity === '1') + 2) % 4`);
  r.thumbClick = await s.recWhile([['F.testiCard()', 'opacity'], ['F.testiDot(window.__ti)', 'width'], ['F.testiThumb(window.__ti)', 'opacity'], ['F.testiName()', 'text']], 900, () => s.click('F.testiThumb(window.__ti)'));

  // Форма: фокус и отправка.
  await s.scrollTo('F.nameInput()', 400);
  r.focus = await s.recWhile([['F.nameInput()', 'borderTopColor']], 500, () => s.eval('document.querySelector("#contact input").focus()'));
  await s.eval(`(() => { const setV = (el, v) => { const d = Object.getOwnPropertyDescriptor(el.constructor.prototype, 'value'); d.set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); }; const [a, b] = document.querySelectorAll('#contact input'); setV(a, 'Test'); setV(b, '123'); })()`);
  r.thanks = await s.recWhile([['F.thanks()', 'opacity'], ['F.thanks()', 'text']], 500, () => s.eval('document.querySelector("#contact form").requestSubmit()'));
  await s.eval(`[...document.querySelectorAll('#contact button')].find((b) => /Send Another/.test(b.textContent)).click()`);
  await sleep(200);
  r.formBack = await s.eval(`!!document.querySelector('#contact form')`);

  r.errs = await s.eval('window.__errs');
  r.broken = await s.eval('[...document.images].filter((i) => i.naturalWidth === 0).map((i) => i.src)');
  return r;
}, LOAD);

// Первый экран: клик по точке и следующая автоматическая смена.
const dotRun = await both(1440, async (s) => {
  const r = {};
  await s.goto(300);
  r.load = await s.eval('window.__load');
  r.base = await s.base();
  await s.untilBase(2500);
  r.click = await s.recWhile([['F.heroLayer(2)', 'opacity'], ['F.heroDot(2)', 'width'], ['F.heroPart(1)', 'opacity']], 1800, () => s.click('F.heroDot(2)'));
  r.next = await s.recAbs([['F.heroPart(1)', 'text']], 7000);
  return r;
}, [['F.heroPart(0)', 'opacity']]);

// ================= телефон 375 / 320 =================
const mob = await both(375, async (s) => {
  const r = {};
  await s.goto(1500);
  r.open = await s.recWhile([['F.menuPanel()', 'opacity'], ['F.menuPanel()', 'transform'], ['F.burgerSpan(0)', 'transform'], ['F.burgerSpan(1)', 'transform']], 700, () => s.click('F.burger()'));
  await s.eval(`[...window.__F.menuPanel().querySelectorAll('button')].find((b) => b.textContent.trim() === 'Gallery').click()`);
  await sleep(1500);
  r.afterNav = await s.eval(`({ menu: !!window.__F.menuPanel(), y: Math.round(document.getElementById('gallery').getBoundingClientRect().top) })`);
  r.errs = await s.eval('window.__errs');
  return r;
});
const narrow = await withBrowser(async (page) => {
  await page.send('Emulation.setDeviceMetricsOverride', { width: 320, height: 640, deviceScaleFactor: 1, mobile: true });
  await page.goto(TW, 1500);
  const box = (e) => `(() => { const F = ${FIND}; const el = ${e}; if (!el) return null; const s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return null; const r = el.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; })()`;
  const r = {};
  for (const y of [0, 200, 400]) {
    await page.eval(`scrollTo(0, ${y})`);
    await sleep(500);
    r[y] = { btn: await page.eval(box('F.toTop()')), stat: await page.eval(box('F.stat500()')) };
  }
  await page.eval('scrollTo(0, 2500)');
  await sleep(600);
  r.later = await page.eval(box('F.toTop()'));
  return r;
});

// ================= отчёт =================
const { o, t } = desk;
console.log('\n== Загрузка страницы (1440) ==');
{
  const L = ['Первый экран: подпись (opacity)', 'Первый экран: подпись (сдвиг слева)', 'Первый экран: заголовок 1', 'Первый экран: заголовок 2 (delay 0.25)', 'Первый экран: линия (ширина, delay 0.4)', 'Первый экран: текст (delay 0.45)', 'Первый экран: кнопки (delay 0.6)', 'Первый экран: цифры (opacity, delay 0.8)', 'Первый экран: цифры (сдвиг справа)'];
  const lo = o.load.map(analyze), lt = t.load.map(analyze);
  const bo = lo[0].start ?? 0, bt = lt[0].start ?? 0;
  L.forEach((name, i) => compare(name, rebase(lo[i], bo), rebase(lt[i], bt)));
}

console.log('\n== Бесконечные анимации ==');
{
  const tx = (tr) => tr.filter(([, v]) => v).map(([tt, v]) => [tt, nums(v)[4]]);
  const speed = (tr) => { const p = tx(tr); return p.length > 1 ? (p.at(-1)[1] - p[0][1]) / ((p.at(-1)[0] - p[0][0]) / 1000) : 0; };
  const so = speed(o.inf[0]), st = speed(t.inf[0]);
  check(near(so, st, 3, 0.1), 'Бегущая строка: скорость', `оригинал ${so.toFixed(1)} px/с | перевод ${st.toFixed(1)} px/с`);
  const spread = (tr, idx) => { const v = tr.filter(([, x]) => x).map(([, x]) => nums(x)[idx] ?? 0); return Math.max(...v) - Math.min(...v); };
  const po = spread(o.inf[1], 7), pt = spread(t.inf[1], 7);
  check(near(po, pt, 1.5), 'Логотип: пульс (размах тени)', `оригинал ${po.toFixed(1)} | перевод ${pt.toFixed(1)}`);
  const fo = spread(o.inf[2], 5), ft = spread(t.inf[2], 5);
  check(near(fo, ft, 1.5), 'Scroll: покачивание (размах)', `оригинал ${fo.toFixed(1)}px | перевод ${ft.toFixed(1)}px`);
}

console.log('\n== Таймеры (1440) ==');
{
  const bo = o.base, bt = t.base;
  const names = ['Первый экран: старый слайд гаснет', 'Первый экран: новый слайд проявляется', 'Первый экран: заголовок проигрывается заново', 'Первый экран: активная точка'];
  const ho = changeAt(o.auto[4]), ht = changeAt(t.auto[4]);
  check(phaseNear(phase(ho, bo, 6000), phase(ht, bt, 6000), 6000, 400), 'Первый экран: смена слайда раз в 6 с от загрузки (фаза)', `оригинал ${phase(ho, bo, 6000)}мс | перевод ${phase(ht, bt, 6000)}мс`);
  names.forEach((n, i) => {
    const cut = (tr, h) => tr.filter(([tt]) => h == null || (tt >= h - 100 && tt <= h + 2200));
    compare(n, analyze(cut(o.auto[i], ho)), analyze(cut(t.auto[i], ht)), { delay: false });
  });
  compare('Первый экран: медленный зум нового фото (8 с)', analyze(o.auto[9].filter(([tt]) => ho == null || tt >= ho - 100)), analyze(t.auto[9].filter(([tt]) => ht == null || tt >= ht - 100)), { delay: false, curve: false });
  const to = changeAt(o.auto[8]), tt2 = changeAt(t.auto[8]);
  check(phaseNear(phase(to, bo, 5000), phase(tt2, bt, 5000), 5000, 400), 'Отзывы: смена раз в 5 с от загрузки (фаза)', `оригинал ${phase(to, bo, 5000)}мс | перевод ${phase(tt2, bt, 5000)}мс`);
  const cutT = (tr, h) => tr.filter(([x]) => h == null || (x >= h - 50 && x <= h + 1500));
  compare('Отзывы: карточка проявляется заново (fadeIn 0.7)', analyze(cutT(o.auto[5], to)), analyze(cutT(t.auto[5], tt2)), { delay: false });
  compare('Отзывы: активная точка', analyze(cutT(o.auto[6], to)), analyze(cutT(t.auto[6], tt2)), { delay: false });
  compare('Отзывы: активная миниатюра', analyze(cutT(o.auto[7], to)), analyze(cutT(t.auto[7], tt2)), { delay: false });
}
{
  const bo = dotRun.o.base, bt = dotRun.t.base;
  compare('Первый экран: клик по точке — слайд', analyze(dotRun.o.click[0]), analyze(dotRun.t.click[0]), { delay: false });
  compare('Первый экран: клик по точке — точка', analyze(dotRun.o.click[1]), analyze(dotRun.t.click[1]), { delay: false });
  compare('Первый экран: клик по точке — заголовок заново', analyze(dotRun.o.click[2]), analyze(dotRun.t.click[2]), { delay: false });
  const no = changeAt(dotRun.o.next[0]), nt = changeAt(dotRun.t.next[0]);
  check(phaseNear(phase(no, bo, 6000), phase(nt, bt, 6000), 6000, 400), 'Первый экран: клик не сбрасывает таймер (фаза следующей смены)', `оригинал ${phase(no, bo, 6000)}мс | перевод ${phase(nt, bt, 6000)}мс`);
}

console.log('\n== Появление при прокрутке (1440) ==');
for (const name of Object.keys(o.reveal)) {
  const ro = o.reveal[name].map(analyze), rt = t.reveal[name].map(analyze);
  const b0 = ro[0].start ?? 0, b1 = rt[0].start ?? 0;
  const specs = plan2labels(name, ro.length);
  ro.forEach((x, i) => compare(`${name}: ${specs[i]}`, rebase(x, b0), rebase(rt[i], b1)));
}
function plan2labels(name, n) {
  if (/колонки/.test(name) && n === 4) return name.startsWith('О нас') ? ['левая opacity', 'левая сдвиг', 'правая opacity', 'правая сдвиг'] : ['левая opacity', 'правая opacity', 'левая сдвиг', 'правая сдвиг'];
  if (/Галерея/.test(name)) return ['карточка 1', 'карточка 2', 'карточка 3', 'карточка 4', 'карточка 5', 'сдвиг первой'];
  if (/Причины: карточки/.test(name)) return ['карточка 1', 'карточка 2', 'карточка 3', 'карточка 4'];
  if (/Коллекции: карточки/.test(name)) return ['карточка 1', 'карточка 2', 'карточка 3', 'карточка 4', 'сдвиг первой', 'кнопка под сеткой (delay 0.4)'];
  if (/цифры/.test(name)) return ['цифры', 'заголовок'];
  return ['opacity', 'сдвиг'];
}

console.log('\n== Шапка при прокрутке ==');
compare('Шапка: фон после прокрутки > 60px', analyze(o.navScroll[0]), analyze(t.navScroll[0]), { delay: false });
compare('Шапка: отступы после прокрутки', analyze(o.navScroll[1]), analyze(t.navScroll[1]), { delay: false });

console.log('\n== Наведение (1440) ==');
for (const [name, , specs] of HOVERS) {
  specs.forEach(([expr, prop], k) => {
    const label = `${name}: ${expr.replace(/^F\./, '').replace(/\(.*\)/, '')} ${prop}`;
    compare(`${label} (наведение)`, analyze(o.hover[name].on[k]), analyze(t.hover[name].on[k]));
    compare(`${label} (уход)`, analyze(o.hover[name].off[k]), analyze(t.hover[name].off[k]));
  });
}

console.log('\n== Клики и формы (1440) ==');
compare('Галерея: просмотр фото — появление', analyze(o.lightbox[0]), analyze(t.lightbox[0]), { delay: false });
check(o.lightboxImg?.split(' | ')[0] === t.lightboxImg?.split(' | ')[0], 'Галерея: открыто то же фото', `${o.lightboxImg} | ${t.lightboxImg}`);
check(o.lightboxNext === t.lightboxNext, 'Галерея: «›» листает', `${o.lightboxNext} | ${t.lightboxNext}`);
check(o.lightboxClosed && t.lightboxClosed, 'Галерея: «×» закрывает');
compare('Отзывы: клик по миниатюре — карточка заново', analyze(o.thumbClick[0]), analyze(t.thumbClick[0]), { delay: false });
compare('Отзывы: клик по миниатюре — точка', analyze(o.thumbClick[1]), analyze(t.thumbClick[1]), { delay: false });
compare('Отзывы: клик по миниатюре — миниатюра', analyze(o.thumbClick[2]), analyze(t.thumbClick[2]), { delay: false });
check(changeAt(o.thumbClick[3]) != null && changeAt(t.thumbClick[3]) != null, 'Отзывы: имя меняется после клика', `${o.thumbClick[3].at(-1)[1]} | ${t.thumbClick[3].at(-1)[1]}`);
compare('Заявка: рамка поля при фокусе', analyze(o.focus[0]), analyze(t.focus[0]), { delay: false });
check(o.thanks[1].at(-1)[1] === 'Thank You!' && t.thanks[1].at(-1)[1] === 'Thank You!', 'Заявка: «Thank You!» после отправки');
compare('Заявка: «Thank You!» — появление', analyze(o.thanks[0]), analyze(t.thanks[0]), { delay: false });
check(o.formBack && t.formBack, 'Заявка: «Send Another Inquiry» возвращает форму');

console.log('\n== Мобильное меню (375) ==');
compare('Меню: панель — opacity', analyze(mob.o.open[0]), analyze(mob.t.open[0]), { delay: false });
compare('Меню: панель — сдвиг', analyze(mob.o.open[1]), analyze(mob.t.open[1]), { delay: false });
compare('Меню: верхняя полоска → крестик', analyze(mob.o.open[2]), analyze(mob.t.open[2]), { delay: false });
compare('Меню: средняя полоска', analyze(mob.o.open[3]), analyze(mob.t.open[3]), { delay: false });
check(!mob.o.afterNav.menu && !mob.t.afterNav.menu && Math.abs(mob.t.afterNav.y) < 80, 'Меню: пункт закрывает меню и прокручивает к разделу', `оригинал ${JSON.stringify(mob.o.afterNav)} | перевод ${JSON.stringify(mob.t.afterNav)}`);

console.log('\n== Кнопка «↑» на 320px (только перевод) ==');
{
  const hit = (a, b) => a && b && a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
  const bad = [0, 200, 400].filter((y) => hit(narrow[y].btn, narrow[y].stat));
  check(!bad.length, 'не перекрывает «500+» на первом экране', bad.length ? `перекрытие при прокрутке ${bad.join(', ')}` : '');
  check(!!narrow.later, 'видна после прокрутки первого экрана');
}

console.log('\n== Консоль ==');
const isRes = (e) => /^https?:\/\//.test(e);
const jsErrs = [...t.errs, ...mob.t.errs].filter((e) => !isRes(e));
check(jsErrs.length === 0, 'нет ошибок скриптов в консоли перевода', jsErrs.join('; '));
const extra = t.broken.filter((u) => !o.broken.some((x) => x.split('/').pop().split('?')[0] === u.split('/').pop().split('?')[0]) && !/^https?:\/\/images\.unsplash/.test(u));
check(extra.length === 0, 'нет лишних незагрузившихся картинок', `оригинал ${o.broken.length}, перевод ${t.broken.length}${extra.length ? ': ' + extra.join(', ') : ''}`);

console.log(`\n${fails ? `✗ расхождений: ${fails}` : '✓ всё совпадает'}`);
process.exit(fails ? 1 : 0);
