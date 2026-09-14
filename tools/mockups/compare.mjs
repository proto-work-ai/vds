/* Сравнение оригинала и перевода на Tailwind.

   node tools/mockups/compare.mjs <originalUrl> <tailwindUrl> [--report <file.json>] [--width 1440]

   Открывает обе страницы, прокручивает до конца (все появления сработали),
   затем берёт видимые элементы <body> в порядке документа и сравнивает попарно:
   тег, размеры и положение (допуск 2px) и вычисленные стили. Узлы, которых нет
   в переводе по замыслу (скрипты, стили, плашка Figma, приёмник классов),
   пропускаются. Печатает сводку, полный список расхождений — в --report. */
import { writeFileSync } from 'node:fs';
import { withBrowser, SCROLL_SCRIPT } from './snapshot.mjs';

const [origUrl, twUrl, ...rest] = process.argv.slice(2);
if (!origUrl || !twUrl) {
  console.error('usage: node tools/mockups/compare.mjs <originalUrl> <tailwindUrl> [--report file.json]');
  process.exit(1);
}
const reportIdx = rest.indexOf('--report');
const REPORT = reportIdx >= 0 ? rest[reportIdx + 1] : null;

const PROPS = [
  'display', 'position', 'color', 'background-color', 'background-image', 'font-family', 'font-size', 'font-weight',
  'font-style', 'line-height', 'letter-spacing', 'text-transform', 'text-align', 'opacity', 'transform',
  'border-top-width', 'border-top-color', 'border-radius', 'box-shadow', 'padding-top', 'padding-left',
  'margin-top', 'gap', 'animation-name', 'animation-duration', 'transition-duration', 'z-index', 'object-fit',
];

const COLLECT = `(() => {
  const PROPS = ${JSON.stringify(PROPS)};
  // Один и тот же цвет браузер может отдать как rgba(...) или oklab(...):
  // рисуем пиксель на canvas и сравниваем уже числа.
  const COLOR_PROPS = new Set(['color', 'background-color', 'border-top-color']);
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const toRgba = (value) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return a === 0 ? 'transparent' : 'rgba(' + r + ',' + g + ',' + b + ',' + Math.round((a / 255) * 100) / 100 + ')';
  };
  const skip = (el) =>
    el.matches('script,style,link,noscript,template') ||
    (el.hasAttribute('hidden') && !el.children.length && el.className) ||
    /Created with Figma Make/.test(el.textContent || '') && getComputedStyle(el).position === 'fixed';
  const out = [];
  const walk = (el) => {
    for (const c of el.children) {
      if (skip(c)) continue;
      const cs = getComputedStyle(c);
      const r = c.getBoundingClientRect();
      const text = [...c.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').slice(0, 40);
      out.push({
        tag: c.tagName.toLowerCase(),
        text,
        rect: [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)],
        css: Object.fromEntries(PROPS.map((p) => [p, COLOR_PROPS.has(p) ? toRgba(cs.getPropertyValue(p)) : cs.getPropertyValue(p)])),
      });
      walk(c);
    }
  };
  walk(document.body);
  return { nodes: out, height: document.documentElement.scrollHeight };
})()`;

async function capture(page, url) {
  await page.goto(url);
  await page.eval(SCROLL_SCRIPT);
  await page.eval('new Promise((r) => setTimeout(r, 1500))');
  await page.eval('window.scrollTo(0, 0)');
  // Закреплённые шапки переключаются с переходом — ждём, пока он закончится.
  await page.eval('new Promise((r) => setTimeout(r, 1500))');
  return page.eval(COLLECT);
}

const [orig, tw] = await withBrowser(async (page) => [await capture(page, origUrl), await capture(page, twUrl)]);

const norm = (p, v) => {
  if (p === 'font-family') return v.replace(/["']/g, '').split(',')[0].trim().toLowerCase();
  return v.replace(/\s+/g, ' ').trim();
};

// Пары узлов — по наибольшей общей подпоследовательности подписей (тег + свой текст),
// а не по номеру: один переставленный узел не должен сдвигать весь хвост сравнения.
const sig = (x) => `${x.tag}|${x.text}`;
function align(A, B) {
  const n = A.length;
  const m = B.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = sig(A[i]) === sig(B[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const pairs = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (sig(A[i]) === sig(B[j])) pairs.push([i++, j++]);
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return pairs;
}
const pairs = align(orig.nodes, tw.nodes);
const unmatched = orig.nodes.length - pairs.length;

const diffs = [];
const n = pairs.length;
let tagMismatch = unmatched;
let rectDiff = 0;
let cssDiff = 0;
for (const [ia, ib] of pairs) {
  const i = ia;
  const a = orig.nodes[ia];
  const b = tw.nodes[ib];
  const entry = { i, tag: a.tag, text: a.text, problems: [] };
  if (a.tag !== b.tag) {
    entry.problems.push(`тег ${a.tag} → ${b.tag}`);
    tagMismatch++;
  }
  if (a.rect.some((v, k) => Math.abs(v - b.rect[k]) > 2)) {
    entry.problems.push(`размер/положение ${a.rect.join(',')} → ${b.rect.join(',')}`);
    rectDiff++;
  }
  for (const p of PROPS) {
    if (norm(p, a.css[p]) !== norm(p, b.css[p])) {
      entry.problems.push(`${p}: ${a.css[p]} → ${b.css[p]}`);
      cssDiff++;
    }
  }
  if (entry.problems.length) diffs.push(entry);
}

const summary = {
  original: { nodes: orig.nodes.length, height: orig.height },
  tailwind: { nodes: tw.nodes.length, height: tw.height },
  compared: n,
  elementsWithDiffs: diffs.length,
  tagMismatch,
  rectDiff,
  cssDiff,
};
console.log(JSON.stringify(summary));
const byProp = {};
for (const d of diffs) for (const p of d.problems) {
  const k = p.split(':')[0].split(' ')[0];
  byProp[k] = (byProp[k] ?? 0) + 1;
}
console.log('расхождения по свойствам:', JSON.stringify(byProp));
console.log('первые расхождения:');
for (const d of diffs.slice(0, 12)) console.log(`  #${d.i} <${d.tag}> "${d.text}": ${d.problems.slice(0, 3).join(' | ')}`);
if (REPORT) writeFileSync(REPORT, JSON.stringify({ summary, diffs }, null, 2));
