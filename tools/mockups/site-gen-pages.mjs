// Генератор исходников страниц прототипа из данных текущего сайта: price.html (цены из
// price-list.service.ts), privacy-policy.html и soglasie-….html (тексты дословно).
// Запуск из корня репозитория: node tools/mockups/site-gen-pages.mjs, затем node tools/mockups/site-build.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const APP = 'mockups/site/src/data/old-site';
const OUT = 'mockups/site/src/pages';

const hero = (lead, h1cls = 'text-[24px]') => `<section class="bg-navy pt-[84px] pb-5 text-center text-cream sm:pt-[100px] sm:pb-9">
  <div class="wrap">
    <nav class="mb-2 flex flex-wrap items-center justify-start gap-2 text-left text-[12px] sm:mb-3 sm:text-[14px] text-cream/60" aria-label="Хлебные крошки"><!-- @crumbs --></nav>
    <h1 class="rise ${h1cls} leading-[1.2] font-bold sm:text-[38px]">{{h1}}</h1>${lead ? `
    <p class="rise mx-auto mt-2 max-w-[900px] text-[14px] text-balance sm:mt-3 sm:text-[16px] leading-[1.7] font-light text-cream/75" style="--d:.1s">${lead}</p>` : ''}
  </div>
</section>`;

// ---------------- цены ----------------
const svc = readFileSync(`${APP}/model/price-list.service.ts`, 'utf8');
const mapSrc = svc.slice(svc.indexOf('export const curtainPriceMap'));
const body = mapSrc.slice(mapSrc.indexOf('{'), mapSrc.lastIndexOf('};') + 1).replace(/Unit\.LinearMeter/g, '"м.пог."').replace(/Unit\.M2/g, '"м²"').replace(/Unit\.Things/g, '"шт."');
const priceMap = Function(`return (${body})`)();
const TITLES = { 'blackout-curtains': 'Шторы блэкаут', 'roman-blinds': 'Римские шторы', 'roller-blinds': 'Рулонные шторы', 'linen-curtains': 'Льняные шторы', 'pleated-blinds': 'Шторы плиссе', 'curtain-rods': 'Карнизы для штор', blinds: 'Жалюзи' };
const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const price = (r) => (Array.isArray(r.price) ? `${money(r.price[0])}–${money(r.price[1])}` : `от ${money(r.price)}`) + ` ₽/${r.unit}`;
const width = (r) => (r.width == null ? '—' : [].concat(r.width).map((w) => String(w).replace('.', ',')).join('–'));
const years = (n) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'год' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'года' : 'лет'}`;

const keys = Object.keys(TITLES);
const tabs = keys.map((k, i) => `<button type="button" role="tab" id="tab-${k}" aria-controls="panel-${k}" aria-selected="${i === 0}" data-tab="${k}" class="rounded-[2px] border border-navy/15 bg-white px-4 py-2.5 text-[14px] font-bold transition-colors hover:border-gold aria-selected:border-navy aria-selected:bg-navy aria-selected:text-gold">${TITLES[k]}</button>`).join('\n        ');
const panels = keys.map((k, i) => {
  const rows = priceMap[k];
  return `<div role="tabpanel" id="panel-${k}" aria-labelledby="tab-${k}"${i ? ' hidden' : ''} data-tab-panel>
        <div class="hidden overflow-hidden rounded-[4px] border border-navy/8 bg-white shadow-[0_2px_20px_rgb(13_34_61/.06)] md:block">
          <table class="w-full text-left text-[14px]">
            <thead class="bg-navy text-cream"><tr class="[&>th]:px-6 [&>th]:py-4 [&>th]:text-[12px] [&>th]:font-bold [&>th]:tracking-[.12em] [&>th]:uppercase">
              <th scope="col">Материал / модель</th><th scope="col">Производство</th><th scope="col">Ширина, м</th><th scope="col">Гарантия</th><th scope="col" class="text-right">Цена <span class="block text-[11px] font-normal tracking-normal normal-case text-cream/60">с пошивом и установкой</span></th>
            </tr></thead>
            <tbody>
              ${rows.map((r) => `<tr class="border-t border-navy/8 transition-colors hover:bg-cream/60 [&>td]:px-6 [&>td]:py-4"><th scope="row" class="px-6 py-4 font-bold">${r.name}</th><td>${r.country}</td><td>${width(r)}</td><td>${years(r.warranty)}</td><td class="text-right font-serif text-[18px] font-bold whitespace-nowrap">${price(r)}</td></tr>`).join('\n              ')}
            </tbody>
          </table>
        </div>
        <ul class="flex flex-col gap-4 md:hidden">
          ${rows.map((r) => `<li class="rounded-[4px] border border-navy/8 bg-white p-5 shadow-[0_2px_20px_rgb(13_34_61/.06)]"><p class="mb-1 tetext-[14px] font-bold">${r.name}</p><p class="mb-4 font-serif text-[22px] font-bold text-gold">${price(r)}</p><dl class="grid grid-cols-3 gap-2 border-t border-navy/10 pt-3 text-[12px] [&_dt]:text-slate/60 [&_dd]:font-bold"><div><dt>Производство</dt><dd>${r.country}</dd></div><div><dt>Ширина, м</dt><dd>${width(r)}</dd></div><div><dt>Гарантия</dt><dd>${years(r.warranty)}</dd></div></dl></li>`).join('\n          ')}
        </ul>
        <a href="{{root}}catalog/${k}/" class="mt-6 inline-flex items-center gap-2 text-[12px] font-bold tracking-[.1em] text-navy uppercase hover:text-gold">Перейти в раздел «${TITLES[k]}» →</a>
      </div>`;
}).join('\n      ');

const index = readFileSync(`${OUT}/index.html`, 'utf8');
const tiersStart = index.indexOf('<div class="grid items-start gap-6 lg:grid-cols-3">');
const tiersEnd = index.indexOf('<div class="reveal mt-16 rounded-[4px] bg-white');
const tiers = index.slice(tiersStart, tiersEnd).trim();

writeFileSync(`${OUT}/price.html`, `<!-- @header -->
<!-- Страница цен. На текущем сайте отдельной страницы /price нет (маршрут объявлен, компонента нет):
     собрано из model/price-list.service.ts (таблица — как catalog-price/price-list-brand-table) и main-price (тарифы).
     Файл сгенерирован из исходников — при правке цен перегенерировать. -->
