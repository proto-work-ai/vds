import { InjectionToken } from '@angular/core';

/** Базовый путь к картинкам сайта (assets/img, assets/icons). На сайте — 'assets/', в Storybook — 'site-assets/'. */
export const SITE_ASSETS_URL = new InjectionToken<string>('SITE_ASSETS_URL', { factory: () => 'assets/' });

export interface SiteLink {
  label: string;
  href?: string;
}

export const SITE_CONTACTS = {
  phone: '+7 (925) 594-61-17',
  tel: '+79255946117',
  email: 'info@shtorivdom.ru',
  address: 'Троицк, Кварцевая улица, 3, корп. 2',
  addressLink: 'https://yandex.ru/maps/-/CDQG4AYV',
  hours: '10:00–20:00 / Без выходных',
  telegram: 'https://t.me/andreevav1',
  max: 'https://max.ru/u/f9LHodD0cOIMeP9lespjPt8cxagsm7ObEGSeElhYDRMQhW9vFT_lt7I30J0',
} as const;

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

/** catalog.data.ts + price-list.service.ts (как в tools/mockups/site-build.mjs) */
export const SITE_CATALOG: SiteCatalogSection[] = [
  { key: 'blackout-curtains', title: 'Шторы блэкаут', text: 'Это идеальное решение для тех, кто ценит тишину и комфорт в своем доме', image: 'image-5.jpg', minPrice: 'от 2 500 ₽/м.пог.', photos: 11,
    prices: [{ name: 'Блэкаут однотонный', price: 'от 2 500 ₽/м.пог.' }, { name: 'Блэкаут с фактурой льна', price: 'от 3 200 ₽/м.пог.' }, { name: 'Блэкаут жаккард', price: '4 500–7 000 ₽/м.пог.' }] },
  { key: 'roman-blinds', title: 'Римские шторы', text: 'Из плотных и легких тканей для прямых и скошенных окон.', image: 'image-1.jpg', minPrice: 'от 4 500 ₽/м²', photos: 3,
    prices: [{ name: 'Лёгкая ткань', price: 'от 4 500 ₽/м²' }, { name: 'Плотная ткань / блэкаут', price: 'от 5 500 ₽/м²' }, { name: 'Лён премиум', price: '8 000–12 000 ₽/м²' }] },
  { key: 'roller-blinds', title: 'Рулонные шторы', text: 'Крепление на проем, в проем или раму окна.', image: 'image-2.jpg', minPrice: 'от 2 200 ₽/м²', photos: 9,
    prices: [{ name: 'Мини, ткань стандарт', price: 'от 2 200 ₽/м²' }, { name: 'Кассетные UNI', price: 'от 3 500 ₽/м²' }, { name: 'День-ночь (зебра)', price: 'от 4 200 ₽/м²' }] },
  { key: 'linen-curtains', title: 'Льняные шторы', text: 'Для стандартных, мансардных и треугольных окон.', image: 'image-3.jpg', minPrice: 'от 2 800 ₽/м.пог.', photos: 9,
    prices: [{ name: 'Лён с хлопком', price: 'от 2 800 ₽/м.пог.' }, { name: 'Натуральный лён', price: 'от 4 000 ₽/м.пог.' }, { name: 'Итальянский лён', price: '6 500–9 500 ₽/м.пог.' }] },
  { key: 'pleated-blinds', title: 'Шторы плиссе', text: 'Для стандартных, мансардных и треугольных окон.', image: 'image-1.jpg', minPrice: 'от 3 500 ₽/м²', photos: 9,
    prices: [{ name: 'Плиссе стандарт', price: 'от 3 500 ₽/м²' }, { name: 'Плиссе блэкаут', price: 'от 5 000 ₽/м²' }, { name: 'Мансардные плиссе', price: 'от 7 500 ₽/м²' }] },
  { key: 'curtain-rods', title: 'Карнизы для штор', text: 'Декоративные и профильные.', image: 'image-1.jpg', minPrice: 'от 900 ₽/м.пог.', photos: 7,
    prices: [{ name: 'Профильный алюминиевый', price: 'от 900 ₽/м.пог.' }, { name: 'Декоративный металлический', price: '2 500–6 000 ₽/м.пог.' }, { name: 'Электрокарниз', price: 'от 18 000 ₽/шт.' }] },
  { key: 'blinds', title: 'Жалюзи', text: 'Стильные, практичные.', image: 'image-1.jpg', minPrice: 'от 1 500 ₽/м²', photos: 9,
    prices: [{ name: 'Горизонтальные алюминиевые', price: 'от 1 500 ₽/м²' }, { name: 'Вертикальные тканевые', price: 'от 1 800 ₽/м²' }, { name: 'Деревянные', price: 'от 6 500 ₽/м²' }] },
];

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

