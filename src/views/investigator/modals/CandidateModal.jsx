import React from 'react'
import { acceptApply, rejectApply } from '../../../apis/trialApi';
import '../../../styles/CandidateModal.css';

export const CandidateModal = ({ isOpen, candidate, onClose, trial, setAcceptCandidateSuccess , setRejectCandidateSuccess }) => {

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

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h2>Información del Candidato</h2>
                <div className='candidate-info'>
                    <h2>Nombre: {candidate.firstname} {candidate.lastname}</h2>
                    <h2>Email: {candidate.email}</h2>
                </div>
                <div className='buttons-container'>
                    <button className="modal-button" onClick={handleAcceptCandidate}>Aceptar</button>
                    <button className="modal-button" onClick={handleRejectCandidate}>Rechazar</button>
                </div>
                <button className="close-modal-button" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    )
}
