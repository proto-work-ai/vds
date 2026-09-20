<?php
/**
 * Отправка письма через SMTP-ящик домена. Без сторонних библиотек: сокет + AUTH LOGIN.
 * Возвращает [true, ''] или [false, 'текст ошибки'] — вызывающий код решает, что делать дальше.
 */

function smtp_send(array $cfg, array $msg): array
{
    $host = $cfg['host'];
    $port = (int) $cfg['port'];
    $secure = $cfg['secure'] ?? 'ssl';           // ssl (465) или tls (587)
    $timeout = (int) ($cfg['timeout'] ?? 20);

    $hosts = [$host];
    $ipv4 = gethostbyname($host);
    if ($ipv4 !== $host) {
        $hosts[] = $ipv4;
    }
    $socket = false;
    $errNo = 0;
    $errStr = '';
    foreach (array_unique($hosts) as $connectionHost) {
        $target = ($secure === 'ssl' ? 'ssl://' : '') . $connectionHost . ':' . $port;
        $socket = @stream_socket_client($target, $errNo, $errStr, $timeout);
        if ($socket) {
            break;
        }
    }
    if (!$socket) {
        return [false, "не удалось подключиться к $host:$port ($errStr)"];
    }
    stream_set_timeout($socket, $timeout);

    $read = static function () use ($socket): string {
        $out = '';
        while (($line = fgets($socket, 515)) !== false) {
            $out .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return $out;
    };
    $say = static function (string $cmd, string $expect) use ($socket, $read, &$error): bool {
        if ($cmd !== '') {
            fwrite($socket, $cmd . "\r\n");
        }
        $answer = $read();
        if (strncmp($answer, $expect, strlen($expect)) !== 0) {
            $error = trim($cmd === '' ? 'приветствие' : $cmd) . ' → ' . trim($answer);
            return false;
        }
        return true;
    };

    $error = '';
    $me = $cfg['helo'] ?? 'shtorivdom.ru';
    $ok = $say('', '220') && $say("EHLO $me", '250');

    if ($ok && $secure === 'tls') {
        $ok = $say('STARTTLS', '220')
            && @stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
            && $say("EHLO $me", '250');
        if (!$ok && $error === '') {
            $error = 'не удалось включить шифрование TLS';
        }
    }

    if ($ok) {
        $ok = $say('AUTH LOGIN', '334')
            && $say(base64_encode($cfg['user']), '334')
            && $say(base64_encode($cfg['password']), '235');
        if (!$ok && $error !== '') {
            $error = 'вход в ящик не принят: ' . $error;
        }
    }

    if ($ok) {
        $ok = $say('MAIL FROM:<' . $cfg['from'] . '>', '250');
        foreach ($msg['to'] as $to) {
            $ok = $ok && $say('RCPT TO:<' . $to . '>', '250');
        }
        $ok = $ok && $say('DATA', '354');
    }

    if ($ok) {
        $body = smtp_build_message($cfg, $msg);
        // Точка в начале строки экранируется, иначе письмо оборвётся
        fwrite($socket, preg_replace('/^\./m', '..', $body) . "\r\n.\r\n");
        $ok = $say('', '250');
    }

    @fwrite($socket, "QUIT\r\n");
    @fclose($socket);

    return [$ok, $ok ? '' : $error];
}

/** Резервная отправка через локальный почтовый транспорт хостинга. */
function native_mail_send(array $cfg, array $msg): array
{
    $message = smtp_build_message($cfg, $msg);
    [$headers, $body] = array_pad(preg_split("/\r\n\r\n/", $message, 2), 2, '');
    $headers = preg_replace('/^To:.*\r\n/m', '', (string) $headers);
    $to = implode(', ', $msg['to']);
    $sent = mail($to, $msg['subject'], $body, trim((string) $headers));

    return $sent ? [true, ''] : [false, 'встроенная PHP-отправка mail() отклонена'];
}

/** Письмо целиком: заголовки плюс текстовая и HTML-части. */
function smtp_build_message(array $cfg, array $msg): string
{
    $boundary = 'b' . bin2hex(random_bytes(8));
    $encode = static fn(string $v): string => '=?UTF-8?B?' . base64_encode($v) . '?=';
    $fromName = $cfg['fromName'] ?? 'Шторы в дом';

    $headers = [
        'Date: ' . date('r'),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@shtorivdom.ru>',
        'From: ' . $encode($fromName) . ' <' . $cfg['from'] . '>',
        'To: ' . implode(', ', $msg['to']),
        'Subject: ' . $encode($msg['subject']),
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    ];
    if (!empty($msg['replyTo'])) {
        $name = $msg['replyToName'] ?? '';
        $headers[] = 'Reply-To: ' . ($name !== '' ? $encode($name) . ' ' : '') . '<' . $msg['replyTo'] . '>';
    }
    // Отписка: письма о заявках служебные, но проверялки доставляемости ждут этот заголовок
    if (!empty($cfg['unsubscribe'])) {
        $headers[] = 'List-Unsubscribe: <mailto:' . $cfg['unsubscribe'] . '?subject=unsubscribe>';
    }
    // Служебное письмо, а не рассылка: почтовые службы не считают его массовым
    $headers[] = 'Auto-Submitted: auto-generated';
    $headers[] = 'X-Auto-Response-Suppress: OOF, AutoReply';

    $part = static fn(string $type, string $content): string =>
        "--$boundary\r\nContent-Type: $type; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($content), 76, "\r\n");

    return implode("\r\n", $headers) . "\r\n\r\n"
        . $part('text/plain', $msg['text'])
        . $part('text/html', $msg['html'])
        . "--$boundary--";
}
