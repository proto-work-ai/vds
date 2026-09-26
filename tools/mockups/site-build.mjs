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

const SITE = 'apps/shtorivdom-mockups/public/legacy/site';
const SRC = path.join(SITE, 'src');
const read = (p) => readFileSync(path.join(SRC, p), 'utf8');

// Общая конфигурация цен используется мокапами и Angular-сайтом.
const PRICE_CONFIG = JSON.parse(readFileSync('libs/ui/site-kit/src/lib/site-prices.json', 'utf8'));
const CATALOG_META = [
  ['blackout-curtains', 'Это идеальное решение для тех, кто ценит тишину и комфорт в своем доме'],
  ['roman-blinds', 'Из плотных и легких тканей для прямых и скошенных окон.'],
  ['roller-blinds', 'Крепление на проем, в проем или раму окна.'],
  ['linen-curtains', 'Для стандартных, мансардных и треугольных окон.'],
  ['pleated-blinds', 'Для стандартных, мансардных и треугольных окон.'],
  ['curtain-rods', 'Декоративные и профильные.'],
  ['blinds', 'Стильные, практичные.'],
];
const CATALOG = CATALOG_META.map(([key, text]) => {
  const section = PRICE_CONFIG.sections.find((item) => item.key === key);
  if (!section) throw new Error(`Нет настройки цен для раздела ${key}`);
  return {
    key,
    title: section.title,
    text,
    image: section.image.split('/').at(-1),
    prices: section.rows.map((row) => [
      row.name,
      row.priceMax ? [row.priceMin, row.priceMax] : row.priceMin,
      row.unit ?? section.unit,
    ]),
  };
});

const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const priceText = (p) => (Array.isArray(p) ? `${money(p[0])}–${money(p[1])}` : money(p));
const minOf = (item) =>
  item.prices.reduce(
    (m, r) => (Math.min(...[].concat(r[1])) < m[0] ? [Math.min(...[].concat(r[1])), r[2]] : m),
    [Infinity, ''],
  );

const configuredPrice = (section, rowIndex) => {
  const row = section.rows[rowIndex];
  const unit = row.unit ?? section.unit;
  return row.priceMax
    ? `${money(row.priceMin)}–${money(row.priceMax)} ₽/${unit}`
    : `от ${money(row.priceMin)} ₽/${unit}`;
};

const replacePriceSequence = (html, indexes, section) => {
  let index = 0;
  return html.replace(/(?:от )?\d[\d  ]*(?:–\d[\d  ]*)? ₽\/(?:м\.пог\.|м²|шт\.)/g, () => {
    const rowIndex = indexes[index++];
    return rowIndex === undefined ? '' : configuredPrice(section, rowIndex);
  });
};

const applyConfiguredPrices = (body, pagePath) => {
  body = body.replace(/<!-- @price:([a-z-]+):(\d+) -->/g, (_, key, rowIndex) => {
    const section = PRICE_CONFIG.sections.find((item) => item.key === key);
    if (!section?.rows[Number(rowIndex)]) {
      throw new Error(`Нет цены для ${key}, строка ${rowIndex}`);
    }
    return configuredPrice(section, Number(rowIndex));
  });

  const replaceBlocks = (source, marker, indexes) => {
    for (const section of PRICE_CONFIG.sections) {
      const position = source.indexOf(marker(section.key));
      if (position < 0) continue;
      const start = source.lastIndexOf('<article', position);
      const end = source.indexOf('</article>', position) + '</article>'.length;
      const block = source.slice(start, end);
      source =
        source.slice(0, start) + replacePriceSequence(block, indexes, section) + source.slice(end);
    }
    return source;
  };

  if (pagePath === '') {
    return replaceBlocks(body, (key) => `href="./catalog/${key}/"`, [0, 0, 1, 2]);
  }
  if (pagePath === 'price/') {
    for (const section of PRICE_CONFIG.sections) {
      const start = body.indexOf(`id="panel-${section.key}"`);
      if (start < 0) continue;
      const next = body.indexOf('role="tabpanel"', start + 1);
      const end = next < 0 ? body.length : body.lastIndexOf('<div', next);
      const block = body.slice(start, end);
      body =
        body.slice(0, start) +
        replacePriceSequence(block, [0, 1, 2, 0, 1, 2], section) +
        body.slice(end);
    }
  }
  return body;
};

