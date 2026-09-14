/* Общий скрипт страниц-переводов на Tailwind (подключается конвертером
   tools/mockups/to-tailwind.mjs): появление при прокрутке, закреплённая шапка,
   параллакс по опорным точкам, вступительные оверлеи. Общий для всех переводов:
   правка здесь действует на все сайты без пересборки. */
// Появление при прокрутке: элемент получает конечные классы, когда попадает в экран.
(() => {
  const els = document.querySelectorAll('[data-reveal]');
  const show = (el) => {
    // Классы, которых нет в начальном состоянии (group/…, peer/…), сохраняются.
    const initial = new Set((el.dataset.initial ?? '').split(/\s+/));
    const extra = [...el.classList].filter((c) => !initial.has(c) && !el.dataset.reveal.split(/\s+/).includes(c));
    el.className = [el.dataset.reveal, ...extra].join(' ');
    el.removeAttribute('data-reveal');
    // Переход добавлен только ради появления — после него убираем.
    if (el.hasAttribute('data-reveal-transition')) {
      setTimeout(() => {
        el.classList.remove('[transition:opacity_0.6s_ease-out,transform_0.6s_ease-out]');
        el.removeAttribute('data-reveal-transition');
      }, 700);
    }
  };
  if (!('IntersectionObserver' in window)) return els.forEach(show);
  // 15% элемента в экране — или 15% экрана, если элемент выше окна (обёртка всей
  // страницы на невысоком окне иначе не появилась бы никогда).
  const visible = (e) =>
    e.isIntersecting &&
    e.intersectionRect.height >= 0.15 * Math.min(e.boundingClientRect.height, window.innerHeight);
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => visible(e) && (show(e.target), io.unobserve(e.target))),
    { threshold: [0, 0.05, 0.1, 0.15, 0.25, 0.5, 1] }
  );
  els.forEach((el) => io.observe(el));
})();

// Параллакс: transform по опорным точкам [scrollY, x, y, scale] с линейной интерполяцией.
(() => {
  const els = [...document.querySelectorAll('[data-parallax]')].map((el) => ({ el, pts: JSON.parse(el.dataset.parallax) }));
  if (!els.length) return;
  const at = (pts, y) => {
    if (y <= pts[0][0]) return pts[0];
    for (let k = 1; k < pts.length; k++) {
      if (y <= pts[k][0]) {
        const [y0, ...a] = pts[k - 1];
        const [y1, ...b] = pts[k];
        const t = (y - y0) / (y1 - y0 || 1);
        return [y, ...a.map((v, i) => v + (b[i] - v) * t)];
      }
    }
    return pts[pts.length - 1];
  };
  let frame = 0;
  const update = () => {
    frame = 0;
    for (const { el, pts } of els) {
      const [, x, y, sc] = at(pts, window.scrollY);
      el.style.transform = 'translate(' + x + 'px, ' + y + 'px)' + (sc !== 1 ? ' scale(' + sc + ')' : '');
    }
  };
  update();
  window.addEventListener('scroll', () => frame || (frame = requestAnimationFrame(update)), { passive: true });
})();

// Вступительные оверлеи исчезают в тот же момент, что и в оригинале.
document.querySelectorAll('[data-remove-after]').forEach((el) => {
  setTimeout(() => el.remove(), Number(el.dataset.removeAfter));
});

// Шапка и другие закреплённые элементы: вид наверху и вид после прокрутки.
(() => {
  const els = [...document.querySelectorAll('[data-scrolled]')];
  if (!els.length) return;
  let state = null;
  const apply = () => {
    const scrolled = window.scrollY > 60;
    if (scrolled === state) return;
    state = scrolled;
    for (const el of els) el.className = scrolled ? el.dataset.scrolled : el.dataset.top;
  };
  apply();
  window.addEventListener('scroll', apply, { passive: true });
})();
