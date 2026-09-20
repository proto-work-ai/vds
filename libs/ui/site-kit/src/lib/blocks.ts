import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChildren,
} from '@angular/core';
import { SiteArrow, SiteDots } from './controls.component';
import {
  SITE_ASSETS_URL,
  SITE_REVIEWS,
  SiteFaqItem,
  SiteLink,
  SitePriceSection,
  SiteStep,
} from './data';
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
  templateUrl: './site-section-heading.html',
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
  templateUrl: './site-breadcrumbs.html',
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
  templateUrl: './site-page-hero.html',
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
  templateUrl: './site-steps.html',
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
  templateUrl: './site-faq.html',
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
  host: {
    class: 'block touch-pan-y',
    '(pointerdown)': 'swipeStart($event)',
    '(pointerup)': 'swipeEnd($event)',
    '(pointercancel)': 'swipeCancel()',
  },
  templateUrl: './site-review-slider.html',
})
export class SiteReviewSlider {
  protected readonly assets = inject(SITE_ASSETS_URL);
  readonly count = input(3);
  readonly autoplay = input(false);
  readonly index = model(0);
  protected readonly shown = signal(0);
  protected readonly review = computed(() => SITE_REVIEWS[this.shown() % SITE_REVIEWS.length]);
  private swipe: { id: number; x: number; y: number } | null = null;
  protected swipeStart(event: PointerEvent): void {
    if (event.pointerType === 'mouse') return;
    this.swipe = { id: event.pointerId, x: event.clientX, y: event.clientY };
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  }
  protected swipeEnd(event: PointerEvent): void {
    if (!this.swipe || event.pointerId !== this.swipe.id) return;
    const dx = event.clientX - this.swipe.x;
    const dy = event.clientY - this.swipe.y;
    this.swipe = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) this.go(this.index() + (dx < 0 ? 1 : -1));
  }
  protected swipeCancel(): void {
    this.swipe = null;
  }
  protected readonly out = signal(false);
  private _token = 0;
  private transitionTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    const destroy = inject(DestroyRef);
    destroy.onDestroy(() => clearTimeout(this.transitionTimer));
    afterNextRender(() => {
      this.shown.set(this.index());
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const timer = setInterval(
        () => this.autoplay() && !document.hidden && this.go(this.index() + 1),
        5200,
      );
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
    clearTimeout(this.transitionTimer);
    this.transitionTimer = setTimeout(() => {
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
    class:
      'relative block h-[300px] cursor-col-resize touch-pan-y overflow-hidden select-none sm:h-[500px]',
    tabindex: '0',
    role: 'slider',
    'aria-label': 'Сравнение до и после',
    'aria-valuemin': '3',
    'aria-valuemax': '97',
    '[attr.aria-valuenow]': 'pos()',
    '(pointerdown)': 'down($event)',
    '(pointermove)': 'drag && set($event.clientX)',
    '(window:pointerup)': 'drag = false',
    '(keydown)': 'key($event)',
  },
  templateUrl: './site-before-after.html',
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
  templateUrl: './site-price-table.html',
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
  templateUrl: './site-price-tabs.html',
})
export class SitePriceTabs {
  readonly sections = input.required<SitePriceSection[]>();
  readonly selected = model('');
  readonly layout = input<'auto' | 'table' | 'cards'>('auto');
  readonly root = input('');
  protected readonly current = computed(
    () => this.sections().find((s) => s.key === this.selected()) ?? this.sections()[0],
  );
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
  templateUrl: './site-contact-item.html',
})
export class SiteContactItem {
  readonly icon = input<'pin' | 'clock' | 'phone' | 'mail' | 'message'>('phone');
  readonly label = input.required<string>();
}
