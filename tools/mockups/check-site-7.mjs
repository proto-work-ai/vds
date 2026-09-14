/* Проверка интерактива перевода «оригинал 7» (mockups/tailwind/site-7/app.js).

   node tools/mockups/check-site-7.mjs [url перевода] [url оригинала]

   Одни и те же шаги выполняются в оригинале и в переводе (Chrome без окна):
   вкладки, «Prev»/«Next», точки, подпись «Page N of 10», содержимое каждой из
   10 страниц (текст и картинки), вычисленные стили активной вкладки/точки/кнопок,
   состояние «Download PDF» (оверлей, спиннер, проценты). Печатает ✓/✗. */
import { withBrowser } from './snapshot.mjs';

const url = process.argv[2] ?? 'http://localhost:4636/tailwind/site-7/';
const original = process.argv[3] ?? 'http://localhost:4537/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Снимок состояния брошюры.
const STATE = `(() => {
  const buttons = [...document.querySelectorAll('#root button')];
  const tabs = buttons.filter((b) => /^\\d+\\.\\s/.test(b.textContent.trim()));
  const label = [...document.querySelectorAll('#root div')].find((d) => !d.children.length && /^Page \\d+ of \\d+$/.test(d.textContent.trim()));
  const view = label.parentElement.nextElementSibling;
  const dots = [...view.nextElementSibling.children];
  const prev = buttons.find((b) => b.textContent.includes('Prev'));
  const next = buttons.find((b) => b.textContent.includes('Next'));
  const cs = (el, props) => Object.fromEntries(props.map((p) => [p, getComputedStyle(el)[p]]));
  const active = tabs.findIndex((t) => getComputedStyle(t).backgroundColor !== 'rgba(0, 0, 0, 0)');
  return {
    label: label.textContent.trim(),
    tab: active,
    dot: dots.findIndex((d) => d.getBoundingClientRect().width > 16),
    prevDisabled: prev.disabled,
    nextDisabled: next.disabled,
    text: view.textContent.replace(/\\s+/g, ' ').trim(),
    imgs: [...view.querySelectorAll('img')].map((i) => i.getAttribute('src')),
    height: Math.round(view.getBoundingClientRect().height),
    styles: {
      tabOn: cs(tabs[active], ['backgroundColor', 'color', 'borderTopColor']),
      tabOff: cs(tabs[active === 0 ? 1 : 0], ['backgroundColor', 'color', 'borderTopColor']),
      dotOn: cs(dots[Math.max(0, active)], ['width', 'backgroundColor']),
      prev: cs(prev, ['color', 'cursor']),
      next: cs(next, ['color', 'cursor']),
    },
  };
})()`;
const click = (expr) => `(${expr})?.click()`;
const btn = (text) => `[...document.querySelectorAll('#root button')].find((b) => b.textContent.includes(${JSON.stringify(text)}))`;
const dot = (k) => `[...[...document.querySelectorAll('#root div')].find((d) => !d.children.length && /^Page \\d+ of \\d+$/.test(d.textContent.trim())).parentElement.nextElementSibling.nextElementSibling.children][${k}]`;

const DOWNLOAD = `(() => {
  const b = [...document.querySelectorAll('#root button')].find((x) => x.getAttribute('class').includes('min-w') || x.textContent.includes('%') || x.textContent.includes('Download'));
  const ov = document.querySelector('.fixed.inset-0.z-40');
  const spinner = b.querySelector('span');
  return {
    disabled: b.disabled,
    btnText: b.textContent.trim(),
    btnColor: getComputedStyle(b).color,
    spin: spinner ? getComputedStyle(spinner).animationName + ' ' + getComputedStyle(spinner).animationDuration : null,
    overlay: !!ov,
    overlayBg: ov ? getComputedStyle(ov).backgroundColor : null,
    overlayText: ov ? ov.innerText.replace(/\\s+/g, ' ').trim() : null,
    overlayBefore: ov ? ov.nextElementSibling?.className.includes('pt-20') : null,
  };
})()`;

