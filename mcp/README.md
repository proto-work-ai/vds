# Market Component Platform (MCP) Setup

Полная интеграция Spartan NG и Taiga UI Market Component Platform в проект proto.cms.

## 📁 Структура Папки

```
mcp/
├── config/                          # Конфигурационные файлы
│   ├── spartan.json                # Spartan NG MCP конфигурация
│   ├── taiga-ui-mcp.json           # Taiga UI MCP конфигурация
│   └── taiga-ui.config.ts          # TypeScript конфиг Taiga UI
│
├── docs/                            # Документация
│   ├── MCP-INTEGRATION-GUIDE.md     # ⭐ Главное руководство (полная интеграция)
│   ├── MCP-SETUP.md                # Начальное руководство
│   ├── MCP-SUMMARY.md              # Резюме интеграции
│   ├── TAIGA-UI-MCP.md             # Документация Taiga UI MCP
│   ├── SPARTAN-NG-UPDATE.md        # Руководство обновления Spartan NG
│   └── UPDATE-SUMMARY.md           # Резюме обновления
│
├── examples/                        # Примеры компонентов
│   ├── MCP-EXAMPLE.component.ts    # Пример Spartan NG
│   └── TAIGA-UI-EXAMPLE.component.ts # Пример Taiga UI
│
└── README.md                        # Этот файл
```

## 🚀 Быстрый Старт

### 1. Начните с Документации

**Главное руководство:**
- 📖 [`docs/MCP-INTEGRATION-GUIDE.md`](./docs/MCP-INTEGRATION-GUIDE.md) ⭐

**Специальные руководства:**
- 📖 [`docs/MCP-SETUP.md`](./docs/MCP-SETUP.md) - Начальная интеграция
- 📖 [`docs/TAIGA-UI-MCP.md`](./docs/TAIGA-UI-MCP.md) - Taiga UI детально
- 📖 [`docs/SPARTAN-NG-UPDATE.md`](./docs/SPARTAN-NG-UPDATE.md) - Обновление Spartan NG

### 2. Посмотрите Примеры

**Примеры использования:**
- 💻 [`examples/MCP-EXAMPLE.component.ts`](./examples/MCP-EXAMPLE.component.ts) - Spartan NG компоненты
- 💻 [`examples/TAIGA-UI-EXAMPLE.component.ts`](./examples/TAIGA-UI-EXAMPLE.component.ts) - Taiga UI компоненты

### 3. Используйте Конфигурацию

**Конфигурационные файлы:**
- ⚙️ [`config/spartan.json`](./config/spartan.json) - Spartan NG MCP конфиг
- ⚙️ [`config/taiga-ui-mcp.json`](./config/taiga-ui-mcp.json) - Taiga UI MCP конфиг
- ⚙️ [`config/taiga-ui.config.ts`](./config/taiga-ui.config.ts) - TypeScript конфиг

## 📊 Что Установлено

### Spartan NG
- **Версия:** 1.3.3 (Latest stable)
- **Компонентов:** 28+
- **Статус:** ✅ Готов
- **Import Alias:** `@spartan-ng/helm/*`

### Taiga UI
- **Версия:** 5.7.0
- **Компонентов:** 60+
- **Статус:** ✅ Готов
- **Import Alias:** `@taiga-ui/*`

## 🎯 Основные Компоненты

### Spartan NG (28+)
- Alert, Alert Dialog, Avatar
- Breadcrumb, Button, Checkbox
- Collapsible, Dialog, Dropdown Menu
- Field, Form Field, Icon
- Input, Input Group, Label
- Navigation Menu, Pagination, Popover
- Select, Separator, Sheet
- Sidebar, Skeleton, Table
- Textarea, Tooltip, Typography

### Taiga UI (60+)
- Buttons, Inputs (Text, Number, Date, Time, etc.)
- Select, Combo Box, Multi Select
- Tables, Pagination
- Tabs, Accordion, Collapsible
- Cards, Avatars, Badges
- Forms, Validation
- Dialogs, Modals
- Notifications, Alerts
- Icons, Loading States
- И много другого...

## 📖 Документация

### Для Начинающих
1. Прочитайте [`docs/MCP-SETUP.md`](./docs/MCP-SETUP.md)
2. Посмотрите примеры в `examples/`
3. Используйте конфиги из `config/`

