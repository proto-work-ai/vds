import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, effect, ElementRef, inject, input, model, signal, viewChildren } from '@angular/core';
import { SiteArrow, SiteDots } from './controls.component';
import { SITE_ASSETS_URL, SiteFaqItem, SiteLink, SitePriceSection, SiteStep } from './data';
import { closeHeight, openHeight } from './height';
import { SiteIcon } from './icon.component';
import { SiteTextLink } from './text-link.component';

/**
 * Заголовок секции: center — надзаголовок, h2 с золотым словом и ромб (landing-1);
 * lines — надпись между золотыми линиями (landing-8/9); left — линия слева.
 */
@Component({
  selector: 'site-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block', '[class.text-center]': 'variant() !== "left"' },
  template: `
    @if (variant() === 'center') {
      <p class="eyebrow">{{ eyebrow() }}</p>
      <h2 class="h2">{{ title() }} @if (accent()) {<span class="text-gold italic">{{ accent() }}</span>}</h2>
      <div class="divider"><i></i></div>
    } @else {
      <div class="mb-4 flex items-center gap-3" [class.justify-center]="variant() === 'lines'">
        <span class="h-px w-8 bg-gold"></span>
        <span class="text-[12px] tracking-[.28em] uppercase" [class]="dark() ? 'text-white/60' : 'text-gold'">{{ eyebrow() }}</span>
        @if (variant() === 'lines') {<span class="h-px w-8 bg-gold"></span>}
      </div>
      <h2 class="text-[clamp(30px,4vw,46px)] leading-[1.12]" [class.text-white]="dark()">{{ title() }} @if (accent()) {<em
        class="text-gold">{{ accent() }}</em>}</h2>
    }
  `,
})
export class SiteSectionHeading {
  readonly variant = input<'center' | 'lines' | 'left'>('center');
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly accent = input('');
  readonly dark = input(false);
}

