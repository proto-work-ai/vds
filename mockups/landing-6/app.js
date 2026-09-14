/* Интерактив макета «оригинал 6» на чистом JS (вместо React/framer-motion).

   - мобильное меню: кнопка «menu» ↔ «x», панель раскрывается по высоте и
     прозрачности за 0.35 с; клик по пункту закрывает меню (переход по якорю — штатный);
   - отзывы: смена раз в 5.5 с, клик по точкам; слайды проявляются за 0.65 с;
   - форма заявки: оригинал только отменяет отправку (страница не перезагружается).
   Значения анимаций взяты из кода оригинала. Параллакс первого экрана делает конвертер. */
(() => {
  // Данные и классы — в начале: const не поднимается, обработчики ниже их используют.
  // framer-motion: при заданной duration без ease tween идёт с "easeOut" = cubic-bezier(0,0,0.58,1).
  const MENU_TRANSITION = '[transition:height_0.35s_cubic-bezier(0,0,0.58,1),opacity_0.35s_cubic-bezier(0,0,0.58,1)]';
  // Высота «auto» анимируется в CSS только с interpolate-size — так же, как framer
  // измеряет панель и тянет высоту до её реального размера.
  const MENU_AUTO = '[interpolate-size:allow-keywords]';
  const MENU_OPEN = ['[height:auto]', '[opacity:1]'];
  const MENU_CLOSED = ['[height:0px]', '[opacity:0]'];
  const SLIDE_TRANSITION = '[transition:opacity_0.65s_cubic-bezier(0,0,0.58,1),transform_0.65s_cubic-bezier(0,0,0.58,1)]';
  const SLIDE_ON = ['[opacity:1]', '[transform:none]', 'pointer-events-auto'];
  const SLIDE_OFF = ['[opacity:0]', '[transform:translateY(16px)]', 'pointer-events-none'];
  const DOT_ON = 'transition-all duration-400 w-7 h-[3px] bg-[#C9952A]';
  const DOT_OFF = 'transition-all duration-400 w-[6px] h-[6px] rotate-45 bg-[#F2E8D5]/25 hover:bg-[#C9952A]/50';
  const TESTIMONIAL_INTERVAL = 5500;
  // Иконка lucide «x» (lucide-react 0.487) — в разметке её нет, оригинал рисует её при открытом меню.
  const ICON_X = '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const swap = (el, from, to) => {
    from.forEach((c) => el.classList.remove(c));
    to.forEach((c) => el.classList.add(c));
  };

  // Классы, появляющиеся только при взаимодействии: браузерная сборка Tailwind
  // должна сгенерировать их заранее, иначе первый переход не проиграется.
  const preload = document.createElement('div');
  preload.hidden = true;
  preload.className = [MENU_TRANSITION, MENU_AUTO, ...MENU_OPEN, SLIDE_TRANSITION, ...SLIDE_OFF, DOT_ON, DOT_OFF].join(' ');
  document.body.appendChild(preload);

  // ---------- появление при прокрутке ----------
  // Как обёртка оригинала: useInView({ once: true, margin: '-80px' }). Элемент получает
  // конечные классы, как только пересёк окно, суженное на 80px. Длительность, задержка и
  // кривая — в классе перехода; после окончания он снимается (framer не оставляет transition).
  const inview = $$('[data-inview]');
  const warm = document.createElement('div');
  warm.hidden = true;
  warm.className = inview.map((el) => el.dataset.inview).join(' ');
  document.body.appendChild(warm);
  const reveal = (el) => {
    const t = el.dataset.inview.split(/\s+/).find((c) => c.startsWith('[transition:'));
    el.className = el.dataset.inview;
    el.removeAttribute('data-inview');
    const m = t && t.match(/_([\d.]+)s_cubic-bezier\([^)]*\)_([\d.]+)s,/);
    if (m) setTimeout(() => el.classList.remove(t), (Number(m[1]) + Number(m[2])) * 1000 + 100);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (io.unobserve(e.target), reveal(e.target))),
      { rootMargin: '-80px' }
    );
    inview.forEach((el) => io.observe(el));
  } else inview.forEach(reveal);

  // ---------- мобильное меню ----------
  const burger = $('nav button[aria-label="Toggle menu"]');
  const nav = burger?.closest('nav');
  const panel = nav && [...nav.children].find((el) => el.classList.contains('overflow-hidden'));
  if (burger && panel) {
    const svg = $('svg', burger);
    const ICON_MENU = svg.innerHTML;
    let open = false;
    // Переход добавляется при первом клике: у framer высота анимируется из JS, CSS-перехода
    // на нетронутой странице нет — так вычисленные стили совпадают с оригиналом.
    panel.classList.add(MENU_AUTO);
    const render = () => {
      panel.classList.add(MENU_TRANSITION);
      swap(panel, open ? MENU_CLOSED : MENU_OPEN, open ? MENU_OPEN : MENU_CLOSED);
      svg.innerHTML = open ? ICON_X : ICON_MENU;
      svg.classList.toggle('lucide-menu', !open);
      svg.classList.toggle('lucide-x', open);
    };
    burger.addEventListener('click', () => {
      open = !open;
      render();
    });
    // Пункты и кнопка консультации закрывают меню; сам переход по #якорю — браузерный, как в оригинале.
    for (const a of $$('a', panel)) {
      a.addEventListener('click', () => {
        open = false;
        render();
      });
    }
  }

  // ---------- отзывы ----------
  const dotsBox = $('button[aria-label="Testimonial 1"]')?.parentElement;
  const slidesBox = dotsBox?.previousElementSibling;
  if (dotsBox && slidesBox) {
    const slides = [...slidesBox.children];
    const dots = [...dotsBox.children];
    let index = slides.findIndex((s) => s.classList.contains('[opacity:1]'));
    if (index < 0) index = 0;
    const render = (i) => {
      index = i;
      // Переход — только со сменой слайда: в оригинале initial: false, на старте CSS-перехода нет.
      slides.forEach((s) => s.classList.add(SLIDE_TRANSITION));
      slides.forEach((s, k) => swap(s, k === i ? SLIDE_OFF : SLIDE_ON, k === i ? SLIDE_ON : SLIDE_OFF));
      dots.forEach((d, k) => (d.className = k === i ? DOT_ON : DOT_OFF));
    };
    // Таймер в оригинале заводится один раз (useEffect с []), клик по точке его не сбрасывает.
    setInterval(() => render((index + 1) % slides.length), TESTIMONIAL_INTERVAL);
    dots.forEach((d, k) => d.addEventListener('click', () => render(k)));
  }

  // ---------- форма заявки ----------
  // Обработчик оригинала — только preventDefault: ни сообщения, ни очистки полей.
  $('section#contact form')?.addEventListener('submit', (e) => e.preventDefault());
})();
