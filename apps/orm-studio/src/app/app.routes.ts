import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((a) => a.MainComponent),
  },
];
