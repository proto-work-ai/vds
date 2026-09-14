/* Перевод снимка отрисованной страницы в статичный HTML на Tailwind 4.

   node tools/mockups/to-tailwind.mjs --snap <dir> --css <site.css> --out <file.html>
        [--root <путь к папке оригинала от out>] [--hover <hover.json>] [--title <текст>]

   Вход — снимок tools/mockups/snapshot.mjs (initial.html, final.html) и CSS
   сайта. Что делает:
   - инлайн-стили → классы-свойства Tailwind `[prop:value]!` (восклицательный
     знак сохраняет приоритет инлайн-стиля над классами сайта);
   - простые правила из <style> (классы вида .css-xxx, их :hover и @media) →
     такие же классы с вариантами `hover:` и `min-[..]:`/`max-[..]:`;
   - свой CSS сайта вне служебных слоёв Tailwind (переменные, @property,
     @keyframes, классы) → в <style type="text/tailwindcss">, токены темы → @theme;
   - элементы, у которых начальный и конечный снимок отличаются, получают
     начальные классы и data-reveal с конечными — скрипт меняет их при
     появлении в экране (замена framer-motion/IntersectionObserver из React);
   - hover-состояния, снятые из JS-обработчиков (hover.json), → `hover:`/`group-hover:`;
   - React, рантайм Figma и служебные ссылки удаляются;
   - рядом пишется <out>.assets.json — картинки и иконки для страниц-галерей. */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { parse, serialize } from 'parse5';

const args = process.argv.slice(2);
const arg = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const SNAP = arg('snap');
const CSS = arg('css');
const OUT = arg('out');
const ROOT = arg('root', '');
const HOVER = arg('hover');
const TITLE = arg('title');
if (!SNAP || !CSS || !OUT) {
  console.error('usage: --snap <dir> --css <site.css> --out <file.html> [--root <rel>] [--hover <json>] [--title <t>]');
  process.exit(1);
}

// ---------- утилиты DOM (дерево parse5) ----------
const attr = (n, name) => n.attrs?.find((a) => a.name === name)?.value;
const setAttr = (n, name, value) => {
  const a = n.attrs.find((x) => x.name === name);
  if (value === null || value === undefined) n.attrs = n.attrs.filter((x) => x.name !== name);
  else if (a) a.value = value;
  else n.attrs.push({ name, value });
};
function* walk(n) {
  yield n;
  for (const c of n.childNodes ?? []) yield* walk(c);
  if (n.content) yield* walk(n.content);
}
const find = (root, pred) => {
  for (const n of walk(root)) if (pred(n)) return n;
  return null;
};
const textOf = (n) => [...walk(n)].filter((x) => x.nodeName === '#text').map((x) => x.value).join(' ').replace(/\s+/g, ' ').trim();
const remove = (n) => {
  const p = n.parentNode;
  if (p) p.childNodes = p.childNodes.filter((c) => c !== n);
};

// ---------- CSS → классы Tailwind ----------
// Значение в классе: пробелы → _, существующие _ экранируются, двойные кавычки → одинарные.
const twValue = (v) => v.trim().replace(/_/g, '\\_').replace(/"/g, "'").replace(/\s+/g, '_');
const declToClass = (prop, value, variant = '', important = false) => {
  const cls = `[${prop.trim().toLowerCase().startsWith('--') ? prop.trim() : prop.trim().toLowerCase()}:${twValue(value)}]`;
  return `${variant}${cls}${important ? '!' : ''}`;
};
const splitDecls = (style) => {
  const out = [];
  let buf = '';
  let depth = 0;
  let quote = null;
  for (const ch of style) {
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ';' && !quote && depth === 0) {
      out.push(buf);
      buf = '';
    } else buf += ch;
  }
  out.push(buf);
  return out
    .map((d) => {
      const i = d.indexOf(':');
      if (i < 0) return null;
      const prop = d.slice(0, i).trim();
      const value = d.slice(i + 1).replace(/!important\s*$/, '').trim();
      return prop && value ? [prop, value] : null;
    })
    .filter(Boolean);
};
const styleToClasses = (style, variant = '') => splitDecls(style ?? '').map(([p, v]) => declToClass(p, v, variant));

