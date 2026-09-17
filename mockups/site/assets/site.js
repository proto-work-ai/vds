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
