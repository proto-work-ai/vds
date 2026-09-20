/*
 * Интерактив страниц — перенос mockups/site/assets/site.js и catalog.js.
 * Шаблоны страниц статичные (генерируются из прототипа), поэтому поведение навешивается
 * на готовый DOM после отрисовки: initPage — на каждую страницу (снимается через AbortSignal),
 * installGlobal — один раз (лайтбокс, Escape в выпадающем меню). Шапка и «наверх» — компоненты site-kit.
 */
import { buildLeadEmail, LeadData, LeadKind } from './lead-email';
import { DEFAULT_CONTACT_CONFIG } from '../contact-config';
import { toLocalPhone } from '../forms/phone-value';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
  r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
  Array.from(r.querySelectorAll<T>(s));

const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();
// Раскрытие «до auto»: анимируем к scrollHeight, после перехода снимаем высоту
const openH = (el: HTMLElement, ms = 300) => {
  el.style.height = el.scrollHeight + 'px';
  clearTimeout(timers.get(el));
  timers.set(
    el,
    setTimeout(() => (el.style.height = 'auto'), ms),
  );
};
const closeH = (el: HTMLElement) => {
  clearTimeout(timers.get(el));
  el.style.height = el.scrollHeight + 'px';
  void el.offsetHeight;
  el.style.height = '0px';
};

const digits = (v: string) => v.replace(/\D/g, '');
const mask = (v: string) => {
  let d = digits(v);
  if (!d) return '';
  if (d[0] === '8') d = '7' + d.slice(1);
  if (d[0] !== '7') d = '7' + d;
  d = d.slice(0, 11);
  const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  return (
    '+7' +
    (p[0] ? ` (${p[0]}` : '') +
    (p[0].length === 3 ? ')' : '') +
    (p[1] ? ` ${p[1]}` : '') +
    (p[2] ? `-${p[2]}` : '') +
    (p[3] ? `-${p[3]}` : '')
  );
};

type Ym = (id: number, action: string, goal: string) => void;

