/* Проверка почтовых шаблонов mockups/site/assets/email.js.

   node tools/mockups/check-emails.mjs [outDir]

   1. В Node: для каждого kind собирает письмо в салон и клиенту на обычных и «вредных» данных
      (<script>, "><img onerror>, javascript:-ссылки, переносы строк в теме) и проверяет:
      экранирование, нормализацию телефона, пропуск пустых полей, тему без смешения латиницы
      с кириллицей в словах, text-версию, отсутствие внешних CSS/скриптов, абсолютные https-картинки, ширину 600.
   2. В Chrome без окна: скриншоты каждого письма на 600 и 360px в outDir (по умолчанию scratchpad/emails).
   Код выхода 1 при любой ошибке. При EBUSY на DevToolsActivePort — повторить. */
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { withBrowser } from './snapshot.mjs';

const require = createRequire(import.meta.url);
const E = require('../../mockups/site/assets/email.js');
const OUT = process.argv[2] ?? 'C:/Users/Andrey/AppData/Local/Temp/claude/C--git-shtorivdom-git/421dcc02-e4ee-4509-96ef-b378432b6a4f/scratchpad/emails';
mkdirSync(OUT, { recursive: true });

let failed = 0;
const ok = (cond, text) => {
  if (!cond) failed++;
  if (!cond || process.env.VERBOSE) console.log(`${cond ? '✓' : '✗'} ${text}`);
  return cond;
};

const EVIL = '<script>alert(1)</script>"><img src=x onerror=alert(2)><a href="javascript:alert(3)">жми</a> https://evil.example/';
const meta = { pageTitle: 'Шторы на заказ | Shtorivdom', pageUrl: 'https://shtorivdom.ru/catalog/3/', sentAt: '2026-09-14T12:30:00Z' };
const normal = { name: 'Анна', phone: '9255946117', email: 'anna@example.ru', theme: 'Сроки', type: 'Блэкаут', connectionType: 'Звонок', city: 'Троицк', size: 18, description: 'Два окна\nгостиная', model: 'Карниз 3' };
const evil = { name: EVIL, phone: '8 (925) 594-61-17', email: 'x@y.ru"><script>', theme: 'Тема\r\nBcc: spam@example.com', city: EVIL, description: EVIL, model: EVIL };
const evilMeta = { pageTitle: EVIL, pageUrl: 'javascript:alert(4)', sentAt: 'не дата' };

