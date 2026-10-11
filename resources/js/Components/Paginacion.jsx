import { Link } from "@inertiajs/react";

export default function Paginacion({ links }) {
    return (
        <div className="paginacion">
            {links?.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || "#"}
                    className={`paginacion-link ${
                        link.active ? "activo" : ""
                    } ${!link.url ? "deshabilitado" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}