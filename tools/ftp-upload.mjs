/* Общая выкладка файлов на хостинг Timeweb по FTP (через curl, без зависимостей).

   Используется в tools/deploy-site-ftp.mjs (Angular-сайт) и tools/mockups/deploy-site-ftp.mjs (прототип).
   Без флага --upload печатает список файлов и ничего не загружает.
   С --upload пароль берётся из FTP_PASSWORD и передаётся curl через stdin (-K -), в командной строке его не видно.
   FTP_CONCURRENCY задаёт число одновременных FTP-соединений (по умолчанию 6).
   Файлы на сервере только добавляются и перезаписываются — ничего не удаляется. */
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  readFileSync,
  readdirSync,
  statSync,
  existsSync,
  writeFileSync,
  unlinkSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

export const FTP = {
  host: process.env.FTP_HOST || 'vh464.timeweb.ru',
  user: process.env.FTP_USER || 'ch344353',
  root: process.env.FTP_ROOT || 'public_html',
};
const MANIFEST = '.shtorivdom-deploy-manifest.json';

export const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

export const posix = (p) => p.split(path.sep).join('/');
const hashFile = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');
const ftpUrl = (remote) =>
  `ftp://${FTP.host}/${FTP.root}/${remote.split('/').map(encodeURIComponent).join('/')}`;

/** files: [локальный путь, путь на сервере относительно FTP.root][] */
export async function deploy(files, { title, uploadCommand }) {
  for (const [local] of files) if (!existsSync(local)) throw new Error(`Нет файла: ${local}`);
  const total = files.reduce((s, [f]) => s + statSync(f).size, 0);

  if (!process.argv.includes('--upload')) {
    for (const [local, remote] of files) console.log(`${remote}  ←  ${posix(local)}`);
    console.log(
      `\n${title}: файлов ${files.length}, ${(total / 1048576).toFixed(1)} МБ → ftp://${FTP.host}/${FTP.root}/`,
    );
    console.log(`Пробный прогон, ничего не загружено. Загрузка: ${uploadCommand}`);
    return;
  }

  const password = process.env.FTP_PASSWORD;
  if (!password) throw new Error('Задайте пароль в переменной FTP_PASSWORD');
  const config = `user = "${FTP.user}:${password.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"\n`;
  const manifestFile = path.join(tmpdir(), `shtorivdom-${Date.now()}-manifest.json`);
  const manifestResult = spawnSync(
    'curl',
    ['-sS', '-K', '-', ftpUrl(MANIFEST), '-o', manifestFile],
    {
      input: config,
      encoding: 'utf8',
    },
  );
  let previous = {};
  if (manifestResult.status === 0) {
    try {
      previous = JSON.parse(readFileSync(manifestFile, 'utf8')).files ?? {};
    } catch {
      previous = {};
    }
  }
  if (existsSync(manifestFile)) unlinkSync(manifestFile);

  const local = files.map(([file, remote]) => ({ file, remote, hash: hashFile(file) }));
  const pending = local.filter((item) => previous[item.remote] !== item.hash);
  const skipped = local.length - pending.length;
  console.log(`Изменённых или новых файлов: ${pending.length}, без изменений: ${skipped}`);

  const parsedConcurrency = Number.parseInt(process.env.FTP_CONCURRENCY || '6', 10);
  const concurrency = Number.isFinite(parsedConcurrency)
    ? Math.max(1, Math.min(parsedConcurrency, 16))
    : 6;
  let nextIndex = 0;
  let done = 0;
  const failed = [];
  const upload = ({ file, remote }) => {
    const url = ftpUrl(remote);
    return new Promise((resolve) => {
      const child = spawn(
        'curl',
        ['-sS', '--ftp-create-dirs', '--retry', '2', '-K', '-', '-T', file, url],
        { stdio: ['pipe', 'ignore', 'pipe'] },
      );
      let stderr = '';
      child.stderr.on('data', (chunk) => (stderr += chunk));
      child.on('error', (error) => resolve({ remote, error: error.message }));
      child.on('close', (status) =>
        resolve(status === 0 ? { remote } : { remote, error: stderr.trim() }),
      );
      child.stdin.end(config);
    });
  };
  const worker = async () => {
    while (nextIndex < pending.length) {
      const file = pending[nextIndex++];
      const result = await upload(file);
      done++;
      if (result.error) {
        failed.push(`${result.remote}: ${result.error}`);
        console.log(`✗ ${result.remote}`);
      } else {
        if (done % 20 === 0 || done === pending.length) console.log(`… ${done}/${pending.length}`);
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, pending.length) }, worker));
  if (!failed.length) {
    const manifest = JSON.stringify(
      {
        version: 1,
        generatedAt: new Date().toISOString(),
        files: Object.fromEntries(local.map((item) => [item.remote, item.hash])),
      },
      null,
      2,
    );
    const localManifest = path.join(tmpdir(), `shtorivdom-${Date.now()}-manifest.json`);
    writeFileSync(localManifest, manifest);
    const result = spawnSync(
      'curl',
      [
        '-sS',
        '--ftp-create-dirs',
        '--retry',
        '2',
        '-K',
        '-',
        '-T',
        localManifest,
        ftpUrl(MANIFEST),
      ],
      {
        input: config,
        encoding: 'utf8',
      },
    );
    unlinkSync(localManifest);
    if (result.status !== 0) failed.push(`${MANIFEST}: ${(result.stderr || '').trim()}`);
  }
  console.log(
    failed.length
      ? `\nне загружено: ${failed.length}\n${failed.join('\n')}`
      : `\n${title}: загружено ${pending.length} файлов, пропущено ${skipped}`,
  );
  process.exitCode = failed.length ? 1 : 0;
}
