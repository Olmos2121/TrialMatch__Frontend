import { API_BASE_URL } from "../../config";

const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export const register = async (name, lastName, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname: name, lastname: lastName, email, password })
    });

    if (!response.ok) {
        throw new Error('Error al registrar el usuario')
    }

    return response.json();
}

export const registerInvestigator = async ({ companyName, cuit, email, phone, address, password }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/investigator`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ companyName, cuit, email, phone, address, password })
    });

    if (!response.ok) {
        throw new Error('Error al registrar el laboratorio')
    }

    return response.json();
}

export const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('Error al iniciar sesión')
    }

    const data = await response.json();
    const decodedToken = decodeJWT(data.access_token);
    return { ...data, role: decodedToken.role };
}

export const loginInvestigator = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/authenticate/investigator`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('Error al iniciar sesión')
    }

    const data = await response.json();
    const decodedToken = decodeJWT(data.access_token);
    return { ...data, role: decodedToken.role };
}