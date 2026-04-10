import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/main-page/main-page.component').then((a) => a.MainPageComponent),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
