/* Съёмка hover-состояний, которые выставляет JS (onMouseEnter/onMouseLeave в React).

   node tools/mockups/hover.mjs <url> <snapDir>

   Нумерует узлы так же, как snapshot.mjs, прокручивает страницу, затем для
   каждого интерактивного элемента (ссылки, кнопки, cursor:pointer, элементы с
   transition) имитирует наведение и сравнивает атрибуты style у элемента и его
   потомков до и после. Результат — <snapDir>/hover.json:
   { "<data-i>": { "self": "prop:value;...", "children": { "<data-i>": "prop:value;..." } } }
   CSS-правила :hover сюда не попадают — они переносятся из CSS сайта. */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { withBrowser, TAG_SCRIPT, SCROLL_SCRIPT } from './snapshot.mjs';

const [url, snapDir] = process.argv.slice(2);
if (!url || !snapDir) {
  console.error('usage: node tools/mockups/hover.mjs <url> <snapDir>');
  process.exit(1);
}

await withBrowser(async (page) => {
  await page.goto(url);
  const tagged = await page.eval(TAG_SCRIPT);
  await page.eval(SCROLL_SCRIPT);

  const result = await page.eval(`(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const parse = (s) => Object.fromEntries((s || '').split(';').map((d) => {
      const i = d.indexOf(':');
      return i < 0 ? null : [d.slice(0, i).trim(), d.slice(i + 1).trim()];
    }).filter((x) => x && x[0]));
    const diff = (a, b) => {
      const A = parse(a), B = parse(b);
      return Object.entries(B).filter(([k, v]) => A[k] !== v).map(([k, v]) => k + ':' + v).join(';');
    };
    const snap = (el) => {
      const m = new Map();
      [el, ...el.querySelectorAll('*')].slice(0, 80).forEach((x) => m.set(x, x.getAttribute('style') || ''));
      return m;
    };

    const candidates = [...document.querySelectorAll('body *')].filter((el) => {
      if (!el.hasAttribute('data-i')) return false;
      const cs = getComputedStyle(el);
      return el.matches('a,button,[role=button],input,select,textarea') || cs.cursor === 'pointer' || /transition/.test(el.getAttribute('style') || '');
    });

    const out = {};
    for (const el of candidates) {
      if (!el.isConnected) continue;
      el.scrollIntoView({ block: 'center' });
      await sleep(30);
      const before = snap(el);
      el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, relatedTarget: document.body }));
      el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false, relatedTarget: document.body }));
      await sleep(60);
      const after = snap(el);
      const self = diff(before.get(el), after.get(el));
      const children = {};
      for (const [node, style] of after) {
        if (node === el || !node.hasAttribute('data-i')) continue;
        const d = diff(before.get(node) ?? '', style);
        if (d) children[node.getAttribute('data-i')] = d;
      }
      if (self || Object.keys(children).length) out[el.getAttribute('data-i')] = { self, children };
      el.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body }));
      el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false, relatedTarget: document.body }));
      await sleep(60);
    }
    return { candidates: candidates.length, out };
  })()`);

  writeFileSync(path.join(snapDir, 'hover.json'), JSON.stringify(result.out, null, 2));
  console.log(`hover ${url}: узлов ${tagged}, кандидатов ${result.candidates}, с JS-hover ${Object.keys(result.out).length}`);
});
