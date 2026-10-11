import React from "react";
import { Head } from "@inertiajs/react";
import Navegacion from "../../Components/Navegacion";
import BotonAgregar from "../../Components/BotonAgregar";
import Footer from "../../Components/Footer";
import { formatearPrecio } from "../../carrito";

export default function Show({ producto }) {
    return (
        <>
            <Head title={`${producto.nombre} | Velvet Aroma`} />

            <header>
                <h1 className="titulo">
                    <a href="/">
                        Velvet <span>Aroma</span>
                    </a>
                </h1>
            </header>

            <Navegacion />

            <main className="contenedor">
                <a href="/#perfumes" className="volver">
                    ← Volver al catálogo
                </a>

                <div className="detalle">
                    <img
                        src={`/storage/${producto.imagen}`}
                        alt={producto.nombre}
                    />

                    <div className="detalle-info">
                        <h2>{producto.nombre}</h2>
                        <p className="precio-detalle">
                            {formatearPrecio(producto.precio)}
                        </p>
                        <p>{producto.descripcion}</p>
                        <BotonAgregar producto={producto} />
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}