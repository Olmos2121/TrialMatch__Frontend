import React from 'react';
import '../../../styles/Modal.css';

export const ViewCandidatesModal = ({ trial, onClose }) => (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Candidatos del Ensayo</h2>
            {/* Lista de candidatos */}
            <button onClick={onClose}>Cerrar</button>
        </div>
    </div>
);