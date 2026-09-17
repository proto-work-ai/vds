/* Сборщик статичного прототипа сайта Shtorivdom (mockups/site/).

   node tools/mockups/site-build.mjs

   Исходники — mockups/site/src/:
   - partials/theme.css   — токены Tailwind 4 (@theme) и общие компоненты; собирается вместе
                            с классами страниц в assets/site.css (tailwindcss compile + oxide Scanner);
   - partials/header.html, footer.html, lead-form.html — шапка, подвал, форма заявки;
   - pages/index.html     — главная;
   - pages/_stub.html     — заготовка остальных страниц (шапка + заголовок + форма + подвал).

   Плейсхолдеры в исходниках:
   <!-- @header --> <!-- @footer --> <!-- @lead-form -->  — partials;
   <!-- @logo-1 --> <!-- @logo-2 --> <!-- @logo-3 -->     — инлайн SVG из assets/logo (fill=currentColor);
   <!-- @catalog-links --> <!-- @catalog-cards --> <!-- @price-rows --> — из данных каталога ниже;
   {{root}} — относительный путь до mockups/site/ ("", "../", "../../"), {{home}} — ссылка на главную,
   {{title}} {{h1}} {{lead}} — поля страницы.

   Пишет mockups/site/index.html и mockups/site/<путь>/index.html. Все ссылки относительные.
   Данные каталога и цен — копия apps/shtorivdom-site/src/app/model/catalog/catalog.data.ts
   и model/price-list.service.ts (минимальные цены — «от»). */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { compile } from 'tailwindcss';
import { Scanner } from '@tailwindcss/oxide';

const SITE = 'mockups/site';
const SRC = path.join(SITE, 'src');
const read = (p) => readFileSync(path.join(SRC, p), 'utf8');

// catalog.data.ts + price-list.service.ts
const CATALOG = [
  { key: 'blackout-curtains', title: 'Шторы блэкаут', text: 'Это идеальное решение для тех, кто ценит тишину и комфорт в своем доме', image: 'image-5.jpg',
    prices: [['Блэкаут однотонный', 2500, 'м.пог.'], ['Блэкаут с фактурой льна', 3200, 'м.пог.'], ['Блэкаут жаккард', [4500, 7000], 'м.пог.']] },
  { key: 'roman-blinds', title: 'Римские шторы', text: 'Из плотных и легких тканей для прямых и скошенных окон.', image: 'image-1.jpg',
    prices: [['Лёгкая ткань', 4500, 'м²'], ['Плотная ткань / блэкаут', 5500, 'м²'], ['Лён премиум', [8000, 12000], 'м²']] },
  { key: 'roller-blinds', title: 'Рулонные шторы', text: 'Крепление на проем, в проем или раму окна.', image: 'image-2.jpg',
    prices: [['Мини, ткань стандарт', 2200, 'м²'], ['Кассетные UNI', 3500, 'м²'], ['День-ночь (зебра)', 4200, 'м²']] },
  { key: 'linen-curtains', title: 'Льняные шторы', text: 'Для стандартных, мансардных и треугольных окон.', image: 'image-3.jpg',
    prices: [['Лён с хлопком', 2800, 'м.пог.'], ['Натуральный лён', 4000, 'м.пог.'], ['Итальянский лён', [6500, 9500], 'м.пог.']] },
  { key: 'pleated-blinds', title: 'Шторы плиссе', text: 'Для стандартных, мансардных и треугольных окон.', image: 'image-1.jpg',
    prices: [['Плиссе стандарт', 3500, 'м²'], ['Плиссе блэкаут', 5000, 'м²'], ['Мансардные плиссе', 7500, 'м²']] },
  { key: 'curtain-rods', title: 'Карнизы для штор', text: 'Декоративные и профильные.', image: 'image-1.jpg',
    prices: [['Профильный алюминиевый', 900, 'м.пог.'], ['Декоративный металлический', [2500, 6000], 'м.пог.'], ['Электрокарниз', 18000, 'шт.']] },
  { key: 'blinds', title: 'Жалюзи', text: 'Стильные, практичные.', image: 'image-1.jpg',
    prices: [['Горизонтальные алюминиевые', 1500, 'м²'], ['Вертикальные тканевые', 1800, 'м²'], ['Деревянные', 6500, 'м²']] },
];

