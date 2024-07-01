import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserHeader } from './UserHeader.jsx';
import { Header } from './Header.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export const Layout = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div>
            {isAuthenticated ? <UserHeader /> : <Header />}
            <Outlet />
        </div>
    );
}