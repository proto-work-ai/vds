/* Проверка анимаций и поведения лендинга mockups/landing-9 против оригинала 9.

   node tools/mockups/check-landing-9-motion.mjs [originalUrl] [translationUrl]

   По умолчанию оригинал http://localhost:4339/, перевод http://localhost:4320/landing-9/.
   Сценарий (загрузка, прокрутка, наведение через CDP, клики, перетаскивание)
   проигрывается на обеих страницах; на каждом кадре пишутся computed-стили,
   по записи считаются задержка, длительность, прогресс в середине и итог.
   Наведение перебирает ВСЕ элементы с hover:/group-hover: в разметке (по порядку
   в документе), наводя на сам элемент или на ближайший .group.
   Печатает ✓/✗, код выхода 1 при ошибках. */
import { withBrowser } from './snapshot.mjs';

const ORIG = process.argv[2] ?? 'http://localhost:4339/';
const TW = process.argv[3] ?? 'http://localhost:4320/landing-9/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (ok, name, extra = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

const FIND = `(() => {
  const vis = (e) => !e.closest('[hidden],[data-booking],[data-video]');
  const all = (sel) => [...document.querySelectorAll(sel)].filter(vis);
  const byText = (sel, t) => all(sel).find((e) => e.textContent.trim() === t);
  const h2 = (t) => all('h2').find((h) => h.textContent.includes(t));
  return {
    nav: () => document.querySelector('nav'),
    // В оригинале inline style (color, borderColor) перебивает hover:-класс — такой hover
    // не срабатывает, в переводе его нет. Сравниваем только работающие.
    hovers: () => all('[class*="hover:"]').filter((e) => !e.closest('[data-mobile-menu]')).filter((e) => {
      const c = e.getAttribute('class');
      return !(e.style.color && /hover:text-/.test(c)) && !(e.style.borderColor && /hover:border-/.test(c));
    }),
    floats: () => all('[class*="scFloat"], [style*="scFloat"]'),
    marquee: () => all('[class*="scMarquee"], [style*="scMarquee"]')[0],
    reveal: (t, up) => { let e = h2(t); for (let i = 0; i < up; i++) e = e.parentElement; return e; },
    h2: h2,
    faqBtn: (i) => all('button').filter((b) => b.nextElementSibling && /max-height|overflow-hidden/.test(b.nextElementSibling.className + (b.nextElementSibling.getAttribute('style') || '')) && b.nextElementSibling.querySelector('p'))[i],
    dot: (i) => document.querySelector('button[aria-label="Testimonial ' + (i + 1) + '"]'),
    quote: () => document.querySelector('blockquote'),
    compare: () => document.querySelector('.cursor-col-resize'),
    after: () => [...document.querySelector('.cursor-col-resize').children].filter((e) => e.tagName === 'IMG')[1],
    afterLabel: () => [...document.querySelector('.cursor-col-resize').children].find((e) => e.textContent.trim() === 'After'),
    play: () => document.querySelector('button[aria-label="Play video"]'),
    book: () => all('button').find((b) => /^Book (Free )?Consultation$/.test(b.textContent.trim()) && b.getBoundingClientRect().width > 0),
    burger: () => document.querySelector('button[aria-label="Toggle menu"]'),
  };
})()`;

