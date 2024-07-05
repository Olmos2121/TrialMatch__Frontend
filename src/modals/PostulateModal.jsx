import React from 'react';
import '../styles/PostulateModal.css';

export const PostulateModal = React.memo(({ isOpen, onClose, onConfirm }) => {
    console.log('modal isOpen:', isOpen);
    if (!isOpen) return null;
    return (
        <div className="modal">
            <h2>¿Estás seguro de que deseas postularte?</h2>
            <div className="modal-buttons">
                <button className="cancel-button" onClick={onClose}>Cancelar</button>
                <button className="confirm-button" onClick={onConfirm}>Postularse</button>
            </div>
        </div>
    );
});
