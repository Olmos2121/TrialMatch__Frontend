import React, { useEffect, useState } from 'react'
import { getTrialParticipants } from '../../../apis/trialApi';
import { ParticipantModal } from './ParticipantModal';
import { toast } from 'react-toastify';
import { MessageToAllModal } from './MessageToAllModal';

export const ViewParticipantsModal = ({ isOpen, trial, onClose }) => {
    const [participants, setParticipants] = useState([]);
    const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [removeParticipantSuccess, setRemoveParticipantSuccess] = useState(false);
    const [sendMessageToAllModal, setSendMessageToAllModal] = useState(false);
    const [sendMessageSuccess, setSendMessageSuccess] = useState(false);

    useEffect(() => {
        refreshParticipants();
        if (removeParticipantSuccess) {
            toast.success('Participante eliminado correctamente', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [removeParticipantSuccess]);

    useEffect(() => {
        if (sendMessageSuccess) {
            toast.success('Mensaje enviado correctamente a todos los participantes', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [sendMessageSuccess]);

    const refreshParticipants = async () => {
        try {
            const response = await getTrialParticipants(trial.id);
            setParticipants(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenMessageToAllModal = () => {
        if(participants.length <= 0) {
            return toast.error('No hay participantes en el ensayo', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setSendMessageToAllModal(true);
    }

    useEffect(() => {
        refreshParticipants();
    }, [trial]);

    const handleParticipantCLick = (participant) => {
        setIsParticipantsModalOpen(true);
        setSelectedParticipant(participant);
    }

    const handleParticipantClose = async () => {
        setIsParticipantsModalOpen(false);
        setSelectedParticipant(null);
    }

    const half = Math.ceil(participants.length / 2);
    const firstHalfParticipants = participants.slice(0, half);
    const secondHalfParticipants = participants.slice(half);

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h2>Participantes del Ensayo</h2>
                <div className='two-column-container'>
                    <div className='column'>
                        {firstHalfParticipants.map(participant => (
                            <button onClick={() => handleParticipantCLick(participant)} key={participant.id} className="modal-column-button">
                                {participant.firstname} {participant.lastname}
                            </button>
                        ))}
                    </div>
                    <div className='column'>
                        {secondHalfParticipants.map(participant => (
                            <button onClick={() => handleParticipantCLick(participant)} key={participant.id} className="modal-column-button">
                                {participant.firstname} {participant.lastname}
                            </button>
                        ))}
                    </div>
                </div>
                <button className="send-message-modal-button" onClick={handleOpenMessageToAllModal}>Enviar mensaje a todos los participantes</button>
                <button className="close-modal-button" onClick={onClose}>Cerrar</button>
            </div>
            {selectedParticipant &&
                <ParticipantModal
                    isOpen={isParticipantsModalOpen}
                    participant={selectedParticipant}
                    onClose={handleParticipantClose}
                    trial={trial}
                    setRemoveParticipantSuccess={setRemoveParticipantSuccess}
                />
            }
            {sendMessageToAllModal &&
                <MessageToAllModal
                    isOpen={sendMessageToAllModal}
                    onClose={() => setSendMessageToAllModal(false)}
                    trial={trial}
                    setSendAllMessageSuccess={setSendMessageSuccess}
                />
            }
        </div>
    )
}
