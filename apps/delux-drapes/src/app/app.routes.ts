import { Route } from '@angular/router';
import { servicePages } from './model/service-pages';
import { catalogPagesAll } from './model/catalog.data';

export const routePath = {
  root: '',
  catalog: {
    root: 'catalog',
  },
  contact: {
    root: 'contact',
  },
  about: {
    root: 'about',
  },
  partner: {
    root: 'partner',
  },
  price: {
    root: 'price',
  },
  services: {
    root: 'services',
  },
} as const;

const catalogRoutes: Route[] = catalogPagesAll.map((data) => {
  return {
    path: `${routePath.catalog.root}/${data.key}`,
    pathMatch: 'full',
    data,
    loadComponent: () =>
      import(
        './pages/catalog/catalog-detail-page/catalog-detail-page'
      ).then((a) => a.CatalogDetailPage),

    children: [
      {
        path: ``,
        data,
        loadComponent: () => data.detail()!,
      },
    ],
  };
});

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/main-page/main-page').then((a) => a.MainPage),
  },
  {
    path: routePath.contact.root,
    loadComponent: () => import('./pages/contact/contact-page/contact-page').then((a) => a.СontactPage),
  },
  {
    path: routePath.about.root,
    loadComponent: () => import('./pages/about/about-page/about-page').then((a) => a.AboutPage),
  },
  {
    path: routePath.partner.root,
    loadComponent: () => import('./pages/partner/partner-page/partner-page').then((a) => a.PartnerPage),
  },
  {
    path: routePath.catalog.root,
    loadComponent: () =>
      import(
        './pages/catalog/catalog-page/catalog-all-page'
      ).then((a) => a.CatalogsPage),
  },

  ...catalogRoutes,

  {
    path: `${routePath.price.root}`,
    pathMatch: 'full',
    loadComponent: () => import('./pages/price-page/price-page').then((a) => a.PricePage),
  },


  {
    path: '**',
    redirectTo: '/',
  },
];
