import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null); // Nuevo estado para el rol

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const userRole = localStorage.getItem('role'); 
            setRole(userRole);
        }
    }, []);

    const login = (token, userRole) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole); 
        setIsAuthenticated(true);
        setRole(userRole);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role'); 
        setIsAuthenticated(false);
        setRole(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);