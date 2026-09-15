/* Проверка анимаций и поведения лендинга mockups/landing-6 против оригинала 6.

   node tools/mockups/check-landing-6-motion.mjs [originalUrl] [translationUrl]

   По умолчанию оригинал http://localhost:4336/, перевод http://localhost:4320/landing-6/.
   Методика как в check-landing-1-motion.mjs: один сценарий (загрузка, прокрутка,
   наведение через CDP, клики) на обеих страницах, computed-стили на каждом кадре;
   сравниваются задержка, длительность, прогресс в середине (кривая) и итог.
   Печатает ✓/✗ по пунктам, код выхода 1 при расхождениях. */
import { withBrowser } from './snapshot.mjs';

const ORIG = process.argv[2] ?? 'http://localhost:4336/';
const TW = process.argv[3] ?? 'http://localhost:4320/landing-6/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (ok, name, extra = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

// ---------- поиск элементов: одинаковые выражения для обеих страниц ----------
const FIND = `(() => {
  const $ = (s) => document.querySelector(s);
  const byText = (sel, t) => [...document.querySelectorAll(sel)].find((e) => e.textContent.trim() === t);
  const h2 = (t) => [...document.querySelectorAll('h2')].find((h) => h.textContent.includes(t));
  const h1 = () => $('section h1');
  const btn = (i) => h1().nextElementSibling.nextElementSibling.nextElementSibling.children[i];
  const scrollSpan = () => byText('section span', 'Scroll');
  return {
    nav: () => $('nav'),
    navLink: () => $('nav a[href="#gallery"]'),
    navUnder: () => $('nav a[href="#gallery"] span'),
    navBook: () => byText('nav a', 'Book Consultation'),
    burger: () => $('button[aria-label="Toggle menu"]'),
    burgerSvg: () => $('button[aria-label="Toggle menu"] svg'),
    menuPanel: () => $('nav').children[1],
    menuItem: () => $('nav').children[1].querySelector('a'),
    heroBg: () => h1().closest('section').children[0],
    est: () => h1().previousElementSibling,
    h1,
    line: () => h1().nextElementSibling,
    heroP: () => h1().nextElementSibling.nextElementSibling,
    heroBtns: () => h1().nextElementSibling.nextElementSibling.nextElementSibling,
    explore: () => btn(0),
    exploreArrow: () => btn(0).querySelector('svg'),
    heroBook: () => btn(1),
    scrollInd: () => scrollSpan()?.parentElement,
    bob: () => scrollSpan()?.nextElementSibling,
    marquee: () => byText('span', 'LUXURY CURTAINS')?.parentElement,
    stat: (i) => byText('div', '18+').parentElement.parentElement.children[i],
    collHead: () => h2('Crafted for').parentElement,
    card: (i) => $('#collections .grid').children[i],
    cardInner: (i) => $('#collections .grid').children[i].firstElementChild,
    cardImg: (i) => $('#collections .grid').children[i].querySelector('img'),
    cardExplore: (i) => [...$('#collections .grid').children[i].querySelectorAll('span')].find((s) => /^Explore/.test(s.textContent.trim())),
    viewAll: () => $('#collections .grid').nextElementSibling,
    viewAllLink: () => $('#collections .grid').nextElementSibling.querySelector('a'),
    aboutL: () => $('#about .grid').children[0],
    aboutR: () => $('#about .grid').children[1],
    discover: () => byText('a', 'Discover Our Craft'),
    processL: () => $('#process .grid').children[0],
    processImg: () => $('#process img'),
    step: (i) => $('#process .grid').children[1].children[i],
    stepInner: (i) => $('#process .grid').children[1].children[i].firstElementChild,
    stepNum: (i) => $('#process .grid').children[1].children[i].firstElementChild.firstElementChild,
    testiHead: () => h2('Words from Our').parentElement,
    slide: (i) => $('button[aria-label="Testimonial 1"]').parentElement.previousElementSibling.children[i],
    dot: (i) => $('button[aria-label="Testimonial ' + (i + 1) + '"]'),
    galHead: () => h2('Gallery').parentElement,
    tile: (i) => $('#gallery .grid').children[i],
    tileImg: (i) => $('#gallery .grid').children[i].querySelector('img'),
    tileShade: (i) => $('#gallery .grid').children[i].children[1],
    tileView: (i) => $('#gallery .grid').children[i].children[2],
    contact: () => h2('Begin Your').parentElement,
    input: () => $('#contact input'),
    submit: () => $('#contact button[type=submit]'),
    phone: () => $('#contact a[href^="tel:"]'),
    footerLink: () => byText('footer a', 'Imperial Brocade'),
    social: () => $('footer a[aria-label="Social media"]'),
  };
})()`;

