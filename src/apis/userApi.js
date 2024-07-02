import { API_BASE_URL } from "../../config";

const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export const getUserByEmail = async () => {
    const token = localStorage.getItem('token');
    const user = decodeJWT(token);

    const response = await fetch(`${API_BASE_URL}/user/${user.sub}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener el usuario')
    }

    return response.json();
}

export const sendAcceptanceNotification = async (id) => {

    const token = localStorage.getItem('token');
    const user = decodeJWT(token);

    const response = await fetch(`${API_BASE_URL}/message/sendAcceptance/${user.sub}/${id}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al enviar la notificación de aceptación')
    }
}