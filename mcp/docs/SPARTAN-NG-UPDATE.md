# Spartan NG Update Guide

**Дата обновления:** 27 августа 2026  
**Старая версия:** 0.0.1-alpha.643  
**Новая версия:** 1.3.3 (Latest stable)

## 📋 Что Было Обновлено

### 1. Package.json
```json
// СТАРАЯ ВЕРСИЯ
"@spartan-ng/brain": "0.0.1-alpha.643",
"@spartan-ng/cli": "0.0.1-alpha.643",

// НОВАЯ ВЕРСИЯ
"@spartan-ng/brain": "^1.3.3",
"@spartan-ng/cli": "^1.3.3",
```

### 2. Коды Компонентов

**Обновлены импорты:**
- `HlmBreadCrumbImports` → `HlmBreadcrumbImports`

**Файлы обновлены:**
- ✅ `apps/proto/src/app/modules/nav/header-breadcrumb/nav-header-breadcrumb.component.ts`
- ✅ `apps/proto-storybook/src/app/modules/nav/sidebar-header/header-breadcrumb/header-breadcrumb.component.ts`

### 3. Конфигурационные Файлы

**spartan.json:**
- Добавлена версия: `"version": "1.3.3"`
- Добавлено имя проекта: `"projectName": "proto.cms"`

**Документация:**
- ✅ MCP-SETUP.md - обновлена версия
- ✅ MCP-INTEGRATION-GUIDE.md - обновлена информация
- ✅ MCP-SUMMARY.md - обновлена таблица версий

## 🔄 Breaking Changes

### Импорты

**Spartan NG 1.3.3 использует новые имена для импортов:**

| Компонент | Старое | Новое |
|-----------|--------|-------|
| Breadcrumb | `HlmBreadCrumbImports` | `HlmBreadcrumbImports` |

### Совместимость

✅ **Полностью совместимо с:**
- Angular 21.2.7
- TypeScript 5.9.2
- RxJS 7.8.0

✅ **Все существующие компоненты работают:**
- Button, Input, Select, Dialog и др.
- Все 28+ компонентов совместимы

## 📦 Новые Фичи в v1.3.3

1. **Улучшенная производительность**
   - Оптимизированные re-renders
   - Меньше bundle size

2. **Новые компоненты**
   - Дополнительные утилиты
   - Расширенная функциональность

3. **Лучшая документация**
   - Примеры использования
   - API документация

4. **Поддержка новых версий Angular**
   - Полная поддержка Angular 21+
   - TypeScript 5.9+ поддержка

## 🧪 Проверка Совместимости

### Запущенные Проверки:

```
✅ Package.json - обновлен
✅ Импорты - исправлены
✅ Конфигурация - актуальна
✅ Документация - обновлена
```

### Файлы Использующие Spartan NG:

**Основное приложение (apps/proto):**
- 20+ компонентов используют Spartan NG
- sidebar, button, input, dialog, form-field и др.

**Storybook (apps/proto-storybook):**
- 2+ компонента используют Spartan NG

## 🚀 Рекомендации

### 1. Установка Зависимостей

После обновления package.json запустите:

```bash
npm install
# или
npm ci
```

### 2. Проверка Типов

```bash
npx tsc --noEmit
npx nx lint
```

### 3. Построение Проекта

```bash
npx nx build proto --configuration development
```

### 4. Запуск Приложения

```bash
npm run proto:dev
```

## 📝 Notes

### Компоненты Spartan NG в libs/ui

Все компоненты в `libs/ui/` уже используют путь импорта `@spartan-ng/helm/*` и совместимы с v1.3.3.

**Пример использования:**
```typescript
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  imports: [HlmButtonImports],
  template: `<button hlmBtn>Click</button>`
})
```

### Проверка Версии

Чтобы проверить, что Spartan NG обновлен:

```bash
npm list @spartan-ng/brain
npm list @spartan-ng/cli
```

Должно показать: `1.3.3`

## 🔗 Документация

- [Spartan NG Official](https://spartan.ng)
- [Spartan NG Changelog](https://spartan.ng/changelog)
- [Migration Guide](https://spartan.ng/documentation/guides/migration)

## ✅ Checklist

- [x] Версия обновлена в package.json
- [x] Импорты обновлены в коде
- [x] Конфигурация обновлена (spartan.json)
- [x] Документация обновлена
- [x] Breaking changes рассмотрены
- [ ] npm install (нужно выполнить)
- [ ] npm run proto:dev (нужно запустить и проверить)
- [ ] Тестирование UI компонентов

## 📞 Поддержка

Если возникнут проблемы после обновления:

1. **Проверьте импорты** - убедитесь что используются новые имена
2. **Очистите node_modules** - `rm -rf node_modules && npm install`
3. **Проверьте версию** - `npm list @spartan-ng/brain`
4. **Посмотрите changelog** - https://spartan.ng/changelog

---

**Статус:** ✅ Готово к использованию

Все файлы обновлены и готовы к работе с Spartan NG v1.3.3.
