import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:3002/blogDeAprendizajeBackend/v1",
    timeout: 5000,
    httpsAgent: false,
});

export { API };

export const listarPublicaciones = async () => {
    const res = await API.get("/Publicacion/listarPublicaciones");
    return res.data.publicaciones;
};

// Nueva función para obtener una publicación por ID
export const listarPublicacionPorID = async (id) => {
    const res = await API.get(`/Publicacion/listarPublicaciones/${id}`); // Ruta corregida
    return res.data.publicacion;
};

export const agregarComentario = async (comentario) => {
    const res = await API.post('/Comentario/agregarComentarios', comentario); // <-- aquí la S
    return res.data.comentario;
};