import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { TuiRootModule } from '@taiga-ui/core';
import { provideEventPlugins } from '@taiga-ui/event-plugins';

/**
 * Taiga UI MCP Configuration
 * Provides all necessary Taiga UI setup for the application
 */

export const tuiRootConfig = {
  modules: [TuiRootModule],

  // Default theme
  theme: 'dark',

  // Language
  language: 'en',

  // Animation duration (ms)
  animationDuration: 300,

  // Appearance settings
  appearance: 'light-and-dark',

  // Color palette
  palette: 'default',

  // Component defaults
  componentDefaults: {
    button: {
      appearance: 'primary',
      size: 'md',
    },
    input: {
      size: 'md',
      appearance: 'primary',
    },
    select: {
      size: 'md',
      appearance: 'primary',
    },
    datepicker: {
      size: 'md',
      appearance: 'primary',
    },
  },
};

/**
 * Taiga UI Providers for Angular Config
 * Use this in your app bootstrap to add Taiga UI support
 *
 * Example:
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     ...provideTaigaUI(),
 *     // other providers
 *   ]
 * }
 */
export function provideTaigaUI(): ApplicationConfig['providers'] {
  return [
    importProvidersFrom(TuiRootModule),
    provideEventPlugins(),
  ];
}

/**
 * Taiga UI Theme Configuration
 */
export const tuiThemeConfig = {
  // Light theme
  light: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      text: '#1f2937',
      background: '#ffffff',
      border: '#e5e7eb',
    },
    radius: {
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
    },
  },
  // Dark theme
  dark: {
    colors: {
      primary: '#60a5fa',
      secondary: '#a78bfa',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#22d3ee',
      text: '#f3f4f6',
      background: '#111827',
      border: '#374151',
    },
    radius: {
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
    },
  },
};
