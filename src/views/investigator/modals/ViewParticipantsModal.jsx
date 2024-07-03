import React from 'react';
import '../../../styles/Modal.css';

export const ViewParticipantsModal = ({ trial, onClose }) => (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Participantes del Ensayo</h2>
            {/* Lista de participantes */}
            <button onClick={onClose}>Cerrar</button>
        </div>
    </div>
);