/** Таблицы страницы цен (mockups/site/src/pages/price.html) */
export const SITE_PRICES: SitePriceSection[] = [
  { key: 'blackout-curtains', title: 'Шторы блэкаут', rows: [
    { name: 'Блэкаут однотонный', country: 'Турция', width: '2,8', warranty: '3 года', price: 'от 2 500 ₽/м.пог.' },
    { name: 'Блэкаут с фактурой льна', country: 'Турция', width: '2,8', warranty: '3 года', price: 'от 3 200 ₽/м.пог.' },
    { name: 'Блэкаут жаккард', country: 'Германия', width: '3', warranty: '5 лет', price: '4 500–7 000 ₽/м.пог.' }] },
  { key: 'roman-blinds', title: 'Римские шторы', rows: [
    { name: 'Лёгкая ткань', country: 'Турция', width: '2,8', warranty: '3 года', price: 'от 4 500 ₽/м²' },
    { name: 'Плотная ткань / блэкаут', country: 'Турция', width: '2,8', warranty: '3 года', price: 'от 5 500 ₽/м²' },
    { name: 'Лён премиум', country: 'Италия', width: '3', warranty: '5 лет', price: '8 000–12 000 ₽/м²' }] },
  { key: 'roller-blinds', title: 'Рулонные шторы', rows: [
    { name: 'Мини, ткань стандарт', country: 'Россия', width: '0,3–1,6', warranty: '2 года', price: 'от 2 200 ₽/м²' },
    { name: 'Кассетные UNI', country: 'Россия', width: '0,3–1,8', warranty: '3 года', price: 'от 3 500 ₽/м²' },
    { name: 'День-ночь (зебра)', country: 'Корея', width: '0,3–2,5', warranty: '3 года', price: 'от 4 200 ₽/м²' }] },
  { key: 'linen-curtains', title: 'Льняные шторы', rows: [
    { name: 'Лён с хлопком', country: 'Турция', width: '2,8', warranty: '3 года', price: 'от 2 800 ₽/м.пог.' },
    { name: 'Натуральный лён', country: 'Беларусь', width: '2,6', warranty: '3 года', price: 'от 4 000 ₽/м.пог.' },
    { name: 'Итальянский лён', country: 'Италия', width: '3', warranty: '5 лет', price: '6 500–9 500 ₽/м.пог.' }] },
  { key: 'pleated-blinds', title: 'Шторы плиссе', rows: [
    { name: 'Плиссе стандарт', country: 'Россия', width: '0,3–1,8', warranty: '2 года', price: 'от 3 500 ₽/м²' },
    { name: 'Плиссе блэкаут', country: 'Германия', width: '0,3–1,8', warranty: '3 года', price: 'от 5 000 ₽/м²' },
    { name: 'Мансардные плиссе', country: 'Германия', width: '0,3–1,5', warranty: '3 года', price: 'от 7 500 ₽/м²' }] },
  { key: 'curtain-rods', title: 'Карнизы для штор', rows: [
    { name: 'Профильный алюминиевый', country: 'Россия', width: '—', warranty: '3 года', price: 'от 900 ₽/м.пог.' },
    { name: 'Декоративный металлический', country: 'Германия', width: '—', warranty: '5 лет', price: '2 500–6 000 ₽/м.пог.' },
    { name: 'Электрокарниз', country: 'Германия', width: '—', warranty: '2 года', price: 'от 18 000 ₽/шт.' }] },
  { key: 'blinds', title: 'Жалюзи', rows: [
    { name: 'Горизонтальные алюминиевые', country: 'Россия', width: '—', warranty: '2 года', price: 'от 1 500 ₽/м²' },
    { name: 'Вертикальные тканевые', country: 'Россия', width: '—', warranty: '2 года', price: 'от 1 800 ₽/м²' },
    { name: 'Деревянные', country: 'Китай', width: '—', warranty: '3 года', price: 'от 6 500 ₽/м²' }] },
];

export interface SiteStep {
  title: string;
  text: string;
}

export const SITE_STEPS: SiteStep[] = [
  { title: 'Заявка', text: 'Оставьте заявку на сайте или позвоните нам по телефону, напишите в мессенджер — как вам удобно. Мы ответим на все ваши вопросы и назначим удобную для вас дату встречи с нашим дизайнером' },
  { title: 'Встреча', text: 'Выезд дизайнера бесплатный. Наш сотрудник полностью проконсультирует вас на месте — продемонстрирует образцы и каталоги тканей, сделает необходимые технические замеры, подготовит первоначальный эскиз и просчет.' },
  { title: 'Пошив', text: 'Пошив штор в собственном швейном цехе под надзором технолога. Проверка готовых изделий на брак. В отличие от многих, мы даём гарантию 2 года на все виды работ и материалы.' },
  { title: 'Монтаж', text: 'Монтаж штор на окна. Осуществим доставку, установку карнизов и навеску штор, отпарив их. Все под ключ.' },
];

