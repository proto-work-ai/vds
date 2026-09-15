/** Раскрытие «до auto» как в site.js: анимация к scrollHeight, после перехода высота снимается. */
const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

export function openHeight(el: HTMLElement, ms = 300): void {
  el.style.height = el.scrollHeight + 'px';
  clearTimeout(timers.get(el));
  timers.set(el, setTimeout(() => (el.style.height = 'auto'), ms));
}

export function closeHeight(el: HTMLElement): void {
  clearTimeout(timers.get(el));
  el.style.height = el.scrollHeight + 'px';
  void el.offsetHeight;
  el.style.height = '0px';
}
