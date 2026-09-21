# shtorivdom — сайт салона штор на заказ

Отвечай пользователю по-русски.

Nx-монорепозиторий с одним продуктом — сайтом shtorivdom.ru (пошив штор,
жалюзи, карнизы; Москва и область).

## Приложения

- `apps/shtorivdom-site` — сайт на Angular 22 с пререндером
  (`outputMode: static`). Taiga UI 5.22 + Tailwind 4.
- `apps/shtorivdom-site/api/*.php` — отправка заявок с форм на почту.
  **PHP не трогаем без отдельной просьбы.**
- `apps/shtorivdom-storybook` — Storybook для `libs/ui/site-kit` и оставшихся
  общих компонентов. К сайту напрямую не относится.

## Библиотеки

- `libs/atlas/{core,form}` — общие утилиты и формы на Taiga UI.
- `libs/ui/site-kit` — компоненты и стили основного сайта.
- `libs/metadb/core`, `libs/fonts`.

## Команды

```bash
npm run site:serve          # http://localhost:4200
npm run site:build          # продакшен-сборка
npm run site:start          # запустить собранный SSR-сервер
npm run storybook:serve     # http://localhost:4400
npm run sitemap             # sitemap.xml и robots.txt
```

## Грабли

- Версии Angular держать одинаковыми (~21.2.x) у всех `@angular/*`, иначе
  `npm install` падает на peer-зависимостях.
- Taiga UI зафиксирован `~5.13.0`: в 5.23 другие экспорты.
- Цены — `model/price-list.service.ts` (`curtainPriceMap` по `key` страницы
  каталога). Цифры ориентировочные, ждут реального прайса.
- Шрифты: Lato 2.0 (`lato-font`, текст) и Playfair Display
  (`@fontsource/playfair-display`, заголовки), оба с кириллицей; подключены в
  `styles` в `project.json`. У Lato из Google Fonts кириллицы нет.
- Правила владельца — скилл `shtorivdom-owner-rules`.
- Предупреждения NG8113 (импорт не используется в шаблоне) убирать сразу.

Чек-лист перед сдачей правки — [REVIEW.md](REVIEW.md).
