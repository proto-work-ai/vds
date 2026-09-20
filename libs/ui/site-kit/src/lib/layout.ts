import { RouterLink } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { SiteButton } from './button.directive';
import { SiteBurger } from './controls.component';
import { SITE_CATALOG, SITE_NAV, SiteContacts } from './data';
import { closeHeight, openHeight } from './height';
import { SiteIcon } from './icon.component';
import { SiteLogo } from './logo.component';
import { SiteSocialLinks } from './social-links.component';

/**
 * Шапка сайта (partials/header.html): прозрачная над фото или тёмная (solid), меню с выпадающим каталогом,
 * на узком экране — телефон, бургер и выезжающая панель с подменю каталога.
 * fixed=false — для витрины: шапка в потоке страницы.
 */
@Component({
  selector: 'site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SiteBurger, SiteButton, SiteIcon, SiteLogo],
  host: {
    class: 'site-header block',
    '[class.is-solid]': 'solid() || menuOpen()',
    '[class.relative]': '!fixed()',
    '(window:keydown.escape)': 'menuOpen.set(false)',
  },
  templateUrl: './site-header.html',
})
export class SiteHeader {
  readonly solid = input(false);
  readonly fixed = input(true);
  /** Текущий раздел: '' — главная, 'catalog/', 'price/' … */
  readonly current = input('');
  readonly root = input('');
  readonly menuOpen = model(false);
  readonly subOpen = model(false);
  /** Выпадающий каталог открыт без наведения (для витрины) */
  readonly catalogOpen = input(false);

  protected readonly home = computed(() => this.root() || './');
  protected readonly catalogClosed = signal(false);

  protected closeMenu(): void {
    this.menuOpen.set(false);
    this.subOpen.set(false);
    this.closeCatalog();
  }

  protected closeCatalog(): void {
    this.catalogClosed.set(true);
  }

  protected openCatalog(): void {
    this.catalogClosed.set(false);
  }

  protected readonly catalog = SITE_CATALOG;
  protected readonly nav = SITE_NAV;
  readonly contacts = input.required<SiteContacts>();
  private readonly _panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private readonly _sub = viewChild.required<ElementRef<HTMLElement>>('sub');
  private _first = true;

  constructor() {
    effect(() => {
      const open = this.menuOpen();
      const sub = this.subOpen();
      const panel = this._panel().nativeElement;
      const subEl = this._sub().nativeElement;
      if (this._first) {
        subEl.style.height = sub ? 'auto' : '0px';
        panel.style.height = open ? 'auto' : '0px';
        this._first = false;
        return;
      }
      const subShown = subEl.style.height !== '0px';
      if (sub !== subShown) {
        if (sub) {
          openHeight(subEl);
          panel.style.height = 'auto';
        } else closeHeight(subEl);
      }
      const panelShown = panel.style.height !== '0px';
      if (open !== panelShown) {
        if (open) openHeight(panel);
        else closeHeight(panel);
      }
    });
  }
}

/** Подвал (partials/footer.html): логотип, соцсети, меню, каталог, контакты, правовые ссылки. */
@Component({
  selector: 'site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteLogo, SiteSocialLinks],
  host: { class: 'block bg-navy-deep text-white' },
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  readonly root = input('');
  protected readonly home = computed(() => this.root() || './');
  protected readonly catalog = SITE_CATALOG;
  readonly contacts = input.required<SiteContacts>();
}
