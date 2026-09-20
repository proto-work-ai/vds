import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SiteFooter, SiteHeader, SiteToTop } from '@shtorivdom/site-kit';
import { ASSETS, siteDecorators } from './site-story';

const meta: Meta = {
  title: 'Сайт/Каркас',
  decorators: [...siteDecorators, moduleMetadata({ imports: [SiteFooter, SiteHeader, SiteToTop] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type HeaderArgs = { solid: boolean; current: string; menuOpen: boolean; subOpen: boolean; catalogOpen: boolean; background: 'фото' | 'светлый' };

const headerArgTypes: StoryObj<HeaderArgs>['argTypes'] = {
  solid: { name: 'тёмная (после прокрутки)' },
  current: { name: 'текущий раздел', control: 'select', options: ['', 'catalog/', 'price/', 'services/', 'about/', 'partner/', 'contact/'] },
  menuOpen: { name: 'мобильное меню открыто' },
  subOpen: { name: 'подменю «Каталог» открыто' },
  catalogOpen: { name: 'выпадающий каталог открыт' },
  background: { name: 'под шапкой', control: 'inline-radio', options: ['фото', 'светлый'] },
};

const headerTemplate = `
  <div class="relative min-h-[560px]" [class]="background === 'фото' ? 'bg-navy' : 'bg-cream'">
    @if (background === 'фото') {
      <img [src]="photo" alt="" class="absolute inset-0 size-full object-cover opacity-90" />
      <div class="absolute inset-0 bg-[linear-gradient(115deg,rgb(13_34_61/.82)_0%,rgb(13_34_61/.5)_55%,rgb(13_34_61/.2)_100%)]"></div>
    }
    <site-header [fixed]="false" [solid]="solid" [current]="current" [(menuOpen)]="menuOpen" [(subOpen)]="subOpen" [catalogOpen]="catalogOpen" />
  </div>
`;

export const Шапка: StoryObj<HeaderArgs> = {
  args: { solid: false, current: '', menuOpen: false, subOpen: false, catalogOpen: false, background: 'фото' },
  argTypes: headerArgTypes,
  render: (args) => ({ props: { ...args, photo: ASSETS + 'img/hero.jpg' }, template: headerTemplate }),
};

export const ШапкаТёмная: StoryObj<HeaderArgs> = {
  name: 'Шапка тёмная с каталогом',
  args: { solid: true, current: 'catalog/', menuOpen: false, subOpen: false, catalogOpen: true, background: 'светлый' },
  argTypes: headerArgTypes,
  render: (args) => ({ props: { ...args, photo: ASSETS + 'img/hero.jpg' }, template: headerTemplate }),
};

export const ШапкаМобильная: StoryObj<HeaderArgs> = {
  name: 'Шапка мобильная с меню',
  args: { solid: false, current: 'price/', menuOpen: true, subOpen: true, catalogOpen: false, background: 'фото' },
  argTypes: headerArgTypes,
  globals: { viewport: { value: 'phone390', isRotated: false } },
  parameters: { docs: { description: { story: 'Мобильная версия видна при ширине окна меньше 1024px. По умолчанию — экран «Телефон 390×844».' } } },
  render: (args) => ({
    props: { ...args, photo: ASSETS + 'img/hero.jpg' },
    template: `
      <p class="hidden bg-gold-soft px-5 py-2 text-[12px] lg:block">Мобильная шапка видна при ширине окна меньше 1024px — сузьте окно или откройте историю в iframe на телефоне.</p>
      ${headerTemplate}
    `,
  }),
};

export const Подвал: StoryObj = {
  render: () => ({ template: `<site-footer /><site-to-top [visible]="true" />` }),
};
