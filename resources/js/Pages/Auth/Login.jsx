import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import LayoutAuth from "../../Components/LayoutAuth";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function enviar(e) {
        e.preventDefault();
        post("/login", {
            onFinish: () => reset("password"),
        });
    }

    return (
        <LayoutAuth titulo="Acceso del administrador">
            <Head title="Ingresar | Velvet Aroma" />

            {status && (
                <p className="aviso-ok" role="status">
                    Tu contraseña se actualizó. Ya puedes iniciar sesión.
                </p>
            )}

            <form className="formulario" onSubmit={enviar} noValidate>
                <div className="contenedor-campos auth-campos">
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

                    <div className="campo">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            className="input-text"
                            type="password"
                            autoComplete="current-password"
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
                </div>

                <label className="auth-recordar">
                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                    />{" "}
                    Mantener la sesión iniciada
                </label>

                <div className="auth-acciones">
                    {canResetPassword && (
                        <Link href="/forgot-password" className="auth-enlace">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                    <button
                        type="submit"
                        className="boton"
                        disabled={processing}
                    >
                        {processing ? "Ingresando..." : "Ingresar"}
                    </button>
                </div>
            </form>
        </LayoutAuth>
    );
}