# Taiga UI MCP Setup Guide

Полная интеграция Taiga UI Market Component Platform в проект proto.cms.

## 📦 Установленные Пакеты Taiga UI

### Core Packages
- **@taiga-ui/core** (5.7.0) - Основные компоненты и функциональность
- **@taiga-ui/kit** (5.7.0) - Расширенный набор компонентов
- **@taiga-ui/cdk** (5.7.0) - Component Development Kit
- **@taiga-ui/styles** (5.7.0) - Стили и темы

### Additional Packages
- **@taiga-ui/layout** (5.7.0) - Компоненты макета
- **@taiga-ui/icons** (5.7.0) - Библиотека иконок
- **@taiga-ui/event-plugins** (5.0.0) - Плагины событий
- **@taiga-ui/addon-table** (5.7.0) - Компоненты таблиц
- **@taiga-ui/addon-mobile** (5.7.0) - Мобильные компоненты
- **@taiga-ui/experimental** (5.7.0) - Экспериментальные компоненты
- **@taiga-ui/polymorpheus** (5.0.1) - Полиморфные компоненты

## ⚙️ Файлы Конфигурации

### 1. `taiga-ui-mcp.json` - MCP Configuration
Главный файл конфигурации для Taiga UI MCP:
- Регистрация всех пакетов и компонентов
- Настройка темы и стилей
- Design tokens (цвета, радиусы, размеры)
- Импорт-алиасы

### 2. `taiga-ui.config.ts` - TypeScript Configuration
Конфигурация приложения:
- Провайдеры Taiga UI
- Конфигурация компонентов по умолчанию
- Темы (light/dark)
- Функция `provideTaigaUI()` для интеграции в app config

### 3. `tsconfig.base.json` - Path Aliases
Пути импорта для всех Taiga UI пакетов:
```json
{
  "paths": {
    "@taiga-ui/core": ["node_modules/@taiga-ui/core"],
    "@taiga-ui/kit": ["node_modules/@taiga-ui/kit"],
    "@taiga-ui/layout": ["node_modules/@taiga-ui/layout"],
    ...
  }
}
```

## 🚀 Использование в Приложении

### Базовая Интеграция

1. **В app.config.ts:**
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

2. **В компонентах:**
```typescript
import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/kit';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
  selector: 'app-example',
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

## 📋 Доступные Компоненты

### Core Components (@taiga-ui/core)
- Button
- Icon
- Textfield
- Progress
- Scrollbar
- Notification
- Dropdown
- Tooltip
- Popup
- Modal
- Input
- Label
- Option
- Error, Hint

### Kit Components (@taiga-ui/kit)
**Формы и Ввод:**
- Input (текст, число, пароль, чип, дата, время и т.д.)
- Combo Box
- Multi Select
- Select
- Textarea
- Radio, Radio Group
- Checkbox
- Toggle, Switcher
- Slider, Range
- Counter

**Навигация:**
- Breadcrumbs
- Tabs
- Pagination
- Sidebar
- Drawer

**Отображение:**
- Avatar
- Badge, Badge Notification
- Tile, Tiles
- Card, Block
- Island
- Comment
- Tag
- Thumbnail

**Другое:**
- Accordion
- Confirm
- Filter
- Loader, Spinner
- Rating
- Table
- Tree
- Stepper

### Layout Components (@taiga-ui/layout)
- Header
- Footer
- Aside
- Sidebar
- Mobile Sidebar

### Table Components (@taiga-ui/addon-table)
- Table
- Table Head, Body, Row, Cell
- Table Pagination

### Icons (@taiga-ui/icons)
- Полная библиотека иконок
- Импорт через `@taiga-ui/icons`

### Mobile Components (@taiga-ui/addon-mobile)
- Mobile Aware
- Mobile Dropdown
- Mobile Optimized Components

## 🎨 Темы и Стили

### Текущие Темы
Конфигурированы в `taiga-ui.config.ts`:

**Light Theme:**
- Primary: #3b82f6 (Blue)
- Secondary: #8b5cf6 (Purple)
- Success: #10b981 (Green)
- Warning: #f59e0b (Orange)
- Error: #ef4444 (Red)
- Info: #06b6d4 (Cyan)

**Dark Theme:**
- Primary: #60a5fa (Light Blue)
- Secondary: #a78bfa (Light Purple)
- Success: #34d399 (Light Green)
- Warning: #fbbf24 (Light Orange)
- Error: #f87171 (Light Red)
- Info: #22d3ee (Light Cyan)

### CSS Variables
Taiga UI автоматически генерирует CSS переменные для всех цветов и размеров. Используйте в стилях:
```css
color: var(--tui-base-01);
background: var(--tui-primary);
border-radius: var(--tui-radius-m);
```

## 🔧 Примеры Компонентов

### Кнопка
```typescript
import { TuiButtonModule } from '@taiga-ui/kit';

@Component({
  imports: [TuiButtonModule],
  template: `
    <button tuiButton appearance="primary" size="m">
      Click me
    </button>
  `
})
```

### Инпут
```typescript
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  imports: [TuiInputModule],
  template: `
    <input tuiTextfield placeholder="Enter text" />
  `
})
```

### Таблица
```typescript
import { TuiTableModule } from '@taiga-ui/addon-table';

@Component({
  imports: [TuiTableModule],
  template: `
    <table tui-table [columns]="['Name', 'Email']">
      <tr *ngFor="let row of data">
        <td>{{ row.name }}</td>
        <td>{{ row.email }}</td>
      </tr>
    </table>
  `
})
```

### Диалог
```typescript
import { TuiDialogService } from '@taiga-ui/core';

constructor(private dialogService: TuiDialogService) {}

open() {
  this.dialogService.open('Your content here').subscribe();
}
```

## 📚 Документация и Ресурсы

- [Taiga UI Official Docs](https://taiga-ui.dev)
- [Taiga UI Components](https://taiga-ui.dev/documentation/getting-started/setup)
- [Design System](https://taiga-ui.dev/design-system)
- [Icons Library](https://taiga-ui.dev/icons)

## 🔗 Связанные Файлы

- `taiga-ui-mcp.json` - Конфигурация MCP
- `taiga-ui.config.ts` - TypeScript конфиг
- `tsconfig.base.json` - Path aliases
- `apps/proto/src/app/app.config.ts` - App configuration
- `spartan.json` - Spartan NG MCP config
- `MCP-SETUP.md` - Общая документация

## ⚡ Quick Tips

1. **Event Plugins**: Всегда подключайте `provideEventPlugins()` для корректной работы событий
2. **Accessibility**: Taiga UI компоненты полностью accessible (WCAG)
3. **Performance**: Компоненты оптимизированы для production
4. **CSS-in-JS**: Используйте CSS переменные вместо hard-coded цветов
5. **RTL Support**: Автоматическая поддержка RTL языков
6. **Dark Mode**: Автоматическое переключение темы

## ✅ Checklist для Использования

- [ ] Импортировать `provideTaigaUI()` в app config
- [ ] Добавить `TuiRootModule` в корневой компонент
- [ ] Использовать path aliases из `tsconfig.base.json`
- [ ] Применить темы из `taiga-ui.config.ts`
- [ ] Проверить CSS переменные для кастомизации
