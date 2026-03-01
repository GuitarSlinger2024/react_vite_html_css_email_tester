<?php

$absolute_path = $_SESSION['path'] . '/includes/email_confirmation/images/';


// $absolute_path = "../includes/images/";



/*


"C:/xampp/newest_php_programs/____current_projects/login_system_&_landing_page/_final_product_nov_9/

newest_php_programs/____current_projects/login_system_&_landing_page/_final_product_nov_9includes/email_confirmation/images/computer.png";

*/


$image_path = $absolute_path . "png_logo_black.png";
$reference = "image_2";
$mail->AddEmbeddedImage($image_path, $reference);


$image_path = $absolute_path . "computer.png";
$reference = "image_1";
$mail->AddEmbeddedImage($image_path, $reference);