// Страницы: путь, <title>, description, заголовок. SEO — из app.routes.ts, где есть.
const PAGES = [
  {
    path: '',
    src: 'pages/index.html',
    title: 'Шторы на заказ в Москве — пошив и дизайн штор | Shtorivdom',
    description:
      'Пошив штор на заказ в Москве и Подмосковье: римские, рулонные, льняные шторы, блэкаут, плиссе, жалюзи и карнизы. Бесплатный выезд дизайнера с образцами тканей.',
  },
  {
    path: 'catalog/',
    h1: 'Каталог штор',
    lead: 'Вся продукция изготавливается по индивидуальным размерам из качественных материалов.',
    title: 'Каталог штор | Shtorivdom',
    extra: 'catalog',
  },
  ...CATALOG.map((c) => ({
    path: `catalog/${c.key}/`,
    h1: c.title,
    lead: c.text,
    title: `${c.title} на заказ в Москве | Shtorivdom`,
    description: `${c.title} на заказ: ${c.text} Бесплатный выезд дизайнера с образцами.`,
    crumb: ['Каталог', 'catalog/'],
  })),
  {
    path: 'calc/',
    h1: 'Калькулятор штор',
    title: 'Калькулятор штор на заказ — расчёт ткани и стоимости | Shtorivdom',
    description:
      'Рассчитайте шторы на заказ: сколько ткани нужно под ваш карниз и окно и сколько это стоит по ценам каталога. Точный расчёт — после бесплатного замера.',
  },
  {
    path: 'quiz/',
    h1: 'Подбор штор',
    title: 'Подбор штор за 4 шага — какие шторы подойдут | Shtorivdom',
    description:
      'Ответьте на 4 вопроса о комнате и окне — подскажем, какие шторы подойдут: блэкаут, римские, рулонные, льняные, плиссе или жалюзи.',
  },
  { path: 'price/', h1: 'Цены / стоимость', title: 'Цены | Shtorivdom', extra: 'prices' },
  { path: 'services/', h1: 'Услуги', title: 'Услуги | Shtorivdom' },
  {
    path: 'about/',
    h1: 'О нас',
    lead: 'Более 15 лет мы создаем уникальные текстильные интерьеры',
    title: 'О салоне штор Shtorivdom — более 15 лет пошива штор',
    description:
      'Дизайн-студия Shtorivdom: собственный швейный цех, 3000+ тканей и карнизов, более 10 000 реализованных проектов штор в Москве и области.',
  },
  {
    path: 'partner/',
    h1: 'Стать партнером',
    title: 'Сотрудничество с салоном штор Shtorivdom',
    description:
      'Приглашаем к сотрудничеству дизайнеров интерьера, архитекторов и строительные компании. Выгодные условия для партнёров.',
  },
  {
    path: 'contact/',
    h1: 'Контакты',
    title: 'Контакты салона штор Shtorivdom — адрес, телефон',
    description:
      'Салон штор Shtorivdom: Троицк, Кварцевая улица, 3, корп. 2. Работаем без выходных с 10:00 до 20:00. Телефон +7 (915) 359-12-00.',
  },
  {
    path: 'privacy-policy/',
    h1: 'Политика конфиденциальности',
    title: 'Shtorivdom | Политика конфиденциальности',
    description: 'Политика конфиденциальности, соглашение на обработку информации на сайте',
  },
  {
    path: 'soglasie-na-obrabotku-personalnyh-dannyh/',
    h1: 'Согласие на обработку персональных данных',
    title: 'Shtorivdom | Согласие на обработку персональных данных',
    description:
      'Согласие на обработку персональных данных. Перечень персональных данных, цели обработки, срок действия согласия и порядок отзыва.',
  },
];

// Каталог: разделы, страницы разделов и моделей карнизов — src/pages/catalog/catalog.mjs (готовый body).
// Страница с тем же путём заменяет заготовку, новые (модели карнизов) добавляются в конец.
for (const cp of (
  await import('../../apps/shtorivdom-mockups/public/legacy/site/src/pages/catalog/catalog.mjs')
).catalogPages()) {
  const i = PAGES.findIndex((p) => p.path === cp.path);
  i >= 0 ? (PAGES[i] = cp) : PAGES.push(cp);
}

const logo = (n) =>
  readFileSync(path.join(SITE, 'assets/logo', `logo-${n}.svg`), 'utf8')
    .replace(/<\?xml[^>]*>/, '')
    .replace(/<svg([^>]*?)\swidth="[^"]*"\s+height="[^"]*"/, '<svg$1')
    .replace('<svg', '<svg class="block h-auto w-full" role="img" aria-hidden="true"')
    .trim();

