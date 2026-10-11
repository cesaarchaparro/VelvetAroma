import React from "react";
import Footer from "./Footer";

export default function LayoutAuth({ titulo, children }) {
    return (
        <>
            <header>
                <h1 className="titulo">
                    <a href="/">
                        Velvet <span>Aroma</span>
                    </a>
                </h1>
            </header>

            <main className="contenedor auth">
                <div className="auth-caja">
                    <h2>{titulo}</h2>
                    {children}
                    <p className="auth-volver">
                        <a href="/">← Volver al sitio</a>
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}