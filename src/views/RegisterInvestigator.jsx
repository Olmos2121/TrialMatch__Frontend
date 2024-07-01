import React from 'react'
import { RegisterHeader } from '../components/RegisterHeader'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { registerInvestigator } from '../apis/registerApi'

export const RegisterInvestigator = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorUsedEmail, setErrorEmailUsed] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        cuit: '',
        email: '',
        phone: '',
        address: '',
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
                navigate("/login/investigator");
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

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const { companyName, cuit, email, phone, address, password } = formData;
            await registerInvestigator({ companyName, cuit, email, phone, address, password });
            setRegistrationSuccess(true);

        } catch (error) {
            setErrorEmailUsed(true);
            console.error(error);
        }

    }


    return (
        <>
            <RegisterHeader />
            <div className='register'>
                <div className='register_container'>
                    <h2>Registrese para una cuenta de investigador</h2>
                    <div className='registerForm'>
                        <h3>Crear Cuenta</h3>
                        <form className='registerForm_container' onSubmit={submitForm}>
                            <div className='data_container'>
                                <div className='dataLabel_container'>
                                    <label>Razon Social</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        placeholder='Ingrese la razón social de su empresa'
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='dataLabel_container'>
                                    <label>CUIT</label>
                                    <input
                                        type="text"
                                        name="cuit"
                                        placeholder='Ingrese el CUIT de su empresa'
                                        value={formData.cuit}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='data_container'>
                                <div className='dataLabel_container'>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Ingrese el Email de la empresa'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='dataLabel_container'>
                                    <label>Telefono</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder='Ingrese el telefono de la empresa'
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='data_container'>
                                <div className='dataLabel_container'>
                                    <label>Direccion</label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder='Ingrese la direccion de la empresa'
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='dataLabel_container'>
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder='Ingrese una contraseña'
                                        value={formData.password}
                                        onChange={handleChange}
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
                </div >
            </div >
        </>
    )
}
