# shtorivdom — сайт салона штор на заказ

Отвечай пользователю по-русски.

Nx-монорепозиторий с одним продуктом — сайтом shtorivdom.ru (пошив штор,
жалюзи, карнизы; Москва и область).

## Приложения

- `apps/shtorivdom-site` — сайт на Angular 21 с SSR и пререндером
  (`outputMode: server`). Taiga UI 5.13 + Tailwind 4.
- `apps/shtorivdom-site/api/*.php` — отправка заявок с форм на почту.
  **PHP не трогаем без отдельной просьбы.**
- `apps/shtorivdom-storybook` — Storybook для компонентов `libs/ui` и
  `libs/atlas`. К сайту напрямую не относится.

## Библиотеки

- `libs/atlas/{core,form,table}` — общие утилиты, формы, таблицы (Taiga UI).
- `libs/ui/*` — компоненты Spartan NG (`@spartan-ng/helm/*`), версия brain
  зафиксирована `0.0.1-alpha.643` — на 1.x API несовместим.
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

## Перенос на Angular

- При переносе макета или функциональности на сайт весь переносимый код
  переписывать на Angular: разметку — в шаблон компонента, состояние — в
  signals/модели, действия — в методы компонентов или директив, общие данные —
  в сервисы или типизированные входы. Не оставлять рядом отдельный JS с
  `querySelector`, ручной заменой HTML или глобальными обработчиками событий,
  если это поведение относится к Angular-компоненту.
- После переноса удалять ставший ненужным макетный JS и проверять сценарий в
  браузере, включая SSR и мобильный экран.

Чек-лист перед сдачей правки — [REVIEW.md](REVIEW.md).
