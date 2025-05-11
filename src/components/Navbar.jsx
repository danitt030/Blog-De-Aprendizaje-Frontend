import React, { useState } from "react";
import '../pages/publicacion/Navbar.css';
import { useFiltroPublicaciones } from "../shared/hooks/useFiltroPublicaciones";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const {
        limpiarFiltros
    } = useFiltroPublicaciones();

    const [curso, setCurso] = useState("");
    const [titulo, setTitulo] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const navigate = useNavigate(); 

    const handleFiltrarCurso = (e) => {
        e.preventDefault();
        if (curso.trim()) {
            navigate(`/curso/${encodeURIComponent(curso)}`); 
        }
    };

    const handleFiltrarTitulo = (e) => {
        e.preventDefault();
        if (titulo.trim()) {
            navigate(`/titulo/${encodeURIComponent(titulo)}`);
        }
    };

    const handleFiltrarFechas = (e) => {
        e.preventDefault();
        if (fechaInicio && fechaFin) {
            navigate(`/fechas/${encodeURIComponent(fechaInicio)}/${encodeURIComponent(fechaFin)}`);
        }
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-title">Blog de Aprendizaje Frontend</h1>
            <div className="navbar-filtros">
                <form className="filtro-form" onSubmit={handleFiltrarCurso}>
                    <input
                        type="text"
                        placeholder="Por curso"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                    />
                    <button type="submit">Filtrar</button>
                </form>
                <form className="filtro-form" onSubmit={handleFiltrarTitulo}>
                    <input
                        type="text"
                        placeholder="Por título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <button type="submit">Filtrar</button>
                </form>
                <form className="filtro-form" onSubmit={handleFiltrarFechas}>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                    <button type="submit">Fechas</button>
                </form>
            </div>
            <button
                className="volver-btn"
                onClick={() => {
                    limpiarFiltros();
                    navigate("/");
                }}
            >
                Volver a publicaciones
            </button>
        </nav>
    );
};