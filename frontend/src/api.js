import axios from 'axios';

// URL base de la API. Cambia esta dirección según tu configuración del backend.
const BASE_URL = 'http://localhost:5000/api';

// Función para registrar un usuario
export const registerUser = async (userData) => {
    try {
        // Realiza la solicitud POST al endpoint de registro
        const response = await axios.post(`${BASE_URL}/register`, userData);
        return response;
    } catch (error) {
        // Si hay un error, lo lanza para ser capturado por la llamada en register.js
        throw error;
    }
};
