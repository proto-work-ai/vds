import { Route } from '@angular/router';

export function studioRoute(path: string): Route {
  return {
    path,
    loadComponent: () =>
      import('./studio-page/studio-page.component').then(
        (a) => a.StudioPageComponent,
      ),
    children: [],
  };
}
