---
name: shtorivdom-owner-rules
description: Правила Андрея для проекта shtorivdom (сайт штор на заказ, Nx + Angular 21 SSR). Применять при любой правке apps/shtorivdom-site, apps/shtorivdom-storybook и libs — перед чисткой кода, переименованиями, добавлением шрифтов, цен, SEO, перед коммитом и когда нужно предложить план работ.
---

# Правила владельца shtorivdom

Проект — сайт салона **штор на заказ** (shtorivdom.ru). Код достался от сайта
натяжных потолков; всё, что связывает с потолками, — мусор.

## Границы

- **PHP (`apps/shtorivdom-site/api/*.php`) не трогать**, пока владелец не попросит.
  Работаем только с фронтом.
- Сначала — чтобы всё **собиралось и запускалось** (`npm run site:serve`,
  `npm run storybook:serve`), потом улучшения.

## Как предлагать работу

- Когда вариантов несколько — **дать выбрать** через вопрос с вариантами
  (AskUserQuestion, multiSelect), а не спрашивать текстом.
- Удаление файлов — после явного «да» владельца; выбранный в меню пункт
  «удалить» считается разрешением.

## Чистка кода

- Удалять мёртвый код: неиспользуемые компоненты, модули, страницы, данные.
- Удалять **неиспользуемые импорты**, включая пустые `import {} from '...'`,
  и лишнее в `imports: [...]` компонентов (предупреждения NG8113).
  Проверка: `npx tsc -p apps/shtorivdom-site/tsconfig.app.json --noEmit --noUnusedLocals`.
- Удалять **ненужные комментарии** в коде и шаблонах: закомментированный код,
  HTML-метки вида `<!--Footer-->`. Оставлять только комментарии, объясняющие «почему»,
  eslint-директивы и TODO.

## Именование

- Никаких потолков в именах: не `StretchCeiling*`, `ProductType` потолков,
  `STPriceGroup` и т.п. Имена — про шторы и каталог (`injectCatalog`,
  `injectCatalogItemByKey`, `curtainPriceMap`).
- Тексты интерфейса — про шторы («Вид штор», а не «Тип потолка»).
- Цели Яндекс.Метрики (`ym(..., 'reachGoal', '<id>')`) не переименовывать
  без владельца: id должен совпадать с настройкой счётчика. Функции-обёртки
  переименовывать можно.

## Цены

- Пока нет реального прайса — таблица цен **по образцу прайса потолков**:
  `model/price-list.service.ts` (`curtainPriceMap` по `key` страницы каталога),
  таблица `price-list-brand-table`, с пометкой «цены ориентировочные».
  Цифры заменить, когда владелец пришлёт прайс.

## Шрифты

- **Playfair Display** — заголовки, **Lato** — текст и кнопки. Обязательно
  с **кириллицей**.
- Playfair Display — пакет `@fontsource/playfair-display` (подмножества
  `cyrillic` и `latin`). У Lato в Google Fonts / @fontsource кириллицы нет —
  брать **Lato 2.0** из npm-пакета `lato-font` (официальная 2.015, OFL).
  Подключение — массив `styles` в `apps/shtorivdom-site/project.json`,
  переменные `--default-font-family` и `--heading-font-family` в `styles.scss`.
- Неиспользуемые шрифты удалять.

## SEO

- У каждой страницы свои title и description (`data.seo` маршрута или
  конструктор страницы каталога), canonical ставит `provideSeo()`.
- После добавления страниц — `npm run sitemap`.

## Коммиты

- Один коммит в конце работы, без push.

## Макеты

- Макеты редизайна — `mockups/` (по образцу DesignPad): HTML + Tailwind 4
  (браузерная сборка) + Lucide. Запуск: `npm run mockups` → http://localhost:4320.
- Тема — `mockups/assets/theme.css` (палитра navy/gold/cream, шрифты Lato и
  Playfair Display). После правки: `node mockups/assets/build-theme.mjs`,
  `theme.js` руками не править.
- Один экран — один файл, у каждого карточка в `mockups/index.html`.
- Картинки — только свои (`mockups/assets/img`, копии из `apps/shtorivdom-site/public`).
- Референс редизайна — лендинг Figma Make: копируем структуру, сетки, отступы,
  цвета и шрифты; тексты, фото, цены и контакты — shtorivdom. Отзывы — заглушки,
  пока нет настоящих.