const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const priceText = (p) => (Array.isArray(p) ? `${money(p[0])}–${money(p[1])}` : money(p));
const minOf = (item) => item.prices.reduce((m, r) => (Math.min(...[].concat(r[1])) < m[0] ? [Math.min(...[].concat(r[1])), r[2]] : m), [Infinity, '']);

// Страницы: путь, <title>, description, заголовок. SEO — из app.routes.ts, где есть.
const PAGES = [
  { path: '', src: 'pages/index.html', title: 'Шторы на заказ в Москве — пошив и дизайн штор | Shtorivdom',
    description: 'Пошив штор на заказ в Москве и Подмосковье: римские, рулонные, льняные шторы, блэкаут, плиссе, жалюзи и карнизы. Бесплатный выезд дизайнера с образцами тканей.' },
  { path: 'catalog/', h1: 'Каталог штор', lead: 'Вся продукция изготавливается по индивидуальным размерам из качественных материалов.', title: 'Каталог штор | Shtorivdom', extra: 'catalog' },
  ...CATALOG.map((c) => ({ path: `catalog/${c.key}/`, h1: c.title, lead: c.text, title: `${c.title} на заказ в Москве | Shtorivdom`,
    description: `${c.title} на заказ: ${c.text} Бесплатный выезд дизайнера с образцами.`, crumb: ['Каталог', 'catalog/'] })),
  { path: 'price/', h1: 'Цены / стоимость', title: 'Цены | Shtorivdom', extra: 'prices' },
  { path: 'services/', h1: 'Услуги', title: 'Услуги | Shtorivdom' },
  { path: 'about/', h1: 'О нас', lead: 'Более 15 лет мы создаем уникальные текстильные интерьеры', title: 'О салоне штор Shtorivdom — более 15 лет пошива штор',
    description: 'Дизайн-студия Shtorivdom: собственный швейный цех, 3000+ тканей и карнизов, более 10 000 реализованных проектов штор в Москве и области.' },
  { path: 'partner/', h1: 'Стать партнером', title: 'Сотрудничество с салоном штор Shtorivdom',
    description: 'Приглашаем к сотрудничеству дизайнеров интерьера, архитекторов и строительные компании. Выгодные условия для партнёров.' },
  { path: 'contact/', h1: 'Контакты', title: 'Контакты салона штор Shtorivdom — адрес, телефон',
    description: 'Салон штор Shtorivdom: Троицк, Кварцевая улица, 3, корп. 2. Работаем без выходных с 10:00 до 20:00. Телефон +7 (925) 594-61-17.' },
  { path: 'privacy-policy/', h1: 'Политика конфиденциальности', title: 'Shtorivdom | Политика конфиденциальности',
    description: 'Политика конфиденциальности, соглашение на обработку информации на сайте' },
  { path: 'soglasie-na-obrabotku-personalnyh-dannyh/', h1: 'Согласие на обработку персональных данных', title: 'Shtorivdom | Согласие на обработку персональных данных',
    description: 'Согласие на обработку персональных данных. Перечень персональных данных, цели обработки, срок действия согласия и порядок отзыва.' },
];

// Каталог: разделы, страницы разделов и моделей карнизов — src/pages/catalog/catalog.mjs (готовый body).
// Страница с тем же путём заменяет заготовку, новые (модели карнизов) добавляются в конец.
for (const cp of (await import('../../mockups/site/src/pages/catalog/catalog.mjs')).catalogPages()) {
  const i = PAGES.findIndex((p) => p.path === cp.path);
  i >= 0 ? (PAGES[i] = cp) : PAGES.push(cp);
}

