export interface MockupEntry {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly group: 'Сайт' | 'Референсы' | 'Материалы';
}

export const MOCKUPS: readonly MockupEntry[] = [
  {
    id: 'site',
    title: 'Shtorivdom',
    description: 'Полный многостраничный прототип сайта',
    path: 'site/',
    group: 'Сайт',
  },
  {
    id: 'emails',
    title: 'Письма',
    description: 'Все письма клиентам и уведомления салона',
    path: 'emails/',
    group: 'Сайт',
  },
  {
    id: 'landing-1',
    title: 'Landing 1',
    description: 'Интерьерный минимализм',
    path: 'landing-1/',
    group: 'Референсы',
  },
  {
    id: 'landing-2',
    title: 'Landing 2',
    description: 'Тёмный премиальный лендинг',
    path: 'landing-2/',
    group: 'Референсы',
  },
  {
    id: 'landing-3',
    title: 'Landing 3',
    description: 'Светлый журнальный лендинг',
    path: 'landing-3/',
    group: 'Референсы',
  },
  {
    id: 'landing-5',
    title: 'Landing 5',
    description: 'Фотографичный лендинг',
    path: 'landing-5/',
    group: 'Референсы',
  },
  {
    id: 'landing-6',
    title: 'Landing 6',
    description: 'Каталожная композиция',
    path: 'landing-6/',
    group: 'Референсы',
  },
  {
    id: 'landing-7',
    title: 'Landing 7',
    description: 'Редакционная композиция',
    path: 'landing-7/',
    group: 'Референсы',
  },
  {
    id: 'landing-8',
    title: 'Landing 8',
    description: 'Спокойный интерьерный лендинг',
    path: 'landing-8/',
    group: 'Референсы',
  },
  {
    id: 'landing-9',
    title: 'Landing 9',
    description: 'Тёмно-синий салон штор',
    path: 'landing-9/',
    group: 'Референсы',
  },
  {
    id: 'landing-10',
    title: 'Landing 10',
    description: 'Лендинг с формой заявки',
    path: 'landing-10/',
    group: 'Референсы',
  },
  {
    id: 'herenta',
    title: 'Herenta',
    description: 'Испанский инвестиционный референс',
    path: 'herenta/',
    group: 'Референсы',
  },
  {
    id: 'images',
    title: 'Изображения',
    description: 'Галерея изображений всех референсов',
    path: 'images/',
    group: 'Материалы',
  },
  {
    id: 'icons',
    title: 'Иконки',
    description: 'Галерея иконок всех референсов',
    path: 'icons/',
    group: 'Материалы',
  },
];

export const mockupById = (id: string): MockupEntry | undefined =>
  MOCKUPS.find((mockup) => mockup.id === id);
