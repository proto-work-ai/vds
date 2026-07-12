import { Route } from '@angular/router';
import { stretchCeilingAll as stretchCeilingPages } from './model/stretch-ceiling';
import { servicePages } from './model/service-pages';

export const routePath = {
  root: '',
  materials: {
    root: 'ceiling-materials',
  },
  events: {
    root: 'ceiling-events',
  },
  privacyPolicy: {
    root: 'privacy-policy',
  },
  soglasie: {
    root: 'soglasie-na-obrabotku-personalnyh-dannyh',
  },
  calculator: {
    root: 'calculator',
  },
  catalog: {
    root: 'catalog',
  },
  price: {
    root: 'price',
  },
  services: {
    root: 'services',
  },
  orders: {
    root: 'orders',
    orderEdit: {
      root: 'order/edit',
    },
    orderDetail: {
      root: 'order/detail',
    },
  },
} as const;

const catalogDetailRoutes: Route[] = stretchCeilingPages.map((data) => {
  return {
    path: `${routePath.catalog.root}/${data.key}`,
    pathMatch: 'full',
    data,
    loadComponent: () =>
      import('./pages/stretch-ceilings/stretch-ceilings-catalog-detail-page/stretch-ceilings-catalog-detail-page').then(
        (a) => a.StretchCeilingsCatalogDetailPage
      ),
    children: [
      {
        path: ``,
        data,
        loadComponent: () => data.detail(),
      },
    ],
  };
});

const servicesRoutes: Route[] = servicePages.map((data) => {
  return {
    path: `${routePath.services.root}/${data.key}`,
    pathMatch: 'full',
    data,
    loadComponent: () =>
      import('./pages/services/services-detail-page/services-detail-page').then((a) => a.ServicesDetailPpage),
    children: [
      {
        path: ``,
        data,
        loadComponent: () => data.detail(),
      },
    ],
  };
});

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/main-page/main-page').then((a) => a.MainPage),
  },

  ...servicesRoutes,

  ...catalogDetailRoutes,

  {
    path: routePath.catalog.root,
    loadComponent: () =>
      import('./pages/stretch-ceilings/stretch-ceilings-catalog-all-page/stretch-ceilings-catalog-all-page').then(
        (a) => a.StretchCeilingsCatalogsPage
      ),
  },

  {
    path: routePath.soglasie.root,
    loadComponent: () =>
      import('./pages/soglasie-na-obrabotku-personalnyh-dannyh/soglasie-na-obrabotku-personalnyh-dannyh').then(
        (a) => a.PrivacyPolicyPage
      ),
  },

  {
    path: routePath.privacyPolicy.root,
    loadComponent: () => import('./pages/privacy-policy/privacy-policy-page').then((a) => a.PrivacyPolicyPage),
  },

  {
    path: routePath.calculator.root,
    loadComponent: () => import('./pages/calculator/calculator-page').then((a) => a.CalculatorPage),
  },

  {
    path: `${routePath.price.root}`,
    pathMatch: 'full',
    loadComponent: () => import('./pages/price-page/price-page').then((a) => a.PricePage),
  },

  {
    path: `${routePath.orders.root}`,
    loadComponent: () => import('./pages/order/orders-page/orders-page').then((a) => a.OrdersPage),
  },

  {
    path: routePath.materials.root,
    loadComponent: () => import('./pages/ceiling-materials/ceiling-materials-page').then((a) => a.CeilingMaterialsPage),
  },

  {
    path: routePath.events.root,
    loadComponent: () => import('./pages/events/events-page').then((a) => a.EventsPage),
  },

  // {
  //   path: `${routePath.services.root}`,
  //   pathMatch: 'full',
  //   loadComponent: () => import('./pages/services/services-page/services-page').then((a) => a.ServicesPage),
  // },

  // {
  //   path: `${routePath.orders.orderEdit.root}/:key`,
  //   loadComponent: () => import('./pages/order/order-edit-page/order-edit-page').then((a) => a.OrderEditPage),
  // },

  // {
  //   path: `${routePath.orders.orderDetail.root}`,
  //   loadComponent: () => import('./pages/order/order-detail-page/order-detail-page').then((a) => a.OrderDetailPage),
  // },

  {
    path: '**',
    redirectTo: '/',
  },
];
