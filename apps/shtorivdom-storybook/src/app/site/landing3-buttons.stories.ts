import type { Meta, StoryObj } from '@storybook/angular';

/** Кнопки лендинга 3 (mockups/landing-3) — копия 1:1. Стили: src/landing-3-buttons.css. */
const meta: Meta = {
  title: 'Сайт/Кнопки лендинга 3',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const label = 'font-family:Raleway,sans-serif;font-size:12px;color:rgb(212 175 55 / .6);margin-bottom:12px';

export const ВсеКнопки: StoryObj = {
  name: 'Все кнопки',
  render: () => ({
    props: { open: false, label },
    template: `
      <div class="l3-bg" style="padding:40px;display:flex;flex-direction:column;gap:40px">
        <div>
          <p [style]="label">Шапка — «Book Consult»</p>
          <a href="#" class="l3-btn-header" (click)="$event.preventDefault()">Book Consult</a>
        </div>
        <div>
          <p [style]="label">Первый экран — золотая (пульс) и контурная (свечение рамки)</p>
          <div style="display:flex;flex-wrap:wrap;gap:20px">
            <a href="#" class="l3-btn-primary" (click)="$event.preventDefault()">Explore Collections</a>
            <a href="#" class="l3-btn-outline" (click)="$event.preventDefault()">Our Story</a>
          </div>
        </div>
        <div>
          <p [style]="label">Карточка коллекции — «View»</p>
          <button type="button" class="l3-btn-view">View</button>
        </div>
        <div style="max-width:560px;display:grid;grid-template-columns:1fr 1fr">
          <p [style]="label" style="grid-column:span 2">Форма — отправка</p>
          <button type="button" class="l3-btn-submit" style="grid-column:span 2">Request Free Consultation</button>
        </div>
        <div>
          <p [style]="label">Подвал — соцсети</p>
          <div style="display:flex;gap:12px">
            <button type="button" class="l3-btn-social">Ig</button>
            <button type="button" class="l3-btn-social">Fb</button>
            <button type="button" class="l3-btn-social">Pi</button>
            <button type="button" class="l3-btn-social">Li</button>
          </div>
        </div>
        <div>
          <p [style]="label">Бургер мобильного меню (нажмите)</p>
          <button type="button" class="l3-burger" [class.is-open]="open" aria-label="Toggle menu" (click)="open = !open">
            <div><span></span><span></span><span></span></div>
          </button>
        </div>
      </div>
    `,
  }),
};

export const ВсеКнопкиТелефон: StoryObj = {
  ...ВсеКнопки,
  name: 'Все кнопки — телефон',
  globals: { viewport: { value: 'phone375', isRotated: false } },
};

export const ПоРусски: StoryObj = {
  name: 'С русским текстом',
  render: () => ({
    props: { label },
    template: `
      <div class="l3-bg" style="padding:40px;display:flex;flex-wrap:wrap;gap:20px;align-items:center">
        <a href="#" class="l3-btn-header" (click)="$event.preventDefault()">Заявка</a>
        <a href="#" class="l3-btn-primary" (click)="$event.preventDefault()">Каталог штор</a>
        <a href="#" class="l3-btn-outline" (click)="$event.preventDefault()">О нас</a>
        <button type="button" class="l3-btn-view">Подробнее</button>
        <button type="button" class="l3-btn-submit">Пригласить дизайнера</button>
      </div>
    `,
  }),
};
