/* Интерактив макета «оригинал 2» на чистом JS (вместо React-компонентов).

   - первый экран: смена слайдов раз в 6 с, клик по точкам;
   - отзывы: смена раз в 5 с, клик по точкам и миниатюрам;
   - мобильное меню: бургер → крестик, выпадающая панель разделов;
   - кнопки разделов в шапке, первом экране, коллекциях и подвале — плавная прокрутка;
   - «наверх» в подвале;
   - галерея: просмотр фото во весь экран, листание, закрытие;
   - форма заявки: сообщение об отправке и возврат к форме.
   Классы состояний взяты из разметки перевода — те же значения, что задавал React. */
(() => {
  const DATA = {
    "hero": [
      {
        "img": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop&auto=format",
        "tag": "Signature Collection",
        "heading": "Where Luxury",
        "heading2": "Meets Elegance",
        "sub": "Handcrafted curtains that transform your living spaces into timeless sanctuaries of beauty."
      },
      {
        "img": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&auto=format",
        "tag": "Bespoke Interiors",
        "heading": "Crafted For",
        "heading2": "Connoisseurs",
        "sub": "Every drape, every fold — a masterpiece of precision and unparalleled craftsmanship."
      },
      {
        "img": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop&auto=format",
        "tag": "Premium Fabrics",
        "heading": "Redefine Your",
        "heading2": "Living Space",
        "sub": "Explore our exclusive range of premium curtains, drapes, and window treatments."
      }
    ],
    "testimonials": [
      {
        "name": "Priya Krishnamurthy",
        "role": "Interior Designer, Chennai",
        "quote": "San Curtains has been my go-to partner for every luxury project. The quality of their Royal Velvet collection is simply unmatched — my clients are always stunned.",
        "rating": 5,
        "img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format"
      },
      {
        "name": "Rajesh Mehta",
        "role": "Homeowner, Coimbatore",
        "quote": "We renovated our entire villa with San Curtains. From consultation to installation, the experience was flawless. The craftsmanship is extraordinary — worth every rupee.",
        "rating": 5,
        "img": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"
      },
      {
        "name": "Deepa Subramaniam",
        "role": "Architect, Bangalore",
        "quote": "I specify San Curtains in all my high-end residential projects. Their attention to detail, timely delivery, and bespoke customisation capabilities are second to none.",
        "rating": 5,
        "img": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format"
      },
      {
        "name": "Arjun Nair",
        "role": "Hotel Owner, Kochi",
        "quote": "We outfitted all 48 suites of our boutique hotel with San Curtains. The Midnight Blackout series is a guest favourite — perfectly blends style with functionality.",
        "rating": 5,
        "img": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format"
      }
    ]
  };
  // Разделы страницы: нужны кнопкам прокрутки ещё при первом рендере слайда.
  const SECTIONS = ['home', 'collections', 'gallery', 'about', 'contact'];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const swap = (el, from, to) => {
    from.forEach((c) => el.classList.remove(c));
    to.forEach((c) => el.classList.add(c));
  };
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Классы, которые появляются только при взаимодействии: браузерная сборка
  // Tailwind должна сгенерировать их заранее, иначе первый переход не проиграется.
  const PRELOAD = [
    '[transform:rotate(45deg)_translate(5px,5px)]',
    '[transform:scaleX(0)]',
    '[transform:rotate(-45deg)_translate(5px,-5px)]',
    '[transform:none]',
  ];
  const preload = document.createElement('div');
  preload.hidden = true;
  preload.className = PRELOAD.join(' ');
  document.body.appendChild(preload);

  // ---------- первый экран ----------
  const hero = $('section#home');
  if (hero && DATA?.hero?.length) {
    const layers = [...hero.children].filter((el) => el.tagName === 'DIV' && el.querySelector(':scope > img'));
    const dots = [...hero.children].find((el) => el.tagName === 'DIV' && el.children.length === DATA.hero.length && [...el.children].every((c) => c.tagName === 'BUTTON'));
    const textBox = $('h1', hero)?.parentElement;
    const LAYER_ON = ['[opacity:1]'];
    const LAYER_OFF = ['[opacity:0]'];
    const IMG_ON = ['[transform:scale(1.06)]'];
    const IMG_OFF = ['[transform:scale(1)]'];
    const DOT_ON = ['[width:36px]', '[background:rgb(191,_155,_48)]'];
    const DOT_OFF = ['[width:10px]', '[background:rgba(255,_255,_255,_0.35)]'];
    let index = 0;
    let timer;
    // Блок текста слайда пересоздаётся при каждой смене — держим ссылку на текущий.
    const textBoxRef = { current: textBox };

    const render = (i) => {
      index = i;
      layers.forEach((layer, k) => {
        swap(layer, k === i ? LAYER_OFF : LAYER_ON, k === i ? LAYER_ON : LAYER_OFF);
        const img = $(':scope > img', layer);
        if (img) swap(img, k === i ? IMG_OFF : IMG_ON, k === i ? IMG_ON : IMG_OFF);
      });
      [...(dots?.children ?? [])].forEach((dot, k) => swap(dot, k === i ? DOT_OFF : DOT_ON, k === i ? DOT_ON : DOT_OFF));
      const box = textBoxRef.current;
      if (box) {
        const slide = DATA.hero[i];
        // Новый узел — анимации появления текста запускаются заново, как при перерисовке в React.
        const next = box.cloneNode(true);
        const [tag, h1a, h1b, , sub] = next.children;
        if (tag) {
          // Подпись над заголовком: меняем последний текстовый узел, не трогая декоративную линию.
          const textNode = [...tag.querySelectorAll('*'), tag]
            .flatMap((el) => [...el.childNodes])
            .filter((n) => n.nodeType === 3 && n.textContent.trim())
            .at(-1);
          if (textNode) textNode.textContent = slide.tag;
        }
        if (h1a) h1a.textContent = slide.heading;
        if (h1b) h1b.textContent = slide.heading2;
        if (sub) sub.textContent = slide.sub;
        box.replaceWith(next);
        bindScrollButtons(next);
        textBoxRef.current = next;
      }
    };
    const start = () => {
      clearInterval(timer);
      timer = setInterval(() => render((index + 1) % DATA.hero.length), 6000);
    };
    [...(dots?.children ?? [])].forEach((dot, k) =>
      dot.addEventListener('click', () => {
        render(k);
        start();
      })
    );
    render(0);
    start();
  }

  // ---------- отзывы ----------
  const testimonials = $$('section').find((s) => $('blockquote', s));
  if (testimonials && DATA?.testimonials?.length) {
    const items = DATA.testimonials;
    const quote = $('blockquote', testimonials);
    const card = quote.parentElement;
    const person = card.lastElementChild;
    const avatar = $('img', person);
    const [name, role] = [...(person.lastElementChild?.children ?? [])];
    const groups = [...card.parentElement.children].filter((el) => el.tagName === 'DIV' && [...el.children].length === items.length && [...el.children].every((c) => c.tagName === 'BUTTON'));
    const dots = groups.find((g) => !$('img', g));
    const thumbs = groups.find((g) => $('img', g));
    const DOT_ON = ['[width:32px]', '[background:rgb(191,_155,_48)]'];
    const DOT_OFF = ['[width:10px]', '[background:rgba(255,_255,_255,_0.2)]'];
    const THUMB_ON = ['[opacity:1]'];
    const THUMB_OFF = ['[opacity:0.5]'];
    let index = 0;
    let timer;

    const render = (i) => {
      index = i;
      const t = items[i];
      // Карточка перерисовывается целиком — анимация fadeInUp проигрывается заново.
      const nextQuote = quote.cloneNode(true);
      nextQuote.textContent = `"${t.quote}"`;
      $('blockquote', testimonials).replaceWith(nextQuote);
      if (avatar) {
        avatar.src = t.img;
        avatar.alt = t.name;
      }
      if (name) name.textContent = t.name;
      if (role) role.textContent = t.role;
      [...(dots?.children ?? [])].forEach((d, k) => swap(d, k === i ? DOT_OFF : DOT_ON, k === i ? DOT_ON : DOT_OFF));
      [...(thumbs?.children ?? [])].forEach((d, k) => swap(d, k === i ? THUMB_OFF : THUMB_ON, k === i ? THUMB_ON : THUMB_OFF));
    };
    const start = () => {
      clearInterval(timer);
      timer = setInterval(() => render((index + 1) % items.length), 5000);
    };
    for (const group of [dots, thumbs]) {
      [...(group?.children ?? [])].forEach((btn, k) =>
        btn.addEventListener('click', () => {
          render(k);
          start();
        })
      );
    }
    render(0);
    start();
  }

  // ---------- кнопки разделов ----------
  function bindScrollButtons(root = document) {
    for (const el of $$('button, span', root)) {
      if (el.dataset.scrollBound) continue;
      const label = el.textContent.trim().toLowerCase();
      let target = null;
      if (SECTIONS.includes(label)) target = label;
      else if (/get quote|consultation|enquire|inquire|book/.test(label)) target = 'contact';
      else if (/explore collections|view collections/.test(label)) target = 'collections';
      if (!target || (el.tagName === 'SPAN' && el.closest('button'))) continue;
      el.dataset.scrollBound = '1';
      el.addEventListener('click', () => {
        closeMenu();
        scrollToId(target);
      });
    }
  }

  // ---------- мобильное меню ----------
  const nav = $('nav');
  const burger = nav && $$('button', nav).find((b) => b.querySelectorAll('span').length === 3 && !b.textContent.trim());
  let menu = null;
  const lines = burger ? $$('span', burger) : [];
  const OPEN = ['[transform:rotate(45deg)_translate(5px,5px)]', '[transform:scaleX(0)]', '[transform:rotate(-45deg)_translate(5px,-5px)]'];
  function closeMenu() {
    if (!menu) return;
    menu.remove();
    menu = null;
    lines.forEach((l, k) => swap(l, [OPEN[k]], ['[transform:none]']));
  }
  burger?.addEventListener('click', () => {
    if (menu) return closeMenu();
    menu = document.createElement('div');
    menu.className =
      '[background:rgba(11,37,69,0.98)] [backdrop-filter:blur(20px)] [border-top:1px_solid_rgba(191,155,48,0.2)] [padding:30px_40px] [display:flex] [flex-direction:column] [gap:24px] [animation:fadeInUp_0.3s_ease]';
    for (const label of ['Home', 'Collections', 'Gallery', 'About', 'Contact']) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className =
        'font-cinzel [background:none] [border:none] [color:rgba(255,255,255,0.85)] [font-size:0.85rem] [letter-spacing:0.2em] [text-transform:uppercase] [cursor:pointer] [text-align:left]';
      b.textContent = label;
      b.addEventListener('click', () => {
        closeMenu();
        scrollToId(label.toLowerCase());
      });
      menu.appendChild(b);
    }
    nav.appendChild(menu);
    lines.forEach((l, k) => swap(l, ['[transform:none]'], [OPEN[k]]));
  });

  // ---------- «наверх» ----------
  for (const b of $$('footer button, section:last-of-type button')) {
    if (/^[↑⬆]$/.test(b.textContent.trim()) || /top/i.test(b.getAttribute('aria-label') ?? '')) {
      b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  }

  // ---------- галерея ----------
  const gallery = $('section#gallery');
  if (gallery) {
    const photos = $$('img', gallery).map((img) => ({ src: img.getAttribute('src'), label: img.alt }));
    let overlay = null;
    let current = 0;
    const show = (i) => {
      current = (i + photos.length) % photos.length;
      const p = photos[current];
      overlay.querySelector('img').src = p.src.replace('w=600', 'w=1200').replace('w=800', 'w=1200');
      overlay.querySelector('img').alt = p.label;
      overlay.querySelector('[data-label]').textContent = p.label;
    };
    const close = () => {
      overlay?.remove();
      overlay = null;
    };
    const open = (i) => {
      overlay = document.createElement('div');
      overlay.className =
        '[position:fixed] [inset:0] [z-index:9999] [background:rgba(0,0,0,0.92)] [display:flex] [align-items:center] [justify-content:center] [animation:fadeIn_0.3s_ease] [padding:40px]';
      overlay.innerHTML = `
        <div class="[position:relative] [max-width:1100px] [width:100%]" data-inner>
          <img class="[width:100%] [max-height:85vh] [object-fit:contain] [display:block]" />
          <div class="[text-align:center] [margin-top:20px]">
            <div data-label class="font-cinzel [color:#BF9B30] [font-size:0.7rem] [letter-spacing:0.2em]"></div>
          </div>
          <button type="button" data-close title="Закрыть" class="[position:absolute] [top:-16px] [right:-16px] [width:40px] [height:40px] [background:#BF9B30] [border:none] [cursor:pointer] [color:#0B2545] [font-weight:700] [font-size:1.2rem] [display:flex] [align-items:center] [justify-content:center]">×</button>
          <div class="[position:absolute] [top:50%] [left:-60px] [transform:translateY(-50%)] [display:flex] [gap:8px]">
            <button type="button" data-prev title="Предыдущее фото" class="[background:rgba(191,155,48,0.3)] [border:1px_solid_#BF9B30] [color:#BF9B30] [width:44px] [height:44px] [cursor:pointer] [font-size:1.2rem]">‹</button>
          </div>
          <div class="[position:absolute] [top:50%] [right:-60px] [transform:translateY(-50%)] [display:flex] [gap:8px]">
            <button type="button" data-next title="Следующее фото" class="[background:rgba(191,155,48,0.3)] [border:1px_solid_#BF9B30] [color:#BF9B30] [width:44px] [height:44px] [cursor:pointer] [font-size:1.2rem]">›</button>
          </div>
        </div>`;
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('[data-close]')) return close();
        if (e.target.closest('[data-prev]')) return show(current - 1);
        if (e.target.closest('[data-next]')) return show(current + 1);
      });
      document.body.appendChild(overlay);
      show(i);
    };
    $$('img', gallery).forEach((img, i) => {
      const card = img.closest('[class*="cursor:pointer"]') ?? img.parentElement;
      card.addEventListener('click', () => open(i));
    });
    document.addEventListener('keydown', (e) => {
      if (!overlay) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  // ---------- форма заявки ----------
  const form = $('section#contact form');
  if (form) {
    const success = document.createElement('div');
    success.className = '[text-align:center] [padding:40px_0]';
    success.innerHTML = `
      <div class="[font-size:3rem] [margin-bottom:20px]">✦</div>
      <h3 class="font-cinzel [color:#BF9B30] [font-size:1.5rem] [margin-bottom:16px]">Thank You!</h3>
      <p class="font-cormorant [color:rgba(255,255,255,0.7)] [font-size:1.1rem] [line-height:1.7]">Your inquiry has been received. Our design consultant will contact you within 24 hours.</p>
      <button type="button" class="luxury-btn [margin-top:32px]"><span>Send Another Inquiry</span></button>`;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.replaceWith(success);
    });
    success.querySelector('button').addEventListener('click', () => {
      form.reset();
      success.replaceWith(form);
    });
  }

  bindScrollButtons();
})();
