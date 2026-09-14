/* Интерактив макета «оригинал 5» на чистом JS (вместо React + framer-motion).

   - мобильное меню: кнопка «меню» ↔ «крестик», полноэкранная панель с разделами,
     клик по пункту закрывает панель;
   - отзывы: переключение точками (таймера в оригинале нет).
   Больше обработчиков в App.tsx нет: «Confirm Consultation» и поля записи ничего не делают. */
(() => {
  // Отзывы — массив `ht` из кода оригинала.
  const TESTIMONIALS = [
    {
      name: 'Priya Malhotra',
      role: 'Senior Interior Designer · Delhi',
      text: "SanCurtains transformed my client's penthouse into a palace. The Velvet Royale drapes are exquisite — the craftsmanship is unlike anything I have encountered in 15 years of design work.",
      initials: 'PM',
    },
    {
      name: 'Rahul Singhania',
      role: 'Luxury Hotelier · Mumbai',
      text: 'We ordered bespoke drapes for all 48 suites of our property. Delivery was precise, installation was immaculate, and our guests constantly remark on the ambiance. Worth every rupee.',
      initials: 'RS',
    },
    {
      name: 'Ananya Kapoor',
      role: 'Principal Architect · Bangalore',
      text: 'The Silk Cascade collection is breathtaking. I specified them for a heritage bungalow restoration — they elevated the entire space to museum-quality grandeur.',
      initials: 'AK',
    },
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const swap = (el, from, to) => {
    from.forEach((c) => el.classList.remove(c));
    to.forEach((c) => el.classList.add(c));
  };

  // Панель меню: framer-motion ведёт opacity за 0.3 с, pointer-events меняет сразу.
  // Кривая замерена покадрово в оригинале (0.5 на ~110 мс) — это ease-out, не ease-in-out.
  const PANEL_OPEN = ['[opacity:1]', '[pointer-events:all]'];
  const PANEL_CLOSED = ['[opacity:0]', '[pointer-events:none]'];
  const PANEL_TRANSITION = '[transition:opacity_0.3s_ease-out]';
  const DOT_ON = ['[width:32px]', '[background:rgb(201,_168,_76)]'];
  const DOT_OFF = ['[width:8px]', '[background:rgba(201,_168,_76,_0.25)]'];

  // Классы, которые появляются только при взаимодействии, — прогреваем заранее,
  // иначе браузерный Tailwind сгенерирует их с опозданием и первый переход не проиграется.
  const preload = document.createElement('div');
  preload.hidden = true;
  preload.className = [...PANEL_OPEN, PANEL_TRANSITION].join(' ');
  document.body.appendChild(preload);

  // Иконки lucide-react 0.487: Menu и X — те же пути, что в бандле оригинала.
  const ICON_MENU = '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>';
  const ICON_X = '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';

  // ---------- мобильное меню ----------
  const nav = $('nav');
  const toggle = nav && $$('button', nav).find((b) => $('svg.lucide-menu', b));
  // Панель — соседний с шапкой fixed-блок с теми же пунктами разделов.
  const panel = nav && [...document.querySelectorAll('div')].find((d) => d.previousElementSibling === nav && $('a[href="#collections"]', d));
  if (toggle && panel) {
    panel.classList.add(PANEL_TRANSITION);
    let open = false;
    const render = () => {
      swap(panel, open ? PANEL_CLOSED : PANEL_OPEN, open ? PANEL_OPEN : PANEL_CLOSED);
      const svg = $('svg', toggle);
      svg.innerHTML = open ? ICON_X : ICON_MENU;
      svg.classList.toggle('lucide-x', open);
      svg.classList.toggle('lucide-menu', !open);
    };
    toggle.addEventListener('click', () => {
      open = !open;
      render();
    });
    for (const a of $$('a', panel)) {
      a.addEventListener('click', () => {
        open = false;
        render();
      });
    }
  }

  // ---------- отзывы ----------
  const section = $('section#testimonials');
  const avatar = section && $('.testimonial-avatar', section);
  if (avatar) {
    const card = avatar.parentElement.parentElement;
    const text = $('p', card);
    const [name, role] = [...avatar.nextElementSibling.children];
    const dots = $$(':scope > button', card.nextElementSibling ?? document.createElement('div'));
    // Карточка в React без key — узел не пересоздаётся, меняется только текст.
    const render = (i) => {
      const t = TESTIMONIALS[i];
      text.textContent = t.text;
      avatar.textContent = t.initials;
      name.textContent = t.name;
      role.textContent = t.role;
      dots.forEach((d, k) => swap(d, k === i ? DOT_OFF : DOT_ON, k === i ? DOT_ON : DOT_OFF));
    };
    dots.forEach((d, k) => d.addEventListener('click', () => render(k)));
  }
})();
