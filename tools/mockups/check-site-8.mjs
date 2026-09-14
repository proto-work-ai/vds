/* Проверка интерактива перевода «оригинал 8» (mockups/tailwind/site-8/app.js).

   node tools/mockups/check-site-8.mjs [translationUrl] [originalUrl]

   Открывает перевод и оригинал в Chrome без окна, прогоняет на обоих одни и те же
   сценарии и сверяет результат: заставка, появление текста первого экрана,
   счётчики, шапка после прокрутки, кнопка «наверх», мобильное меню, FAQ и форма.
   Печатает ✓/✗ по каждому пункту. */
import { withBrowser } from './snapshot.mjs';

const twUrl = process.argv[2] ?? 'http://localhost:4648/tailwind/site-8/';
const origUrl = process.argv[3] ?? 'http://localhost:4548/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const wait = (page, ms) => page.eval(`new Promise((r) => setTimeout(r, ${ms}))`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Сценарии пишутся без опоры на классы: оригинал задаёт стили инлайном, перевод — классами.
const SCENARIO = {
  intro: `(() => {
    const el = [...document.querySelectorAll('div')].find((d) => getComputedStyle(d).position === 'fixed' && getComputedStyle(d).zIndex === '200');
    const h = document.querySelector('section#home h1').parentElement;
    return { overlay: !!el, heroOpacity: Number(getComputedStyle(h).opacity) };
  })()`,
  counters: `(() => [...document.querySelector('section#home').nextElementSibling.querySelectorAll('.text-center > div:first-child')].map((d) => d.textContent))()`,
  header: `(() => { const s = getComputedStyle(document.querySelector('header')); return { bg: s.backgroundColor, pad: s.paddingTop, border: s.borderBottomWidth + ' ' + s.borderBottomStyle }; })()`,
  back: `(() => { const b = document.querySelector('button[aria-label="Back to top"]'); if (!b) return { present: false }; const r = b.getBoundingClientRect(); return { present: true, visible: r.width > 0 && getComputedStyle(b).opacity > 0.5 }; })()`,
  menu: `(async () => {
    const h = document.querySelector('header');
    const btn = [...h.querySelectorAll('button')].at(-1);
    const icon = () => btn.querySelector('svg').getAttribute('class').match(/lucide-(\\w+)/)[1];
    const before = { icon: icon(), visible: btn.getBoundingClientRect().width > 0 };
    btn.click();
    await new Promise((r) => setTimeout(r, 700));
    const panel = h.lastElementChild;
    const links = [...panel.querySelectorAll('a')].map((a) => a.textContent.trim() + '→' + a.getAttribute('href'));
    const opened = { icon: icon(), links, height: Math.round(panel.getBoundingClientRect().height), bg: getComputedStyle(panel).backgroundColor };
    panel.querySelector('a[href="#about"]').click();
    await new Promise((r) => setTimeout(r, 700));
    const closed = { icon: icon(), panel: h.children.length };
    return { before, opened, closed };
  })()`,
  faq: `(async () => {
    const btns = [...document.querySelectorAll('button')].filter((b) => /\\?$/.test(b.textContent.trim()) && b.closest('.space-y-2'));
    const state = () => btns.map((b) => {
      const item = b.parentElement;
      const panel = item.children[1];
      return { open: !!panel, icon: b.querySelector('svg').getAttribute('class').match(/lucide-(\\w+)/)[1], text: panel?.textContent.trim() ?? null, h: panel ? Math.round(panel.getBoundingClientRect().height) : 0 };
    });
    const s0 = state();
    btns[0].click();
    await new Promise((r) => setTimeout(r, 600));
    const s1 = state();
    btns[2].click();
    await new Promise((r) => setTimeout(r, 600));
    const s2 = state();
    btns[2].click();
    await new Promise((r) => setTimeout(r, 600));
    const s3 = state();
    return { count: btns.length, s0, s1, s2, s3 };
  })()`,
  form: `(async () => {
    window.__marker = 'still-here';
    const f = document.querySelector('section#contact form');
    for (const el of f.querySelectorAll('input, textarea')) el.value = el.type === 'email' ? 'test@example.com' : 'Проверка';
    f.querySelector('select').selectedIndex = 1;
    f.querySelector('button[type=submit]').click();
    await new Promise((r) => setTimeout(r, 800));
    return window.__marker === 'still-here' && location.search === '';
  })()`,
};

