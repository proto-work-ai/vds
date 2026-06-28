<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $message = "";

        $input_json = file_get_contents('php://input');
        $input= json_decode( $input_json, TRUE ); //convert JSON into array

        if($input["address"]){
            $message .= "Адрес: {$input["address"]}\n";
        }
        if($input["work"]){
            $message .= "Вид работ: {$input["work"]}\n";            
        }
        if($input["phone"]){
            $message .= "Телефон: {$input["phone"]}\n";            
        }
        if($input["description"]){
            $message .= "Описание: {$input["description"]}\n";            
        }      
        $message = wordwrap($message, 70);

        // var_dump($message);
        // var_dump(mail('andrey.asp2010@gmail.com', 'Заявка c сайта(deckenmaster.ru)', $message));
        // mail('andrey.asp2010@gmail.com', 'Заявка c сайта(deckenmaster.ru)', $message);
        mail('andrey.asp2010@gmail.com', 'Заявка c сайта', $message, $headers);
    } else  {
        echo 'NO POST';
    }    
?>