<main>
${hero('*Цены ориентировочные. Точная стоимость — после бесплатного замера и выбора ткани.')}

<!-- ============ Цены по разделам — вкладки (правило владельца: без прокрутки, активная заметна) ============ -->
<section id="prices" class="bg-cream py-14 sm:py-20">
  <div class="wrap">
    <div class="reveal mb-10">
      <p class="eyebrow">Прайс</p>
      <h2 class="h2">Цены по <span class="text-gold italic">разделам</span></h2>
    </div>
    <div data-tabs>
      <div role="tablist" aria-label="Разделы каталога" class="mb-8 flex flex-wrap gap-2">
        ${tabs}
      </div>
      ${panels}
    </div>
  </div>
</section>

<!-- ============ Тарифы — landing-1 «Pricing», тексты main-price (копия блока главной) ============ -->
<section id="tiers" class="bg-sand py-16 sm:py-24">
  <div class="mx-auto w-full max-w-[1100px] px-5 sm:px-8">
    <div class="reveal mb-14 text-center">
      <p class="eyebrow">Стоимость</p>
      <h2 class="h2">Цены / <span class="text-gold italic">стоимость</span></h2>
      <div class="divider"><i></i></div>
    </div>
    ${tiers}
  </div>
</section>
</main>
<!-- @lead-form -->
<!-- @footer -->
`);

// ---------------- юридические тексты ----------------
const legal = (file) => {
  let s = readFileSync(file, 'utf8');
  s = s.slice(s.indexOf('<article'), s.indexOf('</article>'));
  s = s.replace(/^<article[^>]*>/, '');
  const title = s.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1].trim();
  s = s.replace(/<header[\s\S]*?<\/header>/, '');
  s = s.replace(/&#64;/g, '@').replace(/\s*\n\s*/g, ' ');
  s = s.replace(/<(p|ul|li) class="[^"]*">/g, '<$1>');
  s = s.replace(/<a href="\/" class="[^"]*">/g, '<a href="{{home}}">').replace(/<a href="https:\/\/shtorivdom.ru\/privacy-policy\/" class="[^"]*">/g, '<a href="{{root}}privacy-policy/">');
  const toc = [];
  s = s.replace(/<h4[^>]*>\s*(\d+)\.\s*([\s\S]*?)<\/h4>/g, (_, n, t) => {
    toc.push([n, t.trim()]);
    return `<h2 id="section-${n}">${n}. ${t.trim()}</h2>`;
  });
  s = s.replace(/\s*(<\/?(?:h2|p|ul|li)\b)/g, '\n      $1');
  return { title, html: s.trim(), toc };
};
const DOC = 'text-[16px] leading-[1.8] font-light text-slate [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-serif [&_h2]:text-[22px] [&_h2]:leading-snug [&_h2]:font-bold [&_h2]:text-navy sm:[&_h2]:text-[24px] [&_h2:first-child]:mt-0 [&_p]:my-3 [&_ul]:my-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:border-l-2 [&_ul]:border-gold/40 [&_ul]:pl-5 [&_strong]:font-bold [&_strong]:text-navy [&_a]:break-words [&_a]:text-navy [&_a]:underline [&_a]:decoration-gold [&_a]:underline-offset-2 [&_a:hover]:text-gold';

const pp = legal(`${APP}/pages/privacy-policy/privacy-policy-page.html`);
writeFileSync(`${OUT}/privacy-policy.html`, `<!-- @header -->
<!-- Политика конфиденциальности — текст дословно из pages/privacy-policy/privacy-policy-page.html,
     оглавление-якоря по разделам. Файл сгенерирован из исходника сайта. -->