export function initPage(root: HTMLElement, page: string, signal: AbortSignal): void {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opt = { signal };

  // ---------- появление ----------
  const reveals = $$('.reveal', root);
  if (reduced || !('IntersectionObserver' in window))
    reveals.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    reveals.forEach((el) => io.observe(el));
    signal.addEventListener('abort', () => io.disconnect());
  }

  // ---------- счётчики ----------
  const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const counters = $$('[data-count]', root);
  if (counters.length && 'IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const el = e.target as HTMLElement;
          const to = Number(el.dataset['count']);
          const t0 = performance.now();
          const tick = (t: number) => {
            const k = Math.min(1, (t - t0) / 1800);
            el.textContent =
              fmt(Math.round(to * (1 - Math.pow(1 - k, 3)))) + (el.dataset['suffix'] ?? '');
            if (k < 1 && !signal.aborted) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.5 },
    );
    counters.forEach((el) => io.observe(el));
    signal.addEventListener('abort', () => io.disconnect());
  }

  // ---------- до и после ----------
  const compare = $('[data-compare]', root);
  if (compare) {
    const after = $('[data-compare-after]', compare) as HTMLElement;
    const handle = $('[data-compare-handle]', compare) as HTMLElement;
    const label = $('[data-compare-label]', compare) as HTMLElement;
    let drag = false;
    const set = (x: number) => {
      const r = compare.getBoundingClientRect();
      const a = Math.max(3, Math.min(97, ((x - r.left) / r.width) * 100));
      after.style.clipPath = `inset(0 ${100 - a}% 0 0)`;
      handle.style.left = a + '%';
      label.style.opacity = a > 12 ? '1' : '0';
      compare.dataset['pos'] = a.toFixed(1);
    };
    compare.addEventListener('pointerdown', (e) => {
      drag = true;
      compare.setPointerCapture?.(e.pointerId);
      set(e.clientX);
    });
    compare.addEventListener('pointermove', (e) => drag && set(e.clientX));
    addEventListener('pointerup', () => (drag = false), opt);
    compare.tabIndex = 0;
    compare.setAttribute('role', 'slider');
    compare.setAttribute('aria-label', 'Сравнение до и после');
    compare.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const r = compare.getBoundingClientRect();
      const cur = Number(compare.dataset['pos'] ?? 50) + (e.key === 'ArrowRight' ? 5 : -5);
      set(r.left + (r.width * cur) / 100);
      e.preventDefault();
    });
  }

  // ---------- отзывы ----------
  const slider = $('[data-slider]', root);
  if (slider) {
    const slide = $('[data-slide]', slider) as HTMLElement;
    const quote = $('[data-quote]', slider) as HTMLElement;
    const nameEl = $('[data-name]', slider) as HTMLElement | null;
    const catEl = $('[data-cat]', slider) as HTMLElement | null;
    const dots = $$('[data-dot]', slider);
    const avatar = $('[data-avatar]', slider) as HTMLElement | null;
    const reviews = [
      {
        name: 'Марина',
        cat: 'Льняные шторы · Москва',
        text: 'Понравилось, что можно было спокойно посмотреть ткани дома и примерить к интерьеру. Результат совпал с эскизом, ничего переделывать не пришлось.',
        avatar: '/assets/img/avatars/marina.png',
      },
      {
        name: 'Ирина',
        cat: 'Римские шторы · Троицк',
        text: 'Дизайнер приехала с образцами в удобное время и помогла подобрать ткань для кухни. Шторы сшили точно по размеру, установили быстро и аккуратно.',
        avatar: '/assets/img/avatars/irina.jpg',
      },
      {
        name: 'Сергей',
        cat: 'Шторы блэкаут · Ватутинки',
        text: 'Искали плотные шторы в спальню, чтобы утром не будил свет. Сделали замеры, повесили карниз и шторы за один приезд — в комнате теперь полная темнота.',
        avatar: '/assets/img/avatars/sergey.png',
      },
    ];
    const fill = (i: number) => {
      if (!avatar) return;
      const review = reviews[i % reviews.length];
      quote.textContent = review.text;
      if (nameEl) nameEl.textContent = review.name;
      if (catEl) catEl.textContent = review.cat;
      avatar.classList.remove('bg-sand');
      avatar.classList.add('overflow-hidden');
      avatar.innerHTML = `<img src="${review.avatar}" alt="" width="48" height="48" class="size-full rounded-full object-cover" />`;
    };
    fill(0);
    let index = 0;
    let token = 0;
    const go = (i: number) => {
      i = (i + dots.length) % dots.length;
      if (i === index) return;
      index = i;
      dots.forEach((d, k) => $('.dot', d)?.classList.toggle('is-on', k === i));
      slider.dataset['index'] = String(i);
      const my = ++token;
      slide.classList.add('is-out');
      setTimeout(() => {
        if (my !== token) return;
        fill(i);
        slide.classList.remove('is-out');
      }, 400);
    };
    $('[data-prev]', slider)?.addEventListener('click', () => go(index - 1));
    $('[data-next]', slider)?.addEventListener('click', () => go(index + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    // Без автопрокрутки. Свайп пальцем: влево — следующий, вправо — предыдущий; короткие и вертикальные движения не листают.
    let touchX: number | null = null;
    let touchY = 0;
    slider.addEventListener(
      'touchstart',
      (e) => {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      },
      { passive: true, signal },
    );
    slider.addEventListener(
      'touchend',
      (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        const dy = e.changedTouches[0].clientY - touchY;
        touchX = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
      },
      { passive: true, signal },
    );
  }

  // ---------- FAQ: открыт один ответ ----------
  const qs = $$('[data-faq-q]', root);
  qs.forEach((q) =>
    q.addEventListener('click', () => {
      const open = q.getAttribute('aria-expanded') !== 'true';
      qs.forEach((other) => {
        const on = other === q && open;
        if ((other.getAttribute('aria-expanded') === 'true') === on) return;
        other.setAttribute('aria-expanded', String(on));
        const a = other.nextElementSibling as HTMLElement;
        if (on) openH(a, 280);
        else closeH(a);
      });
    }),
  );

  // ---------- формы заявки ----------
  // Режим проверки — адрес с #test или ?test: письмо в консоль, без отправки
  const isTest = location.hash === '#test' || new URLSearchParams(location.search).has('test');
  const leadKind = (form: HTMLFormElement, data: LeadData): LeadKind =>
    (form.dataset['leadForm'] as LeadKind) ||
    (form.id === 'form-partner'
      ? 'partner'
      : form.closest('#hero-form')
        ? 'designer'
        : data.model
          ? 'curtain-rod'
          : page.startsWith('contact')
            ? 'contact'
            : 'order');

  const sendLead = async (form: HTMLFormElement) => {
    const v = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement | null)?.value?.trim() || undefined;
    const data: LeadData = {
      name: v('name'),
      phone: toLocalPhone(v('phone') ?? ''),
      email: v('email'),
      theme: v('theme'),
      city: v('city'),
      description: v('comment'),
      model: form.dataset['orderModel'],
    };
    const kind = leadKind(form, data);
    if (isTest) {
      const lead = buildLeadEmail(kind, data, {
        pageTitle: document.title,
        pageUrl: location.href.split('#')[0],
        sentAt: new Date(),
      });
      console.log('[заявка] письмо в салон:', lead.subject, '\n' + lead.text, '\n', lead.html);
      return;
    }
    // api/lead.php принимает поля формы и сам собирает письмо (SMTP, Telegram, журнал заявок)
    const res = await fetch('/api/lead.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        kind,
        consent: true,
        website: (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '', // ловушка для ботов
        formTime: Date.now() - (Number(form.dataset['openedAt']) || Date.now()),
        pageTitle: document.title,
        pageUrl: location.href.split('#')[0],
      }),
    });
    const answer = (await res.json().catch(() => ({ ok: res.ok }))) as {
      ok?: boolean;
      error?: string;
    };
    if (!res.ok || !answer.ok) throw new Error(answer.error || 'Не удалось отправить заявку');
    (window as unknown as { ym?: Ym }).ym?.(108545164, 'reachGoal', 'form-submit');
  };

  $$<HTMLInputElement>('[data-phone]', root).forEach((input) =>
    input.addEventListener('input', () => {
      input.value = mask(input.value);
      input.classList.remove('is-error');
    }),
  );

  $$<HTMLFormElement>('[data-lead-form]:not([data-angular-lead])', root).forEach((form) => {
    const phone = $<HTMLInputElement>('[data-phone]', form);
    const consent = $<HTMLInputElement>('[data-consent]', form);
    const submit = $<HTMLButtonElement>('button[type="submit"]', form);
    form.dataset['openedAt'] = String(Date.now()); // слишком быстрая отправка — бот
    const err = (name: string, on: boolean) =>
      $(`[data-error="${name}"]`, form)?.classList.toggle('hidden', !on);
    consent?.addEventListener('change', () => consent.checked && err('consent', false));
    phone?.addEventListener('input', () => err('phone', false));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!phone || submit?.disabled) return;
      const badPhone = digits(phone.value).length !== 11;
      const badConsent = !!consent && !consent.checked;
      err('phone', badPhone);
      err('consent', badConsent);
      phone.classList.toggle('is-error', badPhone);
      $('[data-phone-wrap]', form)?.classList.toggle('!border-[#c0392b]', badPhone);
      if (badPhone) return phone.focus();
      if (badConsent) return consent?.focus();

      if (submit) submit.disabled = true;
      $('[data-send-error]', form)?.remove();
      sendLead(form)
        .then(() => {
          const done = document.createElement('div');
          done.className = 'form-done py-8 text-center';
          done.setAttribute('role', 'status');
          done.setAttribute('data-thanks', '');
          done.innerHTML =
            '<p class="mb-3 font-serif text-[30px] font-bold text-gold">Спасибо!</p><p class="text-[16px] leading-relaxed text-current opacity-80">Ваша заявка успешно отправлена! Мы скоро с вами свяжемся.</p>';
          form.replaceWith(done);
          void done.offsetHeight;
          done.classList.add('is-in');
        })
        .catch((error: unknown) => {
          if (submit) submit.disabled = false;
          const p = document.createElement('p');
          p.className = 'text-[12px] text-[#c0392b]';
          p.setAttribute('role', 'alert');
          p.setAttribute('data-send-error', '');
          const reason =
            error instanceof Error && error.message ? error.message : 'Не удалось отправить заявку';
          p.append(`${reason}. Попробуйте ещё раз или позвоните: `);
          const phoneLink = document.createElement('a');
          phoneLink.href = `tel:+${DEFAULT_CONTACT_CONFIG.phone.replace(/\D/g, '')}`;
          phoneLink.textContent = DEFAULT_CONTACT_CONFIG.phone;
          phoneLink.className = 'underline';
          p.append(phoneLink);
          form.appendChild(p);
        });
    });
  });

  // ---------- вкладки (цены): стрелки ←/→, #ключ в адресе открывает вкладку ----------
  $$('[data-tabs]', root).forEach((box) => {
    const tabs = $$('[role="tab"]', box);
    const select = (tab: HTMLElement, focus = false) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => {
        select(t);
        history.replaceState(history.state, '', '#' + t.dataset['tab']);
      });
      t.addEventListener('keydown', (e) => {
        const k = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[e.key];
        if (k) {
          e.preventDefault();
          select(tabs[(i + k + tabs.length) % tabs.length], true);
        }
      });
    });
    const fromHash = () => tabs.find((t) => '#' + t.dataset['tab'] === location.hash);
    select(fromHash() ?? tabs[0]);
    addEventListener(
      'hashchange',
      () => {
        const t = fromHash();
        if (t) select(t);
      },
      opt,
    );
  });

  // «Пригласить дизайнера» в первом экране — фокус на поле имени
  $$('[data-focus-form]', root).forEach((a) =>
    a.addEventListener('click', () =>
      setTimeout(
        () =>
          $<HTMLInputElement>('#hero-form input[name="name"]', root)?.focus({
            preventScroll: true,
          }),
        400,
      ),
    ),
  );

  // ---------- ленты фото каталога ----------
  $$('[data-strip]', root).forEach((strip) => {
    const box = strip.parentElement as HTMLElement;
    const prev = $<HTMLButtonElement>('[data-strip-prev]', box);
    const next = $<HTMLButtonElement>('[data-strip-next]', box);
    const sync = () => {
      if (prev) prev.disabled = strip.scrollLeft <= 2;
      if (next) next.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;
    };
    const go = (dir: number) =>
      strip.scrollBy({ left: dir * strip.clientWidth * 0.9, behavior: 'smooth' });
    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
    strip.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync, opt);
    sync();
  });

  // «Заказать карниз»: модель — в комментарий и в тему письма
  $$('[data-order]', root).forEach((a) =>
    a.addEventListener('click', () => {
      const field = $<HTMLTextAreaElement>('#lead-comment', root);
      const model = a.dataset['order'] ?? '';
      if (field && !field.value) field.value = `Интересует: ${model}`;
      if (field?.form) field.form.dataset['orderModel'] = model;
    }),
  );
}

