import type { Meta, StoryObj } from '@storybook/angular';
import { siteDecorators } from './site-story';

const meta: Meta = {
  title: 'Сайт/Основы',
  decorators: siteDecorators,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const COLORS = [
  { token: 'navy', hex: '#0d223d', use: 'Основной: текст, тёмные секции, шапка', cls: 'bg-navy', dark: true },
  { token: 'navy-deep', hex: '#081629', use: 'Подвал, подложка фото каталога', cls: 'bg-navy-deep', dark: true },
  { token: 'gold', hex: '#c9a84c', use: 'Акцент: кнопки, надзаголовки, иконки', cls: 'bg-gold', dark: false },
  { token: 'gold-soft', hex: '#f0e6c8', use: 'Тариф «Люкс», цитаты', cls: 'bg-gold-soft', dark: false },
  { token: 'cream', hex: '#f5f0e8', use: 'Фон страницы, текст на тёмном', cls: 'bg-cream', dark: false },
  { token: 'sand', hex: '#e8e2d6', use: 'Фон чередующихся секций, точки слайдера', cls: 'bg-sand', dark: false },
  { token: 'slate', hex: '#2d3748', use: 'Основной текст абзацев', cls: 'bg-slate', dark: true },
  { token: 'white', hex: '#ffffff', use: 'Карточки, формы, белые секции', cls: 'bg-white', dark: false },
  { token: 'ошибка', hex: '#c0392b', use: 'Рамка и текст ошибок форм', cls: 'bg-[#c0392b]', dark: true },
];

export const Цвета: StoryObj = {
  render: () => ({
    props: { colors: COLORS },
    template: `
      <div class="wrap py-10">
        <p class="eyebrow">Палитра</p>
        <h2 class="h2 mb-8">Цвета <span class="text-gold italic">сайта</span></h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          @for (c of colors; track c.token) {
            <div class="overflow-hidden rounded-[4px] border border-navy/10 bg-white">
              <div class="flex h-28 items-end p-4 font-serif text-[22px] font-bold" [class]="c.cls" [class.text-cream]="c.dark">{{ c.token }}</div>
              <div class="px-4 py-3">
                <p class="font-bold">{{ c.hex }} <span class="ml-2 text-[12px] font-normal text-slate/60">--color-{{ c.token }}</span></p>
                <p class="text-[14px] text-slate">{{ c.use }}</p>
              </div>
            </div>
          }
        </div>
        <h3 class="mt-12 mb-4 text-[24px]">Прозрачности из разметки</h3>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          @for (o of ['navy/5','navy/8','navy/10','navy/15','navy/18','navy/25','gold/10','gold/20','gold/25','gold/30','gold/40','gold/50','cream/60','cream/70','cream/75','white/60']; track o) {
            <div class="rounded-[2px] border border-navy/10 bg-white p-2 text-center text-[12px]">
              <div class="mb-2 h-10" [class]="'bg-' + o" [class.bg-navy]="o.startsWith('cream') || o.startsWith('white')"></div>{{ o }}
            </div>
          }
        </div>
        <div class="hidden bg-navy/5 bg-navy/8 bg-navy/10 bg-navy/15 bg-navy/18 bg-navy/25 bg-gold/10 bg-gold/20 bg-gold/25 bg-gold/30 bg-gold/40 bg-gold/50 bg-cream/60 bg-cream/70 bg-cream/75 bg-white/60"></div>
      </div>
    `,
  }),
};

export const Типографика: StoryObj = {
  render: () => ({
    template: `
      <div class="wrap space-y-10 py-10">
        <section>
          <p class="eyebrow">Шрифты</p>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="border border-navy/10 bg-white p-6"><p class="mb-2 text-[12px] font-bold tracking-[.15em] text-gold uppercase">Заголовки — Playfair Display</p><p class="font-serif text-[40px] leading-tight">Шторы под ключ <em class="text-gold">на заказ</em></p><p class="mt-2 font-serif text-[18px]">Аа Бб Вв Гг 0123456789 — 400, <b>700</b>, <i>курсив</i></p></div>
            <div class="border border-navy/10 bg-white p-6"><p class="mb-2 text-[12px] font-bold tracking-[.15em] text-gold uppercase">Текст — Lato 2.0</p><p class="text-[18px] font-light">Лёгкий 300 — абзацы секций</p><p class="text-[18px]">Обычный 400 — текст и поля</p><p class="text-[18px] font-bold">Жирный 700 — кнопки и подписи</p></div>
          </div>
        </section>
        <section class="space-y-6">
          <p class="eyebrow">Заголовки</p>
          <div><p class="mb-1 text-[12px] text-slate/60">h1 первого экрана — 40 / 56 (sm) / 72 (lg), leading 1.08</p><h1 class="text-[40px] leading-[1.08] sm:text-[56px] lg:text-[72px]">Шторы под ключ <em class="text-gold not-italic">на заказ</em></h1></div>
          <div><p class="mb-1 text-[12px] text-slate/60">h1 страницы каталога — clamp(36px, 6vw, 60px)</p><h1 class="text-[clamp(36px,6vw,60px)] leading-[1.15] font-bold">Каталог <em class="text-gold">Штор</em></h1></div>
          <div class="bg-navy p-6 text-center text-cream"><p class="mb-1 text-[12px] text-cream/60">h1 внутренней страницы — 24 мобильный / 38 десктоп</p><h1 class="text-[24px] leading-[1.2] font-bold sm:text-[38px]">Цены / стоимость</h1></div>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="bg-white p-6"><p class="mb-1 text-[12px] text-slate/60">h1 внутренней страницы, мобильный — 24px</p><h1 class="text-[24px] leading-[1.2] font-bold">Цены / стоимость</h1></div>
            <div class="bg-white p-6"><p class="mb-1 text-[12px] text-slate/60">h1 внутренней страницы, десктоп — 38px</p><h1 class="text-[38px] leading-[1.2] font-bold">Цены / стоимость</h1></div>
          </div>
          <div><p class="mb-1 text-[12px] text-slate/60">.h2 — clamp(28px, 4vw, 44px), 700</p><h2 class="h2">Каталог <span class="text-gold italic">Штор</span></h2></div>
          <div><p class="mb-1 text-[12px] text-slate/60">h2 секций landing-8/9 — clamp(30px, 4vw, 46px), 400</p><h2 class="text-[clamp(30px,4vw,46px)] leading-tight">Более 15 лет мы создаем <em>уникальные текстильные интерьеры</em></h2></div>
          <div><p class="mb-1 text-[12px] text-slate/60">h3 — 24 / 20 / 19px</p><h3 class="text-[24px]">Цены по разделам</h3><h3 class="text-[20px]">Встреча</h3><h3 class="text-[19px]">Бесплатная доставка</h3></div>
        </section>
        <section class="space-y-5">
          <p class="eyebrow">Надзаголовки и разделители</p>
          <div class="grid gap-6 md:grid-cols-3">
            <div class="bg-white p-6 text-center"><p class="mb-2 text-[12px] text-slate/60">.eyebrow + .divider</p><p class="eyebrow">Каталог</p><div class="divider"><i></i></div></div>
            <div class="bg-white p-6"><p class="mb-2 text-[12px] text-slate/60">Линии с двух сторон (landing-9)</p><div class="flex items-center justify-center gap-3"><span class="h-px w-8 bg-gold"></span><span class="text-[12px] tracking-[.28em] text-gold uppercase">Этапы</span><span class="h-px w-8 bg-gold"></span></div></div>
            <div class="bg-white p-6"><p class="mb-2 text-[12px] text-slate/60">Градиентные линии (каталог)</p><div class="flex items-center justify-center gap-4"><span class="cat-line-l h-px w-[60px]"></span><span class="text-[12px] tracking-[.35em] text-gold uppercase">Модели</span><span class="cat-line-r h-px w-[60px]"></span></div><div class="cat-gold-line mt-4"></div></div>
          </div>
        </section>
        <section class="space-y-3">
          <p class="eyebrow">Текст и подписи</p>
          <p class="max-w-[640px] text-[18px] leading-relaxed text-slate">Лид первого экрана — 18px, leading-relaxed</p>
          <p class="max-w-[640px] text-[16px] leading-[1.8] font-light text-slate">Абзац секции — 16px, 300, leading 1.8. Вся продукция изготавливается по индивидуальным размерам из качественных материалов.</p>
          <p class="text-[15px] leading-relaxed text-slate/80">Текст шагов — 15px, slate/80</p>
          <p class="text-[14px] text-slate/70">*Сноска — 14px, slate/70. Цены ориентировочные.</p>
          <p class="text-[12px] font-bold tracking-[.12em] text-gold uppercase">Подпись контакта — 12px, 700, uppercase</p>
          <p class="field-label">Подпись поля — .field-label</p>
          <p class="font-serif text-[20px] leading-[1.6] border-l-2 border-gold pl-5">Цитата-вступление раздела каталога — Playfair 20/23px</p>
        </section>
      </div>
    `,
  }),
};

export const КонтейнерИОтступы: StoryObj = {
  name: 'Контейнер и отступы',
  render: () => ({
    template: `
      <div class="py-10">
        <div class="wrap mb-8"><p class="eyebrow">.wrap</p><p class="text-slate">Контейнер 1200px, поля 20px (до 640px) и 32px. Секции: py-16 / sm:py-24 или py-20 / sm:py-28. Узкие: max-w-[1100px] (тарифы), max-w-3xl (FAQ).</p></div>
        @for (s of sections; track s.bg) {
          <section [class]="s.bg + ' ' + s.py">
            <div class="wrap"><div class="border border-dashed border-gold bg-gold/10 px-4 py-6 text-center text-[14px]">{{ s.label }}</div></div>
          </section>
        }
      </div>
    `,
    props: {
      sections: [
        { bg: 'bg-cream', py: 'py-16 sm:py-24', label: 'bg-cream · py-16 sm:py-24' },
        { bg: 'bg-sand', py: 'py-16 sm:py-24', label: 'bg-sand · py-16 sm:py-24' },
        { bg: 'bg-white', py: 'py-20 sm:py-28', label: 'bg-white · py-20 sm:py-28' },
        { bg: 'bg-navy', py: 'py-8 sm:py-10', label: 'bg-navy · py-8 sm:py-10 (полоса цифр)' },
      ],
    },
  }),
};

export const АнимацииПоявления: StoryObj = {
  name: 'Анимации появления',
  render: () => ({
    props: { shown: false },
    template: `
      <div class="wrap py-10">
        <p class="eyebrow">.reveal · .reveal-soft · .fade-up · .rise</p>
        <p class="mb-6 text-slate">Карточки и фото появляются при прокрутке (класс is-in), первый экран — .rise при загрузке. Тексты и кнопки видны сразу (решение владельца).</p>
        <button type="button" class="btn-gold mb-8" (click)="shown = !shown">{{ shown ? 'Скрыть' : 'Показать' }}</button>
        <div class="grid gap-5 sm:grid-cols-3">
          <div class="reveal border border-navy/10 bg-white p-6" [class.is-in]="shown">.reveal — 40px, 0.7s</div>
          <div class="reveal reveal-soft border border-navy/10 bg-white p-6" style="--d:.1s" [class.is-in]="shown">.reveal-soft — 28px, 0.85s</div>
          <div class="reveal fade-up border border-navy/10 bg-white p-6" style="--d:.2s" [class.is-in]="shown">.fade-up — 48px, 0.8s</div>
        </div>
        @if (shown) {<div class="rise mt-6 border border-navy/10 bg-white p-6" style="--d:.1s">.rise — появление при загрузке, 0.9s</div>}
      </div>
    `,
  }),
};
