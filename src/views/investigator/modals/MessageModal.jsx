import React from 'react'
import '../../../styles/MessageModal.css'
import { sendMessageToParticipant } from '../../../apis/trialApi'
import { toast } from 'react-toastify'

export const MessageModal = ({ isOpen, onClose, participant, trial, setSuccessMessage }) => {
    const messageError = () => {
        toast.error('Error al enviar el mensaje', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const handleSendMessage = async () => {
        const message = document.querySelector('.message-modal-textarea').value
        try {
            await sendMessageToParticipant(trial.id, participant.id, message)
            setSuccessMessage(true)
            onClose()
        } catch (error) {
            messageError()
            console.error(error)
        }
    }

    const handleCloseModal = () => {
        setSuccessMessage(false)
        onClose()
    }

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h2>Enviar mensaje a {participant.firstname} {participant.lastname}</h2>
                <textarea className="message-modal-textarea" placeholder="Escribe tu mensaje aquí..."></textarea>
                <button className="send-message-modal-button" onClick={handleSendMessage}>Enviar</button>
                <button className="close-modal-button" onClick={handleCloseModal}>Cerrar</button>
            </div>
        </div>
    )
}
