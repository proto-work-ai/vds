/* Съёмка hover-состояний, которые выставляет JS (onMouseEnter/onMouseLeave в React,
   whileHover во framer-motion).

   node tools/mockups/hover.mjs <url> <snapDir> [--stable 8] [--timeout 1500]

   --stable N   сколько кадров подряд стиль не должен меняться, чтобы считать
                анимацию наведения законченной (по умолчанию 8);
   --timeout ms предел ожидания конца анимации (по умолчанию 1500).

   Нумерует узлы так же, как snapshot.mjs, прокручивает страницу, затем для
   каждого интерактивного элемента (ссылки, кнопки, cursor:pointer, элементы с
   transition) наводит настоящий курсор через CDP Input.dispatchMouseEvent
   (framer-motion слушает pointer-события — синтетические mouseenter не годятся):
   элемент прокручивается в центр экрана, курсор уводится в точку вне элемента,
   затем ставится в видимую точку элемента. По кадрам (requestAnimationFrame)
   атрибуты style элемента и потомков опрашиваются, пока не перестанут меняться
   --stable кадров подряд, и только тогда сравниваются с исходными.

   Результат — <snapDir>/hover.json:
   { "<data-i>": {
       "self": "prop:value;...",                     — стиль самого элемента;
       "children": { "<data-i>": "prop:value;..." },  — стили потомков (→ group-hover);
       "timing": { "<data-i>": { "delay": мс, "dur": мс } } — когда узел начал и
                                                       сколько менялся (→ transition)
   } }
   Если наведение на потомка даёт те же изменения, что уже записаны у предка
   (курсор над потомком — это и наведение на предка), запись потомка не пишется:
   достаточно group-hover от предка.
   CSS-правила :hover сюда не попадают — они переносятся из CSS сайта. */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { withBrowser, TAG_SCRIPT, SCROLL_SCRIPT } from './snapshot.mjs';

const [url, snapDir, ...rest] = process.argv.slice(2);
if (!url || !snapDir) {
  console.error('usage: node tools/mockups/hover.mjs <url> <snapDir> [--stable 8] [--timeout 1500]');
  process.exit(1);
}
const opt = (name, def) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? Number(rest[i + 1]) : def;
};
const STABLE = opt('stable', 8);
const TIMEOUT = opt('timeout', 1500);

const parse = (s) =>
  Object.fromEntries(
    (s || '')
      .split(';')
      .map((d) => {
        const i = d.indexOf(':');
        return i < 0 ? null : [d.slice(0, i).trim(), d.slice(i + 1).trim()];
      })
      .filter((x) => x && x[0])
  );
const diff = (a, b) => {
  const A = parse(a);
  const B = parse(b);
  return Object.entries(B)
    .filter(([k, v]) => A[k] !== v)
    .map(([k, v]) => k + ':' + v)
    .join(';');
};

// Помощники в странице: список кандидатов, точки для курсора, покадровое ожидание.
const HELPERS = `(() => {
  const byId = (id) => document.querySelector('[data-i="' + id + '"]');
  window.__hv = {
    candidates() {
      return [...document.querySelectorAll('body *')].filter((el) => {
        if (!el.hasAttribute('data-i')) return false;
        const cs = getComputedStyle(el);
        if (el.matches('a,button,[role=button],input,select,textarea') || cs.cursor === 'pointer' || /transition/.test(el.getAttribute('style') || '')) return true;
        // whileHover framer-motion по DOM не виден: пробуем и «карточки» — блоки с инлайн-стилем
        // и заметной рамкой, тенью, скруглением или фоном.
        const r = el.getBoundingClientRect();
        if (!el.hasAttribute('style') || r.width < 60 || r.height < 40) return false;
        return cs.boxShadow !== 'none' || parseFloat(cs.borderTopLeftRadius) > 0 || parseFloat(cs.borderTopWidth) > 0 || !/rgba\\(0, 0, 0, 0\\)|transparent/.test(cs.backgroundColor);
      }).map((el) => el.getAttribute('data-i'));
    },
    // Прокрутка в экран и выбор точек: внутри элемента (не перекрытой чужим узлом) и вне его.
    async prepare(id) {
      const el = byId(id);
      if (!el || !el.isConnected) return null;
      el.scrollIntoView({ block: 'center', inline: 'center' });
      await new Promise((r) => setTimeout(r, 120));
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return null;
      const W = innerWidth, H = innerHeight;
      let inside = null;
      for (const [fx, fy] of [[0.5, 0.5], [0.3, 0.3], [0.7, 0.7], [0.3, 0.7], [0.7, 0.3], [0.5, 0.15], [0.5, 0.85]]) {
        const x = Math.min(W - 1, Math.max(0, r.left + r.width * fx));
        const y = Math.min(H - 1, Math.max(0, r.top + r.height * fy));
        const hit = document.elementFromPoint(x, y);
        if (hit && el.contains(hit)) { inside = [x, y]; break; }
      }
      if (!inside) return null;
      let outside = null;
      for (const [x, y] of [[1, H - 2], [W - 2, H - 2], [1, Math.round(H / 2)], [W - 2, Math.round(H / 2)], [Math.round(W / 2), H - 2], [1, 1], [W - 2, 1]]) {
        const hit = document.elementFromPoint(x, y);
        if (!hit || (!el.contains(hit) && !hit.contains(el))) { outside = [x, y]; break; }
      }
      if (!outside) return null;
      const anc = [];
      for (let p = el.parentElement; p; p = p.parentElement) if (p.hasAttribute('data-i')) anc.push(p.getAttribute('data-i'));
      return { inside, outside, anc };
    },
    nodes(id) {
      const el = byId(id);
      return el ? [el, ...el.querySelectorAll('[data-i]')].slice(0, 150) : [];
    },
    styles(id) {
      return Object.fromEntries(this.nodes(id).map((n) => [n.getAttribute('data-i'), n.getAttribute('style') || '']));
    },
    // Ждёт, пока стили поддерева не перестанут меняться stable кадров подряд.
    // Если за quietMs ничего не изменилось — наведение ничего не делает.
    watch(id, stable, timeout, quietMs) {
      const nodes = this.nodes(id);
      // opacity и transform framer-motion может вести через WAAPI, не трогая атрибут style
      // до конца анимации, — в подпись кадра входят и computed-значения.
      const sig = (n) => { const cs = getComputedStyle(n); return (n.getAttribute('style') || '') + '|' + cs.opacity + '|' + cs.transform; };
      return new Promise((res) => {
        const prev = nodes.map(sig);
        const first = {}, last = {};
        const t0 = performance.now();
        let still = 0, changedAny = false;
        const tick = () => {
          const t = performance.now() - t0;
          let changed = false;
          nodes.forEach((n, k) => {
            const s = sig(n);
            if (s !== prev[k]) {
              prev[k] = s;
              changed = true;
              const nid = n.getAttribute('data-i');
              if (first[nid] == null) first[nid] = t;
              last[nid] = t;
            }
          });
          if (changed) { still = 0; changedAny = true; } else still++;
          const done = (changedAny && still >= stable) || (!changedAny && t > quietMs) || t > timeout;
          if (done) {
            const timing = {};
            for (const nid of Object.keys(first)) timing[nid] = { delay: Math.round(first[nid]), dur: Math.round(last[nid] - first[nid] + 16) };
            res({ timing, t: Math.round(t), timedOut: t > timeout });
          } else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
  };
  return true;
})()`;

