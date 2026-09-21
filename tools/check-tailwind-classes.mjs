import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const roots = [
  'apps/shtorivdom-site/src',
  'mockups/site/src',
  'mockups/site/assets',
  'tools/mockups',
  'libs',
];
const extensions = new Set(['.html', '.ts', '.mjs', '.scss']);
const invalid = [
  { pattern: /\btetext-/g, message: 'Опечатка tetext-, используйте text-' },
  { pattern: /\btexttext-/g, message: 'Опечатка texttext-, используйте text-' },
  { pattern: /\btex-\[/g, message: 'Опечатка tex-[...], используйте text-[...]' },
  {
    pattern: /\btext-\[[^\]\r\n"']*(?:["']|$)/g,
    message: 'Незакрытый произвольный класс text-[...]',
  },
  {
    pattern: /\btext-\[(?:\d*[13579])px\]/g,
    message: 'Размер текста в пикселях должен быть чётным',
  },
];
const errors = [];

function visit(path) {
  if (statSync(path).isDirectory()) {
    for (const name of readdirSync(path)) visit(join(path, name));
    return;
  }

  if (!extensions.has(extname(path))) return;
  const source = readFileSync(path, 'utf8');

  for (const rule of invalid) {
    for (const match of source.matchAll(rule.pattern)) {
      const line = source.slice(0, match.index).split(/\r?\n/).length;
      errors.push(`${path}:${line}: ${rule.message}: ${match[0]}`);
    }
  }
}

for (const root of roots) visit(root);

if (errors.length) {
  console.error('Найдены невалидные или подозрительные Tailwind-классы:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('✓ Известных опечаток в Tailwind-классах нет.');
