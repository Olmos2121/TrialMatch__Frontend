import React from 'react'
import { Footer } from '../components/Footer'
import '../styles/UserHome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faComments, faVial, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import userHomeImg from '../assets/images/UserHomeImg.png'

export const UserHome = () => {
    const navigate = useNavigate();

    const handleTrial = () => {
        navigate('/clinical-trials')
    }

    return (
        <>
            <div className='userHome'>
                <div className='image-container'>
                    <img src={userHomeImg} alt="Imagen de usuario" />
                </div>
                <div className='homeOptions'>
                    <button onClick={handleTrial} className='option'>
                        <div className='optionImg'>
                            <FontAwesomeIcon icon={faVial} className='optionIcon' />
                        </div>
                        <h3>Encuentre un Ensayo clinico</h3>
                        <FontAwesomeIcon icon={faAnglesRight} className='userHomeIcon' />
                    </button>
                    <button className='option'>
                        <div className='optionImg'>
                            <FontAwesomeIcon icon={faComments} className='optionIcon' />
                        </div>
                        <h3>Testimonios</h3>
                        <FontAwesomeIcon icon={faAnglesRight} className='userHomeIcon' />

                    </button>
                    <button className='option'>
                        <div className='optionImg'>
                            <FontAwesomeIcon icon={faAddressBook} className='optionIcon' />
                        </div>
                        <h3>Contactate con un profesional</h3>
                        <FontAwesomeIcon icon={faAnglesRight} className='userHomeIcon' />
                    </button>
                </div>
                <Footer />
            </div>
        </>
    )
}
