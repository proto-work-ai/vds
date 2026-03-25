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
    path: appRoutePath.article.root,
    loadComponent: () => import('./modules/article-list/article-list.component').then((m) => m.ArticleListComponent),
  },
  {
    path: appRoutePath.annotation.root,
    loadComponent: () => import('./modules/annotation/text-annotation.component').then((m) => m.TextAnnotationComponent),
  },

  {
    path: `${appRoutePath.annotation.root}/:id`,
    loadComponent: () => import('./modules/annotation/text-annotation.component').then((m) => m.TextAnnotationComponent),
  },

  // {
  //   path: 'dbl-click',
  //   loadComponent: () => import('./modules/editor/demo/dbl-click/dbl-click.component').then((m) => m.DemoDblClickComponent),
  // },
  // {
  //   path: 'editor',
  //   loadComponent: () => import('./modules/editor/demo/demo-editor/demo-editor.component').then((m) => m.DemoEditorComponent),
  // },
  {
    path: '**',
    redirectTo: '/',
  },
];
