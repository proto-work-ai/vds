/*
 * Письмо в салон о заявке — перенос buildLeadEmail из mockups/site/assets/email.js.
 * Вёрстка email-safe: таблицы, инлайн-стили, 600px. Все значения из формы экранируются:
 * готовый HTML уходит в api/send-message.php как есть.
 * Подтверждение клиенту (buildClientEmail) не перенесено: send-message.php шлёт только в салон.
 */

export type LeadKind = 'callback' | 'designer' | 'order' | 'contact' | 'partner' | 'curtain-rod';

export interface LeadData {
  name?: string;
  phone?: string;
  email?: string;
  theme?: string;
  type?: string;
  connectionType?: string;
  city?: string;
  size?: string;
  description?: string;
  model?: string;
}

export interface LeadMeta {
  pageTitle?: string;
  pageUrl?: string;
  sentAt?: Date;
}

const SITE = 'https://shtorivdom.ru';
const LOGO = `${SITE}/logo/logo-1-email.png`;
const BRAND = 'Шторы в дом';

const COPY: Record<LeadKind, { subject: (d: { theme: string; model: string }) => string; title: string; lead: string }> = {
  callback: {
    subject: () => 'Заявка с сайта: обратный звонок',
    title: 'Новая заявка: клиент просит перезвонить',
    lead: 'Перезвоните клиенту в ближайшее рабочее время.',
  },
  designer: {
    subject: () => 'Заявка с сайта: пригласить дизайнера',
    title: 'Новая заявка: клиент хочет пригласить дизайнера',
    lead: 'Свяжитесь с клиентом в рабочее время и договоритесь о дате бесплатного выезда.',
  },
  order: {
    subject: () => 'Заявка с сайта: заказ штор',
    title: 'Новая заявка на заказ штор',
    lead: 'Свяжитесь с клиентом в рабочее время, уточните задачу и предложите выезд дизайнера.',
  },
  contact: {
    subject: (d) => (d.theme ? `Вопрос с сайта: ${d.theme}` : 'Вопрос с сайта'),
    title: 'Новый вопрос со страницы контактов',
    lead: 'Ответьте клиенту на email или позвоните, если он оставил телефон.',
  },
  partner: {
    subject: () => 'Анкета партнёра',
    title: 'Новая анкета в партнёрскую программу',
    lead: 'Позвоните кандидату в рабочее время и расскажите об условиях сотрудничества.',
  },
  'curtain-rod': {
    subject: (d) => (d.model ? `Заказ карниза ${d.model}` : 'Заказ карниза'),
    title: 'Новая заявка: заказ карниза',
    lead: 'Клиент выбрал модель в каталоге. Перезвоните, уточните размеры и предложите замер.',
  },
};

const LABELS = {
  contacts: 'Контакты клиента',
  details: 'Описание заказа',
  detailsContact: 'Сообщение',
  detailsPartner: 'Анкета',
  source: 'Откуда заявка',
  call: 'Позвонить',
  write: 'Написать',
  salonFooter: 'Письмо собрано формой на сайте shtorivdom.ru. Отвечать на него не нужно — свяжитесь с клиентом по контактам выше.',
  fields: {
    name: 'Имя',
    phone: 'Телефон',
    email: 'Email',
    theme: 'Тема',
    model: 'Модель карниза',
    type: 'Вид штор',
    connectionType: 'Способ связи',
    city: 'Город',
    size: 'Площадь',
    description: 'Пожелание',
    message: 'Текст вопроса',
    page: 'Страница',
    time: 'Время заявки',
  },
};

const C = { navy: '#0d223d', gold: '#c9a84c', goldText: '#8a6d1f', cream: '#f5f0e8', sand: '#e8e2d6', slate: '#2d3748', muted: '#6b6457', line: '#e3dccd' };
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = 'Arial, Helvetica, sans-serif';

