import { IContentType } from '../products.data';

export const catalogPagesAll: IContentType[] = [
  {
    key: 'blackout-curtains',
    title: 'Шторы блэкаут',
    text: 'Это идеальное решение для тех, кто ценит тишину и комфорт в своем доме',
    detail: () => import('./catalog-detail/blackout-curtains/blackout-curtains').then((a) => a.Detail),
    image: '/catalog/blackout-curtains/image-5.jpg',
    images: [
      '/catalog/blackout-curtains/image-5.jpg',
      '/catalog/blackout-curtains/image-4.jpg',
      '/catalog/blackout-curtains/image-3.jpg',
      '/catalog/blackout-curtains/image-1.jpg',

      '/catalog/blackout-curtains/image-2.jpg',
      '/catalog/blackout-curtains/image-6.jpg',

      '/catalog/blackout-curtains/image-7.jpg',
      '/catalog/blackout-curtains/image-8.jpg',
      '/catalog/blackout-curtains/image-9.jpg',

      '/catalog/blackout-curtains/image-10.jpg',
      '/catalog/blackout-curtains/image-13.jpg',
    ],
  },

  {
    key: 'roman-blinds',
    title: 'Римские шторы',
    text: 'Из плотных и легких тканей для прямых и скошенных окон.',
    detail: () => import('./catalog-detail/roman-blinds/roman-blinds').then((a) => a.Detail),
    image: '/catalog/roman-blinds/image-1.jpg',
    images: [
      '/catalog/roman-blinds/image-1.jpg',
      '/catalog/roman-blinds/image-2.jpg',
      '/catalog/roman-blinds/image-3.jpg',
    ],
  },

  {
    key: 'roller-blinds',
    title: 'Рулонные шторы',
    text: 'Крепление на проем, в проем или раму окна.',
    detail: () => import('./catalog-detail/roller-blinds/roller-blinds').then((a) => a.Detail),
    image: '/catalog/roller-blinds/image-2.jpg',
    images: [
      '/catalog/roller-blinds/image-2.jpg',
      '/catalog/roller-blinds/image-3.jpg',

      '/catalog/roller-blinds/image-4.jpg',
      '/catalog/roller-blinds/image-5.jpg',
      '/catalog/roller-blinds/image-6.jpg',

      '/catalog/roller-blinds/image-7.jpg',
      '/catalog/roller-blinds/image-8.jpg',
      '/catalog/roller-blinds/image-9.jpg',

      '/catalog/roller-blinds/image-10.jpg',
    ],
  },

  {
    key: 'linen-curtains',
    title: 'Льняные шторы',
    text: 'Для стандартных, мансардных и треугольных окон.',
    detail: () => import('./catalog-detail/linen-curtains/linen-curtains').then((a) => a.Detail),
    image: '/catalog/linen-curtains/image-3.jpg',
    images: [
      '/catalog/linen-curtains/image-3.jpg',
      '/catalog/linen-curtains/image-1.jpg',
      '/catalog/linen-curtains/image-2.jpg',

      '/catalog/linen-curtains/image-4.jpg',
      '/catalog/linen-curtains/image-5.jpg',
      '/catalog/linen-curtains/image-6.jpg',

      '/catalog/linen-curtains/image-7.jpg',
      '/catalog/linen-curtains/image-8.jpg',
      '/catalog/linen-curtains/image-9.jpg',

      '/catalog/linen-curtains/image-10.jpg',
    ],
  },

  {
    key: 'pleated-blinds',
    title: 'Шторы плиссе',
    text: 'Для стандартных, мансардных и треугольных окон.',
    detail: () => import('./catalog-detail/pleated-blinds/pleated-blinds').then((a) => a.Detail),
    image: '/catalog/pleated-blinds/image-1.jpg',
    images: [
      '/catalog/pleated-blinds/image-1.jpg',
      '/catalog/pleated-blinds/image-2.jpg',
      '/catalog/pleated-blinds/image-3.jpg',

      '/catalog/pleated-blinds/image-4.jpg',
      '/catalog/pleated-blinds/image-5.jpg',
      '/catalog/pleated-blinds/image-6.jpg',

      '/catalog/pleated-blinds/image-7.jpg',
      '/catalog/pleated-blinds/image-8.jpg',
      '/catalog/pleated-blinds/image-9.jpg',
    ],
  },

  {
    // https://www.decortier.ru/karnizy/?filter[tip-karniza][]=decor&page=2
    key: 'curtain-rods',
    title: 'Карнизы для штор',
    text: 'Декоративные и профильные.',
    detail: () => import('./catalog-detail/curtain-rods/curtain-rods').then((a) => a.Detail),
    image: '/catalog/curtain-rods/image-1.jpg',
    images: [
      '/catalog/curtain-rods/image-4.jpg',
      '/catalog/curtain-rods/image-5.jpg',
      '/catalog/curtain-rods/image-6.jpg',
      '/catalog/curtain-rods/image-7.jpg',
      '/catalog/curtain-rods/image-8.jpg',
      '/catalog/curtain-rods/image-9.jpg',
      '/catalog/curtain-rods/image-10.jpg',
    ],
    children: [
      {
        key: '1',
        title: 'Карниз 0-25025-22',
        image: '/catalog/catalog-1.webp',
      },
      {
        key: '2',
        title: 'Карниз CASTLE messing matt',
        image: '/catalog/catalog-2.webp',
      },
      {
        key: '3',
        title: 'Карниз AIDA anthrazit-nickel matt',
        image: '/catalog/catalog-3.webp',
      },
      {
        key: '4',
        title: 'Карниз AIDA anthrazit-messing matt',
        image: '/catalog/catalog-4.webp',
      },
      {
        key: '5',
        title: 'Карниз PLENUM венге',
        image: '/catalog/catalog-5.webp',
      },
      {
        key: '6',
        title: 'Карниз DAVOS белый',
        image: '/catalog/catalog-6.webp',
      },
      {
        key: '7',
        title: 'Карниз CAPRI орех',
        image: '/catalog/catalog-7.webp',
      },
      {
        key: '8',
        title: 'Карниз CANNES бук',
        image: '/catalog/catalog-8.webp',
      },
      {
        key: '9',
        title: 'Карниз JAZZ nickel matt',
        image: '/catalog/catalog-9.webp',
      },
    ],
  },

  {
    key: 'blinds',
    title: 'Жалюзи',
    text: 'Стильные, практичные.',
    detail: () => import('./catalog-detail/blinds/blinds').then((a) => a.Detail),
    image: '/catalog/blinds/image-1.jpg',
    images: [
      '/catalog/blinds/image-10.jpg',
      '/catalog/blinds/image-9.jpg',
      '/catalog/blinds/image-1.jpg',
      '/catalog/blinds/image-3.jpg',

      '/catalog/blinds/image-4.jpg',
      '/catalog/blinds/image-5.jpg',
      '/catalog/blinds/image-6.jpg',

      '/catalog/blinds/image-7.jpg',
      '/catalog/blinds/image-8.jpg',
    ],
  },
] as const;
