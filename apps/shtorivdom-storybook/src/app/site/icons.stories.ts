import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SITE_ICON_NAMES, SiteCheckItem, SiteContactItem, SiteIcon, SiteIconName, SiteSocialLinks } from '@shtorivdom/site-kit';
import { ASSETS, siteDecorators } from './site-story';

const meta: Meta = {
  title: 'Сайт/Иконки',
  decorators: [...siteDecorators, moduleMetadata({ imports: [SiteCheckItem, SiteContactItem, SiteIcon, SiteSocialLinks] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type IconArgs = { name: SiteIconName; size: number; strokeWidth: number; color: string };

export const Иконка: StoryObj<IconArgs> = {
  args: { name: 'phone', size: 32, strokeWidth: 2, color: 'text-gold' },
  argTypes: {
    name: { name: 'иконка', control: 'select', options: SITE_ICON_NAMES },
    size: { name: 'размер', control: { type: 'range', min: 10, max: 64 } },
    strokeWidth: { name: 'толщина', control: { type: 'range', min: 1, max: 3, step: 0.1 } },
    color: { name: 'цвет', control: 'inline-radio', options: ['text-gold', 'text-navy', 'text-slate', 'text-cream'] },
  },
  render: (args) => ({
    props: args,
    template: `<div class="p-10" [class.bg-navy]="color === 'text-cream'"><site-icon [name]="name" [size]="size" [strokeWidth]="strokeWidth" [class]="color" /></div>`,
  }),
};

export const КонтурныеИконки: StoryObj = {
  name: 'Контурные иконки',
  render: () => ({
    props: { names: SITE_ICON_NAMES },
    template: `
      <div class="wrap grid grid-cols-3 gap-4 py-10 sm:grid-cols-6">
        @for (n of names; track n) {
          <div class="flex flex-col items-center gap-3 border border-navy/10 bg-white py-5 text-gold"><site-icon [name]="n" [size]="24" /><span class="text-[12px] text-slate">{{ n }}</span></div>
        }
      </div>
      <div class="wrap pb-10">
        <p class="eyebrow">Подложки из разметки</p>
        <div class="flex flex-wrap items-center gap-6">
          <span class="grid size-11 place-items-center rounded-full border border-gold/50 text-gold"><site-icon name="pin" /></span>
          <span class="grid size-12 place-items-center border border-gold/40 text-gold"><site-icon name="grid" [size]="22" [strokeWidth]="1.6" /></span>
          <span class="grid size-10 place-items-center rounded-full bg-[rgb(13_34_61/.7)] text-gold"><site-icon name="zoom" [size]="18" /></span>
          <span class="flex size-16 items-center justify-center rounded-full border-2 border-gold bg-cream font-serif text-[22px] font-semibold text-gold">01</span>
          <span class="faq-icon text-gold"><site-icon name="plus" [size]="16" /></span>
          <span class="text-gold"><site-icon name="chevron-down" [size]="16" [strokeWidth]="2.5" /></span>
        </div>
      </div>
    `,
  }),
};

export const Соцсети: StoryObj = {
  render: () => ({
    props: { tg: ASSETS + 'img/telegram.svg', max: ASSETS + 'img/max.svg' },
    template: `
      <div class="grid gap-1 md:grid-cols-3">
        <div class="bg-white p-8">
          <p class="mb-4 text-[12px] text-slate/60">Только иконка (файлы assets/img)</p>
          <div class="flex items-end gap-6">
            <img [src]="tg" alt="Telegram" class="size-5" /><img [src]="tg" alt="Telegram" class="size-9" /><img [src]="tg" alt="Telegram" class="size-16" />
            <img [src]="max" alt="Max" class="size-5" /><img [src]="max" alt="Max" class="size-9" /><img [src]="max" alt="Max" class="size-16" />
          </div>
        </div>
        <div class="bg-navy-deep p-8"><p class="mb-4 text-[12px] text-white/50">С подложкой — подвал</p><site-social-links variant="footer" /></div>
        <div class="bg-cream p-8"><p class="mb-4 text-[12px] text-slate/60">Без подложки — страница контактов</p><site-social-links variant="plain" /></div>
      </div>
    `,
  }),
};

export const ГалочкиИКонтакты: StoryObj = {
  name: 'Галочки и контакты',
  render: () => ({
    template: `
      <div class="grid gap-1 md:grid-cols-2">
        <div class="space-y-3 bg-white p-8">
          <p class="eyebrow">Галочки</p>
          <site-check-item class="text-[14px]">Тюль с пошивом (тарифы, услуги)</site-check-item>
          <site-check-item variant="circle" class="text-[16px]">Выезд дизайнера на объект с образцами (партнёрам)</site-check-item>
        </div>
        <div class="space-y-3 bg-navy p-8 text-[14px] text-white/85">
          <p class="eyebrow">Первый экран</p>
          <site-check-item variant="hero">Бесплатный выезд замерщика</site-check-item>
          <site-check-item variant="hero">2 года гарантии на материалы</site-check-item>
        </div>
        <div class="space-y-6 bg-cream p-8 md:col-span-2">
          <p class="eyebrow">Контакты (страница контактов)</p>
          <site-contact-item icon="pin" label="Адрес"><a href="#" class="tetext-[14px] underline decoration-gold/50 decoration-dashed underline-offset-4 hover:text-gold">Троицк, Кварцевая улица, 3, корп. 2</a></site-contact-item>
          <site-contact-item icon="clock" label="График работы"><p class="tetext-[14px]">Без выходных, 10:00–20:00</p></site-contact-item>
          <site-contact-item icon="phone" label="Телефон"><a href="#" class="font-serif text-[24px] font-bold hover:text-gold">+7 (915) 359-12-00</a></site-contact-item>
          <site-contact-item icon="mail" label="Эл. почта"><a href="#" class="tetext-[14px] hover:text-gold">info&#64;shtorivdom.ru</a></site-contact-item>
          <site-contact-item icon="message" label="Социальные сети"><site-social-links variant="plain" class="mt-1" /></site-contact-item>
        </div>
      </div>
    `,
  }),
};
