/* Выкладка Angular-сайта (apps/shtorivdom-site, статическая сборка) на хостинг Timeweb по FTP.

   npm run site:deploy                                        — сборка и загрузка на FTP
   FTP_PASSWORD=… node tools/deploy-site-ftp.mjs --upload     — загрузка уже собранного сайта
   На Windows: $env:FTP_PASSWORD='…'; npm run site:deploy
   FTP_CONCURRENCY=12                                         — число параллельных загрузок
   --no-php                                                   — без api/*.php (формы на хостинге работать не будут)
   --with-taiga-icons                                         — загрузить редко меняющийся набор иконок Taiga UI

   dist/apps/shtorivdom-site/browser/** → public_html/
   Файлы на сервере только добавляются и перезаписываются — старые не удаляются. */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { deploy, walk, posix } from './ftp-upload.mjs';

const DIST = 'dist/apps/shtorivdom-site/browser';
if (!existsSync(path.join(DIST, 'index.html')))
  throw new Error(`Нет ${DIST}/index.html — сначала npx nx build shtorivdom-site`);

const noPhp = process.argv.includes('--no-php');
const withTaigaIcons = process.argv.includes('--with-taiga-icons');
const files = walk(DIST)
  .filter((f) => !(noPhp && f.endsWith('.php')))
  .filter(
    (f) => withTaigaIcons || !posix(path.relative(DIST, f)).startsWith('assets/taiga-ui/icons/'),
  )
  .map((f) => [f, posix(path.relative(DIST, f))]);

await deploy(files, {
  title: `Сайт${noPhp ? ' (без PHP)' : ''}${withTaigaIcons ? ' (с иконками Taiga UI)' : ''}`,
  uploadCommand: `FTP_PASSWORD=… node tools/deploy-site-ftp.mjs --upload${noPhp ? ' --no-php' : ''}${withTaigaIcons ? ' --with-taiga-icons' : ''}`,
});
