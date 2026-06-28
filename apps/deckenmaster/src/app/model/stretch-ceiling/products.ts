import { IContentType } from './common';
import { ProductType } from './product-types';

// Страницы по потолками
export const stretchCeilingAll: IContentType[] = [
  {
    types: [
      ProductType.Matte,

      ProductType.Kitchen,
      ProductType.Corridor,
      ProductType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'matte-stretch-ceilings',
    title: 'Матовые натяжные потолки',
    brief:
      'Классическое, гладкое покрытие без блеска и отражений, имитирующее идеально ровную побелку или гипсокартон. Они создают уют, не перегружают интерьер, обладают антистатическим эффектом, не выгорают и стоят дешевле глянцевых аналогов',
    detail: () => import('./details/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/matte-stretch-ceilings/image-1.jpg',
    images: [
      '/catalog/matte-stretch-ceilings/image-1.jpg',
      '/catalog/matte-stretch-ceilings/image-2.png',
      '/catalog/matte-stretch-ceilings/image-4.png',
      '/catalog/matte-stretch-ceilings/image-5.png',
      '/catalog/matte-stretch-ceilings/image-6.png',
      '/catalog/matte-stretch-ceilings/image-7.png',
      '/catalog/matte-stretch-ceilings/image-8.png',
      '/catalog/matte-stretch-ceilings/image-9.png'
    ],
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
      ProductType.LightLines,

      // Нужно сделат отдельную страницу по ним
      ProductType.LightLinesSlott, // Световые линии SLOTT*
      ProductType.LightLinesFlexy, // Световые линии Flexy*

      ProductType.Kitchen,
      ProductType.Corridor,
      //StretchCeilingsType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'light-lines',
    title: 'Световые линии',
    brief:
      'Современная система освещения, при которой светодиодная лента устанавливается в специальный алюминиевый профиль, встроенный вровень с натяжным потолком. Они создают непрерывные, четкие светящиеся полосы (прямые, ломаные или криволинейные)',
    detail: () => import('./details/light-lines/light-lines').then((a) => a.Detail),
    image: '/catalog/light-lines/image-1.jpg',
    images: [
      '/catalog/light-lines/image-1.jpg',
      '/catalog/light-lines/image-2.png',
      '/catalog/light-lines/image-3.png',
      '/catalog/light-lines/image-4.png',
      '/catalog/light-lines/image-5.png',
      '/catalog/light-lines/image-6.png',
      '/catalog/light-lines/image-7.png',
      '/catalog/light-lines/image-8.jpg',
      '/catalog/light-lines/image-9.jpg',
      '/catalog/light-lines/image-10.jpg',
      '/catalog/light-lines/image-11.jpg',
      '/catalog/light-lines/image-12.jpg',
      '/catalog/light-lines/image-13.jpg',
    ],
  },

  {
    types: [
      ProductType.Fabric,
      // ProductType.Matte,

      ProductType.Kitchen,
      ProductType.Corridor,
      //StretchCeilingsType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'fabric-stretch-ceilings',
    title: 'Тканевые натяжные потолки',
    brief:
      'Экологичные, прочные и «дышащие» потолочные покрытия из полиэстера с полиуретановой пропиткой. Они имеют матовую фактуру, монтируются без нагрева («холодный монтаж»), устойчивы к перепадам температур и не имеют запаха.',
    detail: () => import('./details/fabric-stretch-ceilings/fabric-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/fabric-stretch-ceilings/image-1.jpg',
    images: [
      '/catalog/fabric-stretch-ceilings/image-1.jpg',
      '/catalog/fabric-stretch-ceilings/image-2.jpg',
      '/catalog/fabric-stretch-ceilings/image-3.jpg',
    ],
  },

  ////
  {
    types: [
      ProductType.Glossy,
      ProductType.GlossyColor,
      // ProductType.GalaxyGlossyColor,

      ProductType.Kitchen,
      ProductType.Corridor,
      ProductType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'glossy-stretch-ceilings',
    title: 'Глянцевые натяжные потолки',
    brief:
      'Это зеркальное покрытие с высоким коэффициентом отражения (до 90–95%), которое визуально удваивает высоту и освещенность комнаты. Они водонепроницаемы, прочны, скрывают дефекты чернового потолка и монтируются за несколько часов',
    detail: () => import('./details/glossy-stretch-ceilings/glossy-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/glossy-stretch-ceilings/image-1.jpg',
    images: [
      '/catalog/glossy-stretch-ceilings/image-1.jpg',
      '/catalog/glossy-stretch-ceilings/image-2.jpg',
    ],
  },

  {
    types: [
      ProductType.ShadowKRAAB,

      ProductType.Kitchen,
      ProductType.Corridor,
      ProductType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'shadow-stretch-ceilings',
    title: 'Теневые натяжные потолки',
    brief:
      'Это современная технология монтажа, создающая эффект парения полотна за счет небольшого зазора (5–7 мм) между стеной и потолком. Создает четкую черную теневую линию по периметру',
    detail: () => import('./details/shadow-stretch-ceilings/shadow-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/shadow-stretch-ceilings/image-1.jpg',
    images: [
      '/catalog/shadow-stretch-ceilings/image-1.jpg',
      '/catalog/shadow-stretch-ceilings/image-2.jpg',
      '/catalog/shadow-stretch-ceilings/image-3.png',
      '/catalog/shadow-stretch-ceilings/image-4.png',
    ],
  },

  {
    types: [
      ProductType.Satin,

      ProductType.Kitchen,
      ProductType.Corridor,
      ProductType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'satin-stretch-ceilings',
    title: 'Сатиновые натяжные потолки',
    brief:
      'ПВХ-пленка с особой фактурой, имитирующей ткань, которая занимает промежуточное место между матовыми и глянцевыми покрытиями. Они отличаются гладкой поверхностью, легким перламутровым блеском, мягким рассеиванием света, не создавая резких бликов',
    detail: () => import('./details/satin-stretch-ceilings/satin-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/satin-stretch-ceilings/image-1.jpg',
    images: ['/catalog/satin-stretch-ceilings/image-1.jpg', '/catalog/satin-stretch-ceilings/image-2.jpg'],
  },

  {
    types: [
      ProductType.Floating,

      ProductType.Kitchen,
      ProductType.Corridor,
      ProductType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'floating-suspended-ceiling',
    title: 'Парящий натяжной потолок',
    brief:
      'Создают эффект «отрыва» полотна от стен благодаря скрытой светодиодной ленте по периметру. За счет специального профиля свет направлен на стену, формируя мягкий ореол, что визуально расширяет пространство.',
    detail: () => import('./details/floating-suspended-ceiling/floating-suspended-ceiling').then((a) => a.Detail),
    image: '/catalog/floating-suspended-ceiling/image-1.jpg',
    images: [
      '/catalog/floating-suspended-ceiling/image-1.jpg',
      '/catalog/floating-suspended-ceiling/image-2.jpg',
      '/catalog/floating-suspended-ceiling/image-3.jpg',
      '/catalog/floating-suspended-ceiling/image-4.jpg',
      '/catalog/floating-suspended-ceiling/image-5.jpg',
      '/catalog/floating-suspended-ceiling/image-6.jpg',
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
      // StretchCeilingsType.Matte,

      ProductType.TwoTiered,

      ProductType.Kitchen,
      // StretchCeilingsType.Corridor,
      //StretchCeilingsType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'two-level-stretch-ceilings',
    title: 'Двухуровневые натяжные потолки',
    brief:
      'Конструктивная система из двух (или более) ярусов, расположенных на разной высоте. Они создают уникальный дизайн, скрывают коммуникации. Чаще всего изготавливаются с применением гипсокартонных коробов или специальных профилей',
    detail: () => import('./details/two-level-stretch-ceilings/two-level-stretch-ceilings').then((a) => a.Detail),
    image: '/catalog/two-level-stretch-ceilings/image-1.jpg',
    images: [
      '/catalog/two-level-stretch-ceilings/image-1.jpg',
      '/catalog/two-level-stretch-ceilings/image-2.jpg',
      '/catalog/two-level-stretch-ceilings/image-4.jpg',
      '/catalog/two-level-stretch-ceilings/image-5.jpg',
      '/catalog/two-level-stretch-ceilings/image-6.jpg',
      // '/catalog/two-level-stretch-ceilings/image-7.png',
      // '/catalog/two-level-stretch-ceilings/image-3.jpg',
      // '/catalog/two-level-stretch-ceilings/image-8.png',
    ],
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
      ProductType.InternalLighting,

      ProductType.Kitchen,
      ProductType.Corridor,
      ProductType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'ceilings-with-internal-lighting',
    title: 'Потолки с подсветкой внутри',
    brief:
      'Это современное решение, где источник света размещается за полотном потолка. Светодиоды равномерно рассеиваются через полупрозрачную ткань или пленку, создавая мягкое, атмосферное освещение',
    detail: () =>
      import('./details/ceilings-with-internal-lighting/ceilings-with-internal-lighting').then((a) => a.Detail),
    image: '/catalog/ceilings-with-internal-lighting/image-61.jpg',
    images: [
      '/catalog/ceilings-with-internal-lighting/image-61.jpg',
      '/catalog/ceilings-with-internal-lighting/image-43.jpg',
      '/catalog/ceilings-with-internal-lighting/image-44.jpg',
      '/catalog/ceilings-with-internal-lighting/image-45.jpg',
    ],
  },

  {
    types: [
      ProductType.Contour,

      ProductType.Kitchen,
      ProductType.Corridor,
      //StretchCeilingsType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'ceilings-with-contour-lighting',
    title: 'Потолки с контурной подсветкой',
    brief:
      'Вид натяжных потолков, где светодиодная лента устанавливается в специальный скрытый профиль по периметру. В отличие от "парящего потолка", контурный дает чёткую светящуюся линию, а не рассеянный свет',
    detail: () =>
      import('./details/ceilings-with-contour-lighting/ceilings-with-contour-lighting').then((a) => a.Detail),
    image: '/catalog/ceilings-with-contour-lighting/image-1.jpg',
    images: [
      '/catalog/ceilings-with-contour-lighting/image-1.jpg',
      '/catalog/ceilings-with-contour-lighting/image-2.jpg',
      '/catalog/ceilings-with-contour-lighting/image-3.jpg',
      '/catalog/ceilings-with-contour-lighting/image-4.jpg',
    ],
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

      ProductType.StarrySky,

      //StretchCeilingsType.Kitchen,
      //StretchCeilingsType.Corridor,
      //StretchCeilingsType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      //StretchCeilingsType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'starry-sky-ceilings',
    title: 'Потолки "звездное небо"',
    brief:
      'Эффектный элемент декора, создающий иллюзию ночного неба с мерцающими звездами с помощью оптоволокна или светодиодов. Используется в спальнях, детских и кинотеатрах.',
    detail: () => import('./details/starry-sky-ceilings/starry-sky-ceilings').then((a) => a.Detail),
    image: '/catalog/starry-sky-ceilings/image-1.jpg',
    images: ['/catalog/starry-sky-ceilings/image-1.jpg', '/catalog/starry-sky-ceilings/image-2.jpg'],
  },

  /*
    https://sofimarsel.com/artprint/large-size-of-the-images/
    https://sofimarsel.com/artprint/large-size-of-the-images/
  */
  {
    types: [
      ProductType.PhotoPrinting,
      // ProductType.Matte,
      // ProductType.Glossy,

      ProductType.Kitchen,
      ProductType.Corridor,
      ProductType.Bathroom,
      ProductType.Bedroom,
      ProductType.Nursery,
      ProductType.LivingRoom,
      // StretchCeilingsType.House,
    ],
    key: 'stretch-ceiling-photo-printing',
    title: 'Натяжные потолки с фотопечатью',
    brief: `Вы хотите, чтобы ваш дом был не только уютным, но еще и отличался оригинальностью, тогда натяжные потолки с фотопечатью – это то, что вам необходимо. Для основы такой конструкции может быть взят как матовый, так и глянцевый потолок. А вот затем приходит время для проявления вашей фантазии. Изображение, нанесенное на полотно,
      отличается стойкостью к солнечным лучам, высоким качеством и простотой в уходе.⁠`,
    detail: () =>
      import('./details/stretch-ceiling-photo-printing/stretch-ceiling-photo-printing').then((a) => a.Detail),
    image: 'catalog/stretch-ceiling-photo-printing/image-1.jpg',
    images: [
      '/catalog/stretch-ceiling-photo-printing/image-1.jpg',
      '/catalog/stretch-ceiling-photo-printing/image-2.jpg',
      '/catalog/stretch-ceiling-photo-printing/image-3.jpg',
    ],
  },
];
