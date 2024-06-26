import React, { useEffect, useState } from 'react';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';
import { register } from '../apis/registerApi';
import { RegisterHeader } from '../components/RegisterHeader';
import { toast } from 'react-toastify';

export const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorEmail, setErrorInvalidEmail] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [errorUsedEmail, setErrorEmailUsed] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (registrationSuccess) {
            toast.success("Registro exitoso", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,

            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            setRegistrationSuccess(false);
        }
    }, [registrationSuccess]);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const validateForm = () => {
        const { firstName, lastName, email, password } = formData;
        let formValid = true;
        let pattern = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if (!firstName.trim()) {
            setError(true);
            formValid = false;
        }

        if (!lastName.trim()) {
            setError(true);
            formValid = false;
        }

        if (!email.trim()) {
            setError(true);
            formValid = false;
        } else if (!pattern.test(email)) {
            setError(false);
            setErrorInvalidEmail(true);
            formValid = false;
        }

        if (!password.trim()) {
            setError(true);
            formValid = false;
        }

        return formValid;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setError(false);
            setErrorInvalidEmail(false);

            try {
                const { firstName, lastName, email, password } = formData;
                const data = await register(firstName, lastName, email, password);
                if (data) {
                    setRegistrationSuccess(true);
                } else {
                    throw new Error("Registration failed");
                }
            } catch (error) {
                setErrorEmailUsed(true);
            }
        }
    };

    return (
        <>
            <RegisterHeader />
            <div className='register'>
                <div className='register_container'>
                    <h2>Registrese para una cuenta participante</h2>
                    <div className='registerForm'>
                        <h3>Crear Cuenta</h3>
                        <form className='registerForm_container' onSubmit={submitForm}>
                            <div className='data_container'>
                                <div className='dataLabel_container'>
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder='Ingrese su nombre'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className='input_name'
                                    />
                                </div>
                                <div className='dataLabel_container'>
                                    <label>Apellido</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder='Ingrese su apellido'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className='input_lastname'
                                    />
                                </div>
                            </div>
                            <div className='data_container'>
                                <div className='dataLabel_container'>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Ingrese su Email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className='input_email'
                                    />
                                    {errorEmail && (
                                        <p className="error">
                                            Formato de Email incorrecto
                                        </p>
                                    )}
                                </div>
                                <div className='dataLabel_container'>
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder='Ingrese su contraseña'
                                        value={formData.password}
                                        onChange={handleChange}
                                        className='input_password'
                                    />
                                </div>
                            </div>
                            <div className='submit_container'>
                                <button type="submit">Crear Cuenta</button>
                            </div>
                        </form>
                    </div>
                    {error && (
                        <p className="error">
                            Todos los campos son obligatorios
                        </p>
                    )}
                    {errorUsedEmail && (
                        <p className="error">
                            Email ya registrado
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

