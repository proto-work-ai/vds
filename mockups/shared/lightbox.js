/* Общий лайтбокс для страниц макетов.

   Кнопка с data-lightbox="image" (data-src, data-title, data-text) открывает
   картинку в полном размере; data-lightbox="icon" — вложенный SVG крупно.
   Закрытие: крестик, клик по фону, Escape. Стрелки ← → листают карточки
   того же вида на странице. */
(() => {
  const items = () => [...document.querySelectorAll('[data-lightbox]')];

  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-black/85 p-4';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <button type="button" data-close class="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[22px] text-white hover:bg-white/20" title="Закрыть">×</button>
    <button type="button" data-prev class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-[22px] text-white hover:bg-white/20" title="Предыдущая">‹</button>
    <button type="button" data-next class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-[22px] text-white hover:bg-white/20" title="Следующая">›</button>
    <figure class="flex max-h-full max-w-[1200px] flex-col items-center gap-3">
      <div data-body class="flex max-h-[80vh] items-center justify-center"></div>
      <figcaption class="max-w-[800px] text-center text-white">
        <p data-title class="text-[14px] font-semibold"></p>
        <p data-text class="text-[14px] text-white/70"></p>
      </figcaption>
    </figure>`;
  document.body.appendChild(overlay);

  const body = overlay.querySelector('[data-body]');
  let current = null;

  const open = (btn) => {
    current = btn;
    body.innerHTML = '';
    if (btn.dataset.lightbox === 'image') {
      const img = document.createElement('img');
      img.src = btn.dataset.src;
      img.alt = btn.dataset.title || '';
      img.className = 'max-h-[80vh] max-w-full rounded-lg object-contain';
      body.appendChild(img);
    } else {
      const svg = btn.querySelector('svg')?.cloneNode(true);
      if (svg) {
        svg.setAttribute('class', 'h-[40vh] w-[40vh] text-white');
        body.appendChild(svg);
      }
    }
    overlay.querySelector('[data-title]').textContent = btn.dataset.title || '';
    overlay.querySelector('[data-text]').textContent = btn.dataset.text || '';
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    overlay.querySelector('[data-close]').focus();
  };

  const close = () => {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    current?.focus();
    current = null;
  };

  const step = (dir) => {
    if (!current) return;
    const list = items().filter((b) => b.dataset.lightbox === current.dataset.lightbox);
    const i = list.indexOf(current);
    open(list[(i + dir + list.length) % list.length]);
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lightbox]');
    if (btn) return open(btn);
    if (e.target === overlay || e.target.closest('[data-close]')) return close();
    if (e.target.closest('[data-prev]')) return step(-1);
    if (e.target.closest('[data-next]')) return step(1);
  });

  document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
