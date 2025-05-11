import React from "react";
import { useFiltroPublicaciones } from "../shared/hooks/useFiltroPublicaciones";
import { PublicacionesForm } from "./PublicacionesForm.jsx";
import "../pages/publicacion/PublicacionPage.css";

export const PublicacionesLista = () => {
    const { publicaciones, cargando } = useFiltroPublicaciones();

    return (
        <div className="publicaciones-container">
            <h2 className="publicaciones-title">Lista de Publicaciones</h2>
            {cargando ? (
                <p style={{ color: "white", textAlign: "center" }}>Cargando publicaciones...</p>
            ) : (
                <PublicacionesForm publicaciones={publicaciones} />
            )}
        </div>
    );
};