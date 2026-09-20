import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { applicationConfig, type Preview } from '@storybook/angular';

@Component({
  selector: 'app-storybook-wrapper',
  template: ``,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorybookWrapperComponent {}

/** Размеры экрана сайта для панели «Размер экрана» в тулбаре (viewport встроен в ядро Storybook 10). */
export const SITE_VIEWPORTS = {
  phone320: {
    name: 'Телефон 320×640',
    styles: { width: '320px', height: '640px' },
    type: 'mobile',
  },
  phone375: {
    name: 'Телефон 375×812',
    styles: { width: '375px', height: '812px' },
    type: 'mobile',
  },
  phone390: {
    name: 'Телефон 390×844',
    styles: { width: '390px', height: '844px' },
    type: 'mobile',
  },
  tablet768: {
    name: 'Планшет 768×1024',
    styles: { width: '768px', height: '1024px' },
    type: 'tablet',
  },
  laptop1024: {
    name: 'Ноутбук 1024×768',
    styles: { width: '1024px', height: '768px' },
    type: 'desktop',
  },
  desktop1440: {
    name: 'Десктоп 1440×900',
    styles: { width: '1440px', height: '900px' },
    type: 'desktop',
  },
};

const preview: Preview = {
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  // decorators: [componentWrapperDecorator(StorybookWrapperComponent)],
  parameters: {
    viewport: { options: SITE_VIEWPORTS },
  },
  // По умолчанию — без ограничения размера.
  initialGlobals: {
    viewport: { value: undefined, isRotated: false },
  },
};

export default preview;