// Запись: specs = [[выражение элемента, свойство]], ms — сколько писать. Кадры до готовности
// страницы (шапка ещё не fixed — стили не применены / React не смонтирован) пишутся как null.
const REC = `window.__rgba = (v) => {
  if (typeof v !== 'string' || !/^(oklab|oklch|lab|lch|color)\\(/.test(v)) return v;
  const c = window.__cv || (window.__cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true }));
  c.clearRect(0, 0, 1, 1); c.fillStyle = v; c.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = c.getImageData(0, 0, 1, 1).data;
  return a === 255 ? 'rgb(' + r + ', ' + g + ', ' + b + ')' : 'rgba(' + r + ', ' + g + ', ' + b + ', ' + +(a / 255).toFixed(3) + ')';
};
window.__rec = (specs, ms) => new Promise((res) => {
  const F = window.__F || (window.__F = ${FIND});
  const out = specs.map(() => []);
  const t0 = performance.now();
  const tick = () => {
    const t = performance.now() - t0;
    const nav = document.querySelector('nav');
    const ready = nav && getComputedStyle(nav).position === 'fixed';
    specs.forEach(([expr, prop], k) => {
      let el = null;
      try { el = ready ? new Function('F', 'return ' + expr)(F) : null; } catch {}
      let v = null;
      if (el && el.isConnected) v = prop === 'height' ? String(el.getBoundingClientRect().height) : prop === 'text' ? el.textContent.trim() : prop === 'class' ? el.getAttribute('class') : __rgba(getComputedStyle(el)[prop]);
      out[k].push([Math.round(t), v]);
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
  if (/^rgba?\(/.test(v)) return [m[0] * m[3], m[1] * m[3], m[2] * m[3], m[3] * 255];
  return m;
};
const dist = (a, b) => {
  const n = Math.max(a.length, b.length);
  let s = 0;
  for (let i = 0; i < n; i++) s += ((a[i] ?? 0) - (b[i] ?? 0)) ** 2;
  return Math.sqrt(s);
};
function analyze(track) {
  const raw = track.filter(([, v]) => v != null).map(([t, v]) => [t, nums(v), v]);
  // framer-motion на финише WAAPI-анимации снимает её раньше, чем пишет итоговый стиль: один кадр
  // getComputedStyle отдаёт initial между двумя кадрами с итогом — одиночный выброс отбрасываем.
  const pts = raw.filter((q, i) => i === 0 || i === raw.length - 1 || !(dist(raw[i - 1][1], raw[i + 1][1]) < 1e-3 && dist(q[1], raw[i - 1][1]) > 0.05));
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
  if (/^rgba?\(/.test(a) && /^rgba?\(/.test(b)) return dist(x, y) <= 3;
  return dist(x, y) <= 0.02 * Math.max(1, Math.sqrt(y.reduce((s, q) => s + q * q, 0)) / 10) + 0.02;
};
const fmt = (r) => (r.missing ? 'нет элемента' : r.static ? `без анимации, ${r.final}` : `задержка ${r.start}мс, длит. ${r.dur}мс, середина ${r.mid}, итог ${r.final}`);
function compare(name, o, t, { delay = true, curve = true, dur = true } = {}) {
  const probs = [];
  if (o.missing || t.missing) probs.push('нет элемента');
  else {
    if (!sameVal(o.final, t.final)) probs.push('итог');
    if (!!o.static !== !!t.static) probs.push('наличие анимации');
    else if (!o.static) {
      if (dur && !near(o.dur, t.dur, 70, 0.2)) probs.push('длительность');
      if (delay && !near(o.start, t.start, 80, 0.2)) probs.push('задержка');
      if (curve && Math.abs(o.mid - t.mid) > 0.18) probs.push('кривая');
    }
  }
  check(!probs.length, name, (probs.length ? probs.join(', ') + ': ' : '') + `оригинал: ${fmt(o)} | перевод: ${fmt(t)}`);
}

async function session(url, width, load, fn) {
  return withBrowser(async (page) => {
    await page.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errs=[];addEventListener('error',e=>{__errs.push(String((e.target&&(e.target.src||e.target.href))||e.message))},true);
        const __ce=console.error;console.error=(...a)=>{__errs.push(a.join(' '));__ce(...a)};
        ${REC}
        window.__load = __rec(${JSON.stringify(load)}, 5200);`,
        // 3600 мс не хватало: React оригинала монтируется позже HTML перевода, и запись обрывалась
        // посреди проявления индикатора Scroll (delay 1.8) — «итог 0.81» был срезом, а не итогом.
    });
    const api = {
      page,
      goto: (settle = 300) => page.goto(url, settle),
      eval: (e) => page.eval(e),
      rec: (specs, ms) => page.eval(`__rec(${JSON.stringify(specs)}, ${ms})`),
      async recWhile(specs, ms, action) {
        await page.eval(`window.__cur = __rec(${JSON.stringify(specs)}, ${ms}); 0`);
        await action();
        return page.eval('window.__cur');
      },
      async center(expr) {
        return page.eval(`(() => { const F = window.__F || (window.__F = ${FIND}); const el = ${expr}; const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; })()`);
      },
      async scrollTo(expr, offset = 100) {
        await page.eval(`(() => { const F = window.__F || (window.__F = ${FIND}); const el = ${expr}; window.scrollTo(0, el.getBoundingClientRect().top + scrollY - ${offset}); })()`);
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
async function both(width, load, fn) {
  const run = async (url) => {
    for (let i = 0; ; i++) {
      try {
        return await session(url, width, load, fn);
      } catch (e) {
        if (i < 4 && /EBUSY|DevToolsActivePort|ECONNREFUSED|ENOENT/.test(String(e))) { await sleep(1500); continue; }
        throw e;
      }
    }
  };
  return { o: await run(ORIG), t: await run(TW) };
}

const LOAD = [
  ['Шапка: выезд сверху (transform)', 'F.nav()', 'transform'],
  ['Шапка: opacity', 'F.nav()', 'opacity'],
  ['Первый экран: «Est. 2005» (opacity, delay 0.4)', 'F.est()', 'opacity'],
  ['Первый экран: «Est. 2005» (translateX)', 'F.est()', 'transform'],
  ['Первый экран: заголовок (opacity, delay 0.55)', 'F.h1()', 'opacity'],
  ['Первый экран: заголовок (translateY 70)', 'F.h1()', 'transform'],
  ['Первый экран: линия scaleX (delay 0.9)', 'F.line()', 'transform'],
  ['Первый экран: текст (opacity, delay 1)', 'F.heroP()', 'opacity'],
  ['Первый экран: текст (translateY)', 'F.heroP()', 'transform'],
  ['Первый экран: кнопки (opacity, delay 1.15)', 'F.heroBtns()', 'opacity'],
  ['Первый экран: кнопки (translateY)', 'F.heroBtns()', 'transform'],
  ['Индикатор Scroll (opacity, delay 1.8)', 'F.scrollInd()', 'opacity'],
];

const HOVERS = [
  ['Шапка: пункт меню — цвет', 'F.navLink()', [['F.navLink()', 'color'], ['F.navUnder()', 'width']], 600],
  ['Шапка: Book Consultation', 'F.navBook()', [['F.navBook()', 'backgroundColor'], ['F.navBook()', 'color']], 600],
  ['Первый экран: Explore Collections', 'F.explore()', [['F.explore()', 'backgroundColor'], ['F.exploreArrow()', 'transform'], ['F.exploreArrow()', 'translate']], 600],
  ['Первый экран: Book Consultation', 'F.heroBook()', [['F.heroBook()', 'borderTopColor'], ['F.heroBook()', 'color']], 600],
  ['Коллекции: карточка', 'F.cardInner(1)', [['F.cardInner(1)', 'borderTopColor'], ['F.cardImg(1)', 'scale'], ['F.cardImg(1)', 'transform'], ['F.cardExplore(1)', 'columnGap']], 900],
  ['Коллекции: View All Collections', 'F.viewAllLink()', [['F.viewAllLink()', 'borderTopColor'], ['F.viewAllLink()', 'color']], 600],
  ['О нас: Discover Our Craft', 'F.discover()', [['F.discover()', 'backgroundColor']], 600],
  ['Процесс: фото', 'F.processImg()', [['F.processImg()', 'scale'], ['F.processImg()', 'transform']], 900],
  ['Процесс: шаг', 'F.stepInner(1)', [['F.stepInner(1)', 'backgroundColor'], ['F.stepNum(1)', 'color']], 600],
  ['Галерея: плитка', 'F.tile(1)', [['F.tileImg(1)', 'scale'], ['F.tileImg(1)', 'transform'], ['F.tileShade(1)', 'backgroundColor'], ['F.tileView(1)', 'opacity']], 900],
  ['Галерея: плитка 6', 'F.tile(5)', [['F.tileImg(5)', 'scale'], ['F.tileImg(5)', 'transform'], ['F.tileView(5)', 'opacity']], 900],
  ['Заявка: поле (фокус не нужен) — кнопка', 'F.submit()', [['F.submit()', 'backgroundColor']], 600],
  ['Заявка: телефон', 'F.phone()', [['F.phone()', 'color']], 500],
  ['Подвал: ссылка', 'F.footerLink()', [['F.footerLink()', 'color']], 600],
  ['Подвал: соцсеть', 'F.social()', [['F.social()', 'borderTopColor'], ['F.social()', 'backgroundColor'], ['F.social()', 'color']], 600],
];

// ================= десктоп 1440 =================
const desk = await both(1440, LOAD.map(([, e, p]) => [e, p]), async (s) => {
  const r = {};
  await s.goto(300);
  r.load = await s.eval('window.__load');
  await sleep(300);
  r.bob = await s.rec([['F.bob()', 'transform']], 3400);
  r.marquee = await s.rec([['F.marquee()', 'transform']], 1500);

  // Параллакс фона первого экрана.
  r.parallax = [];
  for (const y of [0, 350, 700, 1000]) {
    await s.eval(`scrollTo(0, ${y})`);
    await sleep(250);
    r.parallax.push(await s.eval(`(() => { const F = window.__F; return getComputedStyle(F.heroBg()).transform; })()`));
  }

  // Появление сеток: снизу вверх, чтобы каждая появлялась впервые.
  r.reveal = {};
  const grids = [
    ['Галерея: плитки', 'F.tile(0)', 'tile', 6],
    ['Процесс: шаги', 'F.step(0)', 'step', 4],
    ['Коллекции: карточки', 'F.card(0)', 'card', 3],
    ['Цифры', 'F.stat(0)', 'stat', 4],
  ];
  await s.eval('scrollTo(0, document.documentElement.scrollHeight)');
  await sleep(300);
  for (const [name, first, fn, n] of grids) {
    await s.scrollTo(first, 40);
    const specs = Array.from({ length: n }, (_, i) => [`F.${fn}(${i})`, 'opacity']).concat([[`F.${fn}(0)`, 'transform']]);
    r.reveal[name] = await s.rec(specs, 1800);
  }
  await s.goto(300);
  await sleep(1500);
  await s.eval('scrollTo(0, document.documentElement.scrollHeight)');
  await sleep(100);
  for (const [name, specs, target, offset] of [
    ['Заявка', [['F.contact()', 'opacity'], ['F.contact()', 'transform']], 'F.contact()', 200],
    ['Галерея: заголовок', [['F.galHead()', 'opacity'], ['F.galHead()', 'transform']], 'F.galHead()', 200],
    ['Отзывы: заголовок', [['F.testiHead()', 'opacity'], ['F.testiHead()', 'transform']], 'F.testiHead()', 200],
    ['Процесс: левая колонка', [['F.processL()', 'opacity'], ['F.processL()', 'transform']], 'F.processL()', 150],
    ['О нас: колонки', [['F.aboutL()', 'opacity'], ['F.aboutR()', 'opacity'], ['F.aboutL()', 'transform'], ['F.aboutR()', 'transform']], 'F.aboutL()', 100],
    ['Коллекции: View All', [['F.viewAll()', 'opacity'], ['F.viewAll()', 'transform']], 'F.viewAll()', 500],
    ['Коллекции: заголовок', [['F.collHead()', 'opacity'], ['F.collHead()', 'transform']], 'F.collHead()', 200],
  ]) {
    await s.scrollTo(target, offset);
    r.reveal[name] = await s.rec(specs, 1600);
  }
  // Итог: всё видно после прокрутки всей страницы (в т.ч. последние плитки галереи).
  await s.eval(`(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}})()`);
  await sleep(1500);
  r.tilesFinal = await s.eval(`[0,1,2,3,4,5].map((i) => getComputedStyle(window.__F.tile(i)).opacity)`);

  await s.eval('scrollTo(0,0)');
  await sleep(700);
  r.navScroll = await s.recWhile([['F.nav()', 'backgroundColor'], ['F.nav()', 'boxShadow']], 900, () => s.eval('scrollTo(0, 400)'));

  r.hover = {};
  for (const [name, target, specs, ms] of HOVERS) {
    await s.scrollTo(target, 350);
    await s.mouse(2, 2);
    await sleep(900);
    const [x, y] = await s.center(target);
    const on = await s.recWhile(specs, ms, () => s.mouse(x, y));
    const off = await s.recWhile(specs, ms, () => s.mouse(2, 2));
    r.hover[name] = { on, off };
  }

  // Отзывы: клик по точке 2.
  await s.scrollTo('F.dot(1)', 500);
  await s.mouse(2, 2);
  await sleep(200);
  // Кликаем точку слайда, который не активен и не будет следующим по таймеру.
  await s.eval('window.__ti = ([0, 1, 2].find((i) => getComputedStyle(window.__F.slide(i)).opacity === "1") + 2) % 3');
  r.review = await s.recWhile([['F.slide(window.__ti)', 'opacity'], ['F.slide(window.__ti)', 'transform'], ['F.dot(window.__ti)', 'width']], 1000, () => s.click('F.dot(window.__ti)'));
  // Автосмена раз в 5.5 с: за 6 с активный слайд меняется.
  r.auto = await s.rec([['F.slide(0)', 'opacity'], ['F.slide(1)', 'opacity'], ['F.slide(2)', 'opacity']], 6000);

  // Форма: отправка не перезагружает страницу, поля не очищаются.
  await s.scrollTo('F.input()', 400);
  await s.eval(`(() => { const el = window.__F.input(); el.focus(); document.execCommand('insertText', false, 'Test'); })()`);
  r.focus = await s.eval('__rgba(getComputedStyle(window.__F.input()).borderTopColor)');
  await s.click('F.submit()');
  await sleep(600);
  r.afterSubmit = await s.eval('[location.href.replace(location.origin, ""), window.__F.input().value]');

  r.errs = await s.eval('window.__errs');
  r.broken = await s.eval('[...document.images].filter((i) => i.naturalWidth === 0).map((i) => i.src)');
  return r;
});

// ================= телефон 375 =================
const mob = await both(375, [], async (s) => {
  const r = {};
  await s.goto(1500);
  r.open = await s.recWhile([['F.menuPanel()', 'height'], ['F.menuPanel()', 'opacity'], ['F.burgerSvg()', 'class']], 700, () => s.click('F.burger()'));
  r.close = await s.recWhile([['F.menuPanel()', 'height'], ['F.menuPanel()', 'opacity'], ['F.burgerSvg()', 'class']], 700, () => s.click('F.burger()'));
  await sleep(300);
  await s.click('F.burger()');
  await sleep(600);
  r.item = await s.recWhile([['F.menuPanel()', 'height']], 900, () => s.click('F.menuItem()'));
  r.tiles = await s.eval(`(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}await new Promise(r=>setTimeout(r,1500));return [0,1,2,3,4,5].map((i)=>getComputedStyle(window.__F.tile(i)).opacity)})()`);
  r.errs = await s.eval('window.__errs');
  return r;
});

const { o, t } = desk;
console.log('\n== Загрузка страницы (1440) ==');
{
  const lo = o.load.map(analyze), lt = t.load.map(analyze);
  // Отсчёт от «Est. 2005» (delay 0.4): React монтируется позже HTML. Шапку framer начинает двигать
  // с запаздыванием на первый рендер — для неё сравниваются только длительность и итог.
  const base = (arr) => (arr[2].start ?? 400) - 400;
  LOAD.forEach(([name], i) => compare(name, { ...lo[i], start: lo[i].start - base(lo) }, { ...lt[i], start: lt[i].start - base(lt) }, i < 2 ? { delay: false, curve: false, dur: false } : {}));
}
{
  const series = (track) => track.filter(([, v]) => v).map(([tt, v]) => [tt, nums(v)[5]]);
  const info = (s) => {
    const peaks = s.filter((p, i) => i > 0 && i < s.length - 1 && p[1] >= s[i - 1][1] && p[1] > s[i + 1][1] && p[1] > 8).map((p) => p[0]);
    return { amp: Math.max(...s.map((p) => p[1])), period: peaks.length > 1 ? Math.round((peaks.at(-1) - peaks[0]) / (peaks.length - 1)) : 0 };
  };
  const so = series(o.bob[0]), st = series(t.bob[0]);
  const bo = info(so), bt = info(st);
  check(near(bo.amp, bt.amp, 0.5) && near(bo.period, bt.period, 80), 'Индикатор Scroll: бесконечное покачивание', `оригинал: амплитуда ${bo.amp.toFixed(2)}px, период ${bo.period}мс | перевод: амплитуда ${bt.amp.toFixed(2)}px, период ${bt.period}мс`);
  const trough = (s) => s.slice(1, -1).find((p, i) => p[1] <= s[i][1] && p[1] < s[i + 2][1] && p[1] < 0.5)?.[0] ?? 0;
  const at = (s, t0, tt) => s.reduce((b, q) => (Math.abs(q[0] - t0 - tt) < Math.abs(b[0] - t0 - tt) ? q : b))[1];
  const to = trough(so), tt0 = trough(st);
  let worst = 0;
  for (let x = 0; x <= 1600; x += 50) worst = Math.max(worst, Math.abs(at(so, to, x) - at(st, tt0, x)));
  check(worst <= 1, 'Индикатор Scroll: форма покачивания (easeInOut по сегментам)', `макс. расхождение ${worst.toFixed(2)}px`);
}
{
  const speed = (track) => {
    const s = track.filter(([, v]) => v).map(([tt, v]) => [tt, nums(v)[4]]);
    return ((s.at(-1)[1] - s[0][1]) / (s.at(-1)[0] - s[0][0])) * 1000;
  };
  const so = speed(o.marquee[0]), st = speed(t.marquee[0]);
  check(so < -1 && near(so, st, 3, 0.1), 'Бегущая строка: линейное движение', `оригинал ${so.toFixed(1)} px/с | перевод ${st.toFixed(1)} px/с`);
}
{
  const ys = (arr) => arr.map((v) => +(nums(v)[5] ?? 0).toFixed(1));
  const po = ys(o.parallax), pt = ys(t.parallax);
  check(po.every((v, i) => near(v, pt[i], 3)), 'Первый экран: параллакс фона (scrollY 0/350/700/1000)', `оригинал ${po.join(', ')} | перевод ${pt.join(', ')}`);
}

console.log('\n== Появление при прокрутке (1440) ==');
for (const name of Object.keys(o.reveal)) {
  const ro = o.reveal[name].map(analyze), rt = t.reveal[name].map(analyze);
  const b0 = ro[0].start ?? 0, b1 = rt[0].start ?? 0;
  const specs = o.reveal[name];
  ro.forEach((x, i) => {
    let label;
    if (name === 'О нас: колонки') label = ['левая opacity', 'правая opacity (delay 0.2)', 'левая translateX', 'правая translateX'][i];
    else if (specs.length > 2) label = i === ro.length - 1 ? 'transform первой' : `элемент ${i + 1}`;
    else label = ['opacity', 'transform'][i];
    compare(`${name}: ${label}`, { ...x, start: x.start - b0 }, { ...rt[i], start: rt[i].start - b1 });
  });
}
check(t.tilesFinal.every((v) => v === '1') && o.tilesFinal.every((v) => v === '1'), 'Галерея: все 6 плиток видны после прокрутки (1440)', `оригинал ${o.tilesFinal.join(',')} | перевод ${t.tilesFinal.join(',')}`);

console.log('\n== Шапка при прокрутке ==');
compare('Шапка: фон после прокрутки > 60px', analyze(o.navScroll[0]), analyze(t.navScroll[0]), { delay: false });
compare('Шапка: тень после прокрутки', analyze(o.navScroll[1]), analyze(t.navScroll[1]), { delay: false });

console.log('\n== Наведение (1440) ==');
for (const [name, , specs] of HOVERS) {
  specs.forEach(([expr, prop], k) => {
    compare(`${name}: ${expr.replace('F.', '')} ${prop} (наведение)`, analyze(o.hover[name].on[k]), analyze(t.hover[name].on[k]));
    compare(`${name}: ${expr.replace('F.', '')} ${prop} (уход)`, analyze(o.hover[name].off[k]), analyze(t.hover[name].off[k]));
  });
}

console.log('\n== Отзывы и форма (1440) ==');
compare('Отзывы: новый слайд — opacity', analyze(o.review[0]), analyze(t.review[0]), { delay: false });
compare('Отзывы: новый слайд — translateY', analyze(o.review[1]), analyze(t.review[1]), { delay: false });
compare('Отзывы: активная точка — ширина', analyze(o.review[2]), analyze(t.review[2]), { delay: false });
{
  const changes = (tracks) => {
    let prev = null, n = 0;
    for (let f = 0; f < tracks[0].length; f++) {
      const act = tracks.findIndex((tr) => tr[f]?.[1] === '1');
      if (act >= 0 && prev != null && act !== prev) n++;
      if (act >= 0) prev = act;
    }
    return n;
  };
  const co = changes(o.auto), ct = changes(t.auto);
  check(co >= 1 && ct >= 1, 'Отзывы: автосмена слайда (раз в 5.5 с)', `смен за 6 с: оригинал ${co} | перевод ${ct}`);
}
check(sameVal(o.focus, t.focus), 'Заявка: рамка поля при фокусе', `${o.focus} | ${t.focus}`);
check(JSON.stringify(o.afterSubmit.map((v, i) => (i === 0 ? v.replace(/landing-6\//, '') : v))) === JSON.stringify(t.afterSubmit.map((v, i) => (i === 0 ? v.replace(/landing-6\//, '') : v))), 'Заявка: отправка без перезагрузки, поля не очищаются', `${o.afterSubmit.join(' ')} | ${t.afterSubmit.join(' ')}`);

console.log('\n== Мобильное меню (375) ==');
{
  // Итог высоты может отличаться на пару px: мобильная CSS-правка перевода поднимает мелкий шрифт до 12px.
  const a = analyze(mob.o.open[0]), b = analyze(mob.t.open[0]);
  compare('Меню: открытие — высота панели (ход)', { ...a, final: b.final }, b, { delay: false });
  check(near(+a.final, +b.final, 6), 'Меню: открытие — итоговая высота ±6px', `${a.final} | ${b.final}`);
}
compare('Меню: открытие — opacity', analyze(mob.o.open[1]), analyze(mob.t.open[1]), { delay: false });
check(/lucide-x/.test(mob.o.open[2].at(-1)[1]) && /lucide-x/.test(mob.t.open[2].at(-1)[1]), 'Меню: иконка «x» при открытом меню');
compare('Меню: закрытие — высота панели', analyze(mob.o.close[0]), analyze(mob.t.close[0]), { delay: false });
compare('Меню: закрытие — opacity', analyze(mob.o.close[1]), analyze(mob.t.close[1]), { delay: false });
check(/lucide-menu/.test(mob.o.close[2].at(-1)[1]) && /lucide-menu/.test(mob.t.close[2].at(-1)[1]), 'Меню: иконка «menu» после закрытия');
compare('Меню: клик по пункту закрывает', analyze(mob.o.item[0]), analyze(mob.t.item[0]), { delay: false });
check(mob.t.tiles.every((v) => v === '1'), 'Галерея: все плитки видны на 375 без CSS-заплатки', `оригинал ${mob.o.tiles.join(',')} | перевод ${mob.t.tiles.join(',')}`);

console.log('\n== Консоль ==');
const isRes = (e) => /^https?:\/\//.test(e);
const jsErrs = [...t.errs, ...mob.t.errs].filter((e) => !isRes(e));
check(jsErrs.length === 0, 'нет ошибок скриптов в консоли перевода', jsErrs.join('; '));
const extra = t.broken.filter((u) => !o.broken.includes(u));
check(extra.length === 0, 'не загрузились только те картинки, что и в оригинале', `оригинал ${o.broken.length}, перевод ${t.broken.length}${extra.length ? ': лишние ' + extra.join(', ') : ''}`);

console.log(`\n${fails ? `✗ расхождений: ${fails}` : '✓ всё совпадает'}`);
process.exit(fails ? 1 : 0);
