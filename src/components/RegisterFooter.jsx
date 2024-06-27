import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/RegisterFooter.css'

export const RegisterFooter = () => {
    return (
        <>
            <footer className="register_footer">
                <p>Copyright © 2024 <span style={{ color: '#91C2E3' }}>TrialMatch</span> Todos los derechos reservados.</p>
                <Link to="/terms">Términos y condiciones</Link>
            </footer>
        </>
    )
}
