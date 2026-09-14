/* Проверка лендинга «Карина» (mockups/tailwind/site-10) против макета template-01.jpg.

   node tools/mockups/check-karina.mjs [outDir]

   Нужен сервер макетов на http://localhost:4320 (раздаёт папку mockups).
   Печатает ✓/✗; в outDir кладёт снимок 1920 по всей высоте и склейки
   «макет | вёрстка» по фрагментам — для сравнения глазами. */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { withBrowser } from './snapshot.mjs';

const BASE = 'http://localhost:4320';
const URL_ = `${BASE}/tailwind/site-10/`;
const out = process.argv[2] ?? path.join(process.cwd(), 'tmp', 'check-karina');
mkdirSync(out, { recursive: true });

let fails = 0;
const check = (ok, name, extra = '') => {
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await withBrowser(async (page) => {
  // В snapshot.mjs нет публичной подписки на события — ошибки собираем на самой странице,
  // а статусы ресурсов проверяем запросами HEAD.
  const setSize = (w, h = 900) =>
    page.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
  const scrollAll = () =>
    page.eval(`(async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.documentElement.scrollHeight;y+=400){scrollTo(0,y);await s(60)}scrollTo(0,0);await s(900);return document.documentElement.scrollHeight})()`);

  // Ошибки ресурсов и скриптов перехватываем до загрузки страницы
  await page.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `window.__errs=[];addEventListener('error',e=>{__errs.push((e.target&&(e.target.src||e.target.href))||e.message)},true);
      const ce=console.error;console.error=(...a)=>{__errs.push(a.join(' '));ce(...a)};`,
  });

  await setSize(1920);
  await page.goto(URL_, 3000);
  const height = await scrollAll();

  // --- ошибки и 404 ---
  const errs = await page.eval(`window.__errs`);
  const resources = await page.eval(`(async()=>{const urls=[...new Set([...document.images].map(i=>i.currentSrc||i.src).concat(document.querySelector('script[src$="app.js"]').src))];
    const r=[];for(const u of urls){const s=(await fetch(u,{method:'HEAD'})).status;if(s>=400)r.push(u+' '+s)}return {n:urls.length,bad:r}})()`);
  const broken = await page.eval(`[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&i.naturalWidth===0).map(i=>i.src)`);
  check(errs.length === 0, 'нет ошибок в консоли', errs.join('; '));
  check(resources.bad.length === 0 && broken.length === 0, `все ресурсы грузятся (${resources.n} шт.)`, JSON.stringify({ bad: resources.bad, broken }));
  const fonts = await page.eval(`document.fonts.ready.then(()=>[document.fonts.check('30px "PT Serif"','Шторы'),document.fonts.check('16px Montserrat','Шторы')])`);
  check(fonts.every(Boolean), 'шрифты PT Serif и Montserrat загружены');

  // --- снимок 1920 по всей высоте ---
  await setSize(1920, height);
  await sleep(800);
  const shot = await page.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  writeFileSync(path.join(out, 'page-1920.png'), Buffer.from(shot.data, 'base64'));
  check(Math.abs(height - 4879) < 250, `высота страницы близка к макету`, `${height}px против 4879px`);

  // Позиции блоков против макета (y верхней границы в template-01)
  const blocks = await page.eval(`(()=>{const y=s=>Math.round(document.querySelector(s).getBoundingClientRect().top+scrollY);
    const t=q=>{const e=[...document.querySelectorAll('h1,h2')].find(h=>h.textContent.includes(q));return Math.round(e.getBoundingClientRect().top+scrollY)};
    return {hero:t('Красивые'),services:t('Наши'),projects:t('Изготовление'),how:t('Как мы'),form:t('Оставьте'),partners:t('партнеры'),info:t('Немного'),contacts:t('рады')}})()`);
  const expected = { hero: 280, services: 1100, projects: 1540, how: 2300, form: 2690, partners: 3315, info: 3730, contacts: 4280 };
  for (const [k, v] of Object.entries(expected)) check(Math.abs(blocks[k] - v) <= 60, `блок «${k}» на месте`, `y=${blocks[k]}, в макете ≈${v}`);

  // Склейки «макет | вёрстка» по фрагментам высотой 700
  const pairs = await page.eval(`(async()=>{
    const load=src=>new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=src});
    const a=await load('${BASE}/template-01.jpg');const b=await load('data:image/png;base64,${shot.data}');
    const res=[];for(let y=0,n=1;y<Math.max(a.height,b.height);y+=700,n++){
      const c=document.createElement('canvas');c.width=1320*2+10;c.height=700;const g=c.getContext('2d');g.fillStyle='#f0f';g.fillRect(0,0,c.width,700);
      g.drawImage(a,300,y,1320,700,0,0,1320,700);g.drawImage(b,300,y,1320,700,1330,0,1320,700);res.push(c.toDataURL('image/jpeg',.8))}
    return res})()`);
  pairs.forEach((d, i) => writeFileSync(path.join(out, `pair-${String(i + 1).padStart(2, '0')}.jpg`), Buffer.from(d.split(',')[1], 'base64')));
  check(pairs.length > 0, `склейки «макет | вёрстка» сохранены`, `${pairs.length} шт. в ${out}`);

  // --- интерактив ---
  await setSize(1920);
  await page.eval(`scrollTo(0,0)`);
  const carousel = await page.eval(`(async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));const t=document.getElementById('services');const b=t.scrollLeft;
    document.querySelector('[data-next="services"]').click();await s(900);const a1=t.scrollLeft;document.querySelector('[data-prev="services"]').click();await s(900);return [b,a1,t.scrollLeft]})()`);
  check(carousel[1] > carousel[0] && carousel[2] < carousel[1], 'стрелки услуг листают', carousel.join(' → '));
  const proj = await page.eval(`(async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));const t=document.getElementById('projects');const b=t.scrollLeft;
    [...document.querySelectorAll('[data-next="projects"]')].find(x=>x.offsetParent).click();await s(900);const a1=t.scrollLeft;
    [...document.querySelectorAll('[data-prev="projects"]')].find(x=>x.offsetParent).click();await s(900);return [b,a1,t.scrollLeft]})()`);
  check(proj[1] > proj[0] && proj[2] < proj[1], 'стрелки проектов листают', proj.join(' → '));
  const toForm = await page.eval(`(async()=>{scrollTo(0,0);await new Promise(r=>setTimeout(r,300));document.querySelector('[data-scroll-form]').click();await new Promise(r=>setTimeout(r,1500));
    return Math.round(document.getElementById('form').getBoundingClientRect().top)})()`);
  check(Math.abs(toForm) < 120, '«Рассчитать стоимость штор» прокручивает к форме', `top формы ${toForm}px`);
  const lb = await page.eval(`(async()=>{document.querySelector('[data-lightbox]').click();await new Promise(r=>setTimeout(r,200));const box=document.querySelector('body>div.fixed');const open=box.classList.contains('grid');box.click();return open&&box.classList.contains('hidden')})()`);
  check(lb, 'фото проекта открывается крупно и закрывается');
  const form = await page.eval(`(async()=>{const f=document.getElementById('lead');const href=location.href;const i=f.querySelector('input');
    f.requestSubmit();const errShown=!f.querySelector('[data-error]').classList.contains('hidden');
    i.value='+7 (701) 123-45-67';f.requestSubmit();await new Promise(r=>setTimeout(r,300));
    return {errShown,thanks:!f.querySelector('[data-thanks]').classList.contains('hidden')&&f.querySelector('[data-thanks]').textContent.includes('Спасибо'),same:location.href===href}})()`);
  check(form.errShown, 'пустой телефон — подсказка об ошибке');
  check(form.thanks && form.same, 'форма показывает «Спасибо» без перезагрузки');

  // --- адаптив ---
  for (const w of [1440, 375]) {
    await setSize(w, w < 768 ? 812 : 900);
    await page.goto(URL_, 2500);
    await scrollAll();
    const r = await page.eval(`(()=>{const W=document.documentElement.clientWidth;const over=[...document.querySelectorAll('body *')].filter(e=>{
      if(e.closest('#services,#projects'))return false;const b=e.getBoundingClientRect();return b.width>0&&(b.right>W+1||b.left<-1)&&getComputedStyle(e).position!=='fixed'&&!e.closest('.overflow-hidden')}).map(e=>e.tagName+'.'+(e.className.baseVal??e.className).toString().slice(0,40));
      return {sw:document.documentElement.scrollWidth,W,over:over.slice(0,5)}})()`);
    check(r.sw <= r.W, `${w}px: нет горизонтальной прокрутки`, `scrollWidth ${r.sw}, окно ${r.W}`);
    check(r.over.length === 0, `${w}px: ничего не вылезает за край`, r.over.join(', '));
    const s = await page.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: await page.eval('document.documentElement.scrollHeight'), scale: w < 768 ? 0.6 : 0.4 } });
    writeFileSync(path.join(out, `page-${w}.png`), Buffer.from(s.data, 'base64'));
  }
  const mobileSwipe = await page.eval(`(async()=>{const t=document.getElementById('services');t.scrollTo({left:300});await new Promise(r=>setTimeout(r,700));return t.scrollLeft>0})()`);
  check(mobileSwipe, '375px: карусель услуг листается');
});

console.log(fails ? `\nИтого ошибок: ${fails}` : '\nВсё в порядке');
process.exit(fails ? 1 : 0);
