import { existsSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const pagesDir = 'apps/mockups/public/legacy/site/src/pages';
const missing = [];

function checkDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      checkDirectory(path);
      continue;
    }

    const extension = extname(entry.name);
    const isPage = extension === '.html' || path.endsWith('catalog.mjs');

    if (!isPage) continue;

    const description = path.slice(0, -extension.length) + '.angular.md';
    if (!existsSync(description)) missing.push(`${path} → ${description}`);
  }
}

checkDirectory(pagesDir);

if (missing.length) {
  console.error('Нет описания переноса на Angular:');
  for (const item of missing) console.error(`- ${item}`);
  console.error(`Создайте файл по образцу ${join(pagesDir, '_template.angular.md')}.`);
  process.exit(1);
}

console.log('✓ У каждой страницы мокапа есть описание переноса на Angular.');
