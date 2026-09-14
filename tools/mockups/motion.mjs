/* Запись анимаций framer-motion по кадрам: при загрузке и при появлении в экране.

   node tools/mockups/motion.mjs <url> <snapDir> [--load 4500] [--first 3000] [--step 250] [--wait 900]

   --load ms   сколько записывать с начала загрузки документа (по умолчанию 4500);
   --first ms  анимация загрузки должна начаться в первые столько мс (3000);
   --step px   шаг прокрутки при записи появлений (250);
   --wait ms   пауза на каждом шаге прокрутки (900).

   1. Загрузка. До скриптов страницы (Page.addScriptToEvaluateOnNewDocument) на
      каждом кадре пишутся инлайн opacity/transform всех узлов. Узлы первого экрана,
      которые начали меняться в первые --first мс без прокрутки, — анимации загрузки
      (animate без whileInView: выезд шапки, текст первого экрана). Если узел ещё
      меняется в конце записи — это бесконечная анимация: период ищется по повтору
      значений, ключевые кадры снимаются с последнего полного периода.
   2. Появление. Узлы нумеруются как snapshot.mjs (TAG_SCRIPT после той же паузы
      4000 мс), страница прокручивается шагами; по кадрам пишутся начало и конец
      изменения каждого узла. Задержка — от самого раннего старта на этом шаге
      прокрутки (все, кого задел один шаг, запускаются одним IntersectionObserver),
      длительность — от первого до последнего изменения. Узлы, меняющиеся на многих
      шагах (параллакс), пропускаются.

   Пишет <snapDir>/motion.json:
   {
     "load": { "<data-i>": { "kind": "once"|"loop", "delay": мс, "dur": мс,
                             "easing": "ease-out"|"linear",
                             "keyframes": [[процент, { "opacity"?: "…", "transform"?: "…" }], …] } },
     "reveal": { "<data-i>": { "delay": мс, "dur": мс } }
   }
   Задержки загрузки — от старта самой ранней анимации загрузки. Конвертер
   (to-tailwind.mjs --motion) делает из load CSS @keyframes, из reveal — переходы
   появления с нужными длительностью и задержкой. */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { withBrowser, TAG_SCRIPT } from './snapshot.mjs';

const [url, snapDir, ...rest] = process.argv.slice(2);
if (!url || !snapDir) {
  console.error('usage: node tools/mockups/motion.mjs <url> <snapDir> [--load 4500] [--first 3000] [--step 250] [--wait 900]');
  process.exit(1);
}
const opt = (name, def) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? Number(rest[i + 1]) : def;
};
const LOAD = opt('load', 4500);
const FIRST = opt('first', 3000);
const STEP = opt('step', 250);
const WAIT = opt('wait', 900);
const FRAME = 16;

// ---------- числа из opacity/transform ----------
const parseTransform = (t) => {
  let x = 0, y = 0, sx = 1, sy = 1, r = 0;
  if (!t || t === 'none') return [x, y, sx, sy, r];
  for (const m of t.matchAll(/(translate3d|translate[XYZ]?|scale[XY]?|rotate[Z]?)\(([^)]*)\)/g)) {
    const v = m[2].split(',').map((p) => parseFloat(p) || 0);
    switch (m[1]) {
      case 'translateX': x += v[0]; break;
      case 'translateY': y += v[0]; break;
      case 'translate': case 'translate3d': x += v[0]; y += v[1] ?? 0; break;
      case 'scale': sx *= v[0]; sy *= v[1] ?? v[0]; break;
      case 'scaleX': sx *= v[0]; break;
      case 'scaleY': sy *= v[0]; break;
      default: r += v[0];
    }
  }
  return [x, y, sx, sy, r];
};
// Вектор состояния; масштаб и прозрачность ×100, чтобы были соизмеримы с пикселями.
const vec = ([op, tr]) => {
  const [x, y, sx, sy, r] = parseTransform(tr);
  return [op === '' ? 100 : parseFloat(op) * 100, x, y, sx * 100, sy * 100, r];
};
const dist = (a, b) => Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
const round = (v, q) => Math.round(v / q) * q;
// Значение на момент t по записи изменений [[t, opacity, transform], …].
const at = (frames, t) => {
  let cur = frames[0];
  for (const f of frames) if (f[0] <= t) cur = f; else break;
  return cur;
};
// Кубическая Безье (x1,y1,x2,y2): y по x.
const bezier = (x1, y1, x2, y2) => (x) => {
  let lo = 0, hi = 1;
  for (let k = 0; k < 40; k++) {
    const m = (lo + hi) / 2;
    const bx = 3 * (1 - m) ** 2 * m * x1 + 3 * (1 - m) * m * m * x2 + m ** 3;
    if (bx < x) lo = m; else hi = m;
  }
  const m = (lo + hi) / 2;
  return 3 * (1 - m) ** 2 * m * y1 + 3 * (1 - m) * m * m * y2 + m ** 3;
};
const easeOut = bezier(0, 0, 0.58, 1);
const state = (f, props) => Object.fromEntries(props.map((p) => [p, p === 'opacity' ? (f[1] === '' ? '1' : f[1]) : f[2] || 'none']));

