import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SITE_PRICES, SiteArrow, SiteBurger, SiteButton, SiteButtonAppearance, SiteButtonSize, SiteDots, SiteIcon, SitePriceTabs, SiteTextLink, SiteTextLinkVariant, SiteToTop } from '@shtorivdom/site-kit';
import { siteDecorators } from './site-story';

const meta: Meta = {
  title: 'Сайт/Кнопки',
  decorators: [...siteDecorators, moduleMetadata({ imports: [SiteArrow, SiteBurger, SiteButton, SiteDots, SiteIcon, SitePriceTabs, SiteTextLink, SiteToTop] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type ButtonArgs = {
  text: string;
  appearance: SiteButtonAppearance;
  size: SiteButtonSize;
  block: boolean;
  arrow: boolean;
  disabled: boolean;
  background: string;
};

export const Кнопка: StoryObj<ButtonArgs> = {
  args: { text: 'Пригласить дизайнера', appearance: 'gold', size: 'md', block: false, arrow: true, disabled: false, background: 'cream' },
  argTypes: {
    text: { name: 'текст' },
    appearance: { name: 'вид', control: 'inline-radio', options: ['gold', 'line', 'outline-navy'] },
    size: { name: 'размер', control: 'inline-radio', options: ['md', 'sm'] },
    block: { name: 'на всю ширину' },
    arrow: { name: 'со стрелкой' },
    disabled: { name: 'недоступна' },
    background: { name: 'фон', control: 'inline-radio', options: ['cream', 'white', 'sand', 'navy'] },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-10" [class]="'bg-' + background">
        <div class="max-w-[420px]">
          <button [siteButton]="appearance" [size]="size" [block]="block" [disabled]="disabled">{{ text }}
            @if (arrow) {<site-icon name="arrow-right" [size]="14" class="transition-transform duration-300 group-hover:translate-x-1" />}
          </button>
        </div>
      </div>
    `,
  }),
};

export const ВсеВарианты: StoryObj = {
  name: 'Все варианты',
  render: () => ({
    template: `
      <div class="grid gap-1 lg:grid-cols-2">
        <div class="space-y-6 bg-cream p-8">
          <p class="eyebrow">На светлом фоне</p>
          <div class="flex flex-wrap items-center gap-4">
            <a siteButton href="#">Отправить</a>
            <a siteButton href="#">Пригласить дизайнера <site-icon name="arrow-right" [size]="14" class="transition-transform duration-300 group-hover:translate-x-1" /></a>
            <a siteButton href="#">Все цены</a>
            <a siteButton="outline-navy" href="#">Цены</a>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <a siteButton href="#">Рассчитать стоимость <site-icon name="arrow-right" [size]="14" class="transition-transform duration-300 group-hover:translate-x-1" /></a>
            <a siteButton href="#">Заказать карниз <site-icon name="arrow-right" [size]="14" class="transition-transform duration-300 group-hover:translate-x-1" /></a>
            <a siteButton href="#">Задать вопрос</a>
          </div>
          <p class="text-[12px] text-slate/60">Кнопка тарифа — на всю ширину карточки:</p>
          <div class="max-w-[320px]"><a siteButton [block]="true" href="#">Оставить заявку</a></div>
        </div>
        <div class="space-y-6 bg-navy p-8">
          <p class="eyebrow">На тёмном фоне</p>
          <div class="flex flex-wrap items-center gap-4">
            <a siteButton href="#">Пригласить дизайнера <site-icon name="arrow-right" [size]="14" class="transition-transform duration-300 group-hover:translate-x-1" /></a>
            <a siteButton="line" href="#">Каталог штор</a>
            <a siteButton="line" href="#">Смотреть цены</a>
            <a siteButton href="#">Стать партнером</a>
          </div>
          <p class="text-[12px] text-cream/60">«Заявка» в шапке — size sm:</p>
          <div class="flex items-center gap-5"><span class="text-[14px] font-bold text-cream">+7 (915) 359-12-00</span><a siteButton size="sm" href="#">Заявка</a></div>
          <p class="text-[12px] text-cream/60">Мобильное меню и боковая панель раздела — на всю ширину:</p>
          <div class="max-w-[320px] space-y-3"><a siteButton href="#" class="!flex !justify-center !border-0">Оставить заявку</a><a siteButton [block]="true" href="#">Пригласить дизайнера <site-icon name="arrow-right" [size]="14" /></a></div>
        </div>
      </div>
    `,
  }),
};

export const Состояния: StoryObj = {
  render: () => ({
    props: {
      states: [
        { label: 'Обычное', cls: '', disabled: false },
        { label: 'Наведение', cls: 'opacity-85', disabled: false },
        { label: 'Фокус', cls: 'outline-2 outline-offset-2 outline-gold', disabled: false },
        { label: 'Недоступна', cls: '', disabled: true },
      ],
    },
    template: `
      <div class="space-y-1">
        <div class="bg-cream p-8">
          <p class="eyebrow">btn-gold</p>
          <div class="flex flex-wrap items-end gap-8">
            @for (s of states; track s.label) {
              <div class="flex flex-col gap-2"><span class="text-[12px] text-slate/60">{{ s.label }}</span><button siteButton [class]="s.cls" [disabled]="s.disabled">Отправить</button></div>
            }
          </div>
        </div>
        <div class="bg-navy p-8">
          <p class="eyebrow">btn-line</p>
          <div class="flex flex-wrap items-end gap-8">
            @for (s of states; track s.label) {
              <div class="flex flex-col gap-2"><span class="text-[12px] text-cream/60">{{ s.label }}</span><button siteButton="line" [class]="s.label === 'Наведение' ? '!border-white/70' : s.cls" [disabled]="s.disabled">Каталог штор</button></div>
            }
          </div>
        </div>
        <div class="bg-cream p-8">
          <p class="eyebrow">outline-navy</p>
          <div class="flex flex-wrap items-end gap-8">
            @for (s of states; track s.label) {
              <div class="flex flex-col gap-2"><span class="text-[12px] text-slate/60">{{ s.label }}</span><button siteButton="outline-navy" [class]="s.label === 'Наведение' ? 'opacity-80' : s.cls" [disabled]="s.disabled">Цены</button></div>
            }
          </div>
        </div>
        <div class="bg-white p-8">
          <p class="eyebrow">На всю ширину (телефон: max-sm:w-full)</p>
          <div class="max-w-[360px] space-y-3">
            <a siteButton [block]="true" href="#">Пригласить дизайнера <site-icon name="arrow-right" [size]="14" /></a>
            <button siteButton [block]="true" type="submit">Отправить</button>
          </div>
        </div>
      </div>
    `,
  }),
};

type LinkArgs = { variant: SiteTextLinkVariant; text: string };

export const СсылкиКнопки: StoryObj<LinkArgs> = {
  name: 'Ссылки-кнопки',
  args: { variant: 'more', text: 'Подробнее' },
  argTypes: {
    variant: { name: 'вид', control: 'select', options: ['more', 'section', 'invite', 'back', 'card-dark', 'card-light'] },
    text: { name: 'текст' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-1">
        <div class="p-8" [class]="variant === 'card-dark' ? 'bg-[#12294a]' : 'bg-white'"><a href="#" [siteTextLink]="variant">{{ text }}</a></div>
        <div class="grid gap-1 md:grid-cols-2">
          <div class="space-y-5 bg-white p-8">
            <div><p class="mb-2 text-[12px] text-slate/60">more — карточка каталога</p><a href="#" siteTextLink="more">Подробнее</a></div>
            <div><p class="mb-2 text-[12px] text-slate/60">section — вкладка цен, «Все цены»</p><a href="#" siteTextLink="section">Перейти в раздел «Шторы блэкаут»</a><br /><a href="#" siteTextLink="section" class="py-3">Все цены</a></div>
            <div><p class="mb-2 text-[12px] text-slate/60">invite — «Добро пожаловать» (hover: отступ растёт)</p><a href="#" siteTextLink="invite">Пригласить дизайнера</a></div>
            <div><p class="mb-2 text-[12px] text-slate/60">back — страница модели</p><a href="#" siteTextLink="back">Все модели</a></div>
            <div><p class="mb-2 text-[12px] text-slate/60">card-light — карточка модели карниза</p><a href="#" siteTextLink="card-light">Подробнее</a></div>
          </div>
          <div class="space-y-5 bg-[#12294a] p-8">
            <div><p class="mb-2 text-[12px] text-cream/60">card-dark — карточка коллекции</p><a href="#" siteTextLink="card-dark">Подробнее</a></div>
            <div><p class="mb-2 text-[12px] text-cream/60">Телефон в шапке</p><a href="#" class="text-[14px] font-bold whitespace-nowrap text-cream transition-colors hover:text-gold">+7 (915) 359-12-00</a></div>
            <div><p class="mb-2 text-[12px] text-cream/60">«Открыть карту →»</p><span class="text-[12px] font-bold tracking-[.1em] text-gold uppercase">Открыть карту →</span></div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ЗвонокСтрелкиТочки: StoryObj = {
  name: 'Звонок, стрелки, точки',
  render: () => ({
    props: { index: 0, stripDisabled: true },
    template: `
      <div class="grid gap-1 md:grid-cols-2">
        <div class="bg-navy p-8">
          <p class="mb-3 text-[12px] text-cream/60">Кнопка звонка (мобильная шапка) и бургер</p>
          <div class="flex items-center gap-1">
            <a href="tel:+79153591200" class="grid size-11 place-items-center text-gold" aria-label="Позвонить"><site-icon name="phone" /></a>
            <button siteBurger></button>
            <button siteBurger [expanded]="true"></button>
          </div>
          <p class="mt-3 text-[12px] text-cream/50">Бургер: закрыт / открыт (нажмите, чтобы переключить)</p>
        </div>
        <div class="bg-cream p-8">
          <p class="mb-3 text-[12px] text-slate/60">Слайдер отзывов: стрелки и точки</p>
          <div class="flex items-center gap-5">
            <button siteArrow="prev" aria-label="Назад" (click)="index = (index + 2) % 3"></button>
            <site-dots [(index)]="index" />
            <button siteArrow="next" aria-label="Вперёд" (click)="index = (index + 1) % 3"></button>
          </div>
        </div>
        <div class="bg-white p-8">
          <p class="mb-3 text-[12px] text-slate/60">Стрелки ленты фото каталога (.cat-arrow): обычная, недоступная</p>
          <div class="flex gap-2">
            <button siteArrow="prev" kind="strip" aria-label="Предыдущие фото" [disabled]="stripDisabled"></button>
            <button siteArrow="next" kind="strip" aria-label="Следующие фото"></button>
          </div>
        </div>
        <div class="bg-sand p-8">
          <p class="mb-3 text-[12px] text-slate/60">Ручка «до и после»</p>
          <div class="flex size-10 items-center justify-center gap-0.5 rounded-full bg-gold text-white shadow-[0_0_0_4px_rgb(201_168_76/.28)]"><site-icon name="chevron-left" [size]="10" [strokeWidth]="2.5" /><site-icon name="chevron-right" [size]="10" [strokeWidth]="2.5" /></div>
        </div>
      </div>
    `,
  }),
};

export const Вкладки: StoryObj = {
  render: () => ({
    props: { sections: SITE_PRICES },
    template: `
      <div class="space-y-1">
        <div class="bg-cream p-8">
          <p class="mb-3 text-[12px] text-slate/60">Кнопки вкладок: активная (aria-selected) и неактивные; наведение — золотая рамка</p>
          <div class="flex flex-wrap gap-2">
            <button type="button" aria-selected="true" class="rounded-[2px] border border-navy/15 bg-white px-4 py-2.5 text-[14px] font-bold transition-colors hover:border-gold aria-selected:border-navy aria-selected:bg-navy aria-selected:text-gold">Шторы блэкаут</button>
            <button type="button" aria-selected="false" class="rounded-[2px] border border-navy/15 bg-white px-4 py-2.5 text-[14px] font-bold transition-colors hover:border-gold aria-selected:border-navy aria-selected:bg-navy aria-selected:text-gold">Римские шторы</button>
            <button type="button" aria-selected="false" class="rounded-[2px] border border-gold bg-white px-4 py-2.5 text-[14px] font-bold">Наведение</button>
          </div>
        </div>
      </div>
    `,
  }),
};

type ToTopArgs = { threshold: number; visible: boolean };

export const КнопкаНаверх: StoryObj<ToTopArgs> = {
  name: 'Кнопка наверх',
  args: { threshold: 600, visible: true },
  argTypes: {
    threshold: { name: 'появляется после прокрутки, px', control: { type: 'number', min: 0, step: 100 } },
    visible: { name: 'показать принудительно' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="min-h-[320px] bg-cream p-8">
        <p class="text-[12px] text-slate/60">Кнопка закреплена в правом нижнем углу окна (20px, с 640px — 28px). Появляется после прокрутки больше threshold.</p>
      </div>
      <site-to-top [threshold]="threshold" [visible]="visible" />
    `,
  }),
};

export const КнопкаНаверхПриПрокрутке: StoryObj<{ threshold: number }> = {
  name: 'Кнопка наверх — при прокрутке',
  args: { threshold: 600 },
  argTypes: { threshold: { name: 'появляется после прокрутки, px', control: { type: 'number', min: 0, step: 100 } } },
  render: (args) => ({
    props: { ...args, blocks: Array.from({ length: 12 }, (_, i) => i + 1) },
    template: `
      <div class="bg-cream">
        <p class="sticky top-0 z-10 bg-gold-soft px-5 py-2 text-[12px]">Прокрутите страницу вниз больше чем на {{ threshold }}px — появится кнопка «наверх».</p>
        @for (b of blocks; track b) {
          <div class="wrap py-10"><p class="eyebrow">Блок {{ b }}</p><div class="h-[200px] border border-navy/10 bg-white"></div></div>
        }
      </div>
      <site-to-top [threshold]="threshold" />
    `,
  }),
};
