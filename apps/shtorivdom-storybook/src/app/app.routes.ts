import { Route } from '@angular/router';

export const appRoutePath = {
  article: {
    root: '',
  },
  annotation: {
    root: 'annotation',
  },
} as const;

export const appRoutes: Route[] = [
  {
    path: 'dbl-click',
    loadComponent: () => import('./modules/editor/demo/dbl-click/dbl-click.component').then((m) => m.DemoDblClickComponent),
  },
  {
    path: 'editor',
    loadComponent: () => import('./modules/editor/demo/demo-editor/demo-editor.component').then((m) => m.DemoEditorComponent),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
