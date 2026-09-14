/* Проверка анимаций и поведения лендинга mockups/landing-8 против оригинала 8.

   node tools/mockups/check-landing-8-motion.mjs [originalUrl] [translationUrl]

   По умолчанию оригинал http://localhost:4338/, перевод http://localhost:4320/landing-8/.
   Сценарий (загрузка, прокрутка, наведение и клики через CDP, фокус) проигрывается
   на обеих страницах, на каждом кадре пишутся computed-стили; сравниваются задержка,
   длительность, прогресс в середине и итог. ✓/✗ по пунктам, код выхода 1 при ошибках. */
import { withBrowser } from './snapshot.mjs';

const ORIG = process.argv[2] ?? 'http://localhost:4338/';
const TW = process.argv[3] ?? 'http://localhost:4320/landing-8/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (ok, name, extra = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

const FIND = `(() => {
  const byText = (sel, t) => [...document.querySelectorAll(sel)].find((e) => e.textContent.trim() === t);
  const cards = (t) => [...document.querySelectorAll('h2')].find((h) => h.textContent.includes(t))?.parentElement.nextElementSibling;
  const faq = () => [...document.querySelectorAll('button')].filter((b) => /\\?$/.test(b.textContent.trim()));
  return {
    intro: () => document.querySelector('[class*="z-[200]"]'),
    introPanel: () => document.querySelector('[class*="z-[200]"]')?.firstElementChild,
    introLogo: () => document.querySelector('[class*="z-[200]"]')?.lastElementChild,
    hero: () => document.querySelector('#home h1')?.parentElement,
    bob: () => byText('#home span', 'SCROLL')?.nextElementSibling,
    header: () => document.querySelector('header'),
    navLink: () => document.querySelector('header nav a[href="#about"]'),
    navQuote: () => [...document.querySelectorAll('header > div a')].find((a) => a.textContent.trim() === 'FREE CONSULTATION'),
    explore: () => byText('a', 'EXPLORE COLLECTION'),
    bookHero: () => byText('a', 'BOOK FREE CONSULTATION'),
    counter: () => document.querySelector('#home')?.nextElementSibling.querySelector('.text-center > div'),
    service: (i) => document.querySelectorAll('#services .grid > div')[i],
    serviceH3: (i) => document.querySelectorAll('#services .grid > div')[i]?.querySelector('h3'),
    coll: (i) => document.querySelectorAll('#collections .grid > div')[i],
    collImg: (i) => document.querySelectorAll('#collections .grid > div')[i]?.querySelector('img'),
    collExplore: (i) => document.querySelectorAll('#collections .grid > div')[i]?.lastElementChild.lastElementChild,
    fabric: (i) => cards('Fabric')?.children[i],
    fabricSwatch: (i) => cards('Fabric')?.children[i]?.firstElementChild,
    fabricLine: (i) => cards('Fabric')?.children[i]?.lastElementChild,
    why: (i) => cards('Why Choose')?.children[i],
    gallery: (i) => document.querySelectorAll('#gallery .columns-2 > div')[i],
    galleryImg: (i) => document.querySelectorAll('#gallery .columns-2 > div')[i]?.querySelector('img'),
    galleryOverlay: (i) => document.querySelectorAll('#gallery .columns-2 > div')[i]?.children[1],
    brand: () => byText('div', 'SOMFY'),
    cta: () => [...document.querySelectorAll('a')].find((a) => a.textContent.includes('BOOK FREE HOME CONSULTATION')),
    whatsapp: () => document.querySelector('a[aria-label="Chat on WhatsApp"]'),
    backTop: () => document.querySelector('button[aria-label="Back to top"]'),
    email: () => document.querySelector('#contact input[type=email]'),
    submit: () => document.querySelector('#contact button[type=submit]'),
    social: () => document.querySelector('footer a[aria-label="Social media"]'),
    footerLink: () => document.querySelector('footer a[href="#about"]'),
    subscribe: () => document.querySelector('button[aria-label="Subscribe"]'),
    faqBtn: (i) => faq()[i],
    faqAnswer: (i) => { const b = faq()[i]; const n = b?.nextElementSibling; return n && n.tagName === 'DIV' ? n : null; },
    burger: () => [...document.querySelectorAll('header button')].at(-1),
    menu: () => document.querySelector('header')?.children[1] ?? null,
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
      if (el && el.isConnected && !el.hidden) v = prop === 'height' ? String(el.getBoundingClientRect().height) : prop === 'text' ? el.textContent.trim() : getComputedStyle(el)[prop];
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
  return { start, dur, mid: +mid.toFixed(2), final };
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
          ['F.introLogo()', 'opacity'],
          ['F.introLogo()', 'transform'],
          ['F.introPanel()', 'transform'],
          ['F.intro()', 'opacity'],
          ['F.hero()', 'opacity'],
          ['F.hero()', 'transform'],
        ])}, 5600);`,
    });
    const api = {
      goto: (settle = 300) => page.goto(url, settle),
      eval: (e) => page.eval(e),
      rec: (specs, ms) => page.eval(`__rec(${JSON.stringify(specs)}, ${ms})`),
      async recWhile(specs, ms, action) {
        await page.eval(`window.__cur = __rec(${JSON.stringify(specs)}, ${ms}); 0`);
        await action();
        return page.eval('window.__cur');
      },
      center: (expr) => page.eval(`(() => { const F = window.__F || (window.__F = ${FIND}); const r = (${expr}).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; })()`),
      scrollTo: (expr, offset = 100) => page.eval(`(() => { const F = window.__F || (window.__F = ${FIND}); const el = ${expr}; window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - ${offset}, behavior: 'instant' }); })()`),
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
async function both(width, fn) {
  const run = async (url) => {
    for (let i = 0; ; i++) {
      try {
        return await session(url, width, fn);
      } catch (e) {
        if (i < 4 && /EBUSY|DevToolsActivePort|ECONNREFUSED|ENOENT/.test(String(e))) { await sleep(2000); continue; }
        throw e;
      }
    }
  };
  return { o: await run(ORIG), t: await run(TW) };
}

const HOVERS = [
  ['Шапка: пункт меню', 'F.navLink()', [['F.navLink()', 'color']], 500],
  ['Шапка: FREE CONSULTATION', 'F.navQuote()', [['F.navQuote()', 'opacity']], 500],
  ['Первый экран: EXPLORE COLLECTION', 'F.explore()', [['F.explore()', 'opacity']], 500],
  ['Первый экран: BOOK FREE CONSULTATION', 'F.bookHero()', [['F.bookHero()', 'backgroundColor']], 500],
  ['Services: карточка', 'F.service(1)', [['F.service(1)', 'backgroundColor'], ['F.service(1)', 'transform'], ['F.service(1)', 'boxShadow'], ['F.serviceH3(1)', 'color']], 700],
  ['Collections: карточка', 'F.coll(1)', [['F.collImg(1)', 'transform'], ['F.collExplore(1)', 'opacity']], 1000],
  ['Fabric: карточка', 'F.fabric(1)', [['F.fabric(1)', 'borderTopColor'], ['F.fabric(1)', 'backgroundColor'], ['F.fabricSwatch(1)', 'transform'], ['F.fabricLine(1)', 'opacity']], 700],
  ['Why Choose: карточка', 'F.why(1)', [['F.why(1)', 'backgroundColor'], ['F.why(1)', 'transform']], 700],
  ['Gallery: картинка', 'F.gallery(1)', [['F.galleryImg(1)', 'transform'], ['F.galleryOverlay(1)', 'opacity']], 1000],
  ['Бренды: название', 'F.brand()', [['F.brand()', 'color']], 500],
  ['CTA: кнопка', 'F.cta()', [['F.cta()', 'opacity']], 500],
  ['WhatsApp: плавающая кнопка', 'F.whatsapp()', [['F.whatsapp()', 'transform']], 500],
  ['Contact: SEND MESSAGE', 'F.submit()', [['F.submit()', 'opacity']], 500],
  ['Подвал: соцсеть', 'F.social()', [['F.social()', 'borderTopColor'], ['F.social()', 'color']], 500],
  ['Подвал: ссылка', 'F.footerLink()', [['F.footerLink()', 'color']], 500],
  ['Подвал: подписка', 'F.subscribe()', [['F.subscribe()', 'opacity']], 500],
];

// ================= десктоп 1440 =================
const desk = await both(1440, async (s) => {
  const r = {};
  await s.goto(200);
  r.load = await s.eval('window.__load');
  r.bob = await s.rec([['F.bob()', 'transform']], 3300);

  // Счётчики: блок попадает в экран на 30%.
  await s.scrollTo('F.counter()', 500);
  r.counter = await s.rec([['F.counter()', 'text']], 2100);

  // Шапка после прокрутки и кнопка «наверх».
  await s.eval('scrollTo(0,0)');
  await sleep(700);
  r.headerOn = await s.recWhile([['F.header()', 'backgroundColor'], ['F.header()', 'paddingTop']], 800, () => s.eval('scrollTo(0, 400)'));
  r.back = await s.recWhile([['F.backTop()', 'opacity'], ['F.backTop()', 'transform']], 800, () => s.eval('scrollTo(0, 900)'));
  r.backOff = await s.recWhile([['F.backTop()', 'opacity'], ['F.backTop()', 'transform']], 800, () => s.eval('scrollTo(0, 300)'));
  r.headerOff = await s.recWhile([['F.header()', 'backgroundColor'], ['F.header()', 'paddingTop']], 800, () => s.eval('scrollTo(0, 0)'));

  r.hover = {};
  for (const [name, target, specs, ms] of HOVERS) {
    await s.scrollTo(target, 350);
    await s.mouse(2, 890);
    await sleep(800);
    const [x, y] = await s.center(target);
    const on = await s.recWhile(specs, ms, () => s.mouse(x, y));
    const off = await s.recWhile(specs, ms, () => s.mouse(2, 890));
    r.hover[name] = { on, off };
  }

  await s.scrollTo('F.email()', 400);
  r.focus = await s.recWhile([['F.email()', 'borderTopColor']], 500, () => s.click('F.email()'));
  r.blur = await s.recWhile([['F.email()', 'borderTopColor']], 500, () => s.eval('document.activeElement.blur()'));

  await s.scrollTo('F.faqBtn(1)', 300);
  r.faqOpen = await s.recWhile([['F.faqAnswer(1)', 'height'], ['F.faqAnswer(1)', 'opacity']], 600, () => s.click('F.faqBtn(1)'));
  r.faqSwitch = await s.recWhile([['F.faqAnswer(1)', 'opacity'], ['F.faqAnswer(2)', 'height']], 600, () => s.click('F.faqBtn(2)'));
  r.errs = await s.eval('window.__errs');
  return r;
});

// ================= телефон 375 =================
const mob = await both(375, async (s) => {
  const r = {};
  await s.goto(5000);
  r.open = await s.recWhile([['F.menu()', 'height'], ['F.menu()', 'opacity']], 600, () => s.click('F.burger()'));
  r.close = await s.recWhile([['F.menu()', 'height'], ['F.menu()', 'opacity']], 600, () => s.click('F.burger()'));
  r.errs = await s.eval('window.__errs');
  return r;
});

const { o, t } = desk;
console.log('\n== Заставка и первый экран (1440) ==');
const L = ['Заставка: логотип (opacity, 0.6 с, delay 0.1)', 'Заставка: логотип (сдвиг y 16→0)', 'Заставка: шторка уезжает (1.3 с, delay 0.7+0.15)', 'Заставка: исчезновение (0.5 с на 2.3 с)', 'Первый экран: текст (opacity, 1.1 с)', 'Первый экран: текст (сдвиг y 44→0)'];
// Дорожки — с момента, когда появилась заставка (запущен скрипт страницы); логотип — до начала ухода.
const prep = (load) => {
  const k = load[3].findIndex(([, v]) => v != null);
  const fade = analyze(load[3].slice(k)).start;
  return load.map((tr, i) => (i < 2 ? tr.slice(k).filter(([tt]) => tt < fade) : tr.slice(k)));
};
const po = prep(o.load), pt = prep(t.load);
const lo = po.map(analyze), lt = pt.map(analyze);
// Отсчёт от начала ухода заставки (2.3 с после монтирования): оригинал монтирует React позже, чем
// перевод запускает app.js, а у шторки и логотипа начало по порогу 2% смазано медленным стартом кривой.
const base = (arr) => arr[3].start - 2300;
L.forEach((name, i) => {
  const a = { ...lo[i], start: lo[i].start - base(lo) }, b = { ...lt[i], start: lt[i].start - base(lt) };
  // Уход заставки: элемент удаляется — итог не сравнивается (null), только тайминг.
  if (i === 4) {
    // Кривая [0.22, 1, 0.36, 1] почти доходит до 1 за полсекунды: порог 2% на хвосте даёт шум — сравниваем значения.
    const at = (tr, st, ms) => { const p = tr.filter(([, v]) => v != null); return +(p.find(([tt]) => tt >= st + ms) ?? p.at(-1))[1]; };
    const ms = [100, 250, 500, 900];
    const va = ms.map((x) => at(po[4], lo[4].start, x)), vb = ms.map((x) => at(pt[4], lt[4].start, x));
    const worst = Math.max(...va.map((x, j) => Math.abs(x - vb[j])));
    check(worst <= 0.08 && near(a.start, b.start, 80), name, `задержка ${a.start}/${b.start}мс; opacity на +100/250/500/900мс: ${va.map((x) => x.toFixed(2)).join(" ")} | ${vb.map((x) => x.toFixed(2)).join(" ")}`);
    return;
  }
  if (i === 3) { a.final = b.final; }
  compare(name, a, b);
});
{
  const gone = (tr) => { const k = tr.findIndex(([, v]) => v != null); const g = tr.slice(k).find(([, v]) => v == null); return g ? g[0] : null; };
  const go = gone(o.load[3]), gt = gone(t.load[3]);
  const bo = base(lo), bt = base(lt);
  check(go != null && gt != null && near(go - bo, gt - bt, 120), 'Заставка: удаляется из DOM', `оригинал через ${go - bo}мс | перевод через ${gt - bt}мс от монтирования`);
}
{
  const series = (tr) => tr.filter(([, v]) => v).map(([tt, v]) => [tt, nums(v)[5] ?? 0]);
  const so = series(o.bob[0]), st = series(t.bob[0]);
  const trough = (s) => s.slice(1, -1).find((p, i) => p[1] <= s[i][1] && p[1] < s[i + 2][1] && p[1] < 0.3)?.[0] ?? s.find((p) => p[1] < 0.2)?.[0] ?? 0;
  const at = (s, t0, tt) => s.reduce((b, q) => (Math.abs(q[0] - t0 - tt) < Math.abs(b[0] - t0 - tt) ? q : b))[1];
  const to = trough(so), tt0 = trough(st);
  let worst = 0;
  const row = [];
  for (let x = 0; x <= 1600; x += 80) {
    const a = at(so, to, x), b = at(st, tt0, x);
    worst = Math.max(worst, Math.abs(a - b));
    if (x % 400 === 0) row.push(`${x}:${a.toFixed(1)}/${b.toFixed(1)}`);
  }
  const amp = (s) => Math.max(...s.map((p) => p[1]));
  check(worst <= 1 && near(amp(so), amp(st), 0.5), 'SCROLL: бесконечное покачивание y 0→7→0 за 1.6 с', `амплитуда ${amp(so).toFixed(1)}/${amp(st).toFixed(1)}px, макс. расхождение формы ${worst.toFixed(2)}px; ${row.join(' ')}`);
}

console.log('\n== Счётчики, шапка, «наверх» ==');
{
  const val = (tr, ms) => (tr.find(([tt]) => tt >= ms) ?? tr.at(-1))[1];
  const start = (tr) => tr.find(([, v]) => v && v !== '0+')?.[0] ?? 0;
  const so = start(o.counter[0]), st = start(t.counter[0]);
  const vo = val(o.counter[0].filter(([tt]) => tt >= so).map(([tt, v]) => [tt - so, v]), 900), vt = val(t.counter[0].filter(([tt]) => tt >= st).map(([tt, v]) => [tt - st, v]), 900);
  check(Math.abs(parseInt(vo) - parseInt(vt)) <= 2, 'Счётчик: середина счёта (900 мс)', `${vo} | ${vt}`);
  check(o.counter[0].at(-1)[1] === t.counter[0].at(-1)[1], 'Счётчик: итог', `${o.counter[0].at(-1)[1]} | ${t.counter[0].at(-1)[1]}`);
}
compare('Шапка: фон при прокрутке > 80px', analyze(o.headerOn[0]), analyze(t.headerOn[0]), { delay: false });
compare('Шапка: отступ при прокрутке', analyze(o.headerOn[1]), analyze(t.headerOn[1]), { delay: false });
compare('Шапка: фон при возврате наверх', analyze(o.headerOff[0]), analyze(t.headerOff[0]), { delay: false });
compare('«Наверх»: появление opacity', analyze(o.back[0]), analyze(t.back[0]), { delay: false });
compare('«Наверх»: появление y (пружина)', analyze(o.back[1]), analyze(t.back[1]), { delay: false, curve: false });
{
  const gone = (tr) => tr.find(([, v]) => v == null)?.[0];
  const go = gone(o.backOff[0]), gt = gone(t.backOff[0]);
  check(go != null && gt != null && near(go, gt, 150), '«Наверх»: уход и удаление', `оригинал через ${go}мс | перевод через ${gt}мс`);
}

console.log('\n== Наведение (1440) ==');
for (const [name, , specs] of HOVERS) {
  specs.forEach(([, prop], k) => {
    compare(`${name}: ${prop} (наведение)`, analyze(o.hover[name].on[k]), analyze(t.hover[name].on[k]));
    compare(`${name}: ${prop} (уход)`, analyze(o.hover[name].off[k]), analyze(t.hover[name].off[k]));
  });
}

console.log('\n== Форма и FAQ ==');
compare('Contact: рамка поля при фокусе', analyze(o.focus[0]), analyze(t.focus[0]), { delay: false });
compare('Contact: рамка поля при уходе фокуса', analyze(o.blur[0]), analyze(t.blur[0]), { delay: false });
compare('FAQ: раскрытие — высота', analyze(o.faqOpen[0]), analyze(t.faqOpen[0]), { delay: false });
compare('FAQ: раскрытие — opacity', analyze(o.faqOpen[1]), analyze(t.faqOpen[1]), { delay: false });
{
  const gone = (tr) => tr.find(([, v]) => v == null)?.[0];
  const go = gone(o.faqSwitch[0]), gt = gone(t.faqSwitch[0]);
  check(go != null && gt != null && near(go, gt, 90), 'FAQ: другой вопрос — прежний ответ сворачивается и удаляется', `оригинал через ${go}мс | перевод через ${gt}мс`);
  compare('FAQ: другой вопрос — новый ответ раскрывается', analyze(o.faqSwitch[1]), analyze(t.faqSwitch[1]), { delay: false });
}

console.log('\n== Мобильное меню (375) ==');
compare('Меню: открытие — opacity', analyze(mob.o.open[1]), analyze(mob.t.open[1]), { delay: false });
{
  const a = analyze(mob.o.open[0]), b = analyze(mob.t.open[0]);
  // Высота панели в переводе больше (пункты 44px — мобильная правка), сравниваем тайминг.
  check(!a.static && !b.static && near(a.dur, b.dur, 70, 0.2) && Math.abs(a.mid - b.mid) <= 0.18, 'Меню: открытие — высота 0→auto', `оригинал: ${fmt(a)} | перевод: ${fmt(b)}`);
  const gone = (tr) => tr.find(([, v]) => v == null)?.[0];
  const go = gone(mob.o.close[0]), gt = gone(mob.t.close[0]);
  check(go != null && gt != null && near(go, gt, 90), 'Меню: закрытие — панель сворачивается и удаляется', `оригинал через ${go}мс | перевод через ${gt}мс`);
}

console.log('\n== Консоль ==');
const isRes = (e) => /^https?:\/\//.test(e);
const jsErrs = [...t.errs, ...mob.t.errs].filter((e) => !isRes(e));
check(jsErrs.length === 0, 'нет ошибок скриптов в консоли перевода', jsErrs.join('; '));

console.log(`\n${fails ? `✗ расхождений: ${fails}` : '✓ всё совпадает'}`);
process.exit(fails ? 1 : 0);
