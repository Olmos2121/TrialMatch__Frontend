import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import img from '../assets/images/login_img.png'
import { RegisterFooter } from '../components/RegisterFooter';
import { Link, useNavigate } from 'react-router-dom';
import { loginInvestigator } from '../apis/registerApi';
import { toast } from 'react-toastify';

export const LoginInvestigator = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    useEffect(() => {
        if (loginSuccess) {
            toast.success("Inicio de sesión exitoso", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                setLoginSuccess(false);
                window.location.href = '/';
            }, 2000);
        }
    }, [loginSuccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) return;
        try {
            const { email, password } = formData;
            const data = await loginInvestigator(email, password);
            localStorage.setItem('token', data.access_token);

            const decodedToken = decodeJWT(data.access_token);
            const role = decodedToken.role;
            localStorage.setItem('role', role);

            setLoginSuccess(true);
        } catch (error) {
            setError(true);
            console.error(error);
        }
    }

    return (
        <div className="login">
            <div className='left_side'>
                <img src={img} alt="water" />
                <h1>Su participacion sera de ayuda para investigar y salvar muchas vidas</h1>
            </div>
            <div className='right_side'>
                <div className='login_container'>
                    <form onSubmit={handleSubmit} className='loginForm'>
                        <h1>Bienvenidos a <span style={{ color: '#2C9CED' }}>TrialMatch</span></h1>
                        <div className='logdataLabel_container'>
                            <label>Email de la organización</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='Ingrese su Email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='logdataLabel_container'>
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Ingrese su contraseña'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        {error && <p className='error'>Email o constraseña incorrecto</p>}
                        <button type='submit'>Iniciar Sesión</button>
                        <div className='loginOptions'>
                            <h6>¿No tienes cuenta?</h6>
                            <Link to="/register">registrate</Link>
                        </div>
                    </form>
                </div>
                <RegisterFooter />
            </div>
        </div>
    );
};


