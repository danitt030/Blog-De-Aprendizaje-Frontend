import React from "react";
import './PublicacionPage.css';
import { PublicacionesLista } from "../../components";

export const PublicacionPage = () => {
    return (
        <div className="dashboard-container">
            <PublicacionesLista />
        </div>
    );
};
