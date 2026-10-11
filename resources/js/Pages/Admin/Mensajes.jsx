import React from 'react';
import { Link, router } from '@inertiajs/react';
import Paginacion from '../../Components/Paginacion';
import '../../../css/admin.css';

const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleString('es-PY', {
        dateStyle: 'short',
        timeStyle: 'short',
    });

export default function Mensajes({ mensajes, flash }) {
    const lista = mensajes?.data ?? [];

    const handleDelete = (id) => {
        if (confirm('¿Deseas eliminar este mensaje?')) {
            router.delete(`/admin/mensajes/${id}`, { preserveScroll: true });
        }
    };

    return (
        <div className="container">
            <p>
                <Link href="/admin/productos">← Volver a productos</Link>
                {' · '}
                <Link href="/logout" method="post" as="button" type="button">
                    Cerrar sesión
                </Link>
            </p>

            <h2>Mensajes de contacto</h2>

            {flash?.msg && <div className="alert alert-success">{flash.msg}</div>}
            {flash?.error && <div className="alert alert-error">{flash.error}</div>}

            <table className="tabla-productos">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Contacto</th>
                        <th>Mensaje</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.length > 0 ? (
                        lista.map((m) => (
                            <tr key={m.id}>
                                <td>{formatearFecha(m.created_at)}</td>
                                <td>
                                    <strong>{m.nombre}</strong>
                                    <br />
                                    <a href={`mailto:${m.email}`}>{m.email}</a>
                                    {m.telefono && (
                                        <>
                                            <br />
                                            <a href={`tel:${m.telefono}`}>{m.telefono}</a>
                                        </>
                                    )}
                                </td>
                                <td style={{ whiteSpace: 'pre-wrap' }}>{m.mensaje}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn-delete"
                                        onClick={() => handleDelete(m.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Todavía no hay mensajes.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Paginacion links={mensajes?.links} />
        </div>
    );
}