export interface SiteFaqItem {
  question: string;
  answer: string;
}

export const SITE_FAQ: SiteFaqItem[] = [
  { question: 'Сколько стоит пошив штор на заказ?', answer: 'Редко какая студия, специализирующаяся на изготовлении штор по меркам клиента, сможет дать точный ответ на этот вопрос, не располагая деталями: конкретными габаритами будущих изделий, выбором материалов и декором. Цена любых индивидуальных заказов напрямую зависит от уникальных характеристик проекта. Тем не менее, мы готовы предоставить вам примерный расчет, чтобы вы могли получить общее представление о порядке цен и ориентироваться на рынке. Для этого достаточно отправить нам приблизительные размеры вашего окна, проект или ваши пожелания. Наши дизайнеры подготовят предварительный расчет, включающий стоимость базовых материалов и пошива штор, а также дополнительных услуг (установка карнизов и монтаж штор). Если озвученная предварительная сумма вас устроит, то после личной встречи с нашим дизайнером вы получите детальную смету, учитывающую выбранные модели, ткани и точные размеры. Выбрать шторы на заказ в Москве и МО в нашем салоне — это правильное решение. Мы предлагаем индивидуальное изготовление штор по доступным ценам в срок 10–14 дней.' },
  { question: 'Где можно посмотреть Ваши работы?', answer: 'На нашем сайте есть большое портфолио выполненных работ. В нём Вы можете ознакомиться с разными вариантами исполнения штор на заказ, которые изготовлены нашей компанией. Работ так много, что Вы несомненно найдете в них вдохновение для своего проекта. Также Вы можете познакомиться с нами в разных социальных сетях.' },
  { question: 'Есть ли гарантия на изделия?', answer: 'Мы даем 2 года гарантии на изделия и на все работы, проводимые нами по договору.' },
  { question: 'Какие сроки по пошиву?', answer: 'По договору 10–14 дней, в зависимости от объема можем сделать и раньше.' },
  { question: 'Сколько стоит выезд дизайнера?', answer: 'Выезд дизайнера — бесплатный! Дизайнер приезжает с образцами и каталогами тканей, делает замер и просчет на месте. Даже если потребуется повторный выезд.' },
];

export const SITE_ROD_MODELS: string[] = [
  'Карниз 0-25025-22', 'Карниз CASTLE messing matt', 'Карниз AIDA anthrazit-nickel matt', 'Карниз AIDA anthrazit-messing matt',
  'Карниз PLENUM венге', 'Карниз DAVOS белый', 'Карниз CAPRI орех', 'Карниз CANNES бук', 'Карниз JAZZ nickel matt',
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
  { tone: 'standard', term: '14 дней', name: 'Стандарт', price: '39 000', text: 'Шторы прямого кроя из ткани класса стандарт на стандартной шторной ленте без подкладки',
    features: ['Тюль с пошивом', 'Портьеры с пошивом', 'Алюминиевый потолочный карниз двухрядный', 'Авторский надзор проекта'],
    gifts: ['Выезд дизайнера и замерщика с образцами тканей', 'Эскиз 1 вариант', 'Наволочка под интерьер'] },
  { tone: 'premium', term: '12 дней', name: 'Премиум', price: '58 000', text: 'Шторы прямого кроя из ткани класса премиум с декором, кантом, на фигурной шторной ленте',
    features: ['Тюль с пошивом', 'Портьеры с пошивом', 'Алюминиевый потолочный карниз двухрядный улучшенного скольжения', 'Подхват — декоративная кисть'],
    gifts: ['Выезд дизайнера и замерщика с образцами тканей', 'Эскиз 1 вариант', 'Наволочка под интерьер'] },
  { tone: 'lux', term: '7 дней', name: 'Люкс', price: '85 000', text: 'Шторы прямого кроя из ткани класса премиум с декором, кантом, на фигурной шторной ленте',
    features: ['Тюль с пошивом', 'Портьеры с пошивом', 'Алюминиевый потолочный карниз двухрядный улучшенного скольжения', 'Авторский надзор проекта'],
    gifts: ['Выезд ведущего дизайнера и замерщика с образцами тканей', 'Эскиз 1 вариант', 'Наволочка под интерьер'] },
];

export const SITE_NAV: { label: string; path: string }[] = [
  { label: 'Цены', path: 'price/' },
  { label: 'Услуги', path: 'services/' },
  { label: 'О нас', path: 'about/' },
  { label: 'Партнёрам', path: 'partner/' },
  { label: 'Контакты', path: 'contact/' },
];
