/* Интерактив макета «оригинал 1» (Cascade Drape & Blinds) на чистом JS вместо React.

   - мобильное меню: три полоски → крестик, выпадающая панель разделов;
   - услуги: «Learn More ↓» раскрывает список преимуществ (открыта одна карточка);
   - отзывы: переключение точками с уходом влево и приходом справа;
   - форма заявки: сообщение «Thank You!» вместо формы;
   - поля формы: золотая рамка при фокусе.
   Значения анимаций, цветов и тексты — из кода компонентов оригинала. */
(() => {
  // Преимущества услуг: оригинал рисует их только в раскрытой карточке, в разметке их нет.
  const FEATURES = {
    'Custom Drapery': ['Free in-home consultation', '200+ fabric selections', 'Custom lining & interlining', 'Professional installation included'],
    'Roller & Solar Shades': ['Motorized & manual options', 'UV-blocking solar fabrics', 'Blackout & room-darkening', 'Cordless child-safe design'],
    'Wood & Faux Wood Blinds': ['Real & faux wood options', 'Moisture-resistant finish', 'Multiple stain & paint colors', '2″ and 2½″ slat sizes'],
    'Motorized Smart Shades': ['Alexa, Google & Apple HomeKit', 'Battery-powered or hardwired', 'Scene & schedule programming', 'Free smart-home setup'],
    'Roman & Woven Shades': ['Flat, relaxed & hobbled folds', 'Natural grass & bamboo weaves', 'Custom fabric sourcing', 'Lined & unlined options'],
    'Commercial Window Solutions': ['Volume pricing available', 'ADA-compliant options', 'Fire-rated & contract fabrics', 'Project management included'],
  };
  // Отзывы: в разметке только первый.
  const REVIEWS = [
    { name: 'Sarah M.', loc: 'Bellevue, WA', stars: 5, service: 'Custom Drapery', text: 'Cascade Drape completely transformed our living room. The custom drapes are absolutely stunning and the installation team was professional and efficient. Worth every penny!' },
    { name: 'James R.', loc: 'Seattle, WA', stars: 5, service: 'Motorized Smart Shades', text: 'We had motorized shades installed throughout our home and the smart integration is flawless. Now my morning routine includes the blinds opening automatically with the sunrise. Life-changing!' },
    { name: 'Linda & Tom K.', loc: 'Tacoma, WA', stars: 5, service: 'Wood Blinds', text: 'From the initial consultation to final installation, the entire experience was seamless. They listened to exactly what we wanted and delivered beyond our expectations.' },
    { name: 'Priya N.', loc: 'Spokane, WA', stars: 5, service: 'Roman Shades', text: "I'm a repeat customer — Cascade Drape has done every room in my house over four years. Consistent quality, fair pricing, and they stand behind their warranty 100%." },
  ];
  const SECTIONS = ['Services', 'Gallery', 'Pricing', 'About', 'Contact'];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const swap = (el, from, to) => {
    from.forEach((c) => el.classList.remove(c));
    to.forEach((c) => el.classList.add(c));
  };
  const reflow = (el) => void el.offsetHeight;

  // Классы, которые появляются только при взаимодействии: браузерная сборка
  // Tailwind должна сгенерировать их заранее, иначе первый переход не проиграется.
  const PRELOAD = [
    '[transform:rotate(45deg)_translate(5px,_5px)]',
    '[transform:rotate(-45deg)_translate(5px,_-5px)]',
    '[opacity:0]',
    '[opacity:1]',
    '[height:0px]',
    '[transform:translateX(-30px)]',
    '[transform:translateX(30px)]',
    '[transform:scale(0.95)]',
    '[transform:scale(1)]',
    '[transform:none]',
    '[transition:opacity_0.4s_ease-out,transform_0.4s_ease-out]',
    '[transition:height_0.3s_ease-out,opacity_0.3s_ease-out]',
    'focus:[border-color:rgb(201,_168,_76)]',
  ];
  const preload = document.createElement('div');
  preload.hidden = true;
  preload.className = PRELOAD.join(' ');
  document.body.appendChild(preload);

  // Раскрытие «до auto» (как height: auto у framer-motion): анимируем до реальной высоты,
  // после перехода снимаем фиксированную высоту, чтобы блок оставался резиновым.
  const expand = (el) => {
    el.style.height = '0px';
    reflow(el);
    swap(el, ['[opacity:0]'], ['[opacity:1]']);
    el.style.height = `${el.scrollHeight}px`;
    setTimeout(() => el.isConnected && (el.style.height = ''), 320);
  };
  const collapse = (el) => {
    el.style.height = `${el.scrollHeight}px`;
    reflow(el);
    swap(el, ['[opacity:1]'], ['[opacity:0]']);
    el.style.height = '0px';
    setTimeout(() => el.remove(), 300);
  };

  // ---------- мобильное меню ----------
  const nav = $('nav');
  const burger = nav && $('button[aria-label="Toggle menu"]', nav);
  if (burger) {
    const [top, middle, bottom] = [...burger.children];
    const OPEN_TOP = '[transform:rotate(45deg)_translate(5px,_5px)]';
    const OPEN_BOTTOM = '[transform:rotate(-45deg)_translate(5px,_-5px)]';
    let panel = null;
    const close = () => {
      if (!panel) return;
      collapse(panel);
      panel = null;
      swap(top, [OPEN_TOP], ['[transform:none]']);
      swap(bottom, [OPEN_BOTTOM], ['[transform:none]']);
      swap(middle, ['[opacity:0]'], ['[opacity:1]']);
    };
    const open = () => {
      panel = document.createElement('div');
      panel.className =
        '[background:rgb(26,_39,_68)] [overflow:hidden] [border-top:1px_solid_rgba(201,_168,_76,_0.2)] [opacity:0] [transition:height_0.3s_ease-out,opacity_0.3s_ease-out]';
      const inner = document.createElement('div');
      inner.className = '[padding:16px_32px_24px]';
      for (const label of SECTIONS) {
        const a = document.createElement('a');
        a.href = `#${label.toLowerCase()}`;
        a.className =
          '[display:block] [font-family:Lato,_sans-serif] [font-size:14px] [font-weight:700] [letter-spacing:0.1em] [color:rgb(245,_240,_232)] [text-decoration:none] [text-transform:uppercase] [padding:10px_0px] [border-bottom:1px_solid_rgba(255,_255,_255,_0.07)]';
        a.textContent = label;
        // Переход по якорю делает браузер, меню закрывается — как в оригинале.
        a.addEventListener('click', close);
        inner.appendChild(a);
      }
      panel.appendChild(inner);
      nav.appendChild(panel);
      expand(panel);
      swap(top, ['[transform:none]'], [OPEN_TOP]);
      swap(bottom, ['[transform:none]'], [OPEN_BOTTOM]);
      swap(middle, ['[opacity:1]'], ['[opacity:0]']);
    };
    burger.addEventListener('click', () => (panel ? close() : open()));
  }

  // ---------- услуги: «Learn More» ----------
  const moreButtons = $$('button').filter((b) => b.textContent.trim() === 'Learn More ↓');
  const cards = moreButtons.map((btn) => {
    // Ищем от родителя: у самой кнопки тоже есть [cursor:pointer].
    const card = btn.parentElement.closest('[class*="cursor:pointer"]');
    const name = $('span', card)?.textContent.trim();
    return { card, btn, features: FEATURES[name] ?? [], list: null };
  });
  let openCard = null;
  const setOpen = (target) => {
    for (const c of cards) {
      const on = c === target;
      if (on && !c.list) {
        const ul = document.createElement('ul');
        ul.className = '[overflow:hidden] [list-style:none] [padding:0px] [margin:0px_0px_16px] [opacity:0] [transition:height_0.3s_ease-out,opacity_0.3s_ease-out]';
        for (const f of c.features) {
          const li = document.createElement('li');
          li.className = '[font-family:Lato,_sans-serif] [font-size:13px] [color:rgb(26,_39,_68)] [padding:5px_0px] [display:flex] [align-items:center] [gap:10px]';
          const tick = document.createElement('span');
          tick.className = '[color:rgb(201,_168,_76)] [font-weight:700]';
          tick.textContent = '✓';
          li.append(tick, f);
          ul.appendChild(li);
        }
        c.btn.before(ul);
        expand(ul);
        c.list = ul;
      } else if (!on && c.list) {
        collapse(c.list);
        c.list = null;
      }
      c.btn.textContent = on ? 'Less Info ↑' : 'Learn More ↓';
    }
    openCard = target;
  };
  for (const c of cards) {
    // Клик по карточке и по кнопке делает одно и то же; кнопка гасит всплытие, как в оригинале.
    const toggle = (e) => {
      e.stopPropagation();
      setOpen(openCard === c ? null : c);
    };
    c.card.addEventListener('click', toggle);
    c.btn.addEventListener('click', toggle);
  }

  // ---------- отзывы ----------
  const firstDot = $('button[aria-label="Review 1"]');
  if (firstDot) {
    const dots = [...firstDot.parentElement.children];
    const slide = firstDot.parentElement.previousElementSibling;
    const [, text, stars, name, meta] = [...slide.children];
    const DOT_ON = ['[width:28px]', '[background:rgb(201,_168,_76)]'];
    const DOT_OFF = ['[width:8px]', '[background:rgba(201,_168,_76,_0.3)]'];
    const MOVE = '[transition:opacity_0.4s_ease-out,transform_0.4s_ease-out]';
    let index = 0;
    let token = 0;
    const fill = (r) => {
      text.textContent = r.text;
      stars.replaceChildren(
        ...Array.from({ length: r.stars }, () => {
          const s = stars.firstElementChild?.cloneNode(true) ?? document.createElement('span');
          s.textContent = '★';
          return s;
        })
      );
      name.textContent = r.name;
      meta.textContent = `${r.loc} · ${r.service}`;
    };
    const go = (i) => {
      if (i === index) return;
      index = i;
      dots.forEach((d, k) => swap(d, k === i ? DOT_OFF : DOT_ON, k === i ? DOT_ON : DOT_OFF));
      const my = ++token;
      // AnimatePresence mode="wait": старый уходит влево (0.4 с), затем новый приходит справа.
      slide.classList.add(MOVE);
      swap(slide, ['[opacity:1]', '[transform:none]', '[transform:translateX(30px)]'], ['[opacity:0]', '[transform:translateX(-30px)]']);
      setTimeout(() => {
        if (my !== token) return;
        fill(REVIEWS[i]);
        slide.classList.remove(MOVE);
        swap(slide, ['[transform:translateX(-30px)]'], ['[transform:translateX(30px)]']);
        reflow(slide);
        slide.classList.add(MOVE);
        swap(slide, ['[opacity:0]', '[transform:translateX(30px)]'], ['[opacity:1]', '[transform:none]']);
      }, 400);
    };
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
  }

  // ---------- форма заявки ----------
  const form = $('section#contact form');
  if (form) {
    // Рамка поля при фокусе: в оригинале onFocus/onBlur меняли border-color.
    for (const el of $$('input, select, textarea', form)) el.classList.add('focus:[border-color:rgb(201,_168,_76)]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const done = document.createElement('div');
      done.className = '[text-align:center] [padding:40px_0px] [opacity:0] [transform:scale(0.95)] [transition:opacity_0.4s_ease-out,transform_0.4s_ease-out]';
      done.innerHTML = `
        <div class="[font-size:56px] [margin-bottom:16px]">🎉</div>
        <h3 class="[font-family:'Playfair_Display',_serif] [font-size:28px] [font-weight:700] [color:rgb(26,_39,_68)] [margin-bottom:12px]">Thank You!</h3>
        <p class="[font-family:Lato,_sans-serif] [font-size:15px] [color:rgb(45,_55,_72)] [line-height:1.7]">We've received your request and will contact you within one business day to schedule your free consultation.</p>`;
      form.replaceWith(done);
      reflow(done);
      swap(done, ['[opacity:0]', '[transform:scale(0.95)]'], ['[opacity:1]', '[transform:none]']);
    });
  }
})();
