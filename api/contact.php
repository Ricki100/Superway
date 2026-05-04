<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$service = trim($data['service'] ?? '');
$message = trim($data['message'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name, email, and message are required']);
    exit;
}

$to = 'info@superwaygroup.online';
$subject = 'New Contact Form Submission - ' . ($service ?: 'General Inquiry');

$body = '<html><body>';
$body .= '<h2>New Contact Form Submission</h2>';
$body .= '<p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>';
$body .= '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>';
$body .= '<p><strong>Phone:</strong> ' . htmlspecialchars($phone ?: 'Not provided') . '</p>';
$body .= '<p><strong>Service:</strong> ' . htmlspecialchars($service ?: 'Not specified') . '</p>';
$body .= '<p><strong>Message:</strong><br>' . nl2br(htmlspecialchars($message)) . '</p>';
$body .= '<hr><p><em>Sent from Superway Group website contact form</em></p>';
$body .= '</body></html>';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Superway Website <noreply@superwaygroup.online>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later.']);
}
?>