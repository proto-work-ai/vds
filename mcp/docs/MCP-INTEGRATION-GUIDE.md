# MCP Integration Guide - Spartan NG & Taiga UI

Полное руководство по интеграции Market Component Platform (MCP) для Spartan NG и Taiga UI в проект proto.cms.

## 📋 Содержание

1. [Обзор](#обзор)
2. [Установленные Библиотеки](#установленные-библиотеки)
3. [Конфигурационные Файлы](#конфигурационные-файлы)
4. [Spartan NG MCP](#spartan-ng-mcp)
5. [Taiga UI MCP](#taiga-ui-mcp)
6. [Использование](#использование)
7. [Примеры](#примеры)
8. [Кастомизация](#кастомизация)

## 🎯 Обзор

Проект proto.cms полностью интегрирован с двумя мощными UI библиотеками:

| Параметр | Spartan NG | Taiga UI |
|----------|-----------|----------|
| **Версия** | 1.3.3 (Latest stable) | 5.7.0 |
| **Тип** | Shadcn-style components | Enterprise UI kit |
| **Компонентов** | 28+ | 60+ |
| **Фокус** | Минимализм, дизайн | Функциональность, таблицы |
| **Стили** | CSS/Tailwind | CSS-in-JS |
| **Обновлено** | 27.08.2026 | - |

## 📦 Установленные Библиотеки

### Spartan NG
```json
{
  "@spartan-ng/brain": "^1.3.3",
  "@spartan-ng/cli": "^1.3.3"
}
```

**Изменения в версии 1.3.3:**
- ✅ Стабильный релиз (вместо альфа-версии)
- ✅ Обновленные импорты (HlmBreadcrumbImports вместо HlmBreadCrumbImports)
- ✅ Улучшенная совместимость с Angular 21
- ✅ Новые компоненты и фичи

**Компоненты:**
- Alert, Alert Dialog
- Avatar, Breadcrumb, Button
- Checkbox, Collapsible, Dialog
- Dropdown Menu, Field, Form Field
- Icon, Input, Input Group, Label
- Navigation Menu, Pagination, Popover
- Select, Separator, Sheet
- Sidebar, Skeleton, Table
- Textarea, Tooltip, Typography

### Taiga UI
```json
{
  "@taiga-ui/core": "^5.7.0",
  "@taiga-ui/kit": "^5.7.0",
  "@taiga-ui/layout": "^5.7.0",
  "@taiga-ui/addon-table": "^5.7.0",
  "@taiga-ui/addon-mobile": "^5.7.0",
  "@taiga-ui/icons": "^5.7.0",
  "@taiga-ui/cdk": "^5.7.0",
  "@taiga-ui/styles": "^5.7.0",
  "@taiga-ui/event-plugins": "^5.0.0"
}
```

## ⚙️ Конфигурационные Файлы

### Созданные Файлы

1. **config/spartan.json** - Spartan NG MCP конфигурация
   - Регистрация 28 компонентов
   - Импорт-алиасы: `@spartan-ng/helm/*`
   - Настройка темы и CSS переменных

2. **config/taiga-ui-mcp.json** - Taiga UI MCP конфигурация
   - Регистрация всех пакетов и компонентов
   - Design tokens (цвета, радиусы)
   - Настройки темы и палитры

3. **config/taiga-ui.config.ts** - TypeScript конфигурация Taiga UI
   - Провайдеры и модули
   - Функция `provideTaigaUI()`
   - Конфигурация компонентов по умолчанию
   - Light и dark темы

4. **tsconfig.base.json** - Path aliases для обеих библиотек
   - Spartan NG: `@spartan-ng/helm/*`
   - Taiga UI: `@taiga-ui/*`

### Обновленные Файлы

- `apps/proto/src/app/app.config.ts` - Включены event plugins

## 🔨 Spartan NG MCP

### Интеграция

```typescript
// импорт компонента
import { HlmButtonDirective } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-example',
  imports: [HlmButtonDirective],
  template: `<button hlmBtn>Click me</button>`
})
export class ExampleComponent {}
```

### Доступные Компоненты (28)

**Базовые:**
- Button (hlmBtn)
- Icon (hlmIcon)
- Label (hlmLabel)

**Формы:**
- Input (hlmInput)
- Checkbox (hlmCheckbox)
- Form Field (hlmFormField)
- Textarea (hlmTextarea)

**Диалоги и Поповеры:**
- Dialog (hlmDialog)
- Alert Dialog (hlmAlertDialog)
- Popover (hlmPopover)
- Tooltip (hlmTooltip)
- Dropdown Menu

**Навигация:**
- Breadcrumb (hlmBreadcrumb)
- Pagination (hlmPagination)
- Navigation Menu
- Sidebar

**Отображение:**
- Avatar (hlmAvatar)
- Alert (hlmAlert)
- Separator (hlmSeparator)
- Skeleton (hlmSkeleton)
- Typography

**Таблицы:**
- Table (hlmTable)

## 🌈 Taiga UI MCP

### Интеграция

```typescript
import { TuiRootModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/kit';
import { provideTaigaUI } from './taiga-ui.config';

@Component({
  imports: [TuiRootModule, TuiButtonModule],
  template: `
    <tui-root>
      <button tuiButton appearance="primary">
        Taiga UI Button
      </button>
    </tui-root>
  `
})
export class ExampleComponent {}
```

### Доступные Компоненты (60+)

**Ввод Данных:**
- Input, Textfield
- Select, Combo Box, Multi Select
- Checkbox, Radio, Toggle, Switcher
- Slider, Range, Counter
- Date, Time, DateTime Pickers
- Textarea, Input Chip

**Навигация:**
- Tabs, Breadcrumbs
- Pagination, Sidebar, Drawer
- Navigation Menu

**Отображение:**
- Avatar, Badge, Tile
- Card, Block, Island
- Comment, Tag
- Table, Tree

**Функциональность:**
- Accordion
- Confirm Dialog
- Filter, Sort
- Loader, Spinner
- Rating, Progress

**Макет:**
- Header, Footer, Aside
- Layout Container

## 🚀 Использование

### Выбор между Spartan NG и Taiga UI

**Используйте Spartan NG когда:**
- Нужны простые, минималистичные компоненты
- Требуется легкая кастомизация
- Приоритет: дизайн и простота

**Используйте Taiga UI когда:**
- Нужны сложные компоненты (таблицы, датапикеры)
- Требуется встроенная функциональность
- Приоритет: функциональность и возможности

### Базовый Setup

1. **App Config:**
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideTaigaUI } from './taiga-ui.config';

export const appConfig: ApplicationConfig = {
  providers: [
    ...provideTaigaUI(),
    // другие провайдеры
  ]
};
```

2. **Компонент:**
```typescript
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { TuiButtonModule } from '@taiga-ui/kit';

@Component({
  imports: [HlmButtonDirective, TuiButtonModule],
  template: `
    <!-- Spartan NG -->
    <button hlmBtn>Spartan Button</button>
    
    <!-- Taiga UI -->
    <button tuiButton appearance="primary">Taiga Button</button>
  `
})
```

## 📚 Примеры

### Пример 1: Форма с Spartan NG

```typescript
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

@Component({
  imports: [HlmFormFieldModule, HlmInputDirective, HlmButtonDirective],
  template: `
    <div hlmFormField>
      <label hlmLabel>Email</label>
      <input hlmInput type="email" placeholder="example@com" />
    </div>
    <button hlmBtn>Submit</button>
  `
})
```

### Пример 2: Таблица с Taiga UI

```typescript
import { TuiTableModule } from '@taiga-ui/addon-table';
import { CommonModule } from '@angular/common';

@Component({
  imports: [TuiTableModule, CommonModule],
  template: `
    <table tui-table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.status }}</td>
        </tr>
      </tbody>
    </table>
  `
})
```

## 🎨 Кастомизация

### Taiga UI Темы

Обновите цвета в `taiga-ui.config.ts`:

```typescript
export const tuiThemeConfig = {
  light: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      // ... другие цвета
    }
  }
};
```

### Spartan NG Стили

Обновите `spartan.json`:

```json
{
  "baseColors": {
    "light": "#ffffff",
    "dark": "#0f0f0f"
  },
  "radius": "0.5rem"
}
```

### CSS Переменные

Обе библиотеки используют CSS переменные:

```css
/* Taiga UI */
color: var(--tui-base-01);
background: var(--tui-primary);
border-radius: var(--tui-radius-m);

/* Spartan NG */
color: var(--spartan-foreground);
background: var(--spartan-primary);
```

## 📖 Документация

- [Spartan NG Documentation](https://spartan.ng)
- [Spartan NG MCP Guide](https://spartan.ng/documentation/mcp)
- [Taiga UI Documentation](https://taiga-ui.dev)
- [Taiga UI Components](https://taiga-ui.dev/documentation)

## 📁 Структура Файлов

```
proto.cms/
├── mcp/                           # Market Component Platform папка
│   ├── config/
│   │   ├── spartan.json          # Spartan NG MCP config
│   │   ├── taiga-ui-mcp.json     # Taiga UI MCP config
│   │   └── taiga-ui.config.ts    # Taiga UI TypeScript config
│   ├── docs/
│   │   ├── MCP-INTEGRATION-GUIDE.md  # Этот файл
│   │   ├── MCP-SETUP.md          # Начальная документация
│   │   ├── MCP-SUMMARY.md        # Резюме
│   │   ├── TAIGA-UI-MCP.md       # Документация Taiga UI
│   │   ├── SPARTAN-NG-UPDATE.md  # Руководство обновления
│   │   └── UPDATE-SUMMARY.md     # Резюме обновления
│   ├── examples/
│   │   ├── MCP-EXAMPLE.component.ts        # Пример Spartan NG
│   │   └── TAIGA-UI-EXAMPLE.component.ts   # Пример Taiga UI
│   └── README.md                 # Индекс MCP папки
├── tsconfig.base.json             # Path aliases
└── apps/proto/src/
    └── app/
        └── app.config.ts          # App configuration
```

## ✅ Checklist

- [x] Spartan NG установлен (0.0.1-alpha.643)
- [x] Taiga UI установлен (5.7.0)
- [x] spartan.json создан
- [x] taiga-ui-mcp.json создан
- [x] taiga-ui.config.ts создан
- [x] Path aliases добавлены в tsconfig
- [x] Event plugins подключены в app config
- [x] Примеры компонентов созданы
- [x] Документация написана

## 🔗 Быстрые Ссылки

- [MCP-SETUP.md](./MCP-SETUP.md) - Начальная документация
- [MCP-EXAMPLE.component.ts](./MCP-EXAMPLE.component.ts) - Пример Spartan NG
- [TAIGA-UI-MCP.md](./TAIGA-UI-MCP.md) - Документация Taiga UI
- [TAIGA-UI-EXAMPLE.component.ts](./TAIGA-UI-EXAMPLE.component.ts) - Пример Taiga UI

---

**Готово к разработке!** 🚀

Обе библиотеки MCP полностью интегрированы и готовы к использованию в проекте.
