import React, { useEffect, useState } from 'react'
import { removeParticipant } from '../../../apis/trialApi'
import { MessageModal } from './MessageModal'
import { toast } from 'react-toastify'

export const ParticipantModal = ({ isOpen, participant, onClose, trial, setRemoveParticipantSuccess }) => {
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
    const [sendMessageSuccess, setSendMessageSuccess] = useState(false)

    useEffect(() => {
        if (sendMessageSuccess) {
            toast.success('Mensaje enviado correctamente', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [sendMessageSuccess])

    const messageError = () => {
        toast.error('Error al remover participante', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const handleMessageOpen = () => {
        setIsMessageModalOpen(true)
    }

    const handleMessageClose = () => {
        setIsMessageModalOpen(false)
    }

    const handleRemoveParticipant = async () => {
        try {
            await removeParticipant(trial.id, participant.id)
            setRemoveParticipantSuccess(true)
            onClose()
        } catch (error) {
            console.error(error)
            messageError()
        }
    }

    const handleCloseModal = () => {
        setRemoveParticipantSuccess(false)
        onClose()
    }

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h2>Información del Participante</h2>
                <div className='candidate-info'>
                    <h2>Nombre: {participant.firstname} {participant.lastname}</h2>
                    <h2>Email: {participant.email}</h2>
                </div>
                <div className='buttons-container'>
                    <button className="modal-button" onClick={handleMessageOpen}>Enviar mensaje</button>
                    <button className="modal-button" onClick={handleRemoveParticipant}>Retirar del Ensayo</button>
                </div>
                <button className="close-modal-button" onClick={handleCloseModal}>Cerrar</button>
            </div>
            {isMessageModalOpen &&
                <MessageModal
                    isOpen={isMessageModalOpen}
                    onClose={handleMessageClose}
                    participant={participant}
                    trial={trial}
                    setSuccessMessage={setSendMessageSuccess}
                />
            }
        </div>
    )
}
