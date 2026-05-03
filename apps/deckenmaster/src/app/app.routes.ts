import { Route } from '@angular/router';
import { stretchCeilingAll } from './model/products.data';

export const routePath = {
  root: '',
  catalog: {
    root: 'catalog',
  },
  price: {
    root: 'price',
  },
  services: {
    root: 'services',
  },
};

const stretchCeilingRoutes: Route[] = stretchCeilingAll.map((data) => {
  return {
    path: `${routePath.catalog.root}/${data.key}`,
    pathMatch: 'full',
    data,
    loadComponent: () =>
      import(
        './pages/stretch-ceilings-catalog/stretch-ceilings-catalog-detail-page/stretch-ceilings-catalog-detail-page'
      ).then((a) => a.StretchCeilingsCatalogDetailPage),

    children: [
      {
        path: ``,
        data,
        loadComponent: () => data.detail(),
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
    path: routePath.catalog.root,
    loadComponent: () =>
      import(
        './pages/stretch-ceilings-catalog/stretch-ceilings-catalog-all-page/stretch-ceilings-catalog-all-page'
      ).then((a) => a.StretchCeilingsCatalogsPage),
  },

  ...stretchCeilingRoutes,

  // {
  //   path: `${routePath.catalog.root}/:key`,
  //   pathMatch: 'full',
  //   loadComponent: () =>
  //     import(
  //       './pages/stretch-ceilings-catalog/stretch-ceilings-catalog-detail-page/stretch-ceilings-catalog-detail-page'
  //     ).then((a) => a.StretchCeilingsCatalogDetailPage),
  // },
  {
    path: `${routePath.price.root}`,
    pathMatch: 'full',
    loadComponent: () => import('./pages/price-page/price-page').then((a) => a.PricePage),
  },
  {
    path: `${routePath.services.root}`,
    pathMatch: 'full',
    loadComponent: () => import('./pages/price-page/price-page').then((a) => a.PricePage),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
