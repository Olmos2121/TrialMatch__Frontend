import React, { useEffect, useState } from 'react';
import { getTrialsByEmail, deleteTrial, editTrial } from '../../apis/trialApi';
import { DeleteTrialModal } from './modals/DeleteTrialModal';
import { EditTrialModal } from './modals/EditTrialModal';
import { ViewCandidatesModal } from './modals/ViewCandidatesModal';
import { ViewParticipantsModal } from './modals/ViewParticipantsModal';
import '../../styles/ViewTrials.css';

export const ViewTrials = () => {
    const [loading, setLoading] = useState(true);
    const [trials, setTrials] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [trialToDelete, setTrialToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [trialToEdit, setTrialToEdit] = useState(null);
    const [selectedTrial, setSelectedTrial] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrials = async () => {
            try {
                const trials = await getTrialsByEmail();
                setTrials(trials);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrials();
    }, []);

    const handleDeleteClick = (trial) => {
        setIsDeleteModalOpen(true);
        setTrialToDelete(trial);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteTrial(trialToDelete.id);
            setTrials(trials.filter(trial => trial.id !== trialToDelete.id));
            setIsDeleteModalOpen(false);
            setTrialToDelete(null);
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const handleEditClick = (trial) => {
        setIsEditModalOpen(true);
        setTrialToEdit(trial);
    };

    const handleSaveEdit = async (updatedTrial) => {
        if (!updatedTrial.id) {
            console.error("Trial ID is undefined");
            return;
        }
        try {
            const response = await editTrial(updatedTrial.id, updatedTrial);

            const updatedTrialObj = Array.from(response.entries()).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

            setTrials((prevState) =>
                prevState.map((trial) =>
                    trial.id === updatedTrialObj.id ? updatedTrialObj : trial
                )
            );

            setIsEditModalOpen(false);
            setTrialToEdit(null);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    const openModal = (trial, type) => {
        setSelectedTrial(trial);
        setModalType(type);
    };

    const handleCloseModal = () => {
        setIsDeleteModalOpen(false);
        setTrialToDelete(null);
        setIsEditModalOpen(false);
        setTrialToEdit(null);
        setModalType(null);
        setSelectedTrial(null);
    };

    return (
        <div className="trials-container">
            <h2 className="trials-title">Ensayos Clínicos</h2>
            {loading ? (
                <p className="loading">Cargando...</p>
            ) : trials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trials.map((trial) => (
                        <div key={trial.id} className="trial-card">
                            <div className="trial-info">
                                <h3 className="trial-name">{trial.nombre}</h3>
                                <p className="trial-detail">Enfermedad: {trial.enfermedad}</p>
                                <p className="trial-detail">Fecha de Inicio: {trial.fechaInicio}</p>
                                <p className="trial-detail">Fecha de Fin: {trial.fechaFin}</p>
                                <p className="trial-detail">Fase: {trial.fase}</p>
                                <p className="trial-detail">Estado: {trial.estado}</p>
                            </div>
                            <div className="trial-buttons">
                                <button className="trial-button delete" onClick={() => handleDeleteClick(trial)}>Eliminar</button>
                                <button className="trial-button edit" onClick={() => handleEditClick(trial)}>Editar</button>
                                <button className="trial-button view" onClick={() => openModal(trial, 'viewCandidates')}>Ver Candidatos</button>
                                <button className="trial-button view" onClick={() => openModal(trial, 'viewParticipants')}>Ver Participantes</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-trials">No se encontraron ensayos.</p>
            )}
            {isDeleteModalOpen && trialToDelete && (
                <DeleteTrialModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )}
            {isEditModalOpen && trialToEdit && (
                <EditTrialModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveEdit}
                    trial={trialToEdit}
                />
            )}
            {modalType === 'viewCandidates' && selectedTrial && (
                <ViewCandidatesModal trial={selectedTrial} onClose={handleCloseModal} />
            )}
            {modalType === 'viewParticipants' && selectedTrial && (
                <ViewParticipantsModal trial={selectedTrial} onClose={handleCloseModal} />
            )}
        </div>
    );
};