const logo = (n) => readFileSync(path.join(SITE, 'assets/logo', `logo-${n}.svg`), 'utf8')
  .replace(/<\?xml[^>]*>/, '')
  .replace(/<svg([^>]*?)\swidth="[^"]*"\s+height="[^"]*"/, '<svg$1')
  .replace('<svg', '<svg class="block h-auto w-full" role="img" aria-hidden="true"')
  .trim();

const catalogLinks = (root) => CATALOG.map((c) => `<a href="${root}catalog/${c.key}/">${c.title}</a>`).join('');

// Каталог разделов — landing-1 «Services»: фото с градиентом, цена «от» и прайс раздела видны всегда.
const catalogCards = (root) => CATALOG.map((c, i) => {
  const [min, unit] = minOf(c);
  return `
      <article class="reveal h-full" style="--d:${(i % 3) * 0.08}s">
        <div class="svc-card" data-svc>
          <a href="${root}catalog/${c.key}/" class="relative block h-[200px] sm:h-[220px]" aria-label="${c.title}">
            <img src="${root}assets/img/catalog/${c.key}/${c.image}" alt="${c.title}" loading="lazy" class="absolute inset-0 size-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-navy/75 to-transparent to-60%"></div>
            <div class="absolute inset-x-5 bottom-4 flex flex-wrap items-end justify-between gap-2">
              <h3 class="text-[20px] font-bold text-cream">${c.title}</h3>
              <span class="rounded-[2px] bg-navy/60 px-2.5 py-1 text-[13px] font-bold whitespace-nowrap text-gold">от ${money(min)} ₽/${unit}</span>
            </div>
          </a>
          <div class="px-6 pt-6 pb-5">
            <p class="mb-4 text-[15px] leading-[1.75] font-light text-slate">${c.text}</p>
            <div>
              <ul class="mb-4">
                ${c.prices.map((r) => `<li class="flex items-baseline gap-2.5 py-1.5 text-[14px]"><span class="font-bold text-gold">✓</span><span class="flex-1">${r[0]}</span><span class="font-bold whitespace-nowrap">${Array.isArray(r[1]) ? '' : 'от '}${priceText(r[1])} ₽/${r[2]}</span></li>`).join('\n                ')}
              </ul>
              <a href="${root}catalog/${c.key}/" class="mb-4 inline-flex items-center gap-2 text-[13px] font-bold tracking-[.1em] text-gold uppercase transition-opacity hover:opacity-75">Подробнее →</a>
            </div>
          </div>
        </div>
      </article>`;
}).join('');

const priceRows = (root) => CATALOG.map((c) => {
  const [min, unit] = minOf(c);
  return `<a href="${root}catalog/${c.key}/" class="group flex items-baseline gap-3 border-b border-navy/10 py-3.5 transition-colors hover:text-gold"><span class="flex flex-1 items-center gap-2 text-[16px]">${c.title}<span class="text-gold transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span><span class="text-[16px] font-bold whitespace-nowrap">от ${money(min)} ₽/${unit}</span></a>`;
}).join('\n        ');

// Метаданные — как на основном сайте (apps/shtorivdom-site: src/index.html, seo.ts,
// catalog-detail-page.ts): canonical и og:url на shtorivdom.ru, og:image разделов каталога
// из первого фото images в catalog.data.ts, иконки, манифест и карточка организации.
const SITE_URL = 'https://shtorivdom.ru';
const ogImageByKey = Object.fromEntries(
  [...readFileSync('mockups/site/src/data/old-site/model/catalog/catalog.data.ts', 'utf8').matchAll(/key:\s*'([^']+)'[\s\S]*?images:\s*\[\s*'([^']+)'/g)].map((m) => [m[1], m[2]])
);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const ORG_LD = `  <!-- Карточка организации для поисковиков: адрес, телефон, часы работы -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HomeGoodsStore",
      "name": "Shtorivdom",
      "description": "Салон штор: пошив штор на заказ, жалюзи, карнизы. Бесплатный выезд дизайнера.",
      "url": "https://shtorivdom.ru/",
      "logo": "https://shtorivdom.ru/assets/favicon/favicon-96x96.png",
      "telephone": "+79255946117",
      "email": "info@shtorivdom.ru",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Кварцевая улица, 3, корп. 2",
        "addressLocality": "Троицк, Москва",
        "addressCountry": "RU"
      },
      "areaServed": ["Москва", "Московская область"],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    }
  </script>`;

