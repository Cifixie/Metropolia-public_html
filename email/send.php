<?php
$endl = "\r\n";

function getPostData($index) {
  return trim(strip_tags($_POST[$index]));
}

function mailToString($name, $email) {
  return $name . '<' . $email . '>';
}

function getMailAddress($type) {
  return mailToString(
    getPostData($type . '-name'),
    getPostData($type . '-email')
  );
}

if ($_POST['submit']) {
  $from = getMailAddress('from');
  $from = getMailAddress('to');

  $headers  = 'From: '. $from  . $endl;
  $headers .= 'To: '. $to  . $endl;
  $headers .= 'Bcc: tommikes@metropolia.fi' . $endl;
  $headers .= 'MIME-Version: 1.0' . $endl;
  $headers .= 'Content-Type: text/html; charset=ISO-8859-1' . $endl;

  $subject = getPostData('subject');

  $message = file_get_contents('./template.html', true);

  mail($to, $subject, $message, $headers);
  echo '<h1>mail sent!</h1>';
}
