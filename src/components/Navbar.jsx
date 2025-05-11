import React, { useState } from "react";
import '../pages/publicacion/Navbar.css';
import { useFiltroPublicaciones } from "../shared/hooks/useFiltroPublicaciones";
import { useNavigate } from "react-router-dom"; // <-- Agrega esto

export const Navbar = () => {
    const {
        limpiarFiltros
    } = useFiltroPublicaciones();

    const [curso, setCurso] = useState("");
    const [titulo, setTitulo] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const navigate = useNavigate(); // <-- Agrega esto

    const handleFiltrarCurso = (e) => {
        e.preventDefault();
        if (curso.trim()) {
            navigate(`/curso/${encodeURIComponent(curso)}`); // Redirige a la página filtrada
        }
    };

    const handleFiltrarTitulo = (e) => {
        e.preventDefault();
        if (titulo.trim()) {
            navigate(`/titulo/${encodeURIComponent(titulo)}`); // Redirige a la página filtrada por título
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
            <form onSubmit={handleFiltrarCurso} style={{ marginRight: 10 }}>
                <input
                    type="text"
                    placeholder="Filtrar por curso"
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                />
                <button type="submit">Filtrar</button>
            </form>
            <form onSubmit={handleFiltrarTitulo} style={{ marginRight: 10 }}>
                <input
                    type="text"
                    placeholder="Filtrar por título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <button type="submit">Filtrar</button>
            </form>
            <form onSubmit={handleFiltrarFechas} style={{ marginRight: 10 }}>
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
                <button type="submit">Filtrar fechas</button>
            </form>
            <button
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