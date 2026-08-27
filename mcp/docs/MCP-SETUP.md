# MCP Setup Guide - Spartan NG & Taiga UI

This guide explains the setup of Spartan NG MCP (Market Component Platform) and Taiga UI integration in the proto.cms project.

## 📦 Installed Libraries

### Spartan NG
- **Version**: 1.3.3 (Latest stable)
- **Type**: Market Component Platform for shadcn-style components
- **Location**: `libs/ui/` - 28+ components available
- **CLI**: `@spartan-ng/cli` (devDependencies)
- **Updated**: 27.08.2026 - Upgraded from 0.0.1-alpha.643

### Taiga UI
- **Version**: 5.7.0
- **Packages**: 
  - `@taiga-ui/core` - Core components
  - `@taiga-ui/kit` - Advanced components
  - `@taiga-ui/cdk` - Component Development Kit
  - `@taiga-ui/icons` - Icon library
  - `@taiga-ui/layout` - Layout components
  - `@taiga-ui/addon-table` - Table addon
  - `@taiga-ui/addon-mobile` - Mobile addon
  - `@taiga-ui/styles` - Style utilities

## ⚙️ Configuration Files

### 1. `spartan.json` - Spartan NG MCP Config
Controls Spartan NG component registration and styling.

```json
{
  "style": "css",
  "theme": "dark",
  "importAlias": "@spartan-ng/helm",
  "components": {
    "button": { "path": "libs/ui/button/src" },
    "dialog": { "path": "libs/ui/dialog/src" },
    ...
  }
}
```

### 2. `taiga-ui.config.ts` - Taiga UI Setup
Optional configuration file for global Taiga UI settings.

### 3. `tsconfig.base.json` - Path Aliases
All Spartan NG components are configured with path aliases:
- `@spartan-ng/helm/button` → `libs/ui/button/src/index.ts`
- `@spartan-ng/helm/dialog` → `libs/ui/dialog/src/index.ts`
- etc.

## 🚀 Usage Examples

### Spartan NG Components

```typescript
// Import component
import { HlmButtonDirective } from '@spartan-ng/helm/button';

// Use in component
@Component({
  selector: 'app-example',
  template: `<button hlmBtn>Click me</button>`,
  imports: [HlmButtonDirective],
})
export class ExampleComponent {}
```

### Available Spartan NG Components
- Alert, Alert Dialog
- Avatar, Breadcrumb, Button
- Checkbox, Collapsible
- Dialog, Dropdown Menu
- Field, Form Field, Icon
- Input, Input Group, Label
- Navigation Menu, Pagination, Popover
- Select, Separator
- Sheet, Sidebar, Skeleton
- Table, Textarea, Tooltip
- Typography, Utils

### Taiga UI Integration

```typescript
import { TuiRootModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/kit';

@Component({
  imports: [TuiRootModule, TuiButtonModule],
  template: `<tui-root>...</tui-root>`
})
export class AppComponent {}
```

## 📝 App Configuration

The app already includes Taiga UI event plugins in `apps/proto/src/app/app.config.ts`:

```typescript
import { provideEventPlugins } from '@taiga-ui/event-plugins';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEventPlugins(),
    // ... other providers
  ],
};
```

## 🔧 Development Commands

```bash
# Serve the app
npm run proto:dev

# Build the app
npx nx build proto --configuration development

# Linting
npx nx lint

# View project graph
npx nx graph
```

## 📚 Resources

- [Spartan NG Documentation](https://spartan.ng)
- [Spartan NG MCP Guide](https://spartan.ng/documentation/mcp)
- [Taiga UI Documentation](https://taiga-ui.dev)
- [Angular 21 Guide](https://angular.io)

## ⚡ Quick Tips

1. **Component Paths**: All Spartan NG components use the `@spartan-ng/helm/*` import alias
2. **Taiga UI**: Already configured with event plugins in the app config
3. **Standalone Components**: Both libraries support standalone Angular components
4. **Styling**: Projects uses CSS with Tailwind CSS integration
5. **Dark Mode**: App supports both light and dark themes

## 🔗 Related Files

- `spartan.json` - MCP configuration
- `taiga-ui.config.ts` - Taiga UI setup
- `tsconfig.base.json` - Path aliases
- `apps/proto/src/app/app.config.ts` - App configuration
- `package.json` - Dependencies
