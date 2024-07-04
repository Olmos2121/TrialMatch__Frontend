import React, { useState } from 'react';
import '../../../styles/Modal.css';
import { provincias } from '../../../assets/enums/Provincias';
import { fases } from '../../../assets/enums/Fases';
import { estados } from '../../../assets/enums/Estados';
import { generos } from '../../../assets/enums/Generos';
import { enfermedades } from '../../../assets/enums/Enfermedades';

export const EditTrialModal = ({ isOpen, onClose, onSave, trial }) => {
    const [ageRange, setAgeRange] = useState({ min: trial.rangoEtarioMin, max: trial.rangoEtarioMax });
    const [formData, setFormData] = useState({
        name: trial.nombre,
        enfermedad: trial.enfermedad,
        fase: trial.fase,
        status: trial.estado,
        descripcion: trial.descripcion,
        startDate: trial.fechaInicio,
        endDate: trial.fechaFin,
        provincia: trial.provincia,
        genero: trial.genero,
        candidatosSanos: trial.candidatosSanos,
        rangoEtarioMin: trial.rangoEtarioMin,
        rangoEtarioMax: trial.rangoEtarioMax
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
        try {
            await onSave(formData);
            alert('Estudio actualizado correctamente');
            onClose();
        } catch (error) {
            alert('Error al actualizar el estudio');
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
                                className="edit-trial-input"
                            />
                            <label>Enfermedad</label>
                            <select
                                name="enfermedad"
                                value={formData.enfermedad}
                                onChange={handleInputChange}
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
                                className="edit-trial-select"
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
                                onChange={handleInputChange}
                                className="edit-trial-input"
                            />
                            <label>Fecha de Fin</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
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
                                className="edit-trial-select"
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
                                className="edit-trial-select"
                            >
                                <option value="">Selecciona un género</option>
                                {generos.map((genero, index) => (
                                    <option key={index} value={genero}>{genero}</option>
                                ))}
                            </select>
                            <label>Candidatos Sanos</label>
                            <select
                                name="candidatosSanos"
                                value={formData.candidatosSanos}
                                onChange={handleInputChange}
                                className="edit-trial-select"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                            <div className="age-range-container">
                                <label>Rango Etario</label>
                                <div className="age-range-inputs">
                                    <input
                                        type="number"
                                        name="min"
                                        value={ageRange.min}
                                        onChange={handleRangeChange}
                                        className="edit-trial-input"
                                    />
                                    <input
                                        type="number"
                                        name="max"
                                        value={ageRange.max}
                                        onChange={handleRangeChange}
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
                        onChange={handleInputChange}
                        className="edit-trial-textarea"
                    />
                    <button type="submit" className="edit-trial-button">Guardar</button>

                </form>
            </div>
        </div>
    );

};