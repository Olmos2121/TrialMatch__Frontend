import React, { useEffect, useState } from 'react';
import { getTrialCandidates } from '../../../apis/trialApi';
import { CandidateModal } from './CandidateModal';
import '../../../styles/CandidatesModal.css';
import { toast } from 'react-toastify';

export const ViewCandidatesModal = ({ isOpen, trial, onClose }) => {
    const [candidates, setCandidates] = useState([]);
    const [isCandidatesModalOpen, setIsCandidatesModalOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [acceptCandidateSuccess, setAcceptCandidateSuccess] = useState(false);
    const [rejectCandidateSuccess, setRejectCandidateSuccess] = useState(false);

    
    useEffect(() => {
        if(acceptCandidateSuccess) {
            refreshCandidates();
            toast.success('Candidato aceptado', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [acceptCandidateSuccess]);

    useEffect(() => {
        if(rejectCandidateSuccess) {
            refreshCandidates();
            toast.error('Candidato rechazado', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [rejectCandidateSuccess]);

    const refreshCandidates = async () => {
        try {
            const response = await getTrialCandidates(trial.id);
            setCandidates(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        refreshCandidates();
    }, [trial]);

    const handleCandidateCLick = (candidate) => {
        setIsCandidatesModalOpen(true);
        setSelectedCandidate(candidate);
    }

    const handleCandidateClose = async () => {
        setIsCandidatesModalOpen(false);
        setSelectedCandidate(null);
    }

    const half = Math.ceil(candidates.length / 2);
    const firstHalfCandidates = candidates.slice(0, half);
    const secondHalfCandidates = candidates.slice(half);

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h2>Candidatos del Ensayo</h2>
                <div className='two-column-container'>
                    <div className='column'>
                        {firstHalfCandidates.map(candidate => (
                            <button onClick={() => handleCandidateCLick(candidate)} key={candidate.id} className="modal-column-button">
                                {candidate.firstname} {candidate.lastname}
                            </button>
                        ))}
                    </div>
                    <div className='column'>
                        {secondHalfCandidates.map(candidate => (
                            <button onClick={() => handleCandidateCLick(candidate)} key={candidate.id} className="modal-column-button">
                                {candidate.firstname} {candidate.lastname}
                            </button>
                        ))}

                    </div>
                </div>
                <button className="close-modal-button" onClick={onClose}>Cerrar</button>
            </div>
            {isCandidatesModalOpen &&
                <CandidateModal
                    isOpen={isCandidatesModalOpen}
                    candidate={selectedCandidate}
                    onClose={handleCandidateClose}
                    trial={trial}
                    setAcceptCandidateSuccess={setAcceptCandidateSuccess}
                    setRejectCandidateSuccess={setRejectCandidateSuccess}
                />
            }
        </div>
    );
};