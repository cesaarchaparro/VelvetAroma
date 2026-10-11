import React from 'react';
import { useForm, router, Link } from '@inertiajs/react';
import '../../../css/admin.css';

const CATEGORIAS = [
    { valor: 'mujer', etiqueta: 'Mujer' },
    { valor: 'hombre', etiqueta: 'Hombre' },
    { valor: 'unisex', etiqueta: 'Unisex' },
];

const formatearPrecio = (valor) =>
    valor > 0 ? `Gs. ${Number(valor).toLocaleString('es-PY')}` : 'Sin precio';

export default function Productos({ productos, flash, errors }) {
    const { data, setData, post, reset, progress } = useForm({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: 'unisex',
        destacado: false,
        imagen: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Enviar usando post de useForm (Inertia detecta el File y crea FormData internamente)
        post('/admin/productos', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                const fileInput = document.getElementById('imagen');
                if (fileInput) fileInput.value = '';
            },
        });
    };

    const handleDestacado = (id) => {
        router.patch(`/admin/productos/${id}/destacado`, {}, { preserveScroll: true });
    };

    const handleDelete = (id) => {
        if (confirm('¿Deseas eliminar este perfume?')) {
            router.delete(`/admin/productos/${id}`);
        }
    };

    return (
        <div className="container">
            <p>
                <Link href="/admin/mensajes">Ver mensajes de contacto →</Link>
                {' · '}
                <Link href="/logout" method="post" as="button" type="button">
                    Cerrar sesión
                </Link>
            </p>

            <h2>Cargar Nuevo Perfume</h2>

            {flash?.msg && <div className="alert alert-success">{flash.msg}</div>}
            {flash?.error && <div className="alert alert-error">{flash.error}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del Perfume:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={data.nombre}
                        onChange={(e) => setData('nombre', e.target.value)}
                        required
                    />
                    {errors?.nombre && <span className="error-msg">{errors.nombre}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        id="descripcion"
                        rows="4"
                        value={data.descripcion}
                        onChange={(e) => setData('descripcion', e.target.value)}
                        required
                    />
                    {errors?.descripcion && <span className="error-msg">{errors.descripcion}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="precio">Precio (Gs.):</label>
                    <input
                        type="number"
                        id="precio"
                        min="0"
                        step="1"
                        placeholder="650000"
                        value={data.precio}
                        onChange={(e) => setData('precio', e.target.value)}
                        required
                    />
                    {errors?.precio && <span className="error-msg">{errors.precio}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">Categoría:</label>
                    <select
                        id="categoria"
                        value={data.categoria}
                        onChange={(e) => setData('categoria', e.target.value)}
                        required
                    >
                        {CATEGORIAS.map((cat) => (
                            <option key={cat.valor} value={cat.valor}>
                                {cat.etiqueta}
                            </option>
                        ))}
                    </select>
                    {errors?.categoria && <span className="error-msg">{errors.categoria}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="destacado">
                        <input
                            type="checkbox"
                            id="destacado"
                            checked={data.destacado}
                            onChange={(e) => setData('destacado', e.target.checked)}
                            style={{ width: 'auto', marginRight: '8px' }}
                        />
                        Mostrar en "Fragancias destacadas"
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="imagen">Imagen del Perfume:</label>
                    <input
                        type="file"
                        id="imagen"
                        accept="image/*"
                        onChange={(e) => setData('imagen', e.target.files[0])}
                        required
                    />
                    {errors?.imagen && <span className="error-msg">{errors.imagen}</span>}
                </div>

                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}

                <button type="submit">Guardar Perfume</button>
            </form>

            <hr style={{ margin: '30px 0', border: 0, borderTop: '1px solid #eee' }} />

            <h2>Lista de Perfumes</h2>

            <table className="tabla-productos">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Destacado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {productos && productos.length > 0 ? (
                        productos.map((prod) => (
                            <tr key={prod.id}>
                                <td>
                                    <img
                                        src={`/storage/${prod.imagen}`}
                                        alt={prod.nombre}
                                        width="50"
                                        height="50"
                                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                </td>
                                <td>{prod.nombre}</td>
                                <td>{formatearPrecio(prod.precio)}</td>
                                <td style={{ textTransform: 'capitalize' }}>{prod.categoria}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleDestacado(prod.id)}
                                    >
                                        {prod.destacado ? '★ Quitar' : '☆ Destacar'}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn-delete"
                                        onClick={() => handleDelete(prod.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                No hay perfumes registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}