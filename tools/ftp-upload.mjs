/* Общая выкладка файлов на хостинг Timeweb по FTP (через curl, без зависимостей).

   Используется в tools/deploy-site-ftp.mjs (Angular-сайт) и tools/mockups/deploy-site-ftp.mjs (прототип).
   Без флага --upload печатает список файлов и ничего не загружает.
   С --upload пароль берётся из FTP_PASSWORD и передаётся curl через stdin (-K -), в командной строке его не видно.
   Файлы на сервере только добавляются и перезаписываются — ничего не удаляется. */
import { spawnSync } from 'node:child_process';
import { readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

export const FTP = { host: 'vh464.timeweb.ru', user: 'ch344353', root: 'public_html' };

export const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

export const posix = (p) => p.split(path.sep).join('/');

/** files: [локальный путь, путь на сервере относительно FTP.root][] */
export function deploy(files, { title, uploadCommand }) {
  for (const [local] of files) if (!existsSync(local)) throw new Error(`Нет файла: ${local}`);
  const total = files.reduce((s, [f]) => s + statSync(f).size, 0);

  if (!process.argv.includes('--upload')) {
    for (const [local, remote] of files) console.log(`${remote}  ←  ${posix(local)}`);
    console.log(`\n${title}: файлов ${files.length}, ${(total / 1048576).toFixed(1)} МБ → ftp://${FTP.host}/${FTP.root}/`);
    console.log(`Пробный прогон, ничего не загружено. Загрузка: ${uploadCommand}`);
    return;
  }

  const password = process.env.FTP_PASSWORD;
  if (!password) throw new Error('Задайте пароль в переменной FTP_PASSWORD');
  const config = `user = "${FTP.user}:${password.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"\n`;

  let done = 0;
  const failed = [];
  for (const [local, remote] of files) {
    const url = `ftp://${FTP.host}/${FTP.root}/${remote.split('/').map(encodeURIComponent).join('/')}`;
    const r = spawnSync('curl', ['-sS', '--ftp-create-dirs', '--retry', '2', '-K', '-', '-T', local, url], { input: config, encoding: 'utf8' });
    done++;
    if (r.status !== 0) {
      failed.push(`${remote}: ${(r.stderr || '').trim()}`);
      console.log(`✗ ${remote}`);
    } else if (done % 20 === 0 || done === files.length) {
      console.log(`… ${done}/${files.length}`);
    }
  }
  console.log(failed.length ? `\nне загружено: ${failed.length}\n${failed.join('\n')}` : `\n${title}: загружено ${files.length} файлов в ${FTP.root}/`);
  process.exitCode = failed.length ? 1 : 0;
}
