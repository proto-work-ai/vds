import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDirectory, '../..');
const appRoot = resolve(workspaceRoot, 'apps/mockups');
const legacyRoot = resolve(workspaceRoot, 'apps/mockups/public/legacy');
const inputPath = resolve(appRoot, 'tailwind.css');
const baseTheme = await readFile(inputPath, 'utf8');
const pagePaths = [
  resolve(legacyRoot, 'index.html'),
  resolve(legacyRoot, 'images/index.html'),
  resolve(legacyRoot, 'icons/index.html'),
];

for (const entry of await readdir(legacyRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || !/^landing-\d+$/.test(entry.name)) continue;
  pagePaths.push(resolve(legacyRoot, entry.name, 'index.html'));
}

for (const pagePath of pagePaths) {
  let html;
  try {
    html = await readFile(pagePath, 'utf8');
  } catch {
    continue;
  }

  const pageDirectory = dirname(pagePath);
  const localScripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => match[1])
    .filter(
      (source) => !/^(?:[a-z]+:)?\/\//i.test(source) && ['.js', '.mjs'].includes(extname(source)),
    )
    .map((source) => resolve(pageDirectory, source));
  const utilityStyles = [
    ...html.matchAll(
      /<style\b(?=[^>]*\btype=["']text\/tailwindcss["'])[^>]*>([\s\S]*?)<\/style>/gi,
    ),
  ].map((match) => match[1]);
  const sources = [pagePath, ...localScripts]
    .map((source) => `@source "${relative(appRoot, source).replaceAll('\\', '/')}";`)
    .join('\n');
  const outputPath = resolve(pageDirectory, 'tailwind.generated.css');
  const sourceName = relative(legacyRoot, pageDirectory).replaceAll('\\', '-') || 'catalog';
  const cssSource = [sources, baseTheme, ...utilityStyles].join('\n\n');
  const result = await postcss([tailwindcss({ base: appRoot })]).process(cssSource, {
    from: resolve(appRoot, `.tailwind-${sourceName}.css`),
    to: outputPath,
  });

  await writeFile(outputPath, result.css);
  console.log(`Tailwind собран: ${relative(workspaceRoot, outputPath)}`);
}
