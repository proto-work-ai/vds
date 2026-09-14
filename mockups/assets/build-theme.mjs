/* Собирает theme.js из theme.css.
   Браузерная сборка Tailwind 4 не умеет ни @import внешнего файла, ни
   <link type="text/tailwindcss">, поэтому тема вписывается в страницу строкой.
   theme.css — единственный источник правды: node mockups/assets/build-theme.mjs */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const css = readFileSync(path.join(dir, 'theme.css'), 'utf8');

const js = `/* Тема макетов shtorivdom для Tailwind 4.
   Подключать ПЕРЕД <script src=".../@tailwindcss/browser@4">.
   Собран из theme.css: node mockups/assets/build-theme.mjs — руками не править. */
document.write('<style type="text/tailwindcss">' + ${JSON.stringify(css)} + "</style>");
`;

writeFileSync(path.join(dir, 'theme.js'), js, 'utf8');
console.log('theme.js собран из theme.css:', css.length, 'символов');