function staticChecks(label, mail) {
  const { subject, html, text } = mail;
  ok(typeof text === 'string' && text.length > 40, `${label}: есть text-версия`);
  ok(!/[\r\n]/.test(subject), `${label}: тема в одну строку`);
  const mixed = subject.split(/[^a-zа-яё]+/i).filter((w) => /[а-яё]/i.test(w) && /[a-z]/i.test(w));
  ok(mixed.length === 0, `${label}: тема без латиницы в русских словах ${mixed.join(',')} — «${subject}»`);
  ok(/[а-яё]/i.test(subject) && !/\bc\s+сайта/.test(subject), `${label}: тема по-русски`);
  ok(!/<script|<link|<style|@import|<iframe|<object|<embed|<form/i.test(html), `${label}: нет скриптов и внешнего CSS`);
  ok(!/<[^>]*\son[a-z]+\s*=/i.test(html), `${label}: нет обработчиков on*=`);
  ok(!/href="(?!https:\/\/|tel:\+|mailto:)/i.test(html), `${label}: ссылки только https/tel/mailto`);
  const imgs = [...html.matchAll(/<img[^>]*src="([^"]*)"/g)].map((m) => m[1]);
  ok(imgs.length > 0 && imgs.every((s) => /^https:\/\/shtorivdom\.ru\/[^"]+\.(png|jpe?g|gif)$/.test(s)), `${label}: картинки абсолютные https без SVG (${imgs.join(', ')})`);
  ok(/<table[^>]*width="600"[^>]*max-width:600px/.test(html), `${label}: таблица шириной 600`);
  ok(!/url\(|font-face|fonts\.googleapis/i.test(html), `${label}: без веб-шрифтов и фоновых url()`);
}

const mails = [];
for (const kind of E.KINDS) {
  const lead = E.buildLeadEmail(kind, normal, meta);
  staticChecks(`${kind}/салон`, lead);
  mails.push([`${kind}-salon`, lead]);
  ok(lead.html.includes('href="tel:+79153591200"') && lead.html.includes('+7 (915) 359-12-00'), `${kind}/салон: телефон нормализован, ссылка tel:`);
  ok(lead.html.includes('href="mailto:anna@example.ru"'), `${kind}/салон: email — mailto:`);
  ok(lead.html.includes('href="https://shtorivdom.ru/catalog/3/"') && lead.html.includes('14.09.2026, 15:30 (МСК)'), `${kind}/салон: страница ссылкой и время МСК`);
  ok(lead.subject.endsWith('— +7 (915) 359-12-00'), `${kind}/салон: телефон в теме — «${lead.subject}»`);

  const client = E.buildClientEmail(kind, normal);
  ok(!!client, `${kind}/клиент: письмо есть при email`);
  if (client) {
    staticChecks(`${kind}/клиент`, client);
    mails.push([`${kind}-client`, client]);
    ok(/Троицк, Кварцевая улица, 3, корп\. 2/.test(client.html) && client.html.includes('info@shtorivdom.ru') && client.html.includes('10:00–20:00'), `${kind}/клиент: контакты салона`);
    ok(!/скидк|акци[яиюей]|\d+\s*%/i.test(client.text), `${kind}/клиент: без скидок и акций`);
  }
  ok(E.buildClientEmail(kind, { phone: '9255946117' }) === null, `${kind}/клиент: без email → null`);
  ok(E.buildClientEmail(kind, { email: 'не email' }) === null, `${kind}/клиент: некорректный email → null`);

  // пустые поля
  const bare = E.buildLeadEmail(kind, { phone: '9255946117', name: '   ', city: '', description: null }, {});
  ok(!/>Имя<|>Город<|>Пожелание<|>Текст вопроса<|>Email<|>Страница</.test(bare.html) && !/Имя:|Город:/.test(bare.text), `${kind}: пустые поля не выводятся`);

  // вредные данные
  const bad = E.buildLeadEmail(kind, evil, evilMeta);
  staticChecks(`${kind}/салон-вред`, bad);
  ok(!/<img src=x|<a href="javascript|javascript:alert\(4\)"/i.test(bad.html) && bad.html.includes('&lt;script&gt;'), `${kind}/салон-вред: разметка экранирована`);
  ok(!/Bcc:\s*spam/.test(bad.subject) || !/[\r\n]/.test(bad.subject), `${kind}/салон-вред: перенос в теме убран`);
  ok(!bad.html.includes('mailto:x@y.ru'), `${kind}/салон-вред: кривой email не становится ссылкой`);
  ok(E.buildClientEmail(kind, evil) === null, `${kind}/клиент-вред: кривой email → письма нет`);
  const badClient = E.buildClientEmail(kind, { ...evil, email: 'ok@example.ru' });
  staticChecks(`${kind}/клиент-вред`, badClient);
  ok(!/<img src=x|href="javascript/i.test(badClient.html) && badClient.html.includes('&lt;script&gt;'), `${kind}/клиент-вред: разметка экранирована`);
}
const ph = (v) => E.normalizePhone(v)?.text;
ok(ph('9255946117') === '+7 (915) 359-12-00' && ph('89255946117') === '+7 (915) 359-12-00' && ph('+7 925 594 61 17') === '+7 (915) 359-12-00' && ph(9255946117) === '+7 (915) 359-12-00', 'телефон: 10 цифр, 8…, +7…, число → +7 (XXX) XXX-XX-XX');
ok(E.normalizePhone('12345').tel === '' && E.normalizePhone('') === null, 'телефон: неполный — без tel:, пустой — null');
console.log(`статические проверки: ${failed ? '✗ ошибок ' + failed : '✓ все пройдены'} (писем ${mails.length})`);

// ---------- скриншоты ----------
await withBrowser(async (page) => {
  for (const [name, mail] of mails) {
    for (const width of [600, 360]) {
      await page.send('Emulation.setDeviceMetricsOverride', { width, height: 800, deviceScaleFactor: 1, mobile: width < 600 });
      await page.send('Page.navigate', { url: 'data:text/html;charset=utf-8;base64,' + Buffer.from(mail.html).toString('base64') });
      await new Promise((r) => setTimeout(r, 900));
      const m = await page.eval(`({ h: document.documentElement.scrollHeight, w: document.documentElement.scrollWidth })`);
      ok(m.w <= width, `${name} ${width}px: без горизонтальной прокрутки (ширина ${m.w})`);
      await page.send('Emulation.setDeviceMetricsOverride', { width, height: m.h, deviceScaleFactor: 1, mobile: width < 600 });
      const shot = await page.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      writeFileSync(path.join(OUT, `${name}-${width}.png`), Buffer.from(shot.data, 'base64'));
    }
  }
});
console.log(`скриншоты: ${OUT}`);
console.log(failed ? `✗ ошибок: ${failed}` : '✓ все проверки пройдены');
process.exitCode = failed ? 1 : 0;
