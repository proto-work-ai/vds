/* Проверка анимаций и поведения лендинга mockups/landing-3 против оригинала 3.

   node tools/mockups/check-landing-3-motion.mjs [originalUrl] [translationUrl]

   По умолчанию оригинал http://localhost:4333/, перевод http://localhost:4320/landing-3/.
   Методика как в check-landing-1-motion.mjs: один сценарий (загрузка со
   вступлением-дверями, прокрутка, наведение через CDP, клики, таймеры) на обеих
   страницах, на каждом кадре пишутся computed-стили; сравниваются задержка,
   длительность, прогресс в середине и итог. Печатает ✓/✗, код выхода 1 при ошибках. */
import { withBrowser } from './snapshot.mjs';

const ORIG = process.argv[2] ?? 'http://localhost:4333/';
const TW = process.argv[3] ?? 'http://localhost:4320/landing-3/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (ok, name, extra = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

const FIND = `(() => {
  const txt = (sel, t) => [...document.querySelectorAll(sel)].find((e) => e.textContent.trim() === t);
  const appRoot = () => document.querySelector('#root > div');
  const intro = () => { const c = appRoot()?.firstElementChild; if (!c) return null; const s = getComputedStyle(c); return s.position === 'fixed' && s.zIndex === '9999' ? c : null; };
  const san = () => txt('#home span', 'SAN');
  const orn = () => san().parentElement.parentElement.nextElementSibling;
  const burger = () => document.querySelector('button[aria-label="Toggle menu"]');
  const tbox = () => document.querySelectorAll('#testimonials .section-reveal')[1];
  const card = (i) => document.querySelectorAll('#collections .card-img')[i].parentElement;
  return {
    intro,
    glow: () => intro()?.children[0],
    doorL: () => intro()?.children[1],
    doorR: () => intro()?.children[2],
    est: () => { const p = intro() && [...intro().querySelectorAll('p')].find((x) => x.textContent.trim() === 'Est. 2008'); return p ? p.parentElement : null; },
    particle: () => [...(intro()?.children ?? [])].find((c) => /particleDrift/.test(getComputedStyle(c).animationName)),
    content: () => document.querySelector('nav').parentElement,
    nav: () => document.querySelector('nav'),
    navLink: () => document.querySelector('.nav-desktop a[href="#why-us"]'),
    book: () => txt('nav a', 'Book Consult'),
    burger,
    burgerSpan: (i) => burger().querySelectorAll('span')[i],
    menu: () => { const n = burger().nextElementSibling; return n && n.tagName === 'DIV' ? n : null; },
    heroBg: () => document.getElementById('home').children[0],
    curtainL: () => document.getElementById('home').children[2],
    heroContent: () => txt('#home p', '✦ Luxury Window Treatments ✦').parentElement,
    tagline: () => txt('#home p', '✦ Luxury Window Treatments ✦'),
    san,
    curtainsWord: () => txt('#home span', 'CURTAINS'),
    orn,
    ornLine: () => orn().children[0],
    diamond: () => orn().children[1],
    sub: () => orn().nextElementSibling,
    btns: () => orn().nextElementSibling.nextElementSibling,
    explore: () => txt('#home a', 'Explore Collections'),
    story: () => txt('#home a', 'Our Story'),
    scrollHint: () => txt('#home span', 'Scroll').parentElement,
    scrollLine: () => txt('#home span', 'Scroll').parentElement.children[1],
    collHead: () => document.querySelector('#collections .section-reveal'),
    card,
    cardImg: (i) => card(i).querySelector('.card-img'),
    cardOverlay: (i) => card(i).querySelector('.card-overlay'),
    cardInfo: (i) => card(i).querySelector('.card-info'),
    cardView: (i) => card(i).querySelector('button'),
    catalogue: () => txt('#collections a', 'Request the Full Catalogue →'),
    featHead: () => document.querySelectorAll('#why-us .section-reveal')[0],
    featStats: () => document.querySelectorAll('#why-us .section-reveal')[1],
    feat: (i) => document.querySelectorAll('#why-us .feat-glow')[i].parentElement,
    featGlow: (i) => document.querySelectorAll('#why-us .feat-glow')[i],
    testiHead: () => document.querySelectorAll('#testimonials .section-reveal')[0],
    testiBox: tbox,
    testiCard: () => tbox().children[1],
    testiName: () => tbox().children[1].querySelectorAll('p')[1],
    testiDot: (i) => tbox().children[2].children[i],
    contact: () => document.getElementById('contact'),
    input: () => document.querySelector('#contact input'),
    submit: () => document.querySelector('#contact button[type=submit]'),
    shimmer: () => document.querySelector('#contact .gold-shimmer'),
    footSocial: () => txt('footer button', 'Fb'),
    footLink: () => txt('footer a', 'Pearl Cascade'),
    footBottom: () => txt('footer a', 'Cookie Policy'),
  };
})()`;

