import { useEffect, useState } from "react";
import { listarPublicaciones as listarPublicacionesService } from "../../services";
import { toast } from "react-hot-toast"

export const usePublicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [cargando, setCargando] = useState(false);

    const listarPublicaciones = async () => {
        setCargando(true);
        try {
            const publicaciones = await listarPublicacionesService();
            setPublicaciones(publicaciones); // Ya es un array
            setCargando(false);
        } catch (err) {
            toast.error("Error al cargar las publicaciones" + err.message);
            setCargando(false);
        }
    }

    useEffect(() => {
        listarPublicaciones();
    }, []);

    return {
        publicaciones,
        cargando,
    }
}