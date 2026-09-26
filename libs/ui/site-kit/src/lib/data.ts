import priceConfig from './site-prices.json';
import { InjectionToken } from '@angular/core';

/** Базовый путь к картинкам сайта (assets/img, assets/icons). На сайте — 'assets/', в Storybook — 'site-assets/'. */
export const SITE_ASSETS_URL = new InjectionToken<string>('SITE_ASSETS_URL', {
  factory: () => 'assets/',
});

export interface SiteLink {
  label: string;
  href?: string;
}

export interface SiteClient {
  name: string;
  logo: string;
}

/** Логотипы компаний, для которых салон выполнял проекты. */
export const SITE_CLIENTS: readonly SiteClient[] = [
  { name: 'Якитория', logo: 'clients/yakitoria.jpg' },
  { name: 'Котово', logo: 'clients/kotovo.jpg' },
  { name: 'Best Western Vega', logo: 'clients/best-western-vega.jpg' },
  { name: 'Урюк кафе', logo: 'clients/uruk-cafe.jpg' },
  { name: 'Отель «Метрополь»', logo: 'clients/metropol.png' },
  { name: 'Millennium Park', logo: 'clients/millennium-park.jpg' },
];

export interface SiteContacts {
  phone: string;
  tel: string;
  email: string;
  address: string;
  addressLink: string;
  hours: string;
  telegram: string;
  max: string;
}

export interface SitePriceLine {
  name: string;
  price: string;
}

export interface SiteCatalogSection {
  key: string;
  title: string;
  text: string;
  image: string;
  minPrice: string;
  photos: number;
  prices: SitePriceLine[];
}

const SITE_CATALOG_DETAILS: Record<string, { text: string; photos: number }> = {
  'blackout-curtains': {
    text: 'Это идеальное решение для тех, кто ценит тишину и комфорт в своем доме',
    photos: 11,
  },
  'roman-blinds': {
    text: 'Из плотных и легких тканей для прямых и скошенных окон.',
    photos: 3,
  },
  'roller-blinds': {
    text: 'Крепление на проем, в проем или раму окна.',
    photos: 9,
  },
  'linen-curtains': {
    text: 'Для стандартных, мансардных и треугольных окон.',
    photos: 9,
  },
  'pleated-blinds': {
    text: 'Для стандартных, мансардных и треугольных окон.',
    photos: 9,
  },
  'curtain-rods': { text: 'Декоративные и профильные.', photos: 7 },
  blinds: { text: 'Стильные, практичные.', photos: 9 },
};

const rawPriceLabel = (
  row: { priceMin: number; priceMax?: number; unit?: string },
  defaultUnit: string,
): string => {
  const unit = row.unit ?? defaultUnit;
  return row.priceMax
    ? `${row.priceMin.toLocaleString('ru-RU')}–${row.priceMax.toLocaleString('ru-RU')} ₽/${unit}`
    : `от ${row.priceMin.toLocaleString('ru-RU')} ₽/${unit}`;
};

/** Каталог строится из общей конфигурации site-prices.json. */
export const SITE_CATALOG: SiteCatalogSection[] = priceConfig.sections.map((section) => {
  const details = SITE_CATALOG_DETAILS[section.key];
  return {
    key: section.key,
    title: section.title,
    text: details.text,
    image: section.image.split('/').at(-1) ?? section.image,
    minPrice: rawPriceLabel(section.rows[0], section.unit),
    photos: details.photos,
    prices: section.rows.map((row) => ({
      name: row.name,
      price: rawPriceLabel(row, section.unit),
    })),
  };
});

export interface SitePriceRow {
  name: string;
  country: string;
  width: string;
  warranty: string;
  price: string;
}

export interface SitePriceSection {
  key: string;
  title: string;
  rows: SitePriceRow[];
}

export interface SitePriceConfigRow {
  name: string;
  country: string;
  width: number | [number, number] | null;
  warranty: number;
  priceMin: number;
  priceMax?: number;
  unit?: string;
}

export interface SitePriceConfigSection {
  key: string;
  title: string;
  unit: string;
  image: string;
  rows: SitePriceConfigRow[];
}