interface Row {
  label: string;
  text: string;
  html: string;
}

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeHtml = (v: unknown) => String(v).replace(/[&<>"']/g, (ch) => ESC[ch]);
const clean = (v: unknown) => (v === undefined || v === null ? '' : String(v).replace(/\r\n?/g, '\n').trim());
const oneLine = (v: unknown) => clean(v).replace(/\s+/g, ' ');
const multiline = (v: string) => escapeHtml(v).replace(/\n/g, '<br>');

/** Телефон → { text: '+7 (925) 594-61-17', tel: '+79255946117' }; неполный — как есть, без ссылки. */
export function normalizePhone(raw: unknown): { text: string; tel: string } | null {
  const src = oneLine(raw);
  if (!src) return null;
  let d = src.replace(/\D/g, '');
  if (d.length === 10) d = '7' + d;
  else if (d.length === 11 && d[0] === '8') d = '7' + d.slice(1);
  if (d.length !== 11 || d[0] !== '7') return { text: src, tel: '' };
  return { text: `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`, tel: '+' + d };
}
const isEmail = (v: string) => /^[^\s@<>"'()&,;:\\]+@[^\s@<>"'()&,;:\\]+\.[^\s@<>"'()&,;:\\]{2,}$/.test(v);
const safeUrl = (v: string) => (/^https?:\/\/[^\s<>"'\\]+$/i.test(v) ? v : '');
// eslint-disable-next-line no-control-regex -- тема письма одной строкой, без управляющих символов
const subjectLine = (v: string) => oneLine(v).replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 180);

function formatDate(date: Date): string {
  try {
    return (
      date.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) +
      ' (МСК)'
    );
  } catch {
    return date.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  }
}

const link = (href: string, text: string) => `<a href="${escapeHtml(href)}" style="color:${C.navy};text-decoration:underline;">${escapeHtml(text)}</a>`;
const heading = (t: string) =>
  `<p style="margin:0 0 8px;font-family:${SANS};font-size:12px;line-height:16px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${C.goldText};">${escapeHtml(t)}</p>`;

function buttons(list: { href: string; label: string }[]): string {
  if (!list.length) return '';
  return `<div style="margin:0 0 20px;">${list
    .map(
      (b, i) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left" style="margin:0 10px 10px 0;"><tr>
<td bgcolor="${i ? '#ffffff' : C.gold}" style="background-color:${i ? '#ffffff' : C.gold};border:2px solid ${C.gold};border-radius:3px;">
<a href="${escapeHtml(b.href)}" style="display:inline-block;padding:12px 20px;font-family:${SANS};font-size:15px;line-height:20px;font-weight:bold;color:${C.navy};text-decoration:none;">${escapeHtml(b.label)}</a>
</td></tr></table>`
    )
    .join('')}<div style="clear:both;line-height:0;font-size:0;">&nbsp;</div></div>`;
}

function table(rows: Row[]): string {
  if (!rows.length) return '';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 24px;border-top:1px solid ${C.line};">
${rows
  .map(
    (r) => `<tr>
<td valign="top" width="130" style="width:130px;padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:13px;line-height:20px;color:${C.muted};">${escapeHtml(r.label)}</td>
<td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;line-height:22px;color:${C.navy};word-break:break-word;">${r.html}</td>
</tr>`
  )
  .join('\n')}
</table>`;
}

