import { Route } from '@angular/router';

export function studioRoute(path: string): Route {
  return {
    path,
    loadComponent: () =>
      import('./studio-editor/studio-editor.component').then(
        (a) => a.StudioPageComponent,
      ),
    children: [],
  };
}
