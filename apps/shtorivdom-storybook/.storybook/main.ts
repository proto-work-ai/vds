import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  // Стандартный сборщик @storybook/angular: vite.config.mts в проекте нет.
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
