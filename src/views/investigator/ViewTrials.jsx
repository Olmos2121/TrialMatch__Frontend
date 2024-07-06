import React, { useEffect, useState } from 'react';
import { getTrialsByEmail, deleteTrial, editTrial } from '../../apis/trialApi';
import { DeleteTrialModal } from './modals/DeleteTrialModal';
import { EditTrialModal } from './modals/EditTrialModal';
import { ViewCandidatesModal } from './modals/ViewCandidatesModal';
import { ViewParticipantsModal } from './modals/ViewParticipantsModal';
import { toast } from 'react-toastify';
import '../../styles/ViewTrials.css';

export const ViewTrials = () => {
    const [loading, setLoading] = useState(true);
    const [trials, setTrials] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [trialToDelete, setTrialToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [trialToEdit, setTrialToEdit] = useState(null);
    const [selectedTrial, setSelectedTrial] = useState(null);
    const [isCandidatesModalOpen, setIsCandidatesModalOpen] = useState(false);
    const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [editSuccess, setEditSuccess] = useState(false);

    useEffect(() => {
        const fetchTrials = async () => {
            try {
                const trials = await getTrialsByEmail();
                const sortedTrials = trials.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
                setTrials(sortedTrials);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrials();
    }, []);

    useEffect(() => {
        if (editSuccess) {
            toast.success("El ensayo se ha editado correctamente", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }, [editSuccess]);

    const handleDeleteClick = (trial) => {
        setIsDeleteModalOpen(true);
        setTrialToDelete(trial);
    };

    const handleCandidatesClick = (trial) => {
        setSelectedTrial(trial);
        setIsCandidatesModalOpen(true);
    };

    const handleParticipantsClick = (trial) => {
        setSelectedTrial(trial);
        setIsParticipantsModalOpen(true);
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
            await editTrial(updatedTrial);

            const updatedTrialObj = Object.entries(updatedTrial).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

            setTrials((prevState) =>
                prevState.map((trial) =>
                    trial.id === updatedTrialObj.id ? updatedTrialObj : trial
                )
            );
            const data = await getTrialsByEmail();
            const sortedTrials = data.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
            setTrials(sortedTrials);
            setIsEditModalOpen(false);
            setTrialToEdit(null);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    const handleCloseModal = () => {
        setIsDeleteModalOpen(false);
        setTrialToDelete(null);
        setIsEditModalOpen(false);
        setTrialToEdit(null);
        setSelectedTrial(null);
        setIsCandidatesModalOpen(false);
        setIsParticipantsModalOpen(false);
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
                                <button className="trial-button view" onClick={() => handleCandidatesClick(trial)}>Ver Candidatos</button>
                                <button className="trial-button view" onClick={() => handleParticipantsClick(trial)} >Ver Participantes</button>
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
                    setEditSuccess={setEditSuccess}
                />
            )}
            {isCandidatesModalOpen && (
                <ViewCandidatesModal
                    isOpen={isCandidatesModalOpen}
                    trial={selectedTrial}
                    onClose={handleCloseModal}
                />
            )}
            {isParticipantsModalOpen && (
                <ViewParticipantsModal
                    isOpen={isParticipantsModalOpen}
                    trial={selectedTrial}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};
