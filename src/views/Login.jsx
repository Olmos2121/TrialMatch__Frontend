import React from 'react';
import '../styles/Login.css';
import img from '../assets/images/login_img.png'

export const Login = () => {
    return (
        <div className="login">
            <div className='left_side'>
                <img src={img} alt="water" />
                <h1>Su participacion sera de ayuda para investigar y salvar muchas vidas</h1>
            </div>
            <div className='right_side'>
            <h1>Bienvenidos a <span style={{ color: '#2C9CED' }}>TrialMatch</span></h1>
                <div className='login_container'>
                    <div className='loginForm'>
                        <div className='logdataLabel_container'>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='Ingrese su Email'
                                // value={formData.email}
                                // onChange={handleChange}
                            />
                        </div>
                        <div className='logdataLabel_container'>
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Ingrese su contraseña'
                            // value={formData.password}
                            // onChange={handleChange}
                            />
                        </div>
                        <button>Iniciar Sesión</button>
                        <div className='loginOptions'>
                            <h6>¿No tienes cuenta?</h6>
                            <a href='#'>registrate</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


