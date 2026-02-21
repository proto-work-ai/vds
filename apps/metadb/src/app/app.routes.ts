import { Route } from '@angular/router';
import { studioRoute } from './modules/studio/studio.route';
import { homeRoute } from './modules/home/home.route';

export const appPages = {
  root: '',
  home: {
    root: 'home',
  },
  metadb: {
    root: 'metadb',
  },
} as const;

export const appRoutes: Route[] = [
  homeRoute(appPages.home.root),
  studioRoute(appPages.metadb.root),
  { path: '**', redirectTo: appPages.metadb.root },
];
