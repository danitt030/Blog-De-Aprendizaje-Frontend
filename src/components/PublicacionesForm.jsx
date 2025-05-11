import React from "react";
import { useNavigate } from "react-router-dom";

export const PublicacionesForm = ({ publicaciones }) => {
    const navigate = useNavigate();

    if (!Array.isArray(publicaciones)) {
        return <p style={{ color: "red" }}>Error: Las publicaciones no son válidas.</p>;
    }

    return (
        <div className="publicaciones-grid">
            {publicaciones.map((pub) => (
                <div
                    key={pub._id}
                    className="publicacion-card"
                    onClick={() => navigate(`/publicacion/${pub._id}`)} // Navega a la página de detalles
                    style={{ cursor: "pointer" }}
                >
                    <h3 className="publicacion-title">{pub.tituloPublicacion}</h3>
                    <p className="publicacion-content">{pub.descripcionPublicacion}</p>
                    <p><strong>Curso:</strong> {pub.cursoPublicacion}</p>
                    <p><strong>Fecha:</strong> {new Date(pub.fechaPublicacion).toLocaleDateString()}</p>
                    <strong>Comentarios:</strong>
                    <ul>
                        {(Array.isArray(pub.comentarios) ? pub.comentarios : []).map((comentario, index) => (
                            <li key={comentario._id || index}>
                                <strong>{comentario.usuario}:</strong> {comentario.contenidoComentario}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};