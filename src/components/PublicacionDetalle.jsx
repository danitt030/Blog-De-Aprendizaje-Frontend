import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePublicacionesID } from "../shared/hooks/usePublicacionesID";
import { agregarComentario } from "../services/api.jsx";
import "../pages/publicacion/PublicacionPage.css";

export const PublicacionDetalle = () => {
    const { id } = useParams();
    const { publicacion, comentarios, cargando, error, setComentarios } = usePublicacionesID(id);
    const [comentario, setComentario] = useState({ usuario: "", contenidoComentario: "" });
    const [formError, setFormError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comentario.usuario.trim() || !comentario.contenidoComentario.trim()) {
            setFormError("Por favor, completa todos los campos.");
            return;
        }
        setFormError("");

        try {
            const nuevoComentario = await agregarComentario({
                publicacionId: id,
                ...comentario,
            });

            const comentarioParaLista = {
                _id: nuevoComentario._id,
                usuario: nuevoComentario.usuario,
                contenidoComentario: nuevoComentario.contenidoComentario,
            };

            if (typeof setComentarios === "function") {
                setComentarios((prevComentarios) => [...prevComentarios, comentarioParaLista]);
            }

            setComentario({ usuario: "", contenidoComentario: "" });
        } catch (error) {
            setFormError("Error al agregar el comentario.");
            console.error("Error al agregar el comentario:", error);
        }
    };

    if (cargando) return <p>Cargando publicación...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    if (!publicacion) return <p style={{ textAlign: "center" }}>No se encontró la publicación.</p>;

    return (
        <div className="publicacion-detalle">
            <div className="publicacion-card detalle-publicacion-card">
                <h2>{publicacion.tituloPublicacion}</h2>
                <p>{publicacion.descripcionPublicacion}</p>
                <div className="detalle-info">
                    <p><strong>Curso:</strong> {publicacion.cursoPublicacion}</p>
                    <p><strong>Fecha:</strong> {new Date(publicacion.fechaPublicacion).toLocaleDateString()}</p>
                    <p><strong>Comentarios:</strong></p>
                </div>
            </div>
            <div className="comentarios-grid">
                {comentarios.map((comentario) => (
                    <div className="comentario-card" key={comentario._id || Math.random()}>
                        <div className="comentario-usuario">{comentario.usuario}</div>
                        {comentario.createdAt && (
                            <div className="comentario-fecha">
                                Fecha: {new Date(comentario.createdAt).toLocaleString()}
                            </div>
                        )}
                        <div>{comentario.contenidoComentario}</div>
                    </div>
                ))}
            </div>
            <div className="comentario-form-card">
                <form className="comentario-form" onSubmit={handleSubmit}>
                    <label>
                        Usuario
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            value={comentario.usuario}
                            onChange={(e) => setComentario({ ...comentario, usuario: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        ¿Que Quieres Comentar?
                        <input
                            type="text"
                            placeholder="Tu comentario"
                            value={comentario.contenidoComentario}
                            onChange={(e) => setComentario({ ...comentario, contenidoComentario: e.target.value })}
                            required
                        />
                    </label>
                    <button type="submit">Agregar Comentario</button>
                    {formError && <span className="error">{formError}</span>}
                </form>
            </div>
        </div>
    );
};