<?php

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

//mail to
$mailTo = "aaronworsnopbusiness@gmail.com";

//mail subject
$mailSubject = $subject;

//mail message
$mailMessage = "<h1>".$subject.": ".$firstName." ".$lastName."</h1>\r\n\r\n";
$mailMessage .= "<p>".$message."</p>\r\n\r\n";

//mail headers
$mailHeader = "From:".$firstName." ".$lastName."<".$email.">\r\n";
$mailHeader .= "Content-type: text/html\r\n";

//send email
mail($mailTo, $mailSubject, $mailMessage, $mailHeader);

//redirect to home
header("Location: index.html");

?>