const taigaIcon = (name) =>
  readFileSync(path.join('node_modules/@taiga-ui/icons/src', `${name}.svg`), 'utf8')
    .replace(/\swidth="24"/, '')
    .replace(/\sheight="24"/, '')
    .replace('<svg', '<svg class="size-5 shrink-0 text-gold" role="img" aria-hidden="true"')
    .trim();

const catalogLinks = (root) =>
  CATALOG.map((c) => `<a href="${root}catalog/${c.key}/">${c.title}</a>`).join('');

// Каталог разделов — landing-1 «Services»: фото с градиентом, цена «от» и прайс раздела видны всегда.
const catalogCards = (root) =>
  CATALOG.map((c, i) => {
    const [min, unit] = minOf(c);
    return `
      <article class="reveal h-full" style="--d:${(i % 3) * 0.08}s">
        <div class="svc-card" data-svc>
          <a href="${root}catalog/${c.key}/" class="relative block h-[200px] sm:h-[220px]" aria-label="${c.title}">
            <img src="${root}assets/img/catalog/${c.key}/${c.image}" alt="${c.title}" loading="lazy" class="absolute inset-0 size-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-navy/75 to-transparent to-60%"></div>
            <div class="absolute inset-x-5 bottom-4 flex flex-wrap items-end justify-between gap-2">
              <h3 class="text-[20px] font-bold text-cream">${c.title}</h3>
              <span class="rounded-[2px] bg-navy/60 px-2.5 py-1 text-[12px] font-bold whitespace-nowrap text-gold">от ${money(min)} ₽/${unit}</span>
            </div>
          </a>
          <div class="px-6 pt-6 pb-5">
            <p class="mb-4 text-[14px] leading-[1.75] font-light text-slate">${c.text}</p>
            <div>
              <ul class="mb-4">
                ${c.prices.map((r) => `<li class="flex items-baseline gap-2.5 py-1.5 text-[14px]"><span class="font-bold text-gold">✓</span><span class="flex-1">${r[0]}</span><span class="font-bold whitespace-nowrap">${Array.isArray(r[1]) ? '' : 'от '}${priceText(r[1])} ₽/${r[2]}</span></li>`).join('\n                ')}
              </ul>
              <a href="${root}catalog/${c.key}/" class="mb-4 inline-flex items-center gap-2 text-[12px] font-bold tracking-[.1em] text-gold uppercase transition-opacity hover:opacity-75">Подробнее →</a>
            </div>
          </div>
        </div>
      </article>`;
  }).join('');

const priceRows = (root) =>
  CATALOG.map((c) => {
    const [min, unit] = minOf(c);
    return `<a href="${root}catalog/${c.key}/" class="group flex items-baseline gap-3 border-b border-navy/10 py-3.5 transition-colors hover:text-gold"><span class="flex flex-1 items-center gap-2 text-[14px]">${c.title}<span class="text-gold transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span><span class="text-[14px] font-bold whitespace-nowrap">от ${money(min)} ₽/${unit}</span></a>`;
  }).join('\n        ');

