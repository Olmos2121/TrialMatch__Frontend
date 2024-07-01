import React, { useContext } from 'react';
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
import { LoginInvestigator } from './views/LoginInvestigator.jsx';
import { LoginOptions } from './views/LoginOptions.jsx';
import { UserHome } from './views/UserHome.jsx';
import { Layout } from './components/Layout.jsx';
import { LayoutWithoutHeader } from './components/LayoutWithoutHeader.jsx';
import { AuthContext } from './contexts/AuthContext.jsx';
import { ClinicalTrials } from './views/ClinicalTrials.jsx';

export const App = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={isAuthenticated ? <UserHome/> : <Home/>} />
                        <Route path="about-us" element={<AboutUs />} />
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="*" element={<Home />} />
                        <Route path="clinical-trials" element={<ClinicalTrials />} />
                    </Route>
                    <Route path="/" element={<LayoutWithoutHeader />}>
                        <Route path="register" element={<RegisterOptions />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register/patient" element={<RegisterPatient />} />
                        <Route path="login/investigator" element={<LoginInvestigator />} />
                        <Route path="register/investigator" element={<RegisterInvestigator />} />
                        <Route path="login/options" element={<LoginOptions />} />
                    </Route>
                </Routes>
            </main>
            <ToastContainer />
        </Router>
    );
}