export interface SitePriceConfig {
  currency: 'RUB';
  calculator: { curtainRodPerLinearMeter: number };
  sections: SitePriceConfigSection[];
}

/** Единственный источник цен сайта. Редактировать site-prices.json. */
export const SITE_PRICE_CONFIG = priceConfig as SitePriceConfig;

const priceNumber = (value: number): string => value.toLocaleString('ru-RU');
const decimalNumber = (value: number): string => value.toLocaleString('ru-RU');
const warrantyLabel = (years: number): string => {
  const word = years === 1 ? 'год' : years >= 2 && years <= 4 ? 'года' : 'лет';
  return `${years} ${word}`;
};

export const formatSitePrice = (row: SitePriceConfigRow, defaultUnit: string): string => {
  const unit = row.unit ?? defaultUnit;
  return row.priceMax
    ? `${priceNumber(row.priceMin)}–${priceNumber(row.priceMax)} ₽/${unit}`
    : `от ${priceNumber(row.priceMin)} ₽/${unit}`;
};

export const SITE_PRICES: SitePriceSection[] = SITE_PRICE_CONFIG.sections.map((section) => ({
  key: section.key,
  title: section.title,
  rows: section.rows.map((row) => ({
    name: row.name,
    country: row.country,
    width: Array.isArray(row.width)
      ? `${decimalNumber(row.width[0])}–${decimalNumber(row.width[1])}`
      : row.width === null
        ? '—'
        : decimalNumber(row.width),
    warranty: warrantyLabel(row.warranty),
    price: formatSitePrice(row, section.unit),
  })),
}));

export const siteMinimumPrice = (section: SitePriceConfigSection): number =>
  Math.min(...section.rows.map((row) => row.priceMin));

export const formatSiteMinimumPrice = (section: SitePriceConfigSection): string =>
  `от ${priceNumber(siteMinimumPrice(section))} ₽/${section.unit}`;

export const sitePriceOffer = (key: string) => {
  const section = SITE_PRICE_CONFIG.sections.find((item) => item.key === key);
  if (!section) throw new Error(`Нет настройки цен для раздела ${key}`);
  const values = section.rows.flatMap((row) =>
    row.priceMax ? [row.priceMin, row.priceMax] : [row.priceMin],
  );
  return {
    '@type': 'AggregateOffer' as const,
    priceCurrency: SITE_PRICE_CONFIG.currency,
    lowPrice: Math.min(...values),
    highPrice: Math.max(...values),
    offerCount: section.rows.length,
    availability: 'https://schema.org/InStock',
  };
};

export interface SiteStep {
  title: string;
  text: string;
}

export const SITE_STEPS: SiteStep[] = [
  {
    title: 'Заявка',
    text: 'Оставьте заявку на сайте или позвоните нам по телефону, напишите в мессенджер — как вам удобно. Мы ответим на все ваши вопросы и назначим удобную для вас дату встречи с нашим дизайнером',
  },
  {
    title: 'Встреча',
    text: 'Выезд дизайнера бесплатный. Наш сотрудник полностью проконсультирует вас на месте — продемонстрирует образцы и каталоги тканей, сделает необходимые технические замеры, подготовит первоначальный эскиз и просчет.',
  },
  {
    title: 'Пошив',
    text: 'Пошив штор в собственном швейном цехе под надзором технолога. Проверка готовых изделий на брак. В отличие от многих, мы даём гарантию 2 года на все виды работ и материалы.',
  },
  {
    title: 'Монтаж',
    text: 'Монтаж штор на окна. Осуществим доставку, установку карнизов и навеску штор, отпарив их. Все под ключ.',
  },
];

export interface SiteFaqItem {
  question: string;
  answer: string;
}

export const SITE_FAQ: SiteFaqItem[] = [
  {
    question: 'Сколько стоит пошив штор на заказ?',
    answer:
      'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.',
  },
  {
    question: 'Где можно посмотреть Ваши работы?',
    answer:
      'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.',
  },
  {
    question: 'Есть ли гарантия на изделия?',
    answer: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.',
  },
  {
    question: 'Какие сроки по пошиву?',
    answer: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.',
  },
  {
    question: 'Сколько стоит выезд дизайнера?',
    answer:
      'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.',
  },
];

