import React, { useEffect, useState } from 'react';
import { getTrialCandidates } from '../../../apis/trialApi';
import '../../../styles/CandidatesModal.css';

export const ViewCandidatesModal = ({ trial, onClose }) => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await getTrialCandidates(trial.id);
                if (Array.isArray(response)) {
                    setCandidates(response);
                } else {
                    console.error('Response no es un array:', response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCandidates();
    }, [trial]);

    const half = Math.ceil(candidates.length / 2);
    const firstHalfCandidates = candidates.slice(0, half);
    const secondHalfCandidates = candidates.slice(half);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Candidatos del Ensayo</h2>
                <div className='two-column-container'>
                    <div className='column'>
                        {firstHalfCandidates.map(candidate => (
                            <div key={candidate.id}>{candidate.firstname} {candidate.lastname}</div> // Ajusta según la estructura de tus datos
                        ))}
                    </div>
                    <div className='column'>
                        {secondHalfCandidates.map(candidate => (
                            <div key={candidate.id}>{candidate.firstname} {candidate.lastname}</div> // Ajusta según la estructura de tus datos
                        ))}
                    </div>
                </div>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};