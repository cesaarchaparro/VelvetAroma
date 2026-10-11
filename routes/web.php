<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\MensajeController;

// Vista principal (Catálogo de perfumes)
Route::get('/', [ProductoController::class, 'home'])->name('home');
Route::get('/carrito', function () {
    return Inertia::render('Carrito');
})->name('carrito');
Route::get('/perfumes/{producto}', [ProductoController::class, 'show'])->name('productos.show');

Route::post('/contacto', [MensajeController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('contacto.store');

// Panel Administrativo de Productos
Route::get('/admin/productos', [ProductoController::class, 'index'])->name('productos.index');
Route::post('/admin/productos', [ProductoController::class, 'store'])->name('productos.store');
Route::delete('/admin/productos/{id}', [ProductoController::class, 'destroy'])->name('productos.destroy');

// Dashboard y Perfil de Usuario
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/admin/mensajes', [MensajeController::class, 'index'])->name('mensajes.index');
    Route::delete('/admin/mensajes/{mensaje}', [MensajeController::class, 'destroy'])->name('mensajes.destroy');
    Route::get('/admin/productos', [ProductoController::class, 'index'])->name('productos.index');
    Route::post('/admin/productos', [ProductoController::class, 'store'])->name('productos.store');
    Route::delete('/admin/productos/{id}', [ProductoController::class, 'destroy'])->name('productos.destroy');
    Route::patch('/admin/productos/{id}/destacado', [ProductoController::class, 'destacar'])->name('productos.destacar');
});

require __DIR__.'/auth.php';