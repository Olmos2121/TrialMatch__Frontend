import React from 'react';
import '../../../styles/Modal.css';

export const EditTrialModal = ({ trial, onClose }) => (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Editar Ensayo</h2>
            {/* Formulario para editar el ensayo */}
            <button onClick={onClose}>Guardar</button>
            <button onClick={onClose}>Cancelar</button>
        </div>
    </div>
);