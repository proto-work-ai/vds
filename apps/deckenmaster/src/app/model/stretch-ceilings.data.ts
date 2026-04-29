import { ComponentType } from '@angular/cdk/portal';

export interface IStretchCeiling {
  key: string;
  title: string;
  image: string;
  images: string[];
  brief: string;
  types: StretchCeilingsType[];
  detail: () => Promise<ComponentType<any>>;
}

export enum StretchCeilingsGroup {
  ByTexture = 1, //Тканевые+ ПВХ[PVC](Матовые,Глянцевые,Сатиновые,Фактурные)
  WithBacklight, // С подсветкой(Парящие,Световые линии,Контурные,Световые линии SLOTT,Световые линии Flexy, Подсветка через полотно)

  Premium, // Премиум/Эксклюзивные потолки(Теневые,Бесщелевые,С фотопечатью,Двухуровневые,Звездное небо)
  ByPremises, // По типу помещений(На кухню[kitchen], В коридор[corridor],В ванную[bathroom],В спальню[bedroom], В детскую[nursery], В гостиную[living-room], В доме[house])
  // Fabric, // Тканевые(Тканевые,D-Premium,Clipso,Cerutti)
}

// Все типы потолков
export enum StretchCeilingsType {
  // ПВХ
  // PVC = 1, // ПВХ
  Textured = 1, // Фактурные

  Matte, // Матовые
  MatteColor, // Матовые Цветной

  Glossy, // Глянцевые
  GlossyColor, // Глянцевые Цветной*
  GalaxyGlossyColor, // Галактика Глянцевые Цветной*

  Satin, // Сатиновые(белый)*
  SatinColor, // Сатиновые(цветной)*

  // Тканевые
  Fabric, // Тканевые,
  DPremium, // D-Premium,*
  Clipso, // Clipso,*
  Cerutti, // Cerutti*

  // [По типу помещений]/[По применению]
  Kitchen, // На кухню
  Corridor, // В коридор
  Bathroom, // В ванную
  Bedroom, // В спальню
  Nursery, //  В детскую
  LivingRoom, //  В гостиную
  House, //  В доме

  // С подсветкой
  Floating, // Парящие
  Contour, // C контурной подсветкой

  LightLines, // Световые линии
  LightLinesSlott, // Световые линии SLOTT*
  LightLinesFlexy, // Световые линии Flexy*
  
  InternalLighting, // Потолки с подсветкой внутри
  // Lightbox, // Лайтбокс*
  // С точечными светильниками
  // Парящий
  // С подсветкой по периметру

  // [Премиум]/[Эксклюзивные потолки]
  ShadowKRAAB, // Теневые,
  Gapless, // Бесщелевые KRAAB,

  TwoTiered, // Двухуровневые без подсветки
  TwoTieredWithBacklight, // Двухуровневые с подсветкой
  TwoTieredWithBacklightNiche, // Двухуровневые с подсветкой в нише

  CurvedTransition, // Криволинейный переход
  MultiLevel, // Многоуровневые
  StarrySky, // Акустические
  WithPhotoPrinting, // С фотопечатью*
  Acoustic, // Звездное небо
  DoubleVision, // Double Vision,
  Transparent, // Светопрозрачный,
  WithIlluminationCanvas, // С подсветкой через полотно,
}

