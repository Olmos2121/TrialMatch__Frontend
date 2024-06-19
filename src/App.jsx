import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import AboutUs from './components/AboutUs.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import './styles/index.css';

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
