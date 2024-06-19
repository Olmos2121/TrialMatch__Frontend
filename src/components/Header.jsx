import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faShieldAlt, faUserPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="nav-link">
                    <FontAwesomeIcon icon={faHome} className="icon" /> Inicio
                </Link>
                <Link to="/about-us" className="nav-link">
                    <FontAwesomeIcon icon={faInfoCircle} className="icon" /> Sobre Nosotros
                </Link>
                <Link to="/register" className="nav-link">
                    <FontAwesomeIcon icon={faUserPlus} className="icon" /> Registrarse
                </Link>
                <Link to="/login" className="nav-link">
                    <FontAwesomeIcon icon={faSignInAlt} className="icon" /> Iniciar Sesión
                </Link>
            </nav>
        </header>
    );
}

export default Header;
