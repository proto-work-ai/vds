/* Перенос прототипа mockups/site/ в Angular-сайт apps/shtorivdom-site.

   node tools/mockups/site-build.mjs && node tools/mockups/site-to-angular.mjs

   Берёт собранные страницы mockups/site/**\/index.html (кроме emails/) и пишет:
   - src/app/pages/<страница>/page.html + page.ts — <main> и секция заявки страницы;
   - src/app/layout/site-footer.html — подвал;
   - src/app/site-pages.ts — маршруты с SEO: title, description, og:image, schema.org;
   - src/styles/catalog.css — стили страниц каталога (<style> из страниц каталога);
   - public/assets/img — картинки прототипа, public/assets/logo/logo-1-email.png — логотип писем.
   Ссылки становятся абсолютными (/price/), интерактив — src/app/behavior/*.ts.
   Сгенерированные файлы руками не править: правка в mockups/site/src → пересборка. */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync, cpSync, existsSync } from 'node:fs';
import path from 'node:path';

const SITE = 'mockups/site';
const APP = 'apps/shtorivdom-site';
const SITE_URL = 'https://shtorivdom.ru';

// Описания страниц, у которых в прототипе их нет
const DESCRIPTIONS = {
  'price/':
    'Цены на шторы на заказ в Москве: блэкаут, римские, рулонные и льняные шторы, плиссе, жалюзи и карнизы. Тарифы «Стандарт», «Премиум», «Люкс» с пошивом и установкой.',
  'services/':
    'Услуги студии Shtorivdom: бесплатный выезд дизайнера с образцами, замер, пошив штор в собственном цехе, установка карнизов и навеска штор под ключ.',
};

// Заголовки вкладки для страниц, где в прототипе он общий («Цены | Shtorivdom»)
const TITLES = {
  'catalog/': 'Каталог штор на заказ: шторы, жалюзи и карнизы | Shtorivdom',
  'price/': 'Цены на шторы на заказ в Москве | Shtorivdom',
  'services/': 'Услуги салона штор: выезд дизайнера, пошив, монтаж | Shtorivdom',
};

