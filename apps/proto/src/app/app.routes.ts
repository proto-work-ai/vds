import { Route } from '@angular/router';
import { homeRoute } from './modules/home/home.route';
import { NavSidebarHeader } from './modules/nav/sidebar-header/sidebar-header.component';
import { metadbRoute } from './modules/metadb/metadb.route';
import { SidebarWithNavigation } from './modules/nav/sidebar-with-navigation/sidebar-with-navigation.component';

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
  {
    path: '',
    component: NavSidebarHeader,
    // component: SidebarWithNavigation,
    children: [
      homeRoute(appPages.home.root),
      metadbRoute(appPages.metadb.root),
      { path: '**', redirectTo: appPages.metadb.root },
    ],
  },
];
