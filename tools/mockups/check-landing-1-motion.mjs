/* Проверка анимаций и поведения лендинга mockups/landing-1 против оригинала.

   node tools/mockups/check-landing-1-motion.mjs [originalUrl] [translationUrl]

   По умолчанию оригинал http://localhost:4331/, перевод http://localhost:4320/landing-1/.
   Один и тот же сценарий (загрузка, прокрутка, наведение через CDP, клик, фокус)
   проигрывается на обеих страницах; на каждом кадре (requestAnimationFrame)
   пишутся computed-стили. По записи считаются задержка, длительность, прогресс
   в середине анимации (грубая проверка кривой) и конечное значение — они и
   сравниваются. Печатает ✓/✗ по каждому пункту, код выхода 1 при ошибках. */
import { withBrowser } from './snapshot.mjs';

const ORIG = process.argv[2] ?? 'http://localhost:4331/';
const TW = process.argv[3] ?? 'http://localhost:4320/landing-1/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (ok, name, extra = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

// ---------- поиск элементов: одинаковые выражения для обеих страниц ----------
const FIND = `(() => {
  const h2 = (t) => [...document.querySelectorAll('h2')].find((h) => h.textContent.includes(t));
  const head = (t) => h2(t).closest('.text-center').parentElement;
  const byText = (sel, t) => [...document.querySelectorAll(sel)].find((e) => e.textContent.trim() === t);
  const cards = (t) => [...head(t).nextElementSibling.children];
  return {
    nav: () => document.querySelector('nav'),
    navLink: () => document.querySelector('nav a[href="#gallery"]'),
    navQuote: () => byText('nav a', 'Free Quote'),
    burger: () => document.querySelector('button[aria-label="Toggle menu"]'),
    burgerTop: () => document.querySelector('button[aria-label="Toggle menu"]')?.children[0],
    burgerMid: () => document.querySelector('button[aria-label="Toggle menu"]')?.children[1],
    menuPanel: () => document.querySelector('nav')?.children[1],
    heroContent: () => document.querySelector('#hero h1')?.parentElement,
    heroStats: () => byText('#hero div', '500+')?.parentElement.parentElement,
    scrollInd: () => byText('#hero span', 'Scroll')?.parentElement,
    scrollBob: () => byText('#hero span', 'Scroll')?.nextElementSibling,
    estimate: () => byText('a', 'Get a Free Estimate'),
    viewServices: () => byText('a', 'View Our Services'),
    aboutHead: () => head('Most Trusted'),
    aboutCard: (i) => cards('Most Trusted')[i],
    aboutInner: (i) => cards('Most Trusted')[i].firstElementChild,
    servicesHead: () => head('Six Ways'),
    serviceCard: (i) => cards('Six Ways')[i],
    serviceInner: (i) => cards('Six Ways')[i].firstElementChild,
    book: () => head('Six Ways').nextElementSibling.nextElementSibling,
    bookLink: () => byText('a', 'Book Your Free Consultation'),
    learnMore: () => [...document.querySelectorAll('#services button')][0],
    features: () => { const b = [...document.querySelectorAll('#services button')][0]; const p = b.previousElementSibling; return p && p.tagName === 'UL' ? p : null; },
    galleryHead: () => head('Real Homes'),
    galleryCard: (i) => cards('Real Homes')[i],
    galleryInner: (i) => cards('Real Homes')[i].firstElementChild,
    galleryImg: (i) => cards('Real Homes')[i].querySelector('img'),
    galleryOverlay: (i) => cards('Real Homes')[i].firstElementChild.children[1],
    pricingHead: () => head('Simple Packages'),
    priceCard: (i) => cards('Simple Packages')[i],
    priceInner: (i) => cards('Simple Packages')[i].firstElementChild,
    priceCta: (i) => cards('Simple Packages')[i].querySelector('a'),
    testiHead: () => h2('Washington Clients').parentElement,
    slide: () => document.querySelector('button[aria-label="Review 1"]').parentElement.previousElementSibling,
    slideName: () => document.querySelector('button[aria-label="Review 1"]').parentElement.previousElementSibling.children[3],
    dot2: () => document.querySelector('button[aria-label="Review 2"]'),
    contactLeft: () => h2('Ready to Transform').parentElement.parentElement,
    contactRight: () => h2('Ready to Transform').parentElement.parentElement.nextElementSibling,
    thanks: () => h2('Ready to Transform').parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild,
    nameInput: () => document.getElementById('name'),
    submit: () => document.querySelector('#contact button[type=submit]'),
    footerLink: () => document.querySelector('footer a[href="#services"]'),
    footerQuote: () => document.querySelector('footer a[href="#contact"]'),
  };
})()`;

