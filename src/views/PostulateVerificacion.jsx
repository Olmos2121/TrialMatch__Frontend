import React, { useState, useEffect } from 'react';
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
import { applyToTrial, saveUserInfo } from '../apis/trialApi';
import { sendAcceptanceNotification } from '../apis/userApi';
import { LoadingModal } from './modals/LoadingModal';

export const PostulateVerificacion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        fechaNacimiento: '',
        genero: '',
        direccion: '',
        telefono: '',
        historialMedico: '',
        medicamentosActuales: '',
        alergiasConocidas: '',
        cirugiasPrevias: '',
        enfermedadesCronicas: '',
        nivelEducativo: '',
        ocupacion: '',
        habitosFumar: '',
        habitosAlcohol: '',
        habitosEjercicio: '',
        habitosAlimenticios: '',
        consentimiento: false,
    });
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await saveUserInfo(formData, id);
            await applyToTrial(id);
            await sendAcceptanceNotification(id);
            navigate(`/postulacion-exitosa/${id}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = () => {
        return Object.values(formData).every((value) => value !== '') && formData.consentimiento === true;
    }

    useEffect(() => {
        setFormValid(isFormValid());
    }, [formData]);

    return (
        <div className='veri-page'>
            <div className='veri-container'>
                <h2>¿Estás seguro de que deseas postularte?</h2>
                <p>Al postularte, el investigador recibirá tu información de contacto y podrá contactarte para más información.</p>
                <div className='veri-datos-postulacion'>
                    <div className='veri-datos-postulacion-column'>
                        <h3>Información Personal</h3>
                        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                        <input
                            type='date'
                            name='fechaNacimiento'
                            placeholder='Fecha de nacimiento'
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                        />
                        <select name='genero' value={formData.genero} onChange={handleChange}>
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
                        <select name='medicamentosActuales' value={formData.medicamentosActuales} onChange={handleChange}>
                            <option value=''>Selecciona tus medicamentos actuales</option>
                            {medicamentosActuales.map((medicamento, index) => (
                                <option key={index} value={medicamento}>{medicamento}</option>
                            ))}
                        </select>
                        <select name='alergiasConocidas' value={formData.alergiasConocidas} onChange={handleChange}>
                            <option value=''>Selecciona tus alergias conocidas</option>
                            {alergiasConocidas.map((alergia, index) => (
                                <option key={index} value={alergia}>{alergia}</option>
                            ))}
                        </select>
                        <select name='cirugiasPrevias' value={formData.cirugiasPrevias} onChange={handleChange}>
                            <option value=''>Selecciona tus cirugías previas</option>
                            {cirugiasPrevias.map((cirugia, index) => (
                                <option key={index} value={cirugia}>{cirugia}</option>
                            ))}
                        </select>
                        <select name='enfermedadesCronicas' value={formData.enfermedadesCronicas} onChange={handleChange}>
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
                        <select name='habitosFumar' value={formData.habitosFumar} onChange={handleChange}>
                            <option value=''>Selecciona tus hábitos de fumar</option>
                            {habitosFumar.map((habito, index) => (
                                <option key={index} value={habito}>{habito}</option>
                            ))}
                        </select>
                        <select name='habitosAlcohol' value={formData.habitosAlcohol} onChange={handleChange}>
                            <option value=''>Selecciona tu consumo de alcohol</option>
                            {consumoAlcohol.map((consumo, index) => (
                                <option key={index} value={consumo}>{consumo}</option>
                            ))}
                        </select>
                        <select name='habitosEjercicio' value={formData.habitosEjercicio} onChange={handleChange}>
                            <option value=''>Selecciona tu actividad física</option>
                            {actividadesFisicas.map((actividad, index) => (
                                <option key={index} value={actividad}>{actividad}</option>
                            ))}
                        </select>
                        <select name='habitosAlimenticios' value={formData.habitosAlimenticios} onChange={handleChange}>
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
                        className={isFormValid() ? 'veri-button submit' : 'veri-button postular disabled'}
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                    >
                        {isFormValid() ? 'Postularme' : 'Completa todos los campos'}
                    </button>
                </div>
            </div>
            {isLoading && <LoadingModal
                isOpen={isLoading}
            />}
        </div>
    );
}
