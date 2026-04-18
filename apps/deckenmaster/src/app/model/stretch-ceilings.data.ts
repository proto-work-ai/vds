import { ComponentType } from '@angular/cdk/portal';

export interface IStretchCeiling {
  key: string;
  title: string;
  image: string;
  brief: string;
  type: StretchCeilingsType[];
  technology: StretchCeilingsByTechnology[];
  detail: () => Promise<ComponentType<any>>;
}

export enum StretchCeilingsGroup {
  PVC = 1, // ПВХ(Матовые,Глянцевые,Сатиновые,Фактурные)
  Fabric, // Тканевые(Тканевые,D-Premium,Clipso,Cerutti)
  WithBacklight, // С подсветкой(Парящие,Световые линии,Лайтбокс,Контурные,SLOTT)
  Premium, // Премиум(Теневые,Бесщелевые,С фотопечатью,Двухуровневые,Звездное небо)
}

// По типу
export enum StretchCeilingsType {
  // ПВХ
  Matte = 1, // Матовые
  Glossy, // Глянцевые
  Satin, // Сатиновые
  Textured, // Фактурные

  // Тканевые
  Fabric, // Тканевые,
  DPremium, // D-Premium,
  Clipso, // Clipso,
  Cerutti, // Cerutti

  // С подсветкой
  Floating, // Парящие
  LightLines, // Световые линии
  Lightbox, // Лайтбокс
  Contour, // Контурные
  Slott, // SLOTT

  // Премиум
  Shadow, // Теневые,
  Gapless, // Бесщелевые,
  WithPhotoPrinting, // С фотопечатью,
  TwoTiered, // Двухуровневые,
  StarrySky, // Звездное небо
}

// По технологии
export enum StretchCeilingsByTechnology {
  Backlit, // С подстветкой,
  LightLines, // Световые линии,
  Shadow, // Теневой,
  MultiLevel, // Многоуровневые,
  Gapless, // Бесщелевой,
  DoubleVision, // Double Vision,
  Floating, // Парящий
  Transparent, // Светопрозрачный,
  StarrySky, // Звездное небо,
}

