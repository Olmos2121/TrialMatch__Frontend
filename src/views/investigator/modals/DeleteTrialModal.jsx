import React from 'react';
import '../../../styles/Modal.css';

export const DeleteTrialModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Eliminar Ensayo</h2>
        <p>¿Estás seguro que deseas eliminar el ensayo?</p>
        <button onClick={onConfirm}>Eliminar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};