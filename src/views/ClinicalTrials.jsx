import React, { useState, useEffect } from 'react';
import '../styles/ClinicalTrials.css';
import { provincias } from '../assets/enums/Provincias';
import { enfermedades } from '../assets/enums/Enfermedades';
import { getTrials } from '../apis/trialApi';
import { useNavigate } from 'react-router-dom';

export const ClinicalTrials = () => {
    const navigate = useNavigate();
    const [trialResults, setTrialResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [formData, setFormData] = useState({
        provincia: '',
        condicionEnfermedad: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTrials();
                setTrialResults(result);
                setFilteredResults(result);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let filtered = trialResults;

        if (formData.provincia) {
            filtered = filtered.filter(trial => trial.provincia === formData.provincia);
        }

        if (formData.condicionEnfermedad) {
            filtered = filtered.filter(trial => trial.enfermedad === formData.condicionEnfermedad);
        }

        setFilteredResults(filtered);
    }

    return (
        <div className="clinical-trials">
            <div className="textImportantContainer">
                <h1>Explora todos los resultados de todo el país!</h1>
                <h2>IMPORTANTE: Antes de participar en un estudio, habla con tu medico y conoce los riesgos y beneficios asociados.</h2>
            </div>
            <div className="content-container">
                <div className="filters-container">
                    <div className="search-container">
                        <h1>Encontrar un estudio</h1>
                        <h2>(todos los campos son opcionales)</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="provincia">
                            <label>Provincia</label>
                            <select name="provincia" onChange={handleChange}>
                                <option value="">Selecciona una provincia</option>
                                {provincias.map((provincia, index) => (
                                    <option key={index} value={provincia}>{provincia}</option>
                                ))}
                            </select>
                        </div>
                        <div className="condicion-enfermedad">
                            <label>Condición/Enfermedad</label>
                            <select name="condicionEnfermedad" onChange={handleChange}>
                                <option value="">Selecciona una opción</option>
                                {enfermedades.map((enfermedad, index) => (
                                    <option key={index} value={enfermedad}>{enfermedad}</option>
                                ))}
                            </select>
                        </div>
                        <div className="buscar">
                            <button type="submit">Buscar</button>
                        </div>
                    </form>
                </div>
                <div className="results-container">
                    <div className="clinical-trials-results">
                        <h1>Resultados de la búsqueda</h1>
                        <div className='results-header'>
                            <span>Nombre</span>
                            <span>Estado</span>
                            <span>Provincia</span>
                            <span>Condición/Enfermedad</span>
                            <span>Fase</span>
                        </div>
                        <div className="clinical-trials-results-container">
                            {filteredResults.map((result, index) => (
                                <div 
                                    role='button'
                                    key={result.id} 
                                    className="result" 
                                    onClick={() => navigate(`/study-details/${result.id}`)}
                                >
                                    <p>{result.nombre}</p>
                                    <p>{result.estado}</p>
                                    <p>{result.provincia}</p>
                                    <p>{result.enfermedad}</p>
                                    <p>{result.fase}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
