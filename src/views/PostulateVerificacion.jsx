import React, { useState } from 'react';
import '../styles/PostulateVerificacion.css';
import { useNavigate, useParams } from 'react-router-dom';
import { actividadesFisicas } from '../assets/enums/ActividadesFisicas';
import { alergiasConocidas } from '../assets/enums/AlergiasConocidas';
import { cirugiasPrevias } from '../assets/enums/CirugiasPrevias';
import { condicionesCronicas } from '../assets/enums/CondicionesCronicas';
import { consumoAlcohol } from '../assets/enums/ConsumoAlcohol';
import { dietasYNutricion } from '../assets/enums/DietasYNutricion';
import { generos } from '../assets/enums/Generos';
import { habitosFumar } from '../assets/enums/HabitosFumar';
import { historialesMedicos } from '../assets/enums/HistorialesMedicos';
import { medicamentosActuales } from '../assets/enums/MedicamentosActuales';
import { nivelesEducativos } from '../assets/enums/NivelesEducativos';
import { ocupaciones } from '../assets/enums/Ocupaciones';
import { applyToTrial } from '../apis/trialApi';
import { sendAcceptanceNotification } from '../apis/userApi';

export const PostulateVerificacion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nombre: '',
        fechaNacimiento: '',
        sexo: '',
        direccion: '',
        telefono: '',
        email: '',
        historialMedico: '',
        medicamentos: '',
        alergias: '',
        cirugias: '',
        condicionesCronicas: '',
        razaEtnia: '',
        nivelEducativo: '',
        ocupacion: '',
        fumar: '',
        alcohol: '',
        actividadFisica: '',
        dieta: '',
        consentimiento: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async () => {
        try {
            await applyToTrial(id);
            await sendAcceptanceNotification(id);
            navigate(`/postulacion-exitosa/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='veri-page'>
            <div className='veri-container'>
                <h2>¿Estás seguro de que deseas postularte?</h2>
                <p>Al postularte, el investigador recibirá tu información de contacto y podrá contactarte para más información.</p>
                <div className='veri-datos-postulacion'>
                    <div className='veri-datos-postulacion-column'>
                        <h3>Información Personal</h3>
                        <input
                            type='date'
                            name='fechaNacimiento'
                            placeholder='Fecha de nacimiento'
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                        />
                        <select name='sexo' value={formData.sexo} onChange={handleChange}>
                            <option value=''>Selecciona tu sexo</option>
                            {generos.map((genero, index) => (
                                <option key={index} value={genero}>{genero}</option>
                            ))}
                        </select>
                        <input
                            type='text'
                            name='direccion'
                            placeholder='Dirección'
                            value={formData.direccion}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            name='telefono'
                            placeholder='Teléfono'
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='veri-datos-postulacion-column'>
                        <h3>Información Médica</h3>
                        <select name='historialMedico' value={formData.historialMedico} onChange={handleChange}>
                            <option value=''>Selecciona tu historial médico</option>
                            {historialesMedicos.map((historial, index) => (
                                <option key={index} value={historial}>{historial}</option>
                            ))}
                        </select>
                        <select name='medicamentos' value={formData.medicamentos} onChange={handleChange}>
                            <option value=''>Selecciona tus medicamentos actuales</option>
                            {medicamentosActuales.map((medicamento, index) => (
                                <option key={index} value={medicamento}>{medicamento}</option>
                            ))}
                        </select>
                        <select name='alergias' value={formData.alergias} onChange={handleChange}>
                            <option value=''>Selecciona tus alergias conocidas</option>
                            {alergiasConocidas.map((alergia, index) => (
                                <option key={index} value={alergia}>{alergia}</option>
                            ))}
                        </select>
                        <select name='cirugias' value={formData.cirugias} onChange={handleChange}>
                            <option value=''>Selecciona tus cirugías previas</option>
                            {cirugiasPrevias.map((cirugia, index) => (
                                <option key={index} value={cirugia}>{cirugia}</option>
                            ))}
                        </select>
                        <select name='condicionesCronicas' value={formData.condicionesCronicas} onChange={handleChange}>
                            <option value=''>Selecciona tus condiciones crónicas</option>
                            {condicionesCronicas.map((condicion, index) => (
                                <option key={index} value={condicion}>{condicion}</option>
                            ))}
                        </select>
                        <h3>Información Demográfica</h3>
                        <select name='nivelEducativo' value={formData.nivelEducativo} onChange={handleChange}>
                            <option value=''>Selecciona tu nivel educativo</option>
                            {nivelesEducativos.map((nivel, index) => (
                                <option key={index} value={nivel}>{nivel}</option>
                            ))}
                        </select>
                        <select name='ocupacion' value={formData.ocupacion} onChange={handleChange}>
                            <option value=''>Selecciona tu ocupación</option>
                            {ocupaciones.map((ocupacion, index) => (
                                <option key={index} value={ocupacion}>{ocupacion}</option>
                            ))}
                        </select>
                        <h3>Información sobre el Estilo de Vida</h3>
                        <select name='fumar' value={formData.fumar} onChange={handleChange}>
                            <option value=''>Selecciona tus hábitos de fumar</option>
                            {habitosFumar.map((habito, index) => (
                                <option key={index} value={habito}>{habito}</option>
                            ))}
                        </select>
                        <select name='alcohol' value={formData.alcohol} onChange={handleChange}>
                            <option value=''>Selecciona tu consumo de alcohol</option>
                            {consumoAlcohol.map((consumo, index) => (
                                <option key={index} value={consumo}>{consumo}</option>
                            ))}
                        </select>
                        <select name='actividadFisica' value={formData.actividadFisica} onChange={handleChange}>
                            <option value=''>Selecciona tu actividad física</option>
                            {actividadesFisicas.map((actividad, index) => (
                                <option key={index} value={actividad}>{actividad}</option>
                            ))}
                        </select>
                        <select name='dieta' value={formData.dieta} onChange={handleChange}>
                            <option value=''>Selecciona tu dieta y nutrición</option>
                            {dietasYNutricion.map((dieta, index) => (
                                <option key={index} value={dieta}>{dieta}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='veri-consentimiento'>
                    <label>
                        <input
                            type='checkbox'
                            name='consentimiento'
                            checked={formData.consentimiento}
                            onChange={handleChange}
                        />
                        Acepto los términos y condiciones del estudio.
                    </label>
                </div>
                <div className='veri-button-group'>
                    <button
                        className='veri-button cancel'
                        onClick={() => navigate(-1)}
                    >Cancelar
                    </button>
                    <button
                        className='veri-button submit'
                        onClick={handleSubmit}
                        disabled={!formData.consentimiento}
                    >
                        Postularse
                    </button>
                </div>
            </div>
        </div>
    );
}
