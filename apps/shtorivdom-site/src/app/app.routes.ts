import { Route } from '@angular/router';
import { sitePages } from './site-pages';

export const appRoutes: Route[] = [
  ...sitePages,
  {
    path: '**',
    redirectTo: '',
  },
];
