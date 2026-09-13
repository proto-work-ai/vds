import { Route } from '@angular/router';
import { catalogPagesAll } from './model/catalog/catalog.data';
import { SeoData } from './seo';

export const routePath = {
  root: '',
  privacyPolicy: {
    root: 'privacy-policy',
  },
  soglasie: {
    root: 'soglasie-na-obrabotku-personalnyh-dannyh',
  },
  catalog: {
    root: 'catalog',
  },
  contact: {
    root: 'contact',
  },
  about: {
    root: 'about',
  },
  partner: {
    root: 'partner',
  },
  price: {
    root: 'price',
  },
  services: {
    root: 'services',
  },
} as const;

const catalogRoutes: Route[] = catalogPagesAll.map((data) => {
  return {
    path: `${routePath.catalog.root}/${data.key}`,
    pathMatch: 'full',
    data,
    loadComponent: () =>
      import('./pages/catalog/catalog-detail-page/catalog-detail-page').then((a) => a.CatalogDetailPage),

    children: [
      {
        path: ``,
        data,
        loadComponent: () => data.detail()!,
      },
    ],
  };
});

export const appRoutes: Route[] = [
  {
    path: '',
    data: {
      seo: {
        title: 'Шторы на заказ в Москве — пошив и дизайн штор | Shtorivdom',
        description:
          'Пошив штор на заказ в Москве и Подмосковье: римские, рулонные, льняные шторы, блэкаут, плиссе, жалюзи и карнизы. Бесплатный выезд дизайнера с образцами тканей.',
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/main-page/main-page').then((a) => a.MainPage),
  },

  {
    path: routePath.privacyPolicy.root,
    loadComponent: () => import('./pages/privacy-policy/privacy-policy-page').then((a) => a.PrivacyPolicyPage),
  },

  {
    path: routePath.soglasie.root,
    loadComponent: () =>
      import('./pages/soglasie-na-obrabotku-personalnyh-dannyh/soglasie-na-obrabotku-personalnyh-dannyh').then(
        (a) => a.PrivacyPolicyPage
      ),
  },

  {
    path: routePath.contact.root,
    data: {
      seo: {
        title: 'Контакты салона штор Shtorivdom — адрес, телефон',
        description:
          'Салон штор Shtorivdom: Троицк, Кварцевая улица, 3, корп. 2. Работаем без выходных с 10:00 до 20:00. Телефон +7 (925) 594-61-17.',
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/contact/contact-page/contact-page').then((a) => a.ContactPage),
  },
  {
    path: routePath.about.root,
    data: {
      seo: {
        title: 'О салоне штор Shtorivdom — более 15 лет пошива штор',
        description:
          'Дизайн-студия Shtorivdom: собственный швейный цех, 3000+ тканей и карнизов, более 10 000 реализованных проектов штор в Москве и области.',
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/about/about-page/about-page').then((a) => a.AboutPage),
  },
  {
    path: routePath.partner.root,
    data: {
      seo: {
        title: 'Сотрудничество с салоном штор Shtorivdom',
        description:
          'Приглашаем к сотрудничеству дизайнеров интерьера, архитекторов и строительные компании. Выгодные условия для партнёров.',
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/partner/partner-page/partner-page').then((a) => a.PartnerPage),
  },

  ...catalogRoutes,

  {
    path: '**',
    redirectTo: '/',
  },
];
