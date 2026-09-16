/* Выкладка прототипа сайта (mockups/site) на хостинг Timeweb по FTP.

   npm run mockups:site:deploy                                        — сборка и список файлов, ничего не загружает
   FTP_PASSWORD=… node tools/mockups/deploy-site-ftp.mjs --upload     — загрузка

   Что куда:
   - mockups/site/** (без src/ и emails/)   → public_html/
   - mockups/shared/fonts.css, fonts/**     → public_html/shared/   (страницы берут ../shared/…)
   PHP не выкладывается: формы на хостинге пока не работают (шлют на /api/send-message.php).
   Файлы на сервере только добавляются и перезаписываются — скрипт ничего не удаляет. */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { deploy, walk, posix } from '../ftp-upload.mjs';

if (!existsSync('mockups/site/index.html')) throw new Error('Нет mockups/site/index.html — сначала node tools/mockups/site-build.mjs');

const files = [
  ...walk('mockups/site')
    .filter((f) => !/^mockups[\\/]site[\\/](src|emails)[\\/]/.test(f))
    .map((f) => [f, posix(path.relative('mockups/site', f))]),
  ['mockups/shared/fonts.css', 'shared/fonts.css'],
  ...walk('mockups/shared/fonts').map((f) => [f, posix(path.join('shared', path.relative('mockups/shared', f)))]),
];

deploy(files, { title: 'Прототип сайта', uploadCommand: 'FTP_PASSWORD=… node tools/mockups/deploy-site-ftp.mjs --upload' });
