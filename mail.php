<?php

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Validate form inputs
if (empty($firstName) || empty($lastName) || empty($email) || empty($subject) || empty($message)) {
    // Handle validation failure
    header("HTTP/1.1 400 Bad Request");
    exit("Please fill in all the required fields.");
}

// Sanitize form inputs
$firstName = htmlspecialchars($firstName);
$lastName = htmlspecialchars($lastName);
$email = htmlspecialchars($email);
$subject = htmlspecialchars($subject);
$message = htmlspecialchars($message);

//mail to
$mailTo = "aaronworsnopbusiness@gmail.com";

//mail subject
$mailSubject = $subject;

//mail message
$mailMessage = "<h1>".$subject.": ".$firstName." ".$lastName."</h1>\r\n\r\n";
$mailMessage .= "<p>".$message."</p>\r\n\r\n";

// Sanitize and validate email address
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Handle invalid email address
    header("HTTP/1.1 400 Bad Request");
    exit("Invalid email address.");
}

//mail headers
$mailHeader = "From:".$firstName." ".$lastName."<".$email.">\r\n";
$mailHeader .= "Content-type: text/html; charset=UTF-8\r\n";
$mailHeader .= "MIME-Version: 1.0\r\n";

//send email
mail($mailTo, $mailSubject, $mailMessage, $mailHeader);

//redirect to home
header("Location: index.html");

?>