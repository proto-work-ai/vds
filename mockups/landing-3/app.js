/* Интерактив макета «оригинал 3» на чистом JS (вместо React-компонентов).

   - мобильное меню: бургер → крестик, панель разделов под шапкой (NavBar.tsx);
   - «Scroll» внизу первого экрана — плавная прокрутка к коллекциям (HeroSection.tsx);
   - отзывы: смена раз в 6 с и клик по точкам (TestimonialsSection.tsx);
   - форма консультации: оригинал только отменяет отправку (CTASection.tsx).
   Появление при прокрутке, наведение, шапка и вступление сделаны в самом index.html. */
(() => {
  // Отзывы — массив `he` из кода оригинала, в том же порядке.
  const TESTIMONIALS = [
    {
      quote:
        'SanCurtains transformed our Mayfair townhouse into something from a dream. The Imperial Velvet collection in our drawing room has become the most talked-about feature among our guests.',
      name: 'Lady Caroline Ashworth',
      title: 'Interior Design Client, London',
      img: 'https://images.unsplash.com/photo-1766684412414-57b272c62d45?w=120&h=120&fit=crop&auto=format',
    },
    {
      quote:
        "We've worked with every premium curtain maker in Europe. SanCurtains stands in a category entirely of their own. The craftsmanship is extraordinary — the fabric, the weight, the fall.",
      name: 'Alessandro Ferrari',
      title: 'Principal Architect, Ferrari & Associates, Milan',
      img: 'https://images.unsplash.com/photo-1688506900123-0ae2c0b063a7?w=120&h=120&fit=crop&auto=format',
    },
    {
      quote:
        'From our first consultation to the final installation, every detail was handled with the kind of white-glove care you rarely encounter. Our penthouse was worth the wait.',
      name: 'Dr. Priya Mehta',
      title: 'Residential Client, Dubai',
      img: 'https://images.unsplash.com/photo-1763940018489-12e722c40bab?w=120&h=120&fit=crop&auto=format',
    },
  ];
  const MENU_ITEMS = ['Home', 'Collections', 'Why Us', 'Testimonials', 'Contact'];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const swap = (el, from, to) => {
    from.forEach((c) => el.classList.remove(c));
    to.forEach((c) => el.classList.add(c));
  };

  // Трансформации полосок бургера — значения из NavBar.tsx.
  const BURGER_OPEN = [
    '[transform:rotate(45deg)_translate(4.5px,_4.5px)]',
    '[transform:scaleX(0)]',
    '[transform:rotate(-45deg)_translate(4.5px,_-4.5px)]',
  ];
  const MENU_CLASS =
    '[position:absolute] [top:80px] [left:0px] [right:0px] [background:rgba(6,_10,_7,_0.98)] [backdrop-filter:blur(20px)] [border-bottom:1px_solid_rgba(212,_175,_55,_0.2)] [padding:24px_32px] [display:flex] [flex-direction:column] [gap:20px] [animation:fadeInUp_0.3s_ease]';
  const MENU_LINK_CLASS =
    '[font-family:Cinzel,_serif] [font-size:12px] [letter-spacing:0.3em] [color:rgb(232,_223,_208)] [text-decoration:none] [text-transform:uppercase] [opacity:0.8]';

  // Классы, которые появляются только при взаимодействии: браузерная сборка
  // Tailwind должна сгенерировать их заранее, иначе первый переход не проиграется.
  const preload = document.createElement('div');
  preload.hidden = true;
  preload.className = [...BURGER_OPEN, MENU_CLASS, MENU_LINK_CLASS].join(' ');
  document.body.appendChild(preload);

  // ---------- вступление (DoorIntro.tsx, App.tsx) ----------
  // 700 мс — двери открываются, «Est. 2008» убирается, вылетают искры;
  // 4200 мс — оверлей убирается (data-remove-after) и страница проявляется за 0.8 с.
  const doors = $$('[data-door]');
  const DOOR_OPEN = doors.map((d) => `[transform:rotateY(${d.dataset.door})]`);
  const doorWarm = document.createElement('div');
  doorWarm.hidden = true;
  doorWarm.className = [...DOOR_OPEN, '[transform:rotateY(0deg)]', '[opacity:1]'].join(' ');
  document.body.appendChild(doorWarm);
  setTimeout(() => {
    doors.forEach((d, k) => swap(d, ['[transform:rotateY(0deg)]'], [DOOR_OPEN[k]]));
    $('[data-intro-est]')?.remove();
    $$('[data-intro-particle]').forEach((p) => p.removeAttribute('hidden'));
  }, 700);
  const introContent = $('[data-intro-content]');
  setTimeout(() => introContent && swap(introContent, ['[opacity:0]'], ['[opacity:1]']), 4200);

  // ---------- поля формы: рамка при фокусе (CTASection.tsx) ----------
  for (const input of $$('#contact input')) {
    input.addEventListener('focus', () => (input.style.borderColor = 'rgba(212,175,55,0.7)'));
    input.addEventListener('blur', () => (input.style.borderColor = 'rgba(212,175,55,0.25)'));
  }

  // ---------- мобильное меню ----------
  const nav = $('nav');
  const burger = nav && $('button[aria-label="Toggle menu"]', nav);
  const lines = burger ? $$('span', burger) : [];
  let menu = null;
  function closeMenu() {
    if (!menu) return;
    menu.remove();
    menu = null;
    lines.forEach((l, k) => swap(l, [BURGER_OPEN[k]], ['[transform:none]']));
  }
  burger?.addEventListener('click', () => {
    if (menu) return closeMenu();
    menu = document.createElement('div');
    menu.className = MENU_CLASS;
    for (const label of MENU_ITEMS) {
      const a = document.createElement('a');
      // Якорь строится как в оригинале: нижний регистр, первый пробел → дефис.
      a.href = `#${label.toLowerCase().replace(' ', '-')}`;
      a.className = MENU_LINK_CLASS;
      a.textContent = label;
      a.addEventListener('click', closeMenu);
      menu.appendChild(a);
    }
    // В React панель стоит сразу после кнопки — перед <style> шапки.
    burger.after(menu);
    lines.forEach((l, k) => swap(l, ['[transform:none]'], [BURGER_OPEN[k]]));
  });

  // ---------- «Scroll» на первом экране ----------
  const hero = $('section#home');
  const scrollHint =
    hero && $$('span', hero).find((s) => s.textContent.trim() === 'Scroll')?.parentElement;
  scrollHint?.addEventListener('click', () =>
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }),
  );

  // ---------- отзывы ----------
  const section = $('section#testimonials');
  const quoteP =
    section &&
    $$('p', section).find((p) => p.textContent.trim().startsWith('"') && p.textContent.length > 40);
  if (quoteP) {
    const cardRef = { current: quoteP.parentElement };
    const dotsBox = [...cardRef.current.parentElement.children].find(
      (el) => el !== cardRef.current && $$(':scope > button', el).length === TESTIMONIALS.length,
    );
    const dots = dotsBox ? $$(':scope > button', dotsBox) : [];
    const DOT_ON = ['[width:28px]', '[background:rgb(212,_175,_55)]'];
    const DOT_OFF = ['[width:8px]', '[background:rgba(212,_175,_55,_0.3)]'];
    let index = 0;
    let timer;

    const render = (i) => {
      index = i;
      const t = TESTIMONIALS[i];
      // В React у карточки key = номер отзыва: она монтируется заново и fadeInUp
      // проигрывается снова. Повторяем это заменой узла на копию.
      const next = cardRef.current.cloneNode(true);
      const [quote, name, title] = $$('p', next);
      quote.textContent = `"${t.quote}"`;
      name.textContent = t.name;
      title.textContent = t.title;
      const img = $('img', next);
      img.src = t.img;
      img.alt = t.name;
      cardRef.current.replaceWith(next);
      cardRef.current = next;
      dots.forEach((d, k) => {
        swap(d, k === i ? DOT_OFF : DOT_ON, k === i ? DOT_ON : DOT_OFF);
        // У точек в разметке есть data-reveal (снятый в другом кадре слайдера):
        // скрипт появления перезаписал бы им класс — держим его в согласии с текущим.
        if (d.hasAttribute('data-reveal')) d.dataset.reveal = d.className;
      });
    };
    const start = () => {
      clearInterval(timer);
      timer = setInterval(() => render((index + 1) % TESTIMONIALS.length), 6000);
    };
    // В оригинале клик по точке не перезапускает таймер — интервал идёт своим ходом.
    dots.forEach((d, k) => d.addEventListener('click', () => render(k)));
    // Снимок сделан на втором отзыве, а оригинал стартует с первого.
    render(0);
    start();
  }

  // ---------- появление блока отзывов ----------
  // Карточку отзывов оригинал проявляет своим IntersectionObserver (класс visible,
  // порог 0.2). В снимке у этого блока нет data-reveal — без этого он остаётся прозрачным.
  const lateReveal = $$('.section-reveal:not([data-reveal]):not(.visible)');
  if (lateReveal.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && (e.target.classList.add('visible'), io.unobserve(e.target)),
        ),
      { threshold: 0.2 },
    );
    lateReveal.forEach((el) => io.observe(el));
  } else lateReveal.forEach((el) => el.classList.add('visible'));

  // ---------- форма ----------
  // Оригинал только отменяет отправку — страница не перезагружается.
  $('section#contact form')?.addEventListener('submit', (e) => e.preventDefault());
})();
