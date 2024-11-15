import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7294', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getHistorialReserva = async (idGaraje) => {
    try {
        const response = await api.get(`/Reserva/ObtenerPorGaraje/${idGaraje}`);  
        console.log("data reserva:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching reservas:", error);
        throw error;
    }
};
