<?php
/**
 * Приём заявок с сайта: письмо в салон по SMTP, дубль в Telegram, запись в файл.
 *
 * Принимает POST с JSON: { kind, name, phone, email, city, theme, model,
 *                          connectionType, size, description, consent, website, formTime, pageTitle, pageUrl }
 * Отвечает JSON: { ok: true } либо { ok: false, error: '...' } с кодом 400/429/500.
 *
 * Письмо собирает сервер (lib/lead-mail.php) — из браузера приходят только поля,
 * поэтому через форму нельзя отправить произвольное содержимое.
 * Настройки (ящик, пароль, Telegram, получатели) — в lead-config.php рядом,
 * он не хранится в репозитории: см. lead-config.sample.php.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

require __DIR__ . '/lib/lead-mail.php';
require __DIR__ . '/lib/smtp.php';

$CONFIG_FILE = __DIR__ . '/lead-config.php';
$config = is_file($CONFIG_FILE) ? require $CONFIG_FILE : null;

/** Ответ и выход. */
function lead_reply(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Запись в журнал заявок и ошибок: api/leads/YYYY-MM.jsonl */
function lead_log(array $entry): void
{
    $dir = __DIR__ . '/leads';
    if (!is_dir($dir)) {
        @mkdir($dir, 0750, true);
    }
    $file = $dir . '/' . date('Y-m') . '.jsonl';
    @file_put_contents($file, json_encode($entry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    lead_reply(405, ['ok' => false, 'error' => 'Только POST']);
}
if (!$config) {
    lead_reply(500, ['ok' => false, 'error' => 'Нет файла настроек lead-config.php']);
}

// ---------- запрос пришёл с нашего сайта ----------
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$allowed = $config['allowedHosts'] ?? ['shtorivdom.ru', 'www.shtorivdom.ru'];
$hostOf = static function (string $url): string {
    $h = parse_url($url, PHP_URL_HOST);
    return is_string($h) ? strtolower($h) : '';
};
$from = $hostOf($origin) ?: $hostOf($referer);
if ($from !== '' && !in_array($from, $allowed, true)) {
    lead_reply(403, ['ok' => false, 'error' => 'Запрос не с сайта']);
}

// ---------- разбор тела ----------
$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) {
    lead_reply(400, ['ok' => false, 'error' => 'Пустой или слишком большой запрос']);
}
$input = json_decode($raw, true);
if (!is_array($input)) {
    lead_reply(400, ['ok' => false, 'error' => 'Ожидается JSON']);
}

/** Одна строка поля: без переводов строки, обрезка по длине. */
$oneLine = static function ($v, int $max = 200): string {
    $s = trim(preg_replace('/\s+/u', ' ', (string) $v));
    return mb_substr($s, 0, $max, 'UTF-8');
};
/** Многострочное поле: переводы строк сохраняются. */
$multiLine = static function ($v, int $max = 2000): string {
    $s = trim(preg_replace("/[ \t]+/u", ' ', str_replace(["\r\n", "\r"], "\n", (string) $v)));
    return mb_substr($s, 0, $max, 'UTF-8');
};

// ---------- защита от ботов ----------
// 1. Скрытое поле website: люди его не видят и не заполняют
if ($oneLine($input['website'] ?? '') !== '') {
    lead_log(['at' => date('c'), 'skip' => 'honeypot', 'ip' => $_SERVER['REMOTE_ADDR'] ?? '']);
    lead_reply(200, ['ok' => true]);   // боту отвечаем «принято», чтобы не подбирал обход
}
// 2. Форма, заполненная быстрее 3 секунд, — почти всегда бот
$formTime = (int) ($input['formTime'] ?? 0);
if ($formTime > 0 && $formTime < 3000) {
    lead_log(['at' => date('c'), 'skip' => 'too-fast', 'ms' => $formTime, 'ip' => $_SERVER['REMOTE_ADDR'] ?? '']);
    lead_reply(200, ['ok' => true]);
}
// 3. Не больше 5 заявок за 10 минут с одного адреса
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
$limitDir = __DIR__ . '/leads';
if (!is_dir($limitDir)) {
    @mkdir($limitDir, 0750, true);
}
$limitFile = $limitDir . '/rate-' . md5($ip) . '.json';
$now = time();
$hits = array_values(array_filter(
    is_file($limitFile) ? (json_decode((string) @file_get_contents($limitFile), true) ?: []) : [],
    static fn($t) => is_int($t) && $t > $now - 600
));
if (count($hits) >= (int) ($config['rateLimit'] ?? 5)) {
    lead_reply(429, ['ok' => false, 'error' => 'Слишком много заявок подряд. Попробуйте позже или позвоните нам.']);
}
$hits[] = $now;
@file_put_contents($limitFile, json_encode($hits), LOCK_EX);

// ---------- поля заявки ----------
$kind = $oneLine($input['kind'] ?? '', 30);
if (!isset(LEAD_KINDS[$kind])) {
    $kind = 'order';
}
$data = [
    'name' => $oneLine($input['name'] ?? '', 100),
    'phone' => $oneLine($input['phone'] ?? '', 30),
    'email' => $oneLine($input['email'] ?? '', 120),
    'city' => $oneLine($input['city'] ?? '', 100),
    'theme' => $oneLine($input['theme'] ?? '', 120),
    'model' => $oneLine($input['model'] ?? '', 120),
    'connectionType' => $oneLine($input['connectionType'] ?? '', 60),
    'size' => $oneLine($input['size'] ?? '', 60),
    'description' => $multiLine($input['description'] ?? ''),
];
if ($data['email'] !== '' && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $data['email'] = '';
}

// телефон обязателен везде, кроме вопроса со страницы контактов — там нужен email
$digits = preg_replace('/\D/', '', $data['phone']);
if (strlen($digits) === 10) {
    $digits = '7' . $digits;
    $data['phone'] = $digits;
}
$needPhone = $kind !== 'contact';
if ($needPhone && strlen($digits) !== 11) {
    lead_reply(400, ['ok' => false, 'error' => 'Укажите телефон полностью']);
}
if (!$needPhone && $data['email'] === '' && strlen($digits) !== 11) {
    lead_reply(400, ['ok' => false, 'error' => 'Укажите телефон или email']);
}
if (empty($input['consent'])) {
    lead_reply(400, ['ok' => false, 'error' => 'Нужно согласие на обработку персональных данных']);
}

$meta = [
    'pageTitle' => $oneLine($input['pageTitle'] ?? '', 150),
    'pageUrl' => filter_var((string) ($input['pageUrl'] ?? ''), FILTER_VALIDATE_URL) ?: '',
    'sentAt' => new DateTimeImmutable('now', new DateTimeZone('Europe/Moscow')),
];

// ---------- заявка в журнал (до отправки: письмо может не уйти, заявка не потеряется) ----------
lead_log(['at' => $meta['sentAt']->format('c'), 'kind' => $kind, 'data' => array_filter($data), 'page' => $meta['pageUrl'], 'ip' => $ip]);

// ---------- письмо в салон ----------
$mail = lead_build_email($kind, $data, $meta);
$recipients = $config['to'] ?? [];
[$sent, $error] = $recipients
    ? smtp_send($config['smtp'], [
        'to' => $recipients,
        'subject' => $mail['subject'],
        'html' => $mail['html'],
        'text' => $mail['text'],
        'replyTo' => $mail['replyTo'],
        'replyToName' => $mail['replyToName'],
    ])
    : [false, 'не задан список получателей'];

if (!$sent) {
    lead_log(['at' => date('c'), 'error' => 'smtp', 'message' => $error, 'kind' => $kind]);
    if ($recipients) {
        [$sent, $fallbackError] = native_mail_send($config['smtp'], [
            'to' => $recipients,
            'subject' => $mail['subject'],
            'html' => $mail['html'],
            'text' => $mail['text'],
            'replyTo' => $mail['replyTo'],
            'replyToName' => $mail['replyToName'],
        ]);
        if (!$sent) {
            lead_log([
                'at' => date('c'),
                'error' => 'mail-fallback',
                'message' => $fallbackError,
                'kind' => $kind,
            ]);
        }
    }
}

// ---------- подтверждение клиенту ----------
// Уходит только при корректном email в заявке. Отключается в настройках: 'clientEmail' => false.
if (($config['clientEmail'] ?? true) && $data['email'] !== '') {
    $client = lead_build_client_email($kind, $data);
    if ($client) {
        [$clientSent, $clientError] = smtp_send($config['smtp'], [
            'to' => [$data['email']],
            'subject' => $client['subject'],
            'html' => $client['html'],
            'text' => $client['text'],
        ]);
        if (!$clientSent) {
            lead_log(['at' => date('c'), 'error' => 'smtp-client', 'message' => $clientError, 'to' => $data['email']]);
        }
    }
}

// ---------- дубль в Telegram ----------
$tg = $config['telegram'] ?? null;
if ($tg && !empty($tg['token']) && !empty($tg['chatId'])) {
    $url = 'https://api.telegram.org/bot' . $tg['token'] . '/sendMessage';
    $payload = json_encode([
        'chat_id' => $tg['chatId'],
        'text' => lead_telegram_text($kind, $data, $meta),
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $answer = curl_exec($ch);
    $tgOk = $answer !== false && (json_decode((string) $answer, true)['ok'] ?? false);
    curl_close($ch);
    if (!$tgOk) {
        lead_log(['at' => date('c'), 'error' => 'telegram', 'message' => substr((string) $answer, 0, 300)]);
    }
    $sent = $sent || $tgOk;   // заявка дошла хотя бы одним путём
}

if (!$sent) {
    lead_reply(500, ['ok' => false, 'error' => 'Не удалось отправить заявку. Позвоните нам: +7 (915) 359-12-00']);
}
lead_reply(200, ['ok' => true]);
