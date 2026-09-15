/* Проверка анимаций и поведения лендинга mockups/landing-5 против оригинала 5.

   node tools/mockups/check-landing-5-motion.mjs [originalUrl] [translationUrl]

   По умолчанию оригинал http://localhost:4335/, перевод http://localhost:4320/landing-5/.
   Методика как в check-landing-1-motion.mjs: один сценарий (загрузка, прокрутка,
   наведение через CDP, клики) на обеих страницах, computed-стили на каждом кадре;
   сравниваются задержка, длительность, прогресс в середине (кривая) и итог.
   Печатает ✓/✗ по пунктам, код выхода 1 при расхождениях. */
import { withBrowser } from './snapshot.mjs';

const ORIG = process.argv[2] ?? 'http://localhost:4335/';
const TW = process.argv[3] ?? 'http://localhost:4320/landing-5/';
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
  const content = () => h1().parentElement;
  const hero = () => h1().closest('section');
  const coll = () => h2('Signature').parentElement.nextElementSibling;
  const feat = () => h2('Discerning').parentElement.nextElementSibling;
  const gal = () => h2('Spaces We Have').parentElement.nextElementSibling;
  return {
    nav: () => $('nav'),
    navLink: () => $('nav a[href="#gallery"]'),
    navBook: () => $('nav a.btn-gold'),
    burger: () => $('nav button'),
    burgerSvg: () => $('nav button svg'),
    menuPanel: () => $('nav').nextElementSibling,
    menuItem: () => $('nav').nextElementSibling.querySelector('a'),
    content,
    est: () => content().children[0],
    h1,
    curtainsText: () => content().children[2],
    line: () => content().children[3],
    heroP: () => content().children[4],
    heroBtns: () => content().children[5],
    btnGold: () => content().children[5].children[0],
    btnOutline: () => content().children[5].children[1],
    stats: () => content().children[6],
    curtainL: () => hero().querySelector('.curtain-left'),
    curtainR: () => hero().querySelector('.curtain-right'),
    discover: () => hero().children[8],
    orb: () => hero().querySelector('.orb-float'),
    marquee: () => $('.marquee-track'),
    collHead: () => h2('Signature').parentElement,
    card: (i) => coll().children[i],
    cardInner: (i) => coll().children[i].firstElementChild,
    cardImg: (i) => coll().children[i].querySelector('img'),
    viewDetails: (i) => coll().children[i].querySelector('button'),
    craftR: () => $('#craftsmanship').firstElementChild.children[1],
    craftBtn: () => $('#craftsmanship a.btn-gold'),
    featHead: () => h2('Discerning').parentElement,
    feat: (i) => feat().children[i],
    featInner: (i) => feat().children[i].firstElementChild,
    galHead: () => h2('Spaces We Have').parentElement,
    tile: (i) => gal().children[i],
    tileImg: (i) => gal().children[i].querySelector('img'),
    testiHead: () => h2('Voices of').parentElement,
    testiCard: () => h2('Voices of').parentElement.nextElementSibling,
    dot: (i) => $('#testimonials').querySelectorAll('button')[i],
    avatar: () => $('.testimonial-avatar'),
    contact: () => h2('Begin Your').parentElement,
    input: () => $('#contact input'),
    confirm: () => $('#contact button'),
    social: () => $('footer button'),
    footerLink: () => byText('footer a', 'Silk Cascade'),
    footerBottom: () => byText('footer a', 'Sitemap'),
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
  // framer-motion на финише WAAPI-анимации (opacity) снимает её раньше, чем пишет итоговый стиль:
  // ровно один кадр getComputedStyle отдаёт initial (opacity 0) между двумя кадрами с итогом.
  // Это не видимая анимация, а порядок чтения в rAF — одиночный выброс, чьи соседи равны, отбрасываем.
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
function compare(name, o, t, { delay = true, curve = true } = {}) {
  const probs = [];
  if (o.missing || t.missing) probs.push('нет элемента');
  else {
    if (!sameVal(o.final, t.final)) probs.push('итог');
    if (!!o.static !== !!t.static) probs.push('наличие анимации');
    else if (!o.static) {
      if (!near(o.dur, t.dur, 70, 0.2)) probs.push('длительность');
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
  ['Шторы: левая уезжает (через 0.7 с, 1.8 с)', 'F.curtainL()', 'transform'],
  ['Шторы: правая уезжает', 'F.curtainR()', 'transform'],
  ['Первый экран: весь контент (opacity, delay 0.6)', 'F.content()', 'opacity'],
  ['Первый экран: «Est. 2008» (opacity, delay 1)', 'F.est()', 'opacity'],
  ['Первый экран: «Est. 2008» (scaleX)', 'F.est()', 'transform'],
  ['Первый экран: SAN (opacity, delay 1.1)', 'F.h1()', 'opacity'],
  ['Первый экран: SAN (translateY 40)', 'F.h1()', 'transform'],
  ['Первый экран: CURTAINS (opacity → 0.7, delay 1.3)', 'F.curtainsText()', 'opacity'],
  ['Первый экран: линия scaleX (delay 1.5)', 'F.line()', 'transform'],
  ['Первый экран: подзаголовок (opacity → 0.85, delay 1.6)', 'F.heroP()', 'opacity'],
  ['Первый экран: подзаголовок (translateY)', 'F.heroP()', 'transform'],
  ['Первый экран: кнопки (opacity, delay 1.9)', 'F.heroBtns()', 'opacity'],
  ['Первый экран: кнопки (translateY)', 'F.heroBtns()', 'transform'],
  ['Первый экран: цифры (opacity, delay 2.2)', 'F.stats()', 'opacity'],
];

const HOVERS = [
  ['Шапка: пункт меню', 'F.navLink()', [['F.navLink()', 'opacity'], ['F.navLink()', 'color']], 600],
  ['Шапка: Book Consultation', 'F.navBook()', [['F.navBook()', 'transform'], ['F.navBook()', 'backgroundPosition']], 700],
  ['Первый экран: Explore Collections', 'F.btnGold()', [['F.btnGold()', 'transform'], ['F.btnGold()', 'backgroundPosition']], 700],
  ['Первый экран: Book Free Consultation', 'F.btnOutline()', [['F.btnOutline()', 'transform'], ['F.btnOutline()', 'borderTopColor'], ['F.btnOutline()', 'color']], 600],
  ['Каталог: карточка', 'F.cardInner(1)', [['F.cardInner(1)', 'transform'], ['F.cardInner(1)', 'boxShadow'], ['F.cardImg(1)', 'transform']], 900],
  ['Каталог: View Details', 'F.viewDetails(1)', [['F.viewDetails(1)', 'opacity'], ['F.viewDetails(1)', 'color']], 500, 'F.cardInner(1)'],
  ['История: Start Your Journey', 'F.craftBtn()', [['F.craftBtn()', 'transform']], 600],
  ['Преимущества: карточка', 'F.featInner(1)', [['F.featInner(1)', 'borderTopColor'], ['F.featInner(1)', 'backgroundColor']], 700],
  ['Портфолио: плитка', 'F.tile(1)', [['F.tileImg(1)', 'transform']], 900],
  ['Портфолио: большая плитка', 'F.tile(0)', [['F.tileImg(0)', 'transform']], 900],
  ['Заявка: Confirm Consultation', 'F.confirm()', [['F.confirm()', 'transform']], 600],
  ['Подвал: соцсеть', 'F.social()', [['F.social()', 'backgroundColor']], 600],
  ['Подвал: ссылка', 'F.footerLink()', [['F.footerLink()', 'opacity'], ['F.footerLink()', 'color']], 500],
  ['Подвал: нижняя ссылка', 'F.footerBottom()', [['F.footerBottom()', 'opacity']], 500],
];

// ================= десктоп 1440 =================
const desk = await both(1440, LOAD.map(([, e, p]) => [e, p]), async (s) => {
  const r = {};
  await s.goto(300);
  r.load = await s.eval('window.__load');
  await sleep(300);
  r.bob = await s.rec([['F.discover()', 'transform']], 4400);
  r.marquee = await s.rec([['F.marquee()', 'transform']], 1500);
  r.orb = await s.rec([['F.orb()', 'transform']], 1000);

  r.reveal = {};
  const grids = [
    ['Портфолио: плитки', 'F.tile(0)', 'tile', 5],
    ['Преимущества: карточки', 'F.feat(0)', 'feat', 4],
    ['Каталог: карточки', 'F.card(0)', 'card', 6],
  ];
  await s.scrollTo('F.contact()', 0);
  await sleep(300);
  for (const [name, first, fn, n] of grids) {
    await s.scrollTo(first, 40);
    const specs = Array.from({ length: n }, (_, i) => [`F.${fn}(${i})`, 'opacity']).concat([[`F.${fn}(0)`, 'transform']]);
    r.reveal[name] = await s.rec(specs, 1600);
  }
  await s.goto(300);
  await sleep(3500);
  await s.eval('document.documentElement.style.scrollBehavior = "auto"; scrollTo(0, document.documentElement.scrollHeight)');
  await sleep(100);
  for (const [name, target, offset] of [
    ['Заявка', 'F.contact()', 200],
    ['Отзывы: карточка', 'F.testiCard()', 200],
    ['Отзывы: заголовок', 'F.testiHead()', 200],
    ['Портфолио: заголовок', 'F.galHead()', 200],
    ['Преимущества: заголовок', 'F.featHead()', 200],
    ['История: текст (delay 0.2)', 'F.craftR()', 100],
    ['Каталог: заголовок', 'F.collHead()', 200],
  ]) {
    await s.scrollTo(target, offset);
    r.reveal[name] = await s.rec([[target, 'opacity'], [target, 'transform']], 1500);
  }
  await s.eval(`(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}})()`);
  await sleep(1500);

  await s.eval('scrollTo(0,0)');
  await sleep(700);
  r.navScroll = await s.recWhile([['F.nav()', 'backgroundColor'], ['F.nav()', 'backdropFilter'], ['F.nav()', 'borderBottomColor']], 900, () => s.eval('scrollTo(0, 400)'));

  r.hover = {};
  for (const [name, target, specs, ms, pre] of HOVERS) {
    await s.scrollTo(target, 350);
    await s.mouse(2, 2);
    await sleep(900);
    if (pre) {
      const [px, py] = await s.center(pre);
      await s.mouse(px, py);
      await sleep(800);
    }
    const [x, y] = await s.center(target);
    const on = await s.recWhile(specs, ms, () => s.mouse(x, y));
    const off = await s.recWhile(specs, ms, () => s.mouse(2, 2));
    r.hover[name] = { on, off };
  }

  await s.scrollTo('F.dot(1)', 500);
  await s.mouse(2, 2);
  await sleep(300);
  r.review = await s.recWhile([['F.dot(1)', 'width'], ['F.dot(0)', 'width'], ['F.dot(1)', 'backgroundColor'], ['F.avatar()', 'text']], 800, () => s.click('F.dot(1)'));

  r.errs = await s.eval('window.__errs');
  r.broken = await s.eval('[...document.images].filter((i) => i.naturalWidth === 0).map((i) => i.src)');
  return r;
});

// ================= телефон 375 =================
const mob = await both(375, [], async (s) => {
  const r = {};
  await s.goto(3500);
  r.open = await s.recWhile([['F.menuPanel()', 'opacity'], ['F.menuPanel()', 'pointerEvents'], ['F.burgerSvg()', 'class']], 600, () => s.click('F.burger()'));
  r.close = await s.recWhile([['F.menuPanel()', 'opacity'], ['F.menuPanel()', 'pointerEvents'], ['F.burgerSvg()', 'class']], 600, () => s.click('F.burger()'));
  await sleep(300);
  await s.click('F.burger()');
  await sleep(500);
  r.item = await s.recWhile([['F.menuPanel()', 'opacity']], 700, () => s.click('F.menuItem()'));
  r.errs = await s.eval('window.__errs');
  return r;
});

const { o, t } = desk;
console.log('\n== Загрузка страницы (1440) ==');
{
  const lo = o.load.map(analyze), lt = t.load.map(analyze);
  const base = (arr) => arr[0].start ?? 0; // от начала движения левой шторы: React монтируется позже HTML
  LOAD.forEach(([name], i) => compare(name, { ...lo[i], start: lo[i].start - base(lo) }, { ...lt[i], start: lt[i].start - base(lt) }));
}
{
  const series = (track) => track.filter(([, v]) => v).map(([tt, v]) => [tt, nums(v)[5] ?? 0]);
  const so = series(o.bob[0]), st = series(t.bob[0]);
  const info = (s) => {
    const amp = Math.max(...s.map((p) => p[1]));
    const peaks = s.filter((p, i) => i > 0 && i < s.length - 1 && p[1] >= s[i - 1][1] && p[1] > s[i + 1][1] && p[1] > amp * 0.8).map((p) => p[0]);
    return { amp, period: peaks.length > 1 ? Math.round((peaks.at(-1) - peaks[0]) / (peaks.length - 1)) : 0 };
  };
  const bo = info(so), bt = info(st);
  check(near(bo.amp, bt.amp, 0.5) && near(bo.period, bt.period, 80), '«Discover»: бесконечное покачивание (невидимое, opacity 0)', `оригинал: амплитуда ${bo.amp.toFixed(2)}px, период ${bo.period}мс | перевод: амплитуда ${bt.amp.toFixed(2)}px, период ${bt.period}мс`);
  const trough = (s) => s.slice(1, -1).find((p, i) => p[1] <= s[i][1] && p[1] < s[i + 2][1] && p[1] < 0.5)?.[0] ?? 0;
  const at = (s, t0, tt) => s.reduce((b, q) => (Math.abs(q[0] - t0 - tt) < Math.abs(b[0] - t0 - tt) ? q : b))[1];
  const to = trough(so), tt0 = trough(st);
  let worst = 0;
  for (let x = 0; x <= 2000; x += 50) worst = Math.max(worst, Math.abs(at(so, to, x) - at(st, tt0, x)));
  check(worst <= 1, '«Discover»: форма покачивания', `макс. расхождение ${worst.toFixed(2)}px`);
  const disc = (r) => r.load; // noop
  void disc;
}
{
  const speed = (track) => {
    const s = track.filter(([, v]) => v).map(([tt, v]) => [tt, nums(v)[4]]);
    return ((s.at(-1)[1] - s[0][1]) / (s.at(-1)[0] - s[0][0])) * 1000;
  };
  const so = speed(o.marquee[0]), st = speed(t.marquee[0]);
  check(so < -1 && near(so, st, 3, 0.1), 'Бегущая строка: линейное движение', `оригинал ${so.toFixed(1)} px/с | перевод ${st.toFixed(1)} px/с`);
  const moving = (track) => new Set(track.map(([, v]) => v)).size > 3;
  check(moving(o.orb[0]) && moving(t.orb[0]), 'Первый экран: пятна света плавают (floatOrb)');
}

console.log('\n== Появление при прокрутке (1440) ==');
for (const name of Object.keys(o.reveal)) {
  const ro = o.reveal[name].map(analyze), rt = t.reveal[name].map(analyze);
  const b0 = ro[0].start ?? 0, b1 = rt[0].start ?? 0;
  const many = o.reveal[name].length > 2;
  ro.forEach((x, i) => {
    const label = many ? (i === ro.length - 1 ? 'transform первой' : `элемент ${i + 1}`) : ['opacity', 'transform'][i];
    // Одиночный блок с delay: задержку считаем от момента прокрутки, а не от своего старта.
    const single = !many && /delay/.test(name);
    compare(`${name}: ${label}`, single ? x : { ...x, start: x.start - b0 }, single ? rt[i] : { ...rt[i], start: rt[i].start - b1 }, { delay: !single || true });
  });
}

console.log('\n== Шапка при прокрутке ==');
compare('Шапка: фон после прокрутки > 60px', analyze(o.navScroll[0]), analyze(t.navScroll[0]), { delay: false });
compare('Шапка: размытие фона', analyze(o.navScroll[1]), analyze(t.navScroll[1]), { delay: false });
compare('Шапка: нижняя рамка', analyze(o.navScroll[2]), analyze(t.navScroll[2]), { delay: false });

console.log('\n== Наведение (1440) ==');
for (const [name, , specs] of HOVERS) {
  specs.forEach(([expr, prop], k) => {
    compare(`${name}: ${expr.replace('F.', '')} ${prop} (наведение)`, analyze(o.hover[name].on[k]), analyze(t.hover[name].on[k]));
    compare(`${name}: ${expr.replace('F.', '')} ${prop} (уход)`, analyze(o.hover[name].off[k]), analyze(t.hover[name].off[k]));
  });
}

console.log('\n== Отзывы (1440) ==');
compare('Отзывы: точка 2 растягивается', analyze(o.review[0]), analyze(t.review[0]), { delay: false });
compare('Отзывы: точка 1 сжимается', analyze(o.review[1]), analyze(t.review[1]), { delay: false });
compare('Отзывы: цвет точки 2', analyze(o.review[2]), analyze(t.review[2]), { delay: false });
check(o.review[3].at(-1)[1] === t.review[3].at(-1)[1] && t.review[3].at(-1)[1] === 'RS', 'Отзывы: сменился автор', `${o.review[3].at(-1)[1]} | ${t.review[3].at(-1)[1]}`);

console.log('\n== Мобильное меню (375) ==');
compare('Меню: открытие — opacity', analyze(mob.o.open[0]), analyze(mob.t.open[0]), { delay: false });
check(mob.o.open[1].at(-1)[1] === mob.t.open[1].at(-1)[1], 'Меню: pointer-events при открытии', `${mob.o.open[1].at(-1)[1]} | ${mob.t.open[1].at(-1)[1]}`);
check(/lucide-x/.test(mob.o.open[2].at(-1)[1]) && /lucide-x/.test(mob.t.open[2].at(-1)[1]), 'Меню: иконка «x» при открытом меню');
compare('Меню: закрытие — opacity', analyze(mob.o.close[0]), analyze(mob.t.close[0]), { delay: false });
check(mob.o.close[1].at(-1)[1] === mob.t.close[1].at(-1)[1], 'Меню: pointer-events после закрытия', `${mob.o.close[1].at(-1)[1]} | ${mob.t.close[1].at(-1)[1]}`);
compare('Меню: клик по пункту закрывает', analyze(mob.o.item[0]), analyze(mob.t.item[0]), { delay: false });

console.log('\n== Консоль ==');
const isRes = (e) => /^https?:\/\//.test(e);
const jsErrs = [...t.errs, ...mob.t.errs].filter((e) => !isRes(e));
check(jsErrs.length === 0, 'нет ошибок скриптов в консоли перевода', jsErrs.join('; '));
const extra = t.broken.filter((u) => !o.broken.includes(u));
check(extra.length === 0, 'не загрузились только те картинки, что и в оригинале', `оригинал ${o.broken.length}, перевод ${t.broken.length}${extra.length ? ': лишние ' + extra.join(', ') : ''}`);

console.log(`\n${fails ? `✗ расхождений: ${fails}` : '✓ всё совпадает'}`);
process.exit(fails ? 1 : 0);
