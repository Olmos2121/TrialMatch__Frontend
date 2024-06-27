import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './views/Home.jsx';
import AboutUs from './views/AboutUs.jsx';
import PrivacyPolicy from './views/PrivacyPolicy.jsx';
import { RegisterOptions } from './views/RegisterOptions.jsx';
import { Login } from './views/Login.jsx';
import './styles/index.css';
import { ToastContainer } from 'react-toastify';
import { RegisterPatient } from './views/RegisterPatient.jsx';
import { RegisterInvestigator } from './views/RegisterInvestigator.jsx'

export const App = () => {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/register" element={<RegisterOptions />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register/patient" element={<RegisterPatient />} />
                    <Route path="*" element={<Home />} />
                    <Route path='/register/investigator' element={<RegisterInvestigator />} />
                </Routes>
            </main>
            <ToastContainer />
        </Router>
    );
}