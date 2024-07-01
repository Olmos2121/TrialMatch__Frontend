import { API_BASE_URL } from "../../config";

export const createTrial = async (formData) => {

    const response = await fetch(`${API_BASE_URL}/trials/create`, {
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