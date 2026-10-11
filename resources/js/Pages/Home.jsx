import React from "react";
import Paginacion from "../Components/Paginacion";
import Navegacion from "../Components/Navegacion";
import FormularioContacto from "../Components/FormularioContacto";
import Filtros from "../Components/Filtros";
import TarjetaProducto from "../Components/TarjetaProducto";
import Footer from "../Components/Footer";

export default function Home({ productos, filtros, destacados }) {
    const hayFiltros = Boolean(filtros?.buscar || filtros?.categoria);

    return (
        <>
            <header>
                <h1 className="titulo">
                    Velvet <span>Aroma</span>
                </h1>
            </header>

            <Navegacion />

            <section
                id="inicio"
                className="hero"
                style={{ "--hero-img": "url('/img/aquadigio.jpg')" }}
            >
                <div className="contenido-hero">
                    <h2 className="titulo">
                        Tu firma personal en un <span>Aroma</span>
                    </h2>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
                    </svg>

                    <p>Paraguay, Ciudad del Este</p>

                    <a className="boton" href="#contacto">
                        Contactar
                    </a>
                </div>
            </section>

            <main className="contenedor sombra">
                <h2>Mis Servicios</h2>

                <div className="servicios">
                    <section className="servicio">
                        <h3>Envíos a todo el país</h3>
                        <div className="iconos">
                            <svg
                                width="88px"
                                height="88px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                            >
                                <g id="ic-ecommerce-delivery">
                                    <path
                                        className="cls-1"
                                        d="M4.79,18H4a2,2,0,0,1-2-2V6.49a2,2,0,0,1,2-2h9.78a2,2,0,0,1,2,2V13.4"
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path
                                        className="cls-1"
                                        d="M15.75,8.19h2.78a1.18,1.18,0,0,1,.93.45l2.26,3a1.81,1.81,0,0,1,.36,1.07v5a.2.2,0,0,1-.2.2H18.83"
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <circle
                                        className="cls-1"
                                        cx="16.51"
                                        cy="17.82"
                                        r="2.24"
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></circle>
                                    <circle
                                        className="cls-1"
                                        cx="7.02"
                                        cy="17.82"
                                        r="2.24"
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></circle>
                                    <line
                                        className="cls-1"
                                        x1="14.28"
                                        y1="17.95"
                                        x2="9.15"
                                        y2="17.95"
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></line>
                                </g>
                            </svg>
                        </div>
                        <p>
                            Llevamos tu perfume hasta donde estés, en todo el
                            país. Cada pedido sale bien embalado para que
                            llegue en perfectas condiciones.
                        </p>
                    </section>

                    <section className="servicio">
                        <h3>Asesoría Personalizada</h3>
                        <div className="iconos">
                            <svg
                                width="88px"
                                height="88px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 10.5l-2.939 1.545.561-3.272-2.377-2.318 3.286-.478L18 14l1.47 2.977 3.285.478-2.377 2.318.56 3.272L18 21.5z"></path>
                            </svg>
                        </div>
                        <p>
                            ¿No sabés cuál elegir? Contanos qué aromas te
                            gustan y para qué ocasión lo buscás, y te ayudamos
                            a encontrar la fragancia que mejor va con vos.
                        </p>
                    </section>

                    <section className="servicio">
                        <h3>Garantía de Calidad</h3>
                        <div className="iconos">
                            <svg
                                height="82px"
                                width="82px"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                            >
                                <path d="M493.118,60.602c-40.138,17.719-93.777,20.322-143.881-0.447C324.872,50.055,273.523,25.223,255.999,0 c-17.521,25.223-68.871,50.055-93.236,60.154C112.657,80.924,59.021,78.32,18.88,60.602c-7.203-3.182-15.096,2.08-15.096,9.955 C3.784,493.475,255.999,512,255.999,512s252.217-18.525,252.217-441.443C508.216,62.682,500.323,57.42,493.118,60.602z M89.155,125.33c32.033,0,63.305-6.23,92.947-18.518c16.129-6.686,46.719-20.51,73.896-39.258 c27.178,18.748,57.77,32.572,73.898,39.258c29.647,12.289,60.918,18.52,92.949,18.518c11.256,0,22.45-0.801,33.428-2.367 C439.72,416.264,284.815,456.182,255.999,461.07c-28.814-4.889-183.72-44.807-200.273-338.108 C66.704,124.531,77.899,125.33,89.155,125.33z"></path>
                                <path d="M255.999,409.279c29.94-8.686,119.684-49.879,144.676-234.27c-30.955-2.328-61.182-9.543-90.117-21.539 c-12.354-5.121-32.789-14.211-54.559-26.502c-21.768,12.291-42.201,21.381-54.556,26.502 c-28.932,11.994-59.156,19.209-90.117,21.539C136.317,359.4,226.06,400.594,255.999,409.279z"></path>
                            </svg>
                        </div>
                        <p>
                            Seleccionamos cada fragancia con cuidado y revisamos
                            el producto antes de enviarlo. Si algo no llega
                            como esperabas, escribinos y lo resolvemos.
                        </p>
                    </section>
                </div>

                {/* Fragancias destacadas: solo si hay y no se está filtrando */}
                {!hayFiltros && destacados?.length > 0 && (
                    <section id="destacados" className="destacados">
                        <h2>Fragancias destacadas</h2>
                        <div className="productos">
                            {destacados.map((producto) => (
                                <TarjetaProducto
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))}
                        </div>
                    </section>
                )}

                <section id="perfumes" className="catalogo">
                    <h2>Nuestros Productos</h2>

                    <Filtros filtros={filtros} />

                    <div className="productos">
                        {productos?.data?.length > 0 ? (
                            productos.data.map((producto) => (
                                <TarjetaProducto
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))
                        ) : (
                            <p className="sin-resultados">
                                {hayFiltros
                                    ? "No encontramos perfumes con esos filtros."
                                    : "No hay productos disponibles por el momento."}
                            </p>
                        )}
                    </div>

                    <Paginacion links={productos?.links} />
                </section>

                <section id="nosotros" className="nosotros">
                    <div className="contenedor">
                        <h2>Nosotros</h2>

                        <p>
                            En Velvet Aroma creemos que cada perfume cuenta una
                            historia. Seleccionamos fragancias pensadas para
                            acompañar cada momento y expresar la personalidad de
                            quien las lleva.
                        </p>

                        <p>
                            Nuestra propuesta combina elegancia, calidad y una
                            experiencia simple para encontrar la fragancia
                            ideal.
                        </p>
                    </div>
                </section>

                <section id="contacto">
                    <h2>Contacto</h2>
                    <FormularioContacto />
                </section>
            </main>

            <Footer />
        </>
    );
}