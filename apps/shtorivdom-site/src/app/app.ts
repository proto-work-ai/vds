import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SiteHeader, SiteToTop } from '@shtorivdom/site-kit';
import { filter } from 'rxjs';
import { SiteFooter } from './layout/site-footer';
import { GalleryDialog } from './components/gallery-dialog';
import { SITE_CONTACTS } from './site-contacts';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SiteHeader, SiteToTop, SiteFooter, GalleryDialog],
  host: { '(window:scroll)': 'onScroll()' },
})
export class App {
  protected readonly siteContacts = SITE_CONTACTS;
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  protected readonly current = signal('');
  protected readonly menuOpen = signal(false);
  private readonly scrolled = signal(false);
  protected readonly solid = computed(() => this.current() !== '' || this.scrolled());

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.onNavigated(event.urlAfterRedirects));
    afterNextRender(() => {
      this.onNavigated(this.router.url);
      this.onScroll();
    });
  }

  protected onScroll(): void {
    this.scrolled.set((this.document.defaultView?.scrollY ?? 0) > 60);
  }

  private onNavigated(url: string): void {
    const path = url.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
    this.current.set(path ? `${path}/` : '');
    this.menuOpen.set(false);
    if (path) this.document.body.setAttribute('data-header', 'solid');
    else this.document.body.removeAttribute('data-header');
  }
}
