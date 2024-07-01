import React from 'react';
import '../styles/AboutUs.css'
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const AboutUs = () => {
    return (
        <>
            <div className='about-us'>
                <h1>Sobre Nosotros</h1>
                <h2>Nuestra Misión</h2>
                <p>Nuestra misión es facilitar el acceso a ensayos clínicos innovadores...</p>
                <h2>Nuestra Visión</h2>
                <p>Nuestra visión es ser el principal enlace entre los laboratorios...</p>
                {/* Resto del contenido de la página de "Sobre Nosotros" */}
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