await withBrowser(async (page) => {
  await page.goto(url);
  const tagged = await page.eval(TAG_SCRIPT);
  await page.eval(SCROLL_SCRIPT);
  await page.eval(HELPERS);
  const mouse = (x, y) => page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, pointerType: 'mouse' });

  const ids = await page.eval('__hv.candidates()');
  const raw = {};
  const ancestors = {};
  let timedOut = 0;
  for (const id of ids) {
    const prep = await page.eval(`__hv.prepare(${JSON.stringify(id)})`);
    if (!prep) continue;
    ancestors[id] = prep.anc;
    // Курсор вне элемента, дождаться, пока всё успокоится (уход с прошлого элемента).
    await mouse(...prep.outside);
    await page.eval(`__hv.watch(${JSON.stringify(id)}, ${STABLE}, ${TIMEOUT}, 250)`);
    const before = await page.eval(`__hv.styles(${JSON.stringify(id)})`);

    await page.eval(`window.__hvw = __hv.watch(${JSON.stringify(id)}, ${STABLE}, ${TIMEOUT}, 400); 0`);
    await mouse(...prep.inside);
    const w = await page.eval('window.__hvw');
    if (w.timedOut) timedOut++;
    const after = await page.eval(`__hv.styles(${JSON.stringify(id)})`);

    const self = diff(before[id], after[id]);
    const children = {};
    for (const [nid, style] of Object.entries(after)) {
      if (nid === id) continue;
      const d = diff(before[nid] ?? '', style);
      if (d) children[nid] = d;
    }
    if (self || Object.keys(children).length) {
      const timing = {};
      for (const nid of [id, ...Object.keys(children)]) if (w.timing[nid] && (nid !== id || self)) timing[nid] = w.timing[nid];
      raw[id] = { self, children, timing };
    }
    await mouse(...prep.outside);
    await page.eval(`__hv.watch(${JSON.stringify(id)}, ${STABLE}, ${TIMEOUT}, 250)`);
  }

  // Потомок, который при наведении на себя меняется так же, как при наведении на
  // предка, отдельной записи не получает — хватает group-hover от предка.
  const changesOf = (id) => ({ [id]: raw[id].self, ...raw[id].children });
  const out = {};
  let merged = 0;
  for (const id of Object.keys(raw)) {
    const mine = Object.entries(changesOf(id)).filter(([, v]) => v);
    const covered = (ancestors[id] ?? []).some((a) => {
      if (!raw[a]) return false;
      const theirs = changesOf(a);
      return mine.every(([nid, v]) => theirs[nid] === v);
    });
    if (covered) merged++;
    else out[id] = raw[id];
  }

  writeFileSync(path.join(snapDir, 'hover.json'), JSON.stringify(out, null, 2));
  console.log(
    `hover ${url}: узлов ${tagged}, кандидатов ${ids.length}, с JS-hover ${Object.keys(out).length} (ещё ${merged} совпали с наведением на предка), не успокоились за ${TIMEOUT}мс: ${timedOut}`
  );
});
