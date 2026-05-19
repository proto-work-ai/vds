<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input_json = file_get_contents('php://input');
        $input= json_decode( $input_json, TRUE ); //convert JSON into array
        $message = wordwrap($input["message"], 70);

        // CRITICAL: Set Content-type header for HTML
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8";

        // Additional headers (optional)
        // $headers .= 'From: <sender@example.com>' . "\r\n";

        mail('ryslan69khatyev95@gmail.com', 'Заявка c сайта', $message, $headers);
        mail('info@deckenmaster.ru', 'Заявка c сайта', $message, $headers);
        mail('andrey.asp2010@gmail.com', 'Заявка c сайта', $message, $headers);
    } else  {
        echo 'NO POST';
    }    
?>