// Страницы по потолками
export const stretchCeilingAll: IStretchCeiling[] = [
  {
    types: [
      StretchCeilingsType.Matte,

      StretchCeilingsType.Kitchen,
      StretchCeilingsType.Corridor,
      StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'matte-stretch-ceilings',
    title: 'Матовые натяжные потолки',
    brief:
      'Классическое, гладкое покрытие без блеска и отражений, имитирующее идеально ровную побелку или гипсокартон. Они создают уют, не перегружают интерьер, обладают антистатическим эффектом, не выгорают и стоят дешевле глянцевых аналогов',
    detail: () =>
      import('./stretch-ceiling-detail/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-2.jpg',
    images: ['/catalog/image-2.jpg', '/catalog/image-3.jpg', '/catalog/image-4.jpg', '/catalog/image-1.jpg'],
  },

  // {
  //   types: [
  //     StretchCeilingsType.Matte,

  //     StretchCeilingsType.Kitchen,
  //     StretchCeilingsType.Corridor,
  //     StretchCeilingsType.Bathroom,
  //     StretchCeilingsType.Bedroom,
  //     StretchCeilingsType.Nursery,
  //     StretchCeilingsType.LivingRoom,
  //    // StretchCeilingsType.House,
  //   ],
  //   key: 'pvc-stretch-ceilings',
  //   title: 'ПВХ натяжные потолки',
  //   brief:
  //     'Это эластичное полотно из поливинилхлорида, которое натягивается под нагревом (тепловой пушкой) на каркас, образуя идеально ровную поверхность',
  //   detail: () => import('./stretch-ceilings/pvc-stretch-ceilings/pvc-stretch-ceilings').then((a) => a.Detail),
  //   image: '/img/work-types-4.jpg',
  //   images: [],
  // },

  {
    types: [
      StretchCeilingsType.LightLines,

      // Нужно сделат отдельную страницу по ним
      StretchCeilingsType.LightLinesSlott, // Световые линии SLOTT*
      StretchCeilingsType.LightLinesFlexy, // Световые линии Flexy*

      StretchCeilingsType.Kitchen,
      StretchCeilingsType.Corridor,
      //StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'light-lines',
    title: 'Световые линии',
    brief:
      'Современная система освещения, при которой светодиодная лента устанавливается в специальный алюминиевый профиль, встроенный вровень с натяжным потолком. Они создают непрерывные, четкие светящиеся полосы (прямые, ломаные или криволинейные)',
    detail: () => import('./stretch-ceiling-detail/light-lines/light-lines').then((a) => a.Detail),
    image: '/catalog/image-36.jpg',
    images: [
      '/catalog/image-36.jpg',
      '/catalog/image-37.jpg',
      '/catalog/image-39.jpg',
      '/catalog/image-31.jpg',
      '/catalog/image-26.jpg',
      '/catalog/image-34.jpg',
    ],
  },

  {
    types: [
      StretchCeilingsType.Matte,

      StretchCeilingsType.Fabric,

      StretchCeilingsType.Kitchen,
      StretchCeilingsType.Corridor,
      //StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'fabric-stretch-ceilings',
    title: 'Тканевые натяжные потолки',
    brief:
      'Экологичные, прочные и «дышащие» потолочные покрытия из полиэстера с полиуретановой пропиткой. Они имеют матовую фактуру, монтируются без нагрева («холодный монтаж»), устойчивы к перепадам температур и не имеют запаха.',
    detail: () =>
      import('./stretch-ceiling-detail/fabric-stretch-ceilings/fabric-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-17.jpg',
    images: ['/catalog/image-17.jpg', '/catalog/image-7.jpg'],
  },

  ////
  {
    types: [
      StretchCeilingsType.Glossy,

      StretchCeilingsType.Kitchen,
      StretchCeilingsType.Corridor,
      StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'glossy-stretch-ceilings',
    title: 'Глянцевые натяжные потолки',
    brief:
      'Это зеркальное покрытие с высоким коэффициентом отражения (до 90–95%), которое визуально удваивает высоту и освещенность комнаты. Они водонепроницаемы, прочны, скрывают дефекты чернового потолка и монтируются за несколько часов',
    detail: () =>
      import('./stretch-ceiling-detail/glossy-stretch-ceilings/glossy-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-12.jpg',
    images: ['/catalog/image-12.jpg', '/catalog/image-16.jpg', '/catalog/image-18.jpg', '/catalog/image-14.jpg'],
  },

  {
    types: [
      // StretchCeilingsType.Matte,

      StretchCeilingsType.ShadowKRAAB,

      StretchCeilingsType.Kitchen,
      StretchCeilingsType.Corridor,
      StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'shadow-stretch-ceilings',
    title: 'Теневые натяжные потолки',
    brief:
      'Это современная технология монтажа, создающая эффект парения полотна за счет небольшого зазора (5–7 мм) между стеной и потолком. Создает четкую черную теневую линию по периметру',
    detail: () =>
      import('./stretch-ceiling-detail/shadow-stretch-ceilings/shadow-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-3.jpg',
    images: ['/catalog/image-3.jpg', '/catalog/image-41.jpg', '/catalog/image-42.jpg'],
  },

  {
    types: [
      StretchCeilingsType.Floating,

      StretchCeilingsType.Kitchen,
      StretchCeilingsType.Corridor,
      StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'floating-suspended-ceiling',
    title: 'Парящий натяжной потолок',
    brief:
      'Создают эффект «отрыва» полотна от стен благодаря скрытой светодиодной ленте по периметру. За счет специального профиля свет направлен на стену, формируя мягкий ореол, что визуально расширяет пространство.',
    detail: () =>
      import('./stretch-ceiling-detail/floating-suspended-ceiling/floating-suspended-ceiling').then((a) => a.Detail),
    image: '/catalog/image-21.jpg',
    images: [
      '/catalog/image-21.jpg',
      '/catalog/image-23.jpg',
      '/catalog/image-27.jpg',
      '/catalog/image-28.jpg',
      '/catalog/image-29.jpg',
      '/catalog/image-30.jpg',
      '/catalog/image-20.jpg',
    ],
  },

  // {
  //   types: [
  //     // StretchCeilingsType.Matte,

  //     StretchCeilingsType.Kitchen,
  //     StretchCeilingsType.Corridor,
  //     StretchCeilingsType.Bathroom,
  //     StretchCeilingsType.Bedroom,
  //     StretchCeilingsType.Nursery,
  //     StretchCeilingsType.LivingRoom,
  //     // StretchCeilingsType.House,
  //   ],
  //   key: 'floating-stretch-ceilings',
  //   title: 'Парящие натяжные потолки',
  //   brief:
  //     'Конструкция со специальным профилем, создающая зазор между стеной и полотном, в который устанавливается светодиодная лента. Подсветка создает мягкий ореол, визуально отделяющий потолок от стен',
  //   detail: () =>
  //     import('./stretch-ceilings/floating-stretch-ceilings/floating-stretch-ceilings').then((a) => a.Detail),
  //   image: '/catalog/image-21',
  //   images: ['/catalog/image-21', '/catalog/', '/catalog/', '/catalog/'],
  // },

  {
    types: [
      StretchCeilingsType.Satin,

      StretchCeilingsType.Kitchen,
      StretchCeilingsType.Corridor,
      StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'satin-stretch-ceilings',
    title: 'Сатиновые натяжные потолки',
    brief:
      'ПВХ-пленка с особой фактурой, имитирующей ткань, которая занимает промежуточное место между матовыми и глянцевыми покрытиями. Они отличаются гладкой поверхностью, легким перламутровым блеском, мягким рассеиванием света, не создавая резких бликов',
    detail: () =>
      import('./stretch-ceiling-detail/satin-stretch-ceilings/satin-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-7.jpg',
    images: ['/catalog/image-7.jpg', '/catalog/image-11.jpg', '/catalog/image-9.jpg', '/catalog/image-13.jpg'],
  },

  {
    types: [
      // StretchCeilingsType.Matte,

      StretchCeilingsType.TwoTiered,

      StretchCeilingsType.Kitchen,
      // StretchCeilingsType.Corridor,
      //StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'two-level-stretch-ceilings',
    title: 'Двухуровневые натяжные потолки',
    brief:
      'Конструктивная система из двух (или более) ярусов, расположенных на разной высоте. Они создают уникальный дизайн, скрывают коммуникации. Чаще всего изготавливаются с применением гипсокартонных коробов или специальных профилей',
    detail: () =>
      import('./stretch-ceiling-detail/two-level-stretch-ceilings/two-level-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/image-29.jpg',
    images: ['/catalog/image-29.jpg', '/catalog/image-24.jpg', '/catalog/image-30.jpg', '/catalog/image-20.jpg'],
  },

  // {
  //   types: [
  //     // StretchCeilingsType.Matte,

  //     StretchCeilingsType.MultiLevel,

  //     StretchCeilingsType.Kitchen,
  //     //StretchCeilingsType.Corridor,
  //     //StretchCeilingsType.Bathroom,
  //     StretchCeilingsType.Bedroom,
  //     StretchCeilingsType.Nursery,
  //     StretchCeilingsType.LivingRoom,
  //     //StretchCeilingsType.House,
  //   ],
  //   key: 'multi-level-stretch-ceilings',
  //   title: 'Многоуровневые натяжные потолки',
  //   brief:
  //     'Конструкции из двух и более ярусов (обычно натяжных или гипсокартонных), расположенных на разной высоте. Они зонируют пространство, скрывают проводку/трубы, но требуют высоких потолков (от 2.7–3 м).',
  //   detail: () =>
  //     import('./stretch-ceilings/multi-level-stretch-ceilings/multi-level-stretch-ceilings').then((a) => a.Detail),
  //   image: '/img/work-types-4.jpg',
  //   images: ['/catalog/', '/catalog/', '/catalog/', '/catalog/'],
  // },

  {
    types: [
      StretchCeilingsType.InternalLighting,

      StretchCeilingsType.Kitchen,
      StretchCeilingsType.Corridor,
      StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'ceilings-with-internal-lighting',
    title: 'Потолки с подсветкой внутри',
    brief:
      'Это современное решение, где источник света размещается за полотном потолка. Светодиоды равномерно рассеиваются через полупрозрачную ткань или пленку, создавая мягкое, атмосферное освещение',
    detail: () =>
      import('./stretch-ceiling-detail/ceilings-with-internal-lighting/ceilings-with-internal-lighting').then(
        (a) => a.Detail
      ),
    image: '/catalog/image-43.jpg',
    images: ['/catalog/image-43.jpg', '/catalog/image-44.jpg', '/catalog/image-45.jpg'],
  },

  {
    types: [
      StretchCeilingsType.Contour,

      StretchCeilingsType.Kitchen,
      StretchCeilingsType.Corridor,
      //StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'ceilings-with-contour-lighting',
    title: 'Потолки с контурной подсветкой',
    brief:
      'Вид натяжных потолков, где светодиодная лента устанавливается в специальный скрытый профиль по периметру. В отличие от [парящего потолка], контурный дает чёткую светящуюся линию, а не рассеянный свет',
    detail: () =>
      import('./stretch-ceiling-detail/ceilings-with-contour-lighting/ceilings-with-contour-lighting').then(
        (a) => a.Detail
      ),
    image: '/catalog/image-15.jpg',
    images: ['/catalog/image-15.jpg', '/catalog/image-17.jpg', '/catalog/image-27.jpg'],
  },

  // {
  //   types: [
  //     StretchCeilingsType.Textured,

  //     StretchCeilingsType.Kitchen,
  //     StretchCeilingsType.Corridor,
  //     StretchCeilingsType.Bathroom,
  //     StretchCeilingsType.Bedroom,
  //     StretchCeilingsType.Nursery,
  //     StretchCeilingsType.LivingRoom,
  //     // StretchCeilingsType.House,
  //   ],
  //   key: 'textured-stretch-ceilings',
  //   title: 'Фактурные натяжные потолки',
  //   brief:
  //     'ПВХ-пленки с объемным рельефом или узором, имитирующие натуральные материалы (кожу, камень, дерево, текстиль). Они создают «живой» 3D-эффект, позволяют реализовать оригинальный дизайн',
  //   detail: () =>
  //     import('./stretch-ceilings/textured-stretch-ceilings/textured-stretch-ceilings').then((a) => a.Detail),
  //   image: '/img/work-types-4.jpg',
  //   images: ['/catalog/', '/catalog/', '/catalog/', '/catalog/'],
  // },

  // {
  //   types: [
  //     StretchCeilingsType.Slott,

  //     StretchCeilingsType.Kitchen,
  //     StretchCeilingsType.Corridor,
  //     StretchCeilingsType.Bathroom,
  //     StretchCeilingsType.Bedroom,
  //     StretchCeilingsType.Nursery,
  //     StretchCeilingsType.LivingRoom,
  //     // StretchCeilingsType.House,
  //   ],
  //   key: 'textured-stretch-ceilings',
  //   title: 'Система SLOTT',
  //   brief:
  //     'Премиальная демпферная система алюминиевых профилей для натяжных потолков, позволяющая создавать четкие, безщелевые световые ниши, черные трековые линии (например, ProektPro) и многоуровневые конструкции',
  //   detail: () =>
  //     import('./stretch-ceilings/textured-stretch-ceilings/textured-stretch-ceilings').then((a) => a.Detail),
  //   image: '/img/work-types-1.jpg',
  //   images: ['/catalog/', '/catalog/', '/catalog/', '/catalog/'],
  // },

  // {
  //   types: [
  //     StretchCeilingsType.Flexy,

  //     StretchCeilingsType.Kitchen,
  //     StretchCeilingsType.Corridor,
  //     StretchCeilingsType.Bathroom,
  //     StretchCeilingsType.Bedroom,
  //     StretchCeilingsType.Nursery,
  //     StretchCeilingsType.LivingRoom,
  //     // StretchCeilingsType.House,
  //   ],
  //   key: 'textured-stretch-ceilings',
  //   title: 'Система Flexy',
  //   brief:
  //     'Премиальная демпферная система алюминиевых профилей для натяжных потолков, позволяющая создавать четкие, безщелевые световые ниши, черные трековые линии (например, ProektPro) и многоуровневые конструкции',
  //   detail: () =>
  //     import('./stretch-ceilings/textured-stretch-ceilings/textured-stretch-ceilings').then((a) => a.Detail),
  //   image: '/img/work-types-1.jpg',
  //   images: ['/catalog/', '/catalog/', '/catalog/', '/catalog/'],
  // },

  {
    types: [
      // StretchCeilingsType.Matte,

      StretchCeilingsType.StarrySky,

      //StretchCeilingsType.Kitchen,
      //StretchCeilingsType.Corridor,
      //StretchCeilingsType.Bathroom,
      StretchCeilingsType.Bedroom,
      StretchCeilingsType.Nursery,
      //StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'starry-sky-ceilings',
    title: 'Потолки "звездное небо"',
    brief:
      'Эффектный элемент декора, создающий иллюзию ночного неба с мерцающими звездами с помощью оптоволокна или светодиодов. Используется в спальнях, детских и кинотеатрах.',
    detail: () => import('./stretch-ceiling-detail/starry-sky-ceilings/starry-sky-ceilings').then((a) => a.Detail),
    image: '/catalog/image-22.jpg',
    images: ['/catalog/image-22.jpg', '/catalog/image-46.jpg', '/catalog/image-47.jpg'],
  },
];

// Потолки по тгруппам
export const stretchCeilingGroupMap: Map<StretchCeilingsGroup, StretchCeilingsType[]> = new Map([
  [
    StretchCeilingsGroup.ByTexture,
    [
      StretchCeilingsType.Matte,
      StretchCeilingsType.Glossy,
      StretchCeilingsType.Satin,
      StretchCeilingsType.Textured,
      StretchCeilingsType.Fabric,
    ],
  ],
  [
    StretchCeilingsGroup.WithBacklight,
    [
      StretchCeilingsType.Floating,
      //StretchCeilingsType.LightLines,
      StretchCeilingsType.Contour,
      StretchCeilingsType.InternalLighting,

      StretchCeilingsType.LightLines,
      // TODO потом добавить информацию по этим двум потолкам
      // StretchCeilingsType.LightLinesSlott,
      // StretchCeilingsType.LightLinesFlexy,
    ],
  ],
  [
    StretchCeilingsGroup.Premium,
    [
      StretchCeilingsType.ShadowKRAAB,
      StretchCeilingsType.Gapless,
      StretchCeilingsType.WithPhotoPrinting,
      StretchCeilingsType.TwoTiered,
      StretchCeilingsType.MultiLevel,
      StretchCeilingsType.StarrySky,
    ],
  ],
  // [
  //   StretchCeilingsGroup.ByPremises,
  //   [
  //     StretchCeilingsType.Kitchen,
  //     StretchCeilingsType.Corridor,
  //     StretchCeilingsType.Bathroom,
  //     StretchCeilingsType.Bedroom,
  //     StretchCeilingsType.Nursery,
  //     StretchCeilingsType.LivingRoom,
  //   ],
  // ],
  // [ StretchCeilingsGroup.Fabric, [StretchCeilingsType.Fabric, StretchCeilingsType.DPremium, StretchCeilingsType.Clipso, StretchCeilingsType.Cerutti]],
] as const);

export const stretchCeilingName: Partial<Record<StretchCeilingsType, string>> = {
  // ПВХ
  [StretchCeilingsType.Matte]: 'Матовые',
  [StretchCeilingsType.MatteColor]: 'Матовые цветной',
  [StretchCeilingsType.Glossy]: 'Глянцевые цветной',
  [StretchCeilingsType.GlossyColor]: 'Глянцевые',
  [StretchCeilingsType.Satin]: 'Сатиновые',
  [StretchCeilingsType.SatinColor]: 'Сатиновые цветной',
  [StretchCeilingsType.Textured]: 'Фактурные',

  // Тканевые
  [StretchCeilingsType.Fabric]: 'Тканевые',
  [StretchCeilingsType.DPremium]: 'D-Premium',
  [StretchCeilingsType.Clipso]: 'Clipso',
  [StretchCeilingsType.Cerutti]: 'Cerutti',

  // Премиум/Эксклюзивные потолки
  [StretchCeilingsType.Gapless]: 'Бесщелевые',
  // [StretchCeilingsType.WithPhotoPrinting]: 'С фотопечатью',

  // По типу помещений
  [StretchCeilingsType.Kitchen]: 'На кухню',
  [StretchCeilingsType.Corridor]: 'В коридор',
  [StretchCeilingsType.Bathroom]: 'В ванную',
  [StretchCeilingsType.Bedroom]: 'В спальню',
  [StretchCeilingsType.Nursery]: 'В детскую',
  [StretchCeilingsType.LivingRoom]: 'В гостиную',
  // [StretchCeilingsType.House]: 'В доме',

  // ByDesign[По конструкции]
  [StretchCeilingsType.TwoTiered]: 'Двухуровневые без подсветки',
  [StretchCeilingsType.TwoTieredWithBacklight]: 'с подсветкой',
  [StretchCeilingsType.TwoTieredWithBacklightNiche]: 'Двухуровневые с подсветкой в нише',
  [StretchCeilingsType.MultiLevel]: 'Многоуровневый натяжной потолок',
  [StretchCeilingsType.CurvedTransition]: 'Криволинейный переход',
  [StretchCeilingsType.DoubleVision]: 'Double Vision',
  [StretchCeilingsType.ShadowKRAAB]: 'Теневые Euro Kraab',
  [StretchCeilingsType.WithPhotoPrinting]: 'С фотопечатью',
  [StretchCeilingsType.Acoustic]: 'Акустические',

  // С подсветкой
  [StretchCeilingsType.Floating]: 'Парящие',
  [StretchCeilingsType.Contour]: 'C контурной подсветкой',
  [StretchCeilingsType.LightLines]: 'Световые линии',
  [StretchCeilingsType.LightLinesSlott]: 'Световые линии SLOTT',
  [StretchCeilingsType.LightLinesFlexy]: 'Световые линии Flexy',
  [StretchCeilingsType.InternalLighting]: 'C подсветкой внутри',
  [StretchCeilingsType.Transparent]: 'Светопрозрачный потоло',
  [StretchCeilingsType.WithIlluminationCanvas]: 'С подсветкой через полотно',
  [StretchCeilingsType.StarrySky]: 'Звездное небо',

  // [StretchCeilingsType.Lightbox]: 'Лайтбокс',
} as const;

export const stretchCeilingsGroupName = {
  [StretchCeilingsGroup.ByTexture]: 'По фактуре',
  [StretchCeilingsGroup.WithBacklight]: 'С подсветкой',
  [StretchCeilingsGroup.Premium]: 'Премиум', // Эксклюзивные потолки
  [StretchCeilingsGroup.ByPremises]: 'По типу помещений',
} as const;

export enum STPriceGroup {
  // По материалу
  PVC = 1, //  ПВХ(материал)
  Fabric, //  Тканевые(материал)
  Satin, //  Сатиновые(материал)*

  // По типу поверхности
  Matte, // Матовые(тип поверхности)*
  Glossy, // Глянцевые(тип поверхности)*
  Textured, // Фактурные(тип поверхности)*

  // С подсветкой
  WithBacklight,

  // По конструкции
  ByDesign,

  // Эксклюзивные
  // Exclusive,

  // Дополнительные работы
  AdditionalWork,

  // Электрооборудование
  ElectricalEquipment,

  // Блоки питания Ip20
  PowerSupplies,
}

export const stretchCeilingGroupName = {
  [STPriceGroup.PVC]: 'ПВХ',
  [STPriceGroup.Fabric]: 'Тканевые',
  [STPriceGroup.Satin]: 'Сатиновые',

  [STPriceGroup.Matte]: 'Матовые',
  [STPriceGroup.Glossy]: 'Глянцевые',
  [STPriceGroup.Textured]: 'Фактурные',

  [STPriceGroup.WithBacklight]: 'С подсветкой',
  [STPriceGroup.ByDesign]: 'По конструкции',
  // [STPriceGroup.Exclusive]: 'Эксклюзивные',
  [STPriceGroup.AdditionalWork]: 'Дополнительные работы',
  [STPriceGroup.ElectricalEquipment]: 'Электрооборудование',
  [STPriceGroup.PowerSupplies]: 'Блоки питания',
} as const;
