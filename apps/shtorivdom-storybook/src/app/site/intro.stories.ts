import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SiteLogo } from '@shtorivdom/site-kit';
import { siteDecorators } from './site-story';

const meta: Meta = {
  title: 'Сайт/Введение',
  decorators: [...siteDecorators, moduleMetadata({ imports: [SiteLogo] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Введение: StoryObj = {
  render: () => ({
    template: `
      <div class="wrap max-w-[900px] py-12 text-[14px] leading-relaxed text-slate">
        <div class="mb-8 w-[220px]"><site-logo variant="horizontal" color="navy" /></div>
        <p class="eyebrow">Дизайн-система</p>
        <h1 class="h2 mb-6 text-navy">Элементы сайта <span class="text-gold italic">Shtorivdom</span></h1>
        <p class="mb-4">Здесь собраны все элементы интерфейса прототипа сайта: палитра, шрифты, логотипы, кнопки, иконки, формы, карточки, блоки страниц, шапка, подвал и письма заявок.</p>
        <h2 class="mt-10 mb-3 text-[24px] text-navy">Откуда элементы</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>Источник — прототип <b>mockups/site</b>: разметка <b>src/partials</b> (theme.css, header, footer, lead-form) и <b>src/pages</b>, интерактив <b>assets/site.js</b>, письма <b>assets/email.js</b>.</li>
          <li>Компоненты — библиотека <b>libs/ui/site-kit</b> (<b>&#64;shtorivdom/site-kit</b>): standalone, OnPush, signal inputs, разметка и классы Tailwind из прототипа.</li>
          <li>Стили — <b>libs/ui/site-kit/src/styles/site.css</b>: токены <b>&#64;theme</b> и классы .btn-gold, .field, .svc-card, .tier и др. Собирается Tailwind 4 через PostCSS; сканируются файлы библиотеки и историй сайта (<b>&#64;source</b>).</li>
          <li>Картинки и email.js берутся прямо из <b>mockups/site/assets</b> (staticDirs → <b>site-assets/</b>). В компонентах путь задаёт токен <b>SITE_ASSETS_URL</b>.</li>
          <li>Шрифты — пакеты <b>lato-font</b> (Lato 2.0 с кириллицей) и <b>&#64;fontsource/playfair-display</b>, как на сайте.</li>
        </ul>
        <h2 class="mt-10 mb-3 text-[24px] text-navy">Как добавить элемент</h2>
        <ol class="list-decimal space-y-2 pl-6">
          <li>Скопируйте разметку из mockups/site/src, не меняя классов.</li>
          <li>Повторяющийся или интерактивный элемент — компонент в libs/ui/site-kit/src/lib (префикс <b>site</b>), экспорт в src/index.ts. Поведение — как в site.js.</li>
          <li>Новый компонентный CSS из theme.css — в site.css, в <b>&#64;layer components</b>.</li>
          <li>История — в apps/shtorivdom-storybook/src/app/site, заголовок «Сайт/Раздел/…», декораторы <b>siteDecorators</b>, варианты — через args.</li>
          <li>Проверка: <b>npm run storybook:build</b>, затем открыть iframe.html?id=… и сравнить с http://localhost:4320/site/.</li>
        </ol>
        <p class="mt-10 border-l-2 border-gold pl-4 text-[14px]">Узкий экран: шапка, таблицы цен и формы переключаются по медиазапросам окна (lg, md, sm) — в Storybook сузьте окно браузера или откройте историю отдельно в iframe.</p>
      </div>
    `,
  }),
};
