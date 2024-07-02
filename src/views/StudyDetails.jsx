import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrialById } from '../apis/trialApi';
import { Footer } from '../components/Footer';
import '../styles/StudyDetails.css';

export const StudyDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [trial, setTrial] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTrialById(id);
                setTrial(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);


    return (
        <>
            <div className="study-details">
                <h1>{trial.nombre}</h1>
                <button className="back-button" onClick={() => navigate(-1)}>« Resultados de la búsqueda</button>

                <section className="summary">
                    <h2>Breve resumen</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Afección/Enfermedad</th>
                                <th>Provincia</th>
                                <th>Fase</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{trial.enfermedad}</td>
                                <td>{trial.provincia}</td>
                                <td>{trial.fase}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="design-eligibility">
                    <div className="design">
                        <h2>Diseño del estudio</h2>
                        <p><strong>Investigador:</strong> {trial.investigador}</p>
                        <p><strong>Fecha estimada de inicio:</strong> {trial.fechaInicio}</p>
                        <p><strong>Fecha estimada de finalización:</strong> {trial.fechaFin}</p>
                    </div>
                    <div className="eligibility">
                        <h2>Elegibilidad</h2>
                        <p><strong>Edad:</strong> {trial.rangoEtarioMin} - {trial.rangoEtaioMax}</p>
                        <p><strong>Género:</strong> {trial.genero}</p>
                        <p><strong>Candidatos sanos requeridos:</strong> {trial.candidatosSanos}</p>
                    </div>
                </section>

                {trial.estado === "reclutando" && (
                    <button className="register-button" onClick={() => navigate(`/postulate/verificacion/${trial.id}`)}>Postulate</button>
                )}
            </div>
            <Footer />
        </>
    );
};
