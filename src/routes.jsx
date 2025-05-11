import React from "react";
import { PublicacionPage } from "./pages/publicacion";
import { PublicacionDetalle } from "./components/PublicacionDetalle.jsx";
import { PublicacionesPorCurso } from "./pages/publicacion/PublicacionesPorCurso.jsx"; 
import { PublicacionesPorTitulo } from "./pages/publicacion/PublicacionesPorTitulo.jsx"; 
import { PublicacionesPorFechas } from "./pages/publicacion/PublicacionesPorFechas.jsx"; 

export const routes = [
    { path: "/", element: <PublicacionPage /> },
    { path: "/publicacion/:id", element: <PublicacionDetalle /> },
    { path: "/curso/:curso", element: <PublicacionesPorCurso /> },
    { path: "/titulo/:titulo", element: <PublicacionesPorTitulo /> },
    { path: "/fechas/:fechaInicio/:fechaFin", element: <PublicacionesPorFechas /> },
];