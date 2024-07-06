import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrialById } from '../apis/trialApi';
import { Footer } from '../components/Footer';
import { MoreInfoModal } from './modals/MoreInfoModal';
import '../styles/StudyDetails.css';

export const StudyDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [trial, setTrial] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPostulating, setIsPostulating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTrialById(id);
                setTrial(result.clinicalTrial);
                setIsPostulating(result.postulated);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDisable = () => {
        return;
    }

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
                <button className="more-info-button" onClick={toggleModal}>Más información</button>
                <section className="design-eligibility">
                    <div className="design">
                        <h2>Diseño del estudio</h2>
                        <p><strong>Investigador:</strong> {trial.investigador}</p>
                        <p><strong>Fecha estimada de inicio:</strong> {trial.fechaInicio}</p>
                        <p><strong>Fecha estimada de finalización:</strong> {trial.fechaFin}</p>
                    </div>
                    <div className="eligibility">
                        <h2>Elegibilidad</h2>
                        <p><strong>Edad:</strong> {trial.rangoEtarioMin} - {trial.rangoEtarioMax}</p>
                        <p><strong>Género:</strong> {trial.genero}</p>
                        <p><strong>Candidatos sanos requeridos:</strong> {trial.candidatosSanos}</p>
                    </div>
                </section>

                {trial.estado === "reclutando" && (
                    <button
                        className={isPostulating ? "register-button postulated" : "register-button"}
                        onClick={() => isPostulating ? handleDisable : navigate(`/postulate/verificacion/${trial.id}`)}
                    >
                        {isPostulating ? "Usuario ya postulado" : "Postúlate"}
                    </button>
                )}
            </div>
            <Footer />
            <MoreInfoModal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
                trial={trial}
            />
        </>
    );
};
