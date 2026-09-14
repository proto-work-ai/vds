/* Какие CSS-правила применились к элементу — в оригинале и в переводе.

   node tools/mockups/matched-styles.mjs <url> "<CSS-селектор>" "<текст элемента>" [свойство,свойство]

   Через DevTools Protocol (домены DOM и CSS) находит первый элемент, подходящий
   под селектор и содержащий текст, и печатает правила, которые к нему применились:
   селектор, источник (файл/встроенный стиль), слой @layer, значения нужных свойств.
   Нужен, когда перевод и оригинал расходятся, а по коду непонятно, какое правило побеждает. */
import { withBrowser } from './snapshot.mjs';

const [url, selector = 'a', text = '', propsArg = 'font-size,letter-spacing,opacity,padding-top,padding-left'] = process.argv.slice(2);
if (!url) {
  console.error('usage: node tools/mockups/matched-styles.mjs <url> "<selector>" "<text>" [props]');
  process.exit(1);
}
const PROPS = propsArg.split(',');

await withBrowser(async (page) => {
  await page.goto(url, 3000);
  await page.send('DOM.enable');
  await page.send('CSS.enable');

  // Помечаем нужный элемент, чтобы найти его через DOM-домен.
  const found = await page.eval(`(() => {
    const el = [...document.querySelectorAll(${JSON.stringify(selector)})].find((e) => e.textContent.trim() === ${JSON.stringify(text)} || (${JSON.stringify(text)} === '' ));
    if (!el) return false;
    el.setAttribute('data-matched-probe', '1');
    const cs = getComputedStyle(el);
    return { cls: el.className, computed: Object.fromEntries(${JSON.stringify(PROPS)}.map((p) => [p, cs.getPropertyValue(p)])) };
  })()`);
  if (!found) {
    console.log('элемент не найден');
    return;
  }
  console.log(`== ${url}`);
  console.log(`class: ${found.cls}`);
  console.log(`вычислено: ${JSON.stringify(found.computed)}`);

  const { root } = await page.send('DOM.getDocument', { depth: -1 });
  const { nodeId } = await page.send('DOM.querySelector', { nodeId: root.nodeId, selector: '[data-matched-probe]' });
  const matched = await page.send('CSS.getMatchedStylesForNode', { nodeId });

  const sheets = new Map();
  for (const rule of matched.matchedCSSRules ?? []) {
    const r = rule.rule;
    const decls = r.style.cssProperties.filter((p) => PROPS.includes(p.name) && p.value);
    if (!decls.length) continue;
    const layers = (r.layers ?? []).map((l) => l.text || '(anon)').join(' > ') || 'вне слоёв';
    const media = (r.media ?? []).map((m) => m.text).join(' ');
    let source = r.origin;
    if (r.styleSheetId && !sheets.has(r.styleSheetId)) {
      sheets.set(r.styleSheetId, r.origin);
    }
    console.log(
      `  [${layers}]${media ? ` @media ${media}` : ''} ${r.selectorList.text}  ← ${source}\n     ${decls.map((d) => `${d.name}: ${d.value}${d.important ? ' !important' : ''}`).join('; ')}`
    );
  }
  const inline = matched.inlineStyle?.cssProperties?.filter((p) => PROPS.includes(p.name) && p.value) ?? [];
  if (inline.length) console.log(`  [inline] ${inline.map((d) => `${d.name}: ${d.value}`).join('; ')}`);
});
