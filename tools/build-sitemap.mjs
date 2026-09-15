import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

/**
 * Собирает `sitemap.xml` и `robots.txt` сайта shtorivdom.
 *
 * Перенесено из DesignPad (tools/build-sitemap.mjs) и переделано: список
 * адресов не выписан отдельным файлом, а берётся из маршрутов
 * `site-pages.ts` — новая страница попадает в карту сама.
 *
 * Дата изменения — из истории git по папке страницы, а не время запуска:
 * `lastmod`, который меняется у всех страниц при каждой сборке, поисковик
 * перестаёт принимать всерьёз.
 *
 * Запуск: `node tools/build-sitemap.mjs`, проверка без записи — `--check`.
 */
const APP = 'apps/shtorivdom-site';
const OUT_SITEMAP = `${APP}/public/sitemap.xml`;
const OUT_ROBOTS = `${APP}/public/robots.txt`;
const SITE_PAGES = `${APP}/src/app/site-pages.ts`;

const SITE = process.env.SITE_URL ?? 'https://shtorivdom.ru';

const priorityOf = (route) =>
  route === '/'
    ? '1.0'
    : route.startsWith('/catalog')
      ? '0.8'
      : ['/price/', '/services/', '/contact/'].includes(route)
        ? '0.7'
        : route === '/about/'
          ? '0.6'
          : route === '/partner/'
            ? '0.5'
            : '0.2';

// Маршрут и папка страницы: path: '…' и import('./pages/<папка>/page')
const pages = [...readFileSync(SITE_PAGES, 'utf8').matchAll(/path: '([^']*)'[\s\S]*?import\('\.\/pages\/([^/]+)\/page'\)/g)].map(
  ([, path, dir]) => {
    const route = path ? `/${path}/` : '/';
    return { route, source: `${APP}/src/app/pages/${dir}`, priority: priorityOf(route) };
  }
);

function lastModified(path) {
  try {
    return execSync(`git log -1 --format=%ad --date=short -- "${path}"`, { encoding: 'utf8' }).trim() || null;
  } catch {
    return null;
  }
}

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
