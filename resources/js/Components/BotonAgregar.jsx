import React, { useState } from "react";
import { agregar } from "../carrito";

export default function BotonAgregar({ producto, className = "boton" }) {
    const [agregado, setAgregado] = useState(false);

    function manejarClick() {
        agregar(producto);
        setAgregado(true);
        setTimeout(() => setAgregado(false), 1500);
    }

    return (
        <button type="button" className={className} onClick={manejarClick}>
            {agregado ? "Agregado ✓" : "Agregar al carrito"}
        </button>
    );
}