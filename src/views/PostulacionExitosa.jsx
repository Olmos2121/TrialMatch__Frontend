import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrialById, applyToTrial } from '../apis/trialApi';
import { sendAcceptanceNotification } from '../apis/userApi';
import '../styles/PostulacionExitosa.css';
import { Footer } from '../components/Footer';

export const PostulacionExitosa = () => {
    const { id } = useParams();
    const [result, setResult] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trial = await getTrialById(id);
                setResult(trial.clinicalTrial);

                await applyToTrial(id);

                await sendAcceptanceNotification(id);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [id]);

    return (
        <>
            <div className="postulacionExi-container">
                <h1>¡Postulación Exitosa!</h1>
                <p>¡Tu postulación ha sido enviada con éxito! A continuación, te mostramos los detalles del estudio al que te has postulado:</p>
                <div className="postulacionExi-details">
                    <p><strong>Investigador:</strong> {result.investigador}</p>
                    <p><strong>Fecha de Inicio:</strong> {result.fechaInicio}</p>
                    <p><strong>Fecha de Fin:</strong> {result.fechaFin}</p>
                    <p><strong>Estado:</strong> {result.estado}</p>
                    <p><strong>Fase:</strong> {result.fase}</p>
                    <p><strong>Enfermedad:</strong> {result.enfermedad}</p>
                    <p><strong>Provincia:</strong> {result.provincia}</p>
                    <p><strong>Nombre del Estudio:</strong> {result.nombre}</p>
                    <p><strong>Rango Etario Máximo:</strong> {result.rangoEtarioMax}</p>
                    <p><strong>Rango Etario Mínimo:</strong> {result.rangoEtarioMin}</p>
                    <p><strong>Candidatos Sanos:</strong> {result.candidatosSanos}</p>
                </div>
                <button className="button" onClick={() => navigate('/clinical-trials')}>« Volver a los ensayos clínicos</button>
            </div>
            <Footer />
        </>
    );
}
