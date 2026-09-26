import { DOCUMENT, inject, provideAppInitializer } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export const SITE_URL = 'https://shtorivdom.ru';

/** Метаданные страницы; кладутся в `data.seo` маршрута (src/app/site-pages.ts). */
export interface SeoData {
  title: string;
  description: string;
  /** Абсолютный адрес картинки для og:image */
  image: string;
  /** Разметка schema.org: хлебные крошки, FAQ, товар, организация */
  jsonLd: object[];
  noIndex?: boolean;
}

function deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  return route.firstChild ? deepest(route.firstChild) : route;
}

/**
 * После каждой навигации ставит title, description, canonical, Open Graph и JSON-LD страницы.
 * Навигация проходит и при пререндере, поэтому всё это попадает в готовый HTML.
 */
export function provideSeo() {
  return provideAppInitializer(() => {
    const router = inject(Router);
    const title = inject(Title);
    const meta = inject(Meta);
    const document = inject(DOCUMENT);

    router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const path = router.url.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
      const url = `${SITE_URL}/${path ? path + '/' : ''}`;

      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = url;
      meta.updateTag({ property: 'og:url', content: url });

      document.head.querySelectorAll('script[data-page-ld]').forEach((s) => s.remove());
      const seo = deepest(router.routerState.snapshot.root).data['seo'] as SeoData | undefined;
      if (!seo) return;

      if (seo.noIndex) meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
      else meta.removeTag("name='robots'");

      title.setTitle(seo.title);
      meta.updateTag({ name: 'description', content: seo.description });
      meta.updateTag({ property: 'og:title', content: seo.title });
      meta.updateTag({ property: 'og:description', content: seo.description });
      meta.updateTag({ property: 'og:image', content: seo.image });
      for (const data of seo.jsonLd) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page-ld', '');
        // «<» в тексте не должен закрыть тег script
        script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
        document.head.appendChild(script);
      }
    });
  });
}
