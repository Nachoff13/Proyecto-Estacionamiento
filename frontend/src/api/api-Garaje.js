import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7294',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const getGarajes = async () => {
  try {
    const response = await api.get('/Garaje/Obtener');
    return response.data;
  } catch (error) {
    console.error("Error fetching garages:", error);
  }
}

export const getGarajeConPropietario = async (idPropietario) => {
  try {
    const response = await api.get(`/Garaje/ObtenerConPropietario/${idPropietario}`);
    console.log("la data es:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching garages:", error);
  }
}