const LOCAL_BUSINESS = {
  '@type': 'HomeGoodsStore',
  name: 'Shtorivdom',
  description: 'Салон штор: пошив штор на заказ, жалюзи, карнизы. Бесплатный выезд дизайнера.',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/favicon/favicon-96x96.png`,
  image: `${SITE_URL}/assets/img/hero.jpg`,
  telephone: '+79255946117',
  email: 'info@shtorivdom.ru',
  address: { '@type': 'PostalAddress', streetAddress: 'Кварцевая улица, 3, корп. 2', addressLocality: 'Троицк, Москва', addressCountry: 'RU' },
  areaServed: ['Москва', 'Московская область'],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '10:00',
    closes: '20:00',
  },
};

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = path.join(dir, n);
    if (statSync(p).isDirectory()) return n === 'emails' || n === 'src' || n === 'assets' ? [] : walk(p);
    return n === 'index.html' ? [p] : [];
  });

const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const between = (s, a, b, from = 0) => {
  const i = s.indexOf(a, from);
  if (i < 0) return null;
  const j = s.indexOf(b, i + a.length);
  return j < 0 ? null : s.slice(i, j + b.length);
};
const pascal = (s) => s.split(/[^a-z0-9]+/i).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join('');

// Относительные адреса страницы → абсолютные от корня сайта
const absolutize = (html, pagePath) => {
  const base = `${SITE_URL}/${pagePath}`;
  return html.replace(/\b(href|src|data-src)="([^"]*)"/g, (m, attr, url) => {
    if (!url || /^(https?:|tel:|mailto:|#|data:)/.test(url)) return m;
    const u = new URL(url, base);
    return `${attr}="${u.pathname}${u.hash}"`;
  });
};

// Шаблон Angular: фигурные скобки и @ в тексте — служебные
const toTemplate = (html) => html.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;').replace(/@/g, '&#64;').replace(/<!--[\s\S]*?-->/g, '');

const pagesDir = path.join(APP, 'src/app/pages');
rmSync(pagesDir, { recursive: true, force: true });
mkdirSync(pagesDir, { recursive: true });

let catalogCss = '';
let footer = '';
const routes = [];

for (const file of walk(SITE).sort()) {
  const pagePath = path.relative(SITE, path.dirname(file)).split(path.sep).join('/').replace(/^\.?$/, '');
  const route = pagePath ? `${pagePath}/` : '';
  const src = readFileSync(file, 'utf8');
  const title = TITLES[route] ?? decode(src.match(/<title>([^<]*)<\/title>/)[1]);
  // «…в своем доме Бесплатный выезд» — в тексте раздела нет точки в конце
  const description = decode(src.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? DESCRIPTIONS[route] ?? '').replace(
    /([а-яёa-z0-9])( Бесплатный выезд)/,
    '$1.$2'
  );
  if (!description) throw new Error(`Нет description: /${route}`);

  const style = src.match(/<style>([\s\S]*?)<\/style>/);
  if (style && !catalogCss) catalogCss = style[1].trim();

  const main = between(src, '<main>', '</main>');
  const lead = between(src, '<section id="lead"', '</section>', src.indexOf('</main>'));
  if (!footer) footer = between(src, '<footer', '</footer>');
  let body = absolutize(`${main}\n${lead ?? ''}`, route);

  const slug = pagePath ? pagePath.replace(/\//g, '-') : 'home';
  const cls = `${pascal(slug)}Page`;
  const dir = path.join(pagesDir, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'page.html'), toTemplate(body).trim() + '\n');
  writeFileSync(
    path.join(dir, 'page.ts'),
    `import { ChangeDetectionStrategy, Component } from '@angular/core';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/${route}index.html
@Component({
  selector: 'app-${slug}-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${cls} {}
`
  );

  // ---------- SEO ----------
  const firstImg = main.match(/<img[^>]*\bsrc="([^"]+)"/)?.[1];
  const ogImage = src.match(/og:image" content="([^"]+)"/)?.[1] ?? (firstImg ? SITE_URL + absolutize(`src="${firstImg}"`, route).slice(5, -1) : `${SITE_URL}/assets/img/hero.jpg`);
  const url = `${SITE_URL}/${route}`;
  const ld = [];
  if (route === '' || route === 'contact/') ld.push(LOCAL_BUSINESS);

  const crumbsNav = main.match(/aria-label="Хлебные крошки">([\s\S]*?)<\/nav>/)?.[1];
  const h1 = text(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? title);
  if (route) {
    const items = crumbsNav
      ? [...absolutize(crumbsNav, route).matchAll(/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ name: text(m[2]), url: SITE_URL + m[1] }))
      : [{ name: 'Главная', url: `${SITE_URL}/` }];
    items.push({ name: h1, url });
    ld.push({
      '@type': 'BreadcrumbList',
      itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
    });
  }

  const faq = [...main.matchAll(/data-faq-q[^>]*>([\s\S]*?)<\/button>\s*<div[^>]*data-faq-a[^>]*>([\s\S]*?)<\/div>\s*(?=<\/div>|<\/li>|<\/article>)/g)].map((m) => ({
    q: text(m[1]),
    a: text(m[2]),
  }));
  if (faq.length) {
    ld.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }

  const section = route.match(/^catalog\/([^/]+)\/$/)?.[1];
  const priceBlock = between(main, 'data-price-table', '</table>');
  if (section && priceBlock) {
    const prices = [...text(priceBlock).matchAll(/(\d[\d ]*\d|\d)\s*(?:–\s*(\d[\d ]*\d))?\s*₽/g)].flatMap((m) => [m[1], m[2]].filter(Boolean).map((n) => Number(n.replace(/\s/g, ''))));
    if (prices.length) {
      ld.push({
        '@type': 'Product',
        name: h1,
        description,
        image: ogImage,
        brand: { '@type': 'Brand', name: 'Shtorivdom' },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'RUB',
          lowPrice: Math.min(...prices),
          highPrice: Math.max(...prices),
          offerCount: (priceBlock.match(/<tr/g)?.length ?? 1) - 1 || 1,
          availability: 'https://schema.org/InStock',
        },
      });
    }
  }
  if (route === 'catalog/') {
    const cards = [...absolutize(main, route).matchAll(/<a href="(\/catalog\/[^"]+\/)"[^>]*data-catalog-card/g)].map((m) => m[1]);
    const list = cards.length ? cards : [...new Set([...absolutize(main, route).matchAll(/href="(\/catalog\/[a-z-]+\/)"/g)].map((m) => m[1]))];
    ld.push({ '@type': 'ItemList', itemListElement: list.map((u, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE_URL + u })) });
  }

  routes.push({ route, slug, cls, seo: { title, description, image: ogImage, jsonLd: ld.map((x) => ({ '@context': 'https://schema.org', ...x })) } });
}

// ---------- уникальность мета ----------
for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const r of routes) {
    if (seen.has(r.seo[key])) throw new Error(`Одинаковый ${key}: /${r.route} и /${seen.get(r.seo[key])}`);
    seen.set(r.seo[key], r.route);
  }
}

const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
writeFileSync(
  path.join(APP, 'src/app/site-pages.ts'),
  `// Сгенерировано tools/mockups/site-to-angular.mjs — руками не править.
import { Route } from '@angular/router';
import { SeoData } from './seo';

export const sitePages: Route[] = [
${routes
  .map(
    (r) => `  {
    path: ${q(r.route.replace(/\/$/, ''))},
    pathMatch: 'full',
    data: { seo: ${JSON.stringify(r.seo)} satisfies SeoData },
    loadComponent: () => import('./pages/${r.slug}/page').then((m) => m.${r.cls}),
  },`
  )
  .join('\n')}
];
`
);

mkdirSync(path.join(APP, 'src/app/layout'), { recursive: true });
writeFileSync(path.join(APP, 'src/app/layout/site-footer.html'), toTemplate(absolutize(footer, '')).trim() + '\n');
mkdirSync(path.join(APP, 'src/styles'), { recursive: true });
writeFileSync(path.join(APP, 'src/styles/theme.css'), readFileSync(path.join(SITE, 'src/partials/theme.css'), 'utf8'));
writeFileSync(path.join(APP, 'src/styles/catalog.css'), `/* Стили страниц каталога — mockups/site/src/partials/catalog-styles.html */\n${catalogCss}\n`);

cpSync(path.join(SITE, 'assets/img'), path.join(APP, 'public/assets/img'), { recursive: true });
mkdirSync(path.join(APP, 'public/assets/logo'), { recursive: true });
cpSync(path.join(SITE, 'assets/logo/logo-1-email.png'), path.join(APP, 'public/assets/logo/logo-1-email.png'));
mkdirSync(path.join(APP, 'public/fonts'), { recursive: true });
for (const f of ['lato-light', 'lato-normal', 'lato-normal-italic', 'lato-semibold', 'lato-bold']) {
  cpSync(`mockups/shared/fonts/${f}.woff2`, path.join(APP, `public/fonts/${f}.woff2`));
}

// Все картинки из шаблонов должны существовать в public/
const missing = [];
for (const f of [...routes.map((r) => path.join(pagesDir, r.slug, 'page.html')), path.join(APP, 'src/app/layout/site-footer.html')]) {
  for (const m of readFileSync(f, 'utf8').matchAll(/(?:src|data-src)="(\/[^"#?]+)"/g)) {
    if (!existsSync(path.join(APP, 'public', decodeURI(m[1])))) missing.push(`${f}: ${m[1]}`);
  }
}
if (missing.length) throw new Error('Нет картинок:\n' + missing.join('\n'));
console.log(`site-to-angular: страниц ${routes.length}`);
