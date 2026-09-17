<?php
/**
 * Сборка письма о заявке на сервере: HTML и текстовая версия.
 * Вёрстка повторяет почтовые шаблоны макетов (mockups/site/assets/email.js):
 * таблицы, ширина 600px, тёмная шапка со знаком логотипа, золотые кнопки.
 */

const LEAD_COLORS = [
    'navy' => '#0d223d', 'gold' => '#c9a84c', 'goldText' => '#8a6d1f',
    'cream' => '#f5f0e8', 'slate' => '#2d3748', 'muted' => '#6b6457', 'line' => '#e3dccd',
];
const LEAD_SERIF = "Georgia, 'Times New Roman', serif";
const LEAD_SANS = 'Arial, Helvetica, sans-serif';

/** Типы заявок: короткое название (тема письма) и заголовок внутри письма. */
const LEAD_KINDS = [
    'callback' => ['Обратный звонок', 'Заявка на обратный звонок'],
    'designer' => ['Вызов дизайнера', 'Заявка на выезд дизайнера'],
    'order' => ['Заказ штор', 'Заявка на заказ'],
    'contact' => ['Вопрос с сайта', 'Вопрос со страницы контактов'],
    'partner' => ['Анкета партнёра', 'Заявка на сотрудничество'],
    'curtain-rod' => ['Заказ карниза', 'Заявка на карниз'],
];

/** Подписи полей в том порядке, в каком они идут в письме. */
const LEAD_FIELDS = [
    'name' => 'Имя', 'phone' => 'Телефон', 'email' => 'Email', 'city' => 'Город',
    'theme' => 'Тема', 'model' => 'Модель', 'connectionType' => 'Способ связи',
    'size' => 'Размер окна', 'description' => 'Комментарий',
];

