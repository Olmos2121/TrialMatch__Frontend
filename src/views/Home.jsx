import React from 'react';
import userExp from '../assets/images/user_experience.png';
import trialImg from '../assets/images/trial_img.png'
import '../styles/Home.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';


export const Home = () => {
    return (
        <>
            <div className="home">
                <div className='links-container'>
                    <a className='link-block' href="">
                        <h3>Ensayos clinicos</h3>
                    </a>
                    <a className='link-block' href="">
                        <h3>Historia, politicas y derecho</h3>
                    </a>
                    <a className='link-block' href="">
                        <h3>Areas de investigacion</h3>
                    </a>
                </div>
                <div className='coments-block'>
                    <div className='coment'>
                        <img src={userExp} alt="Imagen de usuario" />
                    </div>
                    <div className='coment'>
                        <img src={trialImg} alt="Imagen de ensayo clinico" />
                    </div>
                </div>
                <div className='coments-foot'>
                    <div className='footer-coment'>
                        <h2><b>Se parte de la red de servicios para ensayos clinicos mas grande del pais.</b></h2>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};