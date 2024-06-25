import React from 'react';
import '../styles/Register.css';

const Register = () => {
    return (
        <div className='register'>
            <h1>Registrarse</h1>
            <form>
                <label>Nombre</label>
                <input type="text" name="firstName" />
                <label>Apellido</label>
                <input type="text" name="lastName" />
                <label>Email</label>
                <input type="email" name="email" />
                <label>Contraseña</label>
                <input type="password" name="password" />
                <button type="submit">Crear Cuenta</button>
            </form>
        </div>
    );
};

export default Register;