await withBrowser(async (page) => {
  await page.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `(() => {
      const rec = new Map();
      window.__mload = { rec, done: false };
      const t0 = performance.now();
      const tick = () => {
        const t = Math.round(performance.now() - t0);
        for (const el of document.querySelectorAll('[style]')) {
          const s = el.style;
          // opacity framer-motion ведёт через WAAPI — инлайн-значение меняется только в конце.
          let r = rec.get(el);
          if (!r && !s.opacity && !s.transform) continue;
          const v = [getComputedStyle(el).opacity, s.transform];
          if (!r) {
            const b = el.getBoundingClientRect();
            r = { top: b.top + scrollY, bottom: b.bottom + scrollY, frames: [[t, v[0], v[1]]] };
            rec.set(el, r);
            continue;
          }
          const last = r.frames[r.frames.length - 1];
          if (last[1] !== v[0] || last[2] !== v[1]) r.frames.push([t, v[0], v[1]]);
        }
        if (t < ${LOAD}) requestAnimationFrame(tick); else window.__mload.done = true;
      };
      requestAnimationFrame(tick);
    })()`,
  });
  // Та же пауза после load, что у snapshot.mjs, — нумерация совпадёт.
  await page.goto(url, 4000);
  await page.eval(`new Promise((r) => { const w = () => (window.__mload?.done ? r() : setTimeout(w, 50)); w(); })`);
  await page.eval(TAG_SCRIPT);
  const loadRec = await page.eval(`(() => {
    const out = {};
    for (const [el, r] of window.__mload.rec) if (el.isConnected && el.hasAttribute('data-i')) out[el.getAttribute('data-i')] = r;
    return { out, vh: innerHeight };
  })()`);

  // ---------- анализ загрузки ----------
  const load = {};
  const starts = [];
  for (const [id, r] of Object.entries(loadRec.out)) {
    const fr = r.frames;
    if (fr.length < 3 || r.top >= loadRec.vh) continue; // не менялся или не в первом экране
    const start = fr[1][0] - FRAME;
    if (start > FIRST) continue;
    const end = fr[fr.length - 1][0];
    const props = ['opacity', 'transform'].filter((p, k) => new Set(fr.map((f) => f[k + 1])).size > 1);
    const v = fr.map((f) => vec([f[1], f[2]]));
    if (end > LOAD - 250) {
      // Бесконечная: ищем период L, при котором значения повторяются на последнем отрезке.
      const grid = (t) => vec(at(fr, t).slice(1));
      const winEnd = end;
      let best = null;
      const errs = [];
      for (let L = 200; L <= Math.min(2500, winEnd - start - 200); L += 10) {
        const from = Math.max(start + L, winEnd - Math.max(L, 800));
        let e = 0, n = 0;
        for (let t = from; t <= winEnd; t += 10) {
          e += dist(grid(t), grid(t - L));
          n++;
        }
        errs.push([L, e / n]);
      }
      if (!errs.length) continue;
      const amp = Math.max(...v.map((x) => dist(x, v[0])));
      const minErr = Math.min(...errs.map((x) => x[1]));
      // Самый короткий лаг с ошибкой, близкой к минимальной (не кратный период), и локальный минимум.
      for (let k = 0; k < errs.length; k++) {
        const [L, e] = errs[k];
        const localMin = (k === 0 || e <= errs[k - 1][1]) && (k === errs.length - 1 || e <= errs[k + 1][1]);
        if (localMin && e <= minErr + 0.08 * amp + 0.05) { best = L; break; }
      }
      if (!best) continue;
      const N = 20;
      const phase0 = winEnd - best;
      const keyframes = [];
      for (let k = 0; k <= N; k++) {
        const tt = start + (best * k) / N;
        const t = phase0 + (((tt - phase0) % best) + best) % best;
        keyframes.push([+((100 * k) / N).toFixed(1), state(at(fr, k === N ? phase0 + ((start - phase0) % best + best) % best : t), props)]);
      }
      load[id] = { kind: 'loop', start, dur: best, easing: 'linear', props, keyframes };
    } else {
      const dur = end - start;
      if (dur < 2 * FRAME) continue;
      const v0 = v[0], v1 = v[v.length - 1];
      const total = dist(v0, v1);
      if (total < 0.5) continue;
      // Середина по времени: прогресс ease-out там ≈ 0.8; иначе — ключевые кадры по записи.
      const progress = (t) => dist(vec(at(fr, t).slice(1)), v0) / total;
      const fits = [0.25, 0.5, 0.75].every((x) => Math.abs(progress(start + dur * x) - easeOut(x)) < 0.1);
      let keyframes;
      if (fits) keyframes = [[0, state(fr[0], props)], [100, state(fr[fr.length - 1], props)]];
      else {
        keyframes = [];
        for (let k = 0; k <= 20; k++) keyframes.push([k * 5, state(at(fr, start + (dur * k) / 20), props)]);
      }
      load[id] = { kind: 'once', start, dur: round(dur, 50) || dur, easing: fits ? 'ease-out' : 'linear', props, keyframes };
    }
    starts.push(start);
  }
  const base = starts.length ? Math.min(...starts) : 0;
  for (const m of Object.values(load)) {
    m.delay = Math.max(0, round(m.start - base, 10));
    delete m.start;
  }

  // ---------- появление при прокрутке ----------
  await page.eval(`(() => {
    const rec = new Map();
    const t0 = performance.now();
    window.__mrev = { rec, t0, stop: false };
    const tick = () => {
      const t = Math.round(performance.now() - t0);
      for (const el of document.querySelectorAll('[data-i][style]')) {
        const s = el.style;
        const v = getComputedStyle(el).opacity + '|' + s.transform;
        const r = rec.get(el);
        if (!r) { rec.set(el, { last: v, changes: [] }); continue; }
        if (r.last !== v) { r.last = v; r.changes.push(t); }
      }
      if (!window.__mrev.stop) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  })()`);
  await page.eval('new Promise((r) => setTimeout(r, 300))');
  const height = await page.eval('document.documentElement.scrollHeight - innerHeight');
  const steps = [];
  for (let y = 0; ; y = Math.min(height, y + STEP)) {
    steps.push(await page.eval(`(() => { scrollTo(0, ${y}); return Math.round(performance.now() - window.__mrev.t0); })()`));
    await page.eval(`new Promise((r) => setTimeout(r, ${WAIT}))`);
    if (y >= height) break;
  }
  await page.eval('new Promise((r) => setTimeout(r, 1500))');
  const revRec = await page.eval(`(() => {
    window.__mrev.stop = true;
    const out = {};
    for (const [el, r] of window.__mrev.rec) if (r.changes.length) out[el.getAttribute('data-i')] = r.changes;
    return out;
  })()`);

  const stepOf = (t) => {
    let s = 0;
    while (s + 1 < steps.length && steps[s + 1] <= t) s++;
    return s;
  };
  const byStep = new Map();
  for (const [id, changes] of Object.entries(revRec)) {
    if (load[id]) continue;
    const touched = new Set(changes.map(stepOf));
    if (touched.size > 2 || changes.length < 2) continue; // параллакс или скачок без анимации
    const start = changes[0] - FRAME;
    const item = { id, start, dur: changes[changes.length - 1] - start };
    const s = stepOf(changes[0]);
    if (!byStep.has(s)) byStep.set(s, []);
    byStep.get(s).push(item);
  }
  // Задержка реакции страницы на прокрутку (IntersectionObserver + кадр) — типичная по шагам.
  const lat = [...byStep].map(([s, items]) => Math.min(...items.map((i) => i.start)) - steps[s]).sort((a, b) => a - b);
  const latency = lat.length ? Math.min(lat[Math.floor(lat.length / 2)], 120) : FRAME;
  const reveal = {};
  for (const [s, items] of byStep) {
    const b = Math.min(Math.min(...items.map((i) => i.start)), steps[s] + latency);
    for (const i of items) reveal[i.id] = { delay: Math.max(0, round(i.start - b, 10)), dur: Math.max(50, round(i.dur, 50)) };
  }

  writeFileSync(path.join(snapDir, 'motion.json'), JSON.stringify({ load, reveal }, null, 2));
  const loops = Object.values(load).filter((m) => m.kind === 'loop').length;
  console.log(`motion ${url}: анимаций загрузки ${Object.keys(load).length} (бесконечных ${loops}), появлений ${Object.keys(reveal).length}`);
});
