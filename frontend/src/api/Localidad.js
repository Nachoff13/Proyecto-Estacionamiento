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


//DEVUELVE EL ARRAY DE LOCALIDADES
export function useGetLocalidad() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getLocalidades);
   
    const memoizedValue = useMemo(
      () => ({
        localidad: data || [],  
        localidadLoading: !error && !data,
        localidadError: error,
        localidadValidating: isValidating,
        localidadEmpty: data ? data.length === 0 : true
      }),
      [data, error, isValidating]
    );

    return memoizedValue;
}