// Вырезает блоки @layer {...} верхнего уровня; возвращает [остаток, содержимое theme].
function splitLayers(css) {
  const re = /@layer\s+([a-z-]+)\s*\{/g;
  const parts = [];
  let theme = '';
  let base = '';
  let utilities = '';
  let m;
  while ((m = re.exec(css))) {
    let j = re.lastIndex;
    let d = 1;
    while (d && j < css.length) {
      if (css[j] === '{') d++;
      else if (css[j] === '}') d--;
      j++;
    }
    if (m[1] === 'theme') theme += css.slice(re.lastIndex, j - 1);
    // Базовый слой сайта (цвет текста и границ из shadcn) переносится целиком.
    if (m[1] === 'base') base += css.slice(re.lastIndex, j - 1);
    if (m[1] === 'utilities') utilities += css.slice(re.lastIndex, j - 1);
    parts.push([m.index, j]);
    re.lastIndex = j;
  }
  let rest = '';
  let p = 0;
  for (const [a, b] of parts) {
    rest += css.slice(p, a);
    p = b;
  }
  rest += css.slice(p);
  return [rest, theme, base, utilities];
}

// Разбор CSS верхнего уровня на правила (селектор + тело), @media — рекурсивно.
function rules(css) {
  const out = [];
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open < 0) break;
    const head = css.slice(i, open).trim();
    let j = open + 1;
    let d = 1;
    while (d && j < css.length) {
      if (css[j] === '{') d++;
      else if (css[j] === '}') d--;
      j++;
    }
    out.push({ head, body: css.slice(open + 1, j - 1) });
    i = j;
  }
  return out;
}

// ---------- входные данные ----------
const finalDoc = parse(readFileSync(path.join(SNAP, 'final.html'), 'utf8'));
const initialDoc = parse(readFileSync(path.join(SNAP, 'initial.html'), 'utf8'));
const siteCss = readFileSync(CSS, 'utf8');
const hover = HOVER && existsSync(HOVER) ? JSON.parse(readFileSync(HOVER, 'utf8')) : {};

const initialById = new Map();
for (const n of walk(initialDoc)) {
  const id = n.attrs && attr(n, 'data-i');
  if (id) initialById.set(id, { cls: attr(n, 'class') ?? '', style: attr(n, 'style') ?? '' });
}

