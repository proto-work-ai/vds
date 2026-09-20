import { ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input, signal, afterNextRender } from '@angular/core';
import { SiteButton } from './button.directive';
import { SITE_ASSETS_URL, SiteCatalogSection, SiteTier } from './data';
import { SiteIcon, SiteIconName } from './icon.component';
import { SiteTextLink } from './text-link.component';

/** Карточка раздела каталога на главной (landing-1 «Services»): фото, цена «от», прайс и «Подробнее →». */
@Component({
  selector: 'site-catalog-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteTextLink],
  host: { class: 'block h-full' },
  template: `
    <div class="svc-card">
      <div class="relative h-[200px] sm:h-[220px]">
        <img loading="lazy" class="absolute inset-0 size-full object-cover"
          [src]="assets + 'img/catalog/' + section().key + '/' + section().image" [alt]="section().title" />
        <div class="absolute inset-0 bg-gradient-to-t from-navy/75 to-transparent to-60%"></div>
        <div class="absolute inset-x-5 bottom-4 flex flex-wrap items-end justify-between gap-2">
          <h3 class="text-[20px] font-bold text-cream">{{ section().title }}</h3>
          <span
            class="rounded-[2px] bg-navy/60 px-2.5 py-1 text-[12px] font-bold whitespace-nowrap text-gold">{{ section().minPrice }}</span>
        </div>
      </div>
      <div class="px-6 pt-6 pb-5">
        <p class="mb-4 text-[14px] leading-[1.75] font-light text-slate">{{ section().text }}</p>
        <ul class="mb-4">
          @for (p of section().prices; track p.name) {
            <li class="flex items-baseline gap-2.5 py-1.5 text-[14px]"><span class="font-bold text-gold">✓</span><span
              class="flex-1">{{ p.name }}</span><span class="font-bold whitespace-nowrap">{{ p.price }}</span></li>
          }
        </ul>
        <a siteTextLink="more" class="mb-4" [href]="root() + 'catalog/' + section().key + '/'">Подробнее</a>
      </div>
    </div>
  `,
})
export class SiteCatalogCard {
  readonly section = input.required<SiteCatalogSection>();
  readonly root = input('');
  protected readonly assets = inject(SITE_ASSETS_URL);
}

/** Тёмная карточка коллекции на странице каталога (landing-5): фото, плашка, номер раздела, цена, «Подробнее». */
@Component({
  selector: 'site-collection-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteIcon],
  host: { class: 'block' },
  template: `
    <a class="group block" [href]="root() + 'catalog/' + section().key + '/'">
      <div class="cat-card cat-card-dark h-full overflow-hidden rounded-[2px]">
        <div class="relative h-[240px] overflow-hidden bg-navy-deep sm:h-[280px]">
          <img loading="lazy" class="cat-zoom-img block size-full object-cover"
            [src]="assets + 'img/catalog/' + section().key + '/' + section().image" [alt]="section().title" />
          <div class="absolute inset-0 bg-[linear-gradient(to_top,rgb(8_22_41/.8)_0%,transparent_50%)]"></div>
          <span class="cat-pill absolute top-4 right-4">{{ pill() }}</span>
        </div>
        <div class="px-6 pt-6 pb-7 sm:px-7">
          <p class="mb-2 text-[11px] tracking-[.25em] text-gold uppercase opacity-80">Раздел {{ number() }}</p>
          <h2 class="mb-2.5 text-[24px] font-bold text-cream">{{ section().title }}</h2>
          <p class="mb-5 text-[14px] leading-[1.7] text-cream/55">{{ section().text }}</p>
          <div class="cat-gold-line mb-5"></div>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span class="text-[14px] tracking-[.04em] text-gold">{{ section().minPrice.replace('/', ' / ') }}</span>
            <span
              class="inline-flex items-center gap-1.5 text-[11px] tracking-[.2em] text-cream/60 uppercase transition-colors
                group-hover:text-gold">Подробнее <site-icon name="arrow-right"
                class="transition-transform duration-300 group-hover:translate-x-1" [size]="14" /></span>
          </div>
        </div>
      </div>
    </a>
  `,
})
export class SiteCollectionCard {
  readonly section = input.required<SiteCatalogSection>();
  readonly index = input(0);
  readonly root = input('');
  protected readonly assets = inject(SITE_ASSETS_URL);
  protected readonly number = computed(() => String(this.index() + 1).padStart(2, '0'));
  protected readonly pill = computed(() => (this.section().key === 'curtain-rods' ? '9 моделей' : `${this.section().photos} фото`));
}

