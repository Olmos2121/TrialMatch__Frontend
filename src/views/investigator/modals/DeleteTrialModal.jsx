import React from 'react';
import '../../../styles/DeleteModal.css'

export const DeleteTrialModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Eliminar Ensayo</h2>
        <p>¿Estás seguro que deseas eliminar el ensayo?</p>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={onConfirm}>Eliminar</button>
      </div>
    </div>
  );
};