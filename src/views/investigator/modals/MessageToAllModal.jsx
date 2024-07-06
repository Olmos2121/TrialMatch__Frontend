import React from 'react'
import { sendMessageToAllParticipants } from '../../../apis/trialApi'
import { toast } from 'react-toastify'

export const MessageToAllModal = ({ isOpen, onClose, trial, setSendAllMessageSuccess }) => {

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
            await sendMessageToAllParticipants(trial.id, message)
            setSendAllMessageSuccess(true)
            onClose()
        } catch (error) {
            console.error(error)
            messageError()
        }
    }

    const handleCloseModal = () => {
        setSendAllMessageSuccess(false)
        onClose()
    }

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h2>Enviar mensaje a todos los participantes</h2>
                <textarea className="message-modal-textarea" placeholder="Escribe tu mensaje aquí..."></textarea>
                <button className="send-message-modal-button" onClick={handleSendMessage}>Enviar</button>
                <button className="close-modal-button" onClick={handleCloseModal}>Cerrar</button>
            </div>
        </div>
    )
}
