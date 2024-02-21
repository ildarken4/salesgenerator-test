<?php

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$phone = $data['phone'];

$to = 'order@salesgenerator.pro, fedorovnapelageya+lead@mail.amocrm.ru';

$subject = 'Заявка Ильдар Мустафин';

$body = "Почта: $email\nТелефон: $phone";

$mailSent = mail($to, $subject, $body);

echo json_encode(['success' => $mailSent]);



?>