// Метаданные — как на основном сайте (apps/shtorivdom-site: src/index.html, seo.ts,
// catalog-detail-page.ts): canonical и og:url на shtorivdom.ru, og:image разделов каталога
// из первого фото images в catalog.data.ts, иконки, манифест и карточка организации.
const SITE_URL = 'https://shtorivdom.ru';
const ogImageByKey = Object.fromEntries(
  [
    ...readFileSync(
      'apps/shtorivdom-mockups/public/legacy/site/src/data/old-site/model/catalog/catalog.data.ts',
      'utf8',
    ).matchAll(/key:\s*'([^']+)'[\s\S]*?images:\s*\[\s*'([^']+)'/g),
  ].map((m) => [m[1], m[2]]),
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
      "telephone": "+79153591200",
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
  const ogImage =
    sectionKey && ogImageByKey[sectionKey]
      ? `${SITE_URL}/assets/img${ogImageByKey[sectionKey]}`
      : '';
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
    if (page.crumb)
      crumbs.push(`<a href="${root}${page.crumb[1]}" class="hover:text-gold">${page.crumb[0]}</a>`);
    body = body
      .replace('<!-- @crumbs -->', crumbs.join('<span class="text-gold">/</span>'))
      .replace(
        '<!-- @extra -->',
        page.extra === 'catalog'
          ? `<div class="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"><!-- @catalog-cards --></div>`
          : page.extra === 'prices'
            ? `<div class="max-w-[720px]"><!-- @price-rows --><p class="mt-4 text-[14px] text-slate/70">*Цены ориентировочные. Точная стоимость — после бесплатного замера и выбора ткани.</p></div>`
            : '',
      );
  }
  body = applyConfiguredPrices(body, page.path);
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
    .replaceAll('<!-- @tui-user -->', taigaIcon('user'))
    .replaceAll('<!-- @tui-phone -->', taigaIcon('phone'))
    .replaceAll('<!-- @tui-map-pin -->', taigaIcon('map-pin'))
    // Золотой оригинал logo-5 с градиентом (assets/logo/logo-5.svg), тянется по ширине блока
    .replaceAll(
      '<!-- @logo-5-gold -->',
      readFileSync(path.join(SITE, 'assets/logo/logo-5.svg'), 'utf8').replace(
        '<svg width="400" height="250"',
        '<svg class="block h-auto w-full" role="img" aria-label="Шторы в дом"',
      ),
    )
    .replaceAll('<!-- @catalog-links -->', catalogLinks(root))
    .replaceAll('<!-- @catalog-cards -->', catalogCards(root))
    .replaceAll('<!-- @price-rows -->', priceRows(root))
    .replaceAll(
      '<!-- @calc-data -->',
      `<script type="application/json" id="calc-data">${JSON.stringify(
        CATALOG.map((c) => {
          const [min, unit] = minOf(c);
          return {
            key: c.key,
            title: c.title,
            unit,
            min,
            image: `${root}assets/img/catalog/${c.key}/${c.image}`,
            href: `${root}catalog/${c.key}/`,
          };
        }),
      )}</script>`,
    )
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
  const file =
    id === 'tailwindcss'
      ? path.join(twDir, 'index.css')
      : id.startsWith('tailwindcss/')
        ? path.join(twDir, id.slice(12))
        : path.resolve(base, id);
  return { path: file, base: path.dirname(file), content: readFileSync(file, 'utf8') };
};
const compiler = await compile(['@import "tailwindcss";', read('partials/theme.css')].join('\n'), {
  base: path.resolve(SITE),
  loadStylesheet,
});
const candidates = new Scanner({
  sources: [{ base: path.resolve(SITE), pattern: '**/*.{html,js,mjs}', negated: false }],
}).scan();
const css = compiler.build(candidates);
writeFileSync(path.join(SITE, 'assets/site.css'), css);
console.log(
  `site-build: assets/site.css — ${Math.round(css.length / 1024)} КБ, классов ${candidates.length}`,
);

// Версии в адресах стилей и скриптов: хостинг отдаёт css/js с Cache-Control на год,
// без ?v= браузер показывает старые стили после выкладки. Хеш меняется вместе с содержимым файла.
// Только с флагом --versions (перед коммитом и при выкладке), чтобы обычная сборка не меняла все страницы.
const WITH_VERSIONS = process.argv.includes('--versions');
const ver = (file) => createHash('md5').update(readFileSync(file)).digest('hex').slice(0, 8);
const V = {
  css: ver(path.join(SITE, 'assets/site.css')),
  js: ver(path.join(SITE, 'assets/site.js')),
  email: ver(path.join(SITE, 'assets/email.js')),
  fonts: ver('apps/shtorivdom-mockups/public/legacy/shared/fonts.css'),
};
for (const file of WITH_VERSIONS ? built : []) {
  const html = readFileSync(file, 'utf8')
    .replace(/(shared\/fonts\.css)(\?v=[0-9a-f]+)?"/g, `$1?v=${V.fonts}"`)
    .replace(/(assets\/site\.css)(\?v=[0-9a-f]+)?"/g, `$1?v=${V.css}"`)
    .replace(
      /(assets\/site\.js)(\?v=[0-9a-f]+)?"( data-email-v="[0-9a-f]+")?/g,
      `$1?v=${V.js}" data-email-v="${V.email}"`,
    );
  writeFileSync(file, html);
}
console.log(
  WITH_VERSIONS
    ? `site-build: версии файлов — css ${V.css}, js ${V.js}, email ${V.email}, fonts ${V.fonts}`
    : 'site-build: без версий в адресах (для выкладки и коммита — --versions)',
);
