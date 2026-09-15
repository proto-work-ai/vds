import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  SITE_CATALOG, SITE_ROD_MODELS, SITE_TIERS, SiteArrow, SiteCatalogCard, SiteCollectionCard, SiteCounter, SiteFeature, SiteRodModelCard, SiteServiceCard, SiteTierCard, SiteWorkCard,
} from '@shtorivdom/site-kit';
import { ASSETS, siteDecorators } from './site-story';

const meta: Meta = {
  title: 'Сайт/Карточки',
  decorators: [...siteDecorators, moduleMetadata({ imports: [SiteArrow, SiteCatalogCard, SiteCollectionCard, SiteCounter, SiteFeature, SiteRodModelCard, SiteServiceCard, SiteTierCard, SiteWorkCard] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

const sectionOptions = SITE_CATALOG.map((s) => s.key);

export const КарточкаКаталога: StoryObj<{ key: string }> = {
  name: 'Карточка каталога',
  args: { key: 'blackout-curtains' },
  argTypes: { key: { name: 'раздел', control: 'select', options: sectionOptions } },
  render: (args) => ({
    props: { section: SITE_CATALOG.find((s) => s.key === args.key) },
    template: `<div class="bg-sand p-10"><site-catalog-card class="max-w-[380px]" [section]="section" /></div>`,
  }),
};

export const Каталог: StoryObj = {
  name: 'Каталог — все разделы',
  render: () => ({
    props: { catalog: SITE_CATALOG },
    template: `
      <section class="bg-sand py-16">
        <div class="wrap grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          @for (s of catalog; track s.key) {<site-catalog-card [section]="s" />}
        </div>
      </section>
    `,
  }),
};

export const Коллекции: StoryObj = {
  name: 'Коллекции (страница каталога)',
  render: () => ({
    props: { catalog: SITE_CATALOG },
    template: `
      <section class="bg-navy py-16 text-cream">
        <div class="wrap grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          @for (s of catalog; track s.key; let i = $index) {<site-collection-card [section]="s" [index]="i" />}
        </div>
      </section>
    `,
  }),
};

export const Тарифы: StoryObj<{ tone: string }> = {
  args: { tone: 'все' },
  argTypes: { tone: { name: 'тариф', control: 'inline-radio', options: ['все', 'standard', 'premium', 'lux'] } },
  render: (args) => ({
    props: { tiers: args.tone === 'все' ? SITE_TIERS : SITE_TIERS.filter((t) => t.tone === args.tone) },
    template: `
      <section class="bg-cream py-16">
        <div class="mx-auto grid w-full max-w-[1100px] items-start gap-6 px-5 sm:px-8 lg:grid-cols-3">
          @for (t of tiers; track t.tone) {<site-tier-card [tier]="t" />}
        </div>
      </section>
    `,
  }),
};

export const ГалереяРабот: StoryObj<{ hover: boolean }> = {
  name: 'Галерея работ',
  args: { hover: false },
  argTypes: { hover: { name: 'показать наведение' } },
  render: (args) => ({
    props: {
      ...args,
      works: [
        ['Шторы блэкаут', 'img/catalog/blackout-curtains/image-4.jpg'],
        ['Римские шторы', 'img/catalog/roman-blinds/image-2.jpg'],
        ['Льняные шторы', 'img/catalog/linen-curtains/image-1.jpg'],
        ['Рулонные шторы', 'img/catalog/roller-blinds/image-3.jpg'],
        ['Шторы плиссе', 'img/catalog/pleated-blinds/image-2.jpg'],
        ['Шторы блэкаут', 'img/catalog/blackout-curtains/image-3.jpg'],
      ],
    },
    template: `
      <section class="bg-sand py-16">
        <div class="wrap grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
          @for (w of works; track w[1]; let i = $index) {<site-work-card [title]="w[0]" [image]="w[1]" [hover]="hover && i === 0" />}
        </div>
      </section>
    `,
  }),
};

export const МодельКарниза: StoryObj = {
  name: 'Модель карниза',
  render: () => ({
    props: { models: SITE_ROD_MODELS },
    template: `
      <section class="bg-sand py-16">
        <div class="wrap">
          <div class="grid grid-cols-1 gap-6 min-[520px]:grid-cols-2 lg:grid-cols-3">
            @for (m of models.slice(0, 3); track m; let i = $index) {<site-rod-model-card [number]="i + 1" [title]="m" />}
          </div>
          <div class="mt-12 mb-6 flex items-end justify-between gap-4">
            <h2 class="text-[clamp(26px,3.5vw,36px)]">Другие <em class="text-gold">модели</em></h2>
            <div class="flex gap-2"><button siteArrow="prev" kind="strip" aria-label="Назад"></button><button siteArrow="next" kind="strip" aria-label="Вперёд"></button></div>
          </div>
          <div class="cat-strip [grid-auto-columns:minmax(230px,24%)] pt-[10px] pb-4">
            @for (m of models.slice(3); track m; let i = $index) {<site-rod-model-card kind="strip" [number]="i + 4" [title]="m" />}
          </div>
        </div>
      </section>
    `,
  }),
};

export const Услуги: StoryObj = {
  render: () => ({
    props: {
      services: [
        { title: 'Выезд дизайнера и замерщика', image: 'img/welcome-1.jpg', badge: 'Бесплатно', text: 'Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.' },
        { title: 'Пошив штор на заказ', image: 'img/production.jpg', badge: 'Гарантия 2 года', text: 'Пошив штор в собственном швейном цехе под надзором технолога. Проверка готовых изделий на брак.' },
        { title: 'Ткань на отрез', image: 'img/catalog/linen-curtains/image-3.jpg', badge: '', text: 'Еще у нас можно купить ткань на отрез, если вы хотите сшить шторы самостоятельно.' },
      ],
    },
    template: `
      <section class="bg-sand py-16">
        <div class="wrap grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          @for (s of services; track s.title) {<site-service-card [title]="s.title" [image]="s.image" [badge]="s.badge" [text]="s.text" />}
        </div>
      </section>
    `,
  }),
};

export const Преимущества: StoryObj = {
  render: () => ({
    template: `
      <section class="bg-white py-16">
        <ul class="wrap grid max-w-[760px] gap-8 sm:grid-cols-2">
          <li><site-feature icon="grid" title="Сотни бесплатных образцов тканей" text="Высококачественные, экологически чистые материалы, подходящие к любому стилю интерьера." /></li>
          <li><site-feature icon="pen" title="Бесплатная услуга по разработке дизайна." text="Индивидуальный дизайн штор, соответствующих вашему уникальному стилю и пространству." /></li>
          <li><site-feature icon="bell" title="Создано вручную специально для вас" text="Изготавливается на заказ опытными мастерами с учетом ваших точных потребностей." /></li>
          <li><site-feature icon="truck" title="Бесплатная доставка" text="Наслаждайтесь быстрой и надежной доставкой каждого заказа без дополнительных сборов за доставку." /></li>
        </ul>
      </section>
    `,
  }),
};

export const Счётчики: StoryObj<{ animate: boolean }> = {
  args: { animate: true },
  argTypes: { animate: { name: 'анимация' } },
  render: (args) => ({
    props: { ...args, badge: ASSETS },
    template: `
      <section class="bg-cream py-12">
        <ol class="wrap grid grid-cols-1 gap-6 border-y border-navy/10 py-7 min-[480px]:grid-cols-3">
          <li><site-counter [value]="3000" label="Тканей, карнизов и аксессуаров в наличии" [animate]="animate" /></li>
          <li><site-counter [value]="10000" label="Реализованных дизайн-проектов" [animate]="animate" /></li>
          <li><site-counter [value]="1000" label="Постоянных клиентов" [animate]="animate" /></li>
        </ol>
      </section>
      <section class="bg-navy py-10 text-cream">
        <ol class="wrap grid grid-cols-3 gap-3 text-center sm:gap-6">
          <li><site-counter size="lg" [value]="3000" label="Тканей, карнизов и аксессуаров в наличии" [animate]="animate" /></li>
          <li><site-counter size="lg" [value]="10000" label="Реализованных дизайн-проектов" [animate]="animate" /></li>
          <li><site-counter size="lg" [value]="1000" label="Постоянных клиентов" [animate]="animate" /></li>
        </ol>
      </section>
      <section class="bg-cream p-10">
        <div class="flex size-28 flex-col items-center justify-center bg-gold shadow-xl">
          <span class="font-serif text-[30px] leading-none text-white">15+</span>
          <span class="mt-1 text-center text-[11px] tracking-[.2em] text-white/85 uppercase">лет</span>
        </div>
      </section>
    `,
  }),
};
