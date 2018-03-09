<?php


$call    = "roman.kukve@icloud.com";
$contact = "roman.kukve@icloud.com";
$from    = "lekasrsto@izmaki.com";



if (isset($_POST)) {
    if (isset($_POST['email'])) {

        $headers = 'From: '.$from.'' . "\r\n" .'Reply-To: ' . $_POST['email'] . "\r\n" ;

        if (mail($contact,$_POST['message'],$headers)) {
            echo "Danke für Ihre Nachricht. Sie ist erfolgreich gesandt.";
        }
    }
    else {
        if (mail($call,'call me',$_POST['phone'])) {
            echo "Danke für Ihre Nachricht. Sie ist erfolgreich gesandt.";
        }
    }
	
}