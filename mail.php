<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'file/Exception.php';
require 'file/PHPMailer.php';
require 'file/SMTP.php';

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

// Instantiate PHPMailer
$mail = new PHPMailer(true);

try {
    // SMTP server settings
    $mail->isSMTP();
    $mail->Host = 'mail.aaronworsnop.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'me@aaronworsnop.com';
    $mail->Password = 'PLACEHOLDER';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    // Sender and recipient details
    $mail->setFrom($email, $firstName . ' ' . $lastName);
    $mail->addAddress('me@aaronworsnop.com');

    // Email subject and content
    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = '<h2>Contact Form Message:</h2>' . '<p>' . $message . '</p>';

    // Send the email
    $mail->send();

    // Redirect to home
    header("Location: index.html");
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    exit("Error sending email. Please try again later.");
}
?>
