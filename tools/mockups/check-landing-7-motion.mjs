/* Проверка анимаций и поведения лендинга mockups/landing-7 (брошюра SAN Travels) против оригинала 7.

   node tools/mockups/check-landing-7-motion.mjs [originalUrl] [translationUrl]

   По умолчанию оригинал http://localhost:4337/, перевод http://localhost:4320/landing-7/.
   В оригинале нет появлений и framer-motion: только CSS-переходы вкладок, точек,
   кнопок Prev/Next (transition-all), рамка .itinerary-card:hover (0.3 с), спиннер
   и полоска прогресса «Download PDF». Их и сравниваем покадрово. */
import { withBrowser } from './snapshot.mjs';

const ORIG = process.argv[2] ?? 'http://localhost:4337/';
const TW = process.argv[3] ?? 'http://localhost:4320/landing-7/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (ok, name, extra = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

const FIND = `(() => {
  const btns = () => [...document.querySelectorAll('#root button')];
  const label = () => [...document.querySelectorAll('#root div')].find((d) => !d.children.length && /^Page \\d+ of \\d+$/.test(d.textContent.trim()));
  const view = () => label()?.parentElement.nextElementSibling;
  return {
    tab: (i) => btns().filter((b) => /^\\d+\\.\\s/.test(b.textContent.trim()))[i],
    prev: () => btns().find((b) => b.textContent.includes('Prev')),
    next: () => btns().find((b) => b.textContent.includes('Next')),
    download: () => btns().find((b) => /Download PDF|%/.test(b.textContent)),
    spinner: () => btns().find((b) => /%/.test(b.textContent))?.querySelector('span'),
    label,
    dot: (i) => [...(view()?.nextElementSibling.children ?? [])].filter((b) => b.tagName === 'BUTTON')[i],
    card: (i) => view()?.querySelectorAll('.itinerary-card')[i],
    bar: () => [...document.querySelectorAll('div')].find((d) => /Generating Your PDF/.test(d.textContent) && d.children.length === 0)?.parentElement.querySelector('.h-px > .h-px'),
    overlay: () => [...document.querySelectorAll('div')].find((d) => /^Generating Your PDF$/.test(d.textContent.trim()))?.parentElement,
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
      if (el && el.isConnected) v = prop === 'text' ? el.textContent.trim() : getComputedStyle(el)[prop];
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
  // Цвет с альфой сравниваем в предумноженном виде (так интерполирует браузер): иначе при переходе
  // rgb(201,168,76) → rgba(255,255,255,0.2) каналы «прыгают» к 255 в первых кадрах, кривая становится
  // ступенькой, и «середина» зависит от фазы кадров (0.51 или 0.7 при одинаковом transition).
  if (/^rgba?\(/.test(v)) return [m[0] * m[3], m[1] * m[3], m[2] * m[3], m[3] * 255];
  return m;
};
const dist = (a, b) => {
  let s = 0;
  for (let i = 0; i < Math.max(a.length, b.length); i++) s += ((a[i] ?? 0) - (b[i] ?? 0)) ** 2;
  return Math.sqrt(s);
};
function analyze(track) {
  const pts = track.filter(([, v]) => v != null).map(([t, v]) => [t, nums(v), v]);
  if (!pts.length) return { missing: true };
  const v0 = pts[0][1], total = dist(v0, pts.at(-1)[1]), final = pts.at(-1)[2];
  if (total < 1e-3) return { static: true, final, dur: 0 };
  const p = pts.map(([t, v]) => [t, dist(v, v0) / total]);
  const start = p.find(([, x]) => x > 0.02)[0];
  let e = p.length - 1;
  while (e > 0 && Math.abs(p[e - 1][1] - 1) < 0.02) e--;
  const dur = p[e][0] - start;
  // Середина — линейная интерполяция между соседними кадрами, а не ближайший кадр (переход ~7 кадров).
  const midT = start + dur / 2;
  const j = Math.max(1, p.findIndex(([t]) => t >= midT));
  const [ta, xa] = p[j - 1], [tb, xb] = p[j];
  const mid = tb === ta ? xb : xa + ((xb - xa) * (midT - ta)) / (tb - ta);
  return { start, dur, mid: +mid.toFixed(2), final };
}
const near = (a, b, abs, rel = 0) => Math.abs(a - b) <= Math.max(abs, rel * Math.max(Math.abs(a), Math.abs(b)));
const sameVal = (a, b) => {
  const x = nums(a), y = nums(b);
  if (!x || !y) return a === b;
  return dist(x, y) <= 0.05;
};
const fmt = (r) => (r.missing ? 'нет элемента' : r.static ? `без анимации, ${r.final}` : `длит. ${r.dur}мс, середина ${r.mid}, итог ${r.final}`);
function compare(name, o, t) {
  const probs = [];
  if (o.missing || t.missing) probs.push('нет элемента');
  else {
    if (!sameVal(o.final, t.final)) probs.push('итог');
    if (!!o.static !== !!t.static) probs.push('наличие анимации');
    else if (!o.static) {
      if (!near(o.dur, t.dur, 50, 0.2)) probs.push('длительность');
      if (Math.abs(o.mid - t.mid) > 0.18) probs.push('кривая');
    }
  }
  check(!probs.length, name, (probs.length ? probs.join(', ') + ': ' : '') + `оригинал: ${fmt(o)} | перевод: ${fmt(t)}`);
}

async function session(url, width, fn) {
  return withBrowser(async (page) => {
    await page.send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 768 });
    await page.send('Browser.setDownloadBehavior', { behavior: 'deny' }).catch(() => {});
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errs=[];addEventListener('error',e=>{__errs.push(String((e.target&&(e.target.src||e.target.href))||e.message))},true);
        const __ce=console.error;console.error=(...a)=>{__errs.push(a.join(' '));__ce(...a)};${REC}`,
    });
    const api = {
      goto: (settle) => page.goto(url, settle),
      eval: (e) => page.eval(e),
      rec: (specs, ms) => page.eval(`__rec(${JSON.stringify(specs)}, ${ms})`),
      async recWhile(specs, ms, action) {
        await page.eval(`window.__cur = __rec(${JSON.stringify(specs)}, ${ms}); 0`);
        await action();
        return page.eval('window.__cur');
      },
      center: (expr) => page.eval(`(() => { const F = window.__F || (window.__F = ${FIND}); const el = ${expr}; el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; })()`),
      mouse: (x, y) => page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }),
      async click(expr) {
        const [x, y] = await api.center(expr);
        for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await page.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 });
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