// Запись: specs = [[выражение элемента, свойство]], ms — сколько кадров писать.
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
      if (el && el.isConnected) v = prop === 'height' ? String(el.getBoundingClientRect().height) : prop === 'text' ? el.textContent.trim() : getComputedStyle(el)[prop];
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
  return m;
};
const dist = (a, b) => {
  const n = Math.max(a.length, b.length);
  let s = 0;
  for (let i = 0; i < n; i++) s += ((a[i] ?? 0) - (b[i] ?? 0)) ** 2;
  return Math.sqrt(s);
};
// Анализ одной дорожки: задержка, длительность, прогресс в середине, конечное значение.
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

// Сравнение: длительность ±max(70мс, 20%), задержка ±max(80мс, 20%), середина ±0.18, итог.
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

async function session(url, width, fn) {
  return withBrowser(async (page) => {
    await page.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errs=[];addEventListener('error',e=>{__errs.push(String((e.target&&(e.target.src||e.target.href))||e.message))},true);
        const __ce=console.error;console.error=(...a)=>{__errs.push(a.join(' '));__ce(...a)};
        ${REC}
        window.__load = __rec(${JSON.stringify([
          ['F.nav()', 'transform'],
          ['F.heroContent()', 'opacity'],
          ['F.heroContent()', 'transform'],
          ['F.heroStats()', 'opacity'],
          ['F.scrollInd()', 'opacity'],
          ['F.scrollBob()', 'transform'],
        ])}, 4500);`,
    });
    const api = {
      page,
      goto: (settle = 300) => page.goto(url, settle),
      eval: (e) => page.eval(e),
      rec: (specs, ms) => page.eval(`__rec(${JSON.stringify(specs)}, ${ms})`),
      // Запись запускается, затем действие (через CDP), затем ждём запись.
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

// Прогон сценария в оригинале и в переводе (по очереди: Chrome тяжёлый, другие агенты тоже его запускают).
async function both(width, fn) {
  const run = async (url) => {
    for (let i = 0; ; i++) {
      try {
        return await session(url, width, fn);
      } catch (e) {
        if (i < 3 && /EBUSY|DevToolsActivePort|ECONNREFUSED/.test(String(e))) { await sleep(1500); continue; }
        throw e;
      }
    }
  };
  return { o: await run(ORIG), t: await run(TW) };
}

const HOVERS = [
  ['Шапка: пункт меню', 'F.navLink()', [['F.navLink()', 'color']], 600],
  ['Шапка: Free Quote', 'F.navQuote()', [['F.navQuote()', 'opacity']], 600],
  ['Первый экран: Get a Free Estimate', 'F.estimate()', [['F.estimate()', 'transform'], ['F.estimate()', 'boxShadow']], 600],
  ['Первый экран: View Our Services', 'F.viewServices()', [['F.viewServices()', 'borderTopColor'], ['F.viewServices()', 'color']], 600],
  ['Why Choose Us: карточка', 'F.aboutInner(1)', [['F.aboutInner(1)', 'transform']], 700],
  ['Services: карточка', 'F.serviceInner(1)', [['F.serviceInner(1)', 'transform']], 700],
  ['Services: Book Your Free Consultation', 'F.bookLink()', [['F.bookLink()', 'backgroundColor']], 600],
  ['Gallery: картинка при наведении на карточку', 'F.galleryInner(1)', [['F.galleryImg(1)', 'transform'], ['F.galleryOverlay(1)', 'opacity']], 900],
  ['Gallery: наведение на подпись (оверлей) — тот же эффект', 'F.galleryOverlay(4)', [['F.galleryImg(4)', 'transform'], ['F.galleryOverlay(4)', 'opacity']], 900],
  ['Pricing: карточка', 'F.priceInner(2)', [['F.priceInner(2)', 'transform']], 700],
  ['Pricing: кнопка тарифа', 'F.priceCta(0)', [['F.priceCta(0)', 'opacity']], 600],
  ['Contact: кнопка отправки', 'F.submit()', [['F.submit()', 'backgroundColor'], ['F.submit()', 'color']], 600],
  ['Подвал: ссылка', 'F.footerLink()', [['F.footerLink()', 'color']], 600],
  ['Подвал: Free Quote', 'F.footerQuote()', [['F.footerQuote()', 'opacity']], 600],
];

// ================= десктоп 1440 =================
const desk = await both(1440, async (s) => {
  const r = {};
  await s.goto(300);
  r.load = await s.eval('window.__load');
  await sleep(500);
  r.bob = await s.rec([['F.scrollBob()', 'transform']], 3200);

  // Появление при прокрутке. Прыгаем прокруткой снизу вверх, чтобы проверяемый блок
  // появлялся впервые: сначала сетки карточек (вся сетка в экране)…
  r.reveal = {};
  const grids = [
    ['Pricing', 'F.priceCard(0)', 'priceCard', 3],
    ['Gallery', 'F.galleryCard(0)', 'galleryCard', 6],
    ['Services', 'F.serviceCard(0)', 'serviceCard', 6],
    ['Why Choose Us', 'F.aboutCard(0)', 'aboutCard', 4],
  ];
  for (const [name, first, fn, n] of grids) {
    await s.scrollTo(first, 40);
    const specs = Array.from({ length: n }, (_, i) => [`F.${fn}(${i})`, 'opacity']).concat([[`F.${fn}(0)`, 'transform']]);
    r.reveal[name] = await s.rec(specs, 1500);
  }
  // …потом, на свежей загрузке, заголовки, кнопка под сеткой услуг и колонки формы.
  await s.goto(300);
  await sleep(1500);
  await s.scrollTo('F.contactLeft()', 150);
  r.reveal['Contact: колонки'] = await s.rec([['F.contactLeft()', 'opacity'], ['F.contactRight()', 'opacity']], 1500);
  for (const [name, expr, offset] of [['Отзывы: заголовок', 'F.testiHead()', 200], ['Pricing: заголовок', 'F.pricingHead()', 200], ['Services: кнопка под сеткой', 'F.book()', 800], ['Gallery: заголовок', 'F.galleryHead()', 200], ['Services: заголовок', 'F.servicesHead()', 200], ['Why Choose Us: заголовок', 'F.aboutHead()', 200]]) {
    await s.scrollTo(expr, offset);
    r.reveal[name] = await s.rec([[expr, 'opacity'], [expr, 'transform']], 1300);
  }

  // Прокручиваем всё, чтобы появления закончились.
  await s.eval(`(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}})()`);
  await sleep(1200);

  // Шапка после прокрутки.
  await s.eval('scrollTo(0,0)');
  await sleep(700);
  r.navScroll = await s.recWhile([['F.nav()', 'backgroundColor']], 800, () => s.eval('scrollTo(0, 400)'));

  // Наведение.
  r.hover = {};
  for (const [name, target, specs, ms] of HOVERS) {
    await s.scrollTo(target, 350);
    await s.mouse(2, 2);
    await sleep(700);
    const [x, y] = await s.center(target);
    const on = await s.recWhile(specs, ms, () => s.mouse(x, y));
    const off = await s.recWhile(specs, ms, () => s.mouse(2, 450));
    r.hover[name] = { on, off };
  }

  // Services: Learn More.
  await s.scrollTo('F.learnMore()', 500);
  await s.mouse(2, 450);
  r.more = await s.recWhile([['F.features()', 'height'], ['F.features()', 'opacity'], ['F.learnMore()', 'text']], 700, () => s.click('F.learnMore()'));
  r.moreClose = await s.recWhile([['F.features()', 'opacity'], ['F.learnMore()', 'text']], 700, () => s.click('F.learnMore()'));

  // Отзывы: точка 2.
  await s.scrollTo('F.dot2()', 500);
  r.review = await s.recWhile([['F.slide()', 'opacity'], ['F.slide()', 'transform'], ['F.dot2()', 'width'], ['F.slideName()', 'text']], 1300, () => s.click('F.dot2()'));

  // Форма: фокус и отправка.
  await s.scrollTo('F.nameInput()', 400);
  r.focus = await s.recWhile([['F.nameInput()', 'borderTopColor']], 500, () => s.eval('document.getElementById("name").focus()'));
  await s.eval(`(() => { const set = (id, v) => { const el = document.getElementById(id); el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }; set('name', 'Test'); set('email', 'a@b.cd'); })()`);
  const TH = '(() => { const e = F.thanks(); return e && /Thank You/.test(e.textContent) ? e : null; })()';
  r.thanks = await s.recWhile([[TH, 'opacity'], [TH, 'transform'], ['F.thanks()', 'text']], 800, () => s.eval('document.querySelector("#contact form").requestSubmit()'));

  r.errs = await s.eval('window.__errs');
  r.broken = await s.eval('[...document.images].filter((i) => i.naturalWidth === 0).map((i) => i.src)');
  return r;
});

// ================= телефон 375 =================
const mob = await both(375, async (s) => {
  const r = {};
  await s.goto(1500);
  r.open = await s.recWhile([['F.menuPanel()', 'height'], ['F.menuPanel()', 'opacity'], ['F.burgerTop()', 'transform'], ['F.burgerMid()', 'opacity']], 700, () => s.click('F.burger()'));
  r.close = await s.recWhile([['F.menuPanel()', 'height'], ['F.burgerTop()', 'transform'], ['F.burgerMid()', 'opacity']], 800, () => s.click('F.burger()'));
  r.errs = await s.eval('window.__errs');
  return r;
});

const { o, t } = desk;
console.log('\n== Загрузка страницы (1440) ==');
const L = ['Шапка: выезд сверху (transform)', 'Первый экран: текст (opacity)', 'Первый экран: текст (transform)', 'Первый экран: цифры (opacity, delay 0.8)', 'Индикатор Scroll (opacity, delay 1.2)'];
const lo = o.load.map(analyze), lt = t.load.map(analyze);
// Задержки считаем от начала анимации шапки: React монтирует страницу позже, чем HTML.
const base = (arr) => arr[0].start ?? 0;
L.forEach((name, i) => {
  const a = { ...lo[i], start: lo[i].start - base(lo) }, b = { ...lt[i], start: lt[i].start - base(lt) };
  compare(name, a, b);
});
const bob = (track) => {
  const ys = track.filter(([, v]) => v).map(([tt, v]) => [tt, nums(v)[5]]);
  const peaks = ys.filter((p, i) => i > 0 && i < ys.length - 1 && p[1] >= ys[i - 1][1] && p[1] > ys[i + 1][1] && p[1] > 6).map((p) => p[0]);
  const period = peaks.length > 1 ? (peaks[peaks.length - 1] - peaks[0]) / (peaks.length - 1) : 0;
  return { amp: Math.max(...ys.map((p) => p[1])), period: Math.round(period) };
};
const bo = bob(o.bob[0]), bt = bob(t.bob[0]);
check(near(bo.amp, bt.amp, 0.5) && near(bo.period, bt.period, 80), 'Индикатор Scroll: бесконечное покачивание', `оригинал: амплитуда ${bo.amp.toFixed(2)}px, период ${bo.period}мс | перевод: амплитуда ${bt.amp.toFixed(2)}px, период ${bt.period}мс`);
{
  // Форма волны: выравниваем по первому нижнему положению и сравниваем период.
  const series = (track) => track.filter(([, v]) => v).map(([tt, v]) => [tt, nums(v)[5]]);
  const so = series(o.bob[0]), st = series(t.bob[0]);
  const trough = (s) => s.slice(1, -1).find((p, i) => p[1] <= s[i][1] && p[1] < s[i + 2][1] && p[1] < 0.5)?.[0] ?? 0;
  const at = (s, t0, tt) => s.reduce((b, q) => (Math.abs(q[0] - t0 - tt) < Math.abs(b[0] - t0 - tt) ? q : b))[1];
  const to = trough(so), tt0 = trough(st);
  let worst = 0;
  const row = [];
  for (let x = 0; x <= 1500; x += 75) {
    const a = at(so, to, x), b = at(st, tt0, x);
    worst = Math.max(worst, Math.abs(a - b));
    if (x % 375 === 0) row.push(`${x}:${a.toFixed(1)}/${b.toFixed(1)}`);
  }
  check(worst <= 1, 'Индикатор Scroll: форма покачивания', `макс. расхождение ${worst.toFixed(2)}px; оригинал/перевод ${row.join(' ')}`);
}

console.log('\n== Появление при прокрутке (1440) ==');
for (const name of Object.keys(o.reveal)) {
  const ro = o.reveal[name].map(analyze), rt = t.reveal[name].map(analyze);
  const b0 = ro[0].start ?? 0, b1 = rt[0].start ?? 0;
  ro.forEach((x, i) => {
    const label = /колонки/.test(name) ? ['левая', 'правая (delay 0.15)'][i] : o.reveal[name].length > 2 && i === ro.length - 1 ? 'transform первой' : ro.length > 2 ? `карточка ${i + 1}` : ['opacity', 'transform'][i];
    compare(`${name}: ${label}`, { ...x, start: x.start - b0 }, { ...rt[i], start: rt[i].start - b1 });
  });
}

console.log('\n== Шапка при прокрутке ==');
compare('Шапка: фон после прокрутки > 60px', analyze(o.navScroll[0]), analyze(t.navScroll[0]), { delay: false });

console.log('\n== Наведение (1440) ==');
for (const [name, , specs] of HOVERS) {
  specs.forEach(([expr, prop], k) => {
    compare(`${name}: ${prop} (наведение)`, analyze(o.hover[name].on[k]), analyze(t.hover[name].on[k]));
    compare(`${name}: ${prop} (уход)`, analyze(o.hover[name].off[k]), analyze(t.hover[name].off[k]));
  });
}

console.log('\n== Клики и формы (1440) ==');
compare('Services: Learn More — высота списка', analyze(o.more[0]), analyze(t.more[0]), { delay: false, curve: false });
compare('Services: Learn More — opacity списка', analyze(o.more[1]), analyze(t.more[1]), { delay: false });
check(o.more[2].at(-1)[1] === t.more[2].at(-1)[1], 'Services: текст кнопки после раскрытия', `${o.more[2].at(-1)[1]} | ${t.more[2].at(-1)[1]}`);
{
  const go = o.moreClose[0].find(([, v]) => v == null)?.[0], gt = t.moreClose[0].find(([, v]) => v == null)?.[0];
  check(go != null && gt != null && near(go, gt, 90), 'Services: Less Info — список сворачивается и удаляется', `оригинал через ${go}мс | перевод через ${gt}мс`);
  check(o.moreClose[1].at(-1)[1] === t.moreClose[1].at(-1)[1], 'Services: текст кнопки после сворачивания', `${o.moreClose[1].at(-1)[1]} | ${t.moreClose[1].at(-1)[1]}`);
}
// Отзывы: сравниваем траектории opacity/transform на сетке 50мс от первого изменения.
const traj = (track, idx) => {
  const pts = track.filter(([, v]) => v != null).map(([tt, v]) => [tt, idx(nums(v))]);
  const s0 = pts.find(([, v]) => Math.abs(v - pts[0][1]) > 0.01)?.[0] ?? 0;
  return (tt) => pts.reduce((b, q) => (Math.abs(q[0] - s0 - tt) < Math.abs(b[0] - s0 - tt) ? q : b))[1];
};
for (const [k, label, idx, tol] of [[0, 'opacity', (v) => v[0], 0.2], [1, 'translateX', (v) => v[4], 7]]) {
  const fo = traj(o.review[k], idx), ft = traj(t.review[k], idx);
  let worst = 0, at = 0;
  // 360–450мс — подмена слайда (старый ушёл при opacity 0, новый встаёт справа):
  // скачок translateX там на кадр раньше или позже, глазом не виден.
  for (let tt = 0; tt <= 900; tt += 50) {
    if (label === 'translateX' && tt >= 360 && tt <= 450) continue;
    const d = Math.abs(fo(tt) - ft(tt));
    if (d > worst) { worst = d; at = tt; }
  }
  const row = [0, 200, 300, 500, 600, 800].map((tt) => `${tt}:${fo(tt).toFixed(2)}/${ft(tt).toFixed(2)}`).join(' ');
  check(worst <= tol, `Отзывы: смена слайда (уход влево, приход справа) — ${label}`, `макс. расхождение ${worst.toFixed(2)} на ${at}мс; оригинал/перевод ${row}`);
}
compare('Отзывы: ширина активной точки', analyze(o.review[2]), analyze(t.review[2]), { delay: false });
check(o.review[3].at(-1)[1] === t.review[3].at(-1)[1], 'Отзывы: новый текст', `${o.review[3].at(-1)[1]} | ${t.review[3].at(-1)[1]}`);
compare('Contact: рамка поля при фокусе', analyze(o.focus[0]), analyze(t.focus[0]), { delay: false });
compare('Contact: Thank You — opacity', analyze(o.thanks[0]), analyze(t.thanks[0]), { delay: false });
compare('Contact: Thank You — scale', analyze(o.thanks[1]), analyze(t.thanks[1]), { delay: false });
check(/Thank You!/.test(o.thanks[2].at(-1)[1] ?? '') && /Thank You!/.test(t.thanks[2].at(-1)[1] ?? ''), 'Contact: сообщение «Thank You!» вместо формы');

console.log('\n== Мобильное меню (375) ==');
compare('Меню: открытие — высота панели', analyze(mob.o.open[0]), analyze(mob.t.open[0]), { delay: false, curve: false });
compare('Меню: открытие — opacity панели', analyze(mob.o.open[1]), analyze(mob.t.open[1]), { delay: false });
compare('Меню: верхняя полоска → крестик', analyze(mob.o.open[2]), analyze(mob.t.open[2]), { delay: false });
compare('Меню: средняя полоска гаснет', analyze(mob.o.open[3]), analyze(mob.t.open[3]), { delay: false });
{
  const go = mob.o.close[0].find(([, v]) => v == null)?.[0], gt = mob.t.close[0].find(([, v]) => v == null)?.[0];
  check(go != null && gt != null && near(go, gt, 90), 'Меню: закрытие — панель сворачивается и удаляется', `оригинал через ${go}мс | перевод через ${gt}мс`);
}
compare('Меню: закрытие — полоска обратно', analyze(mob.o.close[1]), analyze(mob.t.close[1]), { delay: false });

console.log('\n== Консоль ==');
// Незагрузившиеся ресурсы (внешние фото Unsplash из этой среды недоступны) отделяем
// от ошибок скриптов и сравниваем с оригиналом.
const isRes = (e) => /^https?:\/\//.test(e);
const jsErrs = [...t.errs, ...mob.t.errs].filter((e) => !isRes(e));
check(jsErrs.length === 0, 'нет ошибок скриптов в консоли перевода', jsErrs.join('; '));
// Событие error у внешних картинок приходит в разное время — сравниваем сами <img>.
const extra = t.broken.filter((u) => !o.broken.includes(u));
check(extra.length === 0, 'не загрузились только те картинки, что и в оригинале', `оригинал ${o.broken.length}, перевод ${t.broken.length}${extra.length ? ': лишние ' + extra.join(', ') : ''}`);

console.log(`\n${fails ? `✗ расхождений: ${fails}` : '✓ всё совпадает'}`);
process.exit(fails ? 1 : 0);
