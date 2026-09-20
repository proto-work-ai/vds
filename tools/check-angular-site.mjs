// Browser regression checks. Lead requests are intercepted; no email is sent.
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { withBrowser } from './mockups/snapshot.mjs';

const base = process.argv[2] || 'http://localhost:4200';
const routes = [
  ...readFileSync('apps/shtorivdom-site/src/app/site-pages.ts', 'utf8').matchAll(
    /path: '([^']*)'/g,
  ),
].map((m) => m[1]);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
await withBrowser(async (page) => {
  await page.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
    window.__errors = []; window.__leads = []; window.__leadOk = true;
    addEventListener('error', e => { if(e.message) window.__errors.push(e.message); });
    addEventListener('unhandledrejection', e => window.__errors.push(String(e.reason)));
    const error = console.error;
    console.error = (...args) => { window.__errors.push(args.join(' ')); error(...args); };
    const originalFetch = window.fetch;
    window.fetch = async (input, init) => {
      if (String(input?.url || input).includes('/api/lead.php')) {
        window.__leads.push(JSON.parse(init?.body || await input.clone().text()));
        await new Promise(resolve => setTimeout(resolve, 250));
        return new Response(JSON.stringify({ok: window.__leadOk, error: window.__leadOk ? undefined : 'Тестовая ошибка'}), {headers: {'Content-Type': 'application/json'}});
      }
      return originalFetch(input, init);
    };
  `,
  });
  for (const route of process.argv.includes('--interactions-only') ? [] : routes) {
    await page.goto(`${base}/${route}`, 800);
    const result = await page.eval(
      `({title: document.title, h1: !!document.querySelector('h1'), errors: window.__errors, forms: document.querySelectorAll('form[data-lead-form], form[data-calc-lead-form]').length})`,
    );
    assert.deepEqual(result.errors, [], route);
    assert.ok(result.title && result.h1, route);
    console.log(`PASS /${route}: title, heading, no browser errors (${result.forms} forms)`);
  }
  await page.goto(base, 1000);
  assert.ok(
    await page.eval(
      `(async()=>{document.querySelector('a[href$="#hero-form"]').click();await new Promise(r=>setTimeout(r,150));return document.activeElement?.getAttribute('formcontrolname')==='name';})()`,
    ),
  );
  const home = await page.eval(`(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const faq = document.querySelectorAll('site-faq button');
    for (const b of faq) { b.click(); await wait(50); if(b.getAttribute('aria-expanded') !== 'true') throw Error('FAQ does not open'); b.click(); await wait(50); }
    const review = document.querySelector('site-review-slider blockquote').textContent;
    document.querySelector('site-review-slider [aria-label="Следующий отзыв"]').click(); await wait(500);
    return {faq: faq.length, reviewChanged: review !== document.querySelector('site-review-slider blockquote').textContent};
  })()`);
  assert.equal(home.faq, 5);
  assert.ok(home.reviewChanged);
  console.log('PASS FAQ and reviews');
  mkdirSync('.playwright-mcp', { recursive: true });
  await page.eval(`document.querySelector('#faq').scrollIntoView({behavior:'instant'})`);
  await sleep(650);
  writeFileSync(
    '.playwright-mcp/angular-faq.png',
    Buffer.from((await page.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
  );
  assert.ok(
    await page.eval(
      `(async()=>{const el=document.querySelector('site-before-after');const old=el.getAttribute('aria-valuenow');el.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));await new Promise(r=>setTimeout(r,50));return old!==el.getAttribute('aria-valuenow');})()`,
    ),
  );
  console.log('PASS before/after keyboard control');
  await page.goto(`${base}/quiz/`, 1000);
  const quiz = await page.eval(`(async()=>{
    const wait=()=>new Promise(r=>setTimeout(r,80));
    for(const name of ['room','light','window','style']){document.querySelector('input[name='+name+']').click();await wait();document.querySelector('[data-quiz-nav] .btn-gold').click();await wait();}
    const result=!document.querySelector('[data-quiz-result]').hidden;
    const cards=document.querySelectorAll('[data-quiz-cards] a').length;
    [...document.querySelectorAll('[data-quiz-result] button')].find(b=>b.textContent.includes('Заново')||b.textContent.includes('заново')).click();await wait();
    return {result,cards,reset:!document.querySelector('[data-quiz-step=room]').hidden,checked:document.querySelectorAll('[data-quiz] input[type=radio]:checked').length};
  })()`);
  assert.ok(quiz.result && quiz.cards === 2 && quiz.reset && quiz.checked === 0);
  console.log('PASS quiz result and reset');
  await page.goto(`${base}/price/#roman-blinds`, 1000);
  assert.equal(
    await page.eval(
      `document.querySelector('[data-tab][aria-selected="true"]')?.getAttribute('data-tab')`,
    ),
    'roman-blinds',
  );
  const tab = await page.eval(
    `(async () => {const el = document.querySelector('[data-tab]'); el.click(); await new Promise(r=>setTimeout(r,200)); return {selected:el.getAttribute('aria-selected'), panels:document.querySelectorAll('[data-tab-panel]:not([hidden])').length};})()`,
  );
  assert.equal(tab.selected, 'true');
  assert.equal(tab.panels, 1);
  console.log('PASS price tabs and direct fragment');
  await page.goto(`${base}/catalog/blackout-curtains/`, 1000);
  const gallery = await page.eval(`(async () => {
    const wait=ms=>new Promise(r=>setTimeout(r,ms));
    const item=document.querySelector('[data-strip] [data-gallery-item]'); item.click(); await wait(100);
    const dialog=document.querySelector('dialog.cat-lb'); const open=dialog.open; const src=dialog.querySelector('img')?.src;
    dialog.querySelector('.cat-lb-next')?.click(); await wait(100); const changed=src!==dialog.querySelector('img')?.src;
    dialog.querySelector('.cat-lb-close').click(); await wait(100);
    return {open,changed,closed:!dialog.open,focus:document.activeElement===item};
  })()`);
  assert.deepEqual(gallery, { open: true, changed: true, closed: true, focus: true });
  console.log('PASS gallery navigation, close and focus');
  // Exercise every form in a representative page for each form layout.
  for (const route of ['', 'contact', 'partner', 'calc', 'catalog/curtain-rods/1']) {
    await page.goto(`${base}/${route}`, 1000);
    const forms = await page.eval(
      `document.querySelectorAll('form[data-lead-form],form[data-calc-lead-form]').length`,
    );
    for (let i = 0; i < forms; i++) {
      await page.eval(
        `document.querySelectorAll('form[data-lead-form],form[data-calc-lead-form]')[${i}].scrollIntoView()`,
      );
      await sleep(350);
      const invalid = await page.eval(
        `(async()=>{const f=document.querySelectorAll('form[data-lead-form],form[data-calc-lead-form]')[${i}]; f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})); await new Promise(r=>setTimeout(r,100)); return {requests:window.__leads.length, alerts:document.querySelectorAll('app-lead-status [role=alert]').length};})()`,
      );
      assert.equal(invalid.requests, i);
      assert.ok(invalid.alerts > 0, `${route} form ${i} validation`);
      await page.eval(
        `(()=>{const f=document.querySelectorAll('form[data-lead-form],form[data-calc-lead-form]')[${i}]; for(const [name,value] of [['name','Тест'],['phone','+7 (999) 123-45-67']]){const el=f.querySelector('[formcontrolname='+name+']'); if(el){el.focus();el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('blur',{bubbles:true}));}} window.__leadOk=false;})()`,
      );
      await sleep(150);
      await page.eval(
        `document.querySelectorAll('form[data-lead-form],form[data-calc-lead-form]')[${i}].dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))`,
      );
      await sleep(400);
      assert.ok(
        await page.eval(`document.body.textContent.includes('Тестовая ошибка')`),
        `${route} error response`,
      );
      await page.eval(
        `window.__leads.pop();window.__leadOk=true;document.querySelectorAll('form[data-lead-form],form[data-calc-lead-form]')[${i}].dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))`,
      );
      await sleep(400);
      const success = await page.eval(
        `({hidden:document.querySelectorAll('form[data-lead-form],form[data-calc-lead-form]')[${i}].style.display==='none',payload:window.__leads.at(-1)})`,
      );
      assert.ok(success.hidden, `${route} success`);
      assert.equal(success.payload.phone, '9991234567');
      if (route === 'calc' && i === 0)
        assert.ok(success.payload.description.length > 100, 'calculation summary');
    }
    console.log(`PASS /${route}: ${forms} forms, validation, error, retry, success and payload`);
  }
  await page.send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await page.goto(base, 1000);
  const mobile = await page.eval(
    `(async()=>{const b=document.querySelector('[aria-controls="site-mobile-menu"]');b.click();await new Promise(r=>setTimeout(r,350));const open=b.getAttribute('aria-expanded');const a=document.querySelector('#site-mobile-menu a[href*="contact"]');a.click();await new Promise(r=>setTimeout(r,600));return {open,closed:b.getAttribute('aria-expanded'),path:location.pathname,overflow:document.documentElement.scrollWidth>375,errors:window.__errors};})()`,
  );
  assert.equal(mobile.open, 'true');
  assert.equal(mobile.closed, 'false');
  assert.equal(mobile.path, '/contact/');
  assert.equal(mobile.overflow, false);
  assert.deepEqual(mobile.errors, []);
  console.log('PASS mobile menu, Angular navigation, 375px layout');
  writeFileSync(
    '.playwright-mcp/angular-mobile.png',
    Buffer.from((await page.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
  );
  for (const route of ['', 'calc', 'quiz', 'price', 'catalog/blackout-curtains']) {
    await page.goto(`${base}/${route}`, 800);
    assert.equal(
      await page.eval(`document.documentElement.scrollWidth > 375`),
      false,
      `${route} mobile overflow`,
    );
    assert.deepEqual(await page.eval(`window.__errors`), [], `${route} mobile errors`);
  }
  console.log('PASS mobile home, calculator, quiz, price and catalog layouts');
});