const desk = await both(1440, async (s) => {
  const r = {};
  await s.goto(2500);
  // Вкладка 3: активная и прежняя вкладки, точки, кнопка Prev (была недоступна).
  await s.mouse(2, 990);
  const specs = [['F.tab(2)', 'backgroundColor'], ['F.tab(2)', 'color'], ['F.tab(0)', 'borderTopColor'], ['F.dot(2)', 'width'], ['F.dot(0)', 'width'], ['F.prev()', 'color'], ['F.label()', 'text']];
  await s.center('F.tab(2)');
  r.tab = await s.recWhile(specs, 600, () => s.eval('__F.tab(2).click()'));
  await s.mouse(2, 990);
  // Next до последней: кнопка Next гаснет.
  for (let k = 2; k < 8; k++) await s.eval('__F.next().click()');
  await sleep(400);
  r.nextOff = await s.recWhile([['F.next()', 'color'], ['F.next()', 'cursor']], 500, () => s.eval('__F.next().click()'));
  // Ищем страницу с карточками маршрута и наводим на карточку.
  r.cardPage = await s.eval(`(async () => { for (let i = 0; i < 10; i++) { __F.tab(i).click(); await new Promise((r) => setTimeout(r, 50)); if (__F.card(0)) return i; } return -1; })()`);
  await sleep(400);
  if (r.cardPage >= 0) {
    const [cx, cy] = await s.center('F.card(0)');
    await s.mouse(2, 2);
    await sleep(500);
    r.cardOn = await s.recWhile([['F.card(0)', 'borderTopColor']], 600, () => s.mouse(cx, cy));
    r.cardOff = await s.recWhile([['F.card(0)', 'borderTopColor']], 600, () => s.mouse(2, 2));
  }
  // Download PDF: оверлей, спиннер, проценты.
  await s.eval('scrollTo(0,0)');
  r.dl = await s.recWhile([['F.spinner()', 'transform'], ['F.download()', 'text'], ['F.overlay()', 'display'], ['F.download()', 'color']], 900, () => s.eval('__F.download().click()'));
  // Спиннер: параметры CSS-анимации и один и тот же узел на протяжении генерации.
  r.spin = await s.eval(`(async () => {
    const seen = new Set(); const nodes = []; let timing = null;
    for (let i = 0; i < 20; i++) {
      const sp = __F.spinner();
      if (sp) { if (!nodes.includes(sp)) nodes.push(sp); const a = sp.getAnimations()[0]; if (a && !timing) { const t = a.effect.getComputedTiming(); timing = [a.animationName, t.duration, t.iterations, a.effect.getTiming().easing].join(" "); } }
      await new Promise((r) => setTimeout(r, 100));
    }
    return { timing, nodes: nodes.length };
  })()`);
  r.pdfDone = await s.eval(`(async () => { for (let i = 0; i < 120; i++) { if (/Download PDF/.test(__F.download().textContent) && !__F.overlay()) return i * 250; await new Promise((r) => setTimeout(r, 250)); } return -1; })()`);
  r.errs = await s.eval('window.__errs');
  return r;
});

