import React from 'react';
import '../../styles/LoadingModal.css';

export const LoadingModal = ({ isOpen, message = "Cargando..." }) => {
    if (!isOpen) return null;

    return (
        <div className="backdropLoading">
            <div className="contentLoading">
                <div className="loader"></div>
                <p>{message}</p>
            </div>
        </div>
    );
};