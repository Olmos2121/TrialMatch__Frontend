import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="terms-block">
                <p>
                    <Link to="/terms" className="terms-text">Términos y condiciones</Link>
                    <Link to="/privacy-policy" className="terms-text">Política de privacidad</Link>
                </p>
            </div>
            <div className="copyright-block">
                <p>Copyright © 2024 | XYX TrialMatch. Todos los derechos reservados.</p>
            </div>
            <div className="icons-block">
                <FontAwesomeIcon icon={faFacebook} className="icon" />
                <FontAwesomeIcon icon={faXTwitter} className="icon" />
                <FontAwesomeIcon icon={faInstagram} className="icon" />
            </div>
        </footer>
    );
}