import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./catalog/catalog').then((module) => module.MockupCatalog),
  },
  {
    path: 'view/:id',
    loadComponent: () => import('./viewer/viewer').then((module) => module.MockupViewer),
  },
  {
    path: 'descriptions/:id',
    loadComponent: () =>
      import('./description/description').then((module) => module.MockupDescription),
  },
  { path: '**', redirectTo: '' },
];
