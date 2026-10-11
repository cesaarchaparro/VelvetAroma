import React from "react";
import { Head, useForm } from "@inertiajs/react";
import LayoutAuth from "../../Components/LayoutAuth";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    function enviar(e) {
        e.preventDefault();
        post("/reset-password", {
            onFinish: () => reset("password", "password_confirmation"),
        });
    }

    return (
        <LayoutAuth titulo="Crear contraseña nueva">
            <Head title="Contraseña nueva | Velvet Aroma" />

            <form className="formulario" onSubmit={enviar} noValidate>
                <div className="contenedor-campos auth-campos">
                    <div className="campo">
                        <label htmlFor="email">Correo</label>
                        <input
                            id="email"
                            className="input-text"
                            type="email"
                            autoComplete="username"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            aria-invalid={errors.email ? "true" : undefined}
                        />
                        {errors.email && (
                            <p className="error-campo">{errors.email}</p>
                        )}
                    </div>

                    <div className="campo">
                        <label htmlFor="password">Contraseña nueva</label>
                        <input
                            id="password"
                            className="input-text"
                            type="password"
                            autoComplete="new-password"
                            autoFocus
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            aria-invalid={errors.password ? "true" : undefined}
                        />
                        {errors.password && (
                            <p className="error-campo">{errors.password}</p>
                        )}
                    </div>

                    <div className="campo">
                        <label htmlFor="password_confirmation">
                            Repite la contraseña
                        </label>
                        <input
                            id="password_confirmation"
                            className="input-text"
                            type="password"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className="auth-acciones">
                    <button
                        type="submit"
                        className="boton"
                        disabled={processing}
                    >
                        {processing ? "Guardando..." : "Guardar contraseña"}
                    </button>
                </div>
            </form>
        </LayoutAuth>
    );
}