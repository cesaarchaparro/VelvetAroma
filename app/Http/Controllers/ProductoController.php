<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    public function home(Request $request)
    {
        $buscar = trim((string) $request->query('buscar', ''));
        $categoria = $request->query('categoria');

        $productos = Producto::query()
            ->when($buscar !== '', fn($q) => $q->where('nombre', 'like', "%{$buscar}%"))
            ->when(
                in_array($categoria, ['mujer', 'hombre', 'unisex'], true),
                fn($q) => $q->where('categoria', $categoria)
            )
            ->orderBy('id', 'desc')
            ->paginate(8)
            ->withQueryString();

        return inertia('Home', [
            'productos' => $productos,
            'filtros' => [
                'buscar' => $buscar,
                'categoria' => $categoria ?? '',
            ],
            'destacados' => Producto::where('destacado', true)
                ->orderBy('id', 'desc')
                ->take(4)
                ->get(),
        ]);
    }

    public function show(Producto $producto)
    {
        return inertia('Producto/Show', [
            'producto' => $producto
        ]);
    }

    public function index()
    {
        $productos = Producto::orderBy('id', 'desc')->get();
        return inertia('Admin/Productos', [
            'productos' => $productos
        ]);
    }

    public function destacar($id)
    {
        $producto = Producto::findOrFail($id);
        $producto->update(['destacado' => ! $producto->destacado]);

        return back()->with(
            'msg',
            $producto->destacado
                ? 'Perfume agregado a destacados.'
                : 'Perfume quitado de destacados.'
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|integer|min:0',
            'categoria' => 'required|in:mujer,hombre,unisex',
            'imagen' => 'required|file|image|max:5120',
            'destacado' => 'nullable|boolean',
        ]);

        $file = $request->file('imagen');

        // Validación estricta para asegurar que PHP escribió el archivo en el disco temporal
        if ($file && $file->isValid() && $file->getPathname() !== '') {
            $path = $file->store('productos', 'public');

            Producto::create([
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
                'precio' => $request->precio,
                'categoria' => $request->categoria,
                'imagen' => $path,
                'destacado' => $request->boolean('destacado'),
            ]);

            return back()->with('msg', '¡Perfume cargado exitosamente!');
        }

        return back()->with('error', 'El servidor PHP no pudo procesar el archivo temporal.');
    }

    public function destroy($id)
    {
        $producto = Producto::findOrFail($id);

        if ($producto->imagen && Storage::disk('public')->exists($producto->imagen)) {
            Storage::disk('public')->delete($producto->imagen);
        }

        $producto->delete();

        return back()->with('msg', '¡Producto eliminado correctamente!');
    }
}
