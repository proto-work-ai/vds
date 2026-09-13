import { DOCUMENT, inject, provideAppInitializer } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export const SITE_URL = 'https://shtorivdom.ru';

// Заголовок и описание страницы; кладутся в `data.seo` маршрута.
export interface SeoData {
  title: string;
  description: string;
}

function deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  return route.firstChild ? deepest(route.firstChild) : route;
}

/**
 * После каждой навигации ставит canonical и og:url, а для маршрутов с
 * `data.seo` — ещё title и description. Страницы каталога и юридические
 * задают title сами в конструкторе, у их маршрутов `seo` нет, и сервис их не
 * перезаписывает.
 */
export function provideSeo() {
  return provideAppInitializer(() => {
    const router = inject(Router);
    const title = inject(Title);
    const meta = inject(Meta);
    const document = inject(DOCUMENT);

    router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const path = router.url.split(/[?#]/)[0].replace(/\/+$/, '');
      const url = `${SITE_URL}${path}/`.replace(/\/\/$/, '/');

      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = url;
      meta.updateTag({ property: 'og:url', content: url });

      const seo = deepest(router.routerState.snapshot.root).data['seo'] as SeoData | undefined;
      if (seo) {
        title.setTitle(seo.title);
        meta.updateTag({ name: 'description', content: seo.description });
        meta.updateTag({ property: 'og:title', content: seo.title });
        meta.updateTag({ property: 'og:description', content: seo.description });
      }
    });
  });
}
