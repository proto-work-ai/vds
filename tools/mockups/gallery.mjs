/* Страницы-галереи всех картинок и иконок из переводов на Tailwind.

   node tools/mockups/gallery.mjs

   Читает mockups/landing-N/index.html.assets.json (их пишет to-tailwind.mjs)
   и собирает:
   - mockups/images/index.html — карточки картинок: превью, название файла,
     alt и текст рядом, сайт-источник; по клику — полная версия в лайтбоксе;
   - mockups/icons/index.html — карточки иконок (inline SVG): название,
     текст рядом, сайт; по клику — крупная версия в лайтбоксе.
   Страницы лежат в папках, как и переводы: сервер макетов открывает
   `/images/` со слешем, и относительные пути должны считаться от папки.
   Одинаковые картинки и иконки с разных сайтов объединяются в одну карточку.
   Лайтбокс — общий скрипт mockups/shared/lightbox.js. */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const ROOT = 'mockups';
const sites = readdirSync(ROOT)
  .filter((d) => /^landing-\d+$/.test(d) && existsSync(path.join(ROOT, d, 'index.html.assets.json')))
  .sort((a, b) => Number(a.slice(8)) - Number(b.slice(8)));

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Путь картинки относительно страницы галереи (mockups/images/).
const fromGallery = (site, src) => {
  if (!src || /^(https?:|data:|\/\/)/.test(src)) return src;
  return path.posix.normalize(`../${site}/${src}`);
};
const fileName = (src) => {
  try {
    return decodeURIComponent(new URL(src, 'http://x/').pathname.split('/').pop()) || src;
  } catch {
    return src;
  }
};

const images = new Map();
const icons = new Map();
for (const site of sites) {
  const { images: imgs = [], icons: ics = [] } = JSON.parse(readFileSync(path.join(ROOT, site, 'index.html.assets.json'), 'utf8'));
  for (const im of imgs) {
    const src = fromGallery(site, im.src);
    if (!src) continue;
    const key = src.split('?')[0];
    const cur = images.get(key) ?? { src, name: fileName(src), alt: im.alt, text: im.text, sites: new Set() };
    if (!cur.alt && im.alt) cur.alt = im.alt;
    if (!cur.text && im.text) cur.text = im.text;
    cur.sites.add(site);
    images.set(key, cur);
  }
  for (const ic of ics) {
    // Одна и та же иконка на разных сайтах отличается только размером, классами и толщиной линии.
    const key = ic.svg
      .replace(/\s+/g, ' ')
      .replace(/ (class|width|height|style|stroke-width|aria-hidden|data-[\w-]+)="[^"]*"/g, '')
      .replace(/ fill="currentColor"/g, '')
      .trim();
    const cur = icons.get(key) ?? { svg: ic.svg, name: ic.name, text: ic.text, sites: new Set() };
    if (!cur.name && ic.name) cur.name = ic.name;
    if (!cur.text && ic.text) cur.text = ic.text;
    cur.sites.add(site);
    icons.set(key, cur);
  }
}

const siteLabel = (s) => `Лендинг ${s.slice(8)}`;
const shell = (title, subtitle, cards) => `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="../assets/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="../assets/favicon/favicon.svg" />
    <link rel="shortcut icon" href="../assets/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="../assets/favicon/site.webmanifest" />
    <title>${title}</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body class="bg-stone-100 text-stone-900 antialiased">
    <header class="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div>
          <h1 class="text-[22px] font-bold">${title}</h1>
          <p class="text-[14px] text-stone-500">${subtitle}</p>
        </div>
        <nav class="flex gap-2 text-[14px]">
          <a href="../" class="rounded-lg px-3 py-2 hover:bg-stone-100">Карта макетов</a>
          <a href="../images/" class="rounded-lg px-3 py-2 hover:bg-stone-100">Картинки</a>
          <a href="../icons/" class="rounded-lg px-3 py-2 hover:bg-stone-100">Иконки</a>
        </nav>
      </div>
    </header>
    <main class="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
${cards}
    </main>
    <script src="../shared/lightbox.js"></script>
  </body>
</html>
`;

const imageCards = [...images.values()]
  .map(
    (im) => `      <figure class="overflow-hidden rounded-xl border border-stone-200 bg-white">
        <button type="button" data-lightbox="image" data-src="${esc(im.src)}" data-title="${esc(im.name)}" data-text="${esc(im.alt || im.text)}"
          class="block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-stone-200" title="Открыть полную версию">
          <img src="${esc(im.src)}" alt="${esc(im.alt || im.name)}" loading="lazy" class="h-full w-full object-cover transition duration-300 hover:scale-105" />
        </button>
        <figcaption class="space-y-1 p-4">
          <p class="break-all text-[14px] font-semibold">${esc(im.name)}</p>
          ${im.alt ? `<p class="text-[14px] text-stone-700">${esc(im.alt)}</p>` : ''}
          ${im.text ? `<p class="line-clamp-3 text-[12px] text-stone-500">${esc(im.text)}</p>` : ''}
          <p class="text-[12px] text-stone-400">${[...im.sites].map(siteLabel).join(', ')}</p>
        </figcaption>
      </figure>`
  )
  .join('\n');

const iconCards = [...icons.values()]
  .map(
    (ic) => `      <figure class="overflow-hidden rounded-xl border border-stone-200 bg-white">
        <button type="button" data-lightbox="icon" data-title="${esc(ic.name || 'Иконка')}" data-text="${esc(ic.text)}"
          class="flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center bg-stone-50 text-stone-800 [&_svg]:h-16 [&_svg]:w-16" title="Открыть крупно">
          ${ic.svg}
        </button>
        <figcaption class="space-y-1 p-4">
          <p class="text-[14px] font-semibold">${esc(ic.name || 'Без названия')}</p>
          ${ic.text ? `<p class="line-clamp-3 text-[12px] text-stone-500">${esc(ic.text)}</p>` : ''}
          <p class="text-[12px] text-stone-400">${[...ic.sites].map(siteLabel).join(', ')}</p>
        </figcaption>
      </figure>`
  )
  .join('\n');

for (const old of ['images.html', 'icons.html']) rmSync(path.join(ROOT, old), { force: true });
for (const dir of ['images', 'icons', 'shared']) mkdirSync(path.join(ROOT, dir), { recursive: true });
writeFileSync(
  path.join(ROOT, 'images', 'index.html'),
  shell('Картинки макетов', `${images.size} картинок из ${sites.length} сайтов. Нажмите на карточку — откроется полная версия.`, imageCards)
);
writeFileSync(
  path.join(ROOT, 'icons', 'index.html'),
  shell('Иконки макетов', `${icons.size} иконок из ${sites.length} сайтов. Нажмите на карточку — иконка откроется крупно.`, iconCards)
);
console.log(`картинок: ${images.size}, иконок: ${icons.size}, сайтов: ${sites.length}`);