export const stretchCeilings: IStretchCeiling[] = [
  {
    type: [StretchCeilingsType.Matte],
    technology: [],
    key: 'matte-stretch-ceilings',
    title: 'Матовые натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'Классическое, гладкое покрытие без блеска и отражений, имитирующее идеально ровную побелку или гипсокартон. Они создают уют, не перегружают интерьер, обладают антистатическим эффектом, не выгорают и стоят дешевле глянцевых аналогов',
    detail: () => import('./stretch-ceilings/matte-stretch-ceilings/matte-stretch-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Matte],
    technology: [],
    key: 'pvc-stretch-ceilings',
    title: 'ПВХ натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'Это эластичное полотно из поливинилхлорида, которое натягивается под нагревом (тепловой пушкой) на каркас, образуя идеально ровную поверхность',
    detail: () => import('./stretch-ceilings/pvc-stretch-ceilings/pvc-stretch-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.LightLines],
    technology: [],
    key: 'light-lines',
    title: 'Световые линии',
    image: '/img/work-types-3.jpg',
    brief:
      'Современная система освещения, при которой светодиодная лента устанавливается в специальный алюминиевый профиль, встроенный вровень с натяжным потолком. Они создают непрерывные, четкие светящиеся полосы (прямые, ломаные или криволинейные)',
    detail: () => import('./stretch-ceilings/light-lines/light-lines').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Fabric],
    technology: [],
    key: 'fabric-stretch-ceilings',
    title: 'Тканевые натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'Экологичные, прочные и «дышащие» потолочные покрытия из полиэстера с полиуретановой пропиткой. Они имеют матовую фактуру, монтируются без нагрева («холодный монтаж»), устойчивы к перепадам температур и не имеют запаха.',
    detail: () => import('./stretch-ceilings/fabric-stretch-ceilings/fabric-stretch-ceilings').then((a) => a.Detail),
  },

  ////
  {
    type: [StretchCeilingsType.Glossy],
    technology: [],
    key: 'glossy-stretch-ceilings',
    title: 'Глянцевые натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'Это зеркальное покрытие с высоким коэффициентом отражения (до 90–95%), которое визуально удваивает высоту и освещенность комнаты. Они водонепроницаемы, прочны, скрывают дефекты чернового потолка и монтируются за несколько часов',
    detail: () => import('./stretch-ceilings/glossy-stretch-ceilings/glossy-stretch-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Matte],
    technology: [],
    key: 'shadow-stretch-ceilings',
    title: 'Теневые натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'Это современная технология монтажа, создающая эффект парения полотна за счет небольшого зазора (5–7 мм) между стеной и потолком. Создает четкую черную теневую линию по периметру',
    detail: () => import('./stretch-ceilings/shadow-stretch-ceilings/shadow-stretch-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Floating],
    technology: [],
    key: 'floating-suspended-ceiling',
    title: 'Парящий натяжной потолок',
    image: '/img/work-types-2.jpg',
    brief:
      'Создают эффект «отрыва» полотна от стен благодаря скрытой светодиодной ленте по периметру. За счет специального профиля свет направлен на стену, формируя мягкий ореол, что визуально расширяет пространство.',
    detail: () =>
      import('./stretch-ceilings/floating-suspended-ceiling/floating-suspended-ceiling').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Matte],
    technology: [],
    key: 'multi-level-stretch-ceilings',
    title: 'Многоуровневые натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'Конструкции из двух и более ярусов (обычно натяжных или гипсокартонных), расположенных на разной высоте. Они зонируют пространство, скрывают проводку/трубы, но требуют высоких потолков (от 2.7–3 м).',
    detail: () =>
      import('./stretch-ceilings/multi-level-stretch-ceilings/multi-level-stretch-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.LightLines],
    technology: [],
    key: 'ceilings-with-light-lines',
    title: 'Потолки со световыми линиями',
    image: '/img/work-types-4.jpg',
    brief:
      'Это современный вид освещения, при котором светодиодная лента устанавливается в специальный алюминиевый профиль, вмонтированный в натяжное полотно. Световые линии создают светящиеся полосы, служащие как основным освещением, так и стильным зонированием',
    detail: () =>
      import('./stretch-ceilings/ceilings-with-light-lines/ceilings-with-light-lines').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Satin],
    technology: [],
    key: 'satin-stretch-ceilings',
    title: 'Сатиновые натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'ПВХ-пленка с особой фактурой, имитирующей ткань, которая занимает промежуточное место между матовыми и глянцевыми покрытиями. Они отличаются гладкой поверхностью, легким перламутровым блеском, мягким рассеиванием света, не создавая резких бликов',
    detail: () => import('./stretch-ceilings/satin-stretch-ceilings/satin-stretch-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Matte],
    technology: [],
    key: 'two-level-stretch-ceilings',
    title: 'Двухуровневые натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'Конструктивная система из двух (или более) ярусов, расположенных на разной высоте. Они создают уникальный дизайн, скрывают коммуникации. Чаще всего изготавливаются с применением гипсокартонных коробов или специальных профилей',
    detail: () =>
      import('./stretch-ceilings/two-level-stretch-ceilings/two-level-stretch-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Matte],
    technology: [],
    key: 'floating-stretch-ceilings',
    title: 'Парящие натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'Конструкция со специальным профилем, создающая зазор между стеной и полотном, в который устанавливается светодиодная лента. Подсветка создает мягкий ореол, визуально отделяющий потолок от стен',
    detail: () =>
      import('./stretch-ceilings/floating-stretch-ceilings/floating-stretch-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.LightLines],
    technology: [],
    key: 'ceilings-with-internal-lighting',
    title: 'Потолки с подсветкой внутри',
    image: '/img/work-types-4.jpg',
    brief:
      'Это современное решение, где источник света размещается за полотном потолка. Светодиоды равномерно рассеиваются через полупрозрачную ткань или пленку, создавая мягкое, атмосферное освещение',
    detail: () =>
      import('./stretch-ceilings/ceilings-with-internal-lighting/ceilings-with-internal-lighting').then(
        (a) => a.Detail
      ),
  },

  {
    type: [StretchCeilingsType.Contour],
    technology: [],
    key: 'ceilings-with-contour-lighting',
    title: 'Потолки с контурной подсветкой',
    image: '/img/work-types-4.jpg',
    brief:
      'Вид натяжных потолков, где светодиодная лента устанавливается в специальный скрытый профиль по периметру. В отличие от [парящего потолка], контурный дает чёткую светящуюся линию, а не рассеянный свет',
    detail: () =>
      import('./stretch-ceilings/ceilings-with-contour-lighting/ceilings-with-contour-lighting').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Matte],
    technology: [],
    key: 'starry-sky-ceilings',
    title: 'Потолки "звездное небо"',
    image: '/img/work-types-4.jpg',
    brief:
      'Эффектный элемент декора, создающий иллюзию ночного неба с мерцающими звездами с помощью оптоволокна или светодиодов. Используется в спальнях, детских и кинотеатрах.',
    detail: () => import('./stretch-ceilings/starry-sky-ceilings/starry-sky-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Textured],
    technology: [],
    key: 'textured-stretch-ceilings',
    title: 'Фактурные натяжные потолки',
    image: '/img/work-types-4.jpg',
    brief:
      'ПВХ-пленки с объемным рельефом или узором, имитирующие натуральные материалы (кожу, камень, дерево, текстиль). Они создают «живой» 3D-эффект, позволяют реализовать оригинальный дизайн',
    detail: () =>
      import('./stretch-ceilings/textured-stretch-ceilings/textured-stretch-ceilings').then((a) => a.Detail),
  },

  {
    type: [StretchCeilingsType.Slott],
    technology: [],
    key: 'textured-stretch-ceilings',
    title: 'Система SLOTT',
    image: '/img/work-types-1.jpg',
    brief:
      'Премиальная демпферная система алюминиевых профилей для натяжных потолков, позволяющая создавать четкие, безщелевые световые ниши, черные трековые линии (например, ProektPro) и многоуровневые конструкции',
    detail: () =>
      import('./stretch-ceilings/textured-stretch-ceilings/textured-stretch-ceilings').then((a) => a.Detail),
  },
];