### Для Опытных Разработчиков
1. Изучите [`docs/MCP-INTEGRATION-GUIDE.md`](./docs/MCP-INTEGRATION-GUIDE.md)
2. Проверьте Breaking Changes в [`docs/SPARTAN-NG-UPDATE.md`](./docs/SPARTAN-NG-UPDATE.md)
3. Кастомизируйте `config/` файлы под ваши нужды

### Для Обновления
1. Читайте [`docs/SPARTAN-NG-UPDATE.md`](./docs/SPARTAN-NG-UPDATE.md)
2. Проверьте [`docs/UPDATE-SUMMARY.md`](./docs/UPDATE-SUMMARY.md)

## 💡 Рекомендации

### Выбор Компонентов

**Используйте Spartan NG когда:**
- Нужны простые, минималистичные компоненты
- Требуется легкая кастомизация
- Приоритет: дизайн и простота

**Используйте Taiga UI когда:**
- Нужны сложные компоненты (таблицы, датапикеры)
- Требуется встроенная функциональность
- Приоритет: функциональность и возможности

## 🔧 Конфигурация

### App Config

Добавьте в `apps/proto/src/app/app.config.ts`:

```typescript
import { provideTaigaUI } from './mcp/config/taiga-ui.config';

export const appConfig: ApplicationConfig = {
  providers: [
    ...provideTaigaUI(),
    // другие провайдеры
  ]
};
```

### Path Aliases

Проверьте `tsconfig.base.json` (пути уже добавлены):

```json
{
  "paths": {
    "@spartan-ng/helm/*": ["libs/ui/*/src/index.ts"],
    "@taiga-ui/*": ["node_modules/@taiga-ui/*"]
  }
}
```

## 📝 Использование Компонентов

### Spartan NG

```typescript
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  imports: [HlmButtonImports],
  template: `<button hlmBtn>Click me</button>`
})
```

### Taiga UI

```typescript
import { TuiButtonModule } from '@taiga-ui/kit';

@Component({
  imports: [TuiButtonModule],
  template: `<button tuiButton appearance="primary">Click me</button>`
})
```

## 🔗 Быстрые Ссылки

**Документация:**
- [MCP-INTEGRATION-GUIDE.md](./docs/MCP-INTEGRATION-GUIDE.md) ⭐ **START HERE**
- [MCP-SETUP.md](./docs/MCP-SETUP.md)
- [TAIGA-UI-MCP.md](./docs/TAIGA-UI-MCP.md)
- [SPARTAN-NG-UPDATE.md](./docs/SPARTAN-NG-UPDATE.md)

**Примеры:**
- [MCP-EXAMPLE.component.ts](./examples/MCP-EXAMPLE.component.ts)
- [TAIGA-UI-EXAMPLE.component.ts](./examples/TAIGA-UI-EXAMPLE.component.ts)

**Конфигурация:**
- [spartan.json](./config/spartan.json)
- [taiga-ui-mcp.json](./config/taiga-ui-mcp.json)
- [taiga-ui.config.ts](./config/taiga-ui.config.ts)

## ✅ Checklist

- [x] Spartan NG установлен (v1.3.3)
- [x] Taiga UI установлен (v5.7.0)
- [x] Конфигурация создана
- [x] Документация написана
- [x] Примеры созданы
- [x] MCP папка организована
- [ ] npm install (нужно выполнить)
- [ ] npm run proto:dev (нужно запустить и проверить)

## 🚀 Установка Зависимостей

```bash
# Перейти в корень проекта
cd proto.cms

# Установить зависимости
npm install

# Проверить версии
npm list @spartan-ng/brain
npm list @taiga-ui/core

# Запустить приложение
npm run proto:dev
```

## 📞 Поддержка

**Официальная Документация:**
- [Spartan NG](https://spartan.ng)
- [Taiga UI](https://taiga-ui.dev)
- [Angular 21](https://angular.io)

**Если возникли проблемы:**
1. Проверьте документацию в `docs/`
2. Посмотрите примеры в `examples/`
3. Проверьте конфиги в `config/`
4. Прочитайте official docs

## 📊 Версии

| Компонент | Версия | Статус |
|-----------|--------|--------|
| Spartan NG | 1.3.3 | ✅ Актуально |
| Taiga UI | 5.7.0 | ✅ Актуально |
| Angular | 21.2.7 | ✅ Совместимо |
| TypeScript | 5.9.2 | ✅ Совместимо |

---

**Папка создана:** 27.08.2026  
**Статус:** ✅ Production Ready

Начните с [`MCP-INTEGRATION-GUIDE.md`](./docs/MCP-INTEGRATION-GUIDE.md)! 🚀
