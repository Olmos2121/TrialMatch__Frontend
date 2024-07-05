import React, { useState } from 'react'
import '../styles/CreateTrial.css'
import { Footer } from '../components/Footer'
import { provincias } from '../assets/enums/Provincias'
import { fases } from '../assets/enums/Fases'
import { estados } from '../assets/enums/Estados'
import { generos } from '../assets/enums/Generos'
import { enfermedades } from '../assets/enums/Enfermedades'
import { createTrial } from '../apis/trialApi'

export const CreateTrial = () => {
    const [ageRange, setAgeRange] = useState({ min: '', max: '' });
    const [formData, setFormData] = useState({
        name: '',
        enfermedad: '',
        fase: '',
        status: '',
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
        <>
            <div className='create-trial'>
                <div className='create-trial-container'>
                    <h1>Crear un nuevo estudio</h1>
                    <form onSubmit={submitForm} className='create-trial-form'>
                        <div className='row'>
                            <div className='name'>
                                <label>Nombre</label>
                                <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className='enfermedad'>
                                <label>Enfermedad</label>
                                <select name='enfermedad' value={formData.enfermedad} onChange={handleInputChange}>
                                    <option value=''>Selecciona una enfermedad</option>
                                    {enfermedades.map((enfermedad, index) => (
                                        <option key={index} value={enfermedad}>{enfermedad}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='fase'>
                                <label>Fase</label>
                                <select name='fase' value={formData.fase} onChange={handleInputChange}>
                                    <option value=''>Selecciona un fase</option>
                                    {fases.map((fase, index) => (
                                        <option key={index} value={fase}>{fase}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='status'>
                                <label>Estado</label>
                                <select name='status' value={formData.status} onChange={handleInputChange}>
                                    <option value=''>Selecciona un estado</option>
                                    {estados.map((estado, index) => (
                                        <option key={index} value={estado}>{estado}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='start-date'>
                                <label>Fecha de inicio</label>
                                <input type='date' name='startDate' value={formData.startDate} onChange={handleInputChange} />
                            </div>
                            <div className='end-date'>
                                <label>Fecha de fin</label>
                                <input type='date' name='endDate' value={formData.endDate} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='provincie'>
                                <label>Provincia</label>
                                <select name='provincia' value={formData.provincia} onChange={handleInputChange}>
                                    <option value=''>Selecciona una provincia</option>
                                    {provincias.map((provincia, index) => (
                                        <option key={index} value={provincia}>{provincia}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="age-range-selector">
                                <label>Rango etario: {ageRange.min} - {ageRange.max} años</label>
                                <div className="range-inputs">
                                    <input
                                        type="range"
                                        name="min"
                                        min="0"
                                        max="100"
                                        value={formData.rangoEtarioMin}
                                        onChange={handleRangeChange}
                                    />
                                    <input
                                        type="range"
                                        name="max"
                                        min="0"
                                        max="100"
                                        value={formData.rangoEtarioMax}
                                        onChange={handleRangeChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='gender'>
                                <label>Genero</label>
                                <select name='genero' value={formData.genero} onChange={handleInputChange}>
                                    <option value=''>Selecciona un genero</option>
                                    {generos.map((genero, index) => (
                                        <option key={index} value={genero}>{genero}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='candidates'>
                                <label>Voluntarios sanos necesarios</label>
                                <select name='candidatosSanos' value={formData.candidatosSanos} onChange={handleInputChange}>
                                    <option value=''>Selecciona una opcion</option>
                                    <option value='si'>Si</option>
                                    <option value='no'>No</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
