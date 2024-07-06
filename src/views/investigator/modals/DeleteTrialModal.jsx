import React from 'react';
import '../../../styles/Modal.css'

export const DeleteTrialModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Eliminar Ensayo</h2>
        <p>¿Estás seguro que deseas eliminar el ensayo?</p>
        <div className='buttons-container'>
          <button className="modal-button" onClick={onClose}>Cancelar</button>
          <button className="modal-button" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};