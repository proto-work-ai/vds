/* Интерактив лендинга «Карина»: карусели, прокрутка к форме, форма, появление блоков. */

// Плавное появление при прокрутке
(() => {
  const els = document.querySelectorAll('[data-reveal]');
  const show = (el) => el.classList.add('is-shown');
  if (!('IntersectionObserver' in window)) return els.forEach(show);
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => e.isIntersecting && (show(e.target), io.unobserve(e.target))),
    { threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
})();

// Услуги: размножаем карточки, чтобы было что листать в обе стороны
(() => {
  const track = document.getElementById('services');
  const cards = [...track.querySelectorAll('[data-card]')];
  for (let i = 0; i < 2; i++) cards.forEach((c) => track.append(c.cloneNode(true)));
})();

// Проекты: вторая «страница» — те же фото в другом порядке
(() => {
  const track = document.getElementById('projects');
  const page = track.querySelector('[data-page]');
  const copy = page.cloneNode(true);
  [...copy.children].reverse().forEach((a) => copy.append(a));
  track.append(copy);
})();

// Стрелки: шаг — карточка (услуги) или страница (проекты), по кругу
const step = (id) => {
  const track = document.getElementById(id);
  const item = track.firstElementChild;
  return item.getBoundingClientRect().width;
};
const scrollTrack = (id, dir) => {
  const track = document.getElementById(id);
  const max = track.scrollWidth - track.clientWidth;
  let to = track.scrollLeft + dir * step(id);
  if (to > max + 2) to = 0;
  else if (to < -2) to = max;
  track.scrollTo({ left: to, behavior: 'smooth' });
};
document
  .querySelectorAll('[data-next]')
  .forEach((b) => b.addEventListener('click', () => scrollTrack(b.dataset.next, 1)));
document
  .querySelectorAll('[data-prev]')
  .forEach((b) => b.addEventListener('click', () => scrollTrack(b.dataset.prev, -1)));

// Кнопки и карточки услуг ведут к форме
const toForm = (e) => {
  e.preventDefault();
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => document.querySelector('#lead input')?.focus({ preventScroll: true }), 600);
};
document
  .querySelectorAll('[data-scroll-form], a[href="#form"]')
  .forEach((el) => el.addEventListener('click', toForm));

// Форма: без отправки на сервер
(() => {
  const form = document.getElementById('lead');
  const input = form.querySelector('input');
  const err = form.querySelector('[data-error]');
  const thanks = form.querySelector('[data-thanks]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = input.value.replace(/\D/g, '').length >= 10;
    err.classList.toggle('hidden', ok);
    if (!ok) return input.focus();
    thanks.classList.remove('hidden');
    form.querySelector('button').disabled = true;
    input.value = '';
  });
})();

// Просмотр фото проектов крупно
(() => {
  const box = document.createElement('div');
  box.className = 'fixed inset-0 z-50 hidden place-items-center bg-black/80 p-4 cursor-zoom-out';
  box.innerHTML = '<img class="max-h-[90vh] max-w-full shadow-2xl" alt="" />';
  document.body.append(box);
  const img = box.querySelector('img');
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-lightbox]');
    if (!a) return;
    e.preventDefault();
    img.src = a.getAttribute('href');
    box.classList.replace('hidden', 'grid');
  });
  box.addEventListener('click', () => box.classList.replace('grid', 'hidden'));
  document.addEventListener(
    'keydown',
    (e) => e.key === 'Escape' && box.classList.replace('grid', 'hidden'),
  );
})();