export const SITE_ROD_MODELS: string[] = [
  'Карниз 0-25025-22',
  'Карниз CASTLE messing matt',
  'Карниз AIDA anthrazit-nickel matt',
  'Карниз AIDA anthrazit-messing matt',
  'Карниз PLENUM венге',
  'Карниз DAVOS белый',
  'Карниз CAPRI орех',
  'Карниз CANNES бук',
  'Карниз JAZZ nickel matt',
];

export interface SiteTier {
  tone: 'standard' | 'premium' | 'lux';
  name: string;
  price: string;
  text: string;
  features: string[];
  gifts: string[];
  term: string;
}

export const SITE_TIERS: SiteTier[] = [
  {
    tone: 'standard',
    term: '14 дней',
    name: 'Стандарт',
    price: '39 000',
    text: 'Шторы прямого кроя из ткани класса стандарт на стандартной шторной ленте без подкладки',
    features: [
      'Тюль с пошивом',
      'Портьеры с пошивом',
      'Алюминиевый потолочный карниз двухрядный',
      'Авторский надзор проекта',
    ],
    gifts: [
      'Выезд дизайнера и замерщика с образцами тканей',
      'Эскиз 1 вариант',
      'Наволочка под интерьер',
    ],
  },
  {
    tone: 'premium',
    term: '10 дней',
    name: 'Премиум',
    price: '58 000',
    text: 'Шторы прямого кроя из ткани класса премиум с декором, кантом, на фигурной шторной ленте',
    features: [
      'Тюль с пошивом',
      'Портьеры с пошивом',
      'Алюминиевый потолочный карниз двухрядный улучшенного скольжения',
      'Подхват — декоративная кисть',
    ],
    gifts: [
      'Выезд дизайнера и замерщика с образцами тканей',
      'Эскиз 1 вариант',
      'Наволочка под интерьер',
    ],
  },
  {
    tone: 'lux',
    term: '7 дней',
    name: 'Люкс',
    price: '85 000',
    text: 'Шторы прямого кроя из ткани класса премиум с декором, кантом, на фигурной шторной ленте',
    features: [
      'Тюль с пошивом',
      'Портьеры с пошивом',
      'Алюминиевый потолочный карниз двухрядный улучшенного скольжения',
      'Авторский надзор проекта',
    ],
    gifts: [
      'Выезд ведущего дизайнера и замерщика с образцами тканей',
      'Эскиз 1 вариант',
      'Наволочка под интерьер',
    ],
  },
];

export const SITE_NAV: { label: string; path: string }[] = [
  { label: 'Цены', path: 'price/' },
  { label: 'Услуги', path: 'services/' },
  { label: 'О нас', path: 'about/' },
  { label: 'Партнёрам', path: 'partner/' },
  { label: 'Контакты', path: 'contact/' },
];

export interface SiteReview {
  name: string;
  cat: string;
  text: string;
  avatar: string;
}
export const SITE_REVIEWS: SiteReview[] = [
  {
    name: 'Марина',
    cat: 'Льняные шторы · Москва',
    text: 'Понравилось, что можно было спокойно посмотреть ткани дома и примерить к интерьеру. Результат совпал с эскизом, ничего переделывать не пришлось.',
    avatar: 'img/avatars/marina.png',
  },
  {
    name: 'Ирина',
    cat: 'Римские шторы · Троицк',
    text: 'Дизайнер приехала с образцами в удобное время и помогла подобрать ткань для кухни. Шторы сшили точно по размеру, установили быстро и аккуратно.',
    avatar: 'img/avatars/irina.jpg',
  },
  {
    name: 'Сергей',
    cat: 'Шторы блэкаут · Химки',
    text: 'Искали плотные шторы в спальню, чтобы утром не будил свет. Сделали замеры, повесили карниз и шторы за один приезд — в комнате теперь полная темнота.',
    avatar: 'img/avatars/sergey.png',
  },
];
