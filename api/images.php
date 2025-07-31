<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$imagesDir = '../images/';
$images = [];

if (is_dir($imagesDir)) {
    $files = scandir($imagesDir);
    
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'])) {
                $images[] = $file;
            }
        }
    }
    
    echo json_encode([
        'success' => true,
        'images' => $images,
        'count' => count($images)
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Images directory not found',
        'images' => [],
        'count' => 0
    ]);
}
?> 