import React from "react";
import { PublicacionPage } from "./pages/publicacion";
import { PublicacionDetalle } from "./components/PublicacionDetalle.jsx"; // Ruta corregida

export const routes = [
    { path: "/", element: <PublicacionPage /> },
    { path: "/publicacion/:id", element: <PublicacionDetalle /> }, // Nueva ruta
];