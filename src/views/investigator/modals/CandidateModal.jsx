import React, { useEffect, useState } from 'react'
import { acceptApply, rejectApply } from '../../../apis/trialApi';
import '../../../styles/CandidateModal.css';

export const CandidateModal = ({ isOpen, candidate, onClose, trial, userInfo, setAcceptCandidateSuccess, setRejectCandidateSuccess }) => {
    const handleAcceptCandidate = async () => {
        try {
            await acceptApply(trial.id, candidate.id);
            setAcceptCandidateSuccess(true);
            setRejectCandidateSuccess(false);
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    const handleRejectCandidate = async () => {
        try {
            await rejectApply(trial.id, candidate.id);
            setRejectCandidateSuccess(true);
            setAcceptCandidateSuccess(false);
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    console.log(userInfo);

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h2>Información del Candidato</h2>
                <div className='two-column-container-user'>
                    <div className='column-user'>
                        <label>Nombre:</label>
                        <p>{candidate.firstname} {candidate.lastname}</p>
                        <label>Email:</label>
                        <p>{candidate.email}</p>
                        <label>Fecha de Nacimiento:</label>
                        <p>{userInfo.fechaNacimiento}</p>
                        <label>Género:</label>
                        <p>{userInfo.genero}</p>
                        <label>Dirección:</label>
                        <p>{userInfo.direccion}</p>
                        <label>Teléfono:</label>
                        <p>{userInfo.telefono}</p>
                        <label>Historial Médico:</label>
                        <p>{userInfo.historialMedico}</p>
                        <label>Medicamentos Actuales:</label>
                        <p>{userInfo.medicamentosActuales}</p>
                        <label>Alergias Conocidas:</label>
                        <p>{userInfo.alergiasConocidas}</p>
                    </div>
                    <div className='column-user'>
                        <label>Cirugías Previas:</label>
                        <p>{userInfo.cirugiasPrevias}</p>
                        <label>Enfermedades Crónicas:</label>
                        <p>{userInfo.enfermedadesCronicas}</p>
                        <label>Nivel Educativo:</label>
                        <p>{userInfo.nivelEducativo}</p>
                        <label>Ocupación:</label>
                        <p>{userInfo.ocupacion}</p>
                        <label>Hábitos de Fumar:</label>
                        <p>{userInfo.habitosFumar}</p>
                        <label>Hábitos de Alcohol:</label>
                        <p>{userInfo.habitosAlcohol}</p>
                        <label>Hábitos de Ejercicio:</label>
                        <p>{userInfo.habitosEjercicio}</p>
                        <label>Hábitos Alimenticios:</label>
                        <p>{userInfo.habitosAlimenticios}</p>
                        <label>Consentimiento:</label>
                        <p>{userInfo.consentimiento ? 'Sí' : 'No'}</p>
                    </div>
                </div>
                <div className='buttons-container'>
                    <button className="modal-button" onClick={handleAcceptCandidate}>Aceptar</button>
                    <button className="modal-button" onClick={handleRejectCandidate}>Rechazar</button>
                </div>
                <button className="close-modal-button" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