const REC = `window.__F = null; window.__rec = (specs, ms) => new Promise((res) => {
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
function compare(name, o, t, { delay = true, curve = true, quiet = false } = {}) {
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
  if (quiet && !probs.length) return true;
  check(!probs.length, name, (probs.length ? probs.join(', ') + ': ' : '') + `оригинал: ${fmt(o)} | перевод: ${fmt(t)}`);
  return !probs.length;
}

async function session(url, width, fn) {
  return withBrowser(async (page) => {
    await page.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errs=[];addEventListener('error',e=>{__errs.push(String((e.target&&(e.target.src||e.target.href))||e.message))},true);
        const __ce=console.error;console.error=(...a)=>{__errs.push(a.join(' '));__ce(...a)};
        window.open=(u)=>{window.__opened=u;return null};
        ${REC}`,
    });
    const F = `(window.__F || (window.__F = ${FIND}))`;
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
      center: (expr, fx = 0.5) => page.eval(`(() => { const F = ${F}; const el = ${expr}; const r = el.getBoundingClientRect(); return [r.left + r.width * ${fx}, r.top + r.height / 2]; })()`),
      scrollTo: (expr, offset = 100) => page.eval(`(() => { const F = ${F}; const el = ${expr}; window.scrollTo(0, el.getBoundingClientRect().top + scrollY - ${offset}); })()`),
      mouse: (x, y, type = 'mouseMoved') => page.send('Input.dispatchMouseEvent', { type, x, y, button: type === 'mouseMoved' ? 'none' : 'left', clickCount: 1 }),
      async clickAt(x, y) {
        await api.mouse(x, y);
        await api.mouse(x, y, 'mousePressed');
        await api.mouse(x, y, 'mouseReleased');
      },
      async click(expr) {
        const [x, y] = await api.center(expr);
        await api.clickAt(x, y);
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

const HOVER_PROPS = ['opacity', 'transform', 'color', 'borderTopColor', 'boxShadow', 'width', 'backgroundColor'];
const scrollAll = `(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}})()`;

// ================= десктоп 1440 =================
const desk = await both(1440, async (s) => {
  const r = {};
  await s.goto(2500);
  // Бесконечные анимации: параметры и траектория плавающих карточек.
  r.anim = await s.eval(`(() => { const F = __F || (__F = ${FIND}); return [...F.floats(), F.marquee()].map((e) => { const c = getComputedStyle(e); return e ? [c.animationName, c.animationDuration, c.animationTimingFunction, c.animationDirection, c.animationIterationCount].join(' ') : null; }); })()`);
  // Первая карточка: 3.2s туда-обратно — за 6.6с виден полный размах при любой фазе.
  r.float = await s.rec([['F.floats()[0]', 'transform']], 6600);

  // Появление: заголовки секций сверху вниз + сетки карточек (задержки stagger).
  r.reveal = {};
  for (const [name, text] of [['Why SanCurtains', 'The Difference'], ['Отзывы', 'What Our Clients'], ['До и после', 'Before & After']]) {
    await s.scrollTo(`F.reveal(${JSON.stringify(text)}, 1)`, 500);
    r.reveal[name] = await s.rec([[`F.reveal(${JSON.stringify(text)}, 1)`, 'opacity'], [`F.reveal(${JSON.stringify(text)}, 1)`, 'transform']], 1400);
    await sleep(200);
  }
  await s.scrollTo('F.reveal("The Difference", 1)', 200);
  r.stagger = await s.rec([0, 1, 2, 3, 4, 5].map((i) => [`F.reveal("The Difference", 1).nextElementSibling.children[${i}]`, 'opacity']), 1800);

  await s.eval(scrollAll);
  await sleep(1500);

  // Шапка: порог прокрутки 64px.
  await s.eval('scrollTo(0,0)');
  await sleep(700);
  await s.eval('scrollTo(0,62)');
  await sleep(700);
  r.nav62 = await s.eval('getComputedStyle(document.querySelector("nav")).backgroundColor');
  await s.eval('scrollTo(0,0)');
  await sleep(700);
  r.navScroll = await s.recWhile([['F.nav()', 'backgroundColor']], 900, () => s.eval('scrollTo(0, 400)'));

  // Наведение на все элементы с hover:.
  r.hoverCount = await s.eval('(__F || (__F = ' + FIND + ')).hovers().length');
  r.hoverDesc = [];
  r.hover = [];
  for (let i = 0; i < r.hoverCount; i++) {
    const el = `F.hovers()[${i}]`;
    const trig = `(${el}.getAttribute('class').includes('group-hover:') && !/(^|\\s)hover:/.test(${el}.getAttribute('class')) ? (${el}.closest('.group') || ${el}) : ${el})`;
    const info = await s.eval(`(() => { const F = __F; const e = ${el}; const t = ${trig}; const r = t.getBoundingClientRect(); return { cls: e.getAttribute('class').replace(/\\s*\\[[^\\]]*\\]/g, '').slice(0, 90), text: (t.textContent || '').trim().slice(0, 30), w: r.width }; })()`);
    r.hoverDesc.push(info);
    if (!info.w) { r.hover.push(null); continue; }
    await s.scrollTo(trig, 350);
    await s.mouse(1, 1);
    await sleep(900);
    const [x, y] = await s.center(trig);
    const specs = HOVER_PROPS.map((p) => [el, p]);
    const on = await s.recWhile(specs, 1100, () => s.mouse(x, y));
    const off = await s.recWhile(specs, 1100, () => s.mouse(1, 1));
    r.hover.push({ on, off });
  }

  // FAQ.
  await s.scrollTo('F.faqBtn(1)', 400);
  r.faq = await s.recWhile([['F.faqBtn(1).nextElementSibling', 'maxHeight'], ['F.faqBtn(1).nextElementSibling', 'height'], ['F.faqBtn(1).lastElementChild', 'transform']], 900, () => s.click('F.faqBtn(1)'));
  r.faqClose = await s.recWhile([['F.faqBtn(1).nextElementSibling', 'height'], ['F.faqBtn(1).lastElementChild', 'transform']], 900, () => s.click('F.faqBtn(1)'));

  // Отзывы: клик по точке 2.
  await s.scrollTo('F.dot(1)', 500);
  // Интервал 5,2с тикает с момента монтирования — сначала выравниваем слайдер на первый отзыв.
  await s.click('F.dot(0)');
  await sleep(500);
  r.dot = await s.recWhile([['F.dot(1)', 'width'], ['F.dot(1)', 'backgroundColor'], ['F.dot(0)', 'width'], ['F.quote()', 'text']], 700, () => s.click('F.dot(1)'));

  // До и после: перетаскивание.
  await s.scrollTo('F.compare()', 150);
  await sleep(300);
  const [cx, cy] = await s.center('F.compare()', 0.3);
  const [cx2] = await s.center('F.compare()', 0.08);
  await s.mouse(cx, cy);
  await s.mouse(cx, cy, 'mousePressed');
  r.drag1 = await s.eval('[getComputedStyle(__F.after()).clipPath, getComputedStyle(__F.compare().lastElementChild).left]');
  await s.mouse(cx2, cy);
  await s.mouse(cx2, cy, 'mouseReleased');
  r.dragLabel = await s.rec([['F.afterLabel()', 'opacity']], 600);
  r.drag2 = await s.eval('[getComputedStyle(__F.after()).clipPath, getComputedStyle(__F.compare().lastElementChild).left]');

  // Видео.
  await s.scrollTo('F.play()', 400);
  await s.click('F.play()');
  await sleep(300);
  r.videoOpen = await s.eval('!!document.querySelector(".z-50.fixed.inset-0") && /Video content/.test(document.body.textContent)');
  await s.clickAt(30, 450);
  await sleep(300);
  r.videoClosed = await s.eval('!/Video content would play/.test(document.body.textContent)');

  // Окно записи.
  await s.eval('scrollTo(0,0)');
  await sleep(500);
  await s.click('F.book()');
  await sleep(400);
  r.bookOpen = await s.eval('/Book Your Appointment/.test(document.body.textContent)');
  await s.eval('[...document.querySelectorAll("button")].find((b) => /Send to WhatsApp/.test(b.textContent)).click()');
  await sleep(300);
  r.bookErrors = await s.eval('[...document.querySelectorAll("p")].filter((p) => /^(Required|Please select a service)$/.test(p.textContent.trim())).length');
  await s.eval(`(() => { const f = [...document.querySelectorAll('form')].find((f) => /WhatsApp/.test(f.textContent)); const set = (el, v) => { const p = Object.getPrototypeOf(el); Object.getOwnPropertyDescriptor(p, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }; set(f.querySelector('input[type=text]'), 'Test'); set(f.querySelector('input[type=tel]'), '+7 900'); set(f.querySelector('select'), 'Roman Blinds'); })()`);
  await sleep(200);
  await s.eval('[...document.querySelectorAll("button")].find((b) => /Send to WhatsApp/.test(b.textContent)).click()');
  await sleep(400);
  r.bookDone = await s.eval('[/WhatsApp Opened!/.test(document.body.textContent), String(window.__opened || "").slice(0, 40)]');

  r.fonts = await s.eval('document.fonts.ready.then(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, "") + " " + f.weight + " " + f.style).filter((x, i, a) => a.indexOf(x) === i).sort())');
  r.errs = await s.eval('window.__errs');
  r.broken = await s.eval('[...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src)');
  return r;
});

// ================= телефон 375 =================
const mob = await both(375, async (s) => {
  const r = {};
  await s.goto(1500);
  await s.click('F.burger()');
  await sleep(300);
  r.open = await s.eval('[...document.querySelectorAll("nav a")].filter((a) => a.getBoundingClientRect().height > 0).length');
  await s.click('F.burger()');
  await sleep(300);
  r.closed = await s.eval('[...document.querySelectorAll("nav a")].filter((a) => a.getBoundingClientRect().height > 0).length');
  r.errs = await s.eval('window.__errs');
  return r;
});

const { o, t } = desk;
console.log('\n== Бесконечные анимации ==');
o.anim.forEach((a, i) => check(a === t.anim[i], `${i < o.anim.length - 1 ? 'Плавающая карточка ткани ' + (i + 1) : 'Бегущая строка брендов'}`, `${a} | ${t.anim[i]}`));
for (const k of [0]) {
  const ys = (tr) => tr.filter(([, v]) => v).map(([, v]) => nums(v)[5] ?? 0);
  const a = ys(o.float[k]), b = ys(t.float[k]);
  check(near(Math.min(...a), Math.min(...b), 1) && near(Math.max(...a), Math.max(...b), 1), `Плавающая карточка ${k + 1}: размах за полный цикл`, `оригинал ${Math.min(...a).toFixed(1)}…${Math.max(...a).toFixed(1)} | перевод ${Math.min(...b).toFixed(1)}…${Math.max(...b).toFixed(1)}`);
}

console.log('\n== Появление при прокрутке ==');
for (const name of Object.keys(o.reveal)) {
  ['opacity', 'transform'].forEach((p, i) => compare(`${name}: заголовок ${p}`, analyze(o.reveal[name][i]), analyze(t.reveal[name][i]), { delay: false }));
}
{
  const ro = o.stagger.map(analyze), rt = t.stagger.map(analyze);
  const b0 = ro[0].start ?? 0, b1 = rt[0].start ?? 0;
  ro.forEach((x, i) => compare(`Why SanCurtains: карточка ${i + 1} (stagger)`, { ...x, start: x.start - b0 }, { ...rt[i], start: rt[i].start - b1 }));
}

console.log('\n== Шапка ==');
check(o.nav62 === t.nav62, 'Шапка: при прокрутке 62px ещё прозрачная (порог 64px)', `${o.nav62} | ${t.nav62}`);
compare('Шапка: фон после прокрутки', analyze(o.navScroll[0]), analyze(t.navScroll[0]), { delay: false });

console.log('\n== Наведение (все элементы с hover:) ==');
check(o.hoverCount === t.hoverCount, 'количество элементов с hover', `${o.hoverCount} | ${t.hoverCount}`);
for (let i = 0; i < Math.min(o.hoverCount, t.hoverCount); i++) {
  const d = o.hoverDesc[i];
  const name = `#${i} «${d.text}» ${d.cls}`;
  if (d.cls !== t.hoverDesc[i].cls) check(false, name, `классы перевода: ${t.hoverDesc[i].cls}`);
  if (!o.hover[i] || !t.hover[i]) { if (!!o.hover[i] !== !!t.hover[i]) check(false, name, 'видимость различается'); continue; }
  let ok = true;
  HOVER_PROPS.forEach((p, k) => {
    for (const phase of ['on', 'off']) {
      ok = compare(`${name}: ${p} (${phase === 'on' ? 'наведение' : 'уход'})`, analyze(o.hover[i][phase][k]), analyze(t.hover[i][phase][k]), { quiet: true }) && ok;
    }
  });
  if (ok) check(true, name);
}

console.log('\n== Клики ==');
compare('FAQ: открытие — высота', analyze(o.faq[1]), analyze(t.faq[1]), { delay: false, curve: false });
compare('FAQ: плюс поворачивается', analyze(o.faq[2]), analyze(t.faq[2]), { delay: false });
compare('FAQ: закрытие — высота', analyze(o.faqClose[0]), analyze(t.faqClose[0]), { delay: false, curve: false });
compare('Отзывы: ширина новой точки', analyze(o.dot[0]), analyze(t.dot[0]), { delay: false });
compare('Отзывы: цвет новой точки', analyze(o.dot[1]), analyze(t.dot[1]), { delay: false });
compare('Отзывы: ширина старой точки', analyze(o.dot[2]), analyze(t.dot[2]), { delay: false });
check(o.dot[3].at(-1)[1] === t.dot[3].at(-1)[1], 'Отзывы: текст второго отзыва', '');
check(JSON.stringify(o.drag1) === JSON.stringify(t.drag1) && JSON.stringify(o.drag2) === JSON.stringify(t.drag2), 'До и после: перетаскивание', `${o.drag1} → ${o.drag2} | ${t.drag1} → ${t.drag2}`);
compare('До и после: подпись After гаснет', analyze(o.dragLabel[0]), analyze(t.dragLabel[0]), { delay: false });
check(t.videoOpen && t.videoClosed && o.videoOpen === t.videoOpen, 'Видео: открывается и закрывается по фону', `${o.videoOpen}/${o.videoClosed} | ${t.videoOpen}/${t.videoClosed}`);
check(t.bookOpen && t.bookErrors === o.bookErrors && t.bookDone[0] && o.bookDone[1] === t.bookDone[1], 'Окно записи: ошибки, WhatsApp, экран успеха', `ошибок ${o.bookErrors} | ${t.bookErrors}; ${o.bookDone} | ${t.bookDone}`);
check(mob.t.open > 0 && mob.t.closed === mob.o.closed && mob.o.open === mob.t.open, 'Мобильное меню (375): открытие/закрытие', `${mob.o.open}/${mob.o.closed} | ${mob.t.open}/${mob.t.closed}`);

console.log('\n== Шрифты ==');
const dm = (list) => list.filter((f) => /DM Sans|Playfair/.test(f));
console.log('  оригинал:', dm(o.fonts).join(', '));
console.log('  перевод: ', dm(t.fonts).join(', '));

console.log('\n== Консоль ==');
const isRes = (e) => /^https?:\/\//.test(e);
const jsErrs = [...t.errs, ...mob.t.errs].filter((e) => !isRes(e));
check(jsErrs.length === 0, 'нет ошибок скриптов в консоли перевода', jsErrs.join('; '));
const extra = t.broken.filter((u) => !/unsplash/.test(u));
check(extra.length === 0, 'нет незагруженных локальных картинок', extra.join(', '));

console.log(`\n${fails ? `✗ расхождений: ${fails}` : '✓ всё совпадает'}`);
process.exit(fails ? 1 : 0);
