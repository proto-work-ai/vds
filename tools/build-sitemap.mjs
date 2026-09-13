import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

/**
 * Собирает `sitemap.xml` и `robots.txt` сайта shtorivdom.
 *
 * Перенесено из DesignPad (tools/build-sitemap.mjs) и переделано: список
 * адресов не выписан отдельным файлом, а берётся из `app.routes.ts` и ключей
 * каталога в `catalog.data.ts` — новая страница каталога попадает в карту сама.
 *
 * Дата изменения — из истории git по файлу страницы, а не время запуска:
 * `lastmod`, который меняется у всех страниц при каждой сборке, поисковик
 * перестаёт принимать всерьёз.
 *
 * Запуск: `node tools/build-sitemap.mjs`, проверка без записи — `--check`.
 */
const APP = 'apps/shtorivdom-site';
const OUT_SITEMAP = `${APP}/public/sitemap.xml`;
const OUT_ROBOTS = `${APP}/public/robots.txt`;
const CATALOG_DATA = `${APP}/src/app/model/catalog/catalog.data.ts`;

const SITE = process.env.SITE_URL ?? 'https://shtorivdom.ru';

// Страницы верхнего уровня и файл, из истории которого берётся дата.
const staticPages = [
  { route: '/', source: `${APP}/src/app/pages/main-page`, priority: '1.0' },
  { route: '/about', source: `${APP}/src/app/pages/about`, priority: '0.6' },
  { route: '/contact', source: `${APP}/src/app/pages/contact`, priority: '0.7' },
  { route: '/partner', source: `${APP}/src/app/pages/partner`, priority: '0.5' },
  { route: '/privacy-policy', source: `${APP}/src/app/pages/privacy-policy`, priority: '0.2' },
  {
    route: '/soglasie-na-obrabotku-personalnyh-dannyh',
    source: `${APP}/src/app/pages/soglasie-na-obrabotku-personalnyh-dannyh`,
    priority: '0.2',
  },
];

// Ключи верхнего уровня каталога — с отступом в 4 пробела; вложенные элементы
// (`key: '1'`) глубже, закомментированные начинаются с `//` и не совпадают.
const catalogKeys = [...readFileSync(CATALOG_DATA, 'utf8').matchAll(/^ {4}key: '([^']+)'/gm)].map((m) => m[1]);

const catalogPages = catalogKeys.map((key) => ({
  route: `/catalog/${key}`,
  source: `${APP}/src/app/model/catalog/catalog-detail/${key}`,
  priority: '0.8',
}));

function lastModified(path) {
  try {
    return execSync(`git log -1 --format=%ad --date=short -- "${path}"`, { encoding: 'utf8' }).trim() || null;
  } catch {
    return null;
  }
}

const pages = [...staticPages, ...catalogPages];

const entries = pages.map(({ route, source, priority }) => {
  const lastmod = lastModified(source);
  return [
    '  <url>',
    `    <loc>${SITE}${route}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries,
  '</urlset>',
  '',
].join('\n');

const robots = ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${SITE}/sitemap.xml`, ''].join('\n');

// `--check` сверяет, а не пишет: забытая в карте страница иначе видна только
// по отсутствию в поиске, то есть спустя недели.
if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = readFileSync(OUT_SITEMAP, 'utf8');
  } catch {
    console.log('sitemap.xml отсутствует — запустите node tools/build-sitemap.mjs');
    process.exitCode = 1;
  }
  if (current && current !== sitemap) {
    console.log(`sitemap.xml устарел: в маршрутах ${pages.length} адресов — пересоберите карту`);
    process.exitCode = 1;
  } else if (current) {
    console.log(`карта сайта совпадает с маршрутами: ${pages.length} адресов`);
  }
} else {
  writeFileSync(OUT_SITEMAP, sitemap);
  writeFileSync(OUT_ROBOTS, robots);
  console.log(`адресов в карте: ${pages.length}`);
  console.log(`записано: ${OUT_SITEMAP}, ${OUT_ROBOTS}`);
}
