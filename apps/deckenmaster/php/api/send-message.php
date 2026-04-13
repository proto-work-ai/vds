<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input_json = file_get_contents('php://input');
        $input= json_decode( $input_json, TRUE ); //convert JSON into array
        $message = wordwrap($input["message"], 70);
        var_dump(mail('andrey.asp2010@gmail.com', 'Заявка c сайта', $message));
    } else  {
        echo 'NO POST';
    }    
?>
