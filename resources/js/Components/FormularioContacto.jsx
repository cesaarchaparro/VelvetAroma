import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function FormularioContacto() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        telefono: "",
        email: "",
        mensaje: "",
    });
    const [enviado, setEnviado] = useState(false);

    function enviar(e) {
        e.preventDefault();
        setEnviado(false);

        post("/contacto", {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEnviado(true);
            },
        });
    }

    return (
        <form className="formulario" onSubmit={enviar} noValidate>
            <fieldset>
                <legend>Contactanos llenando los campos</legend>

                {enviado && (
                    <p className="aviso-ok" role="status">
                        ¡Gracias! Recibimos tu mensaje y te responderemos
                        pronto.
                    </p>
                )}

                <div className="contenedor-campos">
                    <div className="campo">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            className="input-text"
                            type="text"
                            placeholder="Tu nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            aria-invalid={errors.nombre ? "true" : undefined}
                        />
                        {errors.nombre && (
                            <p className="error-campo">{errors.nombre}</p>
                        )}
                    </div>

                    <div className="campo">
                        <label htmlFor="telefono">Teléfono (opcional)</label>
                        <input
                            id="telefono"
                            className="input-text"
                            type="tel"
                            placeholder="Tu teléfono"
                            value={data.telefono}
                            onChange={(e) =>
                                setData("telefono", e.target.value)
                            }
                            aria-invalid={errors.telefono ? "true" : undefined}
                        />
                        {errors.telefono && (
                            <p className="error-campo">{errors.telefono}</p>
                        )}
                    </div>

                    <div className="campo">
                        <label htmlFor="email">Correo</label>
                        <input
                            id="email"
                            className="input-text"
                            type="email"
                            placeholder="Tu email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            aria-invalid={errors.email ? "true" : undefined}
                        />
                        {errors.email && (
                            <p className="error-campo">{errors.email}</p>
                        )}
                    </div>

                    <div className="campo">
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea
                            id="mensaje"
                            className="input-text"
                            value={data.mensaje}
                            onChange={(e) => setData("mensaje", e.target.value)}
                            aria-invalid={errors.mensaje ? "true" : undefined}
                        ></textarea>
                        {errors.mensaje && (
                            <p className="error-campo">{errors.mensaje}</p>
                        )}
                    </div>
                </div>

                <div className="alinear-derecha flex">
                    <button
                        type="submit"
                        className="boton w-sm-100"
                        disabled={processing}
                    >
                        {processing ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </fieldset>
        </form>
    );
}