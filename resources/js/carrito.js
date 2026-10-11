import { useSyncExternalStore } from "react";

const CLAVE = "velvet-aroma-carrito";

function leer() {
    try {
        const datos = JSON.parse(localStorage.getItem(CLAVE));
        return Array.isArray(datos) ? datos : [];
    } catch {
        return [];
    }
}

let items = leer();
const oyentes = new Set();

function avisar() {
    oyentes.forEach((fn) => fn());
}

function guardar(nuevos) {
    items = nuevos;
    try {
        localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
        /* si el navegador bloquea el almacenamiento, el carrito sigue en memoria */
    }
    avisar();
}

// Mantiene sincronizadas varias pestañas abiertas
window.addEventListener("storage", (e) => {
    if (e.key === CLAVE) {
        items = leer();
        avisar();
    }
});

function suscribir(fn) {
    oyentes.add(fn);
    return () => oyentes.delete(fn);
}

export function agregar(producto) {
    const existe = items.find((i) => i.id === producto.id);

    if (existe) {
        guardar(
            items.map((i) =>
                i.id === producto.id
                    ? { ...i, cantidad: Math.min(i.cantidad + 1, 99) }
                    : i
            )
        );
        return;
    }

    guardar([
        ...items,
        {
            id: producto.id,
            nombre: producto.nombre,
            precio: Number(producto.precio) || 0,
            imagen: producto.imagen,
            cantidad: 1,
        },
    ]);
}

export function quitar(id) {
    guardar(items.filter((i) => i.id !== id));
}

export function cambiarCantidad(id, cantidad) {
    if (cantidad < 1) {
        quitar(id);
        return;
    }
    guardar(
        items.map((i) =>
            i.id === id ? { ...i, cantidad: Math.min(cantidad, 99) } : i
        )
    );
}

export function vaciar() {
    guardar([]);
}

export function formatearPrecio(valor) {
    return valor > 0
        ? `Gs. ${Number(valor).toLocaleString("es-PY")}`
        : "Consultar precio";
}

export function useCarrito() {
    const lista = useSyncExternalStore(suscribir, () => items);

    return {
        items: lista,
        cantidad: lista.reduce((suma, i) => suma + i.cantidad, 0),
        total: lista.reduce((suma, i) => suma + i.precio * i.cantidad, 0),
        agregar,
        quitar,
        cambiarCantidad,
        vaciar,
    };
}