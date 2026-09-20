import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, model, signal, viewChild } from '@angular/core';
import { SiteButton } from './button.directive';
import { SiteBurger } from './controls.component';
import { SITE_CATALOG, SITE_CONTACTS, SITE_NAV } from './data';
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
  imports: [SiteBurger, SiteButton, SiteIcon, SiteLogo],
  host: { class: 'site-header block','[class.is-solid]': 'solid() || menuOpen()', '[class.relative]': '!fixed()', '(window:keydown.escape)': 'menuOpen.set(false)' },
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
  protected readonly contacts = SITE_CONTACTS;
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
  template: `
    <div class="wrap py-14 sm:py-16">
      <div class="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <a class="block w-[170px]" aria-label="Shtorivdom — на главную" [href]="home()"><site-logo variant="vertical" color="gold" /></a>
          <p
            class="mt-5 mb-6 max-w-[280px] text-[14px] leading-[1.75] font-light text-white/50">Дизайн-студия по пошиву штор и текстиля в
              Москве и Подмосковье</p>
          <site-social-links variant="footer" />
        </div>
        <div>
          <h4 class="mb-5 text-[12px] font-normal tracking-[.32em] text-gold uppercase">Меню</h4>
          <div class="flex flex-col text-[14px] font-light text-white/60 [&>a]:py-1.5 [&>a]:transition-colors [&>a:hover]:text-gold">
            <a [href]="home()">Главная</a><a [href]="root() + 'price/'">Цены</a><a [href]="root() + 'services/'">Услуги</a><a
              [href]="root() + 'about/'">О нас</a><a [href]="root() + 'partner/'">Стать партнером</a><a
              [href]="root() + 'contact/'">Контакты</a>
          </div>
        </div>
        <div>
          <h4 class="mb-5 text-[12px] font-normal tracking-[.32em] text-gold uppercase">Каталог</h4>
          <div class="flex flex-col text-[14px] font-light text-white/60 [&>a]:py-1.5 [&>a]:transition-colors [&>a:hover]:text-gold">
            @for (c of catalog; track c.key) {<a [href]="root() + 'catalog/' + c.key + '/'">{{ c.title }}</a>}
          </div>
        </div>
        <div>
          <h4 class="mb-5 text-[12px] font-normal tracking-[.32em] text-gold uppercase">Контакты</h4>
          <div class="flex flex-col gap-3 text-[14px] font-light text-white/60">
            <a class="text-[18px] font-bold text-white transition-colors hover:text-gold"
              [href]="'tel:' + contacts.tel">{{ contacts.phone }}</a>
            <a class="transition-colors hover:text-gold" [href]="'mailto:' + contacts.email">{{ contacts.email }}</a>
            <p>{{ contacts.address }}</p>
            <p>{{ contacts.hours }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start justify-between gap-3 border-t border-gold/10 pt-8 text-[12px] font-light text-white/40
        md:flex-row md:items-center">
        <span>© 2020–2026. ООО «Shtorivdom»</span>
        <span class="flex flex-wrap gap-x-6 gap-y-2"><a class="hover:text-gold"
          [href]="root() + 'privacy-policy/'">Политика конфиденциальности</a><a class="hover:text-gold"
          [href]="root() + 'soglasie-na-obrabotku-personalnyh-dannyh/'">Согласие на обработку персональных данных</a></span>
      </div>
    </div>
  `,
})
export class SiteFooter {
  readonly root = input('');
  protected readonly home = computed(() => this.root() || './');
  protected readonly catalog = SITE_CATALOG;
  protected readonly contacts = SITE_CONTACTS;
}
