import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const repositoryRoot = path.resolve('.')
const mockupsRoot = path.join(
  repositoryRoot,
  'apps',
  'shtorivdom-mockups',
  'public',
  'legacy',
)
const imagesRoot = path.join(mockupsRoot, 'assets', 'img', 'unsplash')
const targets = [
  'images/index.html',
  'landing-1/index.html',
  'landing-1/index.html.assets.json',
  'landing-3/index.html',
  'landing-3/index.html.assets.json',
  'landing-5/index.html',
  'landing-5/index.html.assets.json',
  'landing-6/index.html',
  'landing-6/index.html.assets.json',
  'landing-8/index.html',
  'landing-8/index.html.assets.json',
]
const unsplashPattern =
  /https:\/\/images\.unsplash\.com\/(photo-[^?&"'()\s<>]+)(?:\?([^"'()\s<>]*))?/g

const getOriginalSource = (file) =>
  execFileSync('git', ['show', `HEAD:mockups/${file}`], {
    cwd: repositoryRoot,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  })

const normalizeUrl = (url) => url.replaceAll('&amp;', '&')

const getFileName = (id, query) => {
  const parameters = new URLSearchParams(query.replaceAll('&amp;', '&'))
  const width = parameters.get('w') ?? 'original'
  const height = parameters.get('h') ?? 'auto'
  const fit = parameters.get('fit') ?? 'original'

  return `${id}-${width}x${height}-${fit}.jpg`
}

const sources = new Map(targets.map((file) => [file, getOriginalSource(file)]))
const downloads = new Map()

for (const source of sources.values()) {
  for (const match of source.matchAll(unsplashPattern)) {
    const [rawUrl, id, query = ''] = match
    const url = normalizeUrl(rawUrl)
    downloads.set(url, getFileName(id, query))
  }
}

if (process.argv.includes('--prepare-browser')) {
  const imageTags = [...downloads.keys()]
    .map((url) => `<img src="${url.replaceAll('&', '&amp;')}" alt="" />`)
    .join('\n')
  const downloadPage = `<!doctype html>
<html lang="ru">
  <head><meta charset="UTF-8" /><title>Unsplash assets</title></head>
  <body>${imageTags}</body>
</html>
`

  await writeFile(path.join(mockupsRoot, 'unsplash-download.html'), downloadPage)
  console.log(`Подготовлена браузерная страница для ${downloads.size} URL`)
  process.exit(0)
}

await mkdir(imagesRoot, { recursive: true })

const failures = []

for (const [url, fileName] of downloads) {
  const destination = path.join(imagesRoot, fileName)

  try {
    const existing = await readFile(destination)

    if (existing.length > 1024) {
      continue
    }
  } catch {
    // Файл ещё не скачан.
  }

  try {
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(url)}`
    const response = await fetch(proxyUrl, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const contentType = response.headers.get('content-type') ?? ''
    const bytes = Buffer.from(await response.arrayBuffer())

    if (!contentType.startsWith('image/') || bytes.length < 1024) {
      throw new Error(`получен не файл изображения (${contentType || 'без content-type'})`)
    }

    await writeFile(destination, bytes)
    console.log(`Скачано: ${fileName}`)
  } catch (error) {
    failures.push({ fileName, url, error: error.message })
  }
}

for (const [file, originalSource] of sources) {
  const absoluteFile = path.join(mockupsRoot, file)
  const relativeImagesRoot = path
    .relative(path.dirname(absoluteFile), imagesRoot)
    .replaceAll('\\', '/')
  const localized = originalSource.replace(unsplashPattern, (rawUrl, id, query = '') => {
    const fileName = downloads.get(normalizeUrl(rawUrl)) ?? getFileName(id, query)

    return `${relativeImagesRoot}/${fileName}`
  })

  await writeFile(absoluteFile, localized)
}

console.log(`Локализовано URL: ${downloads.size}; обновлено файлов: ${sources.size}`)

if (failures.length) {
  console.error('\nНе скачаны:')

  for (const failure of failures) {
    console.error(`${failure.fileName}\n${failure.url}\n${failure.error}\n`)
  }

  process.exitCode = 1
}