async function run(target) {
  return withBrowser(async (page) => {
    // Ошибки собираем с самого начала загрузки — иначе падение app.js не видно.
    await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `window.__errors = [];
        window.addEventListener('error', (e) => window.__errors.push(String(e.message) + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno));
        window.addEventListener('unhandledrejection', (e) => window.__errors.push('promise: ' + String(e.reason)));`,
    });
    await page.goto(target, 3000);
    const r = { steps: {} };
    const step = async (name, action) => {
      if (action) await page.eval(action);
      await wait(400);
      r.steps[name] = await page.eval(STATE);
    };
    await step('start');
    await step('next', click(btn('Next')));
    await step('tab10', click(btn('10. Contact')));
    await step('dot5', click(dot(4)));
    await step('prev', click(btn('Prev')));
    // Все страницы подряд — через вкладки.
    r.pages = [];
    for (let k = 0; k < 10; k++) {
      await page.eval(click(`[...document.querySelectorAll('#root button')].filter((b) => /^\\d+\\.\\s/.test(b.textContent.trim()))[${k}]`));
      await wait(300);
      const s = await page.eval(STATE);
      r.pages.push({ label: s.label, text: s.text, imgs: s.imgs, height: s.height });
    }
    await page.eval(click(btn('1. Cover')));
    await wait(300);
    // PDF: состояние через 1.5 с после нажатия.
    await page.eval(click(btn('Download PDF')));
    await wait(1500);
    r.download = await page.eval(DOWNLOAD);
    r.errors = await page.eval(`window.__errors ?? []`);
    return r;
  });
}

const [o, t] = [await run(original), await run(url)];
const j = JSON.stringify;
const pick = (s) => s && { label: s.label, tab: s.tab, dot: s.dot, prevDisabled: s.prevDisabled, nextDisabled: s.nextDisabled };

for (const [name, title] of [
  ['start', 'при загрузке: страница 1, Prev недоступна'],
  ['next', '«Next →» ведёт на страницу 2'],
  ['tab10', 'вкладка «10. Contact»: страница 10, Next недоступна'],
  ['dot5', 'пятая точка: страница 5'],
  ['prev', '«← Prev» с 5 на 4'],
]) {
  const a = t.steps[name];
  const b = o.steps[name];
  check(`${title} (состояние как в оригинале)`, j(pick(a)) === j(pick(b)) && a.text === b.text, `перевод ${j(pick(a))} / оригинал ${j(pick(b))}${a.text === b.text ? '' : ' — текст страницы отличается'}`);
}
check('стили активной/неактивной вкладки, точки, Prev/Next совпадают с оригиналом', ['start', 'tab10', 'prev'].every((k) => j(t.steps[k].styles) === j(o.steps[k].styles)), ['start', 'tab10', 'prev'].map((k) => `${k}: ${j(t.steps[k].styles)} / ${j(o.steps[k].styles)}`).join(' | '));
const badPages = t.pages.map((p, k) => (p.text === o.pages[k].text && j(p.imgs) === j(o.pages[k].imgs) && p.label === o.pages[k].label ? null : k + 1)).filter(Boolean);
check('все 10 страниц: текст, картинки и подпись как в оригинале', badPages.length === 0, `отличаются страницы ${badPages.join(', ')}`);
const badHeights = t.pages.map((p, k) => (Math.abs(p.height - o.pages[k].height) <= 1 ? null : `${k + 1}: ${p.height}/${o.pages[k].height}`)).filter(Boolean);
check('все 10 страниц: высота листа как в оригинале', badHeights.length === 0, badHeights.join(', '));
const dt = t.download;
const dor = o.download;
check('PDF: кнопка заблокирована, в ней спиннер spin 0.8s и проценты', dt.disabled && dt.spin === dor.spin && /%$/.test(dt.btnText) && dt.btnColor === dor.btnColor, `перевод ${j(dt)} / оригинал ${j(dor)}`);
check('PDF: оверлей «Generating Your PDF» как в оригинале', dt.overlay && dt.overlayBg === dor.overlayBg && dt.overlayBefore === dor.overlayBefore && dt.overlayText?.replace(/\d+/g, 'N') === dor.overlayText?.replace(/\d+/g, 'N'), `перевод ${j(dt)} / оригинал ${j(dor)}`);
check('нет ошибок скрипта', t.errors.length === 0, j(t.errors));

for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `  — ${r.detail}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `не прошло: ${failed} из ${results.length}` : `все ${results.length} проверок прошли`);
process.exitCode = failed ? 1 : 0;
