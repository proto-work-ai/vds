import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SiteHeader, SiteToTop } from '@shtorivdom/site-kit';
import { filter } from 'rxjs';
import { initPage, installGlobal } from './behavior/site-behavior';
import { SiteFooter } from './layout/site-footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SiteHeader, SiteToTop, SiteFooter],
  host: { '(document:click)': 'onClick($event)' },
})
export class App {
  private readonly _router = inject(Router);
  private readonly _document = inject(DOCUMENT);
  private readonly _browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _appRef = inject(ApplicationRef);
  private _pageAbort?: AbortController;

  /** Текущий раздел для меню: '' — главная, 'catalog/…/' и т. д. */
  protected readonly current = signal('');
  protected readonly menuOpen = signal(false);
  private readonly _scrolled = signal(false);
  /** Шапка прозрачная только над первым экраном главной */
  protected readonly solid = computed(() => this.current() !== '' || this._scrolled());

  constructor() {
    const destroyRef = inject(DestroyRef);
    this._router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => this.onNavigated(e.urlAfterRedirects));

    if (!this._browser) return;
    const win = this._document.defaultView as Window;
    const onScroll = () => this._scrolled.set(win.scrollY > 60);
    onScroll();
    win.addEventListener('scroll', onScroll, { passive: true });
    installGlobal(this._document);
    destroyRef.onDestroy(() => {
      win.removeEventListener('scroll', onScroll);
      this._pageAbort?.abort();
    });
  }

  private onNavigated(url: string): void {
    const path = url.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
    const current = path ? `${path}/` : '';
    this.current.set(current);
    this.menuOpen.set(false);
    // body[data-header="solid"] — шапка без перехода цвета на внутренних страницах (theme.css)
    const body = this._document.body;
    if (current) body.setAttribute('data-header', 'solid');
    else body.removeAttribute('data-header');

    if (!this._browser) return;
    this._pageAbort?.abort();
    const abort = new AbortController();
    this._pageAbort = abort;
    // Интерактив навешивается после отрисовки и гидрации страницы
    this._appRef.whenStable().then(() => {
      const main = this._document.querySelector<HTMLElement>('router-outlet + *');
      if (!abort.signal.aborted && main) initPage(main, current, abort.signal);
    });
  }

  /** Внутренние ссылки шаблонов (обычные href) — переходом роутера, «#якорь» — прокруткой на текущей странице. */
  protected onClick(event: MouseEvent): void {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const a = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const href = a.getAttribute('href') ?? '';
    if (href.startsWith('#')) {
      event.preventDefault();
      this._document.getElementById(href.slice(1))?.scrollIntoView();
      return;
    }
    const url = new URL(a.href);
    const win = this._document.defaultView;
    if (!win || url.origin !== win.location.origin || /\.[a-z0-9]+$/i.test(url.pathname)) return;
    event.preventDefault();
    // Роутер не сопоставляет «/price/» со слешем в конце с маршрутом «price» — слеш добавит TrailingSlashPathLocationStrategy
    this._router.navigateByUrl(url.pathname.replace(/(.)\/$/, '$1') + url.search + url.hash);
  }
}
