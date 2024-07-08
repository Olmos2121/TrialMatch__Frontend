import React, { useEffect, useState } from 'react'
import { removeParticipant } from '../../../apis/trialApi'
import { MessageModal } from './MessageModal'
import { toast } from 'react-toastify'

export const ParticipantModal = ({ isOpen, participant, onClose, trial, userInfo, setRemoveParticipantSuccess }) => {
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
                <div className='two-column-container-user'>
                    <div className='column-user'>
                        <label>Nombre:</label>
                        <p>{participant.firstname} {participant.lastname}</p>
                        <label>Email:</label>
                        <p>{participant.email}</p>
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
 