import React from "react";
import { Head, useForm } from "@inertiajs/react";
import LayoutAuth from "../../Components/LayoutAuth";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    function enviar(e) {
        e.preventDefault();
        post("/forgot-password");
    }

    return (
        <LayoutAuth titulo="Recuperar contraseña">
            <Head title="Recuperar contraseña | Velvet Aroma" />

            <p className="auth-texto">
                Escribe el correo de tu cuenta y te enviaremos un enlace para
                crear una contraseña nueva.
            </p>

            {status && (
                <p className="aviso-ok" role="status">
                    Si ese correo tiene una cuenta, te enviamos un enlace para
                    crear una contraseña nueva. Revisa también la carpeta de
                    spam.
                </p>
            )}

            <form className="formulario" onSubmit={enviar} noValidate>
                <div className="campo">
                    <label htmlFor="email">Correo</label>
                    <input
                        id="email"
                        className="input-text"
                        type="email"
                        autoComplete="username"
                        autoFocus
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        aria-invalid={errors.email ? "true" : undefined}
                    />
                    {errors.email && (
                        <p className="error-campo">{errors.email}</p>
                    )}
                </div>

                <div className="auth-acciones">
                    <a href="/login" className="auth-enlace">
                        Volver a ingresar
                    </a>
                    <button
                        type="submit"
                        className="boton"
                        disabled={processing}
                    >
                        {processing ? "Enviando..." : "Enviar enlace"}
                    </button>
                </div>
            </form>
        </LayoutAuth>
    );
}