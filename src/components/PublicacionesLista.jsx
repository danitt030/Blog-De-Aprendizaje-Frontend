import React from "react";
import { usePublicaciones } from "../shared/hooks";
import { PublicacionesForm } from "./PublicacionesForm.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../services/api.jsx";
import "../pages/publicacion/PublicacionPage.css";

export const PublicacionesLista = () => {
    const { publicaciones, cargando } = usePublicaciones();

    if (cargando) return <p style={{ color: "white", textAlign: "center" }}>Cargando publicaciones...</p>;

    return (
        <div className="publicaciones-container">
            <h2 className="publicaciones-title">Lista de Publicaciones</h2>
            <PublicacionesForm publicaciones={publicaciones} />
        </div>
    );
};

export const PublicacionDetalle = () => {
    const { id } = useParams();
    const [publicacion, setPublicacion] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState({ usuario: "", contenidoComentario: "" });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicacion = async () => {
            try {
                const res = await API.get(`/publicacion/${id}`);
                const publicacionData = res.data.publicacion;

                setPublicacion(publicacionData);
                setComentarios(publicacionData.comentarios);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError("La publicación no fue encontrada.");
                } else {
                    setError("Ocurrió un error al cargar la publicación.");
                }
            }
        };
        fetchPublicacion();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post(`/comentarios/agregarComentario`, {
                publicacionId: id,
                ...comentario,
            });
            alert("Comentario agregado con éxito");
            setComentario({ usuario: "", contenidoComentario: "" });

            const res = await API.get(`/publicacion/${id}`);
            setComentarios(res.data.publicacion.comentarios);
        } catch (error) {
            console.error("Error al agregar el comentario:", error);
        }
    };

    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    if (!publicacion) return <p>Cargando publicación...</p>;

    return (
        <div className="publicacion-detalle">
            <h2>{publicacion.tituloPublicacion}</h2>
            <p>{publicacion.descripcionPublicacion}</p>
            <p><strong>Curso:</strong> {publicacion.cursoPublicacion}</p>
            <p><strong>Fecha:</strong> {new Date(publicacion.fechaPublicacion).toLocaleDateString()}</p>
            <h3>Comentarios:</h3>
            <ul>
                {comentarios.map((comentario) => (
                    <li key={comentario._id}>
                        <strong>{comentario.usuario}:</strong> {comentario.contenidoComentario}
                    </li>
                ))}
            </ul>
            <form className="comentario-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={comentario.usuario}
                    onChange={(e) => setComentario({ ...comentario, usuario: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Tu comentario"
                    value={comentario.contenidoComentario}
                    onChange={(e) => setComentario({ ...comentario, contenidoComentario: e.target.value })}
                    required
                />
                <button type="submit">Agregar Comentario</button>
            </form>
        </div>
    );
};
