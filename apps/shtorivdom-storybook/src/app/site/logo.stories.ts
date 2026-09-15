import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SiteLogo, SiteLogoColor, SiteLogoVariant } from '@shtorivdom/site-kit';
import { ASSETS, siteDecorators } from './site-story';

const meta: Meta<SiteLogo> = {
  title: 'Сайт/Логотипы',
  component: SiteLogo,
  decorators: [...siteDecorators, moduleMetadata({ imports: [SiteLogo] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type LogoArgs = { variant: SiteLogoVariant; color: SiteLogoColor; width: number; background: string };

export const Логотип: StoryObj<LogoArgs> = {
  args: { variant: 'horizontal', color: 'navy', width: 220, background: 'cream' },
  argTypes: {
    variant: { name: 'вариант', control: 'inline-radio', options: ['mark', 'vertical', 'horizontal', 'wordmark'] },
    color: { name: 'цвет', control: 'inline-radio', options: ['navy', 'white', 'cream', 'gold'] },
    width: { name: 'ширина, px', control: { type: 'range', min: 40, max: 400, step: 10 } },
    background: { name: 'фон', control: 'inline-radio', options: ['cream', 'white', 'navy', 'navy-deep', 'фото'] },
  },
  render: (args) => ({
    props: { ...args, photo: ASSETS + 'img/hero.jpg' },
    template: `
      <div class="relative flex min-h-[360px] items-center justify-center p-10" [class]="background === 'фото' ? 'bg-navy' : 'bg-' + background">
        @if (background === 'фото') {<img [src]="photo" alt="" class="absolute inset-0 size-full object-cover opacity-90" /><div class="absolute inset-0 bg-[linear-gradient(115deg,rgb(13_34_61/.82)_0%,rgb(13_34_61/.5)_55%,rgb(13_34_61/.2)_100%)]"></div>}
        <site-logo class="relative" [variant]="variant" [color]="color" [style.width.px]="width" />
      </div>
    `,
  }),
};

export const ВсеВариантыНаФонах: StoryObj = {
  name: 'Все варианты на фонах',
  render: () => ({
    props: {
      photo: ASSETS + 'img/hero.jpg',
      variants: [
        { v: 'mark', label: 'Знак (logo-1)', w: 90 },
        { v: 'vertical', label: 'Вертикальный (logo-2)', w: 160 },
        { v: 'horizontal', label: 'Горизонтальный (logo-3)', w: 230 },
        { v: 'wordmark', label: 'Надпись (logo-4)', w: 230 },
      ],
      rows: [
        { bg: 'bg-cream', label: 'Светлый cream', colors: ['navy', 'gold'] },
        { bg: 'bg-white', label: 'Белый', colors: ['navy', 'gold'] },
        { bg: 'bg-sand', label: 'Sand (О нас)', colors: ['navy', 'gold'] },
        { bg: 'bg-navy', label: 'Тёмный navy (шапка)', colors: ['white', 'cream', 'gold'] },
        { bg: 'bg-navy-deep', label: 'Navy-deep (подвал)', colors: ['gold', 'white', 'cream'] },
        { bg: 'photo', label: 'Фото-подложка (первый экран)', colors: ['white', 'cream', 'gold'] },
      ],
    },
    template: `
      <div class="space-y-1">
        @for (r of rows; track r.label) {
          <div class="relative overflow-hidden px-6 py-8" [class]="r.bg === 'photo' ? 'bg-navy' : r.bg">
            @if (r.bg === 'photo') {<img [src]="photo" alt="" class="absolute inset-0 size-full object-cover opacity-90" /><div class="absolute inset-0 bg-[linear-gradient(115deg,rgb(13_34_61/.82)_0%,rgb(13_34_61/.5)_55%,rgb(13_34_61/.2)_100%)]"></div>}
            <p class="relative mb-4 text-[12px] font-bold tracking-[.15em] uppercase" [class]="r.bg === 'bg-navy' || r.bg === 'bg-navy-deep' || r.bg === 'photo' ? 'text-cream/70' : 'text-slate/70'">{{ r.label }}</p>
            <div class="relative flex flex-wrap items-center gap-x-10 gap-y-6">
              @for (c of r.colors; track c) {
                @for (v of variants; track v.v) {
                  <div class="flex flex-col items-center gap-2">
                    <site-logo [variant]="$any(v.v)" [color]="$any(c)" [style.width.px]="v.w" />
                    <span class="text-[11px]" [class]="r.bg === 'bg-navy' || r.bg === 'bg-navy-deep' || r.bg === 'photo' ? 'text-cream/50' : 'text-slate/50'">{{ c }}</span>
                  </div>
                }
              }
            </div>
          </div>
        }
      </div>
    `,
  }),
};

export const КакНаСайте: StoryObj = {
  name: 'Как на сайте',
  render: () => ({
    template: `
      <div class="grid gap-1 md:grid-cols-2">
        <div class="bg-navy p-8"><p class="mb-4 text-[12px] text-cream/60">Шапка: горизонтальный, белый, 190 / 220px</p><div class="w-[190px] sm:w-[220px]"><site-logo variant="horizontal" color="white" /></div></div>
        <div class="bg-navy-deep p-8"><p class="mb-4 text-[12px] text-cream/60">Подвал: вертикальный, золото, 170px</p><div class="w-[170px]"><site-logo variant="vertical" color="gold" /></div></div>
        <div class="bg-cream p-8"><p class="mb-4 text-[12px] text-slate/60">Контакты: вертикальный, navy, 130px</p><div class="w-[130px]"><site-logo variant="vertical" color="navy" /></div></div>
        <div class="bg-sand p-8"><p class="mb-4 text-[12px] text-slate/60">О нас: вертикальный, navy, 180 / 220px</p><div class="w-[180px] sm:w-[220px]"><site-logo variant="vertical" color="navy" /></div></div>
        <div class="bg-sand p-8"><p class="mb-4 text-[12px] text-slate/60">Партнёрам: знак, золото, 80px</p><div class="w-[80px]"><site-logo variant="mark" color="gold" /></div></div>
      </div>
    `,
  }),
};

export const Размеры: StoryObj = {
  render: () => ({
    props: { sizes: [40, 80, 130, 190, 260] },
    template: `
      <div class="space-y-8 bg-cream p-8">
        @for (v of ['mark', 'vertical', 'horizontal', 'wordmark']; track v) {
          <div class="flex flex-wrap items-end gap-8">
            @for (s of sizes; track s) {
              <div class="flex flex-col items-center gap-2"><site-logo [variant]="$any(v)" color="navy" [style.width.px]="s" /><span class="text-[11px] text-slate/60">{{ s }}px</span></div>
            }
          </div>
        }
      </div>
    `,
  }),
};
