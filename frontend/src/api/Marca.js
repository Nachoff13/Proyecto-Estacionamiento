import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { getMarcas } from './api-Marca';


const initialState = {
  isOpen: false,
  open: false,
  alertPopup: false,
};

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/Marca/Obtener', // server URL
};

export function useGetMarca() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getMarcas);
  
    console.log('Data Marcas:', data);
  
    const memoizedValue = useMemo(
      () => ({
        marca: data || [], 
        marcaLoading: !error && !data,
        marcaError: error,
        marcaValidating: isValidating,
        marcaEmpty: data ? data.length === 0 : true
      }),
      [data, error, isValidating]
    );
    return memoizedValue;
  }