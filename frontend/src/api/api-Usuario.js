import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7294',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const getUsuarios = async () => {
  try {
    const response = await api.get('/Usuario/Obtener');
    return response.data;
  } catch (error) {
    console.error("Error fetching usuarios:", error);
  }
}

export const getPropietarios = async () => {
  try {
    const response = await api.get('/Usuario/ObtenerPropietario');
    return response.data;
  } catch (error) {
    console.error("Error fetching usuarios:", error);
  }
}

export const getConductores = async () => {
  try {
    const response = await api.get('/Usuario/ObtenerConductor');
    return response.data;
  } catch (error) {
    console.error("Error fetching usuarios:", error);
  }
}