function layout(o: { preheader: string; title: string; lead: string; body: string; footer: string }): string {
  return `<!DOCTYPE html>
<html lang="ru" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<title>${escapeHtml(o.title)}</title>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${C.cream};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${C.cream};">${escapeHtml(o.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.cream}" style="background-color:${C.cream};">
<tr><td align="center" style="padding:24px 10px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:collapse;">
<tr><td bgcolor="${C.navy}" style="background-color:${C.navy};padding:20px 24px;border-top:4px solid ${C.gold};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="44" valign="middle" style="width:44px;"><img src="${LOGO}" width="40" height="40" alt="Шторы в дом" style="display:block;border:0;"></td>
    <td valign="middle" style="padding-left:12px;font-family:${SERIF};font-size:20px;line-height:24px;font-weight:bold;color:#ffffff;">${escapeHtml(BRAND)}<br><span style="font-family:${SANS};font-size:11px;line-height:16px;font-weight:normal;letter-spacing:2px;text-transform:uppercase;color:${C.gold};">Заявка с сайта</span></td>
  </tr></table>
</td></tr>
<tr><td bgcolor="#ffffff" style="background-color:#ffffff;padding:28px 24px 8px;">
  <h1 style="margin:0 0 10px;font-family:${SERIF};font-size:26px;line-height:32px;font-weight:bold;color:${C.navy};">${escapeHtml(o.title)}</h1>
  <p style="margin:0 0 24px;font-family:${SANS};font-size:16px;line-height:24px;color:${C.slate};">${escapeHtml(o.lead)}</p>
  ${o.body}
</td></tr>
<tr><td bgcolor="${C.sand}" style="background-color:${C.sand};padding:20px 24px;font-family:${SANS};font-size:13px;line-height:20px;color:${C.slate};">${o.footer}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Письмо в салон: { subject, html, text } */
export function buildLeadEmail(kind: LeadKind, data: LeadData, meta: LeadMeta = {}): { subject: string; html: string; text: string } {
  const c = COPY[kind];
  const L = LABELS.fields;
  const row = (label: string, text: string, html?: string): Row | null => (text ? { label, text, html: html ?? multiline(text) } : null);
  const name = oneLine(data.name);
  const phone = normalizePhone(data.phone);
  const email = oneLine(data.email);
  const emailOk = !!email && isEmail(email);
  const size = oneLine(data.size);
  const theme = oneLine(data.theme);
  const model = oneLine(data.model);

  const contacts = [
    row(L.name, name),
    phone && row(L.phone, phone.text, phone.tel ? link('tel:' + phone.tel, phone.text) : escapeHtml(phone.text)),
    email ? row(L.email, email, emailOk ? link('mailto:' + email, email) : escapeHtml(email)) : null,
  ].filter((r): r is Row => !!r);
  const details = [
    row(L.theme, theme),
    row(L.model, model),
    row(L.type, oneLine(data.type)),
    row(L.connectionType, oneLine(data.connectionType)),
    row(L.city, oneLine(data.city)),
    row(L.size, size && (/^\d+([.,]\d+)?$/.test(size) ? size + ' м²' : size)),
    row(kind === 'contact' ? L.message : L.description, clean(data.description)),
  ].filter((r): r is Row => !!r);

  const who = phone ? phone.text : name || email;
  const subject = subjectLine(c.subject({ theme, model }) + (who ? ' — ' + who : ''));
  const pageTitle = oneLine(meta.pageTitle);
  const pageUrl = safeUrl(oneLine(meta.pageUrl));
  const when = formatDate(meta.sentAt ?? new Date());
  const page = pageTitle || pageUrl;
  const source = [
    page ? { label: L.page, text: page + (pageUrl && pageTitle ? ` — ${pageUrl}` : ''), html: pageUrl ? link(pageUrl, page) : escapeHtml(page) } : null,
    { label: L.time, text: when, html: escapeHtml(when) },
  ].filter((r): r is Row => !!r);

  const actions: { href: string; label: string }[] = [];
  if (phone?.tel) actions.push({ href: 'tel:' + phone.tel, label: `${LABELS.call} ${phone.text}` });
  if (emailOk) actions.push({ href: 'mailto:' + email, label: `${LABELS.write} на ${email}` });

  const detailsTitle = kind === 'contact' ? LABELS.detailsContact : kind === 'partner' ? LABELS.detailsPartner : LABELS.details;
  const body = [
    heading(LABELS.contacts),
    buttons(actions),
    table(contacts),
    details.length ? heading(detailsTitle) + table(details) : '',
    heading(LABELS.source),
    table(source),
  ].join('\n');

  const html = layout({ preheader: `${c.lead}${who ? ' ' + who : ''}`, title: c.title, lead: c.lead, body, footer: escapeHtml(LABELS.salonFooter) });
  const block = (t: string, rows: Row[]) => (rows.length ? ['', t.toUpperCase(), ...rows.map((r) => `${r.label}: ${r.text}`)] : []);
  const text = [c.title, c.lead, ...block(LABELS.contacts, contacts), ...block(detailsTitle, details), ...block(LABELS.source, source)].join('\n');
  return { subject, html, text };
}
