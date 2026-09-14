/* Снимок отрисованной страницы для перевода макетов на Tailwind.

   node tools/mockups/snapshot.mjs <url> <outDir> [--width 1440] [--height 900]

   Запускает установленный Chrome без окна и управляет им через DevTools
   Protocol — без Playwright/Puppeteer. Пишет в outDir:
   - initial.html — DOM сразу после загрузки (начальные состояния анимаций
     появления: opacity 0, translate и т.п.);
   - final.html — DOM после прокрутки до конца (все блоки «появились»);
   - meta.json — ширина, высота страницы, таблицы стилей.
   У каждого элемента атрибут data-i: по нему сравниваются два снимка. */
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const [url, outDir, ...rest] = process.argv.slice(2);
const opt = (name, def) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? Number(rest[i + 1]) : def;
};
const WIDTH = opt('width', 1440);
const HEIGHT = opt('height', 900);

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find((p) => existsSync(p));
if (!CHROME) throw new Error('Не найден Chrome или Edge');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function withBrowser(fn) {
  const profile = mkdtempSync(path.join(tmpdir(), 'mockup-chrome-'));
  const proc = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  const portFile = path.join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 100 && !existsSync(portFile); i++) await sleep(100);
  const [port, wsPath] = readFileSync(portFile, 'utf8').trim().split('\n');

  const ws = new WebSocket(`ws://127.0.0.1:${port}${wsPath}`);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });

  let seq = 0;
  const pending = new Map();
  const listeners = new Set();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) {
      for (const l of listeners) l(msg);
    }
  };
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params, sessionId }));
    });

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const page = {
    send: (m, p) => send(m, p, sessionId),
    async eval(expression) {
      const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? 'eval error');
      return r.result.value;
    },
    async goto(target, settleMs = 4000) {
      const loaded = new Promise((res) => {
        const l = (m) => {
          if (m.sessionId === sessionId && m.method === 'Page.loadEventFired') {
            listeners.delete(l);
            res();
          }
        };
        listeners.add(l);
      });
      await send('Page.navigate', { url: target }, sessionId);
      // Внешние картинки могут не грузиться — не ждём load бесконечно.
      await Promise.race([loaded, sleep(20000)]);
      await sleep(settleMs);
    },
  };
  await page.send('Page.enable');
  await page.send('Runtime.enable');
  await page.send('Emulation.setDeviceMetricsOverride', {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
    mobile: WIDTH < 768,
  });

  try {
    return await fn(page);
  } finally {
    ws.close();
    proc.kill();
    await sleep(500);
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch {
      /* профиль иногда ещё занят Chrome — не критично */
    }
  }
}

// Точные номера узлов нужны и снимку, и съёмке hover — нумеруем одинаково.
export const TAG_SCRIPT = `(() => {
  let i = 0;
  for (const el of document.querySelectorAll('*')) el.setAttribute('data-i', String(i++));
  window.scrollTo(0, 0);
  return i;
})()`;

export const SCROLL_SCRIPT = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let y = 0;
  while (y < document.documentElement.scrollHeight) {
    window.scrollTo(0, y);
    y += 300;
    await sleep(120);
  }
  window.scrollTo(0, document.documentElement.scrollHeight);
  await sleep(2500);
  return document.documentElement.scrollHeight;
})()`;

if (process.argv[1]?.endsWith('snapshot.mjs')) {
  if (!url || !outDir) {
    console.error('usage: node tools/mockups/snapshot.mjs <url> <outDir> [--width 1440] [--height 900]');
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  await withBrowser(async (page) => {
    await page.goto(url);

    const initial = await page.eval(`(() => {
      let i = 0;
      for (const el of document.querySelectorAll('*')) el.setAttribute('data-i', String(i++));
      window.scrollTo(0, 0);
      return '<!doctype html>\\n' + document.documentElement.outerHTML;
    })()`);

    const height = await page.eval(`(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      let y = 0;
      while (y < document.documentElement.scrollHeight) {
        window.scrollTo(0, y);
        y += 300;
        await sleep(120);
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      await sleep(2500);
      return document.documentElement.scrollHeight;
    })()`);

    const final = await page.eval(`(() => {
      // Узлы, созданные после первого снимка, получают свои номера.
      let max = 0;
      for (const el of document.querySelectorAll('[data-i]')) max = Math.max(max, Number(el.getAttribute('data-i')));
      for (const el of document.querySelectorAll('*:not([data-i])')) el.setAttribute('data-i', String(++max));
      return '<!doctype html>\\n' + document.documentElement.outerHTML;
    })()`);

    const sheets = await page.eval(`[...document.styleSheets].map((s) => s.href || '(inline ' + (s.ownerNode?.textContent?.length ?? 0) + ' chars)')`);

    writeFileSync(path.join(outDir, 'initial.html'), initial);
    writeFileSync(path.join(outDir, 'final.html'), final);
    writeFileSync(path.join(outDir, 'meta.json'), JSON.stringify({ url, width: WIDTH, height, sheets }, null, 2));
    console.log(`снимок ${url}: высота ${height}px, узлов initial=${(initial.match(/data-i=/g) || []).length} final=${(final.match(/data-i=/g) || []).length}`);
  });
}
