/* Проверка прототипа сайта mockups/site/ в Chrome без окна (через snapshot.mjs).

   node tools/mockups/check-site.mjs [http://localhost:4320/site/]

   1. Обход всех страниц: от главной по ссылкам внутри site/ — каждая открывается
      без 404 (документ и ресурсы), без ошибок в консоли и исключений JS.
   2. Главная, 375px: мобильное меню открывается и закрывается.
   3. Главная, 1440px: форма (пустой телефон → ошибка, заполненный + согласие → «Спасибо»),
      FAQ открывает/закрывает, прайс в карточках каталога, слайдер отзывов, до/после тянется.
   Печатает ✓/✗ по пунктам, код выхода 1 при любой ошибке.
   При EBUSY на DevToolsActivePort (параллельный Chrome) — просто повторить. */
import { withBrowser } from './snapshot.mjs';

const START = process.argv[2] ?? 'http://localhost:4320/site/';
const BASE = new URL(START);
let failed = 0;
const ok = (cond, text) => {
  if (!cond) failed++;
  console.log(`${cond ? '✓' : '✗'} ${text}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await withBrowser(async (page) => {
  const errors = [];
  let docStatus = 0;
  let current = '';
  // Слушаем события CDP через протокол: подписка на все сообщения сессии.
  await page.send('Log.enable');
  await page.send('Network.enable');
  const origSend = page.send;
  // snapshot.mjs не отдаёт слушатель наружу — ловим через Runtime.evaluate-перехват ошибок в странице
  // и через Network.getResponseBody не пойти; поэтому ошибки собираем в самой странице.
  const INSTALL = `(() => {
    window.__errs = [];
    addEventListener('error', (e) => window.__errs.push((e.target && e.target !== window && (e.target.src || e.target.href)) ? 'ресурс не загрузился: ' + (e.target.src || e.target.href) : 'JS: ' + e.message), true);
    addEventListener('unhandledrejection', (e) => window.__errs.push('promise: ' + e.reason));
    const ce = console.error; console.error = (...a) => { window.__errs.push('console.error: ' + a.join(' ')); ce(...a); };
  })()`;
  await origSend('Page.addScriptToEvaluateOnNewDocument', { source: INSTALL });

  // ---------- 1. обход ----------
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  const queue = [START];
  const seen = new Set(queue);
  const pages = [];
  while (queue.length) {
    const url = queue.shift();
    current = url;
    const status = await fetch(url).then((r) => r.status).catch(() => 0);
    await page.goto(url, 1500);
    const info = await page.eval(`(async () => {
      // ресурсы (img, script, css): проверяем HEAD-запросом каждую уникальную ссылку
      const urls = new Set([...document.querySelectorAll('img[src], script[src], link[rel=stylesheet][href]')].map((el) => el.src || el.href).filter((u) => u.startsWith(location.origin)));
      const bad = [];
      for (const u of urls) { const r = await fetch(u, { method: 'HEAD' }); if (!r.ok) bad.push(r.status + ' ' + u); }
      const imgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && !i.loading).map((i) => i.src);
      return {
        links: [...document.querySelectorAll('a[href]')].map((a) => a.href),
        bad, errs: window.__errs || [], title: document.title,
        h1: document.querySelector('h1')?.textContent.trim(),
        tw: getComputedStyle(document.body).fontFamily,
      };
    })()`);
    const problems = [...(status === 200 ? [] : [`HTTP ${status}`]), ...info.bad, ...info.errs];
    ok(problems.length === 0, `${url.replace(BASE.origin, '')} — «${info.h1}»${problems.length ? '\n    ' + problems.join('\n    ') : ''}`);
    pages.push(url);
    for (const href of info.links) {
      const u = new URL(href);
      u.hash = '';
      if (u.origin !== BASE.origin || !u.pathname.startsWith(BASE.pathname)) continue;
      if (!seen.has(u.href)) { seen.add(u.href); queue.push(u.href); }
    }
  }
  ok(pages.length >= 16, `обойдено страниц: ${pages.length}`);

  // ---------- 2. мобильное меню ----------
  await page.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
  await page.goto(START, 1500);
  const menu = await page.eval(`(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms));
    const b = document.querySelector('[data-burger]'), m = document.querySelector('[data-mobile-menu]');
    const h0 = m.getBoundingClientRect().height, visible0 = getComputedStyle(b).display !== 'none';
    b.click(); await s(500);
    const h1 = m.getBoundingClientRect().height;
    document.querySelector('[data-sub-toggle]').click(); await s(500);
    const sub = document.querySelector('[data-sub]').getBoundingClientRect().height;
    const h2 = m.getBoundingClientRect().height;
    b.click(); await s(500);
    return { visible0, h0, h1, sub, h2, h3: m.getBoundingClientRect().height, exp: b.getAttribute('aria-expanded') };
  })()`);
  // У панели рамка сверху 1px — закрытая панель имеет высоту ≤ 1.
  ok(menu.visible0 && menu.h0 <= 1 && menu.h1 > 200, `мобильное меню открывается (бургер виден, высота ${Math.round(menu.h0)} → ${Math.round(menu.h1)}px)`);
  ok(menu.sub > 100 && menu.h2 > menu.h1, `подменю «Каталог» раскрывается (${Math.round(menu.sub)}px)`);
  ok(menu.h3 <= 1 && menu.exp === 'false', `мобильное меню закрывается (высота ${Math.round(menu.h3)})`);

  // ---------- 3. интерактив главной ----------
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.goto(START, 1500);
  const r = await page.eval(`(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms));
    const $ = (q, root = document) => root.querySelector(q);
    const out = {};
    // шапка меняет вид при прокрутке
    out.headerTop = $('[data-header]').classList.contains('is-solid');
    scrollTo(0, 400); await s(300);
    out.headerScrolled = $('[data-header]').classList.contains('is-solid');
    // форма: пустой телефон
    const form = $('#lead [data-lead-form]');
    form.requestSubmit(); await s(100);
    out.emptyErr = !$('[data-error="phone"]', form).classList.contains('hidden') && !!$('#lead [data-lead-form]');
    const ph = $('[data-phone]', form);
    ph.value = '9255946117'; ph.dispatchEvent(new Event('input', { bubbles: true }));
    out.masked = ph.value;
    out.consentDefault = $('[data-consent]', form).checked;
    $('[data-consent]', form).checked = false;
    form.requestSubmit(); await s(100);
    out.consentErr = !$('[data-error="consent"]', form).classList.contains('hidden') && !!$('#lead [data-lead-form]');
    $('[data-consent]', form).click();
    form.requestSubmit(); await s(500);
    out.thanks = $('#lead [data-thanks]')?.textContent.trim();
    out.formGone = !$('#lead [data-lead-form]');
    // FAQ
    const qs = [...document.querySelectorAll('[data-faq-q]')];
    qs[2].click(); await s(450);
    out.faqOpen = qs[2].nextElementSibling.getBoundingClientRect().height;
    qs[3].click(); await s(450);
    out.faqSwitch = [qs[2].nextElementSibling.getBoundingClientRect().height, qs[3].nextElementSibling.getBoundingClientRect().height];
    qs[3].click(); await s(450);
    out.faqClosed = qs[3].nextElementSibling.getBoundingClientRect().height;
    // каталог: прайс в карточках виден всегда
    out.prices = [...document.querySelectorAll("[data-svc]")].map((card) => card.querySelectorAll("li").length);
    out.toggles = document.querySelectorAll("[data-svc-btn]").length;
    // отзывы
    const sl = $('[data-slider]');
    const idx = () => [...sl.querySelectorAll('[data-dot] .dot')].findIndex((d) => d.classList.contains('is-on'));
    // Автосмена раз в 5.2 с могла уже сработать — считаем от текущего слайда.
    sl.querySelectorAll('[data-dot]')[0].click(); await s(50); out.start = idx();
    $('[data-next]', sl).click(); await s(50); out.next = idx();
    sl.querySelectorAll('[data-dot]')[2].click(); await s(50); out.dot = idx();
    $('[data-prev]', sl).click(); await s(500); out.prev = idx();
    out.quote = $('[data-quote]', sl).textContent;
    // до/после
    const c = $('[data-compare]');
    // У html scroll-behavior: smooth — прокручиваем мгновенно, иначе координаты «посреди полёта».
    c.scrollIntoView({ block: 'center', behavior: 'instant' }); await s(900);
    const rc = c.getBoundingClientRect();
    return { ...out, compare: [rc.left, rc.top, rc.width, rc.height] };
  })()`);
  ok(!r.headerTop && r.headerScrolled, 'шапка: прозрачная наверху, тёмная после прокрутки');
  ok(r.emptyErr, 'форма: пустой телефон → ошибка «Введите номер телефона полностью»');
  ok(r.masked === '+7 (925) 594-61-17', `форма: маска телефона → ${r.masked}`);
  ok(r.consentDefault, 'форма: согласие отмечено по умолчанию');
  ok(r.consentErr, 'форма: без согласия → ошибка согласия');
  ok(r.formGone && /Спасибо/.test(r.thanks ?? ''), `форма: заполнено → «${r.thanks}»`);
  ok(r.faqOpen > 20, `FAQ: вопрос открывается (${Math.round(r.faqOpen)}px)`);
  ok(r.faqSwitch[0] === 0 && r.faqSwitch[1] > 20, 'FAQ: открыт один ответ — предыдущий закрылся');
  ok(r.faqClosed === 0, 'FAQ: повторный клик закрывает');
  ok(r.prices.length === 7 && r.prices.every((n) => n >= 3) && r.toggles === 0, `каталог: прайс виден во всех карточках без «Подробнее» (${r.prices.join("/")})`);
  ok(r.start === 0 && r.next === 1 && r.dot === 2 && r.prev === 1, `отзывы: точка 1 → 1, вперёд → 2, точка → 3, назад → 2 (${r.start + 1}/${r.next + 1}/${r.dot + 1}/${r.prev + 1})`);

  // до/после: настоящие события мыши через CDP
  const [x, y, w, h] = r.compare;
  const mouse = (type, mx) => page.send('Input.dispatchMouseEvent', { type, x: mx, y: y + h / 2, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1 });
  await mouse('mousePressed', x + w * 0.5);
  for (const k of [0.45, 0.35, 0.25, 0.2]) await mouse('mouseMoved', x + w * k);
  await mouse('mouseReleased', x + w * 0.2);
  await sleep(100);
  const pos1 = await page.eval(`[document.querySelector('[data-compare]').dataset.pos, document.querySelector('[data-compare-after]').style.clipPath]`);
  await mouse('mousePressed', x + w * 0.2);
  await mouse('mouseMoved', x + w * 0.8);
  await mouse('mouseReleased', x + w * 0.8);
  await sleep(100);
  const pos2 = await page.eval(`document.querySelector('[data-compare]').dataset.pos`);
  ok(Math.abs(Number(pos1[0]) - 20) < 2 && Math.abs(Number(pos2) - 80) < 2, `до/после тянется: 50% → ${pos1[0]}% → ${pos2}% (${pos1[1]})`);

  const errs = await page.eval('window.__errs');
  ok(errs.length === 0, `главная после взаимодействия: ошибок в консоли нет${errs.length ? '\n    ' + errs.join('\n    ') : ''}`);

  // ---------- 4. каталог ----------
  const CAT = new URL('catalog/', START).href;
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.goto(CAT, 1500);
  const list = await page.eval(`[...document.querySelectorAll('[data-catalog-card]')].map((a) => a.pathname)`);
  const keys = ['blackout-curtains', 'roman-blinds', 'roller-blinds', 'linen-curtains', 'pleated-blinds', 'curtain-rods', 'blinds'];
  ok(list.length === 7 && keys.every((k) => list.some((p) => p.endsWith(`/catalog/${k}/`))), `каталог: 7 карточек ведут на разделы (${list.length})`);
  for (const k of keys) {
    await page.goto(`${CAT}${k}/`, 1200);
    const s = await page.eval(`(() => ({
      rows: document.querySelectorAll('[data-price-table] tbody tr').length,
      cards: document.querySelectorAll('[data-price-cards] > *').length,
      blocks: document.querySelectorAll('[data-detail] article').length,
      items: document.querySelectorAll('[data-detail] li').length,
      faq: document.querySelectorAll('[data-faq-q]').length,
      shots: document.querySelectorAll('[data-strip] [data-gallery-item]').length,
      crumbs: [...document.querySelectorAll('nav[aria-label="Хлебные крошки"] > *')].map((e) => e.textContent.trim()).filter((t) => t !== '/').join(' → '),
      models: document.querySelectorAll('[data-model-card]').length,
    }))()`);
    ok(s.rows === 3 && s.cards === 3 && s.blocks >= 3 && s.items >= 8 && s.faq === 5 && s.shots >= 3 && s.crumbs === `Главная → Каталог → ${s.crumbs.split(' → ')[2]}` && (k !== 'curtain-rods' || s.models === 9),
      `${k}: цены ${s.rows}/${s.cards}, блоков ${s.blocks}, пунктов ${s.items}, FAQ ${s.faq}, фото ${s.shots}${k === 'curtain-rods' ? ', моделей ' + s.models : ''} (${s.crumbs})`);
  }
  // аккордеон и таблица → карточки на телефоне
  await page.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
  await page.goto(`${CAT}roman-blinds/`, 1500);
  const mob = await page.eval(`(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms));
    const vis = (q) => { const el = document.querySelector(q); return !!el && el.getBoundingClientRect().height > 0; };
    const q = document.querySelectorAll('[data-faq-q]');
    q[0].click(); await s(450);
    const open = q[0].nextElementSibling.getBoundingClientRect().height;
    q[0].click(); await s(450);
    return { table: vis('[data-price-table]'), cards: vis('[data-price-cards]'), open, closed: q[0].nextElementSibling.getBoundingClientRect().height };
  })()`);
  ok(!mob.table && mob.cards, 'раздел, 375px: цены карточками вместо таблицы');
  ok(mob.open > 20 && mob.closed === 0, `раздел: FAQ открывается и закрывается (${Math.round(mob.open)}px)`);

  // галерея модели карниза: открыть, листать, закрыть
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.goto(`${CAT}curtain-rods/`, 1200);
  const firstModel = await page.eval(`document.querySelector('[data-model-card]').href`);
  await page.goto(firstModel, 1500);
  const g = await page.eval(`(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms));
    const lb = document.querySelector('[data-lightbox]');
    const isOpen = () => lb.classList.contains('is-open') && getComputedStyle(lb).visibility === 'visible';
    const out = { h1: document.querySelector('h1').textContent.trim(), before: isOpen() };
    document.querySelector('[data-model-gallery] [data-gallery-item]').click(); await s(400);
    out.open = isOpen(); out.i0 = lb.dataset.index; out.src0 = lb.querySelector('img').getAttribute('src');
    lb.querySelector('[data-lb-next]').click(); await s(400);
    out.i1 = lb.dataset.index; out.src1 = lb.querySelector('img').getAttribute('src');
    dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' })); await s(400);
    out.i2 = lb.dataset.index;
    out.loaded = lb.querySelector('img').naturalWidth > 0;
    dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); await s(400);
    out.closedEsc = !isOpen();
    document.querySelector('[data-model-gallery] [data-gallery-item]').click(); await s(400);
    lb.querySelector('[data-lb-close]').click(); await s(400);
    out.closedBtn = !isOpen();
    out.back = [...document.querySelectorAll('nav[aria-label="Хлебные крошки"] a')].map((a) => a.pathname);
    return out;
  })()`);
  ok(!g.before && g.open && g.i0 === '0', `модель «${g.h1}»: галерея открывается`);
  ok(g.i1 === '1' && g.src1 !== g.src0 && g.i2 === '0' && g.loaded, `модель: листается кнопкой и стрелкой (${g.i0} → ${g.i1} → ${g.i2}), фото загружено`);
  ok(g.closedEsc && g.closedBtn, 'модель: галерея закрывается по Escape и крестиком');
  ok(g.back.some((p) => p.endsWith('/catalog/curtain-rods/')), 'модель: крошки ведут в раздел «Карнизы»');
  const errsCat = await page.eval('window.__errs');
  ok(errsCat.length === 0, `каталог после взаимодействия: ошибок в консоли нет${errsCat.length ? '\n    ' + errsCat.join('\n    ') : ''}`);

  // ---------- 5. страницы этапа 2: цены, услуги, о нас, партнёрам, контакты, документы ----------
  const S2 = ['price', 'services', 'about', 'partner', 'contact', 'privacy-policy', 'soglasie-na-obrabotku-personalnyh-dannyh'];
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  for (const p of S2) {
    await page.goto(new URL(`${p}/`, START).href, 1200);
    const s = await page.eval(`({ stub: document.body.textContent.includes('Заготовка страницы'), solid: document.querySelector('header[data-header]').classList.contains('is-solid'), lead: !!document.querySelector('#lead'), h1: document.querySelector('h1').textContent.trim() })`);
    ok(!s.stub && s.solid && s.lead, `${p}: не заготовка, шапка тёмная сразу, есть #lead («${s.h1}»)`);
  }

  // цены: вкладки
  const PRICE = new URL('price/', START).href;
  await page.goto(PRICE, 1500);
  const t = await page.eval(`(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms));
    const tabs = [...document.querySelectorAll('[data-tabs] [role=tab]')];
    const shown = () => [...document.querySelectorAll('[data-tab-panel]')].filter((p) => !p.hidden).map((p) => p.id);
    const sel = () => tabs.filter((b) => b.getAttribute('aria-selected') === 'true').map((b) => b.dataset.tab);
    const out = { n: tabs.length, start: [sel(), shown()], rows: [...document.querySelectorAll('[data-tab-panel]')].map((p) => p.querySelectorAll('tbody tr').length) };
    tabs[3].click(); await s(100);
    out.click = [sel(), shown(), location.hash, getComputedStyle(tabs[3]).backgroundColor, getComputedStyle(tabs[0]).backgroundColor];
    tabs[3].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); await s(100);
    out.arrow = [sel(), document.activeElement === tabs[4]];
    return out;
  })()`);
  ok(t.n === 7 && t.start[0].join() === 'blackout-curtains' && t.start[1].join() === 'panel-blackout-curtains', `цены: 7 вкладок, открыта первая (${t.start[1]})`);
  ok(t.rows.every((n) => n === 3), `цены: в каждой вкладке по 3 строки (${t.rows.join('/')})`);
  ok(t.click[0].join() === 'linen-curtains' && t.click[1].join() === 'panel-linen-curtains' && t.click[2] === '#linen-curtains' && t.click[3] !== t.click[4], `цены: клик переключает вкладку, одна панель, активная отличается цветом (${t.click[3]} ≠ ${t.click[4]})`);
  ok(t.arrow[0].join() === 'pleated-blinds' && t.arrow[1], 'цены: стрелка → переключает на следующую вкладку и фокус');
  await page.goto(PRICE + '#blinds', 1500);
  const byHash = await page.eval(`[...document.querySelectorAll('[data-tab-panel]')].filter((p) => !p.hidden).map((p) => p.id).join()`);
  ok(byHash === 'panel-blinds', `цены: адрес #blinds открывает вкладку «Жалюзи» (${byHash})`);
  await page.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
  await page.goto(PRICE, 1500);
  const pm = await page.eval(`(() => { const l = document.querySelector('[role=tablist]'); const p = document.querySelector('#panel-blackout-curtains');
    return { fit: l.scrollWidth <= l.clientWidth && [...l.children].every((b) => b.getBoundingClientRect().right <= innerWidth), table: p.querySelector('table').getBoundingClientRect().height, cards: p.querySelectorAll('ul > li').length && p.querySelector('ul').getBoundingClientRect().height }; })()`);
  ok(pm.fit && pm.table === 0 && pm.cards > 0, 'цены, 375px: вкладки переносятся без прокрутки, таблица → карточки');

  // формы на страницах этапа 2
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  for (const p of ['price', 'services', 'about', 'partner', 'contact', 'privacy-policy']) {
    await page.goto(new URL(`${p}/`, START).href, 1200);
    const f = await page.eval(`(async () => {
      const s = (ms) => new Promise((r) => setTimeout(r, ms));
      const box = document.querySelector('#lead'); const form = box.querySelector('[data-lead-form]');
      form.requestSubmit(); await s(100);
      const err = !box.querySelector('[data-error="phone"]').classList.contains('hidden');
      const ph = form.querySelector('[data-phone]'); ph.value = '9255946117'; ph.dispatchEvent(new Event('input', { bubbles: true }));
      const cdef = form.querySelector('[data-consent]').checked; form.querySelector('[data-consent]').checked = false;
      form.requestSubmit(); await s(100);
      const cerr = !box.querySelector('[data-error="consent"]').classList.contains('hidden');
      form.querySelector('[data-consent]').click(); form.requestSubmit(); await s(500);
      return { err, cerr: cerr && cdef, fields: [...form.elements].map((e) => e.name).filter(Boolean).join(','), thanks: !!box.querySelector('[data-thanks]') && !box.querySelector('[data-lead-form]') };
    })()`);
    ok(f.err && f.cerr && f.thanks, `${p}: форма — ошибка телефона, ошибка согласия, «Спасибо» (${f.fields})`);
  }

  // политика: оглавление-якоря
  await page.goto(new URL('privacy-policy/', START).href, 1500);
  const toc = await page.eval(`(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms));
    const links = [...document.querySelectorAll('[data-toc] a')];
    const missing = links.filter((a) => !document.getElementById(a.hash.slice(1))).map((a) => a.hash);
    links[7].click(); await s(1200);
    const r = document.getElementById(links[7].hash.slice(1)).getBoundingClientRect();
    return { n: links.length, missing, hash: location.hash, top: Math.round(r.top), y: Math.round(scrollY), text: document.getElementById(links[7].hash.slice(1)).textContent.trim() };
  })()`);
  ok(toc.n === 12 && toc.missing.length === 0, `политика: 12 пунктов оглавления, все якоря есть${toc.missing.length ? ' — нет: ' + toc.missing : ''}`);
  ok(toc.hash === '#section-8' && toc.y > 1000 && toc.top >= 60 && toc.top < 200, `политика: клик по п. 8 прокручивает к «${toc.text}» (top ${toc.top}px, шапка не закрывает)`);
  const errsS2 = await page.eval('window.__errs');
  ok(errsS2.length === 0, `страницы этапа 2 после взаимодействия: ошибок в консоли нет${errsS2.length ? '\n    ' + errsS2.join('\n    ') : ''}`);
});

console.log(failed ? `не прошло: ${failed}` : 'все проверки прошли');
process.exitCode = failed ? 1 : 0;
