<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;

class MensajeController extends Controller
{
    public function store(Request $request)
    {
        $datos = $request->validate([
            'nombre' => 'required|string|max:100',
            'telefono' => 'nullable|string|max:30',
            'email' => 'required|email|max:150',
            'mensaje' => 'required|string|max:2000',
        ], [
            'nombre.required' => 'Escribe tu nombre.',
            'email.required' => 'Escribe tu correo.',
            'email.email' => 'Ese correo no parece válido.',
            'mensaje.required' => 'Escribe tu mensaje.',
            'mensaje.max' => 'El mensaje es muy largo (máximo 2000 caracteres).',
        ]);

        Mensaje::create($datos);

        return back();
    }
    
    public function index()
{
    return inertia('Admin/Mensajes', [
        'mensajes' => Mensaje::orderBy('id', 'desc')->paginate(15),
    ]);
}

public function destroy(Mensaje $mensaje)
{
    $mensaje->delete();

    return back()->with('msg', 'Mensaje eliminado.');
}
}