const REC = `window.__rec = (specs, ms) => new Promise((res) => {
  const F = window.__F || (window.__F = ${FIND});
  const out = specs.map(() => []);
  const t0 = performance.now();
  const abs = !!window.__abs;
  const tick = () => {
    const t = performance.now() - t0;
    specs.forEach(([expr, prop], k) => {
      let el = null;
      try { el = new Function('F', 'return ' + expr)(F); } catch {}
      let v = null;
      if (el && el.isConnected) {
        if (prop === 'height') v = String(el.getBoundingClientRect().height);
        else if (prop === 'text') v = el.textContent.trim();
        else if (prop === 'present') v = '1';
        else if (prop === 'shown') v = getComputedStyle(el).display === 'none' ? null : '1';
        else v = getComputedStyle(el)[prop];
      }
      out[k].push([Math.round(t + (abs ? t0 : 0)), v]);
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
function compare(name, o, t, { delay = true, curve = true, dtol = 80 } = {}) {
  const probs = [];
  if (o.missing || t.missing) probs.push('нет элемента');
  else {
    if (!sameVal(o.final, t.final)) probs.push('итог');
    // Мгновенный скачок (без перехода) анимацией не считается.
    const anim = (r) => !r.static && r.dur > 40;
    if (anim(o) !== anim(t)) probs.push('наличие анимации');
    else if (anim(o)) {
      if (!near(o.dur, t.dur, 70, 0.2)) probs.push('длительность');
      if (delay && !near(o.start, t.start, dtol, 0.2)) probs.push('задержка');
      if (curve && Math.abs(o.mid - t.mid) > 0.18) probs.push('кривая');
    }
  }
  check(!probs.length, name, (probs.length ? probs.join(', ') + ': ' : '') + `оригинал: ${fmt(o)} | перевод: ${fmt(t)}`);
}
// Отсчёт — начало letterReveal «SAN» (delay 0.3 с от монтирования).
const BASE = (load) => (analyze(load[12]).start ?? 0) - 300;

// Фаза события относительно периода таймера (мс), по кругу.
const phase = (x, base, P) => (x == null ? null : (((x - base) % P) + P) % P);
const phaseNear = (a, b, P, tol) => a != null && b != null && Math.min(Math.abs(a - b), P - Math.abs(a - b)) <= tol;
const rebase = (r, b) => (r.start == null ? r : { ...r, start: r.start - b });
const changeAt = (track, from = 0) => {
  const pts = track.filter(([tt, v]) => v != null && tt >= from);
  const f = pts[0]?.[1];
  return pts.find(([, v]) => v !== f)?.[0] ?? null;
};
// Момент, когда элемент пропал (или появился).
const goneAt = (track) => track.find(([, v]) => v == null)?.[0] ?? null;
const cameAt = (track) => track.find(([, v]) => v != null)?.[0] ?? null;

async function session(url, width, fn, loadSpecs = [], loadMs = 0) {
  return withBrowser(async (page) => {
    await page.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errs=[];addEventListener('error',e=>{__errs.push(String((e.target&&(e.target.src||e.target.href))||e.message))},true);
        document.addEventListener('DOMContentLoaded',()=>{document.documentElement.style.scrollBehavior='auto'});const __ce=console.error;console.error=(...a)=>{__errs.push(a.join(' '));__ce(...a)};
        ${REC}
        (function poll(){try{const F=window.__F||(window.__F=${FIND});const el=F.glow();if(el&&getComputedStyle(el).animationName!=='none'){window.__base=performance.now();return;}}catch(e){}setTimeout(poll,10)})();
        window.__abs = true;
        window.__load = __rec(${JSON.stringify(loadSpecs)}, ${loadMs});
        window.__abs = false;`,
    });
    const api = {
      page,
      goto: (settle = 300) => page.goto(url, settle),
      eval: (e) => page.eval(e),
      rec: (specs, ms) => page.eval(`__rec(${JSON.stringify(specs)}, ${ms})`),
      recAbs: (specs, ms) => page.eval(`(() => { window.__abs = true; const p = __rec(${JSON.stringify(specs)}, ${ms}); window.__abs = false; return p; })()`),
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
        await page.eval(`(() => { const F = window.__F || (window.__F = ${FIND}); const el = ${expr}; document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, el.getBoundingClientRect().top + scrollY - ${offset}); })()`);
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
async function both(width, fn, loadSpecs, loadMs) {
  const run = async (url) => {
    for (let i = 0; ; i++) {
      try {
        return await session(url, width, fn, loadSpecs, loadMs);
      } catch (e) {
        if (i < 4 && /EBUSY|DevToolsActivePort|ECONNREFUSED|ENOENT/.test(String(e))) { await sleep(1500); continue; }
        throw e;
      }
    }
  };
  return { o: await run(ORIG), t: await run(TW) };
}

const LOAD = [
  ['F.tagline()', 'opacity'],
  ['F.intro()', 'present'],
  ['F.glow()', 'opacity'],
  ['F.doorL()', 'transform'],
  ['F.doorR()', 'transform'],
  ['F.est()', 'opacity'],
  ['F.particle()', 'shown'],
  ['F.content()', 'opacity'],
  ['F.heroBg()', 'opacity'],
  ['F.heroBg()', 'transform'],
  ['F.curtainL()', 'opacity'],
  ['F.heroContent()', 'opacity'],
  ['F.san()', 'opacity'],
  ['F.curtainsWord()', 'opacity'],
  ['F.orn()', 'opacity'],
  ['F.ornLine()', 'width'],
  ['F.diamond()', 'transform'],
  ['F.sub()', 'opacity'],
  ['F.btns()', 'opacity'],
  ['F.scrollHint()', 'opacity'],
];
const LOAD_NAMES = ['Первый экран: подпись (fadeIn 0.4)', 'Вступление: оверлей', 'Вступление: свечение (doorGlowReveal 4s)', 'Вступление: левая створка', 'Вступление: правая створка', 'Вступление: «Est. 2008»', 'Вступление: искры', 'Страница: проявление после вступления', 'Первый экран: фон (opacity)', 'Первый экран: фон (scale)', 'Первый экран: левая штора', 'Первый экран: блок текста', 'Первый экран: SAN', 'Первый экран: CURTAINS', 'Первый экран: орнамент', 'Первый экран: линия орнамента (ширина)', 'Первый экран: ромб', 'Первый экран: текст', 'Первый экран: кнопки', 'Первый экран: Scroll'];

const HOVERS = [
  ['Шапка: пункт меню', 'F.navLink()', [['F.navLink()', 'color'], ['F.navLink()', 'opacity']], 600],
  ['Шапка: Book Consult', 'F.book()', [['F.book()', 'transform'], ['F.book()', 'boxShadow']], 600],
  ['Первый экран: Explore Collections', 'F.explore()', [['F.explore()', 'transform'], ['F.explore()', 'backgroundPosition']], 700],
  ['Первый экран: Our Story', 'F.story()', [['F.story()', 'transform'], ['F.story()', 'backgroundColor']], 700],
  ['Коллекции: карточка', 'F.card(1)', [['F.card(1)', 'boxShadow'], ['F.cardImg(1)', 'transform'], ['F.cardOverlay(1)', 'opacity'], ['F.cardInfo(1)', 'transform']], 1000],
  ['Коллекции: кнопка View', 'F.cardView(0)', [['F.cardView(0)', 'backgroundColor'], ['F.cardView(0)', 'color'], ['F.cardImg(0)', 'transform']], 900],
  ['Коллекции: ссылка каталога', 'F.catalogue()', [['F.catalogue()', 'opacity']], 600],
  ['Преимущества: карточка 1', 'F.feat(0)', [['F.feat(0)', 'borderTopColor'], ['F.featGlow(0)', 'opacity']], 1200],
  ['Преимущества: карточка 3 (задержка перехода)', 'F.feat(2)', [['F.feat(2)', 'borderTopColor'], ['F.featGlow(2)', 'opacity']], 1400],
  ['Заявка: кнопка', 'F.submit()', [['F.submit()', 'transform'], ['F.submit()', 'boxShadow'], ['F.submit()', 'backgroundPosition']], 700],
  ['Подвал: соцсеть', 'F.footSocial()', [['F.footSocial()', 'backgroundColor'], ['F.footSocial()', 'borderTopColor']], 600],
  ['Подвал: ссылка', 'F.footLink()', [['F.footLink()', 'color'], ['F.footLink()', 'opacity']], 600],
  ['Подвал: нижняя ссылка', 'F.footBottom()', [['F.footBottom()', 'opacity']], 600],
];

// ================= десктоп 1440 =================
const desk = await both(1440, async (s) => {
  const r = {};
  await s.goto(300);
  r.load = await s.eval('window.__load');
  r.base = await s.base();
  // Бесконечные на первом экране.
  r.inf = await s.rec([['F.scrollLine()', 'transform'], ['F.explore()', 'boxShadow'], ['F.story()', 'borderTopColor']], 4000);

  // Таймер отзывов: 6 с от монтирования.
  await s.untilBase(5400);
  r.auto = await s.recAbs([['F.testiName()', 'text'], ['F.testiCard()', 'opacity'], ['F.testiCard()', 'transform'], ['F.testiDot(1)', 'width']], 7000);

  r.reveal = {};
  const plan = [
    ['Заявка: весь блок', 'F.contact()', 300, [['F.contact()', 'opacity'], ['F.contact()', 'transform']]],
    ['Отзывы: карточка', 'F.testiBox()', 300, [['F.testiBox()', 'opacity'], ['F.testiBox()', 'transform']]],
    ['Отзывы: заголовок', 'F.testiHead()', 250, [['F.testiHead()', 'opacity'], ['F.testiHead()', 'transform']]],
    ['Преимущества: цифры', 'F.featStats()', 300, [['F.featStats()', 'opacity'], ['F.featStats()', 'transform']]],
    ['Преимущества: карточки', 'F.feat(0)', 100, [0, 1, 2, 3].map((i) => [`F.feat(${i})`, 'opacity']).concat([['F.feat(0)', 'transform'], ['F.feat(3)', 'transform']])],
    ['Преимущества: заголовок', 'F.featHead()', 250, [['F.featHead()', 'opacity'], ['F.featHead()', 'transform']]],
    ['Коллекции: карточки', 'F.card(0)', 100, [0, 1, 2].map((i) => [`F.card(${i})`, 'opacity']).concat([['F.card(0)', 'transform'], ['F.card(2)', 'transform']])],
    ['Коллекции: заголовок', 'F.collHead()', 250, [['F.collHead()', 'opacity'], ['F.collHead()', 'transform']]],
  ];
  for (const [name, expr, off, specs] of plan) {
    await s.scrollTo(expr, off);
    r.reveal[name] = await s.rec(specs, 1800);
  }
  await s.eval(`(async()=>{document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.documentElement.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}})()`);
  await sleep(1500);
  await s.eval('scrollTo(0,0)');
  await sleep(700);
  r.navScroll = await s.recWhile([['F.nav()', 'backgroundColor'], ['F.nav()', 'borderBottomWidth']], 800, () => s.eval('scrollTo(0, 400)'));
  r.shimmer = await (async () => { await s.scrollTo('F.shimmer()', 400); return s.rec([['F.shimmer()', 'backgroundPosition']], 2000); })();

  r.hover = {};
  for (const [name, target, specs, ms] of HOVERS) {
    await s.scrollTo(target, 350);
    await s.mouse(700, 450);
    await s.mouse(2, 890);
    await sleep(900);
    const [x, y] = await s.center(target);
    const on = await s.recWhile(specs, ms, () => s.mouse(x, y));
    const off = await s.recWhile(specs, ms, () => s.mouse(2, 890));
    r.hover[name] = { on, off };
  }

  // Отзывы: клик по точке.
  await s.scrollTo('F.testiDot(2)', 500);
  r.dot = await s.recWhile([['F.testiCard()', 'opacity'], ['F.testiDot(2)', 'width'], ['F.testiName()', 'text']], 900, () => s.click('F.testiDot(2)'));

  // Форма: фокус и отправка (оригинал ничего не показывает).
  await s.scrollTo('F.input()', 400);
  r.focus = await s.recWhile([['F.input()', 'borderTopColor']], 500, () => s.eval('document.querySelector("#contact input").focus()'));
  const href = await s.eval('location.href');
  await s.eval('document.querySelector("#contact form").requestSubmit()');
  await sleep(500);
  r.afterSubmit = await s.eval(`location.href === ${JSON.stringify(href)} && !!document.querySelector('#contact form')`);

  // «Scroll» — прокрутка к коллекциям.
  await s.eval('scrollTo(0,0)');
  await sleep(500);
  await s.click('F.scrollHint()');
  await sleep(1500);
  r.scrollHint = await s.eval(`Math.round(document.getElementById('collections').getBoundingClientRect().top)`);

  r.errs = await s.eval('window.__errs');
  return r;
}, LOAD, 5600);

const mob = await both(375, async (s) => {
  const r = {};
  await s.goto(300);
  await s.untilBase(5500);
  r.open = await s.recWhile([['F.menu()', 'opacity'], ['F.menu()', 'transform'], ['F.burgerSpan(0)', 'transform'], ['F.burgerSpan(1)', 'transform']], 700, () => s.click('F.burger()'));
  await s.eval(`[...window.__F.menu().querySelectorAll('a')].find((a) => a.textContent.trim() === 'Testimonials').click()`);
  await sleep(1500);
  r.after = await s.eval(`({ menu: !!window.__F.menu(), top: Math.round(document.getElementById('testimonials').getBoundingClientRect().top), span: getComputedStyle(window.__F.burgerSpan(0)).transform })`);
  r.errs = await s.eval('window.__errs');
  return r;
});

// ================= отчёт =================
const { o, t } = desk;
console.log('\n== Загрузка: вступление и первый экран (1440) ==');
{
  const lo = o.load.map(analyze), lt = t.load.map(analyze);
  // Точка отсчёта — начало fadeIn подписи первого экрана (0.4 с после монтирования).
  const bo = o.base, bt = t.base;
  const presence = { 1: [goneAt, 'убран'], 6: [cameAt, 'появились'] };
  LOAD_NAMES.forEach((name, i) => {
    if (i === 0) return;
    if (presence[i]) {
      const [fn, word] = presence[i];
      const a = fn(o.load[i]), b = fn(t.load[i]);
      check(a != null && b != null && near(a - bo, b - bt, 250), `${name} ${word}`, `оригинал через ${a == null ? '—' : a - bo}мс | перевод через ${b == null ? '—' : b - bt}мс`);
      return;
    }
    if (i === 5) {
      const a = goneAt(o.load[i].filter(([tt, v], k, arr) => k > 0 || v != null)), b = goneAt(t.load[i].filter(([tt, v], k) => k > 0 || v != null));
      check(a != null && b != null && near(a - bo, b - bt, 250), `${name} убран при открытии дверей`, `оригинал ${a == null ? '—' : a - bo}мс | перевод ${b == null ? '—' : b - bt}мс`);
      compare(`${name} (fadeIn 1s, delay 0.3)`, rebase(analyze(o.load[i].filter(([, v]) => v != null)), bo), rebase(analyze(t.load[i].filter(([, v]) => v != null)), bt), { dtol: 200 });
      return;
    }
    if ([8, 9, 10, 11, 17, 18, 19].includes(i)) { check(!lo[i].missing && !lt[i].missing && sameVal(lo[i].final, lt[i].final), name + ' — итог (анимация идёт под закрытыми дверями)', lo[i].final + ' | ' + lt[i].final); return; }
    compare(name, rebase(lo[i], bo), rebase(lt[i], bt), { dtol: 200 });
  });
}

console.log('\n== Бесконечные ==');
{
  const spread = (tr, idx) => { const v = tr.filter(([, x]) => x).map(([, x]) => nums(x)[idx] ?? 0); return Math.max(...v) - Math.min(...v); };
  const a = spread(o.inf[0], 5), b = spread(t.inf[0], 5);
  check(near(a, b, 1.5), 'Scroll: покачивание линии', `оригинал ${a.toFixed(1)}px | перевод ${b.toFixed(1)}px`);
  const c = spread(o.inf[1], 7), d = spread(t.inf[1], 7);
  check(near(c, d, 2), 'Explore Collections: пульс тени', `оригинал ${c.toFixed(1)} | перевод ${d.toFixed(1)}`);
  const e = spread(o.inf[2], 3), f = spread(t.inf[2], 3);
  check(near(e, f, 0.15), 'Our Story: мерцание рамки', `оригинал ${e.toFixed(2)} | перевод ${f.toFixed(2)}`);
  const g = spread(o.shimmer[0], 0), h = spread(t.shimmer[0], 0);
  check(near(g, h, 20, 0.2), 'Заявка: переливание «Living Spaces»', `оригинал ${g.toFixed(0)}% | перевод ${h.toFixed(0)}%`);
}

console.log('\n== Таймер отзывов ==');
{
  const bo = o.base, bt = t.base;
  const a = changeAt(o.auto[0]), b = changeAt(t.auto[0]);
  check(phaseNear(phase(a, bo, 6000), phase(b, bt, 6000), 6000, 400), 'Отзывы: смена раз в 6 с (фаза)', `оригинал ${phase(a, bo, 6000)}мс | перевод ${phase(b, bt, 6000)}мс`);
  const cut = (tr, h) => tr.filter(([x]) => h == null || (x >= h - 50 && x <= h + 1500));
  compare('Отзывы: карточка заново (opacity, fadeInUp 0.6)', analyze(cut(o.auto[1], a)), analyze(cut(t.auto[1], b)), { delay: false });
  compare('Отзывы: карточка заново (сдвиг)', analyze(cut(o.auto[2], a)), analyze(cut(t.auto[2], b)), { delay: false });
  compare('Отзывы: активная точка', analyze(cut(o.auto[3], a)), analyze(cut(t.auto[3], b)), { delay: false });
}

console.log('\n== Появление при прокрутке (1440) ==');
for (const name of Object.keys(o.reveal)) {
  const ro = o.reveal[name].map(analyze), rt = t.reveal[name].map(analyze);
  const b0 = ro[0].start ?? 0, b1 = rt[0].start ?? 0;
  const n = ro.length;
  const labels = n === 2 ? ['opacity', 'сдвиг'] : n === 6 ? ['карточка 1', 'карточка 2', 'карточка 3', 'карточка 4', 'сдвиг первой', 'сдвиг четвёртой'] : ['карточка 1', 'карточка 2', 'карточка 3', 'сдвиг первой', 'сдвиг третьей'];
  ro.forEach((x, i) => compare(`${name}: ${labels[i]}`, rebase(x, b0), rebase(rt[i], b1)));
}

console.log('\n== Шапка при прокрутке ==');
compare('Шапка: фон после прокрутки', analyze(o.navScroll[0]), analyze(t.navScroll[0]), { delay: false });
compare('Шапка: нижняя граница', analyze(o.navScroll[1]), analyze(t.navScroll[1]), { delay: false });

console.log('\n== Наведение (1440) ==');
for (const [name, , specs] of HOVERS) {
  specs.forEach(([expr, prop], k) => {
    const label = `${name}: ${expr.replace(/^F\./, '').replace(/\(.*\)/, '')} ${prop}`;
    compare(`${label} (наведение)`, analyze(o.hover[name].on[k]), analyze(t.hover[name].on[k]));
    compare(`${label} (уход)`, analyze(o.hover[name].off[k]), analyze(t.hover[name].off[k]));
  });
}

console.log('\n== Клики и формы (1440) ==');
compare('Отзывы: клик по точке — карточка заново', analyze(o.dot[0]), analyze(t.dot[0]), { delay: false });
compare('Отзывы: клик по точке — точка', analyze(o.dot[1]), analyze(t.dot[1]), { delay: false });
check(o.dot[2].at(-1)[1] === t.dot[2].at(-1)[1], 'Отзывы: имя после клика', `${o.dot[2].at(-1)[1]} | ${t.dot[2].at(-1)[1]}`);
compare('Заявка: рамка поля при фокусе', analyze(o.focus[0]), analyze(t.focus[0]), { delay: false });
check(o.afterSubmit && t.afterSubmit, 'Заявка: отправка без перезагрузки, форма остаётся (как в оригинале)');
check(Math.abs(o.scrollHint) < 40 && Math.abs(t.scrollHint) < 40, 'Scroll: клик прокручивает к коллекциям', `оригинал ${o.scrollHint} | перевод ${t.scrollHint}`);

console.log('\n== Мобильное меню (375) ==');
compare('Меню: панель — opacity', analyze(mob.o.open[0]), analyze(mob.t.open[0]), { delay: false });
compare('Меню: панель — сдвиг', analyze(mob.o.open[1]), analyze(mob.t.open[1]), { delay: false });
compare('Меню: верхняя полоска → крестик', analyze(mob.o.open[2]), analyze(mob.t.open[2]), { delay: false });
compare('Меню: средняя полоска', analyze(mob.o.open[3]), analyze(mob.t.open[3]), { delay: false });
check(!mob.o.after.menu && !mob.t.after.menu && Math.abs(mob.t.after.top) < 60 && mob.t.after.span === mob.o.after.span, 'Меню: пункт закрывает меню и ведёт к разделу', `оригинал ${JSON.stringify(mob.o.after)} | перевод ${JSON.stringify(mob.t.after)}`);

console.log('\n== Консоль ==');
const isRes = (e) => /^https?:\/\//.test(e);
const jsErrs = [...t.errs, ...mob.t.errs].filter((e) => !isRes(e));
check(jsErrs.length === 0, 'нет ошибок скриптов в консоли перевода', jsErrs.join('; '));

console.log(`\n${fails ? `✗ расхождений: ${fails}` : '✓ всё совпадает'}`);
process.exit(fails ? 1 : 0);
