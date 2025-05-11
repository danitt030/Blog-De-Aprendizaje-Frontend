import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filtrarPublicacionesPorFechas } from "../../services/api.jsx";
import { PublicacionesForm } from "../../components/PublicacionesForm.jsx";

export const PublicacionesPorFechas = () => {
    const { fechaInicio, fechaFin } = useParams();
    const [publicaciones, setPublicaciones] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setCargando(true);
            try {
                const pubs = await filtrarPublicacionesPorFechas(fechaInicio, fechaFin);
                setPublicaciones(pubs);
            } catch (err) {
                console.error("Error al filtrar publicaciones por fechas:", err);
                setPublicaciones([]);
            }
            setCargando(false);
        };
        fetchData();
    }, [fechaInicio, fechaFin]);

    return (
        <div className="dashboard-container">
            <h2>Publicaciones entre: {fechaInicio} y {fechaFin}</h2>
            {cargando ? (
                <p>Cargando publicaciones...</p>
            ) : (
                <PublicacionesForm publicaciones={publicaciones} />
            )}
        </div>
    );
};