<main>
${hero('', 'text-[30px] [overflow-wrap:anywhere] hyphens-auto')}
<section class="py-12 sm:py-16">
  <div class="wrap grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
    <aside class="lg:sticky lg:top-24">
      <nav class="rounded-[4px] border border-gold/25 bg-white px-5 py-6" aria-label="Содержание" data-toc>
        <p class="eyebrow !mb-4">Содержание</p>
        <ol class="flex flex-col text-[14px] leading-snug">
          ${pp.toc.map(([n, t]) => `<li><a href="#section-${n}" class="flex gap-2.5 border-b border-navy/5 py-2 transition-colors hover:text-gold"><span class="w-5 shrink-0 font-bold text-gold">${n}</span><span>${t}</span></a></li>`).join('\n          ')}
        </ol>
      </nav>
    </aside>
    <article class="min-w-0 rounded-[4px] bg-white px-5 py-8 shadow-[0_2px_20px_rgb(13_34_61/.06)] sm:px-12 sm:py-12">
      <p class="mb-8 border-b border-navy/10 pb-6 font-serif text-[24px] leading-tight font-bold sm:text-[32px]">${pp.title}</p>
      <div class="${DOC}">
      ${pp.html}
      </div>
    </article>
  </div>
</section>
</main>
<!-- @lead-form -->
<!-- @footer -->
`);

const sg = legal(`${APP}/pages/soglasie-na-obrabotku-personalnyh-dannyh/soglasie-na-obrabotku-personalnyh-dannyh.html`);
writeFileSync(`${OUT}/soglasie-na-obrabotku-personalnyh-dannyh.html`, `<!-- @header -->
<!-- Согласие на обработку персональных данных — текст дословно из
     pages/soglasie-na-obrabotku-personalnyh-dannyh/*.html (короткий — без оглавления). Сгенерировано из исходника сайта. -->
<main>
${hero('')}
<section class="py-12 sm:py-16">
  <div class="wrap">
    <article class="mx-auto max-w-[860px] rounded-[4px] bg-white px-5 py-8 shadow-[0_2px_20px_rgb(13_34_61/.06)] sm:px-12 sm:py-12">
      <div class="${DOC} [&_ul]:list-none">
      ${sg.html}
      </div>
      <p class="mt-10 border-t border-navy/10 pt-6 text-[14px] text-slate/70">См. также: <a href="{{root}}privacy-policy/" class="text-navy underline decoration-gold underline-offset-2 hover:text-gold">Политика конфиденциальности</a></p>
    </article>
  </div>
</section>
</main>
<!-- @lead-form -->
<!-- @footer -->
`);
console.log('ok', keys.length, 'разделов;', pp.toc.length, 'пунктов оглавления');
