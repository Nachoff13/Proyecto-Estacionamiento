import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7294',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const getReservaEstados = async () => {
  try {
    const response = await api.get('/Reservaestado/Obtener');
    return response.data;
  } catch (error) {
    console.error("Error fetching reservaestados:", error);
  }
}