// api-GarajeFoto.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7294',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
});

export const getGarajeFotos = async (idGaraje) => {
  try {
    const response = await api.get(`/GarajeFoto/ObtenerFotosDeGaraje/${idGaraje}`);
    console.log("response data fotogarajes:", response.data);
    
    const imagesData = response.data.map(img => {
      const byteArray = new Uint8Array(img.foto.split(',').map(Number));
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      return {
        id: img.id,
        idgaraje: img.idgaraje,
        fotoUrl: URL.createObjectURL(blob)
      };
    });
    
    return imagesData;
  } catch (error) {
    console.error("Error fetching GarajeFoto:", error);
    return [];  // Retornar array vacío en caso de error para evitar problemas en el componente
  }
};
