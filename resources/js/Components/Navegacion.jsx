import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { useCarrito } from "../carrito";

export default function Navegacion() {
    const [abierto, setAbierto] = useState(false);
    const { cantidad } = useCarrito();
    const usuario = usePage().props.auth?.user;
    const cerrar = () => setAbierto(false);

    return (
        <div className="nav-bg">
            <nav
                className="navegacion-principal contenedor"
                aria-label="Principal"
            >
                <button
                    type="button"
                    className="menu-boton"
                    aria-expanded={abierto}
                    aria-controls="menu-enlaces"
                    onClick={() => setAbierto(!abierto)}
                >
                    {abierto ? "Cerrar" : "Menú"}
                    {!abierto && cantidad > 0 && ` (${cantidad})`}
                </button>

                <div
                    id="menu-enlaces"
                    className={`menu-enlaces${abierto ? " abierto" : ""}`}
                >
                    <a href="/#inicio" onClick={cerrar}>Inicio</a>
                    <a href="/#perfumes" onClick={cerrar}>Perfumes</a>
                    <a href="/#nosotros" onClick={cerrar}>Nosotros</a>
                    <a href="/#contacto" onClick={cerrar}>Contacto</a>
                    <a href="/carrito" onClick={cerrar}>
                        Carrito
                        {cantidad > 0 && (
                            <span className="contador">{cantidad}</span>
                        )}
                    </a>
                    {usuario ? (
                        <a href="/admin/productos" className="enlace-admin" onClick={cerrar}>
                            Panel
                        </a>
                    ) : (
                        <a href="/login" className="enlace-admin" onClick={cerrar}>
                            Ingresar
                        </a>
                    )}
                </div>
            </nav>
        </div>
    );
}