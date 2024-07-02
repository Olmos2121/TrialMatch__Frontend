import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './views/Home.jsx';
import { AboutUs } from './views/AboutUs.jsx';
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
import { CreateTrial } from './views/CreateTrial.jsx';
import { StudyDetails } from './views/StudyDetails.jsx';
import { PrivateRoute } from './auth/PrivateRoute.jsx';
import { PostulateVerificacion } from './views/PostulateVerificacion.jsx';
import { PostulacionExitosa } from './views/PostulacionExitosa.jsx'

export const App = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={isAuthenticated ? <UserHome /> : <Home />} />
                        <Route path="about-us" element={<AboutUs />} />
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="*" element={<Home />} />
                        <Route path="clinical-trials" element={<PrivateRoute element={<ClinicalTrials />} roles={['PATIENT']} />} />
                        <Route path="/create-trial" element={<PrivateRoute element={<CreateTrial />} roles={['INVESTIGATOR']} />} />
                        <Route path="/study-details/:id" element={<PrivateRoute element={<StudyDetails />} roles={['PATIENT']} />} />
                        <Route path='/postulacion-exitosa/:id' element={<PrivateRoute element={<PostulacionExitosa />} roles={['PATIENT']} />} />
                    </Route>
                    <Route path="/" element={<LayoutWithoutHeader />}>
                        <Route path="register" element={<RegisterOptions />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register/patient" element={<RegisterPatient />} />
                        <Route path="login/investigator" element={<LoginInvestigator />} />
                        <Route path="register/investigator" element={<RegisterInvestigator />} />
                        <Route path="login/options" element={<LoginOptions />} />
                        <Route path='/postulate/verificacion/:id' element={<PrivateRoute element={<PostulateVerificacion />} roles={['PATIENT']} />} />
                    </Route>
                </Routes>
            </main>
            <ToastContainer />
        </Router>
    );
}