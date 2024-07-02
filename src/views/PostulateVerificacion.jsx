import React from 'react';
import '../styles/PostulateVerificacion.css';
import { useNavigate, useParams } from 'react-router-dom';

export const PostulateVerificacion = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className='veri-page'>
            <div className='veri-container'>
                <h2>¿Estás seguro de que deseas postularte?</h2>
                <p>Al postularte, el investigador recibirá tu información de contacto y podrá contactarte para más información.</p>
                <div className='veri-button-group'>
                    <button
                        className='veri-button cancel'
                        onClick={() => navigate(-1)}
                    >Cancelar
                    </button>
                    <button
                        className='veri-button submit'
                        onClick={() => navigate(`/postulacion-exitosa/${id}`)}
                    >
                        Postularse

                    </button>
                </div>
            </div>
        </div>
    );
}
