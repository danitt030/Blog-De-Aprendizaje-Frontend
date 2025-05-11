import { useEffect, useState } from "react";
import { listarPublicacionPorID } from "../../services";
import { toast } from "react-hot-toast";

export const usePublicacionesID = (id) => {
    const [publicacion, setPublicacion] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const obtenerPublicacion = async () => {
        setCargando(true);
        try {
            const publicacionData = await listarPublicacionPorID(id);
            setPublicacion(publicacionData);
            setComentarios(publicacionData.comentarios);
            setCargando(false);
        } catch (error) {
            setCargando(false);
            if (error.response && error.response.status === 404) {
                setError("La publicación no fue encontrada.");
            } else {
                setError("Ocurrió un error al cargar la publicación.");
            }
            toast.error("Error al cargar la publicación.");
        }
    };

    useEffect(() => {
        if (id) {
            obtenerPublicacion();
        }
    }, [id]);

    return {
        publicacion,
        comentarios,
        cargando,
        error,
        setComentarios,
    };
};