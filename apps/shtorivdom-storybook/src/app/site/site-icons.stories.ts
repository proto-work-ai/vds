import type { Meta, StoryObj } from '@storybook/angular';
import { siteDecorators } from './site-story';

/** SVG-иконки из apps/shtorivdom-site/public/icons (в сторибуке — /site-icons/). */
const meta: Meta = {
  title: 'Сайт/Иконки из public',
  decorators: [...siteDecorators],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Icon = { file: string; note: string; dark?: boolean };

const GROUPS: { title: string; icons: Icon[] }[] = [
  {
    title: 'Преимущества',
    icons: [
      { file: 'benefit-icon-01.svg', note: '32×33' },
      { file: 'benefit-icon-02.svg', note: '32×33' },
      { file: 'benefit-icon-03.svg', note: '32×33' },
      { file: 'benefit-icon-04.svg', note: '32×33' },
    ],
  },
  {
    title: 'Как мы работаем',
    icons: [
      { file: 'way-we-work-1.svg', note: '75×75' },
      { file: 'way-we-work-2.svg', note: '75×75' },
      { file: 'way-we-work-3.svg', note: '75×75' },
      { file: 'way-we-work-4.svg', note: '75×75' },
    ],
  },
  {
    title: 'Галочки',
    icons: [
      { file: 'check-1.svg', note: '97×88' },
      { file: 'check-2.svg', note: '96×78' },
    ],
  },
  {
    title: 'Мессенджеры',
    icons: [
      { file: 'telegram.svg', note: 'цветная' },
      { file: 'telegram-light.svg', note: 'белая — на тёмном', dark: true },
      { file: 'max.svg', note: 'цветная' },
      { file: 'max-icon-light.svg', note: 'белая — на тёмном', dark: true },
      { file: 'max-logo-black.svg', note: 'чёрная' },
    ],
  },
];

export const Все: StoryObj = {
  name: 'Все иконки',
  render: () => ({
    props: { groups: GROUPS, base: '/site-icons/' },
    template: `
      <div class="space-y-1">
        @for (g of groups; track g.title) {
          <div class="bg-cream p-8">
            <p class="eyebrow">{{ g.title }}</p>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              @for (i of g.icons; track i.file) {
                <figure class="flex flex-col items-center gap-3 rounded-[4px] border border-navy/10 p-5" [class]="i.dark ? 'bg-navy text-cream' : 'bg-white'">
                  <img [src]="base + i.file" [alt]="i.file" class="size-16 object-contain" />
                  <figcaption class="text-center text-[12px] leading-snug" [class]="i.dark ? 'text-cream/70' : 'text-slate/70'">{{ i.file }}<br />{{ i.note }}</figcaption>
                </figure>
              }
            </div>
          </div>
        }
      </div>
    `,
  }),
};

export const НаТёмном: StoryObj = {
  name: 'Все иконки — на тёмном фоне',
  render: () => ({
    props: { icons: GROUPS.flatMap((g) => g.icons), base: '/site-icons/' },
    template: `
      <div class="bg-navy p-8">
        <div class="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-8">
          @for (i of icons; track i.file) {
            <figure class="flex flex-col items-center gap-2 p-3">
              <img [src]="base + i.file" [alt]="i.file" class="size-12 object-contain" />
              <figcaption class="text-center text-[11px] text-cream/60">{{ i.file }}</figcaption>
            </figure>
          }
        </div>
      </div>
    `,
  }),
};