let installed = false;

/** Один раз на приложение: лайтбокс фото каталога и Escape в выпадающем меню шапки. */
export function installGlobal(doc: Document): void {
  if (installed) return;
  installed = true;

  doc.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (e.target as Element | null)?.closest?.('.has-dropdown'))
      (doc.activeElement as HTMLElement | null)?.blur();
  });

  const lb = doc.createElement('div');
  lb.className = 'cat-lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Просмотр фото');
  lb.setAttribute('data-lightbox', '');
  const icon = (d: string) =>
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="${d}"/></svg>`;
  lb.innerHTML = `
    <button type="button" class="cat-lb-btn cat-lb-close" aria-label="Закрыть" data-lb-close>${icon('M18 6 6 18M6 6l12 12')}</button>
    <button type="button" class="cat-lb-btn cat-lb-prev" aria-label="Предыдущее фото" data-lb-prev>${icon('m15 18-6-6 6-6')}</button>
    <button type="button" class="cat-lb-btn cat-lb-next" aria-label="Следующее фото" data-lb-next>${icon('m9 18 6-6-6-6')}</button>
    <figure><img alt="" data-lb-img /><figcaption><span data-lb-caption></span> <span class="ml-2 text-gold" data-lb-count></span></figcaption></figure>`;
  doc.body.appendChild(lb);
  const lbImg = $<HTMLImageElement>('[data-lb-img]', lb) as HTMLImageElement;
  const prevBtn = $<HTMLButtonElement>('[data-lb-prev]', lb) as HTMLButtonElement;
  const nextBtn = $<HTMLButtonElement>('[data-lb-next]', lb) as HTMLButtonElement;
  const closeBtn = $<HTMLButtonElement>('[data-lb-close]', lb) as HTMLButtonElement;
  let items: HTMLElement[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const show = (i: number, swap = true) => {
    index = (i + items.length) % items.length;
    const it = items[index];
    const apply = () => {
      lbImg.src = it.dataset['src'] ?? '';
      lbImg.alt = it.dataset['alt'] ?? '';
      ($('[data-lb-caption]', lb) as HTMLElement).textContent = it.dataset['alt'] ?? '';
      ($('[data-lb-count]', lb) as HTMLElement).textContent = `${index + 1} / ${items.length}`;
      lbImg.classList.remove('is-swap');
    };
    lb.dataset['index'] = String(index);
    prevBtn.hidden = nextBtn.hidden = items.length < 2;
    if (swap) {
      lbImg.classList.add('is-swap');
      setTimeout(apply, 150);
    } else apply();
  };
  const open = (item: HTMLElement) => {
    const gallery = item.closest<HTMLElement>('[data-gallery]') ?? item;
    items = $$('[data-gallery-item]', gallery);
    if (!items.includes(item)) items = [item];
    opener = item;
    show(items.indexOf(item), false);
    lb.classList.add('is-open');
    doc.documentElement.style.overflow = 'hidden';
    setTimeout(() => closeBtn.focus(), 50);
  };
  const close = () => {
    if (!lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    doc.documentElement.style.overflow = '';
    opener?.focus?.({ preventScroll: true });
  };

  doc.addEventListener('click', (e) => {
    const item = (e.target as Element | null)?.closest?.<HTMLElement>('[data-gallery-item]');
    if (item && !lb.contains(item)) open(item);
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));
  lb.addEventListener('click', (e) => e.target === lb && close());
  doc.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && items.length > 1) show(index - 1);
    else if (e.key === 'ArrowRight' && items.length > 1) show(index + 1);
    else if (e.key === 'Tab') {
      // фокус не уходит из окна
      const f = $$<HTMLButtonElement>('button:not([hidden])', lb);
      const i = f.indexOf(doc.activeElement as HTMLButtonElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
  let x0: number | null = null;
  lb.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 === null || items.length < 2) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    x0 = null;
  });
  // Переход на другую страницу закрывает окно
  addEventListener('popstate', close);
}
