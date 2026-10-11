import React from "react";

// Cambia estas direcciones por las de tus perfiles reales
const REDES = [
    { nombre: "Instagram", url: "https://www.instagram.com/" },
    { nombre: "Facebook", url: "https://www.facebook.com/" },
];

const ENLACES = [
    { nombre: "Inicio", url: "/#inicio" },
    { nombre: "Perfumes", url: "/#perfumes" },
    { nombre: "Nosotros", url: "/#nosotros" },
    { nombre: "Contacto", url: "/#contacto" },
    { nombre: "Carrito", url: "/carrito" },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-contenido contenedor">
                <div>
                    <p className="footer-nombre">
                        Velvet <span>Aroma</span>
                    </p>
                    <p>Tu firma personal en un aroma.</p>
                    <p>Ciudad del Este, Paraguay</p>
                </div>

                <nav aria-label="Pie de página">
                    <p className="footer-titulo">Navegación</p>
                    <ul>
                        {ENLACES.map((enlace) => (
                            <li key={enlace.nombre}>
                                <a href={enlace.url}>{enlace.nombre}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <p className="footer-titulo">Seguinos</p>
                    <ul>
                        {REDES.map((red) => (
                            <li key={red.nombre}>
                                <a
                                    href={red.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {red.nombre}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="footer-legal contenedor">
                © {new Date().getFullYear()} Velvet Aroma. Todos los derechos
                reservados.
            </p>
        </footer>
    );
}