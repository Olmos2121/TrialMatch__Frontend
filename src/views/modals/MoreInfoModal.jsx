import React from 'react';
import '../../styles/MoreInfoModal.css';

export const MoreInfoModal = ({ isOpen, toggleModal, trial }) => {
    if (!isOpen) return null;

    return (
        <div className="backdropInfo">
            <div className="contentInfo">
                <h2>Más información sobre el ensayo</h2>
                <p><strong>Descripción:</strong></p>
                <div className='content-description-container'>
                    <p>{trial.descripcion}</p>
                </div>
                <button onClick={toggleModal}>Cerrar</button>
            </div>
        </div>
    );
};
