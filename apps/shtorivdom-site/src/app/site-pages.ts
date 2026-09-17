// Сгенерировано tools/mockups/site-to-angular.mjs — руками не править.
import { Route } from '@angular/router';
import { SeoData } from './seo';

export const sitePages: Route[] = [
  {
    path: 'about',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'О салоне штор Shtorivdom — более 15 лет пошива штор',
        description:
          'Дизайн-студия Shtorivdom: собственный швейный цех, 3000+ тканей и карнизов, более 10 000 реализованных проектов штор в Москве и области.',
        image: 'https://shtorivdom.ru/assets/img/about/image-13.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'О нас',
                item: 'https://shtorivdom.ru/about/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/about/page').then((m) => m.AboutPage),
  },
  {
    path: 'calc',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Калькулятор штор на заказ — расчёт ткани и стоимости | Shtorivdom',
        description:
          'Рассчитайте шторы на заказ: сколько ткани нужно под ваш карниз и окно и сколько это стоит по ценам каталога. Точный расчёт — после бесплатного замера.',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Калькулятор штор',
                item: 'https://shtorivdom.ru/calc/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/calc/page').then((m) => m.CalcPage),
  },
  {
    path: 'catalog/blackout-curtains',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Шторы блэкаут на заказ в Москве | Shtorivdom',
        description:
          'Шторы блэкаут на заказ: Это идеальное решение для тех, кто ценит тишину и комфорт в своем доме. Бесплатный выезд дизайнера с образцами.',
        image: 'https://shtorivdom.ru/assets/img/catalog/blackout-curtains/image-5.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Шторы блэкаут',
                item: 'https://shtorivdom.ru/catalog/blackout-curtains/',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Сколько стоит пошив штор на заказ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.',
                },
              },
              {
                '@type': 'Question',
                name: 'Где можно посмотреть Ваши работы?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.',
                },
              },
              {
                '@type': 'Question',
                name: 'Есть ли гарантия на изделия?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.',
                },
              },
              {
                '@type': 'Question',
                name: 'Какие сроки по пошиву?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.',
                },
              },
              {
                '@type': 'Question',
                name: 'Сколько стоит выезд дизайнера?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.',
                },
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Шторы блэкаут',
            description:
              'Шторы блэкаут на заказ: Это идеальное решение для тех, кто ценит тишину и комфорт в своем доме. Бесплатный выезд дизайнера с образцами.',
            image: 'https://shtorivdom.ru/assets/img/catalog/blackout-curtains/image-5.jpg',
            brand: { '@type': 'Brand', name: 'Shtorivdom' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'RUB',
              lowPrice: 2500,
              highPrice: 7000,
              offerCount: 3,
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-blackout-curtains/page').then((m) => m.CatalogBlackoutCurtainsPage),
  },
  {
    path: 'catalog/blinds',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Жалюзи на заказ в Москве | Shtorivdom',
        description:
          'Жалюзи на заказ: Стильные, практичные. Бесплатный выезд дизайнера с образцами.',
        image: 'https://shtorivdom.ru/assets/img/catalog/blinds/image-1.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Жалюзи',
                item: 'https://shtorivdom.ru/catalog/blinds/',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Сколько стоит пошив штор на заказ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.',
                },
              },
              {
                '@type': 'Question',
                name: 'Где можно посмотреть Ваши работы?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.',
                },
              },
              {
                '@type': 'Question',
                name: 'Есть ли гарантия на изделия?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.',
                },
              },
              {
                '@type': 'Question',
                name: 'Какие сроки по пошиву?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.',
                },
              },
              {
                '@type': 'Question',
                name: 'Сколько стоит выезд дизайнера?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.',
                },
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Жалюзи',
            description:
              'Жалюзи на заказ: Стильные, практичные. Бесплатный выезд дизайнера с образцами.',
            image: 'https://shtorivdom.ru/assets/img/catalog/blinds/image-1.jpg',
            brand: { '@type': 'Brand', name: 'Shtorivdom' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'RUB',
              lowPrice: 1500,
              highPrice: 6500,
              offerCount: 3,
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/catalog-blinds/page').then((m) => m.CatalogBlindsPage),
  },
  {
    path: 'catalog/curtain-rods/1',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карниз 0-25025-22 | Shtorivdom',
        description:
          'Карниз 0-25025-22 — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/models/model-1.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Карниз 0-25025-22',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/1/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods-1/page').then((m) => m.CatalogCurtainRods1Page),
  },
  {
    path: 'catalog/curtain-rods/2',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карниз CASTLE messing matt | Shtorivdom',
        description:
          'Карниз CASTLE messing matt — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/models/model-2.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Карниз CASTLE messing matt',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/2/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods-2/page').then((m) => m.CatalogCurtainRods2Page),
  },
  {
    path: 'catalog/curtain-rods/3',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карниз AIDA anthrazit-nickel matt | Shtorivdom',
        description:
          'Карниз AIDA anthrazit-nickel matt — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/models/model-3.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Карниз AIDA anthrazit-nickel matt',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/3/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods-3/page').then((m) => m.CatalogCurtainRods3Page),
  },
  {
    path: 'catalog/curtain-rods/4',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карниз AIDA anthrazit-messing matt | Shtorivdom',
        description:
          'Карниз AIDA anthrazit-messing matt — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/models/model-4.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Карниз AIDA anthrazit-messing matt',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/4/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods-4/page').then((m) => m.CatalogCurtainRods4Page),
  },
  {
    path: 'catalog/curtain-rods/5',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карниз PLENUM венге | Shtorivdom',
        description:
          'Карниз PLENUM венге — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/models/model-5.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Карниз PLENUM венге',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/5/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods-5/page').then((m) => m.CatalogCurtainRods5Page),
  },
  {
    path: 'catalog/curtain-rods/6',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карниз DAVOS белый | Shtorivdom',
        description:
          'Карниз DAVOS белый — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/models/model-6.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Карниз DAVOS белый',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/6/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods-6/page').then((m) => m.CatalogCurtainRods6Page),
  },
  {
    path: 'catalog/curtain-rods/7',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карниз CAPRI орех | Shtorivdom',
        description:
          'Карниз CAPRI орех — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/models/model-7.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Карниз CAPRI орех',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/7/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods-7/page').then((m) => m.CatalogCurtainRods7Page),
  },
  {
    path: 'catalog/curtain-rods/8',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карниз CANNES бук | Shtorivdom',
        description:
          'Карниз CANNES бук — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/models/model-8.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Карниз CANNES бук',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/8/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods-8/page').then((m) => m.CatalogCurtainRods8Page),
  },
  {
    path: 'catalog/curtain-rods/9',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карниз JAZZ nickel matt | Shtorivdom',
        description:
          'Карниз JAZZ nickel matt — карнизы для штор с установкой в Москве и области. Бесплатный выезд дизайнера.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/models/model-9.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Карниз JAZZ nickel matt',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/9/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods-9/page').then((m) => m.CatalogCurtainRods9Page),
  },
  {
    path: 'catalog/curtain-rods',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карнизы для штор на заказ в Москве | Shtorivdom',
        description:
          'Карнизы для штор на заказ: Декоративные и профильные. Бесплатный выезд дизайнера с образцами.',
        image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/image-4.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Карнизы для штор',
                item: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Сколько стоит пошив штор на заказ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.',
                },
              },
              {
                '@type': 'Question',
                name: 'Где можно посмотреть Ваши работы?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.',
                },
              },
              {
                '@type': 'Question',
                name: 'Есть ли гарантия на изделия?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.',
                },
              },
              {
                '@type': 'Question',
                name: 'Какие сроки по пошиву?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.',
                },
              },
              {
                '@type': 'Question',
                name: 'Сколько стоит выезд дизайнера?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.',
                },
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Карнизы для штор',
            description:
              'Карнизы для штор на заказ: Декоративные и профильные. Бесплатный выезд дизайнера с образцами.',
            image: 'https://shtorivdom.ru/assets/img/catalog/curtain-rods/image-4.jpg',
            brand: { '@type': 'Brand', name: 'Shtorivdom' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'RUB',
              lowPrice: 900,
              highPrice: 18000,
              offerCount: 3,
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-curtain-rods/page').then((m) => m.CatalogCurtainRodsPage),
  },
  {
    path: 'catalog',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Каталог штор на заказ: шторы, жалюзи и карнизы | Shtorivdom',
        description:
          'Каталог Shtorivdom: шторы блэкаут, римские, рулонные, льняные шторы, плиссе, жалюзи и карнизы. Вся продукция изготавливается по индивидуальным размерам.',
        image: 'https://shtorivdom.ru/assets/img/catalog/blackout-curtains/image-5.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог Штор',
                item: 'https://shtorivdom.ru/catalog/',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                url: 'https://shtorivdom.ru/catalog/blackout-curtains/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                url: 'https://shtorivdom.ru/catalog/roman-blinds/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                url: 'https://shtorivdom.ru/catalog/roller-blinds/',
              },
              {
                '@type': 'ListItem',
                position: 4,
                url: 'https://shtorivdom.ru/catalog/linen-curtains/',
              },
              {
                '@type': 'ListItem',
                position: 5,
                url: 'https://shtorivdom.ru/catalog/pleated-blinds/',
              },
              {
                '@type': 'ListItem',
                position: 6,
                url: 'https://shtorivdom.ru/catalog/curtain-rods/',
              },
              {
                '@type': 'ListItem',
                position: 7,
                url: 'https://shtorivdom.ru/catalog/blinds/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/catalog/page').then((m) => m.CatalogPage),
  },
  {
    path: 'catalog/linen-curtains',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Льняные шторы на заказ в Москве | Shtorivdom',
        description:
          'Льняные шторы на заказ: Для стандартных, мансардных и треугольных окон. Бесплатный выезд дизайнера с образцами.',
        image: 'https://shtorivdom.ru/assets/img/catalog/linen-curtains/image-3.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Льняные шторы',
                item: 'https://shtorivdom.ru/catalog/linen-curtains/',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Сколько стоит пошив штор на заказ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.',
                },
              },
              {
                '@type': 'Question',
                name: 'Где можно посмотреть Ваши работы?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.',
                },
              },
              {
                '@type': 'Question',
                name: 'Есть ли гарантия на изделия?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.',
                },
              },
              {
                '@type': 'Question',
                name: 'Какие сроки по пошиву?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.',
                },
              },
              {
                '@type': 'Question',
                name: 'Сколько стоит выезд дизайнера?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.',
                },
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Льняные шторы',
            description:
              'Льняные шторы на заказ: Для стандартных, мансардных и треугольных окон. Бесплатный выезд дизайнера с образцами.',
            image: 'https://shtorivdom.ru/assets/img/catalog/linen-curtains/image-3.jpg',
            brand: { '@type': 'Brand', name: 'Shtorivdom' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'RUB',
              lowPrice: 2800,
              highPrice: 9500,
              offerCount: 3,
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-linen-curtains/page').then((m) => m.CatalogLinenCurtainsPage),
  },
  {
    path: 'catalog/pleated-blinds',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Шторы плиссе на заказ в Москве | Shtorivdom',
        description:
          'Шторы плиссе на заказ: Для стандартных, мансардных и треугольных окон. Бесплатный выезд дизайнера с образцами.',
        image: 'https://shtorivdom.ru/assets/img/catalog/pleated-blinds/image-1.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Шторы плиссе',
                item: 'https://shtorivdom.ru/catalog/pleated-blinds/',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Сколько стоит пошив штор на заказ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.',
                },
              },
              {
                '@type': 'Question',
                name: 'Где можно посмотреть Ваши работы?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.',
                },
              },
              {
                '@type': 'Question',
                name: 'Есть ли гарантия на изделия?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.',
                },
              },
              {
                '@type': 'Question',
                name: 'Какие сроки по пошиву?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.',
                },
              },
              {
                '@type': 'Question',
                name: 'Сколько стоит выезд дизайнера?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.',
                },
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Шторы плиссе',
            description:
              'Шторы плиссе на заказ: Для стандартных, мансардных и треугольных окон. Бесплатный выезд дизайнера с образцами.',
            image: 'https://shtorivdom.ru/assets/img/catalog/pleated-blinds/image-1.jpg',
            brand: { '@type': 'Brand', name: 'Shtorivdom' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'RUB',
              lowPrice: 3500,
              highPrice: 7500,
              offerCount: 3,
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-pleated-blinds/page').then((m) => m.CatalogPleatedBlindsPage),
  },
  {
    path: 'catalog/roller-blinds',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Рулонные шторы на заказ в Москве | Shtorivdom',
        description:
          'Рулонные шторы на заказ: Крепление на проем, в проем или раму окна. Бесплатный выезд дизайнера с образцами.',
        image: 'https://shtorivdom.ru/assets/img/catalog/roller-blinds/image-2.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Рулонные шторы',
                item: 'https://shtorivdom.ru/catalog/roller-blinds/',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Сколько стоит пошив штор на заказ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.',
                },
              },
              {
                '@type': 'Question',
                name: 'Где можно посмотреть Ваши работы?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.',
                },
              },
              {
                '@type': 'Question',
                name: 'Есть ли гарантия на изделия?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.',
                },
              },
              {
                '@type': 'Question',
                name: 'Какие сроки по пошиву?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.',
                },
              },
              {
                '@type': 'Question',
                name: 'Сколько стоит выезд дизайнера?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.',
                },
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Рулонные шторы',
            description:
              'Рулонные шторы на заказ: Крепление на проем, в проем или раму окна. Бесплатный выезд дизайнера с образцами.',
            image: 'https://shtorivdom.ru/assets/img/catalog/roller-blinds/image-2.jpg',
            brand: { '@type': 'Brand', name: 'Shtorivdom' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'RUB',
              lowPrice: 2200,
              highPrice: 4200,
              offerCount: 3,
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-roller-blinds/page').then((m) => m.CatalogRollerBlindsPage),
  },
  {
    path: 'catalog/roman-blinds',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Римские шторы на заказ в Москве | Shtorivdom',
        description:
          'Римские шторы на заказ: Из плотных и легких тканей для прямых и скошенных окон. Бесплатный выезд дизайнера с образцами.',
        image: 'https://shtorivdom.ru/assets/img/catalog/roman-blinds/image-1.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: 'https://shtorivdom.ru/catalog/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Римские шторы',
                item: 'https://shtorivdom.ru/catalog/roman-blinds/',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Сколько стоит пошив штор на заказ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.',
                },
              },
              {
                '@type': 'Question',
                name: 'Где можно посмотреть Ваши работы?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.',
                },
              },
              {
                '@type': 'Question',
                name: 'Есть ли гарантия на изделия?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.',
                },
              },
              {
                '@type': 'Question',
                name: 'Какие сроки по пошиву?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.',
                },
              },
              {
                '@type': 'Question',
                name: 'Сколько стоит выезд дизайнера?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.',
                },
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Римские шторы',
            description:
              'Римские шторы на заказ: Из плотных и легких тканей для прямых и скошенных окон. Бесплатный выезд дизайнера с образцами.',
            image: 'https://shtorivdom.ru/assets/img/catalog/roman-blinds/image-1.jpg',
            brand: { '@type': 'Brand', name: 'Shtorivdom' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'RUB',
              lowPrice: 4500,
              highPrice: 12000,
              offerCount: 3,
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/catalog-roman-blinds/page').then((m) => m.CatalogRomanBlindsPage),
  },
  {
    path: 'contact',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Контакты салона штор Shtorivdom — адрес, телефон',
        description:
          'Салон штор Shtorivdom: Троицк, Кварцевая улица, 3, корп. 2. Работаем без выходных с 10:00 до 20:00. Телефон +7 (915) 359-12-00.',
        image: 'https://shtorivdom.ru/assets/img/telegram.svg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'HomeGoodsStore',
            name: 'Shtorivdom',
            description:
              'Салон штор: пошив штор на заказ, жалюзи, карнизы. Бесплатный выезд дизайнера.',
            url: 'https://shtorivdom.ru/',
            logo: 'https://shtorivdom.ru/assets/favicon/favicon-96x96.png',
            image: 'https://shtorivdom.ru/assets/img/hero.jpg',
            telephone: '+79153591200',
            email: 'info@shtorivdom.ru',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Кварцевая улица, 3, корп. 2',
              addressLocality: 'Троицк, Москва',
              addressCountry: 'RU',
            },
            areaServed: ['Москва', 'Московская область'],
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '10:00',
              closes: '20:00',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Контакты',
                item: 'https://shtorivdom.ru/contact/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/contact/page').then((m) => m.ContactPage),
  },
  {
    path: '',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Шторы на заказ в Москве — пошив и дизайн штор | Shtorivdom',
        description:
          'Пошив штор на заказ в Москве и Подмосковье: римские, рулонные, льняные шторы, блэкаут, плиссе, жалюзи и карнизы. Бесплатный выезд дизайнера с образцами тканей.',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'HomeGoodsStore',
            name: 'Shtorivdom',
            description:
              'Салон штор: пошив штор на заказ, жалюзи, карнизы. Бесплатный выезд дизайнера.',
            url: 'https://shtorivdom.ru/',
            logo: 'https://shtorivdom.ru/assets/favicon/favicon-96x96.png',
            image: 'https://shtorivdom.ru/assets/img/hero.jpg',
            telephone: '+79153591200',
            email: 'info@shtorivdom.ru',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Кварцевая улица, 3, корп. 2',
              addressLocality: 'Троицк, Москва',
              addressCountry: 'RU',
            },
            areaServed: ['Москва', 'Московская область'],
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '10:00',
              closes: '20:00',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Сколько стоит пошив штор на заказ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.',
                },
              },
              {
                '@type': 'Question',
                name: 'Где можно посмотреть Ваши работы?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.',
                },
              },
              {
                '@type': 'Question',
                name: 'Есть ли гарантия на изделия?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.',
                },
              },
              {
                '@type': 'Question',
                name: 'Какие сроки по пошиву?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.',
                },
              },
              {
                '@type': 'Question',
                name: 'Сколько стоит выезд дизайнера?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.',
                },
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/home/page').then((m) => m.HomePage),
  },
  {
    path: 'partner',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Сотрудничество с салоном штор Shtorivdom',
        description:
          'Приглашаем к сотрудничеству дизайнеров интерьера, архитекторов и строительные компании. Выгодные условия для партнёров.',
        image: 'https://shtorivdom.ru/assets/img/partner/image-6.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Стать партнером',
                item: 'https://shtorivdom.ru/partner/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/partner/page').then((m) => m.PartnerPage),
  },
  {
    path: 'price',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Цены на шторы на заказ в Москве | Shtorivdom',
        description:
          'Цены на шторы на заказ в Москве: блэкаут, римские, рулонные и льняные шторы, плиссе, жалюзи и карнизы. Тарифы «Стандарт», «Премиум», «Люкс» с пошивом и установкой.',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Цены / стоимость',
                item: 'https://shtorivdom.ru/price/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/price/page').then((m) => m.PricePage),
  },
  {
    path: 'privacy-policy',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Shtorivdom | Политика конфиденциальности',
        description: 'Политика конфиденциальности, соглашение на обработку информации на сайте',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Политика конфиденциальности',
                item: 'https://shtorivdom.ru/privacy-policy/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/privacy-policy/page').then((m) => m.PrivacyPolicyPage),
  },
  {
    path: 'quiz',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Подбор штор за 4 шага — какие шторы подойдут | Shtorivdom',
        description:
          'Ответьте на 4 вопроса о комнате и окне — подскажем, какие шторы подойдут: блэкаут, римские, рулонные, льняные, плиссе или жалюзи.',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Подбор штор',
                item: 'https://shtorivdom.ru/quiz/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/quiz/page').then((m) => m.QuizPage),
  },
  {
    path: 'services',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Услуги салона штор: выезд дизайнера, пошив, монтаж | Shtorivdom',
        description:
          'Услуги студии Shtorivdom: бесплатный выезд дизайнера с образцами, замер, пошив штор в собственном цехе, установка карнизов и навеска штор под ключ.',
        image: 'https://shtorivdom.ru/assets/img/welcome-1.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Услуги',
                item: 'https://shtorivdom.ru/services/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () => import('./pages/services/page').then((m) => m.ServicesPage),
  },
  {
    path: 'soglasie-na-obrabotku-personalnyh-dannyh',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Shtorivdom | Согласие на обработку персональных данных',
        description:
          'Согласие на обработку персональных данных. Перечень персональных данных, цели обработки, срок действия согласия и порядок отзыва.',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://shtorivdom.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Согласие на обработку персональных данных',
                item: 'https://shtorivdom.ru/soglasie-na-obrabotku-personalnyh-dannyh/',
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/soglasie-na-obrabotku-personalnyh-dannyh/page').then(
        (m) => m.SoglasieNaObrabotkuPersonalnyhDannyhPage,
      ),
  },
];