// ---------- CSS сайта ----------
const [customCssRaw, themeCss, baseCss, utilitiesCss] = splitLayers(siteCss);
// В адресе Google Fonts есть «;» (wght@400;500) — @import разбираем по кавычкам,
// а не до первой точки с запятой, иначе хвост адреса ломает сборку Tailwind.
// В минифицированном CSS пробела после @import нет: `@import"https://…"`.
const IMPORT_RE = /@import\s*(?:url\(\s*)?(["'])(.*?)\1\s*\)?[^;]*;|@import\s*url\(([^)]*)\)[^;]*;/g;
const fontImports = [...customCssRaw.matchAll(IMPORT_RE)].map((m) => (m[2] ?? m[3]).trim());
let customCss = customCssRaw
  .replace(IMPORT_RE, '')
  .replace(/@layer[^{;]+;/g, '')
  // Служебные свойства Tailwind браузерная сборка объявляет сама.
  .replace(/@property\s+--tw-[\w-]+\s*\{[^}]*\}/g, '')
  .trim();

// @property и @font-face не кладём внутрь @layer — выносим на верхний уровень.
const TOP_LEVEL_RE = /@(property|font-face)\b[^{]*\{[^}]*\}/g;
const topLevelCss = (customCss.match(TOP_LEVEL_RE) ?? []).join('\n');
const layeredCss = customCss.replace(TOP_LEVEL_RE, '');

const themeTokens = new Map();
for (const m of (themeCss.match(/--[\w-]+\s*:[^;]+;/g) ?? [])) {
  const i = m.indexOf(':');
  themeTokens.set(m.slice(0, i).trim(), m.slice(i + 1, -1).trim());
}
// Токены, зашитые в утилиты: имя класса → переменная темы Tailwind.
const TOKEN_RULES = [
  [/^rounded-([a-z0-9]+)$/, 'border-radius', (k) => `--radius-${k}`],
  [/^(?:text|bg|border|ring|fill|stroke|outline|decoration|accent|caret)-([a-z][a-z0-9-]*)$/, /^(color|background-color|border-color|fill|stroke|outline-color|text-decoration-color|accent-color|caret-color)$/, (k) => `--color-${k}`],
  [/^max-w-([a-z0-9]+)$/, 'max-width', (k) => `--container-${k}`],
  [/^font-([a-z][a-z0-9-]*)$/, 'font-family', (k) => `--font-${k}`],
  [/^text-([a-z0-9]+)$/, 'font-size', (k) => `--text-${k}`],
  [/^tracking-([a-z]+)$/, 'letter-spacing', (k) => `--tracking-${k}`],
  [/^leading-([a-z]+)$/, 'line-height', (k) => `--leading-${k}`],
];
for (const r of rules(utilitiesCss)) {
  const sel = r.head.match(/^\.([a-z][a-z0-9-]*)$/);
  if (!sel) continue;
  for (const [prop, value] of splitDecls(r.body)) {
    if (/var\(--tw-/.test(value)) continue;
    for (const [re, propMatch, toVar] of TOKEN_RULES) {
      const m = sel[1].match(re);
      const okProp = typeof propMatch === 'string' ? prop === propMatch : propMatch.test(prop);
      if (!m || !okProp) continue;
      const name = toVar(m[1]);
      // Значение, ссылающееся на ту же переменную, — цикл: пропускаем.
      if (themeTokens.has(name) || value.includes(`var(${name}`)) continue;
      themeTokens.set(name, value);
    }
  }
}
const themeDecls = [...themeTokens].map(([k, v]) => `${k}: ${v};`).join('\n  ');

// Стили, вставленные в страницу во время работы (emotion и т.п.).
const head = find(finalDoc, (n) => n.nodeName === 'head');
const body = find(finalDoc, (n) => n.nodeName === 'body');
const runtimeCss = [...walk(head)]
  .filter((n) => n.nodeName === 'style')
  .map((n) => textOf(n))
  .join('\n');

// Простые правила «.класс», «.класс:hover», @media(min/max-width){.класс} → классы.
const classRules = new Map(); // className → [classes]
const leftoverCss = [];
const addClassRule = (sel, bodyText, variant) => {
  const m = sel.match(/^\.([\w-]+)(:hover)?$/);
  if (!m) return false;
  const v = variant + (m[2] ? 'hover:' : '');
  const list = classRules.get(m[1]) ?? [];
  for (const [p, val] of splitDecls(bodyText)) list.push(declToClass(p, val, v, false));
  classRules.set(m[1], list);
  return true;
};
for (const r of rules(runtimeCss)) {
  const media = r.head.match(/^@media\s*\(\s*(min|max)-width\s*:\s*([\d.]+px)\s*\)$/);
  if (media) {
    const variant = `${media[1]}-[${media[2]}]:`;
    const inner = rules(r.body).filter((x) => !addClassRule(x.head, x.body, variant));
    if (inner.length) leftoverCss.push(`${r.head}{${inner.map((x) => `${x.head}{${x.body}}`).join('')}}`);
  } else if (!r.head.startsWith('@') && r.head.split(',').every((s) => /^\.[\w-]+(:hover)?$/.test(s.trim()))) {
    for (const s of r.head.split(',')) addClassRule(s.trim(), r.body, '');
  } else {
    leftoverCss.push(`${r.head}{${r.body}}`);
  }
}

// ---------- преобразование элементов ----------
const revealClasses = new Set();

// Параллакс: карта прокрутки → опорные точки transform.
const parseTransform = (t) => {
  if (!t || t === 'none') return [0, 0, 1];
  let x = 0;
  let y = 0;
  let sc = 1;
  for (const m of t.matchAll(/(translate[XY]?|scale)\(([^)]*)\)/g)) {
    const v = m[2].split(',').map((p) => parseFloat(p));
    if (m[1] === 'translateX') x += v[0];
    else if (m[1] === 'translateY') y += v[0];
    else if (m[1] === 'translate') {
      x += v[0] || 0;
      y += v[1] || 0;
    } else if (m[1] === 'scale') sc *= v[0];
  }
  return [x, y, sc];
};
const scrollMapPath = arg('scroll');
const scrollMap = scrollMapPath && existsSync(scrollMapPath) ? JSON.parse(readFileSync(scrollMapPath, 'utf8')) : {};
const parallaxById = new Map();
for (const [id, series] of Object.entries(scrollMap)) {
  const opacities = new Set(series.map((p) => p.opacity));
  if (opacities.size > 1) continue; // скачок прозрачности — это появление, а не параллакс
  const points = series.map((p) => [p.y, ...parseTransform(p.transform)]);
  const moves = new Set(points.map((p) => p.slice(1).map((v) => v.toFixed(1)).join(',')));
  if (moves.size < 3) continue; // меньше трёх разных положений — не плавная зависимость
  // Появление framer-motion тоже плавно сдвигается при въезде в экран, но всегда
  // приходит к нулевому сдвигу; настоящий параллакс остаётся смещённым.
  const [, lx, ly, ls] = points[points.length - 1];
  if (Math.abs(lx) < 2 && Math.abs(ly) < 2 && Math.abs(ls - 1) < 0.01) continue;
  parallaxById.set(id, points);
}
let parallaxCount = 0;
const keepIds = new Set();
let timeline;
const assets = { images: [], icons: [] };
let revealCount = 0;
let hoverCount = 0;

// Снимок живого сайта оставляет адреса вида https://<имя>.figma.site/assets/… — файл лежит в папке оригинала.
const absUrl = (u) => {
  if (u && ROOT) u = u.replace(/^https?:\/\/[a-z0-9-]+\.figma\.site(?=\/)/, '');
  return u && ROOT && u.startsWith('/') && !u.startsWith('//') ? `${ROOT.replace(/\/$/, '')}${u}` : u;
};

// Вступительные оверлеи: вернуть из начального снимка то, что React удалил после анимации.
{
  const tlPath = arg('timeline');
  const tl = tlPath && existsSync(tlPath) ? JSON.parse(readFileSync(tlPath, 'utf8')) : null;
  if (tl?.removed?.length) {
    const removedIds = new Set(tl.removed.map((r) => r.id));
    const initNode = new Map();
    for (const n of walk(initialDoc)) if (n.attrs && attr(n, 'data-i')) initNode.set(attr(n, 'data-i'), n);
    const finalNode = new Map();
    for (const n of walk(body)) if (n.attrs && attr(n, 'data-i')) finalNode.set(attr(n, 'data-i'), n);
    for (const r of tl.removed) {
      const src = initNode.get(r.id);
      const parentId = src?.parentNode?.attrs && attr(src.parentNode, 'data-i');
      if (!src || removedIds.has(parentId)) continue; // не корень поддерева
      if (!/position:\s*fixed/.test(attr(src, 'style') ?? '')) continue; // не оверлей
      const parent = finalNode.get(parentId);
      if (!parent || finalNode.has(r.id)) continue;
      const index = src.parentNode.childNodes.indexOf(src);
      src.parentNode = parent;
      parent.childNodes.splice(Math.min(index, parent.childNodes.length), 0, src);
      src.attrs.push({ name: 'data-remove-after', value: String(r.t) });
      console.log(`вступление #${r.id}: возвращено, удаляется через ${r.t} мс`);
    }
  }
}

// Исходные class/style до любых правок: hover дописывает классы потомкам
// раньше, чем обход до них доходит, и сравнение со снимком должно идти по оригиналу.
const pristine = new Map();
for (const n of walk(body)) if (n.attrs) pristine.set(n, { cls: attr(n, 'class') ?? '', style: attr(n, 'style') ?? '' });

// Внутри фиксированной или липкой шапки состояние зависит от прокрутки.
const hasPinnedAncestor = (n) => {
  for (let p = n.parentNode; p && p.attrs; p = p.parentNode) {
    const s = pristine.get(p)?.style ?? '';
    const c = pristine.get(p)?.cls ?? '';
    if (/position:\s*(fixed|sticky)/.test(s) || /(^|\s)(fixed|sticky)(\s|$)/.test(c)) return true;
  }
  return false;
};

for (const n of [...walk(body)]) {
  if (!n.attrs) continue;
  const tag = n.nodeName;

  // <style> из разметки — в слой components (см. шапку файла: приоритеты как в оригинале).
  if (tag === 'style') {
    const text = textOf(n);
    for (const m of text.matchAll(IMPORT_RE)) fontImports.push((m[2] ?? m[3]).trim());
    leftoverCss.push(text.replace(IMPORT_RE, ''));
    remove(n);
    continue;
  }

  // Скрипты и служебные узлы — вон.
  if (tag === 'script' || tag === 'noscript' || (tag === 'link' && attr(n, 'rel') !== 'stylesheet')) {
    remove(n);
    continue;
  }
  // Плашка «Created with Figma Make» — вставляется баннером сообщества.
  if (/Created with Figma Make/.test(textOf(n)) && n.childNodes.length < 12 && attr(n, 'style')?.includes('fixed')) {
    remove(n);
    continue;
  }

  const id = attr(n, 'data-i');
  const baseCls = (attr(n, 'class') ?? '').split(/\s+/).filter(Boolean);

  // Классы из runtime-CSS разворачиваются в утилиты; сами имена сохраняются,
  // если на них опирается свой CSS сайта.
  const expand = (list) =>
    list.flatMap((c) => {
      const extra = classRules.get(c);
      const keep = !extra || new RegExp(`\\.${c}\\b`).test(customCss) || new RegExp(`\\.${c}\\b`).test(leftoverCss.join(''));
      return [...(keep ? [c] : []), ...(extra ?? [])];
    });

  const finalClasses = [...expand(baseCls), ...styleToClasses(attr(n, 'style'))];
  let classes = finalClasses;

  const init = id && initialById.get(id);
  const orig = pristine.get(n);

  // Узлы, которые меняются сами по времени (слайдеры, частицы), ведёт JS сайта:
  // берём их начальное состояние, не делаем «появлением» и оставляем номер для JS.
  timeline ??= arg('timeline') && existsSync(arg('timeline')) ? JSON.parse(readFileSync(arg('timeline'), 'utf8')) : {};
  const timed = id && (timeline.changed?.[id] || timeline.removed?.some((r) => r.id === id));
  if (id && parallaxById.has(id)) {
    if (init) classes = [...expand(init.cls.split(/\s+/).filter(Boolean)), ...styleToClasses(init.style)].filter((c) => !/^\[transform:/.test(c));
    setAttr(n, 'data-parallax', JSON.stringify(parallaxById.get(id)));
    parallaxCount++;
  } else
  if (timed) {
    if (init) classes = [...expand(init.cls.split(/\s+/).filter(Boolean)), ...styleToClasses(init.style)];
    keepIds.add(n);
  } else if (init && (init.cls !== orig.cls || init.style !== orig.style)) {
    const initClasses = [...expand(init.cls.split(/\s+/).filter(Boolean)), ...styleToClasses(init.style)];
    const hasTransition = [...initClasses, ...finalClasses].some((c) => /^\[(transition|animation)/.test(c));
    // Переход по умолчанию — только когда меняются инлайн opacity/transform без
    // CSS-перехода (так анимирует framer-motion). Смена класса (section-visible)
    // запускает анимацию из CSS сайта и своего перехода не требует.
    const inlineMotion = init.cls === orig.cls && /(opacity|transform|translate)/.test(init.style + orig.style);
    if (!hasTransition && inlineMotion) {
      initClasses.push('[transition:opacity_0.6s_ease-out,transform_0.6s_ease-out]');
      finalClasses.push('[transition:opacity_0.6s_ease-out,transform_0.6s_ease-out]');
      setAttr(n, 'data-reveal-transition', '');
    }
    classes = initClasses;
    // Фиксированная/липкая шапка меняется от прокрутки, а не от появления в экране.
    const pinned =
      /position:\s*(fixed|sticky)/.test(orig.style + init.style) ||
      /(^|\s)(fixed|sticky)(\s|$)/.test(orig.cls + ' ' + init.cls) ||
      hasPinnedAncestor(n);
    setAttr(n, pinned ? 'data-scrolled' : 'data-reveal', finalClasses.join(' '));
    setAttr(n, pinned ? 'data-top' : 'data-initial', initClasses.join(' '));
    finalClasses.forEach((c) => revealClasses.add(c));
    initClasses.forEach((c) => revealClasses.add(c));
    revealCount++;
  }

  // Hover из JS-обработчиков.
  const h = id && hover[id];
  if (h) {
    const group = `group/h${id}`;
    classes.push(group, ...styleToClasses(h.self ?? '', 'hover:'));
    for (const [childId, style] of Object.entries(h.children ?? {})) {
      const child = find(body, (x) => x.attrs && attr(x, 'data-i') === childId);
      if (!child) continue;
      const cur = attr(child, 'class') ?? '';
      setAttr(child, 'class', `${cur} ${styleToClasses(style, `group-hover/h${id}:`).join(' ')}`.trim());
    }
    hoverCount++;
  }

  setAttr(n, 'class', classes.length ? classes.join(' ') : null);
  setAttr(n, 'style', null);

  for (const a of ['src', 'href', 'poster']) if (attr(n, a)) setAttr(n, a, absUrl(attr(n, a)));
  if (attr(n, 'srcset')) setAttr(n, 'srcset', attr(n, 'srcset').replace(/(^|,\s*)(\/[^\s,]+)/g, (m, sep, u) => sep + absUrl(u)));

  // Картинки и иконки — для галерей.
  if (tag === 'img') {
    const card = n.parentNode?.parentNode;
    assets.images.push({ src: attr(n, 'src'), alt: attr(n, 'alt') ?? '', text: card ? textOf(card).slice(0, 200) : '' });
  }
  if (tag === 'svg' && !find(n.parentNode ?? n, (x) => x !== n && x.nodeName === 'svg' && x.parentNode === n)) {
    const label = attr(n, 'aria-label') || attr(n, 'data-lucide') || (baseCls.find((c) => c.startsWith('lucide-')) ?? '');
    const near = n.parentNode ? textOf(n.parentNode).slice(0, 120) : '';
    assets.icons.push({ name: label.replace(/^lucide-/, ''), text: near, svg: serialize({ nodeName: '#document-fragment', childNodes: [n] }) });
  }

  if (!keepIds.has(n)) n.attrs = n.attrs.filter((a) => a.name !== 'data-i');
}

// Классы-приёмники для конечных состояний: браузерная сборка Tailwind должна
// сгенерировать их заранее, иначе переход не проиграется.
if (revealClasses.size) {
  body.childNodes.push(
    parse(`<div hidden class="${[...revealClasses].join(' ')}"></div>`).childNodes[0].childNodes[1].childNodes[0]
  );
}

// ---------- сборка страницы ----------
const htmlEl = find(finalDoc, (n) => n.nodeName === 'html');
const lang = attr(htmlEl, 'lang') ?? 'en';
const title = TITLE ?? textOf(find(head, (n) => n.nodeName === 'title') ?? { childNodes: [] });
const metas = [...walk(head)]
  .filter((n) => n.nodeName === 'meta' && (attr(n, 'name') === 'description' || attr(n, 'property')?.startsWith('og:')))
  .map((n) => `<meta ${n.attrs.filter((a) => a.name !== 'data-i').map((a) => `${a.name}="${a.value.replace(/"/g, '&quot;')}"`).join(' ')} />`);
const fontLinks = [
  ...fontImports,
  ...[...walk(head)]
    .filter((n) => n.nodeName === 'link' && /fonts\.googleapis\.com/.test(attr(n, 'href') ?? ''))
    .map((n) => attr(n, 'href')),
];

const bodyAttrs = body.attrs.filter((a) => a.name !== 'data-i');
const bodyClass = bodyAttrs.find((a) => a.name === 'class')?.value ?? '';

const page = `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    ${metas.join('\n    ')}
    ${[...new Set(fontLinks)].map((h) => `<link rel="stylesheet" href="${h}" />`).join('\n    ')}
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">
@theme {
  ${themeDecls}
}
@layer base {
${baseCss.replace(IMPORT_RE, '')}
}
${topLevelCss}
@layer components {
${layeredCss}
${leftoverCss.join('\n')}
}
    </style>
  </head>
  <body class="${bodyClass}">
${body.childNodes.map((c) => serialize({ nodeName: '#document-fragment', childNodes: [c] })).join('')}
    <script src="${arg('shared', '../shared/page.js')}"></script>
    ${arg('script') ? `<script src="${arg('script')}"></script>` : ''}
  </body>
</html>
`;

writeFileSync(OUT, page);
writeFileSync(`${OUT}.assets.json`, JSON.stringify(assets, null, 2));
console.log(
  `${path.basename(path.dirname(OUT))}: параллакс ${parallaxCount}, элементов с появлением ${revealCount}, с hover ${hoverCount}, картинок ${assets.images.length}, иконок ${assets.icons.length}, классов из <style> ${classRules.size}, остаток CSS ${leftoverCss.length} правил`
);