/** Тариф (landing-1 «Pricing»): standard — белый, premium — тёмный с золотой рамкой, lux — gold-soft. */
@Component({
  selector: 'site-tier-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteButton],
  host: { class: 'block' },
  template: `
    <div [class]="box()">
      <p class="mb-3 text-[12px] font-bold tracking-[.2em] uppercase" [class.text-gold]="tier().tone !== 'lux'">{{ tier().name }}</p>
      <p class="mb-1 font-serif text-[40px] leading-none font-bold sm:text-[46px]"><span
        class="align-middle text-[18px] font-normal">от</span> {{ tier().price }}</p>
      <p class="mb-5 text-[12px] opacity-60">руб</p>
      <p class="mb-5 text-[14px] leading-relaxed" [class]="dark() ? 'text-cream/80' : 'text-slate'">{{ tier().text }}</p>
      <div class="mb-5 h-px" [class]="dark() ? 'bg-gold/30' : 'bg-navy/10'"></div>
      <ul class="mb-5 text-[14px] [&>li]:flex [&>li]:gap-2.5 [&>li]:py-1.5">
        @for (f of tier().features; track f) {<li><span class="font-bold" [class.text-gold]="tier().tone !== 'lux'">✓</span>{{ f }}</li>}
      </ul>
      <p class="mb-2 text-[12px] font-bold tracking-[.15em] uppercase" [class.text-gold]="tier().tone !== 'lux'">В подарок</p>
      <ul class="mb-6 text-[14px] [&>li]:py-1" [class]="dark() ? 'text-cream/80' : 'text-slate'">
        @for (g of tier().gifts; track g) {<li>{{ g }}</li>}
      </ul>
      <p class="mb-6 text-[12px]" [class]="dark() ? 'text-cream/60' : 'text-slate/70'">*Срок изготовления {{ tier().term }}</p>
      <a siteButton href="#lead" [block]="true">Оставить заявку</a>
    </div>
  `,
})
export class SiteTierCard {
  readonly tier = input.required<SiteTier>();
  protected readonly dark = computed(() => this.tier().tone === 'premium');
  protected readonly box = computed(() => {
    switch (this.tier().tone) {
      case 'premium': return 'tier border-2 border-gold bg-navy px-6 py-10 text-cream shadow-[0_20px_60px_rgb(201_168_76/.2)] sm:px-9 sm:py-11';
      case 'lux': return 'tier border border-navy/10 bg-gold-soft px-6 py-9 sm:px-8';
      default: return 'tier border border-navy/10 bg-white px-6 py-9 sm:px-8';
    }
  });
}

