import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  // Картинки, иконки и email.js прототипа сайта для историй «Сайт/…»
  staticDirs: [{ from: '../../../mockups/site/assets', to: '/site-assets' }],
  // Стандартный сборщик @storybook/angular: vite.config.mts в проекте нет.
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
