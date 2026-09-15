import { applicationConfig, componentWrapperDecorator } from '@storybook/angular';
import { SITE_ASSETS_URL } from '@shtorivdom/site-kit';

/** Общие декораторы историй сайта: картинки из mockups/site/assets (staticDirs) и корневой класс темы. */
export const siteDecorators = [
  applicationConfig({ providers: [{ provide: SITE_ASSETS_URL, useValue: 'site-assets/' }] }),
  componentWrapperDecorator((story) => `<div class="site-root min-h-screen">${story}</div>`),
];

export const ASSETS = 'site-assets/';
