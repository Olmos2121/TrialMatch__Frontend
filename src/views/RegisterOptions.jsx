import React from 'react'
import img from '../assets/images/login_img.png'
import { RegisterFooter } from '../components/RegisterFooter'
import '../styles/RegisterOptions.css'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const RegisterOptions = () => {

    const navigate = useNavigate();

    const handlePatient = () => {
        return navigate("/register/patient") 
    }

    const handleInvestigator = () => {
        return navigate("/register/investigator")
    }

    return (
        <div className="login">
            <div className='left_side'>
                <img src={img} alt="water" />
                <h1>Su participacion sera de ayuda para investigar y salvar muchas vidas</h1>
            </div>
            <div className='right_side'>
                <div className='login_container'>
                    <div className='registerOptions'>
                        <h1>Bienvenidos a <span style={{ color: '#2C9CED' }}>TrialMatch</span></h1>
                        <h2>Gracias por confiar en nosotros.</h2>
                        <h2>Por favor elegi como deseas registrarte:</h2>
                        <div className='loginBtn'>
                            <button onClick={handlePatient}>Paciente</button>
                            <button onClick={handleInvestigator}>Investigador</button>
                        </div>
                        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                    </div>
                </div>
                <RegisterFooter />
            </div>
        </div>
    )
}
