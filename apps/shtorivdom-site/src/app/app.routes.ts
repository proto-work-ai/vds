import { Route } from '@angular/router';
import { sitePages } from './site-pages';

export const appRoutes: Route[] = [
  ...sitePages,
  {
    path: 'site-map',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карта сайта — Shtorivdom',
        description: 'Основные страницы и разделы каталога Shtorivdom.',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [],
      },
    },
    loadComponent: () => import('./pages/site-map/page').then((m) => m.SiteMapPage),
  },
  {
    path: '404',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Страница не найдена — Shtorivdom',
        description:
          'К сожалению, такой страницы не существует или она удалена. Перейдите на главную страницу Shtorivdom.',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [],
        noIndex: true,
      },
    },
    loadComponent: () => import('./pages/not-found/page').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