async function run(url) {
  return withBrowser(async (page) => {
    // Ошибки собираем с самого начала загрузки — иначе падение app.js не видно.
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errors = [];
        window.addEventListener('error', (e) => window.__errors.push(String(e.message) + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno));
        window.addEventListener('unhandledrejection', (e) => window.__errors.push('promise: ' + String(e.reason)));
        // Заставка живёт 2,3–2,8 с, а load с внешними картинками бывает позже — время
        // появления/ухода заставки и прозрачность текста в 1 с пишем с начала загрузки.
        window.__intro = {};
        new MutationObserver(() => {
          const el = [...document.querySelectorAll('div')].find((d) => d.className && String(d.className).includes('z-[200]') && !d.closest('[hidden]'));
          if (el && window.__intro.shown == null) window.__intro.shown = Math.round(performance.now());
          if (!el && window.__intro.shown != null && window.__intro.gone == null) window.__intro.gone = Math.round(performance.now());
        }).observe(document, { childList: true, subtree: true });
        setTimeout(() => {
          const h = document.querySelector('section#home h1')?.parentElement;
          window.__intro.heroAt1s = h ? Number(getComputedStyle(h).opacity) : null;
        }, 1000);`,
    });
    const r = {};
    await page.goto(url, 400);
    r.countersEarly = await page.eval(SCENARIO.counters);
    await wait(page, 3600);
    // Время ухода заставки записано наблюдателем — читаем, когда она уже точно ушла.
    r.introEarly = await page.eval(`window.__intro`);
    r.introLate = await page.eval(SCENARIO.intro);
    r.headerTop = await page.eval(SCENARIO.header);
    r.backTop = await page.eval(SCENARIO.back);
    await page.eval(`window.scrollTo(0, document.querySelector('section#home').offsetHeight - 100)`);
    await wait(page, 2600);
    r.countersLate = await page.eval(SCENARIO.counters);
    r.headerScrolled = await page.eval(SCENARIO.header);
    r.backScrolled = await page.eval(SCENARIO.back);
    await page.eval(`document.querySelector('button[aria-label="Back to top"]').click()`);
    await wait(page, 1500);
    r.afterBackClick = await page.eval(`({ y: Math.round(window.scrollY) })`);
    await wait(page, 700);
    r.backHiddenAgain = await page.eval(SCENARIO.back);
    r.faq = await page.eval(SCENARIO.faq);
    r.form = await page.eval(SCENARIO.form);
    await page.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await page.eval(`window.scrollTo(0, 0)`);
    await wait(page, 800);
    r.menu = await page.eval(SCENARIO.menu);
    r.errors = await page.eval(`window.__errors ?? []`);
    return r;
  });
}

const tw = await run(twUrl);
const orig = await run(origUrl);

// Оригинал: заставка с первого кадра, exit начинается на 2300 мс и длится 0,5 с.
const introOk = (i) => i.shown != null && i.gone != null && i.gone - i.shown > 2000 && i.heroAt1s < 0.1;
check('заставка: показ, уход через ~2,8 с, текст первого экрана скрыт в 1 с', introOk(tw.introEarly) && introOk(orig.introEarly), `${JSON.stringify(tw.introEarly)} / оригинал ${JSON.stringify(orig.introEarly)}`);
check('заставка уходит, текст первого экрана появляется (как в оригинале)', !tw.introLate.overlay && tw.introLate.heroOpacity === 1 && same(tw.introLate, orig.introLate), `${JSON.stringify(tw.introLate)} / оригинал ${JSON.stringify(orig.introLate)}`);
check('счётчики до прокрутки на нуле', same(tw.countersEarly, orig.countersEarly), `${tw.countersEarly} / оригинал ${orig.countersEarly}`);
check('счётчики досчитывают до значений оригинала', same(tw.countersLate, orig.countersLate), `${tw.countersLate} / оригинал ${orig.countersLate}`);
check('шапка наверху — как в оригинале', same(tw.headerTop, orig.headerTop), `${JSON.stringify(tw.headerTop)} / ${JSON.stringify(orig.headerTop)}`);
check('шапка после прокрутки — как в оригинале', same(tw.headerScrolled, orig.headerScrolled), `${JSON.stringify(tw.headerScrolled)} / ${JSON.stringify(orig.headerScrolled)}`);
check('«наверх» скрыта наверху страницы', !tw.backTop.visible && !orig.backTop.visible, `${JSON.stringify(tw.backTop)} / ${JSON.stringify(orig.backTop)}`);
check('«наверх» появляется после прокрутки', tw.backScrolled.visible && orig.backScrolled.visible, `${JSON.stringify(tw.backScrolled)} / ${JSON.stringify(orig.backScrolled)}`);
check('«наверх» прокручивает к началу и прячется', tw.afterBackClick.y === 0 && !tw.backHiddenAgain.visible, `${JSON.stringify(tw.afterBackClick)} ${JSON.stringify(tw.backHiddenAgain)}`);
check('FAQ: сначала все закрыты', tw.faq.count === 6 && same(tw.faq.s0, orig.faq.s0), JSON.stringify(tw.faq.s0));
check('FAQ: открытие первого — текст, иконка и высота как в оригинале', same(tw.faq.s1, orig.faq.s1), `${JSON.stringify(tw.faq.s1[0])} / ${JSON.stringify(orig.faq.s1[0])}`);
check('FAQ: открытие третьего закрывает первый', same(tw.faq.s2, orig.faq.s2), `${JSON.stringify(tw.faq.s2.slice(0, 3))} / ${JSON.stringify(orig.faq.s2.slice(0, 3))}`);
check('FAQ: повторный клик закрывает', same(tw.faq.s3, orig.faq.s3), JSON.stringify(tw.faq.s3.slice(0, 3)));
check('форма: отправка не перезагружает страницу', tw.form && orig.form, `${tw.form} / ${orig.form}`);
check('мобильное меню: кнопка видна, иконка «menu»', tw.menu.before.visible && same(tw.menu.before, orig.menu.before), JSON.stringify(tw.menu.before));
check('мобильное меню: открыто — пункты, высота, фон и крестик как в оригинале', same(tw.menu.opened, orig.menu.opened), `${JSON.stringify(tw.menu.opened)} / ${JSON.stringify(orig.menu.opened)}`);
check('мобильное меню: клик по пункту закрывает', same(tw.menu.closed, orig.menu.closed), `${JSON.stringify(tw.menu.closed)} / ${JSON.stringify(orig.menu.closed)}`);
check('нет ошибок скрипта', tw.errors.length === 0, JSON.stringify(tw.errors));

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не прошло: ${failed} из ${results.length}` : `все ${results.length} проверок прошли`);
process.exitCode = failed ? 1 : 0;