const head = (page, root) => {
  const url = `${SITE_URL}/${page.path}`;
  const sectionKey = page.path.match(/^catalog\/([^/]+)\/$/)?.[1];
  const ogImage = sectionKey && ogImageByKey[sectionKey] ? `${SITE_URL}/assets/img${ogImageByKey[sectionKey]}` : '';
  const icons = `${root}assets/icons/`;
  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${page.title}</title>
  ${page.description ? `<meta name="description" content="${esc(page.description)}" />\n  ` : ''}<!-- Собрано: node tools/mockups/site-build.mjs — не править руками, исходники в mockups/site/src/ -->
  <link rel="canonical" href="${url}" />
  <link rel="icon" type="image/png" href="${icons}favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="${icons}favicon.svg" />
  <link rel="shortcut icon" href="${icons}favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="${icons}apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content="Shtorivdom" />
  <link rel="manifest" href="${icons}site.webmanifest" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Shtorivdom" />
  <meta property="og:locale" content="ru_RU" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${esc(page.title)}" />
  ${page.description ? `<meta property="og:description" content="${esc(page.description)}" />\n  ` : ''}${ogImage ? `<meta property="og:image" content="${ogImage}" />\n  ` : ''}${ORG_LD.trimStart()}
  <link rel="preload" href="${root}../shared/fonts/lato-bold.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="${root}../shared/fonts/lato-normal.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="${root}../shared/fonts.css" />
  <link rel="stylesheet" href="${root}assets/site.css" />
</head>`;
};

let count = 0;
const built = [];
for (const page of PAGES) {
  const depth = page.path.split('/').filter(Boolean).length;
  const root = '../'.repeat(depth);
  const home = root || './';
  let body;
  if (page.body) {
    body = page.body;
  } else if (page.src) {
    body = read(page.src);
  } else {
    // Своя страница: pages/<путь>.html (price.html, about.html…), иначе заготовка _stub.html
    const own = `pages/${page.path.replace(/\/$/, '').replaceAll('/', '--')}.html`;
    body = read(existsSync(path.join(SRC, own)) ? own : 'pages/_stub.html');
    const crumbs = [`<a href="${home}" class="hover:text-gold">Главная</a>`];
    if (page.crumb) crumbs.push(`<a href="${root}${page.crumb[1]}" class="hover:text-gold">${page.crumb[0]}</a>`);
    body = body
      .replace('<!-- @crumbs -->', crumbs.join('<span class="text-gold">/</span>'))
      .replace('<!-- @extra -->', page.extra === 'catalog'
        ? `<div class="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"><!-- @catalog-cards --></div>`
        : page.extra === 'prices'
          ? `<div class="max-w-[720px]"><!-- @price-rows --><p class="mt-4 text-[14px] text-slate/70">*Цены ориентировочные. Точная стоимость — после бесплатного замера и выбора ткани.</p></div>`
          : '');
  }
  let html = `${head(page, root)}\n<body data-page="${page.path}"${page.src ? '' : ' data-header="solid"'}>\n${body}\n<script src="${root}assets/site.js"></script>\n</body>\n</html>\n`;
  for (let i = 0; i < 2; i++) {
    html = html
      .replace('<!-- @header -->', read('partials/header.html'))
      .replace('<!-- @lead-form -->', read('partials/lead-form.html'))
      .replace('<!-- @footer -->', read('partials/footer.html'));
  }
  html = html
    .replaceAll('<!-- @logo-1 -->', logo(1))
    .replaceAll('<!-- @logo-2 -->', logo(2))
    .replaceAll('<!-- @logo-3 -->', logo(3))
    .replaceAll('<!-- @logo-4 -->', logo(4))
    .replaceAll('<!-- @logo-5 -->', logo(5))
    // Золотой оригинал logo-5 с градиентом (assets/logo/logo-5.svg), тянется по ширине блока
    .replaceAll('<!-- @logo-5-gold -->', readFileSync(path.join(SITE, 'assets/logo/logo-5.svg'), 'utf8').replace('<svg width="400" height="250"', '<svg class="block h-auto w-full" role="img" aria-label="Шторы в дом"'))
    .replaceAll('<!-- @catalog-links -->', catalogLinks(root))
    .replaceAll('<!-- @catalog-cards -->', catalogCards(root))
    .replaceAll('<!-- @price-rows -->', priceRows(root))
    .replaceAll('{{root}}', root)
    .replaceAll('{{home}}', home)
    .replaceAll('{{h1}}', page.h1 ?? '')
    .replaceAll('{{lead}}', page.lead ?? '');
  const out = path.join(SITE, page.path, 'index.html');
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, html);
  built.push(out);
  count++;
}
console.log(`site-build: собрано страниц — ${count}`);

// CSS собирается заранее (раньше — браузерный Tailwind из CDN: страница мигала без стилей
// при каждом переходе). Классы берутся из всех HTML и JS прототипа.
const twDir = path.dirname(createRequire(import.meta.url).resolve('tailwindcss/package.json'));
const loadStylesheet = async (id, base) => {
  const file = id === 'tailwindcss' ? path.join(twDir, 'index.css')
    : id.startsWith('tailwindcss/') ? path.join(twDir, id.slice(12))
    : path.resolve(base, id);
  return { path: file, base: path.dirname(file), content: readFileSync(file, 'utf8') };
};
const compiler = await compile(['@import "tailwindcss";', read('partials/theme.css')].join('\n'), { base: path.resolve(SITE), loadStylesheet });
const candidates = new Scanner({ sources: [{ base: path.resolve(SITE), pattern: '**/*.{html,js,mjs}', negated: false }] }).scan();
const css = compiler.build(candidates);
writeFileSync(path.join(SITE, 'assets/site.css'), css);
console.log(`site-build: assets/site.css — ${Math.round(css.length / 1024)} КБ, классов ${candidates.length}`);

// Версии в адресах стилей и скриптов: хостинг отдаёт css/js с Cache-Control на год,
// без ?v= браузер показывает старые стили после выкладки. Хеш меняется вместе с содержимым файла.
// Только с флагом --versions (перед коммитом и при выкладке), чтобы обычная сборка не меняла все страницы.
const WITH_VERSIONS = process.argv.includes('--versions');
const ver = (file) => createHash('md5').update(readFileSync(file)).digest('hex').slice(0, 8);
const V = {
  css: ver(path.join(SITE, 'assets/site.css')),
  js: ver(path.join(SITE, 'assets/site.js')),
  email: ver(path.join(SITE, 'assets/email.js')),
  fonts: ver('mockups/shared/fonts.css'),
};
for (const file of WITH_VERSIONS ? built : []) {
  const html = readFileSync(file, 'utf8')
    .replace(/(shared\/fonts\.css)(\?v=[0-9a-f]+)?"/g, `$1?v=${V.fonts}"`)
    .replace(/(assets\/site\.css)(\?v=[0-9a-f]+)?"/g, `$1?v=${V.css}"`)
    .replace(/(assets\/site\.js)(\?v=[0-9a-f]+)?"( data-email-v="[0-9a-f]+")?/g, `$1?v=${V.js}" data-email-v="${V.email}"`);
  writeFileSync(file, html);
}
console.log(WITH_VERSIONS ? `site-build: версии файлов — css ${V.css}, js ${V.js}, email ${V.email}, fonts ${V.fonts}` : 'site-build: без версий в адресах (для выкладки и коммита — --versions)');