function lead_esc(string $v): string
{
    return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Телефон 79255946117 -> ['+7 (925) 594-61-17', '+79255946117']; иначе как есть, без ссылки. */
function lead_phone(string $raw): array
{
    $d = preg_replace('/\D/', '', $raw);
    if (strlen($d) === 11 && ($d[0] === '7' || $d[0] === '8')) {
        $d = '7' . substr($d, 1);
        $text = sprintf('+7 (%s) %s-%s-%s', substr($d, 1, 3), substr($d, 4, 3), substr($d, 7, 2), substr($d, 9, 2));
        return [$text, '+' . $d];
    }
    return [trim($raw), ''];
}

/** Одна кнопка письма: первая золотая с заливкой, остальные светлые с золотой рамкой. */
function lead_button(string $href, string $label, bool $gold): string
{
    $C = LEAD_COLORS;
    $bg = $gold ? $C['gold'] : '#ffffff';
    $grad = $gold ? 'background-image:linear-gradient(135deg, #c9a84c, #f0d060, #c9a84c);' : '';
    $color = $gold ? $C['navy'] : $C['goldText'];
    $font = "font-family:'Cinzel', " . LEAD_SERIF . ';';

    return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left" style="margin:0 10px 10px 0;"><tr>'
        . '<td bgcolor="' . $bg . '" style="background-color:' . $bg . ';' . $grad . 'border:1px solid ' . $C['gold'] . ';">'
        . '<a href="' . lead_esc($href) . '" style="display:inline-block;padding:16px 32px;' . $font
        . 'font-size:13px;line-height:16px;font-weight:bold;letter-spacing:1.3px;text-transform:uppercase;'
        . 'color:' . $color . ';text-decoration:none;">' . lead_esc($label) . '</a>'
        . '</td></tr></table>';
}

/**
 * Письмо в салон о новой заявке.
 *
 * @param string $kind тип заявки (ключ LEAD_KINDS)
 * @param array  $data поля формы, уже очищенные
 * @param array  $meta pageTitle, pageUrl, sentAt (DateTimeInterface)
 * @return array{subject:string, html:string, text:string, replyTo:string, replyToName:string}
 */
function lead_build_email(string $kind, array $data, array $meta): array
{
    $C = LEAD_COLORS;
    [$kindName, $title] = LEAD_KINDS[$kind] ?? ['Заявка с сайта', 'Новая заявка'];

    $phoneText = '';
    $phoneTel = '';
    if (!empty($data['phone'])) {
        [$phoneText, $phoneTel] = lead_phone((string) $data['phone']);
    }

    $subject = 'Заявка с сайта: ' . mb_strtolower($kindName, 'UTF-8');
    if ($phoneText !== '') {
        $subject .= ' — ' . $phoneText;
    }

    $rows = [];
    $textRows = [];
    foreach (LEAD_FIELDS as $key => $label) {
        $value = trim((string) ($data[$key] ?? ''));
        if ($value === '') {
            continue;
        }
        if ($key === 'phone') {
            $cell = $phoneTel !== ''
                ? '<a href="tel:' . lead_esc($phoneTel) . '" style="color:' . $C['navy'] . ';">' . lead_esc($phoneText) . '</a>'
                : lead_esc($phoneText);
            $textRows[] = $label . ': ' . $phoneText;
        } elseif ($key === 'email') {
            $cell = '<a href="mailto:' . lead_esc($value) . '" style="color:' . $C['navy'] . ';">' . lead_esc($value) . '</a>';
            $textRows[] = $label . ': ' . $value;
        } else {
            $cell = nl2br(lead_esc($value));
            $textRows[] = $label . ': ' . $value;
        }
        $rows[] = '<tr>'
            . '<td valign="top" width="130" style="width:130px;padding:10px 12px 10px 0;border-bottom:1px solid ' . $C['line']
            . ';font-family:' . LEAD_SANS . ';font-size:13px;line-height:20px;color:' . $C['muted'] . ';">' . lead_esc($label) . '</td>'
            . '<td valign="top" style="padding:10px 0;border-bottom:1px solid ' . $C['line']
            . ';font-family:' . LEAD_SANS . ';font-size:15px;line-height:22px;color:' . $C['navy'] . ';word-break:break-word;">' . $cell . '</td>'
            . '</tr>';
    }

    $buttons = '';
    if ($phoneTel !== '') {
        $buttons .= lead_button('tel:' . $phoneTel, 'Позвонить ' . $phoneText, true);
    }
    if (!empty($data['email'])) {
        $buttons .= lead_button('mailto:' . $data['email'], 'Ответить письмом', $buttons === '');
    }
    if ($buttons !== '') {
        $buttons = '<div style="margin:0 0 20px;">' . $buttons . '<div style="clear:both;line-height:0;font-size:0;">&nbsp;</div></div>';
    }

    $sentAt = $meta['sentAt'] ?? new DateTimeImmutable('now', new DateTimeZone('Europe/Moscow'));
    $footerParts = [];
    if (!empty($meta['pageTitle'])) {
        $page = lead_esc((string) $meta['pageTitle']);
        $footerParts[] = !empty($meta['pageUrl'])
            ? '<a href="' . lead_esc((string) $meta['pageUrl']) . '" style="color:' . $C['muted'] . ';">' . $page . '</a>'
            : $page;
    }
    $footerParts[] = 'отправлено ' . $sentAt->format('d.m.Y') . ' в ' . $sentAt->format('H:i');
    $footer = implode(' · ', $footerParts);

    $html = '<!doctype html><html lang="ru"><head><meta charset="UTF-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<title>' . lead_esc($subject) . '</title></head>'
        . '<body style="margin:0;padding:0;background:' . $C['cream'] . ';">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $C['cream'] . ';">'
        . '<tr><td align="center" style="padding:24px 12px;">'
        . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;">'
        . '<tr><td bgcolor="' . $C['navy'] . '" style="background-color:' . $C['navy'] . ';padding:20px 24px;border-top:4px solid ' . $C['gold'] . ';">'
        . '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
        . '<td width="44" valign="middle" style="width:44px;"><img src="https://shtorivdom.ru/assets/logo/logo-1-email.png" width="40" height="40" alt="Шторы в дом" style="display:block;border:0;"></td>'
        . '<td valign="middle" style="padding-left:12px;font-family:' . LEAD_SERIF . ';font-size:20px;line-height:24px;color:#ffffff;">Шторы в дом'
        . '<div style="font-family:' . LEAD_SANS . ';font-size:12px;line-height:16px;color:' . $C['gold'] . ';letter-spacing:1px;text-transform:uppercase;">'
        . lead_esc($kindName) . '</div></td></tr></table></td></tr>'
        . '<tr><td style="padding:28px 24px 8px;font-family:' . LEAD_SERIF . ';font-size:22px;line-height:28px;color:' . $C['navy'] . ';">' . lead_esc($title) . '</td></tr>'
        . '<tr><td style="padding:0 24px 20px;font-family:' . LEAD_SANS . ';font-size:15px;line-height:22px;color:' . $C['slate'] . ';">'
        . 'Клиент оставил заявку на сайте. Свяжитесь с ним в рабочее время.</td></tr>'
        . '<tr><td style="padding:0 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 24px;border-top:1px solid ' . $C['line'] . ';">'
        . implode('', $rows) . '</table></td></tr>'
        . ($buttons !== '' ? '<tr><td style="padding:0 24px;">' . $buttons . '</td></tr>' : '')
        . '<tr><td style="padding:16px 24px 24px;border-top:1px solid ' . $C['line'] . ';font-family:' . LEAD_SANS
        . ';font-size:12px;line-height:18px;color:' . $C['muted'] . ';">' . $footer . '</td></tr>'
        . '</table></td></tr></table></body></html>';

    $text = $title . "\n\n" . implode("\n", $textRows) . "\n\n" . strip_tags($footer);

    return [
        'subject' => $subject,
        'html' => $html,
        'text' => $text,
        'replyTo' => (string) ($data['email'] ?? ''),
        'replyToName' => (string) ($data['name'] ?? ''),
    ];
}

/** Шаги «что будет дальше» для письма клиенту. */
const LEAD_STEP_CALL = ['Звонок', 'Перезвоним в рабочее время — без выходных, с 10:00 до 20:00. Ответим на вопросы и договоримся о встрече.'];
const LEAD_STEP_VISIT = ['Выезд дизайнера', 'Бесплатно. Дизайнер привезёт образцы и каталоги тканей, сделает замеры, подготовит эскиз и расчёт.'];
const LEAD_STEP_SEW = ['Пошив', '10–14 дней в собственном цехе под контролем технолога. Каждое изделие проверяем перед выдачей.'];
const LEAD_STEP_MOUNT = ['Монтаж', 'Привезём, установим карнизы, навесим и отпарим шторы. Гарантия 2 года на работы и материалы.'];

/** Тексты письма клиенту: тема, вступление и шаги. Совпадают с шаблонами макетов. */
const LEAD_CLIENT_COPY = [
    'callback' => [
        'subject' => 'Спасибо! Мы перезвоним',
        'intro' => 'Заявка на звонок принята. Менеджер позвонит вам в рабочее время, ответит на вопросы и поможет договориться о встрече с дизайнером.',
        'steps' => ['call', 'visit', 'sew', 'mount'],
    ],
    'designer' => [
        'subject' => 'Заявка на выезд дизайнера принята',
        'intro' => 'Дизайнер свяжется с вами, чтобы договориться о дне и времени выезда. Выезд бесплатный — в любой район Москвы и Московской области.',
        'steps' => ['call', 'visit', 'sew', 'mount'],
    ],
    'order' => [
        'subject' => 'Заявка на заказ принята',
        'intro' => 'Мы получили вашу заявку и скоро свяжемся с вами, чтобы уточнить детали и договориться о встрече.',
        'steps' => ['call', 'visit', 'sew', 'mount'],
    ],
    'contact' => [
        'subject' => 'Мы получили ваш вопрос',
        'intro' => 'Спасибо, что написали. Ответим на этот адрес в рабочее время — без выходных, с 10:00 до 20:00.',
        'steps' => [
            ['Ответ', 'Менеджер разберётся в вопросе и ответит письмом или перезвонит, если вы оставили телефон.'],
            ['Если нужен замер', 'Договоримся о бесплатном выезде дизайнера с образцами тканей.'],
        ],
    ],
    'partner' => [
        'subject' => 'Анкета партнёра получена',
        'intro' => 'Спасибо за интерес к сотрудничеству. Мы изучим анкету и позвоним вам в рабочее время.',
        'steps' => [
            ['Анкета', 'Анкета у нас — менеджер познакомится с ней.'],
            ['Звонок', 'Перезвоним без выходных, с 10:00 до 20:00, и расскажем, как устроена партнёрская программа.'],
        ],
    ],
    'curtain-rod' => [
        'subject' => 'Заявка на карниз принята',
        'intro' => 'Мы получили заявку на выбранную модель и перезвоним, чтобы уточнить размеры и договориться о замере.',
        'steps' => [
            'call',
            ['Замер', 'Бесплатный выезд: замерим окна и покажем образцы.'],
            'mount',
        ],
    ],
];

/**
 * Подтверждение клиенту. Возвращает null, если в заявке нет корректного email.
 *
 * @return array{subject:string, html:string, text:string}|null
 */
function lead_build_client_email(string $kind, array $data): ?array
{
    $email = trim((string) ($data['email'] ?? ''));
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return null;
    }
    $copy = LEAD_CLIENT_COPY[$kind] ?? LEAD_CLIENT_COPY['order'];
    $C = LEAD_COLORS;
    $named = ['call' => LEAD_STEP_CALL, 'visit' => LEAD_STEP_VISIT, 'sew' => LEAD_STEP_SEW, 'mount' => LEAD_STEP_MOUNT];

    $name = trim((string) ($data['name'] ?? ''));
    $hello = $name !== '' ? $name . ', здравствуйте!' : 'Здравствуйте!';
    $subject = $copy['subject'] . ' — Шторы в дом';

    $stepsHtml = '';
    $stepsText = [];
    foreach ($copy['steps'] as $i => $step) {
        [$stepTitle, $stepText] = is_string($step) ? $named[$step] : $step;
        $stepsText[] = ($i + 1) . '. ' . $stepTitle . '. ' . $stepText;
        $stepsHtml .= '<tr>'
            . '<td valign="top" width="44" style="width:44px;padding:0 0 16px;">'
            . '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
            . '<td width="32" height="32" align="center" valign="middle" bgcolor="' . $C['gold'] . '" style="width:32px;height:32px;background-color:' . $C['gold']
            . ';font-family:' . LEAD_SERIF . ';font-size:15px;color:' . $C['navy'] . ';border-radius:16px;">' . ($i + 1) . '</td>'
            . '</tr></table></td>'
            . '<td valign="top" style="padding:4px 0 16px;font-family:' . LEAD_SANS . ';font-size:15px;line-height:22px;color:' . $C['slate'] . ';">'
            . '<strong style="font-family:' . LEAD_SERIF . ';font-size:17px;color:' . $C['navy'] . ';">' . lead_esc($stepTitle) . '</strong><br>' . lead_esc($stepText)
            . '</td></tr>';
    }

    $html = '<!doctype html><html lang="ru"><head><meta charset="UTF-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<title>' . lead_esc($subject) . '</title></head>'
        . '<body style="margin:0;padding:0;background:' . $C['cream'] . ';">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $C['cream'] . ';">'
        . '<tr><td align="center" style="padding:24px 12px;">'
        . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;">'
        . '<tr><td bgcolor="' . $C['navy'] . '" style="background-color:' . $C['navy'] . ';padding:20px 24px;border-top:4px solid ' . $C['gold'] . ';">'
        . '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
        . '<td width="44" valign="middle" style="width:44px;"><img src="https://shtorivdom.ru/assets/logo/logo-1-email.png" width="40" height="40" alt="Шторы в дом" style="display:block;border:0;"></td>'
        . '<td valign="middle" style="padding-left:12px;font-family:' . LEAD_SERIF . ';font-size:20px;line-height:24px;color:#ffffff;">Шторы в дом'
        . '<div style="font-family:' . LEAD_SANS . ';font-size:12px;line-height:16px;color:' . $C['gold'] . ';letter-spacing:1px;text-transform:uppercase;">Заявка принята</div>'
        . '</td></tr></table></td></tr>'
        . '<tr><td style="padding:28px 24px 8px;font-family:' . LEAD_SERIF . ';font-size:22px;line-height:28px;color:' . $C['navy'] . ';">' . lead_esc($copy['subject']) . '</td></tr>'
        . '<tr><td style="padding:0 24px 20px;font-family:' . LEAD_SANS . ';font-size:15px;line-height:22px;color:' . $C['slate'] . ';">'
        . lead_esc($hello) . ' ' . lead_esc($copy['intro']) . '</td></tr>'
        . '<tr><td style="padding:0 24px 4px;font-family:' . LEAD_SANS . ';font-size:12px;line-height:16px;letter-spacing:1px;text-transform:uppercase;color:' . $C['muted'] . ';">Что будет дальше</td></tr>'
        . '<tr><td style="padding:12px 24px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 20px;">'
        . $stepsHtml . '</table></td></tr>'
        . '<tr><td style="padding:0 24px;">' . lead_button('tel:+79255946117', 'Позвонить +7 (925) 594-61-17', true)
        . '<div style="clear:both;line-height:0;font-size:0;">&nbsp;</div></td></tr>'
        . '<tr><td style="padding:16px 24px 24px;border-top:1px solid ' . $C['line'] . ';font-family:' . LEAD_SANS
        . ';font-size:13px;line-height:20px;color:' . $C['muted'] . ';">'
        . 'Шторы в дом · Троицк, Кварцевая улица, 3, корп. 2<br>'
        . '<a href="tel:+79255946117" style="color:' . $C['muted'] . ';">+7 (925) 594-61-17</a> · '
        . '<a href="mailto:info@shtorivdom.ru" style="color:' . $C['muted'] . ';">info@shtorivdom.ru</a> · Без выходных, 10:00–20:00'
        . '</td></tr></table></td></tr></table></body></html>';

    $text = $copy['subject'] . "\n\n" . $hello . ' ' . $copy['intro'] . "\n\nЧТО БУДЕТ ДАЛЬШЕ\n" . implode("\n", $stepsText)
        . "\n\nШторы в дом · Троицк, Кварцевая улица, 3, корп. 2\n+7 (925) 594-61-17 · info@shtorivdom.ru · Без выходных, 10:00–20:00";

    return ['subject' => $subject, 'html' => $html, 'text' => $text];
}

/** Короткое сообщение для Telegram (разметка HTML, её понимает Bot API). */
function lead_telegram_text(string $kind, array $data, array $meta): string
{
    [$kindName] = LEAD_KINDS[$kind] ?? ['Заявка с сайта'];
    $lines = ['<b>' . lead_esc($kindName) . '</b>'];
    foreach (LEAD_FIELDS as $key => $label) {
        $value = trim((string) ($data[$key] ?? ''));
        if ($value === '') {
            continue;
        }
        if ($key === 'phone') {
            [$value] = lead_phone($value);
        }
        $lines[] = lead_esc($label) . ': ' . lead_esc($value);
    }
    if (!empty($meta['pageUrl'])) {
        $lines[] = lead_esc((string) $meta['pageUrl']);
    }
    return implode("\n", $lines);
}