/** Работа в галерее (landing-1 «Real Homes»): увеличение фото и подпись по наведению. */
@Component({
  selector: 'site-work-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <a class="work group relative block aspect-[4/5] overflow-hidden rounded-[4px] bg-navy" [href]="href()" [class.is-hover]="hover()">
      <img loading="lazy" class="size-full object-cover" [src]="assets + image()" [alt]="title()" />
      <span
        class="cap absolute inset-0 flex items-end bg-gradient-to-t from-navy/85 to-transparent to-55% p-5 font-serif text-[18px]
          font-semibold text-cream">{{ title() }}</span>
    </a>
  `,
})
export class SiteWorkCard {
  readonly title = input.required<string>();
  readonly image = input.required<string>();
  readonly href = input('#');
  /** Показать состояние наведения без мыши (для витрины) */
  readonly hover = input(false);
  protected readonly assets = inject(SITE_ASSETS_URL);
}

/** Модель карниза: grid — карточка в сетке раздела; strip — маленькая карточка ленты «Другие модели». */
@Component({
  selector: 'site-rod-model-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteIcon],
  host: { class: 'block' },
  template: `
    @if (kind() === 'grid') {
      <a class="group block" [href]="href()">
        <div class="cat-card h-full overflow-hidden rounded-[2px] border border-navy/10 bg-white">
          <div class="relative flex h-[190px] items-center justify-center overflow-hidden bg-white px-6"><img loading="lazy"
            class="cat-zoom-img max-h-[120px] w-full object-contain" [src]="image()" [alt]="title()" /></div>
          <div class="border-t border-navy/10 px-6 pt-5 pb-6">
            <p class="mb-2 text-[11px] tracking-[.25em] text-gold uppercase">Модель {{ number() }}</p>
            <h3 class="mb-4 text-[20px] leading-snug">{{ title() }}</h3>
            <div class="cat-gold-line mb-4"></div>
            <span
              class="inline-flex items-center gap-2 text-[12px] font-bold tracking-[.2em] text-navy/70 uppercase transition-colors
                group-hover:text-gold">Подробнее <site-icon name="arrow-right"
                class="transition-transform duration-300 group-hover:translate-x-1" [size]="14" /></span>
          </div>
        </div>
      </a>
    } @else {
      <a class="cat-card group flex flex-col border border-navy/10 bg-white" [href]="href()">
        <span class="flex h-[140px] items-center overflow-hidden px-5"><img loading="lazy"
          class="cat-zoom-img max-h-[90px] w-full object-contain" [src]="image()" [alt]="title()" /></span>
        <span
          class="border-t border-navy/10 px-5 py-4 font-serif tetext-[14px] leading-snug transition-colors
            group-hover:text-gold">{{ title() }}</span>
      </a>
    }
  `,
})
export class SiteRodModelCard {
  readonly number = input(1);
  readonly title = input.required<string>();
  readonly kind = input<'grid' | 'strip'>('grid');
  readonly href = input('#');
  protected readonly assets = inject(SITE_ASSETS_URL);
  protected readonly image = computed(() => `${this.assets}img/catalog/curtain-rods/models/catalog-${this.number()}.webp`);
}

/** Карточка услуги (страница услуг): фото с плашкой, заголовок и текст. */
@Component({
  selector: 'site-service-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
  template: `
    <article class="svc-card !cursor-default">
      <div class="relative h-[200px] sm:h-[220px]">
        <img loading="lazy" class="absolute inset-0 size-full object-cover" [src]="assets + image()" [alt]="title()" />
        <div class="absolute inset-0 bg-gradient-to-t from-navy/75 to-transparent to-60%"></div>
        @if (badge()) {<span
          class="absolute bottom-4 left-5 rounded-[2px] bg-navy/60 px-2.5 py-1 text-[12px] font-bold text-gold">{{ badge() }}</span>}
      </div>
      <div class="px-6 pt-6 pb-7"><h3 class="mb-3 text-[20px] font-bold">{{ title() }}</h3><p
        class="text-[14px] leading-[1.75] font-light text-slate">{{ text() }}</p></div>
    </article>
  `,
})
export class SiteServiceCard {
  readonly title = input.required<string>();
  readonly text = input('');
  readonly image = input.required<string>();
  readonly badge = input('');
  protected readonly assets = inject(SITE_ASSETS_URL);
}

/** Преимущество (О нас, landing-6): иконка в золотой рамке, заголовок, текст. */
@Component({
  selector: 'site-feature',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteIcon],
  host: { class: 'block' },
  template: `
    <span class="mb-4 grid size-12 place-items-center border border-gold/40 text-gold"><site-icon [name]="icon()" [size]="22"
      [strokeWidth]="1.6" /></span>
    <h3 class="mb-2 text-[19px]">{{ title() }}</h3>
    <p class="text-[14px] leading-relaxed font-light text-slate">{{ text() }}</p>
  `,
})
export class SiteFeature {
  readonly icon = input<SiteIconName>('grid');
  readonly title = input.required<string>();
  readonly text = input('');
}

/** Пункт с галочкой: gold — галочка текстом (тарифы, услуги); circle — золотой кружок (партнёрам); hero — белый текст первого экрана. */
@Component({
  selector: 'site-check-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-start', '[class]': 'variant() === "circle" ? "gap-4" : "gap-3"' },
  template: `
    @switch (variant()) {
      @case ('circle') {<span
        class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold text-[12px] font-bold text-white">✓</span>}
      @case ('hero') {<span class="mt-0.5 text-gold">✓</span>}
      @default {<span class="font-bold text-gold">✓</span>}
    }
    <span><ng-content /></span>
  `,
})
export class SiteCheckItem {
  readonly variant = input<'gold' | 'circle' | 'hero'>('gold');
}

/** Счётчик (landing-8): число растёт за 1.8 с при появлении в зоне видимости. */
@Component({
  selector: 'site-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div [class]="size() === 'lg'
      ? 'font-serif text-[22px] leading-none whitespace-nowrap text-gold min-[375px]:text-[24px] sm:text-[48px]'
      : 'font-serif text-[34px] leading-none text-gold'">{{ text() }}</div>
    <p [class]="size() === 'lg'
      ? 'mx-auto mt-2 max-w-[280px] text-[12px] leading-snug text-cream/70 sm:text-[14px]'
      : 'mt-2 text-[14px] leading-snug text-slate'">{{ label() }}</p>
  `,
})
export class SiteCounter {
  readonly value = input.required<number>();
  readonly suffix = input('+');
  readonly label = input('');
  /** md — блок «Добро пожаловать» на главной; lg — полоса цифр на тёмном фоне (О нас) */
  readonly size = input<'md' | 'lg'>('md');
  readonly animate = input(true);

  private readonly _current = signal<number | null>(null);
  protected readonly text = computed(() => String(this._current() ?? this.value()).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + this.suffix());

  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (!this.animate() || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let raf = 0;
      const io = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const to = this.value();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1800);
          this._current.set(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, { threshold: 0.5 });
      io.observe(el);
      destroy.onDestroy(() => { io.disconnect(); cancelAnimationFrame(raf); });
    });
  }
}
