import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { getLocalidades} from './api-Localidad';


const initialState = {
  isOpen: false,
  open: false,
  alertPopup: false,
};

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/Localidad/Obtener', // server URL
};

export function useGetLocalidad() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getLocalidades);
  
    // Agregar console.log para depuración
    console.log('Fetching localidades from:', endpoints.key + endpoints.list);
    console.log('Data localidad:', data);
  
    const memoizedValue = useMemo(
      () => ({
        localidad: data?.datos || [], 
        localidadLoading: !error && !data,
        localidadError: error,
        localidadValidating: isValidating,
        localidadEmpty: data?.datos ? data.datos.length === 0 : true
      }),
      [data, error, isValidating]
    );
    return memoizedValue;
  }