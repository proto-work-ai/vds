/* Сервер макетов одной командой: npm run mockups.

   Карта макетов (mockups/) — http://localhost:4320/. Оригиналы Figma Sites
   выбирают страницу по адресу в браузере, поэтому из подпапки открываются пустыми;
   менять их нельзя — каждый из них тот же процесс раздаёт с корня своего порта
   (4321, 4325…). Оригиналы Figma Make (2, 3, 7) и переводы открываются из подпапок карты. */
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('mockups');
const SERVERS = [
  [4320, ''],
  [4321, 'landing-original'],
  [4325, 'landing-original-5'],
  [4326, 'landing-original-6'],
  [4328, 'landing-original-8'],
  [4329, 'landing-original-9'],
];
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.wasm': 'application/wasm',
};
const stat = (p) => {
  try {
    return statSync(p);
  } catch {
    return null;
  }
};

for (const [port, dir] of SERVERS) {
  const base = path.join(ROOT, dir);
  createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    let pathname;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      pathname = url.pathname;
    }
    let file = path.join(base, pathname);
    if (!file.startsWith(base)) return res.writeHead(403).end();
    let st = stat(file);
    if (st?.isDirectory()) {
      // Относительные пути страниц считаются от папки — нужен слеш в конце.
      if (!pathname.endsWith('/')) return res.writeHead(301, { Location: url.pathname + '/' + url.search }).end();
      file = path.join(file, 'index.html');
      st = stat(file);
    }
    if (!st?.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
      'Content-Length': st.size,
      'Cache-Control': 'no-cache',
    });
    if (req.method === 'HEAD') return res.end();
    createReadStream(file).pipe(res);
  })
    .on('error', (e) => console.error(`порт ${port}: ${e.message}`))
    .listen(port, () => console.log(`http://localhost:${port}/  ←  mockups/${dir}`));
}
