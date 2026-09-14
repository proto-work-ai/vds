/* Интерактив страниц каталога (mockups/site/catalog/**). Общий site.js — меню, reveal, FAQ, формы.

   - лента фото [data-strip]: стрелки [data-strip-prev/next] листают на ширину видимой части;
   - лайтбокс: [data-gallery-item] внутри [data-gallery] — фото крупно, стрелки/клавиши ← →,
     свайп, Escape / крестик / клик по фону закрывают, фокус возвращается на фото;
   - «Заказать карниз» [data-order]: подставляет модель в комментарий формы заявки. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---------- ленты ----------
  $$('[data-strip]').forEach((strip) => {
    const box = strip.parentElement;
    const prev = $('[data-strip-prev]', box), next = $('[data-strip-next]', box);
    const sync = () => {
      if (prev) prev.disabled = strip.scrollLeft <= 2;
      if (next) next.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;
    };
    const go = (dir) => strip.scrollBy({ left: dir * strip.clientWidth * 0.9, behavior: 'smooth' });
    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
    strip.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    sync();
  });

  // ---------- лайтбокс ----------
  const lb = document.createElement('div');
  lb.className = 'cat-lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Просмотр фото');
  lb.setAttribute('data-lightbox', '');
  const icon = (d) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="${d}"/></svg>`;
  lb.innerHTML = `
    <button type="button" class="cat-lb-btn cat-lb-close" aria-label="Закрыть" data-lb-close>${icon('M18 6 6 18M6 6l12 12')}</button>
    <button type="button" class="cat-lb-btn cat-lb-prev" aria-label="Предыдущее фото" data-lb-prev>${icon('m15 18-6-6 6-6')}</button>
    <button type="button" class="cat-lb-btn cat-lb-next" aria-label="Следующее фото" data-lb-next>${icon('m9 18 6-6-6-6')}</button>
    <figure><img alt="" data-lb-img /><figcaption><span data-lb-caption></span> <span class="ml-2 text-gold" data-lb-count></span></figcaption></figure>`;
  document.body.appendChild(lb);
  const lbImg = $('[data-lb-img]', lb);
  let items = [], index = 0, opener = null, lastFocus = null;

  const show = (i, swap = true) => {
    index = (i + items.length) % items.length;
    const it = items[index];
    const apply = () => {
      lbImg.src = it.dataset.src;
      lbImg.alt = it.dataset.alt ?? '';
      $('[data-lb-caption]', lb).textContent = it.dataset.alt ?? '';
      $('[data-lb-count]', lb).textContent = `${index + 1} / ${items.length}`;
      lbImg.classList.remove('is-swap');
    };
    lb.dataset.index = String(index);
    const multi = items.length > 1;
    $('[data-lb-prev]', lb).hidden = !multi;
    $('[data-lb-next]', lb).hidden = !multi;
    if (swap) { lbImg.classList.add('is-swap'); setTimeout(apply, 150); } else apply();
  };
  const open = (item) => {
    const gallery = item.closest('[data-gallery]') ?? item;
    items = $$('[data-gallery-item]', gallery);
    if (!items.includes(item)) items = [item];
    opener = item;
    lastFocus = document.activeElement;
    show(items.indexOf(item), false);
    lb.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => $('[data-lb-close]', lb).focus(), 50);
  };
  const close = () => {
    if (!lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    (opener ?? lastFocus)?.focus?.({ preventScroll: true });
  };

  document.addEventListener('click', (e) => {
    const item = e.target.closest('[data-gallery-item]');
    if (item && !lb.contains(item)) open(item);
  });
  $('[data-lb-close]', lb).addEventListener('click', close);
  $('[data-lb-prev]', lb).addEventListener('click', () => show(index - 1));
  $('[data-lb-next]', lb).addEventListener('click', () => show(index + 1));
  lb.addEventListener('click', (e) => e.target === lb && close());
  addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && items.length > 1) show(index - 1);
    else if (e.key === 'ArrowRight' && items.length > 1) show(index + 1);
    else if (e.key === 'Tab') {
      // фокус не уходит из окна
      const f = $$('button:not([hidden])', lb);
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
  let x0 = null;
  lb.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 === null || items.length < 2) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  // ---------- заказ модели ----------
  $$('[data-order]').forEach((a) => a.addEventListener('click', () => {
    const field = $('#lead-comment');
    if (field && !field.value) field.value = `Интересует: ${a.dataset.order}`;
  }));
})();
