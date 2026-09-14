/* Интерактив макета «оригинал 8» на чистом JS (вместо React/framer-motion).

   - вступительная заставка: шторки разъезжаются через 0,7 с, заставка уходит на 2,3 с;
   - текст первого экрана появляется, когда уходит заставка;
   - шапка: тёмный фон и меньший отступ после прокрутки на 80px;
   - кнопка «наверх»: появляется после 600px, плавно прокручивает к началу;
   - счётчики: считают от нуля за 1,8 с, когда блок попал в экран на 30%;
   - мобильное меню: бургер ↔ крестик, выпадающая панель разделов;
   - FAQ: открыт один ответ, иконка плюс ↔ минус;
   - форма: отправка только отменяется — как в оригинале.
   Итоговые состояния — классами-свойствами из разметки перевода. Сами переходы
   framer-motion анимировал из JS, поэтому здесь они через element.animate():
   так не нужны классы с промежуточными значениями (высота панели заранее не известна). */
(() => {
  // Данные — в начале: const не поднимается, обработчики ниже обращаются к ним сразу.
  const GOLD = '#C8A96A';
  const SECTIONS = ['Home', 'About', 'Services', 'Collections', 'Gallery', 'Contact'];
  const FAQ = [
    { q: 'How long does the custom curtain process take?', a: 'From consultation to installation, our standard lead time is 10–14 working days. For complex motorized systems or large-scale projects, we allocate 3–4 weeks to ensure absolute perfection.' },
    { q: 'Do you offer in-home consultations?', a: 'Yes — our complimentary in-home consultation service is available across the region. Our design experts visit your space, take measurements, and present curated fabric samples on-site.' },
    { q: 'What fabric collections do you carry?', a: 'We carry an extensive range including velvet, linen, silk, sheer, jacquard, blackout, and textured fabrics sourced from premium mills in Italy, Belgium, Turkey, and beyond.' },
    { q: 'Are your curtains truly made to measure?', a: 'Every product we create is custom made to your exact specifications. We hold no off-the-shelf inventory — 100% bespoke craftsmanship is our unwavering standard.' },
    { q: 'Do you install motorized and smart curtain systems?', a: 'Absolutely. We specialise in motorized curtain systems compatible with KNX, Lutron, Somfy, Google Home, and Amazon Alexa, delivered by certified installation engineers.' },
    { q: 'What warranty do you offer?', a: 'We provide a comprehensive 2-year warranty covering fabric defects, stitching, and hardware. Motorized and smart systems carry an extended 3-year parts-and-labour warranty.' },
  ];
  // Счётчики: цель и длительность из useCounter(target, 1800).
  const COUNTERS = [15, 5000, 12000];
  // Умолчание framer-motion для opacity/height без явного transition.
  const FM_EASE = 'cubic-bezier(0.25, 0.1, 0.35, 1)';

  const ICON = (paths, cls) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">${paths}</svg>`;
  const ICON_MENU = ICON('<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>', 'lucide lucide-menu w-6 h-6');
  const ICON_X = ICON('<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>', 'lucide lucide-x w-6 h-6');
  const ICON_PLUS = ICON('<path d="M5 12h14"></path><path d="M12 5v14"></path>', 'lucide lucide-plus w-4 h-4');
  const ICON_MINUS = ICON('<path d="M5 12h14"></path>', 'lucide lucide-minus w-4 h-4');

  const INTRO_HTML = `
    <div class="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
      <div data-panel="-100%" class="absolute top-0 left-0 w-1/2 h-full [background:linear-gradient(160deg,_#0E0E0E_0%,_#171208_100%)]">
        <div class="absolute inset-0 [background-image:repeating-linear-gradient(90deg,_transparent,_transparent_48px,_rgba(200,169,106,0.06)_48px,_rgba(200,169,106,0.06)_49px)]"></div>
      </div>
      <div data-panel="100%" class="absolute top-0 right-0 w-1/2 h-full [background:linear-gradient(200deg,_#0E0E0E_0%,_#171208_100%)]">
        <div class="absolute inset-0 [background-image:repeating-linear-gradient(90deg,_transparent,_transparent_48px,_rgba(200,169,106,0.06)_48px,_rgba(200,169,106,0.06)_49px)]"></div>
      </div>
      <div data-logo class="relative z-10 text-center">
        <div class="[font-family:'Playfair_Display',_serif] [color:#C8A96A] [font-size:2.5rem] [letter-spacing:0.35em] [font-weight:300]">SAN</div>
        <div class="[font-size:0.6rem] [letter-spacing:0.55em] [color:rgba(200,169,106,0.55)] [margin-top:2px] [font-weight:300]">CURTAINS</div>
        <div class="[height:1px] [width:80px] [margin:1.25rem_auto_0] [background:linear-gradient(90deg,_transparent,_#C8A96A,_transparent)]"></div>
      </div>
    </div>`;
  const MENU_HTML = `
    <div class="lg:hidden overflow-hidden [background:rgba(14,_14,_14,_0.98)]" data-mobile-menu>
      <div class="px-6 py-6 flex flex-col gap-3">
        ${SECTIONS.map((s) => `<a href="#${s.toLowerCase()}" class="py-2.5 text-xs tracking-widest [color:rgba(255,_255,_255,_0.65)] [border-bottom:1px_solid_rgba(200,_169,_106,_0.08)] [text-decoration:none]">${s.toUpperCase()}</a>`).join('')}
        <a href="#contact" class="mt-2 py-3 text-center text-xs tracking-widest [border:1px_solid_rgb(200,_169,_106)] [color:rgb(200,_169,_106)] [text-decoration:none]">FREE CONSULTATION</a>
      </div>
    </div>`;
  const ANSWER_HTML = (a) => `
    <div class="overflow-hidden" data-answer>
      <div class="px-6 pb-6 [border-top:1px_solid_rgba(200,_169,_106,_0.1)]">
        <p class="[padding-top:1rem] [font-size:0.83rem] [font-weight:300] [color:rgb(90,_82,_72)] [line-height:1.75]">${a}</p>
      </div>
    </div>`;
  // Шапка: значения style из кода при s = true / false.
  const HEADER_TOP = ['[background:transparent]', '[backdrop-filter:none]', '[border-bottom-width:medium]', '[border-bottom-style:none]', '[border-bottom-color:currentcolor]', '[padding:1.6rem_0px]'];
  const HEADER_SCROLLED = ['[background:rgba(14,_14,_14,_0.96)]', '[backdrop-filter:blur(14px)]', '[border-bottom:1px_solid_rgba(200,_169,_106,_0.12)]', '[padding:0.85rem_0px]'];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const swap = (el, from, to) => {
    from.forEach((c) => el.classList.remove(c));
    to.forEach((c) => el.classList.add(c));
  };
  const fromHtml = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  // Классы, которые появляются только при взаимодействии: браузерная сборка
  // Tailwind должна сгенерировать их заранее, иначе первый показ будет без стилей.
  const PRELOAD = [
    ...[INTRO_HTML, MENU_HTML, ANSWER_HTML(''), ICON_X, ICON_MINUS].flatMap((h) => [...h.matchAll(/class="([^"]*)"/g)].map((m) => m[1])),
    ...HEADER_SCROLLED,
    ...HEADER_TOP,
  ];
  const preload = document.createElement('div');
  preload.hidden = true;
  preload.className = PRELOAD.join(' ');
  document.body.appendChild(preload);

  const header = $('header');
  const root = header?.parentElement;

  // ---------- заставка ----------
  if (root) {
    const intro = fromHtml(INTRO_HTML);
    root.prepend(intro);
    // Логотип: initial {opacity 0, y 16} → animate, transition 0.6 с, задержка 0.1.
    $('[data-logo]', intro).animate(
      [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }],
      { duration: 600, delay: 100, easing: 'ease-in-out', fill: 'backwards' }
    );
    // Через 700 мс t = true: шторки уезжают, 1.3 с, ease [0.76, 0, 0.24, 1], задержка 0.15.
    for (const panel of $$('[data-panel]', intro)) {
      panel.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${panel.dataset.panel})` }], {
        duration: 1300,
        delay: 700 + 150,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        fill: 'forwards',
      });
    }
    // Через 2300 мс n = true: заставка исчезает (exit opacity 0 за 0.5 с) и удаляется.
    setTimeout(() => {
      intro.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, easing: 'ease-in-out', fill: 'forwards' }).onfinish = () => intro.remove();
    }, 2300);
  }

  // ---------- текст первого экрана ----------
  const heroText = $('section#home h1')?.parentElement;
  // Пока n = false, блок невидим и сдвинут на 44px; появляется в момент ухода заставки.
  heroText?.animate([{ opacity: 0, transform: 'translateY(44px)' }, { opacity: 1, transform: 'none' }], {
    duration: 1100,
    delay: 2300 + 200,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    fill: 'backwards',
  });

  // ---------- шапка и «наверх» ----------
  const backTop = $('button[aria-label="Back to top"]');
  let scrolled = null;
  let backShown = null;
  if (backTop) backTop.hidden = true;
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const onScroll = () => {
    const s = window.scrollY > 80;
    if (header && s !== scrolled) {
      scrolled = s;
      swap(header, s ? HEADER_TOP : HEADER_SCROLLED, s ? HEADER_SCROLLED : HEADER_TOP);
    }
    const c = window.scrollY > 600;
    if (backTop && c !== backShown) {
      const first = backShown === null;
      backShown = c;
      if (first && !c) return;
      // AnimatePresence: появление и уход — opacity и сдвиг на 8px.
      const frames = [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }];
      backTop.getAnimations().forEach((a) => a.cancel());
      if (c) {
        backTop.hidden = false;
        backTop.animate(frames, { duration: 300, easing: FM_EASE });
      } else {
        backTop.animate(frames.reverse(), { duration: 300, easing: FM_EASE, fill: 'forwards' }).onfinish = () => {
          if (!backShown) backTop.hidden = true;
        };
      }
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- счётчики ----------
  const statsSection = $('section#home')?.nextElementSibling;
  const statValues = statsSection ? $$('.text-center > div:first-child', statsSection).slice(0, COUNTERS.length) : [];
  if (statValues.length === COUNTERS.length) {
    const suffixes = statValues.map((el) => el.textContent.trim().replace(/^[\d\s .,]+/, ''));
    const paint = (k) => statValues.forEach((el, i) => (el.textContent = `${Math.round(k * COUNTERS[i]).toLocaleString()}${suffixes[i]}`));
    paint(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let t0 = null;
        const step = (now) => {
          t0 ??= now;
          const k = Math.min((now - t0) / 1800, 1);
          paint(k);
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    io.observe(statsSection);
  }

  // ---------- мобильное меню ----------
  const burger = header && $$('button', header).at(-1);
  let menu = null;
  const openHeight = (el, from, to, duration, easing) => {
    // height: 0 ↔ auto — измеряем реальную высоту содержимого.
    const h = `${el.scrollHeight}px`;
    return el.animate(
      [
        { height: from ? h : '0px', opacity: from ? 1 : 0 },
        { height: to ? h : '0px', opacity: to ? 1 : 0 },
      ],
      { duration, easing }
    );
  };
  const closeMenu = () => {
    if (!menu) return;
    const el = menu;
    menu = null;
    burger.innerHTML = ICON_MENU;
    el.style.pointerEvents = 'none';
    openHeight(el, true, false, 300, FM_EASE).onfinish = () => el.remove();
  };
  burger?.addEventListener('click', () => {
    if (menu) return closeMenu();
    menu = fromHtml(MENU_HTML);
    header.appendChild(menu);
    burger.innerHTML = ICON_X;
    $$('a', menu).forEach((a) => a.addEventListener('click', closeMenu));
    openHeight(menu, false, true, 300, FM_EASE);
  });

  // ---------- FAQ ----------
  const faqButtons = $$('button').filter((b) => FAQ.some((f) => f.q === b.textContent.trim()));
  let openIndex = null;
  const setFaq = (index) => {
    faqButtons.forEach((btn, i) => {
      const item = btn.parentElement;
      const iconBox = btn.lastElementChild;
      const wasOpen = !!$(':scope > [data-answer]', item);
      const isOpen = i === index;
      if (wasOpen === isOpen) return;
      iconBox.innerHTML = isOpen ? ICON_MINUS : ICON_PLUS;
      if (isOpen) {
        const answer = fromHtml(ANSWER_HTML(FAQ.find((f) => f.q === btn.textContent.trim()).a));
        item.appendChild(answer);
        openHeight(answer, false, true, 280, 'ease-in-out');
      } else {
        const answer = $(':scope > [data-answer]', item);
        answer.removeAttribute('data-answer');
        openHeight(answer, true, false, 280, 'ease-in-out').onfinish = () => answer.remove();
      }
    });
    openIndex = index;
  };
  faqButtons.forEach((btn, i) => btn.addEventListener('click', () => setFaq(openIndex === i ? null : i)));

  // ---------- форма ----------
  // В оригинале onSubmit только отменяет отправку — страница не перезагружается.
  $$('form').forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));
})();
