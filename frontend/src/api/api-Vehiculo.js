import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7294',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const getVehiculoConConductor = async (idConductor) => {
  try {
    const response = await api.get(`/Vehiculo/ObtenerPorConductor/${idConductor}`);
    console.log("la data es:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching garages:", error);
  }
}