const { o, t } = desk;
console.log('\n== Переключение страниц (1440) ==');
['Вкладка 3: фон', 'Вкладка 3: цвет текста', 'Вкладка 1: рамка гаснет', 'Точка 3: ширина 8→24', 'Точка 1: ширина 24→8', 'Prev: цвет (становится доступной)'].forEach((name, i) => compare(name, analyze(o.tab[i]), analyze(t.tab[i])));
check(o.tab[6].at(-1)[1] === t.tab[6].at(-1)[1], 'Подпись страницы', `${o.tab[6].at(-1)[1]} | ${t.tab[6].at(-1)[1]}`);
compare('Next на последней странице: цвет гаснет', analyze(o.nextOff[0]), analyze(t.nextOff[0]));
check(o.nextOff[1].at(-1)[1] === t.nextOff[1].at(-1)[1], 'Next на последней странице: курсор', `${o.nextOff[1].at(-1)[1]} | ${t.nextOff[1].at(-1)[1]}`);

console.log('\n== Наведение ==');
check(o.cardPage === t.cardPage && o.cardPage >= 0, 'Страница с карточками маршрута', `оригинал ${o.cardPage + 1} | перевод ${t.cardPage + 1}`);
if (o.cardOn && t.cardOn) {
  compare('.itinerary-card: рамка при наведении', analyze(o.cardOn[0]), analyze(t.cardOn[0]));
  compare('.itinerary-card: рамка при уходе', analyze(o.cardOff[0]), analyze(t.cardOff[0]));
}

console.log('\n== Download PDF ==');
const spinning = (tr) => new Set(tr.filter(([, v]) => v && v !== 'none').map(([, v]) => v)).size > 5;
check(spinning(o.dl[0]) && spinning(t.dl[0]), 'Спиннер в кнопке крутится', `оригинал ${spinning(o.dl[0])} | перевод ${spinning(t.dl[0])}`);
check(o.spin.timing === t.spin.timing, 'Спиннер: анимация spin 0.8 с, linear, бесконечно', `${o.spin.timing} | ${t.spin.timing}`);
check(t.spin.nodes <= 1, 'Спиннер: один узел на всю генерацию (вращение не сбрасывается)', `узлов: оригинал ${o.spin.nodes} | перевод ${t.spin.nodes}`);
check(o.dl[2].some(([, v]) => v === 'flex') && t.dl[2].some(([, v]) => v === 'flex'), 'Оверлей «Generating Your PDF» показан');
check(/%$/.test(o.dl[1].at(-1)[1] ?? '') === /%$/.test(t.dl[1].at(-1)[1] ?? ''), 'Кнопка показывает проценты', `${o.dl[1].at(-1)[1]} | ${t.dl[1].at(-1)[1]}`);
compare('Кнопка: цвет в состоянии загрузки', analyze(o.dl[3]), analyze(t.dl[3]));
// Оригинал в headless-среде висит на 0%: html2canvas ждёт внешние фото. Перевод должен дойти до конца.
check(t.pdfDone >= 0 && !!t.spin.timing, 'Перевод: генерация PDF проходит все страницы, кнопка возвращается', `перевод: спиннер виден ≥2 с, завершилась через ${t.pdfDone}мс после этого${o.pdfDone < 0 ? ' | оригинал не завершился за 30 с (ждёт внешние фото)' : ` | оригинал ${o.pdfDone}мс`}`);

console.log('\n== Консоль ==');
const jsErrs = t.errs.filter((e) => !/^https?:\/\//.test(e));
check(jsErrs.length === 0, 'нет ошибок скриптов в консоли перевода', jsErrs.join('; '));

console.log(`\n${fails ? `✗ расхождений: ${fails}` : '✓ всё совпадает'}`);
process.exit(fails ? 1 : 0);
