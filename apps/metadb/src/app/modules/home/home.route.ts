import { Route } from '@angular/router';

export function homeRoute(path: string): Route {
  return {
    path,
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (a) => a.HomePageComponent,
      ),
  };
}
