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

    const token = localStorage.getItem('token');
    const data = decodeJWT(token);

    const response = await fetch(`${API_BASE_URL}/trials/${id}/${data.sub}`, {
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

export const getTrialsByEmail = async () => {
    const token = localStorage.getItem('token');
    const user = decodeJWT(token);

    const response = await fetch(`${API_BASE_URL}/trials/all/${user.sub}`, {
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

export const deleteTrial = async (id) => {
    const response = await fetch(`${API_BASE_URL}/trials/delete/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al eliminar el estudio')
    }

    return response.json();
}

export const editTrial = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/trials/editTrial`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error('Error al editar el estudio')
    }

    return response.json();
}

export const getTrialCandidates = async (id) => {
    const response = await fetch(`${API_BASE_URL}/trials/candidatos/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener los candidatos')
    }

    return response.json();
}

export const acceptApply = async (trialId, userId) => {
    const response = await fetch(`${API_BASE_URL}/trials/acceptApply/${trialId}/${userId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al aceptar la aplicación')
    }

    return response.json();
}

export const rejectApply = async (trialId, userId) => {
    const response = await fetch(`${API_BASE_URL}/trials/rejectApply/${trialId}/${userId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al rechazar la aplicación')
    }

    return response.json();
}

export const removeParticipant = async (trialId, userId) => {
    const response = await fetch(`${API_BASE_URL}/trials/removeParticipant/${trialId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al eliminar el participante')
    }

    return response.json();
}

export const getTrialParticipants = async (id) => {
    const response = await fetch(`${API_BASE_URL}/trials/participantes/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener los participantes')
    }

    return response.json();
}

export const sendMessageToParticipant = async (trialId, userId, message) => {
    const response = await fetch(`${API_BASE_URL}/message/sendMessage/${trialId}/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message })
    });

    if (!response.ok) {
        throw new Error('Error al enviar el mensaje')
    }
}

export const sendMessageToAllParticipants = async (trialId, message) => {
    const response = await fetch(`${API_BASE_URL}/message/sendMessageToAll/${trialId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message })
    });

    if (!response.ok) {
        throw new Error('Error al enviar el mensaje')
    }
}