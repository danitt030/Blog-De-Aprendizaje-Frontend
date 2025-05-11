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

export const listarPublicacionPorID = async (id) => {
    const res = await API.get(`/Publicacion/listarPublicaciones/${id}`); 
    return res.data.publicacion;
};

export const agregarComentario = async (comentario) => {
    const res = await API.post('/Comentario/agregarComentarios', comentario); 
    return res.data.comentario;
};

export const filtrarPublicacionesPorCurso = async (curso) => {
    const res = await API.get(`/Publicacion/filtrarPorCurso?curso=${encodeURIComponent(curso)}`);
    return res.data.publicaciones;
};

export const filtrarPublicacionesPorTitulo = async (titulo) => {
    const res = await API.get(`/Publicacion/filtrarPorTitulo?titulo=${encodeURIComponent(titulo)}`);
    return res.data.publicaciones;
};

export const filtrarPublicacionesPorFechas = async (fechaInicio, fechaFin) => {
    const res = await API.get(`/Publicacion/filtrarPorFechas?fechaInicio=${encodeURIComponent(fechaInicio)}&fechaFin=${encodeURIComponent(fechaFin)}`);
    return res.data.publicaciones.sort(
        (a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion)
    );
};