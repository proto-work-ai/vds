import { Route } from '@angular/router';
import { studioRoute } from './modules/studio/studio.route';
import { homeRoute } from './modules/home/home.route';
import { NavSidebarHeader } from './modules/nav/sidebar-header/sidebar-header.component';
import { SidebarWithNavigation } from './modules/nav/sidebar-with-navigation/sidebar-with-navigation.component';

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
  {
    path: '',
    component: NavSidebarHeader,
    // component: SidebarWithNavigation,
    children: [
      homeRoute(appPages.home.root),
      studioRoute(appPages.studio.root),
      { path: '**', redirectTo: appPages.studio.root },
    ],
  },
];
