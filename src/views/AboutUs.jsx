import React from 'react';
import '../styles/AboutUs.css';
import { Footer } from '../components/Footer';

export const AboutUs = () => {
    return (
        <>
            <div className='about-us'>
                <h1>Sobre Nosotros</h1>
                <section className='mission-vision'>
                    <div className='section'>
                        <h2>Nuestra Misión</h2>
                        <p>
                            Nuestra misión es facilitar el acceso a ensayos clínicos innovadores y de alta calidad,
                            conectando laboratorios de investigación con pacientes que buscan opciones avanzadas de tratamiento.
                            Nos esforzamos por promover la investigación médica y mejorar la salud global proporcionando una
                            plataforma eficiente y accesible para todos los involucrados en el proceso de investigación clínica.
                        </p>
                    </div>
                    <div className='section'>
                        <h2>Nuestra Visión</h2>
                        <p>
                            Nuestra visión es ser el principal enlace entre los laboratorios de investigación y los pacientes,
                            liderando el camino hacia avances médicos significativos. Aspiramos a transformar la manera en que se
                            conducen los ensayos clínicos, haciendo que la participación en la investigación médica sea más accesible,
                            transparente y beneficiosa para todos.
                        </p>
                    </div>
                </section>
                <h2 className='valuesTitle'>Nuestros Valores</h2>
                <section className='values'>
                    <div className='value'>
                        <h3>Servicios</h3>
                        <p>
                            Nos dedicamos a ofrecer un servicio excepcional a laboratorios y pacientes, proporcionando una plataforma
                            intuitiva y de fácil acceso que facilita la conexión y la participación en ensayos clínicos.
                        </p>
                    </div>
                    <div className='value'>
                        <h3>Integridad</h3>
                        <p>
                            Mantenemos un compromiso inquebrantable con la ética y la transparencia en todas nuestras operaciones,
                            asegurándonos de que toda la información sea clara, precisa y confiable.
                        </p>
                    </div>
                    <div className='value'>
                        <h3>Respeto</h3>
                        <p>
                            Valoramos y respetamos a todas las personas involucradas en los ensayos clínicos, reconociendo la importancia
                            de la diversidad y la inclusión en la investigación médica.
                        </p>
                    </div>

                    <div className='value'>
                        <h3>Innovación</h3>
                        <p>
                            Fomentamos una cultura de innovación continua, buscando constantemente nuevas formas de mejorar nuestra
                            plataforma y los servicios que ofrecemos para apoyar los avances en la investigación clínica.
                        </p>
                    </div>
                    <div className='value'>
                        <h3>Trabajo en equipo</h3>
                        <p>
                            Creemos en el poder del trabajo en equipo y la colaboración, tanto dentro de nuestra organización como con
                            nuestros socios y usuarios, para lograr resultados positivos y significativos en la investigación médica.
                        </p>
                    </div>
                    <div className='value'>
                        <h3>Sostenibilidad</h3>
                        <p>
                            Nos comprometemos a operar de manera sostenible, minimizando nuestro impacto ambiental y promoviendo prácticas 
                            responsables en todas nuestras actividades de investigación clínica. Creemos en la importancia de proteger el 
                            medio ambiente para las futuras generaciones.
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};
