/* Страницы отдельных писем для галереи mockups/emails/.

   node tools/mockups/emails-build.mjs

   Из общей галереи emails/index.html делает emails/lead-<kind>/ (письмо в салон) и
   emails/client-<kind>/ (письмо клиенту — для типов, где в тестовых данных есть email).
   Правка галереи → перезапустить. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const DIR = 'mockups/emails';
const E = createRequire(import.meta.url)('../../mockups/site/assets/email.js');
const src = readFileSync(path.join(DIR, 'index.html'), 'utf8');
const WITH_CLIENT = ['order', 'contact', 'partner', 'curtain-rod']; // как SAMPLES в галерее

const pages = [...E.KINDS.map((k) => ['lead', k]), ...WITH_CLIENT.map((k) => ['client', k])];
for (const [who, kind] of pages) {
  const html = src
    .replace('<body data-kind="" data-to="">', `<body data-kind="${kind}" data-to="${who === 'client' ? 'client' : 'salon'}">`)
    .replace('<a href="../">← Карта макетов</a>', '<a href="../../">← Карта макетов</a>')
    .replace('<a href="../site/">Прототип сайта</a>', '<a href="../">Все письма</a>')
    .replace('src="../site/assets/email.js"', 'src="../../site/assets/email.js"')
    .replaceAll('href="../assets/favicon/', 'href="../../assets/favicon/')
    .replace('<title>Почтовые шаблоны заявок — Shtorivdom</title>', `<title>${who === 'client' ? 'Клиенту' : 'В салон'}: ${kind} — почтовые шаблоны</title>`);
  mkdirSync(path.join(DIR, `${who}-${kind}`), { recursive: true });
  writeFileSync(path.join(DIR, `${who}-${kind}`, 'index.html'), html);
}
console.log(pages.map(([w, k]) => `${w}-${k}/`).join('\n'));
