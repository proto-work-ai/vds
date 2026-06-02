import { IContentType, ProductType } from './products.data';

export const catalogPagesAll: IContentType[] = [
  {
    types: [ProductType.Matte],
    key: '2',
    title: 'Римские шторы',
    text: 'Из плотных и легких тканей для прямых и скошенных окон.',
    detail: () =>
      import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-2.jpg',
    images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  },
  {
    types: [ProductType.Matte],
    key: '1',
    title: 'Прямые шторы',
    text: 'Красивые рисунки и однотонные ткани для стандартных, скошенных и арочных окон.',
    detail: () =>
      import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-1.jpg',
    images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  },
  {
    types: [ProductType.Matte],
    key: '3',
    title: 'Рулонные шторы',
    text: 'Крепление на проем, в проем или раму окна.',
    detail: () =>
      import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-3.jpg',
    images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  },
  {
    types: [ProductType.Matte],
    key: '5',
    title: 'Шторы плиссе',
    text: 'Для стандартных, мансардных и треугольных окон.',
    detail: () =>
      import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-5.jpg',
    images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  },
  {
    types: [ProductType.Matte],
    key: '6',
    title: 'Жалюзи',
    text: 'Стильные, практичные, изготовленные из натурального дерева.',
    detail: () =>
      import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-6.jpg',
    images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  },
  // {
  //   types: [ProductType.Matte],
  //   key: '9',
  //   title: 'Алюминиевые горизонтальные жалюзи',
  //   text: 'Недорогое и стильное решение для оформления окон',
  //   detail: () =>
  //     import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
  //   image: '/catalog/image-9.jpg',
  //   images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  // },
  { // https://www.decortier.ru/karnizy/?filter[tip-karniza][]=decor&page=2
    types: [ProductType.Matte],
    key: '8',
    title: 'Карнизы для штор',
    text: 'Декоративные и профильные.',
    detail: () => import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-8.jpg',
    images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
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
      }
    ]
  },
  // {
  //   types: [ProductType.Matte],
  //   key: '7',
  //   title: 'Рулонные шторы день-ночь (зебра)',
  //   text: 'Умное и практичное сочетание.',
  //   detail: () =>
  //     import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
  //   image: '/catalog/image-7.jpg',
  //   images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  // },
  // {
  //   types: [ProductType.Matte],
  //   key: '4',
  //   title: 'Шторы с моторизацией',
  //   text: 'Управляйте с пульта, умной колонки или с помощью таймера.',
  //   detail: () =>
  //     import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
  //   image: '/catalog/image-4.jpg',
  //   images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  // },
  // {
  //   types: [ProductType.Matte],
  //   key: '10',
  //   title: 'Вертикальные жалюзи',
  //   text: 'Тканевые и пластиковые ламели с выбором степени затемнения.',
  //   detail: () =>
  //     import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
  //   image: '/catalog/image-10.jpg',
  //   images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  // },
  // {
  //   types: [ProductType.Matte],
  //   key: '11',
  //   title: 'Шторы и жалюзи для скошенных окон',
  //   text: 'Ознакомьтесь с изделиями подходящими для оформления скошенных окон.',
  //   detail: () =>
  //     import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
  //   image: '/catalog/image-11.jpg',
  //   images: ['/catalog/image-2.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  // },
] as const;
