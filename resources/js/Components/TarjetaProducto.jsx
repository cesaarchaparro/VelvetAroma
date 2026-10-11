import React from "react";
import { Link } from "@inertiajs/react";
import BotonAgregar from "./BotonAgregar";
import { formatearPrecio } from "../carrito";

export default function TarjetaProducto({ producto }) {
    return (
        <div className="producto">
            <img
                src={`/storage/${producto.imagen}`}
                alt={producto.nombre}
            />

            <h3>{producto.nombre}</h3>

            <p className="precio">{formatearPrecio(producto.precio)}</p>

            <p>{producto.descripcion}</p>

            <div className="acciones">
                <Link href={`/perfumes/${producto.id}`} className="boton">
                    Ver producto
                </Link>
                <BotonAgregar
                    producto={producto}
                    className="boton boton-lleno"
                />
            </div>
        </div>
    );
}