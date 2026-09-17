/* Интерактив прототипа сайта Shtorivdom (общий для всех страниц mockups/site/).
   Состояния — классы из theme.css (is-solid, is-open, is-in…), а не динамические
   утилиты Tailwind: браузерная сборка генерирует их заранее из <style>.

   - шапка (landing-1): тёмная после 60px или всегда на страницах data-header="solid";
   - мобильное меню: бургер ↔ крестик, панель выезжает по высоте 0.3s, подменю каталога;
   - появление .reveal при прокрутке, счётчики data-count (1.8s, как landing-8);
   - каталог (landing-1): прайс раздела в карточке виден всегда;
   - до/после (landing-9): перетаскивание мышью и пальцем;
   - отзывы (landing-9): стрелки, точки, смена раз в 5.2s;
   - FAQ (landing-8): открыт один ответ, высота 280ms ease-in-out;
   - формы заявки: маска +7, проверка телефона и согласия, «Спасибо» без отправки. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Раскрытие «до auto»: анимируем к scrollHeight, после перехода снимаем высоту.
  const openH = (el, ms = 300) => {
    el.style.height = el.scrollHeight + 'px';
    clearTimeout(el._t);
    el._t = setTimeout(() => (el.style.height = 'auto'), ms);
  };
  const closeH = (el) => {
    clearTimeout(el._t);
    el.style.height = el.scrollHeight + 'px';
    void el.offsetHeight;
    el.style.height = '0px';
  };

  // ---------- шапка ----------
  const header = $('header[data-header]'); // у body тоже есть data-header="solid"
  const solidAlways = document.body.dataset.header === 'solid';
  const menu = $('[data-mobile-menu]');
  const burger = $('[data-burger]');
  const syncHeader = () => header?.classList.toggle('is-solid', solidAlways || scrollY > 60 || burger?.getAttribute('aria-expanded') === 'true');
  syncHeader();
  addEventListener('scroll', syncHeader, { passive: true });

  // Текущий раздел в меню
  const page = document.body.dataset.page ?? '';
  $$('[data-nav]').forEach((a) => {
    const key = a.dataset.nav;
    if ((key === '' && page === '') || (key && page.startsWith(key))) a.setAttribute('aria-current', 'page');
  });

  // ---------- мобильное меню ----------
  const setMenu = (open) => {
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menu.classList.toggle('is-open', open);
    open ? openH(menu) : closeH(menu);
    syncHeader();
  };
  burger?.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  menu && $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => e.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true' && (setMenu(false), burger.focus()));
  addEventListener('resize', () => innerWidth >= 1024 && burger?.getAttribute('aria-expanded') === 'true' && setMenu(false));
  const subBtn = $('[data-sub-toggle]');
  const sub = $('[data-sub]');
  subBtn?.addEventListener('click', () => {
    const open = subBtn.getAttribute('aria-expanded') !== 'true';
    subBtn.setAttribute('aria-expanded', String(open));
    if (open) { openH(sub); menu.style.height = 'auto'; } else closeH(sub);
  });
  // Выпадающий «Каталог» на десктопе: Escape закрывает, фокус остаётся
  $$('.has-dropdown').forEach((d) => d.addEventListener('keydown', (e) => e.key === 'Escape' && document.activeElement.blur()));

  // ---------- появление ----------
  const reveals = $$('.reveal');
  if (reduced || !('IntersectionObserver' in window)) reveals.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  // ---------- кнопка «наверх»: после 600px прокрутки ----------
  const toTop = $('[data-to-top]');
  if (toTop) {
    const syncTop = () => toTop.classList.toggle('is-on', scrollY > 600);
    addEventListener('scroll', syncTop, { passive: true });
    syncTop();
    toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  }

  // ---------- счётчики ----------
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, to = Number(el.dataset.count), t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1800);
        el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - k, 3)))) + (el.dataset.suffix ?? '');
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: 0.5 });
    counters.forEach((el) => io.observe(el));
  }

  // ---------- до и после ----------
  const compare = $('[data-compare]');
  if (compare) {
    const after = $('[data-compare-after]', compare);
    const handle = $('[data-compare-handle]', compare);
    const label = $('[data-compare-label]', compare);
    let drag = false;
    const set = (x) => {
      const r = compare.getBoundingClientRect();
      const a = Math.max(3, Math.min(97, ((x - r.left) / r.width) * 100));
      after.style.clipPath = `inset(0 ${100 - a}% 0 0)`;
      handle.style.left = a + '%';
      label.style.opacity = a > 12 ? '1' : '0';
      compare.dataset.pos = a.toFixed(1);
    };
    compare.addEventListener('pointerdown', (e) => { drag = true; compare.setPointerCapture?.(e.pointerId); set(e.clientX); });
    compare.addEventListener('pointermove', (e) => drag && set(e.clientX));
    addEventListener('pointerup', () => (drag = false));
    compare.tabIndex = 0;
    compare.setAttribute('role', 'slider');
    compare.setAttribute('aria-label', 'Сравнение до и после');
    compare.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const r = compare.getBoundingClientRect();
      const cur = Number(compare.dataset.pos ?? 50) + (e.key === 'ArrowRight' ? 5 : -5);
      set(r.left + (r.width * cur) / 100);
      e.preventDefault();
    });
  }

  // ---------- отзывы: ДЕМО только для макета (на Angular-сайт не переносятся — там свой site-behavior.ts) ----------
  // Фото в демо-отзывах — только в макете (localhost, #test). На боевом домене — нарисованные силуэты,
  // чтобы вымышленный отзыв не выглядел отзывом реального клиента.
  const DEMO_PHOTOS = location.hash === '#test' || new URLSearchParams(location.search).has('test')
    || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const ASSET_BASE = document.currentScript?.src ?? location.href;
  const DEMO_REVIEWS = [
    { name: 'Марина', photo: 'img/avatars/marina.png', bg: '#e8e2d6', fg: '#0d223d', hair: 'bob', cat: 'Льняные шторы · Москва', text: 'Понравилось, что можно было спокойно посмотреть ткани дома и примерить к интерьеру. Результат совпал с эскизом, ничего переделывать не пришлось.' },
    { name: 'Ирина', photo: 'img/avatars/irina.jpg', bg: '#0d223d', fg: '#c9a84c', hair: 'long', cat: 'Римские шторы · Троицк', text: 'Дизайнер приехала с образцами в удобное время и помогла подобрать ткань для кухни. Шторы сшили точно по размеру, установили быстро и аккуратно.' },
    { name: 'Сергей', photo: 'img/avatars/sergey.png', bg: '#c9a84c', fg: '#0d223d', hair: 'short', cat: 'Шторы блэкаут · Ватутинки', text: 'Искали плотные шторы в спальню, чтобы утром не будил свет. Сделали замеры, повесили карниз и шторы за один приезд — в комнате теперь полная темнота.' },
  ];
  const slider = $('[data-slider]');
  if (slider) {
    const slide = $('[data-slide]', slider);
    const quote = $('[data-quote]', slider);
    const nameEl = $('[data-name]', slider);
    const catEl = $('[data-cat]', slider);
    const avatar = $('[data-avatar]', slider);
    const note = $('[data-reviews-note]');
    const dots = $$('[data-dot]', slider);
    const fill = (i) => {
      const r = DEMO_REVIEWS[i % DEMO_REVIEWS.length];
      quote.textContent = r.text;
      quote.classList.remove('text-slate/50');
      if (nameEl) { nameEl.textContent = `${r.name}`; nameEl.classList.remove('text-slate/60'); }
      if (catEl) catEl.textContent = r.cat;
      if (avatar) {
        // Иллюстрация-силуэт, не фото человека: демо-отзывы вымышленные
        const hair = { long: 'M14 30c-3-8 0-18 10-18s13 10 10 18c-2-4-4-9-10-9s-8 5-10 9z', short: 'M15 20c0-6 4-9 9-9s9 3 9 9c-2-3-5-4-9-4s-7 1-9 4z', bob: 'M13 25c-1-9 3-14 11-14s12 5 11 14c-2-5-5-8-11-8s-9 3-11 8z' }[r.hair];
        avatar.innerHTML = `<svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="${r.bg}"/><circle cx="24" cy="21" r="8" fill="${r.fg}" opacity=".9"/><path d="${hair}" fill="${r.fg}"/><path d="M9 44c2-9 8-13 15-13s13 4 15 13" fill="${r.fg}" opacity=".9"/></svg>`;
        avatar.classList.remove('bg-sand');
        avatar.classList.add('overflow-hidden');
        if (DEMO_PHOTOS && r.photo) {
          avatar.innerHTML = `<img src="${new URL(r.photo, ASSET_BASE).href}" alt="" width="48" height="48" class="size-full rounded-full object-cover" />`;
        }
      }
    };
    if (note) note.textContent = 'Демо-отзывы для макета — на сайт не переносятся';
    fill(0);
    let index = 0, token = 0;
    const go = (i) => {
      i = (i + dots.length) % dots.length;
      if (i === index) return;
      index = i;
      dots.forEach((d, k) => $('.dot', d).classList.toggle('is-on', k === i));
      slider.dataset.index = String(i);
      const my = ++token;
      slide.classList.add('is-out');
      setTimeout(() => {
        if (my !== token) return;
        fill(i);
        slide.classList.remove('is-out');
      }, 400);
    };
    $('[data-prev]', slider).addEventListener('click', () => go(index - 1));
    $('[data-next]', slider).addEventListener('click', () => go(index + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    // Свайп пальцем: влево — следующий, вправо — предыдущий. Короткие и вертикальные движения не листают.
    let touchX = null, touchY = 0;
    slider.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX, dy = e.changedTouches[0].clientY - touchY;
      touchX = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
    }, { passive: true });
    // Автопрокрутка отзывов выключена: листаются только стрелками и точками
  }

  // ---------- FAQ ----------
  const qs = $$('[data-faq-q]');
  qs.forEach((q) => q.addEventListener('click', () => {
    const open = q.getAttribute('aria-expanded') !== 'true';
    qs.forEach((other) => {
      const on = other === q && open;
      if ((other.getAttribute('aria-expanded') === 'true') === on) return;
      other.setAttribute('aria-expanded', String(on));
      const a = other.nextElementSibling;
      on ? openH(a, 280) : closeH(a);
    });
  }));

  // ---------- шапка прячется при прокрутке вниз ----------
  // Появляется при прокрутке вверх; при открытом мобильном меню и в начале страницы видна всегда.
  if (header && !reduced) {
    let lastY = scrollY;
    addEventListener('scroll', () => {
      const y = scrollY;
      const menuOpen = burger?.getAttribute('aria-expanded') === 'true';
      if (menuOpen || y < 200) header.classList.remove('is-hidden');
      else if (y > lastY + 6) header.classList.add('is-hidden');
      else if (y < lastY - 6) header.classList.remove('is-hidden');
      lastY = y;
    }, { passive: true });
    header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  }

  // Данные каталога для калькулятора и квиза: { key, title, unit, min, image, href }
  const catalogData = (() => { try { return JSON.parse($('#calc-data')?.textContent || '[]'); } catch { return []; } })();
  const money = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const dec = (n) => String(n).replace('.', ',');

  // ---------- калькулятор штор ----------
  const calc = $('[data-calc]');
  if (calc && catalogData.length) {
    const kinds = $('[data-calc-kinds]', calc);
    const widthIn = $('[data-calc-width]', calc);
    const heightIn = $('[data-calc-height]', calc);
    const rodIn = $('[data-calc-rod]', calc);
    const rod = catalogData.find((c) => c.key === 'curtain-rods');
    const curtains = catalogData.filter((c) => c.key !== 'curtain-rods');
    kinds.innerHTML = curtains.map((c, i) => '<label class="calc-option"><input type="radio" name="kind" value="' + c.key + '" class="sr-only"' + (i === 0 ? ' checked' : '') + ' />'
      + '<span class="calc-option-box"><img src="' + c.image + '" alt="" loading="lazy" class="calc-kind-img" />'
      + '<b class="font-serif text-[17px] leading-tight">' + c.title + '</b><span class="text-[13px] text-slate/80">от ' + money(c.min) + ' ₽/' + c.unit + '</span></span></label>').join('');
    // Стоимость вида под введённые размеры (без карниза): ткань по м.пог. с пышностью или площадь от 0,5 м²
    const costOf = (c, w, h) => {
      const k = Number($('input[name="fullness"]:checked', calc)?.value || 2);
      return c.unit === 'м.пог.' ? Math.ceil((w / 100 * k + 0.2) * 10) / 10 * c.min : Math.max(0.5, Math.ceil(w / 100 * h / 100 * 100) / 100) * c.min;
    };

    const render = () => {
      const kind = curtains.find((c) => c.key === $('input[name="kind"]:checked', calc)?.value) ?? curtains[0];
      const byMeter = kind.unit === 'м.пог.';
      const w = Number(widthIn.value), h = Number(heightIn.value);
      const bad = !(w >= 30 && w <= 1500 && h >= 30 && h <= 600);
      $('[data-calc-error]', calc).classList.toggle('hidden', !bad);
      $('[data-calc-fullness-step] .grid', calc).classList.toggle('hidden', !byMeter);
      $('[data-calc-width-label]', calc).textContent = byMeter ? 'Ширина карниза, см' : 'Ширина окна (створки), см';
      $('[data-calc-height-label]', calc).textContent = byMeter ? 'Высота от карниза до пола, см' : 'Высота окна (створки), см';
      $('[data-calc-width-hint]', calc).textContent = byMeter
        ? 'Длина карниза от края до края. Если карниза ещё нет — ширина окна плюс по 15–20 см с каждой стороны.'
        : 'Для крепления в проём — ширина проёма, на створку — ширина стекла со штапиком.';
      $('[data-calc-height-hint]', calc).textContent = byMeter
        ? 'Для штор в пол — до пола минус 1–2 см, чтобы ткань не собирала пыль.'
        : 'От верха рамы до подоконника или до нижнего края створки.';
      $('[data-calc-title]', calc).textContent = kind.title;
      const rows = [];
      let total = 0, summary = '';
      if (!bad) {
        const wm = w / 100, hm = h / 100;
        if (byMeter) {
          const k = Number($('input[name="fullness"]:checked', calc)?.value || 2);
          const fabric = Math.ceil((wm * k + 0.2) * 10) / 10; // +20 см на боковые подгибы
          const cut = Math.ceil((hm + 0.3) * 10) / 10; // +30 см на подгиб низа и тесьму
          total = fabric * kind.min;
          rows.push(['Ширина × пышность', money(w) + ' см × ' + dec(k)], ['Ткани нужно', dec(fabric) + ' м.пог.'], ['Высота полотна с подгибами', dec(cut) + ' м']);
          if (cut > 3) rows.push(['Внимание', 'выше 3 м — нужна ткань большой высоты или сшивка']);
          summary = kind.title + ': карниз ' + w + ' см, высота ' + h + ' см, пышность ×' + dec(k) + ', ткани ~' + dec(fabric) + ' м.пог.';
        } else {
          const area = Math.max(0.5, Math.ceil(wm * hm * 100) / 100); // минимальная площадь изделия
          total = area * kind.min;
          rows.push(['Размер', money(w) + ' × ' + money(h) + ' см'], ['Площадь', dec(area) + ' м²']);
          summary = kind.title + ': ' + w + ' × ' + h + ' см, площадь ~' + dec(area) + ' м²';
        }
        rows.push([kind.title, 'от ' + money(total) + ' ₽']);
        if (rodIn.checked && rod) {
          const rodM = Math.ceil(wm * 10) / 10;
          const rodSum = rodM * rod.min;
          rows.push(['Карниз ' + dec(rodM) + ' м', 'от ' + money(rodSum) + ' ₽']);
          total += rodSum;
          summary += '; карниз ~' + dec(rodM) + ' м';
        }
      }
      $('[data-calc-rows]', calc).innerHTML = rows.map(([a, b]) => '<div class="flex items-baseline justify-between gap-4 py-2.5"><dt class="text-cream/70">' + a + '</dt><dd class="text-right font-bold">' + b + '</dd></div>').join('');
      $('[data-calc-total]', calc).textContent = bad ? '—' : 'от ' + money(total) + ' ₽';
      calc.dataset.summary = bad ? '' : summary + '. Ориентировочно от ' + money(total) + ' ₽.';
      const hidden = $('[data-inline-lead="calc"] [data-inline-comment]');
      if (hidden) hidden.value = calc.dataset.summary ? 'Расчёт с калькулятора — ' + calc.dataset.summary : '';
    };
    calc.addEventListener('input', render);
    calc.addEventListener('change', render);
    render();
  }

  // ---------- подбор штор (квиз) ----------
  const quiz = $('[data-quiz]');
  if (quiz && catalogData.length) {
    const steps = $$('[data-quiz-step]', quiz);
    const result = $('[data-quiz-result]', quiz);
    const next = $('[data-quiz-next]', quiz), back = $('[data-quiz-back]', quiz);
    const hint = $('[data-quiz-hint]', quiz), nav = $('[data-quiz-nav]', quiz);
    // Баллы разделам каталога за ответы
    const SCORES = {
      room: { bedroom: { 'blackout-curtains': 3, 'roman-blinds': 1 }, living: { 'linen-curtains': 2, 'blackout-curtains': 1, 'curtain-rods': 1 }, kids: { 'blackout-curtains': 2, 'roller-blinds': 2 },
        kitchen: { 'roman-blinds': 3, 'roller-blinds': 2, blinds: 1 }, office: { blinds: 3, 'roller-blinds': 2 }, other: { 'linen-curtains': 1, 'roller-blinds': 1 } },
      light: { dark: { 'blackout-curtains': 4, 'roller-blinds': 1 }, soft: { 'linen-curtains': 3, 'roman-blinds': 1, 'pleated-blinds': 1 }, privacy: { 'pleated-blinds': 2, 'roller-blinds': 2, blinds: 2 }, decor: { 'roman-blinds': 2, 'linen-curtains': 2, 'curtain-rods': 1 } },
      window: { standard: {}, panoramic: { 'linen-curtains': 2, 'blackout-curtains': 1, 'curtain-rods': 2 }, attic: { 'pleated-blinds': 4, 'roller-blinds': 1 }, door: { 'roller-blinds': 2, blinds: 2, 'pleated-blinds': 1 } },
      style: { classic: { 'roman-blinds': 2, 'blackout-curtains': 1, 'curtain-rods': 1 }, modern: { 'roller-blinds': 2, blinds: 2, 'pleated-blinds': 1 }, eco: { 'linen-curtains': 3, 'roman-blinds': 1 } },
    };
    let current = 0;
    const answer = (i) => $('input:checked', steps[i]);
    const renderResult = () => {
      const score = {};
      steps.forEach((st, i) => {
        const table = SCORES[st.dataset.quizStep]?.[answer(i)?.value] ?? {};
        for (const [k, v] of Object.entries(table)) score[k] = (score[k] ?? 0) + v;
      });
      const top = catalogData.filter((c) => score[c.key]).sort((a, b) => score[b.key] - score[a.key]).slice(0, 2);
      $('[data-quiz-cards]', quiz).innerHTML = top.map((c) => '<a href="' + c.href + '" class="work group relative block overflow-hidden rounded-[4px] bg-navy text-cream">'
        + '<div class="relative aspect-[4/3] overflow-hidden"><img src="' + c.image + '" alt="' + c.title + '" loading="lazy" class="absolute inset-0 size-full object-cover" /></div>'
        + '<div class="flex items-center justify-between gap-3 p-5"><span><b class="block font-serif text-[20px] leading-tight">' + c.title + '</b><span class="text-[14px] text-cream/70">от ' + money(c.min) + ' ₽/' + c.unit + '</span></span>'
        + '<span class="text-gold transition-transform duration-300 group-hover:translate-x-1">→</span></div></a>').join('');
      quiz.dataset.summary = steps.map((st, i) => st.querySelector('legend').textContent.trim() + ' ' + (answer(i)?.closest('label').querySelector('b').textContent ?? '—')).join('; ')
        + '. Рекомендация: ' + top.map((c) => c.title).join(', ') + '.';
      const hidden = $('[data-inline-lead="quiz"] [data-inline-comment]');
      if (hidden) hidden.value = 'Подбор штор — ' + quiz.dataset.summary;
    };
    const show = () => {
      const done = current >= steps.length;
      steps.forEach((st, i) => { st.hidden = i !== current; });
      result.hidden = !done;
      nav.hidden = done;
      back.hidden = current === 0;
      next.disabled = !done && !answer(current);
      next.textContent = current === steps.length - 1 ? 'Показать результат' : 'Далее →';
      hint.textContent = !done && !answer(current) ? 'Выберите вариант' : '';
      $('[data-quiz-counter]', quiz).textContent = done ? 'Готово' : 'Вопрос ' + (current + 1) + ' из ' + steps.length;
      $('[data-quiz-bar]', quiz).style.width = (Math.min(current + (done ? 0 : 1), steps.length) / steps.length) * 100 + '%';
      if (done) renderResult();
    };
    quiz.addEventListener('change', () => show());
    next.addEventListener('click', () => { if (answer(current)) { current++; show(); quiz.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' }); } });
    back.addEventListener('click', () => { current = Math.max(0, current - 1); show(); });
    $('[data-quiz-restart]', quiz).addEventListener('click', () => { $$('[data-quiz-step] input[type="radio"]', quiz).forEach((r) => (r.checked = false)); current = 0; show(); });
    show();
  }

  // ---------- формы заявки ----------
  const digits = (v) => v.replace(/\D/g, '');
  const mask = (v) => {
    let d = digits(v);
    if (!d) return '';
    if (d[0] === '8') d = '7' + d.slice(1);
    if (d[0] !== '7') d = '7' + d;
    d = d.slice(0, 11);
    const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
    return '+7' + (p[0] ? ` (${p[0]}` : '') + (p[0].length === 3 ? ')' : '') + (p[1] ? ` ${p[1]}` : '') + (p[2] ? `-${p[2]}` : '') + (p[3] ? `-${p[3]}` : '');
  };
  $$('[data-phone]').forEach((input) => input.addEventListener('input', () => {
    input.value = mask(input.value);
    input.classList.remove('is-error');
  }));
  // Письма заявок: assets/email.js подгружается рядом с site.js (window.ShtorivdomEmail).
  // Режим проверки — адрес с #test (как на сайте) или ?test: письмо в console и окно предпросмотра.
  const isTest = location.hash === '#test' || new URLSearchParams(location.search).has('test');
  // Макет на localhost без PHP: заявку отправлять некуда, поэтому только предпросмотр письма
  const isMock = isTest || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const emailScript = document.createElement('script');
  const emailUrl = new URL('email.js', document.currentScript?.src ?? location.href);
  if (document.currentScript?.dataset.emailV) emailUrl.search = '?v=' + document.currentScript.dataset.emailV; // версия против кеша хостинга
  emailScript.src = emailUrl.href;
  document.head.appendChild(emailScript);

  // Тип письма по форме: data-lead-form="kind" → анкета партнёра → первый экран → карниз из каталога → контакты → заказ
  const leadKind = (form, data) =>
    form.dataset.leadForm ||
    (form.id === 'form-partner' ? 'partner'
      : form.closest('#hero-form') ? 'designer'
      : data.model ? 'curtain-rod'
      : page.startsWith('contact') ? 'contact'
      : 'order');

  /** Режим макета (#test): письмо собирается в браузере и показывается в окне предпросмотра.
      Настоящая отправка — в submitLead ниже: поля уходят в /api/lead.php, письмо собирает сервер. */
  const sendLead = ({ subject, html, text, clientEmail, client }) => {
    if (!isTest) return Promise.resolve(true);
    console.log('[заявка] письмо в салон:', subject, '\n' + text, '\n', html);
    if (client) console.log('[заявка] письмо клиенту ' + clientEmail + ':', client.subject, '\n' + client.text);
    previewLead(subject, html);
    return Promise.resolve(true);
  };
  const previewLead = (subject, html) => {
    const box = document.createElement('div');
    box.setAttribute('data-email-preview', '');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Предпросмотр письма');
    box.style.cssText = 'position:fixed;inset:0;z-index:1000;background:rgb(8 22 41/.7);display:flex;align-items:center;justify-content:center;padding:16px';
    box.innerHTML = '<div style="background:#f5f0e8;border-radius:4px;width:min(660px,100%);height:min(90vh,900px);display:flex;flex-direction:column;overflow:hidden"><div style="display:flex;gap:12px;align-items:center;padding:10px 14px;background:#0d223d;color:#fff;font-size:14px"><b style="flex:1"></b><button type="button" style="color:#c9a84c;font-weight:700">Закрыть ✕</button></div><iframe title="Письмо" style="flex:1;border:0;width:100%;background:#fff"></iframe></div>';
    $('b', box).textContent = 'Тест: ' + subject;
    $('iframe', box).srcdoc = html;
    const close = () => box.remove();
    $('button', box).addEventListener('click', close);
    box.addEventListener('click', (e) => e.target === box && close());
    document.body.appendChild(box);
    $('button', box).focus();
  };
  /** Поля заявки → серверный обработчик. Письмо собирает сервер: из браузера уходят только поля. */
  const submitLead = (form) => {
    const v = (n) => form.elements[n]?.value?.trim() || undefined;
    const data = { name: v('name'), phone: v('phone'), email: v('email'), theme: v('theme'), city: v('city'), description: v('comment'), model: form.dataset.orderModel };
    const kind = leadKind(form, data);

    // На localhost (макет без PHP) заявка не отправляется: с #test открывается предпросмотр письма, иначе просто «Спасибо».
    if (isMock) {
      const api = window.ShtorivdomEmail;
      if (!isTest || !api) return Promise.resolve(true);
      const lead = api.buildLeadEmail(kind, data, { pageTitle: document.title, pageUrl: location.href.split('#')[0], sentAt: new Date() });
      const client = api.buildClientEmail(kind, data);
      return sendLead({ ...lead, clientEmail: client ? data.email : undefined, client });
    }

    return fetch('/api/lead.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        kind,
        consent: true,
        website: form.elements.website?.value ?? '',      // ловушка для ботов
        formTime: Date.now() - (Number(form.dataset.openedAt) || Date.now()),
        pageTitle: document.title,
        pageUrl: location.href.split('#')[0],
      }),
    })
      .then((r) => r.json().catch(() => ({ ok: r.ok })))
      .then((r) => {
        if (!r.ok) throw new Error(r.error || 'Не удалось отправить заявку');
        return true;
      });
  };

  $$('[data-lead-form]').forEach((form) => {
    const phone = $('[data-phone]', form);
    const consent = $('[data-consent]', form);
    const submit = $('[type="submit"]', form);
    form.dataset.openedAt = String(Date.now());   // время заполнения: слишком быстрая отправка — бот
    const err = (name, on) => $(`[data-error="${name}"]`, form)?.classList.toggle('hidden', !on);
    const failBox = () => {
      let box = $('[data-send-error]', form);
      if (!box) {
        box = document.createElement('p');
        box.setAttribute('data-send-error', '');
        box.setAttribute('role', 'alert');
        box.className = 'text-[14px] leading-relaxed text-[#c0392b]';
        submit?.before(box);
      }
      return box;
    };
    consent?.addEventListener('change', () => consent.checked && err('consent', false));
    phone.addEventListener('input', () => err('phone', false));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const badPhone = digits(phone.value).length !== 11;
      const badConsent = consent && !consent.checked;
      err('phone', badPhone);
      err('consent', badConsent);
      phone.classList.toggle('is-error', badPhone);
      $('[data-phone-wrap]', form)?.classList.toggle('!border-[#c0392b]', badPhone);
      if (badPhone) return phone.focus();
      if (badConsent) return consent.focus();

      $('[data-send-error]', form)?.remove();
      if (submit) {
        submit.disabled = true;
        submit.dataset.label = submit.textContent;
        submit.textContent = 'Отправляем…';
      }
      Promise.resolve(submitLead(form))
        .then(() => {
          const done = document.createElement('div');
          done.className = 'form-done py-8 text-center';
          done.setAttribute('role', 'status');
          done.setAttribute('data-thanks', '');
          done.innerHTML = '<p class="mb-3 font-serif text-[30px] font-bold text-gold">Спасибо!</p><p class="text-[16px] leading-relaxed text-slate">Ваша заявка успешно отправлена! Мы скоро с вами свяжемся.</p>';
          form.replaceWith(done);
          void done.offsetHeight;
          done.classList.add('is-in');
        })
        .catch((e) => {
          failBox().textContent = (e?.message || 'Не удалось отправить заявку') + '. Позвоните нам: +7 (925) 594-61-17';
          if (submit) {
            submit.disabled = false;
            submit.textContent = submit.dataset.label || 'Отправить';
          }
        });
    });
  });
  // ---------- вкладки (страница цен): стрелки ←/→, #ключ в адресе открывает вкладку ----------
  $$('[data-tabs]').forEach((box) => {
    const tabs = $$('[role="tab"]', box);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => { select(t); history.replaceState(null, '', '#' + t.dataset.tab); });
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
      });
    });
    const fromHash = () => tabs.find((t) => '#' + t.dataset.tab === location.hash);
    select(fromHash() ?? tabs[0]);
    addEventListener('hashchange', () => fromHash() && select(fromHash()));
  });
  // «Пригласить дизайнера» в первом экране — фокус на первое поле формы (имя)
  $$('[data-focus-form]').forEach((a) => a.addEventListener('click', () => setTimeout(() => $('#hero-form input[name="name"]')?.focus({ preventScroll: true }), 400)));
})();
