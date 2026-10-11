import React, { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";

const CATEGORIAS = [
    { valor: "", etiqueta: "Todos" },
    { valor: "mujer", etiqueta: "Mujer" },
    { valor: "hombre", etiqueta: "Hombre" },
    { valor: "unisex", etiqueta: "Unisex" },
];

export default function Filtros({ filtros }) {
    const [buscar, setBuscar] = useState(filtros?.buscar ?? "");
    const categoria = filtros?.categoria ?? "";
    const primeraVez = useRef(true);

    function visitar(texto, cat) {
        // Solo se envían los filtros que tienen valor
        const params = {};
        if (texto.trim() !== "") params.buscar = texto.trim();
        if (cat !== "") params.categoria = cat;

        router.get("/", params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ["productos", "filtros"],
        });
    }

    // Busca solo, 350 ms después de que dejas de escribir
    useEffect(() => {
        if (primeraVez.current) {
            primeraVez.current = false;
            return;
        }
        const espera = setTimeout(() => visitar(buscar, categoria), 350);
        return () => clearTimeout(espera);
    }, [buscar]);

    return (
        <div className="filtros">
            <form
                role="search"
                className="buscador"
                onSubmit={(e) => {
                    e.preventDefault();
                    visitar(buscar, categoria);
                }}
            >
                <input
                    type="search"
                    className="input-text"
                    placeholder="Buscar perfume..."
                    aria-label="Buscar perfume por nombre"
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                />
            </form>

            <div
                className="filtros-categorias"
                role="group"
                aria-label="Filtrar por categoría"
            >
                {CATEGORIAS.map((cat) => (
                    <button
                        key={cat.valor}
                        type="button"
                        className={`filtro${categoria === cat.valor ? " activo" : ""}`}
                        aria-pressed={categoria === cat.valor}
                        onClick={() => visitar(buscar, cat.valor)}
                    >
                        {cat.etiqueta}
                    </button>
                ))}
            </div>
        </div>
    );
}