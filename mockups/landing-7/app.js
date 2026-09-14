/* Интерактив макета «оригинал 7» (брошюра SAN Travels, 10 страниц A4) на чистом JS.

   - вкладки страниц в верхней панели, «← Prev» / «Next →», точки под страницей;
   - подпись «Page N of 10»;
   - «⬇ Download PDF»: оверлей «Generating Your PDF» с процентами, спиннер в
     кнопке, постраничный рендер html2canvas → jsPDF и сохранение файла.
   Страницы не придумываются: оригинал держит все 10 в скрытом контейнере
   (left: -9999px) для PDF — перевод содержит его целиком, отсюда и берём копии. */
(() => {
  // Данные и классы — в начале: const не поднимается, обработчики ниже их используют.
  const PAGE_COUNT_FALLBACK = 10;
  const PDF_FILE = 'SAN-Travels-Kerala-Luxury-Brochure.pdf';
  // Те же версии, что вшиты в сборку оригинала (jsPDF 4.2.1; html2canvas 1.x без oklch).
  const JSPDF_URL = 'https://cdn.jsdelivr.net/npm/jspdf@4.2.1/dist/jspdf.umd.min.js';
  const HTML2CANVAS_URL = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';

  const TAB_ON = ['[background:rgba(201,_168,_76,_0.15)]', '[border:1px_solid_rgba(201,_168,_76,_0.5)]', '[color:rgb(201,_168,_76)]'];
  const TAB_OFF = ['[background:transparent]', '[border:1px_solid_transparent]', '[color:rgba(255,_255,_255,_0.35)]'];
  const NAV_ON = ['[color:rgb(201,_168,_76)]', '[cursor:pointer]'];
  const NAV_OFF = ['[color:rgba(255,_255,_255,_0.2)]', '[cursor:not-allowed]'];
  const DOT_ON = ['[width:24px]', '[background:rgb(201,_168,_76)]'];
  const DOT_OFF = ['[width:8px]', '[background:rgba(201,_168,_76,_0.2)]'];
  const DL_IDLE = ['[background:rgba(201,_168,_76,_0.15)]', '[color:rgb(201,_168,_76)]', '[cursor:pointer]'];
  const DL_BUSY = ['[background:rgba(201,_168,_76,_0.1)]', '[color:rgba(201,_168,_76,_0.5)]', '[cursor:not-allowed]'];
  const SPINNER =
    '[display:inline-block] [width:10px] [height:10px] [border:1.5px_solid_rgba(201,_168,_76,_0.3)] [border-top-color:rgb(201,_168,_76)] [border-radius:50%] [animation:spin_0.8s_linear_infinite]';
  // Ширина полоски прогресса: при 10 страницах проценты кратны 10 — классы известны заранее.
  const BAR_WIDTHS = Array.from({ length: 11 }, (_, k) => `[width:${k * 10}%]`);
  // Оверлей генерации — разметка оригинала (логотип размера lg) в классах-свойствах.
  const OVERLAY_HTML = `
    <div class="flex items-center gap-3"><div class="[width:72px] [height:72px] [border-radius:50%] [border:2px_solid_rgb(201,_168,_76)] [background:rgb(14,_14,_14)] [display:flex] [align-items:center] [justify-content:center] [position:relative] [flex-shrink:0]"><div class="[width:56px] [height:56px] [border-radius:50%] [border:1px_solid_rgb(201,_168,_76)] [display:flex] [align-items:center] [justify-content:center]"><svg width="50" height="50" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="#c9a84c" stroke-width="1"></circle><ellipse cx="16" cy="16" rx="6" ry="12" stroke="#c9a84c" stroke-width="0.8"></ellipse><line x1="4" y1="16" x2="28" y2="16" stroke="#c9a84c" stroke-width="0.8"></line><line x1="6" y1="10" x2="26" y2="10" stroke="#c9a84c" stroke-width="0.6"></line><line x1="6" y1="22" x2="26" y2="22" stroke="#c9a84c" stroke-width="0.6"></line></svg></div></div><div><div class="font-display font-bold tracking-widest text-xl [color:rgb(201,_168,_76)] [letter-spacing:0.2em]">SAN</div><div class="font-body font-light tracking-widest text-xs uppercase [color:white] [letter-spacing:0.25em] [margin-top:-1px]">TRAVELS</div></div></div>
    <div class="mt-8 mb-3 font-body font-light text-[10px] tracking-[0.4em] uppercase [color:rgb(201,_168,_76)]">Generating Your PDF</div>
    <div class="font-display text-5xl text-white mb-6 [font-weight:300]" data-percent>0%</div>
    <div class="w-64 h-px [background:rgba(201,_168,_76,_0.2)]"><div class="h-px transition-all duration-300 [width:0%] [background:linear-gradient(90deg,_rgb(201,_168,_76),_rgb(228,_201,_126))]" data-bar></div></div>
    <div class="mt-4 font-body font-light text-white/30 text-[9px] tracking-wider" data-caption>Rendering page 0 of 10…</div>`;
  const OVERLAY_CLASS = 'fixed inset-0 z-40 flex flex-col items-center justify-center [background:rgba(0,_0,_0,_0.85)] [backdrop-filter:blur(8px)]';

  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const swap = (el, from, to) => {
    from.forEach((c) => el.classList.remove(c));
    to.forEach((c) => el.classList.add(c));
  };

  // Классы, появляющиеся только при взаимодействии: браузерная сборка Tailwind
  // должна сгенерировать их заранее, иначе первое переключение мигнёт без стилей.
  const preload = document.createElement('div');
  preload.hidden = true;
  // Один узел со всеми классами (и из разметки оверлея): лишние узлы сбивали бы сравнение со структурой оригинала.
  const overlayClasses = [...OVERLAY_HTML.matchAll(/class="([^"]*)"/g)].map((m) => m[1]);
  preload.className = [...TAB_ON, ...TAB_OFF, ...NAV_ON, ...NAV_OFF, ...DOT_ON, ...DOT_OFF, ...DL_IDLE, ...DL_BUSY, ...BAR_WIDTHS, SPINNER, OVERLAY_CLASS, ...overlayClasses].join(' ');
  document.body.appendChild(preload);

  // ---------- элементы ----------
  const pdfPages = $$('[data-pdf-page]');
  const buttons = $$('#root button');
  const tabs = buttons.filter((b) => /^\d+\.\s/.test(b.textContent.trim()));
  const prev = buttons.find((b) => b.textContent.includes('Prev'));
  const next = buttons.find((b) => b.textContent.includes('Next'));
  const download = buttons.find((b) => b.textContent.includes('Download PDF'));
  const label = $$('#root div').find((d) => !d.children.length && /^Page \d+ of \d+$/.test(d.textContent.trim()));
  const labelBox = label?.parentElement;
  const view = labelBox?.nextElementSibling; // обёртка текущей страницы
  const dotsBox = view?.nextElementSibling;
  const dots = dotsBox ? [...dotsBox.children].filter((b) => b.tagName === 'BUTTON') : [];
  const mainColumn = labelBox?.parentElement;
  const total = pdfPages.length || PAGE_COUNT_FALLBACK;
  let index = 0;

  // ---------- переключение страниц ----------
  const render = (i) => {
    index = i;
    tabs.forEach((t, k) => swap(t, k === i ? TAB_OFF : TAB_ON, k === i ? TAB_ON : TAB_OFF));
    dots.forEach((d, k) => swap(d, k === i ? DOT_OFF : DOT_ON, k === i ? DOT_ON : DOT_OFF));
    for (const [btn, off] of [[prev, i === 0], [next, i === total - 1]]) {
      if (!btn) continue;
      btn.disabled = off;
      swap(btn, off ? NAV_ON : NAV_OFF, off ? NAV_OFF : NAV_ON);
    }
    if (label) label.textContent = `Page ${i + 1} of ${total}`;
    // В оригинале страница — отдельный компонент, при смене монтируется заново: подставляем копию.
    const source = pdfPages[i]?.firstElementChild;
    if (view && source) view.replaceChildren(source.cloneNode(true));
    fit();
    // На телефоне вкладки прокручиваются в строке — активную держим в поле зрения.
    const tabsBox = tabs[i]?.parentElement;
    if (tabsBox && tabsBox.scrollWidth > tabsBox.clientWidth) tabsBox.scrollTo({ left: tabs[i].offsetLeft - 16, behavior: 'smooth' });
  };

  // ---------- узкий экран ----------
  // Лист A4 шириной 794px: на телефоне по умолчанию уменьшаем его целиком под ширину экрана
  // (видно весь лист), а кнопка «Zoom 100%» показывает его в натуральную величину с прокруткой
  // внутри обёртки — так мелкий текст листа можно прочитать. На широком экране (лист влезает)
  // кнопки нет и ничего не меняется. Скрытые копии для PDF не трогаются.
  const header = buttons[0]?.closest('.fixed');
  // Та же граница, что у мобильной панели в <style> index.html.
  const NARROW = '(max-width: 1023px)';
  let zoomed = false;
  if (label) label.dataset.pageLabel = '';
  if (dotsBox) dotsBox.dataset.pageDots = '';
  const zoomBtn = document.createElement('button');
  zoomBtn.type = 'button';
  zoomBtn.dataset.zoomToggle = '';
  zoomBtn.hidden = true;
  labelBox?.appendChild(zoomBtn);
  zoomBtn.addEventListener('click', () => {
    zoomed = !zoomed;
    fit();
    view?.scrollTo({ left: 0 });
  });

  const fit = () => {
    const page = view?.firstElementChild;
    if (!page) return;
    page.style.transform = '';
    view.style.height = '';
    view.style.width = '';
    const avail = view.parentElement.clientWidth;
    const scale = Math.min(1, avail / page.offsetWidth);
    zoomBtn.hidden = scale >= 1;
    if (scale >= 1) zoomed = false;
    zoomBtn.textContent = zoomed ? 'Fit to screen' : 'Zoom 100%';
    view.toggleAttribute('data-zoomed', zoomed);
    if (zoomed) {
      // Натуральная величина: обёртка шириной в экран, лист прокручивается вбок внутри неё.
      view.style.width = `${avail}px`;
    } else if (scale < 1) {
      page.style.transformOrigin = 'top left';
      page.style.transform = `scale(${scale})`;
      view.style.height = `${page.offsetHeight * scale}px`;
      view.style.width = `${page.offsetWidth * scale}px`;
    }
    // Панель на телефоне в две строки — отступ колонки под её реальную высоту.
    if (mainColumn && header) mainColumn.style.paddingTop = matchMedia(NARROW).matches ? `${header.offsetHeight + 16}px` : '';
  };
  window.addEventListener('resize', fit);

  // Свайп влево/вправо по уменьшенному листу листает страницы (в режиме 100% — прокрутка листа).
  let touch = null;
  view?.addEventListener('touchstart', (e) => {
    touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
  }, { passive: true });
  view?.addEventListener('touchend', (e) => {
    if (!touch || zoomed) return;
    const dx = e.changedTouches[0].clientX - touch.x;
    const dy = e.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) render(dx < 0 ? Math.min(total - 1, index + 1) : Math.max(0, index - 1));
  });
  tabs.forEach((t, k) => t.addEventListener('click', () => render(k)));
  dots.forEach((d, k) => d.addEventListener('click', () => render(k)));
  prev?.addEventListener('click', () => render(Math.max(0, index - 1)));
  next?.addEventListener('click', () => render(Math.min(total - 1, index + 1)));

  // ---------- PDF ----------
  // Оригинал рендерит <style>@keyframes spin …</style> рядом с панелью — без него спиннер стоит.
  const spinStyle = document.createElement('style');
  spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(spinStyle);

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`не загрузился ${src}`));
      document.head.appendChild(s);
    });

  let busy = false;
  let overlay = null;
  const setProgress = (pct) => {
    if (download && busy) {
      const spinner = document.createElement('span');
      spinner.className = SPINNER;
      download.replaceChildren(spinner, `${pct}%`);
    }
    if (!overlay) return;
    overlay.querySelector('[data-percent]').textContent = `${pct}%`;
    overlay.querySelector('[data-caption]').textContent = `Rendering page ${Math.ceil(pct / 10)} of 10…`;
    const bar = overlay.querySelector('[data-bar]');
    BAR_WIDTHS.forEach((c) => bar.classList.remove(c));
    bar.classList.add(`[width:${pct}%]`);
  };
  const setBusy = (on) => {
    busy = on;
    if (!download) return;
    download.disabled = on;
    swap(download, on ? DL_IDLE : DL_BUSY, on ? DL_BUSY : DL_IDLE);
    if (on) {
      overlay = document.createElement('div');
      overlay.className = OVERLAY_CLASS;
      overlay.innerHTML = OVERLAY_HTML;
      // Порядок как в оригинале: оверлей стоит перед колонкой со страницей.
      mainColumn?.parentElement ? mainColumn.parentElement.insertBefore(overlay, mainColumn) : document.body.appendChild(overlay);
      setProgress(0);
    } else {
      overlay?.remove();
      overlay = null;
      download.replaceChildren('⬇ Download PDF');
    }
  };

  download?.addEventListener('click', async () => {
    if (busy) return;
    setBusy(true);
    try {
      await Promise.all([loadScript(JSPDF_URL), loadScript(HTML2CANVAS_URL)]);
      const doc = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      for (let k = 0; k < pdfPages.length; k++) {
        setProgress(Math.round((k / pdfPages.length) * 100));
        // Параметры рендера — из оригинала: масштаб 2, A4 794×1123 px, JPEG 0.95.
        const canvas = await window.html2canvas(pdfPages[k], { scale: 2, useCORS: true, allowTaint: true, backgroundColor: null, logging: false, width: 794, height: 1123 });
        const image = canvas.toDataURL('image/jpeg', 0.95);
        if (k > 0) doc.addPage();
        doc.addImage(image, 'JPEG', 0, 0, 210, 297);
        setProgress(Math.round(((k + 1) / pdfPages.length) * 100));
      }
      doc.save(PDF_FILE);
    } finally {
      // Как в оригинале: ошибка не показывается, кнопка просто возвращается в исходный вид.
      setBusy(false);
    }
  });

  render(0);
})();
