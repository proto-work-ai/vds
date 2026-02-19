import { Route } from '@angular/router';
import { studioRoute } from './modules/studio/studio.route';
import { homeRoute } from './modules/home/home.route';

export const appPages = {
  root: '',
  home: {
    root: 'home',
  },
  studio: {
    root: 'studio',
  },
};

export const appRoutes: Route[] = [
  homeRoute(appPages.home.root),
  studioRoute(appPages.studio.root),
  { path: '**', redirectTo: appPages.studio.root },
];
