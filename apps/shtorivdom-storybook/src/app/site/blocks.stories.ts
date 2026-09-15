import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  SITE_CATALOG, SITE_FAQ, SITE_PRICES, SITE_STEPS, SiteBeforeAfter, SiteBreadcrumbs, SiteButton, SiteFaq, SitePageHero, SitePriceTable, SitePriceTabs, SiteReviewSlider, SiteSectionHeading, SiteSteps,
} from '@shtorivdom/site-kit';
import { siteDecorators } from './site-story';

const meta: Meta = {
  title: 'Сайт/Блоки',
  decorators: [...siteDecorators, moduleMetadata({ imports: [SiteBeforeAfter, SiteBreadcrumbs, SiteButton, SiteFaq, SitePageHero, SitePriceTable, SitePriceTabs, SiteReviewSlider, SiteSectionHeading, SiteSteps] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Layout = 'auto' | 'table' | 'cards';

export const ВкладкиЦен: StoryObj<{ selected: string; layout: Layout }> = {
  name: 'Вкладки цен',
  args: { selected: 'blackout-curtains', layout: 'auto' },
  argTypes: {
    selected: { name: 'вкладка', control: 'select', options: SITE_PRICES.map((s) => s.key) },
    layout: { name: 'вид', control: 'inline-radio', options: ['auto', 'table', 'cards'], description: 'auto — таблица с md, карточки на телефоне' },
  },
  render: (args) => ({
    props: { ...args, sections: SITE_PRICES },
    template: `
      <section class="bg-cream py-14">
        <div class="wrap">
          <div class="mb-10"><p class="eyebrow">Прайс</p><h2 class="h2">Цены по <span class="text-gold italic">разделам</span></h2></div>
          <site-price-tabs [sections]="sections" [selected]="selected" [layout]="layout" />
        </div>
      </section>
    `,
  }),
};

export const ТаблицаЦен: StoryObj<{ key: string; layout: Layout }> = {
  name: 'Таблица цен',
  args: { key: 'roller-blinds', layout: 'table' },
  argTypes: {
    key: { name: 'раздел', control: 'select', options: SITE_PRICES.map((s) => s.key) },
    layout: { name: 'вид', control: 'inline-radio', options: ['auto', 'table', 'cards'] },
  },
  render: (args) => ({
    props: { ...args, section: SITE_PRICES.find((s) => s.key === args.key) },
    template: `
      <div class="bg-cream py-10"><div class="wrap max-w-[900px]"><site-price-table [section]="section" [layout]="layout" /></div></div>
    `,
  }),
};

export const ВкладкиЦенТелефон: StoryObj<{ selected: string; layout: Layout }> = {
  ...ВкладкиЦен,
  name: 'Вкладки цен — телефон',
  globals: { viewport: { value: 'phone375', isRotated: false } },
};

export const ТаблицаЦенТелефон: StoryObj<{ key: string; layout: Layout }> = {
  ...ТаблицаЦен,
  name: 'Таблица цен — телефон',
  args: { key: 'roller-blinds', layout: 'auto' },
  globals: { viewport: { value: 'phone375', isRotated: false } },
};

export const ЦеныПоРазделам: StoryObj = {
  name: 'Цены по разделам (главная)',
  render: () => ({
    props: { catalog: SITE_CATALOG },
    template: `
      <div class="bg-cream py-10">
        <div class="mx-auto max-w-[1100px] rounded-[4px] bg-white px-5 py-8 sm:px-10">
          <h3 class="mb-4 text-[24px]">Цены по разделам</h3>
          @for (c of catalog; track c.key) {
            <a href="#" class="flex items-baseline gap-3 border-b border-navy/10 py-3.5 transition-colors hover:text-gold"><span class="flex-1 text-[16px]">{{ c.title }}</span><span class="text-[16px] font-bold whitespace-nowrap">{{ c.minPrice }}</span></a>
          }
          <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p class="text-[14px] text-slate/70">*Цены ориентировочные. Точная стоимость — после бесплатного замера и выбора ткани.</p>
            <a siteButton href="#">Все цены</a>
          </div>
        </div>
      </div>
    `,
  }),
};

export const FAQ: StoryObj<{ open: number }> = {
  name: 'Вопросы-ответы',
  args: { open: 2 },
  argTypes: { open: { name: 'открыт ответ', control: { type: 'number', min: -1, max: 4 } } },
  render: (args) => ({
    props: { ...args, items: SITE_FAQ },
    template: `
      <section class="bg-white py-16">
        <div class="mx-auto w-full max-w-3xl px-5 sm:px-6">
          <site-section-heading variant="lines" eyebrow="FAQ" title="Вопросы-" accent="ответы" class="mb-14" />
          <site-faq [items]="items" [open]="open" />
        </div>
      </section>
    `,
  }),
};

export const Отзывы: StoryObj<{ index: number; autoplay: boolean }> = {
  args: { index: 0, autoplay: false },
  argTypes: { index: { name: 'слайд', control: { type: 'number', min: 0, max: 2 } }, autoplay: { name: 'автопрокрутка 5.2 с' } },
  render: (args) => ({
    props: args,
    template: `
      <section class="bg-cream py-16">
        <div class="wrap">
          <site-section-heading variant="lines" eyebrow="Отзывы" title="Отзывы клиентов" class="mb-12" />
          <site-review-slider [index]="index" [autoplay]="autoplay" />
        </div>
      </section>
    `,
  }),
};

export const ДоИПосле: StoryObj<{ pos: number }> = {
  name: 'До и после',
  args: { pos: 50 },
  argTypes: { pos: { name: 'положение ручки, %', control: { type: 'range', min: 3, max: 97 } } },
  render: (args) => ({
    props: args,
    template: `
      <section class="bg-navy py-16">
        <div class="wrap">
          <div class="mb-12 text-center">
            <site-section-heading variant="lines" eyebrow="Преображение" title="До и после" [dark]="true" />
            <p class="mt-3 text-[14px] text-white/50">Потяните ручку, чтобы сравнить</p>
          </div>
          <site-before-after [pos]="pos" />
        </div>
      </section>
    `,
  }),
};

export const Шаги: StoryObj<{ circle: 'cream' | 'white' }> = {
  name: 'Как сделать заказ',
  args: { circle: 'cream' },
  argTypes: { circle: { name: 'фон кружка', control: 'inline-radio', options: ['cream', 'white'] } },
  render: (args) => ({
    props: { ...args, steps: SITE_STEPS },
    template: `
      <section class="py-16" [class]="circle === 'cream' ? 'bg-white' : 'bg-cream'">
        <div class="wrap">
          <site-section-heading variant="lines" eyebrow="Этапы" title="Как сделать заказ?" class="mb-14" />
          <site-steps [steps]="steps" [circle]="circle" />
        </div>
      </section>
    `,
  }),
};

export const ХлебныеКрошки: StoryObj = {
  name: 'Хлебные крошки',
  render: () => ({
    template: `
      <div class="space-y-1">
        <div class="bg-navy p-8"><p class="mb-3 text-[12px] text-cream/50">Внутренняя страница</p><site-breadcrumbs [items]="[{ label: 'Главная', href: '#' }]" /></div>
        <div class="bg-navy p-8"><p class="mb-3 text-[12px] text-cream/50">Раздел каталога (заготовка)</p><site-breadcrumbs [items]="[{ label: 'Главная', href: '#' }, { label: 'Каталог', href: '#' }]" /></div>
        <div class="bg-navy p-8"><p class="mb-3 text-[12px] text-cream/50">Страницы каталога — с текущей страницей</p><site-breadcrumbs variant="catalog" [items]="[{ label: 'Главная', href: '#' }, { label: 'Каталог', href: '#' }, { label: 'Карнизы для штор', href: '#' }, { label: 'Карниз CASTLE messing matt' }]" /></div>
      </div>
    `,
  }),
};

export const ШапкаСтраницы: StoryObj<{ title: string; lead: string; button: boolean }> = {
  name: 'Шапка страницы',
  args: { title: 'Стать партнером', lead: 'Приглашаем к сотрудничеству дизайнеров интерьера, архитекторов и строительные компании. Выгодные условия для партнёров.', button: true },
  argTypes: { title: { name: 'заголовок' }, lead: { name: 'подзаголовок' }, button: { name: 'кнопка' } },
  render: (args) => ({
    props: args,
    template: `
      <site-page-hero [title]="title" [lead]="lead">
        @if (button) {<a siteButton href="#" class="mt-8">Стать партнером</a>}
      </site-page-hero>
    `,
  }),
};

export const ЗаголовкиСекций: StoryObj = {
  name: 'Заголовки секций',
  render: () => ({
    template: `
      <div class="space-y-1">
        <div class="bg-sand py-12"><site-section-heading eyebrow="Каталог" title="Каталог" accent="Штор" /></div>
        <div class="bg-white py-12"><site-section-heading variant="lines" eyebrow="Этапы" title="Как сделать заказ?" /></div>
        <div class="bg-cream py-12"><div class="wrap"><site-section-heading variant="left" eyebrow="Собственное производство" title="Изготовление штор на заказ" /></div></div>
        <div class="bg-navy py-12"><site-section-heading variant="lines" eyebrow="Преображение" title="До и после" [dark]="true" /></div>
      </div>
    `,
  }),
};
