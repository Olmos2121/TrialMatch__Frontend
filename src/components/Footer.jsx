import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer"> 
            <p>Copyright © 2024 | XYX TrialMatch. Todos los derechos reservados.</p>
            <p><Link to="/terms">Términos y condiciones</Link> | <Link to="/privacy-policy">Política de privacidad</Link></p>
        </footer>
    );
}

export default Footer;