/* Почтовые шаблоны заявок Shtorivdom — сборщик писем без зависимостей.

   Браузер: <script src="assets/email.js"> → window.ShtorivdomEmail
   Node:    const { buildLeadEmail, buildClientEmail } = require('./email.js')
            (или createRequire(import.meta.url) из .mjs)

   buildLeadEmail(kind, data, meta) → { subject, html, text } — письмо в салон о новой заявке;
   buildClientEmail(kind, data)     → { subject, html, text } | null — подтверждение клиенту (только при корректном data.email).

   kind: 'callback' | 'designer' | 'order' | 'contact' | 'partner' | 'curtain-rod'
   data: { name, phone, email, theme, type, connectionType, city, size, description, model } — как IFormData сайта
         (+ model — модель карниза); пустые поля в письмо не попадают.
   meta: { pageTitle, pageUrl, sentAt } — страница заявки и время (Date | ISO-строка | число).

   Все тексты писем — в COPY ниже (правятся в одном месте, галерея site/emails/ их показывает).
   Вёрстка email-safe: таблицы, инлайн-стили, 600px, без внешнего CSS/JS/шрифтов, картинки — абсолютные https.
   Пользовательские значения экранируются: HTML уходит в скрипт отправки как есть. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.ShtorivdomEmail = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  const SITE = 'https://shtorivdom.ru';
  // Знак логотипа (logo-1) картинкой PNG: SVG почтовые программы не показывают.
  // В письме — абсолютный адрес на сайте; в предпросмотре (галерея писем, Storybook) — рядом с email.js.
  const LOGO_FILE = 'logo/logo-1-email.png';
  const SCRIPT_SRC = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : '';
  const LOGO = SCRIPT_SRC && /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/)/.test(SCRIPT_SRC)
    ? new URL(LOGO_FILE, SCRIPT_SRC).href
    : SITE + '/' + LOGO_FILE;
  const SALON = {
    brand: 'Шторы в дом',
    phone: '+7 (925) 594-61-17',
    tel: '+79255946117',
    email: 'info@shtorivdom.ru',
    address: 'Троицк, Кварцевая улица, 3, корп. 2',
    hours: 'Без выходных, 10:00–20:00',
  };

  /* ================= ТЕКСТЫ ПИСЕМ =================
     salon — письмо в салон: subject(данные) без «кто» (телефон/имя дописываются в конце), title, lead.
     client — письмо клиенту: subject, title, intro, steps [заголовок, текст].
     Факты только с сайта: выезд дизайнера бесплатный, пошив 10–14 дней, гарантия 2 года, 10:00–20:00 без выходных. */
  const STEP_CALL = ['Звонок', 'Перезвоним в рабочее время — без выходных, с 10:00 до 20:00. Ответим на вопросы и договоримся о встрече.'];
  const STEP_VISIT = ['Выезд дизайнера', 'Бесплатно. Дизайнер привезёт образцы и каталоги тканей, сделает замеры, подготовит эскиз и расчёт.'];
  const STEP_SEW = ['Пошив', '10–14 дней в собственном цехе под контролем технолога. Каждое изделие проверяем перед выдачей.'];
  const STEP_MOUNT = ['Монтаж', 'Привезём, установим карнизы, навесим и отпарим шторы. Гарантия 2 года на работы и материалы.'];
  const ORDER_STEPS = [STEP_CALL, STEP_VISIT, STEP_SEW, STEP_MOUNT];

  const COPY = {
    callback: {
      salon: {
        subject: () => 'Заявка с сайта: обратный звонок',
        title: 'Новая заявка: клиент просит перезвонить',
        lead: 'Перезвоните клиенту в ближайшее рабочее время.',
      },
      client: {
        subject: 'Спасибо! Мы перезвоним',
        title: 'Спасибо! Мы перезвоним',
        intro: 'Заявка на звонок принята. Менеджер позвонит вам в рабочее время, ответит на вопросы и поможет договориться о встрече с дизайнером.',
        steps: ORDER_STEPS,
      },
    },
    designer: {
      salon: {
        subject: () => 'Заявка с сайта: пригласить дизайнера',
        title: 'Новая заявка: клиент хочет пригласить дизайнера',
        lead: 'Свяжитесь с клиентом в рабочее время и договоритесь о дате бесплатного выезда.',
      },
      client: {
        subject: 'Спасибо! Заявка на выезд дизайнера принята',
        title: 'Заявка на выезд дизайнера принята',
        intro: 'Дизайнер свяжется с вами, чтобы договориться о дне и времени выезда. Выезд бесплатный — в любой район Москвы и Московской области.',
        steps: ORDER_STEPS,
      },
    },
    order: {
      salon: {
        subject: () => 'Заявка с сайта: заказ штор',
        title: 'Новая заявка на заказ штор',
        lead: 'Свяжитесь с клиентом в рабочее время, уточните задачу и предложите выезд дизайнера.',
      },
      client: {
        subject: 'Спасибо! Заявка на заказ принята',
        title: 'Заявка на заказ принята',
        intro: 'Мы получили вашу заявку и скоро свяжемся с вами, чтобы уточнить детали и договориться о встрече.',
        steps: ORDER_STEPS,
      },
    },
    contact: {
      salon: {
        subject: (d) => (d.theme ? `Вопрос с сайта: ${d.theme}` : 'Вопрос с сайта'),
        title: 'Новый вопрос со страницы контактов',
        lead: 'Ответьте клиенту на email или позвоните, если он оставил телефон.',
      },
      client: {
        subject: 'Мы получили ваш вопрос',
        title: 'Мы получили ваш вопрос',
        intro: 'Спасибо, что написали. Ответим на этот адрес в рабочее время — без выходных, с 10:00 до 20:00.',
        steps: [
          ['Ответ', 'Менеджер разберётся в вопросе и ответит письмом или перезвонит, если вы оставили телефон.'],
          ['Если нужен замер', 'Договоримся о бесплатном выезде дизайнера с образцами тканей.'],
        ],
      },
    },
    partner: {
      salon: {
        subject: () => 'Анкета партнёра',
        title: 'Новая анкета в партнёрскую программу',
        lead: 'Позвоните кандидату в рабочее время и расскажите об условиях сотрудничества.',
      },
      client: {
        subject: 'Анкета партнёра получена',
        title: 'Анкета партнёра получена',
        intro: 'Спасибо за интерес к сотрудничеству. Мы изучим анкету и позвоним вам в рабочее время.',
        steps: [
          ['Анкета', 'Анкета у нас — менеджер познакомится с ней.'],
          ['Звонок', 'Перезвоним без выходных, с 10:00 до 20:00, и расскажем, как устроена партнёрская программа.'],
        ],
      },
    },
    'curtain-rod': {
      salon: {
        subject: (d) => (d.model ? `Заказ карниза ${d.model}` : 'Заказ карниза'),
        title: 'Новая заявка: заказ карниза',
        lead: 'Клиент выбрал модель в каталоге. Перезвоните, уточните размеры и предложите замер.',
      },
      client: {
        subject: 'Спасибо! Заявка на карниз принята',
        title: 'Заявка на карниз принята',
        intro: 'Мы получили заявку на выбранную модель и перезвоним, чтобы уточнить размеры и договориться о замере.',
        steps: [STEP_CALL, ['Замер', 'Бесплатный выезд: замерим окна и покажем образцы.'], STEP_MOUNT],
      },
    },
  };

  const LABELS = {
    // Блоки и подписи полей
    contacts: 'Контакты клиента',
    details: 'Описание заказа',
    detailsContact: 'Сообщение',
    detailsPartner: 'Анкета',
    source: 'Откуда заявка',
    yours: 'Что вы отправили',
    next: 'Что будет дальше',
    call: 'Позвонить',
    write: 'Написать',
    callSalon: 'Не хотите ждать? Позвоните нам:',
    salonFooter: 'Письмо собрано формой на сайте shtorivdom.ru. Отвечать на него не нужно — свяжитесь с клиентом по контактам выше.',
    clientFooter: 'Вы получили это письмо, потому что оставили заявку на сайте shtorivdom.ru.',
    signature: 'Команда «Шторы в дом» / Shtorivdom',
    fields: { name: 'Имя', phone: 'Телефон', email: 'Email', theme: 'Тема', model: 'Модель карниза', type: 'Вид штор', connectionType: 'Способ связи', city: 'Город', size: 'Площадь', description: 'Пожелание', message: 'Текст вопроса', page: 'Страница', time: 'Время заявки' },
  };
  /* ================= /ТЕКСТЫ ================= */

  const C = { navy: '#0d223d', gold: '#c9a84c', goldText: '#8a6d1f', cream: '#f5f0e8', sand: '#e8e2d6', slate: '#2d3748', muted: '#6b6457', line: '#e3dccd' };
  const SERIF = "Georgia, 'Times New Roman', serif";
  const SANS = 'Arial, Helvetica, sans-serif';

  // ---------- значения ----------
  const esc = (v) => String(v).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const clean = (v) => (v === undefined || v === null ? '' : String(v).replace(/\r\n?/g, '\n').trim());
  const oneLine = (v) => clean(v).replace(/\s+/g, ' ');
  const multiline = (v) => esc(v).replace(/\n/g, '<br>');

  /** Телефон → { text: '+7 (925) 594-61-17', tel: '+79255946117' }; нероссийский/неполный — как есть, без ссылки. */
  function normalizePhone(raw) {
    const src = oneLine(raw);
    if (!src) return null;
    let d = src.replace(/\D/g, '');
    if (d.length === 10) d = '7' + d;
    else if (d.length === 11 && d[0] === '8') d = '7' + d.slice(1);
    if (d.length !== 11 || d[0] !== '7') return { text: src, tel: '' };
    return { text: `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`, tel: '+' + d };
  }
  const isEmail = (v) => /^[^\s@<>"'()&,;:\\]+@[^\s@<>"'()&,;:\\]+\.[^\s@<>"'()&,;:\\]{2,}$/.test(v);
  const safeUrl = (v) => (/^https?:\/\/[^\s<>"'\\]+$/i.test(v) ? v : '');
  // Тема письма — одна строка без управляющих символов (защита от подстановки заголовков)
  const subjectLine = (v) => oneLine(v).replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 180);

  function formatDate(value) {
    const date = value === undefined || value === null || value === '' ? new Date() : new Date(value);
    if (isNaN(date.getTime())) return oneLine(value);
    try {
      return date.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' (МСК)';
    } catch {
      return date.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
    }
  }

  const link = (href, text, style = '') =>
    `<a href="${esc(href)}" style="color:${C.navy};text-decoration:underline;${style}">${esc(text)}</a>`;

  // Разбор данных формы: контакты и описание заказа, строки { label, text, html }
  function parse(kind, data) {
    const L = LABELS.fields;
    const row = (label, text, html) => (text ? { label, text, html: html ?? multiline(text) } : null);
    const name = oneLine(data.name);
    const phone = normalizePhone(data.phone);
    const email = oneLine(data.email);
    const emailOk = !!email && isEmail(email);
    const size = oneLine(data.size);
    const contacts = [
      row(L.name, name),
      phone && row(L.phone, phone.text, phone.tel ? link('tel:' + phone.tel, phone.text) : esc(phone.text)),
      email && row(L.email, email, emailOk ? link('mailto:' + email, email) : esc(email)),
    ].filter(Boolean);
    const details = [
      row(L.theme, oneLine(data.theme)),
      row(L.model, oneLine(data.model)),
      row(L.type, oneLine(data.type)),
      row(L.connectionType, oneLine(data.connectionType)),
      row(L.city, oneLine(data.city)),
      row(L.size, size && (/^\d+([.,]\d+)?$/.test(size) ? size + ' м²' : size)),
      row(kind === 'contact' ? L.message : L.description, clean(data.description)),
    ].filter(Boolean);
    return { contacts, details, name, phone, email, emailOk, model: oneLine(data.model), theme: oneLine(data.theme) };
  }

  // ---------- разметка ----------
  function layout({ preheader, eyebrow, title, lead, body, footer }) {
    return `<!DOCTYPE html>
<html lang="ru" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${C.cream};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${C.cream};">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.cream}" style="background-color:${C.cream};">
<tr><td align="center" style="padding:24px 10px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:collapse;">
<tr><td bgcolor="${C.navy}" style="background-color:${C.navy};padding:20px 24px;border-top:4px solid ${C.gold};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="44" valign="middle" style="width:44px;"><img src="${LOGO}" width="40" height="40" alt="Шторы в дом" style="display:block;border:0;"></td>
    <td valign="middle" style="padding-left:12px;font-family:${SERIF};font-size:20px;line-height:24px;font-weight:bold;color:#ffffff;">${esc(SALON.brand)}<br><span style="font-family:${SANS};font-size:11px;line-height:16px;font-weight:normal;letter-spacing:2px;text-transform:uppercase;color:${C.gold};">${esc(eyebrow)}</span></td>
  </tr></table>
</td></tr>
<tr><td bgcolor="#ffffff" style="background-color:#ffffff;padding:28px 24px 8px;">
  <h1 style="margin:0 0 10px;font-family:${SERIF};font-size:26px;line-height:32px;font-weight:bold;color:${C.navy};">${esc(title)}</h1>
  <p style="margin:0 0 24px;font-family:${SANS};font-size:16px;line-height:24px;color:${C.slate};">${esc(lead)}</p>
  ${body}
</td></tr>
<tr><td bgcolor="${C.sand}" style="background-color:${C.sand};padding:20px 24px;font-family:${SANS};font-size:13px;line-height:20px;color:${C.slate};">${footer}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
  }

  const heading = (t) => `<p style="margin:0 0 8px;font-family:${SANS};font-size:12px;line-height:16px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${C.goldText};">${esc(t)}</p>`;

  // Кнопки в ряд (на узком экране переносятся — каждая в своей inline-таблице)
  function buttons(list) {
    if (!list.length) return '';
    return `<div style="margin:0 0 20px;">${list.map((b, i) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left" style="margin:0 10px 10px 0;"><tr>
<td bgcolor="${i ? '#ffffff' : C.gold}" style="background-color:${i ? '#ffffff' : C.gold};border:2px solid ${C.gold};border-radius:3px;">
<a href="${esc(b.href)}" style="display:inline-block;padding:12px 20px;font-family:${SANS};font-size:15px;line-height:20px;font-weight:bold;color:${C.navy};text-decoration:none;">${esc(b.label)}</a>
</td></tr></table>`).join('')}<div style="clear:both;line-height:0;font-size:0;">&nbsp;</div></div>`;
  }

  function table(rows) {
    if (!rows.length) return '';
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 24px;border-top:1px solid ${C.line};">
${rows.map((r) => `<tr>
<td valign="top" width="130" style="width:130px;padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:13px;line-height:20px;color:${C.muted};">${esc(r.label)}</td>
<td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;line-height:22px;color:${C.navy};word-break:break-word;">${r.html}</td>
</tr>`).join('\n')}
</table>`;
  }

  const kindCopy = (kind) => {
    const c = COPY[kind];
    if (!c) throw new Error('Неизвестный тип заявки: ' + kind);
    return c;
  };
  const detailsTitle = (kind) => (kind === 'contact' ? LABELS.detailsContact : kind === 'partner' ? LABELS.detailsPartner : LABELS.details);

  // ---------- письмо в салон ----------
  function buildLeadEmail(kind, data, meta) {
    const c = kindCopy(kind).salon;
    data = data || {};
    meta = meta || {};
    const p = parse(kind, data);
    const L = LABELS.fields;
    const who = p.phone ? p.phone.text : p.name || p.email;
    const subject = subjectLine(c.subject({ theme: p.theme, model: p.model, name: p.name }) + (who ? ' — ' + who : ''));

    const pageTitle = oneLine(meta.pageTitle);
    const pageUrl = safeUrl(oneLine(meta.pageUrl));
    const when = formatDate(meta.sentAt);
    const page = pageTitle || pageUrl;
    const source = [
      page && { label: L.page, text: page + (pageUrl && pageTitle ? ` — ${pageUrl}` : ''), html: pageUrl ? link(pageUrl, page) : esc(page) },
      { label: L.time, text: when, html: esc(when) },
    ].filter(Boolean);

    const actions = [];
    if (p.phone && p.phone.tel) actions.push({ href: 'tel:' + p.phone.tel, label: `${LABELS.call} ${p.phone.text}` });
    if (p.emailOk) actions.push({ href: 'mailto:' + p.email, label: `${LABELS.write} на ${p.email}` });

    const body = [
      heading(LABELS.contacts),
      buttons(actions),
      table(p.contacts),
      p.details.length ? heading(detailsTitle(kind)) + table(p.details) : '',
      heading(LABELS.source),
      table(source),
    ].join('\n');

    const html = layout({
      preheader: `${c.lead}${who ? ' ' + who : ''}`,
      eyebrow: 'Заявка с сайта',
      title: c.title,
      lead: c.lead,
      body,
      footer: esc(LABELS.salonFooter),
    });

    const block = (t, rows) => (rows.length ? ['', t.toUpperCase(), ...rows.map((r) => `${r.label}: ${r.text}`)] : []);
    const text = [
      c.title,
      c.lead,
      ...block(LABELS.contacts, p.contacts),
      ...block(detailsTitle(kind), p.details),
      ...block(LABELS.source, source),
    ].join('\n');

    return { subject, html, text };
  }

  // ---------- подтверждение клиенту ----------
  function buildClientEmail(kind, data) {
    const c = kindCopy(kind).client;
    data = data || {};
    const p = parse(kind, data);
    if (!p.emailOk) return null;
    const hello = p.name ? `${p.name}, здравствуйте!` : 'Здравствуйте!';
    const subject = subjectLine(`${c.subject} — ${SALON.brand}`);
    const sent = [...p.contacts.filter((r) => r.label !== LABELS.fields.email), ...p.details];

    const steps = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 20px;">
${c.steps.map(([t, d], i) => `<tr>
<td valign="top" width="44" style="width:44px;padding:0 0 16px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="32" height="32" align="center" valign="middle" bgcolor="${C.navy}" style="width:32px;height:32px;background-color:${C.navy};border-radius:16px;font-family:${SERIF};font-size:16px;line-height:32px;font-weight:bold;color:${C.gold};">${i + 1}</td></tr></table></td>
<td valign="top" style="padding:4px 0 16px;font-family:${SANS};font-size:15px;line-height:22px;color:${C.slate};"><strong style="font-family:${SERIF};font-size:17px;color:${C.navy};">${esc(t)}</strong><br>${esc(d)}</td>
</tr>`).join('\n')}
</table>`;

    const body = [
      heading(LABELS.next),
      steps,
      sent.length ? heading(LABELS.yours) + table(sent) : '',
      `<p style="margin:0 0 12px;font-family:${SANS};font-size:15px;line-height:22px;color:${C.slate};">${esc(LABELS.callSalon)}</p>`,
      buttons([{ href: 'tel:' + SALON.tel, label: `${LABELS.call} ${SALON.phone}` }]),
      `<p style="margin:0 0 20px;font-family:${SERIF};font-size:16px;line-height:24px;font-style:italic;color:${C.navy};">${esc(LABELS.signature)}</p>`,
    ].join('\n');

    const footer =
      `<strong style="color:${C.navy};">${esc(SALON.brand)}</strong> — шторы на заказ<br>${esc(SALON.address)}<br>` +
      `${link('tel:' + SALON.tel, SALON.phone)} · ${link('mailto:' + SALON.email, SALON.email)} · ${link(SITE + '/', 'shtorivdom.ru')}<br>${esc(SALON.hours)}` +
      `<br><span style="color:${C.muted};">${esc(LABELS.clientFooter)}</span>`;

    const html = layout({ preheader: c.intro, eyebrow: 'Шторы на заказ', title: c.title, lead: `${hello} ${c.intro}`, body, footer });

    const text = [
      c.title,
      '',
      `${hello} ${c.intro}`,
      '',
      LABELS.next.toUpperCase(),
      ...c.steps.map(([t, d], i) => `${i + 1}. ${t}. ${d}`),
      ...(sent.length ? ['', LABELS.yours.toUpperCase(), ...sent.map((r) => `${r.label}: ${r.text}`)] : []),
      '',
      `${LABELS.callSalon} ${SALON.phone}`,
      '',
      LABELS.signature,
      SALON.address,
      `${SALON.phone} · ${SALON.email} · ${SITE}/`,
      SALON.hours,
    ].join('\n');

    return { subject, html, text };
  }

  return { KINDS: Object.keys(COPY), COPY, LABELS, SALON, buildLeadEmail, buildClientEmail, normalizePhone, escapeHtml: esc };
});
