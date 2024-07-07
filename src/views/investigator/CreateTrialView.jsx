import React, { useState } from 'react';
import { createTrial } from '../../apis/trialApi';
import { provincias } from '../../assets/enums/Provincias';
import { fases } from '../../assets/enums/Fases';
import { estados } from '../../assets/enums/Estados';
import { generos } from '../../assets/enums/Generos';
import { enfermedades } from '../../assets/enums/Enfermedades';
import '../../styles/CreateTrialView.css';

export const CreateTrialView = () => {
    const [ageRange, setAgeRange] = useState({ min: '', max: '' });
    const [formData, setFormData] = useState({
        name: '',
        enfermedad: '',
        fase: '',
        status: '',
        descripcion: '',
        startDate: '',
        endDate: '',
        provincia: '',
        genero: '',
        candidatosSanos: '',
        rangoEtarioMin: '',
        rangoEtarioMax: ''
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
            await createTrial(formData);
            alert('Estudio creado correctamente');
        } catch (error) {
            alert('Error al crear el estudio');
        }
    }

    return (
        <div className="create-trial-container">
            <h2 className="create-trial-title">Crear Nuevo Ensayo</h2>
            <form onSubmit={submitForm} className="create-trial-form">
                <label>Nombre del ensayo</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del ensayo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="create-trial-input"
                />
                <label>Enfermedad</label>
                <select
                    name="enfermedad"
                    value={formData.enfermedad}
                    onChange={handleInputChange}
                    className="create-trial-select"
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
                    className="create-trial-select"
                >
                    <option value="">Selecciona una fase</option>
                    {fases.map((fase, index) => (
                        <option key={index} value={fase}>{fase}</option>
                    ))}
                </select>
                <label>Estado</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="create-trial-select"
                >
                    <option value="">Selecciona un estado</option>
                    {estados.map((estado, index) => (
                        <option key={index} value={estado}>{estado}</option>
                    ))}
                </select>
                <label>Fecha de Inicio</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="create-trial-input"
                />
                <label>Fecha de Fin</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="create-trial-input"
                />
                <label>Provincia</label>
                <select
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleInputChange}
                    className="create-trial-select"
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
                    className="create-trial-select"
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
                    className="create-trial-select"
                >
                    <option value="">Selecciona una opción</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                </select>
                <div className="age-range-container">
                    <label>Rango Etario:</label>
                    <input
                        type="number"
                        name="min"
                        placeholder="Mínimo"
                        value={ageRange.min}
                        onChange={handleRangeChange}
                        className="create-trial-input age-range-input"
                    />
                    <input
                        type="number"
                        name="max"
                        placeholder="Máximo"
                        value={ageRange.max}
                        onChange={handleRangeChange}
                        className="create-trial-input age-range-input"
                    />
                </div>
                <div className="description-container">
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        className="create-trial-textarea"
                        style={{ height: '16vh'}}
                    />
                </div>
                <button type="submit" className="create-trial-button">
                    Crear Ensayo
                </button>
            </form>
        </div>
    );
}
