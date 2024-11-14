import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { getGarajeFotos} from './api-GarajeFoto';


const initialState = {
  isOpen: false,
  open: false,
  alertPopup: false,
};

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/GarajeFoto/Obtener', // server URL
};

export function useGetGarajeFoto() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getGarajeFotos);
  
    // Agregar console.log para depuración
    console.log('Fetching garajesfotos from:', endpoints.key + endpoints.list);
    console.log('Data Gataje foto:', data);
  
    const memoizedValue = useMemo(
      () => ({
        garajeFoto: data?.datos || [], 
        garajeFotoLoading: !error && !data,
        garajeFotoError: error,
        garajeFotoValidating: isValidating,
        garajeFotoEmpty: data?.datos ? data.datos.length === 0 : true
      }),
      [data, error, isValidating]
    );
    return memoizedValue;
  }