/** Хлебные крошки: page — шапка внутренних страниц; catalog — страницы каталога (с текущей страницей). */
@Component({
  selector: 'site-breadcrumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <nav aria-label="Хлебные крошки" [class]="variant() === 'catalog'
      ? 'flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-cream/60'
      : 'flex flex-wrap items-center justify-start gap-2 text-left text-[12px] text-cream/60 sm:text-[14px]'">
      @for (item of items(); track item.label; let last = $last) {
        @if (item.href) {
          <a class="transition-colors hover:text-gold" [href]="item.href">{{ item.label }}</a>
        } @else {
          <span class="text-cream/90" aria-current="page">{{ item.label }}</span>
        }
        @if (!last) {<span class="text-gold" aria-hidden="true">/</span>}
      }
    </nav>
  `,
})
export class SiteBreadcrumbs {
  readonly items = input.required<SiteLink[]>();
  readonly variant = input<'page' | 'catalog'>('page');
}

/** Шапка внутренней страницы (_stub.html): тёмная полоса, крошки, h1, подзаголовок, кнопка в ng-content. */
@Component({
  selector: 'site-page-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteBreadcrumbs],
  host: { class: 'block bg-navy pt-[84px] pb-5 text-center text-cream sm:pt-[100px] sm:pb-9' },
  template: `
    <div class="wrap">
      <site-breadcrumbs class="mb-2 sm:mb-3" [items]="crumbs()" />
      <h1 class="text-[24px] leading-[1.2] font-bold sm:text-[38px]">{{ title() }}</h1>
      @if (lead()) {<p
        class="mx-auto mt-2 max-w-[900px] text-[14px] leading-[1.7] font-light text-balance text-cream/75 sm:mt-3
          sm:text-[16px]">{{ lead() }}</p>}
      <ng-content />
    </div>
  `,
})
export class SitePageHero {
  readonly title = input.required<string>();
  readonly lead = input('');
  readonly crumbs = input<SiteLink[]>([{ label: 'Главная', href: '#' }]);
}

/** Этапы «Как сделать заказ?» (landing-9 «Our Process»): кружки с номерами и линия на десктопе. */
@Component({
  selector: 'site-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative block' },
  template: `
    <div class="absolute top-8 right-0 left-0 hidden h-px
      bg-[linear-gradient(90deg,transparent,var(--color-sand)_8%,var(--color-sand)_92%,transparent)] lg:block"></div>
    <ol class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      @for (s of steps(); track s.title; let i = $index) {
        <li class="text-center lg:text-left">
          <span
            class="relative z-10 mx-auto mb-6 flex size-16 items-center justify-center rounded-full border-2 border-gold font-serif
              text-[22px] font-semibold text-gold lg:mx-0" [class]="circle() === 'white' ? 'bg-white' :
              'bg-cream'">{{ (i + 1).toString().padStart(2, '0') }}</span>
          <h3 class="mb-2.5 text-[20px]">{{ s.title }}</h3>
          <p class="text-[14px] leading-relaxed text-slate/80">{{ s.text }}</p>
        </li>
      }
    </ol>
  `,
})
export class SiteSteps {
  readonly steps = input.required<SiteStep[]>();
  /** Фон кружка: cream — на белой секции (главная), white — на кремовой (услуги) */
  readonly circle = input<'cream' | 'white'>('cream');
}

/** FAQ (landing-8): открыт один ответ, высота 280 мс ease-in-out. */
@Component({
  selector: 'site-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteIcon],
  host: { class: 'block space-y-2' },
  template: `
    @for (item of items(); track item.question; let i = $index) {
      <div class="border border-gold/20 bg-cream/40">
        <button type="button" class="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
          [attr.aria-expanded]="open() === i" (click)="toggle(i)">
          <span class="text-[16px]">{{ item.question }}</span>
          <span class="faq-icon shrink-0 text-gold"><span class="plus"><site-icon name="plus" [size]="16" /></span><span class="minus">
            <site-icon name="minus" [size]="16" /></span></span>
        </button>
        <div #answer class="faq-a"><p class="px-5 pb-6 text-[14px] leading-relaxed font-light text-slate sm:px-6">{{ item.answer }}</p>
          </div>
      </div>
    }
  `,
})
export class SiteFaq {
  readonly items = input.required<SiteFaqItem[]>();
  /** Индекс открытого ответа, -1 — все закрыты */
  readonly open = model(-1);
  private readonly _answers = viewChildren<ElementRef<HTMLElement>>('answer');
  private _shown = -1;
  private _rendered = false;

  constructor() {
    effect(() => {
      const open = this.open();
      const answers = this._answers();
      if (!answers.length) return;
      answers.forEach((a, i) => {
        const el = a.nativeElement;
        if (!this._rendered) el.style.height = i === open ? 'auto' : '0px';
        else if (i === open && i !== this._shown) openHeight(el, 280);
        else if (i !== open && i === this._shown) closeHeight(el);
      });
      this._shown = open;
      this._rendered = true;
    });
  }

  toggle(i: number): void {
    this.open.set(this.open() === i ? -1 : i);
  }
}

/** Слайдер отзывов (landing-9): стрелки, точки, смена раз в 5.2 с, текст — заглушки. */
@Component({
  selector: 'site-review-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteArrow, SiteDots],
  host: { class: 'block' },
  template: `
    <div class="mx-auto max-w-[760px] bg-white px-6 py-12 text-center shadow-[0_8px_64px_rgb(0_0_0/.06)] sm:px-16 sm:py-14">
      <div class="slide" [class.is-out]="out()">
        <div class="mb-8 flex justify-center gap-1 text-gold" aria-hidden="true">★★★★★</div>
        <blockquote
          class="mb-10 font-serif text-[20px] leading-relaxed text-slate/50 italic">Текст отзыва {{ shown() + 1 }} — ждёт реального
            текста</blockquote>
        <div class="flex items-center justify-center gap-4">
          <span class="size-12 rounded-full bg-sand"></span>
          <div class="text-left"><p class="font-serif text-[14px] text-slate/60">Имя клиента</p><p
            class="text-[12px] text-slate/40">Раздел каталога</p></div>
        </div>
      </div>
    </div>
    <div class="mt-8 flex items-center justify-center gap-5">
      <button siteArrow="prev" aria-label="Предыдущий отзыв" (click)="go(index() - 1)"></button>
      <site-dots [count]="count()" [index]="index()" (indexChange)="go($event)" />
      <button siteArrow="next" aria-label="Следующий отзыв" (click)="go(index() + 1)"></button>
    </div>
  `,
})
export class SiteReviewSlider {
  readonly count = input(3);
  readonly autoplay = input(true);
  readonly index = model(0);
  protected readonly shown = signal(0);
  protected readonly out = signal(false);
  private _token = 0;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      this.shown.set(this.index());
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const timer = setInterval(() => this.autoplay() && !document.hidden && this.go(this.index() + 1), 5200);
      destroy.onDestroy(() => clearInterval(timer));
    });
  }

  go(i: number): void {
    const n = this.count();
    i = (i + n) % n;
    if (i === this.index()) return;
    this.index.set(i);
    const my = ++this._token;
    this.out.set(true);
    setTimeout(() => {
      if (my !== this._token) return;
      this.shown.set(i);
      this.out.set(false);
    }, 400);
  }
}

/** До и после (landing-9): слева «До» (верхний обрезаемый слой), справа «После»; мышь, палец, стрелки ←/→. */
@Component({
  selector: 'site-before-after',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative block h-[300px] cursor-col-resize touch-pan-y overflow-hidden select-none sm:h-[500px]',
    tabindex: '0',
    role: 'slider',
    'aria-label': 'Сравнение до и после',
    '[attr.aria-valuenow]': 'pos()',
    '(pointerdown)': 'down($event)',
    '(pointermove)': 'drag && set($event.clientX)',
    '(window:pointerup)': 'drag = false',
    '(keydown)': 'key($event)',
  },
  template: `
    <img alt="Комната после" class="pointer-events-none absolute inset-0 size-full object-cover" draggable="false" [src]="assets + after()"
      />
    <span class="absolute top-5 right-5 bg-gold px-3 py-1.5 text-[12px] tracking-[.2em] text-white uppercase">После</span>
    <img alt="Комната до" class="pointer-events-none absolute inset-0 size-full object-cover" draggable="false" [src]="assets + before()"
      [style.clip-path]="clip()" />
    <span class="absolute top-5 left-5 bg-black/40 px-3 py-1.5 text-[12px] tracking-[.2em] text-white/70 uppercase backdrop-blur-sm
      transition-opacity duration-300" [style.opacity]="pos() > 12 ? 1 : 0">До</span>
    <div class="pointer-events-none absolute inset-y-0 -translate-x-1/2" [style.left.%]="pos()">
      <div class="mx-auto h-full w-px bg-white/60"></div>
      <div class="absolute top-1/2 left-1/2 flex size-10 -translate-1/2 items-center justify-center gap-0.5 rounded-full bg-gold text-white
        shadow-[0_0_0_4px_rgb(201_168_76/.28)]">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6" />
          </svg>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6" />
          </svg>
      </div>
    </div>
  `,
})
export class SiteBeforeAfter {
  readonly before = input('img/before.jpg');
  readonly after = input('img/after.jpg');
  /** Положение ручки в процентах (3–97) */
  readonly pos = model(50);
  protected readonly assets = inject(SITE_ASSETS_URL);
  protected readonly clip = computed(() => `inset(0 ${100 - this.pos()}% 0 0)`);
  protected drag = false;
  private readonly _el: HTMLElement = inject(ElementRef).nativeElement;

  down(e: PointerEvent): void {
    this.drag = true;
    this._el.setPointerCapture?.(e.pointerId);
    this.set(e.clientX);
  }

  set(x: number): void {
    const r = this._el.getBoundingClientRect();
    this.pos.set(Math.round(Math.max(3, Math.min(97, ((x - r.left) / r.width) * 100)) * 10) / 10);
  }

  key(e: KeyboardEvent): void {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    this.pos.set(Math.max(3, Math.min(97, this.pos() + (e.key === 'ArrowRight' ? 5 : -5))));
    e.preventDefault();
  }
}

/** Таблица цен раздела (price.html): таблица на md+, карточки на телефоне; layout фиксирует вид для витрины. */
@Component({
  selector: 'site-price-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteTextLink],
  host: { class: 'block' },
  template: `
    @if (layout() !== 'cards') {
      <div class="overflow-hidden rounded-[4px] border border-navy/8 bg-white shadow-[0_2px_20px_rgb(13_34_61/.06)]"
        [class]="layout() === 'auto' ? 'hidden md:block' : 'block'">
        <table class="w-full text-left text-[14px]">
          <thead class="bg-navy text-cream"><tr
            class="[&>th]:px-6 [&>th]:py-4 [&>th]:text-[12px] [&>th]:font-bold [&>th]:tracking-[.12em] [&>th]:uppercase">
            <th scope="col">Материал / модель</th><th scope="col">Производство</th><th scope="col">Ширина, м</th><th
              scope="col">Гарантия</th><th scope="col" class="text-right">Цена <span
              class="block text-[11px] font-normal tracking-normal normal-case text-cream/60">с пошивом и установкой</span></th>
          </tr></thead>
          <tbody>
            @for (r of section().rows; track r.name) {
              <tr class="border-t border-navy/8 transition-colors hover:bg-cream/60 [&>td]:px-6 [&>td]:py-4"><th scope="row"
                class="px-6 py-4 font-bold">{{ r.name }}</th><td>{{ r.country }}</td><td>{{ r.width }}</td><td>{{ r.warranty }}</td><td
                class="text-right font-serif text-[18px] font-bold whitespace-nowrap">{{ r.price }}</td></tr>
            }
          </tbody>
        </table>
      </div>
    }
    @if (layout() !== 'table') {
      <ul class="flex flex-col gap-4" [class.md:hidden]="layout() === 'auto'">
        @for (r of section().rows; track r.name) {
          <li class="rounded-[4px] border border-navy/8 bg-white p-5 shadow-[0_2px_20px_rgb(13_34_61/.06)]">
            <p class="mb-1 tetext-[14px] font-bold">{{ r.name }}</p>
            <p class="mb-4 font-serif text-[22px] font-bold text-gold">{{ r.price }}</p>
            <dl class="grid grid-cols-3 gap-2 border-t border-navy/10 pt-3 text-[12px] [&_dd]:font-bold [&_dt]:text-slate/60">
              <div><dt>Производство</dt><dd>{{ r.country }}</dd></div><div><dt>Ширина, м</dt><dd>{{ r.width }}</dd></div><div>
                <dt>Гарантия</dt><dd>{{ r.warranty }}</dd></div>
            </dl>
          </li>
        }
      </ul>
    }
    <a siteTextLink="section" class="mt-6" [href]="root() + 'catalog/' + section().key + '/'">Перейти в раздел «{{ section().title }}»</a>
  `,
})
export class SitePriceTable {
  readonly section = input.required<SitePriceSection>();
  readonly layout = input<'auto' | 'table' | 'cards'>('auto');
  readonly root = input('');
}

/** Вкладки цен: активная вкладка тёмная с золотым текстом, стрелки ←/→ переключают. */
@Component({
  selector: 'site-price-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SitePriceTable],
  host: { class: 'block' },
  template: `
    <div role="tablist" aria-label="Разделы каталога" class="mb-8 flex flex-wrap gap-2">
      @for (s of sections(); track s.key; let i = $index) {
        <button #tab type="button" role="tab"
          class="rounded-[2px] border border-navy/15 bg-white px-4 py-2.5 text-[14px] font-bold transition-colors hover:border-gold
            aria-selected:border-navy aria-selected:bg-navy aria-selected:text-gold" [id]="'tab-' + s.key" [attr.aria-controls]="'panel-' +
            s.key" [attr.aria-selected]="s.key === current().key"
          [tabIndex]="s.key === current().key ? 0 : -1"
          (click)="selected.set(s.key)" (keydown)="key($event, i)">{{ s.title }}</button>
      }
    </div>
    <div role="tabpanel" [id]="'panel-' + current().key" [attr.aria-labelledby]="'tab-' + current().key">
      <site-price-table [section]="current()" [layout]="layout()" [root]="root()" />
    </div>
  `,
})
export class SitePriceTabs {
  readonly sections = input.required<SitePriceSection[]>();
  readonly selected = model('');
  readonly layout = input<'auto' | 'table' | 'cards'>('auto');
  readonly root = input('');
  protected readonly current = computed(() => this.sections().find((s) => s.key === this.selected()) ?? this.sections()[0]);
  private readonly _tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  key(e: KeyboardEvent, i: number): void {
    const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!k) return;
    e.preventDefault();
    const list = this.sections();
    const next = (i + k + list.length) % list.length;
    this.selected.set(list[next].key);
    this._tabs()[next]?.nativeElement.focus();
  }
}

/** Иконка-кружок контакта (страница контактов) с подписью. */
@Component({
  selector: 'site-contact-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteIcon],
  host: { class: 'flex gap-4' },
  template: `
    <span class="grid size-11 shrink-0 place-items-center rounded-full border border-gold/50 text-gold"><site-icon [name]="icon()" /></span>
    <div><p class="mb-1 text-[12px] font-bold tracking-[.12em] text-gold uppercase">{{ label() }}</p><ng-content /></div>
  `,
})
export class SiteContactItem {
  readonly icon = input<'pin' | 'clock' | 'phone' | 'mail' | 'message'>('phone');
  readonly label = input.required<string>();
}
