import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faUserPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/Logo.png";
import "../styles/Header.css";

export const Header = () => {
    return (
        <header className="header">
            <NavLink to="/" className="logo-container">
                <img src={logo} alt="TrialMatch" className="logo-img" /> 
                <h2 className="h2">TrialMatch</h2>
            </NavLink>
            <nav className="nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FontAwesomeIcon icon={faHome} className="icon" /> Inicio
                </NavLink>
                <NavLink to="/about-us" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FontAwesomeIcon icon={faInfoCircle} className="icon" /> Sobre Nosotros
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FontAwesomeIcon icon={faUserPlus} className="icon" /> Registrarse
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FontAwesomeIcon icon={faSignInAlt} className="icon" /> Iniciar Sesión
                </NavLink>
            </nav>
            <div className="relleno">
                <p>a </p>
            </div>
        </header>
    );
};