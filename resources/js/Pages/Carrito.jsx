import React from "react";
import { Head } from "@inertiajs/react";
import Navegacion from "../Components/Navegacion";
import Footer from "../Components/Footer";
import { useCarrito, formatearPrecio } from "../carrito";

// Tu número de WhatsApp con código de país, sin "+" ni espacios (Paraguay = 595)
const WHATSAPP = "595971345662";

export default function Carrito() {
    const { items, total, cambiarCantidad, quitar, vaciar } = useCarrito();

    const hayPrecioPendiente = items.some((i) => i.precio <= 0);

    const mensaje = encodeURIComponent(
        "Hola Velvet Aroma, quiero hacer este pedido:\n\n" +
            items
                .map(
                    (i) =>
                        `• ${i.cantidad} x ${i.nombre} - ${formatearPrecio(i.precio * i.cantidad)}`
                )
                .join("\n") +
            `\n\nTotal: ${formatearPrecio(total)}`
    );

    return (
        <>
            <Head title="Carrito | Velvet Aroma" />

            <header>
                <h1 className="titulo">
                    <a href="/">
                        Velvet <span>Aroma</span>
                    </a>
                </h1>
            </header>

            <Navegacion />

            <main className="contenedor">
                <h2>Tu carrito</h2>

                {items.length === 0 ? (
                    <div className="carrito-vacio">
                        <p>Todavía no agregaste ningún perfume.</p>
                        <a href="/#perfumes" className="boton">
                            Ver perfumes
                        </a>
                    </div>
                ) : (
                    <>
                        <ul className="carrito-lista">
                            {items.map((item) => (
                                <li key={item.id} className="carrito-item">
                                    <img
                                        src={`/storage/${item.imagen}`}
                                        alt={item.nombre}
                                    />

                                    <div>
                                        <h3>{item.nombre}</h3>
                                        <p className="precio-unitario">
                                            {formatearPrecio(item.precio)}
                                        </p>

                                        <div className="cantidad">
                                            <button
                                                type="button"
                                                aria-label="Restar uno"
                                                onClick={() =>
                                                    cambiarCantidad(
                                                        item.id,
                                                        item.cantidad - 1
                                                    )
                                                }
                                            >
                                                −
                                            </button>
                                            <span>{item.cantidad}</span>
                                            <button
                                                type="button"
                                                aria-label="Sumar uno"
                                                onClick={() =>
                                                    cambiarCantidad(
                                                        item.id,
                                                        item.cantidad + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="quitar"
                                            onClick={() => quitar(item.id)}
                                        >
                                            Quitar
                                        </button>
                                    </div>

                                    <p className="subtotal">
                                        {formatearPrecio(
                                            item.precio * item.cantidad
                                        )}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <div className="carrito-resumen">
                            <span>Total</span>
                            <span>{formatearPrecio(total)}</span>
                        </div>

                        {hayPrecioPendiente && (
                            <p className="carrito-nota">
                                Algunos productos no tienen precio cargado. Te
                                lo confirmamos al responder tu pedido.
                            </p>
                        )}

                        <div className="carrito-acciones">
                            <button
                                type="button"
                                className="boton boton-borde"
                                onClick={vaciar}
                            >
                                Vaciar carrito
                            </button>
                            <a
                                className="boton"
                                href={`https://wa.me/${WHATSAPP}?text=${mensaje}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Pedir por WhatsApp
                            </a>
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </>
    );
}