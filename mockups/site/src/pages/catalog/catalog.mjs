/* Страницы каталога прототипа: site/catalog/, site/catalog/<key>/, site/catalog/curtain-rods/<n>/.

   Подключается из tools/mockups/site-build.mjs: catalogPages() отдаёт страницы
   { path, title, description, body } — body с теми же плейсхолдерами, что и остальные
   исходники (<!-- @header -->, {{root}} и т. д.).

   Контент — только текущий сайт:
   - разделы, картинки, модели карнизов — apps/shtorivdom-site/src/app/model/catalog/catalog.data.ts;
   - тексты разделов — model/catalog/catalog-detail/<key>/<key>.html (разбираются при сборке);
   - цены — model/price-list.service.ts (таблица как modules/catalog-price/price-list-brand-table);
   - вопросы и этапы заказа — те же, что на главной (src/pages/index.html, блоки берутся оттуда).
   Фото моделей карнизов (catalog-N.webp) в public/ нет — извлечены из истории git (31cf071),
   квадратные фото моделей — public/catalog/curtain-rods/1/ (сопоставлены по виду). */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const APP = 'apps/shtorivdom-site/src/app/model/catalog/catalog-detail';
const SRC = 'mockups/site/src';

// ---------- данные: catalog.data.ts ----------
const SECTIONS = [
  { key: 'blackout-curtains', title: 'Шторы блэкаут', text: 'Это идеальное решение для тех, кто ценит тишину и комфорт в своем доме', image: 'image-5.jpg',
    images: [5, 4, 3, 1, 2, 6, 7, 8, 9, 10, 13] },
  { key: 'roman-blinds', title: 'Римские шторы', text: 'Из плотных и легких тканей для прямых и скошенных окон.', image: 'image-1.jpg', images: [1, 2, 3] },
  { key: 'roller-blinds', title: 'Рулонные шторы', text: 'Крепление на проем, в проем или раму окна.', image: 'image-2.jpg', images: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
  // image-10 указан в catalog.data.ts, но файла в public/ нет — пропущен.
  { key: 'linen-curtains', title: 'Льняные шторы', text: 'Для стандартных, мансардных и треугольных окон.', image: 'image-3.jpg', images: [3, 1, 2, 4, 5, 6, 7, 8, 9] },
  { key: 'pleated-blinds', title: 'Шторы плиссе', text: 'Для стандартных, мансардных и треугольных окон.', image: 'image-1.jpg', images: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { key: 'curtain-rods', title: 'Карнизы для штор', text: 'Декоративные и профильные.', image: 'image-1.jpg', images: [4, 5, 6, 7, 8, 9, 10] },
  { key: 'blinds', title: 'Жалюзи', text: 'Стильные, практичные.', image: 'image-1.jpg', images: [10, 9, 1, 3, 4, 5, 6, 7, 8] },
];

const MODELS = [
  'Карниз 0-25025-22', 'Карниз CASTLE messing matt', 'Карниз AIDA anthrazit-nickel matt', 'Карниз AIDA anthrazit-messing matt',
  'Карниз PLENUM венге', 'Карниз DAVOS белый', 'Карниз CAPRI орех', 'Карниз CANNES бук', 'Карниз JAZZ nickel matt',
].map((title, i) => ({ key: String(i + 1), title }));

// ---------- цены: price-list.service.ts ----------
const U = { lm: 'м.пог.', m2: 'м²', pcs: 'шт.' };
const PRICES = {
  'blackout-curtains': [['Блэкаут однотонный', 'Турция', 2.8, 3, 2500, U.lm], ['Блэкаут с фактурой льна', 'Турция', 2.8, 3, 3200, U.lm], ['Блэкаут жаккард', 'Германия', 3, 5, [4500, 7000], U.lm]],
  'roman-blinds': [['Лёгкая ткань', 'Турция', 2.8, 3, 4500, U.m2], ['Плотная ткань / блэкаут', 'Турция', 2.8, 3, 5500, U.m2], ['Лён премиум', 'Италия', 3, 5, [8000, 12000], U.m2]],
  'roller-blinds': [['Мини, ткань стандарт', 'Россия', [0.3, 1.6], 2, 2200, U.m2], ['Кассетные UNI', 'Россия', [0.3, 1.8], 3, 3500, U.m2], ['День-ночь (зебра)', 'Корея', [0.3, 2.5], 3, 4200, U.m2]],
  'linen-curtains': [['Лён с хлопком', 'Турция', 2.8, 3, 2800, U.lm], ['Натуральный лён', 'Беларусь', 2.6, 3, 4000, U.lm], ['Итальянский лён', 'Италия', 3, 5, [6500, 9500], U.lm]],
  'pleated-blinds': [['Плиссе стандарт', 'Россия', [0.3, 1.8], 2, 3500, U.m2], ['Плиссе блэкаут', 'Германия', [0.3, 1.8], 3, 5000, U.m2], ['Мансардные плиссе', 'Германия', [0.3, 1.5], 3, 7500, U.m2]],
  'curtain-rods': [['Профильный алюминиевый', 'Россия', undefined, 3, 900, U.lm], ['Декоративный металлический', 'Германия', undefined, 5, [2500, 6000], U.lm], ['Электрокарниз', 'Германия', undefined, 2, 18000, U.pcs]],
  blinds: [['Горизонтальные алюминиевые', 'Россия', undefined, 2, 1500, U.m2], ['Вертикальные тканевые', 'Россия', undefined, 2, 1800, U.m2], ['Деревянные', 'Китай', undefined, 3, 6500, U.m2]],
};

const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const num = (n) => String(n).replace('.', ',');
const range = (v, suffix, single, fmt = money) => v === undefined ? '—'
  : Array.isArray(v) ? `от ${fmt(v[0])} до ${fmt(v[1])} ${suffix}` : `${single}${fmt(v)} ${suffix}`;
const years = (n) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'год' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'года' : 'лет'}`;
const minPrice = (key) => PRICES[key].reduce((m, r) => { const v = Math.min(...[].concat(r[4])); return v < m[0] ? [v, r[5]] : m; }, [Infinity, '']);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (key, file) => `{{root}}assets/img/catalog/${key}/${file}`;

// ---------- разбор catalog-detail/<key>.html ----------
const norm = (s) => s.replace(/\s+/g, ' ').trim()
  // «подъеме.Для ткани» — склеенные предложения на текущем сайте
  .replace(/([а-яё»)])\.([А-ЯЁ])/g, '$1. $2');

// Дерево списка: <ol><li>текст <ol>…</ol> <blockquote>…</blockquote></li></ol>
function parseList(html) {
  const root = { items: [] };
  const stack = [root];
  let li = null;
  const liStack = [];
  for (const m of html.matchAll(/<(\/?)(ol|li|blockquote)[^>]*>|([^<]+)/g)) {
    const [, close, tag, text] = m;
    if (text !== undefined) {
      if (li && text.trim()) li[li.inQuote ? 'quote' : 'text'] = ((li[li.inQuote ? 'quote' : 'text'] ?? '') + ' ' + text).trim();
      continue;
    }
    if (tag === 'ol' && !close) { const list = { items: [] }; if (li) li.sub = list; else root.sub ??= list; stack.push(list); liStack.push(li); li = null; }
    else if (tag === 'ol') { stack.pop(); li = liStack.pop(); }
    else if (tag === 'li' && !close) { li = { text: '' }; stack.at(-1).items.push(li); }
    else if (tag === 'li') li = null;
    else if (tag === 'blockquote' && li) li.inQuote = !close;
  }
  const clean = (list) => list.items.map((i) => ({ text: norm(i.text), quote: i.quote && norm(i.quote), sub: i.sub && clean(i.sub) }));
  return root.sub ? clean(root.sub) : [];
}

function parseDetail(key) {
  const html = readFileSync(path.join(APP, key, `${key}.html`), 'utf8');
  const intro = norm(html.match(/<p[^>]*>([\s\S]*?)<\/p>/)[1]);
  const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/g)].map(([, s]) => {
    const h = s.match(/<h4([^>]*)>([\s\S]*?)<\/h4>/);
    // У части заголовков текст по ошибке попал в атрибуты: <h4 class="…" Способ монтажа></h4>
    const title = norm(h[2]) || norm(h[1].replace(/class="[^"]*"/, ''));
    const note = s.match(/<\/div>\s*<p>([\s\S]*?)<\/p>/)?.[1];
    const table = s.match(/<table[\s\S]*?<\/table>/)?.[0];
    const rows = table && [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, r]) => [...r.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, c]) => norm(c)));
    const ol = s.match(/<ol[\s\S]*<\/ol>/)?.[0];
    return { title, note: note && norm(note), rows, items: ol ? parseList(ol) : [] };
  });
  // Шторы блэкаут: на текущем сайте подзаголовки пунктов съехали на строку выше
  // («Основные преимуществаПолное затемнение.», «…на крючках.Римские шторы.») — собираем обратно.
  if (key === 'blackout-curtains') {
    const [adv, kinds] = sections;
    adv.title = 'Основные преимущества';
    adv.items = [
      'Полное затемнение. Идеально для спален, детских комнат и домашних кинотеатров.',
      'Качественный сон. Помогают вырабатывать мелатонин даже в дневное время или белые ночи.',
      'Терморегуляция. Защищают комнату от нагревания на солнце и от сквозняков.',
      'Шумоизоляция. Снижают уровень гула с улицы благодаря многослойности.',
    ].map((text) => ({ text }));
    kinds.items = [
      'Классические портьеры. Традиционные тканевые занавески на люверсах, ленте или крючках.',
      'Римские шторы. Лаконичные тканевые полотна, собирающиеся вверх ровными складками.',
      'Рулонные шторы (ролль-шторы). Компактные валы с тканью, которые крепятся прямо на раму окна.',
    ].map((text) => ({ text }));
  }
  return { intro, sections };
}

// ---------- разметка ----------
const read = (p) => readFileSync(path.join(SRC, p), 'utf8');
const arrow = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
const chevron = (d) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="${d}"/></svg>`;

const crumbs = (list) => `<nav class="rise mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-cream/60" aria-label="Хлебные крошки">${list
  .map(([t, href]) => (href ? `<a href="${href}" class="transition-colors hover:text-gold">${t}</a>` : `<span class="text-cream/90" aria-current="page">${t}</span>`))
  .join('<span class="text-gold" aria-hidden="true">/</span>')}</nav>`;

const eyebrow = (text, center = true, light = false) => `<div class="mb-5 flex items-center ${center ? 'justify-center' : ''} gap-4"><span class="cat-line-l h-px w-[60px]"></span><span class="text-[12px] tracking-[.35em] ${light ? 'text-cream/70' : 'text-gold'} uppercase">${text}</span>${center ? '<span class="cat-line-r h-px w-[60px]"></span>' : ''}</div>`;

// Пункт списка: «Термин: описание» / «Термин. описание» — термин жирным.
const itemHtml = (it) => {
  const m = it.text.match(/^([^:.]{2,48}?)([:.])\s+(.+)$/);
  const text = m ? `<strong class="font-bold text-navy">${esc(m[1])}${m[2] === '.' ? '.' : ':'}</strong> ${esc(m[3])}` : `<strong class="font-bold text-navy">${esc(it.text)}</strong>`;
  const plain = !m && !it.sub ? esc(it.text) : text;
  return `<li class="cat-li">${plain}${it.quote ? `<p class="mt-3 border-l-2 border-gold bg-gold-soft/50 px-4 py-3 text-[15px] text-navy">${esc(it.quote)}</p>` : ''}${it.sub ? `<ul class="mt-3 space-y-3">${it.sub.map(itemHtml).join('')}</ul>` : ''}</li>`;
};

const compareTable = (rows) => {
  const [head, ...body] = rows;
  return `
        <div class="hidden md:block"><table class="cat-table"><thead><tr>${head.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${esc(c)}</td>` : `<td class="font-bold">${esc(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>
        <div class="grid gap-3 md:hidden">${body.map((r) => `<dl class="border border-navy/10 bg-white px-4 py-3"><dt class="mb-2 font-serif text-[18px] font-bold">${esc(r[0])}</dt>${r.slice(1).map((c, i) => `<dd class="flex flex-col py-1 text-[14px]"><span class="text-[11px] font-bold tracking-[.14em] text-gold uppercase">${esc(head[i + 1])}</span>${esc(c)}</dd>`).join('')}</dl>`).join('')}</div>`;
};

const contentBlocks = (detail) => detail.sections.map((s, i) => `
      <article class="reveal reveal-soft border-t border-navy/10 py-9 first:border-t-0 first:pt-0 sm:py-11" style="--d:.05s">
        <div class="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6">
          <span class="font-serif text-[30px] leading-none text-gold sm:text-[36px]">${String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3 class="mb-5 text-[24px] leading-tight sm:text-[28px]">${esc(s.title)}</h3>
            ${s.note ? `<p class="mb-4 text-[16px] leading-relaxed font-light text-slate">${esc(s.note)}</p>` : ''}
            ${s.items.length ? `<ul class="space-y-3.5">${s.items.map(itemHtml).join('')}</ul>` : ''}
            ${s.rows ? compareTable(s.rows) : ''}
          </div>
        </div>
      </article>`).join('');

// Таблица цен — price-list-brand-table: 5 колонок на широком экране, на телефоне карточки.
const priceTable = (key, title) => {
  const rows = PRICES[key];
  return `
<section id="prices" class="scroll-mt-20 bg-cream py-16 sm:py-24">
  <div class="wrap">
    <div class="reveal mb-10 text-center sm:mb-12">
      <p class="eyebrow">Стоимость</p>
      <h2 class="h2">Цены: <span class="text-gold italic">${title}</span></h2>
      <div class="divider"><i></i></div>
      <p class="text-[14px] text-slate/70">*Цены ориентировочные. Точная стоимость — после бесплатного замера и выбора ткани.</p>
    </div>
    <div class="reveal hidden overflow-x-auto lg:block" data-price-table>
      <table class="cat-table cat-price">
        <thead><tr><th>Материал / модель</th><th>Производство</th><th>Ширина, м</th><th>Гарантия</th><th class="text-right">Цена <span class="block text-[11px] font-normal tracking-normal normal-case opacity-70">с пошивом и установкой</span></th></tr></thead>
        <tbody>${rows.map(([name, country, width, warranty, price, unit]) => `<tr><td class="font-serif text-[18px] font-bold">${name}</td><td>${country}</td><td>${range(width, 'м', 'до ', num)}</td><td>${years(warranty)}</td><td class="text-right text-[17px] font-bold whitespace-nowrap">${range(price, '₽', 'от ')} <span class="font-normal text-slate/70">/ ${unit}</span></td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="grid gap-4 lg:hidden" data-price-cards>${rows.map(([name, country, width, warranty, price, unit], i) => `
      <div class="reveal border border-navy/10 bg-white px-5 py-5" style="--d:${i * 0.08}s">
        <p class="mb-3 font-serif text-[20px] leading-tight font-bold">${name}</p>
        <p class="mb-4 text-[20px] font-bold text-navy">${range(price, '₽', 'от ')} <span class="text-[14px] font-normal text-slate/70">/ ${unit}</span></p>
        <dl class="grid grid-cols-3 gap-2 border-t border-navy/10 pt-3 text-[13px]">
          <div><dt class="text-[10px] font-bold tracking-[.14em] text-gold uppercase">Страна</dt><dd>${country}</dd></div>
          <div><dt class="text-[10px] font-bold tracking-[.14em] text-gold uppercase">Ширина</dt><dd>${range(width, 'м', 'до ', num)}</dd></div>
          <div><dt class="text-[10px] font-bold tracking-[.14em] text-gold uppercase">Гарантия</dt><dd>${years(warranty)}</dd></div>
        </dl>
      </div>`).join('')}
    </div>
    <div class="reveal mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
      <a href="#lead" class="btn-gold group max-sm:w-full">Рассчитать стоимость ${arrow}</a>
      <a href="{{root}}price/" class="inline-flex items-center gap-2 py-3 text-[13px] font-bold tracking-[.1em] text-navy uppercase transition-colors hover:text-gold">Все цены →</a>
    </div>
  </div>
</section>`;
};

// Галерея раздела — swiper-full-images текущего сайта: лента фото со стрелками, фото открывается в лайтбоксе.
const gallery = (s) => `
<section class="bg-white py-14 sm:py-20" aria-label="Фото: ${s.title}">
  <div class="wrap">
    <div class="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>${eyebrow('Фото работ', false)}<h2 class="text-[clamp(28px,4vw,40px)] leading-tight">${s.title} <em class="text-gold">в интерьере</em></h2></div>
      <div class="flex gap-2">
        <button type="button" class="cat-arrow" aria-label="Предыдущие фото" data-strip-prev>${chevron('m15 18-6-6 6-6')}</button>
        <button type="button" class="cat-arrow" aria-label="Следующие фото" data-strip-next>${chevron('m9 18 6-6-6-6')}</button>
      </div>
    </div>
    <div class="reveal cat-strip" data-strip data-gallery>
      ${s.images.map((n, i) => `<button type="button" class="cat-shot group" data-gallery-item data-src="${img(s.key, `image-${n}.jpg`)}" data-alt="${s.title} — фото ${i + 1}" aria-label="Открыть фото ${i + 1} из ${s.images.length}"><img src="${img(s.key, `image-${n}.jpg`)}" alt="${s.title} — фото ${i + 1}" loading="lazy" class="size-full object-cover" /><span class="cat-zoom" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg></span></button>`).join('\n      ')}
    </div>
  </div>
</section>`;

const modelsGrid = () => `
<section id="models" class="bg-sand py-16 sm:py-24">
  <div class="wrap">
    <div class="reveal mb-12 text-center">
      ${eyebrow('Модели')}
      <h2 class="h2">Карнизы <span class="text-gold italic">в наличии</span></h2>
      <div class="divider"><i></i></div>
    </div>
    <div class="grid grid-cols-1 gap-6 min-[520px]:grid-cols-2 lg:grid-cols-3" data-models>
      ${MODELS.map((m, i) => `<a href="${m.key}/" class="reveal fade-up group block" style="--d:${(i % 3) * 0.1}s" data-model-card>
        <div class="cat-card h-full overflow-hidden rounded-[2px] border border-navy/10 bg-white">
          <div class="relative flex h-[190px] items-center justify-center overflow-hidden bg-white px-6"><img src="{{root}}assets/img/catalog/curtain-rods/models/catalog-${m.key}.webp" alt="${m.title}" loading="lazy" class="cat-zoom-img max-h-[120px] w-full object-contain" /></div>
          <div class="border-t border-navy/10 px-6 pt-5 pb-6">
            <p class="mb-2 text-[11px] tracking-[.25em] text-gold uppercase">Модель ${m.key}</p>
            <h3 class="mb-4 text-[20px] leading-snug">${m.title}</h3>
            <div class="cat-gold-line mb-4"></div>
            <span class="inline-flex items-center gap-2 text-[12px] font-bold tracking-[.2em] text-navy/70 uppercase transition-colors group-hover:text-gold">Подробнее ${arrow}</span>
          </div>
        </div>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>`;

// Блоки главной (не дублируем тексты): «Как сделать заказ?» и «Вопросы и ответы».
const index = read('pages/index.html');
const stepsHtml = (() => {
  const start = index.indexOf('<div class="reveal reveal-soft mt-20 mb-14 text-center sm:mt-28">');
  const end = index.indexOf('</ol>', start);
  if (start < 0 || end < 0) throw new Error('catalog.mjs: не найден блок «Как сделать заказ?» в src/pages/index.html');
  return index.slice(start, end + '</ol>\n    </div>'.length).replace('mt-20 mb-14', 'mb-14').replace('sm:mt-28', '');
})();
const faqHtml = (() => {
  const m = index.match(/<section id="faq"[\s\S]*?<\/section>/);
  if (!m) throw new Error('catalog.mjs: не найден блок FAQ в src/pages/index.html');
  return m[0];
})();

const styles = read('partials/catalog-styles.html');
const tail = `
<!-- @lead-form -->
<!-- @footer -->
<script src="{{root}}assets/catalog.js" defer></script>`;

// ---------- страница: список разделов (landing-5 «The Signature Collections») ----------
const listPage = () => `${styles}
<!-- @header -->
<main>
<section class="cat-dark relative overflow-hidden bg-navy pt-[120px] pb-20 text-cream sm:pt-[150px] sm:pb-28">
  <div class="wrap relative">
    ${crumbs([['Главная', '{{home}}'], ['Каталог']])}
    <div class="text-center">
      <div class="rise" style="--d:.05s">${eyebrow('Наше ателье')}</div>
      <h1 class="rise mb-5 text-[clamp(36px,6vw,60px)] leading-[1.15] font-bold" style="--d:.1s">Каталог <em class="text-gold">Штор</em></h1>
      <p class="rise mx-auto max-w-[520px] text-[16px] leading-[1.8] text-cream/60" style="--d:.2s">Вся продукция изготавливается по индивидуальным размерам из качественных материалов.</p>
    </div>
    <div class="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3" data-catalog-list>
      ${SECTIONS.map((s, i) => {
        const [min, unit] = minPrice(s.key);
        return `<a href="${s.key}/" class="reveal fade-up group block" style="--d:${(i % 3) * 0.1}s" data-catalog-card>
        <div class="cat-card cat-card-dark h-full overflow-hidden rounded-[2px]">
          <div class="relative h-[240px] overflow-hidden bg-navy-deep sm:h-[280px]">
            <img src="${img(s.key, s.image)}" alt="${s.title}" loading="lazy" class="cat-zoom-img block size-full object-cover" />
            <div class="absolute inset-0 bg-[linear-gradient(to_top,rgb(8_22_41/.8)_0%,transparent_50%)]"></div>
            ${s.key === 'curtain-rods' ? `<span class="cat-pill absolute top-4 right-4">${MODELS.length} моделей</span>` : `<span class="cat-pill absolute top-4 right-4">${s.images.length} фото</span>`}
          </div>
          <div class="px-6 pt-6 pb-7 sm:px-7">
            <p class="mb-2 text-[11px] tracking-[.25em] text-gold uppercase opacity-80">Раздел ${String(i + 1).padStart(2, '0')}</p>
            <h2 class="mb-2.5 text-[24px] font-bold text-cream">${s.title}</h2>
            <p class="mb-5 text-[15px] leading-[1.7] text-cream/55">${s.text}</p>
            <div class="cat-gold-line mb-5"></div>
            <div class="flex flex-wrap items-center justify-between gap-3">
              <span class="text-[14px] tracking-[.04em] text-gold">от ${money(min)} ₽ / ${unit}</span>
              <span class="inline-flex items-center gap-1.5 text-[11px] tracking-[.2em] text-cream/60 uppercase transition-colors group-hover:text-gold">Подробнее ${arrow}</span>
            </div>
          </div>
        </div>
      </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>
<section class="bg-cream py-14 sm:py-16">
  <div class="wrap reveal flex flex-col items-start gap-6 border border-gold/30 bg-white px-6 py-8 sm:flex-row sm:items-center sm:px-10">
    <p class="flex-1 font-serif text-[22px] leading-snug sm:text-[26px]">Закажите выезд дизайнера, и он поможет вам определиться в этом прекрасном многообразии.</p>
    <a href="#lead" class="btn-gold group max-sm:w-full">Пригласить дизайнера ${arrow}</a>
  </div>
</section>
</main>${tail}`;

// ---------- страница раздела ----------
const sectionPage = (s) => {
  const detail = parseDetail(s.key);
  const [min, unit] = minPrice(s.key);
  return `${styles}
<!-- @header -->
<main>
<section class="relative overflow-hidden bg-navy pt-[110px] pb-14 text-cream sm:pt-[130px] lg:pb-20">
  <div class="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
    <div>
      ${crumbs([['Главная', '{{home}}'], ['Каталог', '{{root}}catalog/'], [s.title]])}
      <div class="rise" style="--d:.05s">${eyebrow('Каталог', false, true)}</div>
      <h1 class="rise mb-5 text-[clamp(36px,6vw,60px)] leading-[1.1]" style="--d:.1s">${s.title}</h1>
      <p class="rise mb-8 max-w-[520px] text-[18px] leading-relaxed text-cream/75" style="--d:.2s">${s.text}</p>
      <div class="rise mb-9 flex items-baseline gap-3" style="--d:.25s"><span class="text-[13px] tracking-[.2em] text-cream/50 uppercase">Цена</span><span class="font-serif text-[30px] text-gold">от ${money(min)} ₽</span><span class="text-cream/60">/ ${unit}</span></div>
      <div class="rise flex flex-wrap gap-4" style="--d:.3s">
        <a href="#lead" class="btn-gold group max-sm:w-full">Пригласить дизайнера ${arrow}</a>
        <a href="#prices" class="btn-line max-sm:w-full">Смотреть цены</a>
      </div>
    </div>
    <div class="rise relative" style="--d:.2s">
      <div class="absolute -right-3 -bottom-3 hidden h-full w-full border border-gold/40 sm:block"></div>
      <button type="button" class="group relative block aspect-[4/3] w-full overflow-hidden bg-navy-deep" data-gallery data-gallery-item data-src="${img(s.key, s.image)}" data-alt="${s.title}" aria-label="Открыть фото: ${s.title}">
        <img src="${img(s.key, s.image)}" alt="${s.title}" fetchpriority="high" class="cat-zoom-img size-full object-cover" />
      </button>
    </div>
  </div>
</section>

<section class="bg-cream py-16 sm:py-24">
  <div class="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
    <div>
      <p class="reveal mb-12 border-l-2 border-gold pl-5 font-serif text-[20px] leading-[1.6] text-navy sm:pl-7 sm:text-[23px]">${esc(detail.intro)}</p>
      <div data-detail>${contentBlocks(detail)}
      </div>
    </div>
    <aside class="lg:sticky lg:top-24 lg:self-start">
      <div class="reveal bg-navy px-6 py-8 text-cream sm:px-8">
        <p class="mb-3 text-[12px] tracking-[.25em] text-gold uppercase">Бесплатно</p>
        <p class="mb-6 font-serif text-[22px] leading-snug">Закажите выезд дизайнера, и он поможет вам определиться в этом прекрасном многообразии.</p>
        <a href="#lead" class="btn-gold group !flex w-full">Пригласить дизайнера ${arrow}</a>
        <a href="tel:+79255946117" class="mt-5 block text-center text-[16px] font-bold transition-colors hover:text-gold">+7 (925) 594-61-17</a>
      </div>
      <nav class="reveal mt-6 hidden border border-navy/10 bg-white px-6 py-5 lg:block" aria-label="Другие разделы">
        <p class="mb-3 text-[12px] font-bold tracking-[.2em] text-gold uppercase">Другие разделы</p>
        ${SECTIONS.filter((o) => o.key !== s.key).map((o) => `<a href="{{root}}catalog/${o.key}/" class="flex items-center justify-between border-b border-navy/5 py-2.5 text-[15px] transition-colors last:border-0 hover:text-gold">${o.title}<span class="text-gold">→</span></a>`).join('\n        ')}
      </nav>
    </aside>
  </div>
</section>
${gallery(s)}
${s.key === 'curtain-rods' ? modelsGrid() : ''}
${priceTable(s.key, s.title)}
<section class="bg-white py-20 sm:py-28">
  <div class="wrap">
    ${stepsHtml}
  </div>
</section>
${faqHtml}
</main>${tail}`;
};

// ---------- страница модели карниза ----------
const modelPage = (m) => {
  const shots = [
    [`{{root}}assets/img/catalog/curtain-rods/models/model-${m.key}.jpg`, `${m.title} — фото`],
    [`{{root}}assets/img/catalog/curtain-rods/models/catalog-${m.key}.webp`, `${m.title} — вид целиком`],
  ];
  const others = MODELS.filter((o) => o.key !== m.key);
  return `${styles}
<!-- @header -->
<main>
<section class="bg-navy pt-[110px] pb-10 text-cream sm:pt-[130px] sm:pb-12">
  <div class="wrap">
    ${crumbs([['Главная', '{{home}}'], ['Каталог', '{{root}}catalog/'], ['Карнизы для штор', '../'], [m.title]])}
  </div>
</section>
<section class="bg-cream py-12 sm:py-16">
  <div class="wrap grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
    <div class="rise" data-gallery data-model-gallery>
      <button type="button" class="group relative block aspect-square w-full overflow-hidden border border-navy/10 bg-white" data-gallery-item data-src="${shots[0][0]}" data-alt="${shots[0][1]}" aria-label="Открыть фото 1 из ${shots.length}">
        <img src="${shots[0][0]}" alt="${shots[0][1]}" fetchpriority="high" class="cat-zoom-img size-full object-contain" />
        <span class="cat-zoom" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg></span>
      </button>
      <button type="button" class="group mt-4 flex h-[110px] w-full items-center overflow-hidden border border-navy/10 bg-white px-5 sm:h-[130px]" data-gallery-item data-src="${shots[1][0]}" data-alt="${shots[1][1]}" aria-label="Открыть фото 2 из ${shots.length}">
        <img src="${shots[1][0]}" alt="${shots[1][1]}" loading="lazy" class="cat-zoom-img max-h-full w-full object-contain" />
      </button>
    </div>
    <div>
      <div class="rise" style="--d:.05s">${eyebrow('Карнизы для штор', false)}</div>
      <h1 class="rise mb-4 text-[clamp(32px,4.5vw,48px)] leading-[1.12]" style="--d:.1s">${m.title}</h1>
      <p class="rise mb-8 text-[17px] leading-relaxed font-light text-slate" style="--d:.15s">Декоративные и профильные.</p>
      <div class="rise mb-8 border border-navy/10 bg-white px-6 py-6" style="--d:.2s">
        <p class="mb-4 text-[12px] font-bold tracking-[.2em] text-gold uppercase">Характеристики</p>
        <p class="border border-dashed border-gold px-4 py-3 text-[14px] text-slate">Заглушка: на текущем сайте у модели есть только название и фото — характеристики (материал, диаметр, длина, кронштейны) ждут данных.</p>
      </div>
      <div class="rise mb-8 border border-navy/10 bg-white px-6 py-6" style="--d:.25s">
        <p class="mb-1 text-[12px] font-bold tracking-[.2em] text-gold uppercase">Цена</p>
        <p class="mb-4 text-[13px] text-slate/70">Цены раздела «Карнизы для штор» с установкой; цены отдельной модели на текущем сайте нет.</p>
        <ul>${PRICES['curtain-rods'].map(([name, , , , price, unit]) => `<li class="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-navy/5 py-2.5 text-[15px] last:border-0"><span>${name}</span><span class="font-bold whitespace-nowrap">${range(price, '₽', 'от ')} / ${unit}</span></li>`).join('')}</ul>
      </div>
      <div class="rise flex flex-wrap gap-4" style="--d:.3s">
        <a href="#lead" class="btn-gold group max-sm:w-full" data-order="${m.title}">Заказать карниз ${arrow}</a>
        <a href="../#models" class="inline-flex items-center gap-2 px-2 py-3.5 text-[13px] font-bold tracking-[.1em] text-navy uppercase transition-colors hover:text-gold max-sm:w-full max-sm:justify-center">← Все модели</a>
      </div>
    </div>
  </div>
</section>
<section class="bg-sand py-14 sm:py-20" aria-label="Другие модели">
  <div class="wrap">
    <div class="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
      <h2 class="text-[clamp(26px,3.5vw,36px)]">Другие <em class="text-gold">модели</em></h2>
      <div class="flex gap-2">
        <button type="button" class="cat-arrow" aria-label="Предыдущие модели" data-strip-prev>${chevron('m15 18-6-6 6-6')}</button>
        <button type="button" class="cat-arrow" aria-label="Следующие модели" data-strip-next>${chevron('m9 18 6-6-6-6')}</button>
      </div>
    </div>
    <div class="reveal cat-strip cat-strip-models" data-strip>
      ${others.map((o) => `<a href="../${o.key}/" class="cat-card group flex flex-col border border-navy/10 bg-white"><span class="flex h-[140px] items-center overflow-hidden px-5"><img src="{{root}}assets/img/catalog/curtain-rods/models/catalog-${o.key}.webp" alt="${o.title}" loading="lazy" class="cat-zoom-img max-h-[90px] w-full object-contain" /></span><span class="border-t border-navy/10 px-5 py-4 font-serif text-[17px] leading-snug transition-colors group-hover:text-gold">${o.title}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>
</main>${tail}`;
};

export function catalogPages() {
  return [
    { path: 'catalog/', title: 'Каталог штор | Shtorivdom', description: 'Каталог Shtorivdom: шторы блэкаут, римские, рулонные, льняные шторы, плиссе, жалюзи и карнизы. Вся продукция изготавливается по индивидуальным размерам.', body: listPage() },
    ...SECTIONS.map((s) => ({
      path: `catalog/${s.key}/`,
      // SEO — как в catalog-detail-page.ts текущего сайта
      title: `${s.title} на заказ в Москве | Shtorivdom`,
      description: `${s.title} на заказ: ${s.text} Бесплатный выезд дизайнера с образцами.`,
      body: sectionPage(s),
    })),
    ...MODELS.map((m) => ({
      path: `catalog/curtain-rods/${m.key}/`,
      title: `${m.title} | Shtorivdom`,
      description: `${m.title} — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.`,
      body: modelPage(m),
    })),
  ];
}
