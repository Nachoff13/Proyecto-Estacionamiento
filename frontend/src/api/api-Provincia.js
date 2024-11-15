import axios from 'axios';

export const getProvincias = async () => {
    try {
      const response = await axios.get('https://localhost:7294/Provincia/Obtener');
      return response.data;
    } catch (error) {
      console.error("Error fetching provincias:", error);
      return []; 
    }
  };
  