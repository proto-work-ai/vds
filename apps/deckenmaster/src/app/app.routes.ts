import { Route } from '@angular/router';

export const routePath = {
  root: '',
  catalog: {
    root: 'catalog',
  },
};

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
  {
    path: `${routePath.catalog.root}/:key`,
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './pages/stretch-ceilings-catalog/stretch-ceilings-catalog-detail-page/stretch-ceilings-catalog-detail-page'
      ).then((a) => a.StretchCeilingsCatalogDetailPage),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
