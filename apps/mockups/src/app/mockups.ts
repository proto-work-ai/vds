export interface MockupEntry {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly legacyPath: string;
  readonly legacyAvailable?: boolean;
  readonly angularRoute?: string;
  readonly descriptionPath?: string;
  readonly status: 'static' | 'angular';
  readonly group: 'Сайт' | 'Референсы' | 'Материалы';
}

export const MOCKUPS: readonly MockupEntry[] = [
  {
    id: 'site',
    title: 'Shtorivdom',
    description: 'Полный многостраничный прототип сайта',
    legacyPath: 'site/',
    status: 'static',
    group: 'Сайт',
  },
  {
    id: 'emails',
    title: 'Письма',
    description: 'Все письма клиентам и уведомления салона',
    legacyPath: 'emails/',
    status: 'static',
    group: 'Сайт',
  },
  {
    id: 'landing-1',
    title: 'Landing 1',
    description: 'Интерьерный минимализм',
    legacyPath: 'landing-1/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'landing-2',
    title: 'Landing 2',
    description: 'Тёмный премиальный лендинг',
    legacyPath: 'landing-2/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'landing-3',
    title: 'Landing 3',
    description: 'Светлый журнальный лендинг',
    legacyPath: 'landing-3/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'landing-5',
    title: 'Landing 5',
    description: 'Фотографичный лендинг',
    legacyPath: 'landing-5/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'landing-6',
    title: 'Landing 6',
    description: 'Каталожная композиция',
    legacyPath: 'landing-6/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'landing-7',
    title: 'Landing 7',
    description: 'Редакционная композиция',
    legacyPath: 'landing-7/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'landing-8',
    title: 'Landing 8',
    description: 'Спокойный интерьерный лендинг',
    legacyPath: 'landing-8/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'landing-9',
    title: 'Landing 9',
    description: 'Тёмно-синий салон штор',
    legacyPath: 'landing-9/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'landing-10',
    title: 'Landing 10',
    description: 'Лендинг с формой заявки',
    legacyPath: 'landing-10/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'herenta',
    title: 'Herenta',
    description: 'Испанский инвестиционный референс',
    legacyPath: 'herenta/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'images',
    title: 'Изображения',
    description: 'Галерея изображений всех референсов',
    legacyPath: 'images/',
    status: 'static',
    group: 'Материалы',
  },
  {
    id: 'icons',
    title: 'Иконки',
    description: 'Галерея иконок всех референсов',
    legacyPath: 'icons/',
    status: 'static',
    group: 'Материалы',
  },
];

export const mockupById = (id: string): MockupEntry | undefined =>
  MOCKUPS.find((mockup) => mockup.id === id);
