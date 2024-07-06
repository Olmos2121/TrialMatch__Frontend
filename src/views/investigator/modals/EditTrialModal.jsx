import React, { useState } from 'react';
import '../../../styles/Modal.css';
import { provincias } from '../../../assets/enums/Provincias';
import { fases } from '../../../assets/enums/Fases';
import { estados } from '../../../assets/enums/Estados';
import { generos } from '../../../assets/enums/Generos';
import { candidatosSanos } from '../../../assets/enums/CandidatosSanos';
import { enfermedades } from '../../../assets/enums/Enfermedades';

export const EditTrialModal = ({ isOpen, onClose, onSave, trial, setEditSuccess }) => {
    const [ageRange, setAgeRange] = useState({ min: trial.rangoEtarioMin, max: trial.rangoEtarioMax });
    const [formDataEdit, setFormDataEdit] = useState({
        id: 0,
        fase: "",
        status: "",
    });
    const [formData, setFormData] = useState({
        id: trial.id,
        name: trial.nombre,
        enfermedad: trial.enfermedad,
        fase: trial.fase,
        startDate: trial.fechaInicio,
        endDate: trial.fechaFin,
        status: trial.estado,
        provincia: trial.provincia,
        genero: trial.genero,
        candidatosSanos: trial.candidatosSanos,
        rangoEtarioMin: trial.rangoEtarioMin,
        rangoEtarioMax: trial.rangoEtarioMax,
        descripcion: trial.descripcion
    });
    const [prevData, setPrevData] = useState({
        id: trial.id,
        fase: trial.fase,
        status: trial.estado
    });

    const handleRangeChange = (event) => {
        const { name, value } = event.target;
        setAgeRange(prevAgeRange => ({
            ...prevAgeRange,
            [name]: value
        }));
        setFormData(prevFormData => ({
            ...prevFormData,
            [`rangoEtario${name.charAt(0).toUpperCase() + name.slice(1)}`]: value
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const submitForm = async (e) => {
        e.preventDefault();

        formDataEdit.id = formData.id;
        formDataEdit.fase = formData.fase;
        formDataEdit.status = formData.status;

        if (formDataEdit.fase === prevData.fase && formDataEdit.status === prevData.status) {
            setEditSuccess(false);
            onClose();
            return;
        } else {
            setEditSuccess(true);
            onSave(formDataEdit);
        }
    }

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Editar Ensayo</h2>
                <form onSubmit={submitForm} className="edit-trial-form">
                    <div className='two-column-container'>
                        <div className='column'>
                            <label>Nombre del ensayo</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre del ensayo"
                                value={formData.name}
                                onChange={handleInputChange}
                                readOnly
                                className="edit-trial-input"
                            />
                            <label>Enfermedad</label>
                            <select
                                name="enfermedad"
                                value={formData.enfermedad}
                                onChange={handleInputChange}
                                disabled
                                className="edit-trial-select"
                            >
                                <option value="">Selecciona una enfermedad</option>
                                {enfermedades.map((enfermedad, index) => (
                                    <option key={index} value={enfermedad}>{enfermedad}</option>
                                ))}
                            </select>
                            <label>Fase</label>
                            <select
                                name="fase"
                                value={formData.fase}
                                onChange={handleInputChange}
                                className="edit-trial-select-editable"
                            >
                                <option value="">Selecciona una fase</option>
                                {fases.map((fase, index) => (
                                    <option key={index} value={fase}>{fase}</option>
                                ))}
                            </select>
                            <label>Fecha de Inicio</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                readOnly
                                onChange={handleInputChange}
                                className="edit-trial-input"
                            />
                            <label>Fecha de Fin</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                readOnly
                                onChange={handleInputChange}
                                className="edit-trial-input"
                            />
                        </div>
                        <div className='column'>
                            <label>Estado</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="edit-trial-select-editable"
                            >
                                <option value="">Selecciona un estado</option>
                                {estados.map((estado, index) => (
                                    <option key={index} value={estado}>{estado}</option>
                                ))}
                            </select>
                            <label>Provincia</label>
                            <select
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleInputChange}
                                disabled
                                className="edit-trial-select"
                            >
                                <option value="">Selecciona una provincia</option>
                                {provincias.map((provincia, index) => (
                                    <option key={index} value={provincia}>{provincia}</option>
                                ))}
                            </select>
                            <label>Género</label>
                            <select
                                name="genero"
                                value={formData.genero}
                                onChange={handleInputChange}
                                disabled
                                className="edit-trial-select"
                            >
                                {generos.map((genero, index) => (
                                    <option key={index} value={genero}>{genero}</option>
                                ))}
                            </select>
                            <label>Candidatos Sanos</label>
                            <select
                                name="candidatosSanos"
                                value={formData.candidatosSanos}
                                onChange={handleInputChange}
                                disabled
                                className="edit-trial-select"
                            >
                                {candidatosSanos.map((candidato, index) => (
                                    <option key={index} value={candidato}>{candidato}</option>
                                ))}
                            </select>
                            <div className="age-range-container">
                                <label>Rango Etario</label>
                                <div className="age-range-inputs">
                                    <input
                                        type="number"
                                        name="min"
                                        value={ageRange.min}
                                        onChange={handleRangeChange}
                                        readOnly
                                        className="edit-trial-input"
                                    />
                                    <input
                                        type="number"
                                        name="max"
                                        value={ageRange.max}
                                        onChange={handleRangeChange}
                                        readOnly
                                        className="edit-trial-input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        readOnly
                        onChange={handleInputChange}
                        className="edit-trial-textarea"
                    />
                    <button type="submit" className="edit-trial-button">Guardar</button>

                </form>
            </div>
        </div>
    );

};