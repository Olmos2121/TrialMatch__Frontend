import { API_BASE_URL } from "../../config";

const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export const createTrial = async (formData) => {
    const token = localStorage.getItem('token');
    const investigator = decodeJWT(token);

    const response = await fetch(`${API_BASE_URL}/trials/create/${investigator.sub}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error('Error al crear el estudio')
    }

    return response.json();
}

export const getTrials = async () => {
    const response = await fetch(`${API_BASE_URL}/trials`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener los estudios')
    }

    return response.json();
}

export const getTrialById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/trials/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener el estudio')
    }

    return response.json();
}

export const applyToTrial = async (trialId) => {
    const token = localStorage.getItem('token');
    const user = decodeJWT(token);

    const response = await fetch(`${API_BASE_URL}/application/${trialId}/apply/${user.sub}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al aplicar al estudio')
    }

    return response.json();
}