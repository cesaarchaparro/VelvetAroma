<?php

use Illuminate\Support\Facades\Mail;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

Mail::raw('Prueba de correo desde Velvet Aroma', function ($message) {
    $message->to('test@ejemplo.com')->subject('Prueba Velvet Aroma');
});

echo "¡Correo enviado a la cola de Mailpit!\n";