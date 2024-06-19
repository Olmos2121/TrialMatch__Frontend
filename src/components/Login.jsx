import React from 'react';
import '../styles/Login.css';

const Login = () => {
    return (
        <div className="login">
            <h1>Iniciar Sesión</h1>
            <form>
                <label>Email</label>
                <input type="email" name="email" />
                <label>Contraseña</label>
                <input type="password" name="password" />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
