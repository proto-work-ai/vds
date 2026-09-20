/* Интерактив макета «оригинал 9» на чистом JS (вместо React-компонентов).

   - окно записи на консультацию: открывается кнопками «Book … Consultation»
     (шапка, мобильное меню, первый экран, призыв внизу); проверка обязательных
     полей, открытие WhatsApp с заполненным сообщением, экран «WhatsApp Opened!»;
   - мобильное меню: бургер ↔ крестик, панель разделов;
   - отзывы: смена раз в 5,2 с, стрелки и точки;
   - «до и после»: перетаскивание ручки мышью и пальцем;
   - видео: окно-заглушка по кнопке Play, закрытие по фону и крестику;
   - FAQ: открыт один ответ, плюс поворачивается на 45°.
   Классы состояний взяты из разметки перевода — те же значения, что задавал React. */
(() => {
  // Данные — в начале: const не поднимается, обработчики ниже обращаются к ним сразу.
  const WHATSAPP = '971500000000';
  const SERVICES = [
    'Sheer Curtains',
    'Blackout Curtains',
    'Motorized Curtains',
    'Roman Blinds',
    'Roller Blinds',
    'Wooden Blinds',
    'Not Sure Yet',
  ];
  const MENU_ITEMS = [
    'Home',
    'About',
    'Collections',
    'Services',
    'Projects',
    'Gallery',
    'Blog',
    'Contact',
  ];
  const TESTIMONIALS = [
    {
      name: 'Sarah Al-Rashidi',
      role: 'Homeowner, Dubai Hills',
      quote:
        'SanCurtains transformed our villa beyond recognition. The team understood our vision perfectly and delivered with extraordinary precision. Every room now feels like a five-star suite.',
      avatar: '1494790108377-be9c29b29330',
    },
    {
      name: 'James Whitfield',
      role: 'Interior Designer, London',
      quote:
        'I have worked with curtain suppliers across three continents. SanCurtains stands apart — their fabric knowledge and craftsmanship are genuinely world-class, without exception.',
      avatar: '1472099645785-5658abf4ff4e',
    },
    {
      name: 'Leila Mansour',
      role: 'General Manager, The Bayan Hotel',
      quote:
        'We entrusted SanCurtains with all 142 rooms of our flagship property. The result surpassed our expectations — impeccable quality, delivered perfectly on schedule.',
      avatar: '1580489944761-15a19d654956',
    },
  ];

  const SANS = "[font-family:'DM_Sans',_system-ui,_sans-serif]";
  const SERIF = "[font-family:'Playfair_Display',_Georgia,_serif]";
  const INPUT = `w-full px-4 py-3 text-sm bg-white border focus:outline-none focus:border-stone-400 transition-colors duration-200 placeholder-gray-300 ${SANS} [color:rgb(30,_30,_30)]`;
  const BORDER_OK = '[border-color:rgba(0,_0,_0,_0.12)]';
  const BORDER_ERR = '[border-color:rgb(192,_57,_43)]';
  const ERROR_P = `mt-1 text-[11px] ${SANS} [color:rgb(192,_57,_43)]`;
  const svg = (size, paths, cls = '') =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">${paths}</svg>`;
  const X_PATHS = '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';
  const MENU_PATHS =
    '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>';
  const WA_PATHS =
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.535 5.856L.057 23.625c-.074.297.198.569.495.495l5.769-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.943 0-3.772-.525-5.345-1.443l-.384-.228-3.975 1.019 1.019-3.867-.248-.397A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path>';
  const FIELD_ICON = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none';
  const label = (text, required) =>
    `<label class="block text-[11px] tracking-[0.16em] uppercase mb-2 text-gray-500 ${SANS}">${text}${required ? ' <span class="[color:rgb(184,_149,_93)]">*</span>' : ''}</label>`;

  // Окно записи — разметка компонента Je из оригинала.
  const MODAL_HTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 [background:rgba(20,_20,_20,_0.72)] [backdrop-filter:blur(8px)]" data-booking>
      <div class="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto [background:rgb(248,_246,_242)]" data-dialog>
        <div class="px-8 pt-10 pb-7 [border-bottom:1px_solid_rgba(0,_0,_0,_0.08)]"><div class="flex items-start justify-between"><div>
          <div class="flex items-center gap-3 mb-4 "><div class="h-px w-8 flex-shrink-0 [background:rgb(184,_149,_93)]"></div><span class="text-[10px] tracking-[0.28em] uppercase ${SANS} [color:rgb(184,_149,_93)]">Free Consultation</span></div>
          <h2 class="text-[1.85rem] leading-tight ${SERIF}">Book Your Appointment</h2>
          <p class="mt-2 text-[12px] text-gray-400 ${SANS}">Fill in your details and we'll reach you on WhatsApp.</p>
        </div><button type="button" class="mt-1 p-1.5 text-gray-400 hover:text-gray-700 transition-colors" aria-label="Close" data-close>${svg(20, X_PATHS, 'lucide lucide-x')}</button></div></div>
        <form class="px-8 py-8 space-y-5" novalidate>
          <div data-field="name">${label('Full Name', true)}<div class="relative">${svg(14, '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', `lucide lucide-user ${FIELD_ICON}`)}<input type="text" name="name" placeholder="Your full name" class="${INPUT} ${BORDER_OK} [padding-left:36px]"></div></div>
          <div data-field="phone">${label('Phone Number', true)}<div class="relative">${svg(14, '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', `lucide lucide-phone ${FIELD_ICON}`)}<input type="tel" name="phone" placeholder="+971 50 000 0000" class="${INPUT} ${BORDER_OK} [padding-left:36px]"></div></div>
          <div>${label('Email Address')}<div class="relative">${svg(14, '<rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>', `lucide lucide-mail ${FIELD_ICON}`)}<input type="email" name="email" placeholder="your@email.com" class="${INPUT} ${BORDER_OK} [padding-left:36px]"></div></div>
          <div data-field="service">${label('Service Interested In', true)}<select name="service" class="${INPUT} ${BORDER_OK} [appearance:none] [background-image:url(&quot;data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%3E%3Cpath%20fill='%23999'%20d='M6%208L1%203h10z'/%3E%3C/svg%3E&quot;)] [background-repeat:no-repeat] [background-position:right_14px_center]"><option value="">Select a service…</option>${SERVICES.map((s) => `<option value="${s}">${s}</option>`).join('')}</select></div>
          <div>${label('Preferred Visit Date')}<div class="relative">${svg(14, '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>', `lucide lucide-calendar ${FIELD_ICON}`)}<input type="date" name="date" class="${INPUT} ${BORDER_OK} [padding-left:36px]"></div></div>
          <div>${label('Additional Message')}<div class="relative">${svg(14, '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>', 'lucide lucide-message-square absolute left-3.5 top-4 text-gray-300 pointer-events-none')}<textarea rows="3" name="message" placeholder="Any specific requirements or questions…" class="${INPUT} ${BORDER_OK} [padding-left:36px] [resize:none]"></textarea></div></div>
          <div class="flex items-start gap-3 p-4 [background:rgb(240,_250,_240)] [border:1px_solid_rgba(76,_175,_80,_0.2)]"><svg width="18" height="18" viewBox="0 0 24 24" fill="#4CAF50" class="flex-shrink-0 mt-0.5">${WA_PATHS}</svg><p class="text-[12px] text-green-700 leading-relaxed ${SANS}">Clicking "Send to WhatsApp" will open WhatsApp with your details pre-filled. Simply press Send to confirm your consultation request.</p></div>
          <button type="submit" class="w-full flex items-center justify-center gap-3 py-4 text-white text-[11px] tracking-[0.18em] uppercase font-medium transition-opacity duration-200 hover:opacity-90 ${SANS} [background:rgb(37,_211,_102)]"><svg width="16" height="16" viewBox="0 0 24 24" fill="white">${WA_PATHS}</svg>Send to WhatsApp</button>
        </form>
      </div>
    </div>`;
  const SUCCESS_HTML = `
    <div class="px-8 py-14 text-center" data-success>
      <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 [background:rgb(240,_250,_240)]">${svg(32, '<path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path>', 'lucide lucide-circle-check-big [color:rgb(76,_175,_80)]')}</div>
      <h3 class="text-[1.4rem] mb-3 ${SERIF}">WhatsApp Opened!</h3>
      <p class="text-[13.5px] text-gray-500 leading-relaxed mb-6 ${SANS}">Your enquiry has been prepared and WhatsApp should be open. Send the message to confirm your consultation request.</p>
      <button type="button" class="px-8 py-3 text-white text-[11px] tracking-[0.14em] uppercase ${SANS} [background:rgb(184,_149,_93)]" data-close>Close</button>
    </div>`;
  const VIDEO_HTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center [background:rgba(0,_0,_0,_0.92)]" data-video>
      <div class="relative w-full max-w-4xl aspect-video bg-stone-900 mx-4 flex items-center justify-center" data-dialog><p class="text-white/30 text-sm ${SANS}">Video content would play here</p></div>
      <button type="button" class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" aria-label="Close video" data-close>${svg(28, X_PATHS, 'lucide lucide-x')}</button>
    </div>`;
  const MENU_HTML = `
    <div class="lg:hidden px-6 pb-6 pt-1 [background:rgba(248,_246,_242,_0.98)] [backdrop-filter:blur(16px)]" data-mobile-menu>
      ${MENU_ITEMS.map((i) => `<a href="#" class="block py-3 text-sm border-b ${SANS} [color:rgb(102,_102,_102)] [border-color:rgba(0,_0,_0,_0.07)]">${i}</a>`).join('')}
      <button type="button" class="mt-5 w-full py-3 text-white text-[11px] tracking-[0.14em] uppercase ${SANS} [background:rgb(184,_149,_93)]">Book Consultation</button>
    </div>`;
  const DOT_ON = ['[width:22px]', '[background:rgb(184,_149,_93)]'];
  const DOT_OFF = ['[width:8px]', '[background:rgb(231,_222,_210)]'];
  const FAQ_OPEN = { icon: '[transform:rotate(45deg)]', panel: '[max-height:180px]' };
  const FAQ_CLOSED = { icon: '[transform:rotate(0deg)]', panel: '[max-height:0px]' };

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
    ...[MODAL_HTML, SUCCESS_HTML, VIDEO_HTML, MENU_HTML].flatMap((h) =>
      [...h.matchAll(/class="([^"]*)"/g)].map((m) => m[1]),
    ),
    ERROR_P,
    BORDER_ERR,
    '[overflow:hidden]',
    ...DOT_ON,
    ...DOT_OFF,
    FAQ_OPEN.icon,
    FAQ_OPEN.panel,
  ];
  const preload = document.createElement('div');
  preload.hidden = true;
  preload.className = PRELOAD.join(' ').replace(/&quot;/g, '"');
  document.body.appendChild(preload);

  // ---------- окно записи ----------
  let booking = null;
  let resetTimer = null;
  const setBodyLock = (on) => document.body.classList.toggle('[overflow:hidden]', on);
  const closeBooking = () => {
    if (!booking) return;
    booking.el.remove();
    setBodyLock(false);
    // Оригинал сбрасывает поля и экран успеха через 400 мс после закрытия.
    const state = booking;
    booking = null;
    resetTimer = setTimeout(() => (state.dead = true), 400);
  };
  let lastBooking = null;
  const openBooking = () => {
    clearTimeout(resetTimer);
    // Открыли снова в течение 400 мс — React сохранил бы введённое: берём то же окно.
    if (lastBooking && !lastBooking.dead) booking = lastBooking;
    else booking = lastBooking = createBooking();
    (document.getElementById('container') ?? document.body).firstElementChild?.appendChild(
      booking.el,
    ) ?? document.body.appendChild(booking.el);
    setBodyLock(true);
  };
  function createBooking() {
    const el = fromHtml(MODAL_HTML);
    const state = { el, dead: false };
    const form = $('form', el);
    const date = $('input[type=date]', el);
    date.min = new Date().toISOString().split('T')[0];
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]') || !e.target.closest('[data-dialog]')) closeBooking();
    });
    const showErrors = (errors) => {
      for (const box of $$('[data-field]', el)) {
        const key = box.dataset.field;
        const control = $('input, select', box);
        $(':scope > p', box)?.remove();
        swap(
          control,
          errors[key] ? [BORDER_OK] : [BORDER_ERR],
          errors[key] ? [BORDER_ERR] : [BORDER_OK],
        );
        if (errors[key]) {
          const p = document.createElement('p');
          p.className = ERROR_P;
          p.textContent = errors[key];
          box.appendChild(p);
        }
      }
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = Object.fromEntries(new FormData(form));
      const errors = {};
      if (!v.name.trim()) errors.name = 'Required';
      if (!v.phone.trim()) errors.phone = 'Required';
      if (!v.service) errors.service = 'Please select a service';
      if (Object.keys(errors).length) return showErrors(errors);
      const text = [
        'Hello SanCurtains! 👋',
        '',
        "I'd like to book a free consultation.",
        '',
        `*Name:* ${v.name}`,
        `*Phone:* ${v.phone}`,
        v.email ? `*Email:* ${v.email}` : null,
        `*Service:* ${v.service}`,
        v.date ? `*Preferred Date:* ${v.date}` : null,
        v.message ? `*Message:* ${v.message}` : null,
      ]
        .filter(Boolean)
        .join('\n');
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
      form.replaceWith(fromHtml(SUCCESS_HTML));
    });
    return state;
  }
  const bindBooking = (root = document) => {
    for (const b of $$('button', root)) {
      if (/^Book (Free )?Consultation$/.test(b.textContent.trim()))
        b.addEventListener('click', openBooking);
    }
  };
  bindBooking();

  // ---------- шапка: порог 64px ----------
  // Общий shared/page.js переключает вид после 60px, оригинал 9 — после 64px.
  // Этот обработчик подписан позже и в промежутке 61–64px возвращает вид «наверху».
  const scrolledEls = $$('[data-scrolled]');
  const keepTop = () => {
    if (window.scrollY > 60 && window.scrollY <= 64)
      for (const el of scrolledEls) el.className = el.dataset.top;
    else if (window.scrollY > 64)
      for (const el of scrolledEls)
        if (el.className !== el.dataset.scrolled) el.className = el.dataset.scrolled;
  };
  keepTop();
  window.addEventListener('scroll', keepTop, { passive: true });

  // ---------- мобильное меню ----------
  const nav = $('nav');
  const toggle = $('button[aria-label="Toggle menu"]');
  let menu = null;
  toggle?.addEventListener('click', () => {
    if (menu) {
      menu.remove();
      menu = null;
    } else {
      menu = fromHtml(MENU_HTML);
      nav.appendChild(menu);
      bindBooking(menu);
    }
    toggle.innerHTML = menu
      ? svg(22, X_PATHS, 'lucide lucide-x')
      : svg(22, MENU_PATHS, 'lucide lucide-menu');
  });

  // ---------- отзывы ----------
  const quote = $('blockquote');
  if (quote) {
    const card = quote.parentElement;
    const avatar = $('img', card);
    const [name, role] = $$('.text-left > p', card);
    const imgPrefix = avatar.getAttribute('src').replace(/photo-[^/]*$/, '');
    const controls = card.nextElementSibling;
    const prev = $('button[aria-label="Previous testimonial"]', controls);
    const next = $('button[aria-label="Next testimonial"]', controls);
    // Снимок застал слайдер на третьем отзыве, и точка получила data-reveal:
    // без неё скрипт появления перекрасил бы точку поверх текущего состояния.
    let dots = $$('button[aria-label^="Testimonial "]', controls).map((d) => {
      if (!d.hasAttribute('data-reveal')) return d;
      const clean = d.cloneNode(true);
      clean.removeAttribute('data-reveal');
      clean.removeAttribute('data-initial');
      d.replaceWith(clean);
      return clean;
    });
    let index = 0;
    const render = (i) => {
      index = i;
      const t = TESTIMONIALS[i];
      quote.textContent = `"${t.quote}"`;
      avatar.src = `${imgPrefix}photo-${t.avatar}.jpg`;
      avatar.alt = t.name;
      name.textContent = t.name;
      role.textContent = t.role;
      dots.forEach((d, k) => swap(d, k === i ? DOT_OFF : DOT_ON, k === i ? DOT_ON : DOT_OFF));
    };
    // Интервал в оригинале не перезапускается при клике — тикает ровно раз в 5,2 с.
    setInterval(() => render((index + 1) % TESTIMONIALS.length), 5200);
    prev?.addEventListener('click', () =>
      render((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    );
    next?.addEventListener('click', () => render((index + 1) % TESTIMONIALS.length));
    dots.forEach((d, k) => d.addEventListener('click', () => render(k)));
    render(0);
  }

  // ---------- до и после ----------
  const compare = $('.cursor-col-resize');
  if (compare) {
    const after = $$(':scope > img', compare)[1];
    const afterLabel = [...compare.children].find((el) => el.textContent.trim() === 'After');
    const handle = compare.lastElementChild;
    let dragging = false;
    const set = (clientX) => {
      const r = compare.getBoundingClientRect();
      const a = Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100));
      // Положение меняется непрерывно при перетаскивании: класс на каждое значение
      // заставил бы Tailwind генерировать сотни правил, поэтому — инлайн, как у React.
      after.style.clipPath = `inset(0 ${100 - a}% 0 0)`;
      handle.style.left = `${a}%`;
      swap(
        afterLabel,
        a > 12 ? ['[opacity:0]'] : ['[opacity:1]'],
        a > 12 ? ['[opacity:1]'] : ['[opacity:0]'],
      );
    };
    compare.addEventListener('mousedown', (e) => {
      dragging = true;
      set(e.clientX);
    });
    compare.addEventListener(
      'touchstart',
      (e) => {
        dragging = true;
        set(e.touches[0].clientX);
      },
      { passive: true },
    );
    const move = (e) => dragging && set('touches' in e ? e.touches[0].clientX : e.clientX);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', () => (dragging = false));
    window.addEventListener('touchend', () => (dragging = false));
    PRELOAD.push('[opacity:0]');
    preload.classList.add('[opacity:0]');
  }

  // ---------- видео ----------
  $('button[aria-label="Play video"]')?.addEventListener('click', () => {
    const el = fromHtml(VIDEO_HTML);
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]') || !e.target.closest('[data-dialog]')) el.remove();
    });
    const section = $('button[aria-label="Play video"]').closest('section');
    section.appendChild(el);
  });

  // ---------- FAQ ----------
  const faqButtons = $$('button').filter((b) =>
    b.nextElementSibling?.classList.contains('[max-height:0px]'),
  );
  let openIndex = null;
  const setFaq = (i) => {
    openIndex = i;
    faqButtons.forEach((b, k) => {
      const on = k === i;
      const icon = b.lastElementChild;
      const panel = b.nextElementSibling;
      swap(icon, [on ? FAQ_CLOSED.icon : FAQ_OPEN.icon], [on ? FAQ_OPEN.icon : FAQ_CLOSED.icon]);
      swap(
        panel,
        [on ? FAQ_CLOSED.panel : FAQ_OPEN.panel],
        [on ? FAQ_OPEN.panel : FAQ_CLOSED.panel],
      );
    });
  };
  faqButtons.forEach((b, k) =>
    b.addEventListener('click', () => setFaq(openIndex === k ? null : k)),
  );
})();
