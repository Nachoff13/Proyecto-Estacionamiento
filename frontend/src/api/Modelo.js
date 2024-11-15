import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { getModelos} from './api-Modelo';


const initialState = {
  isOpen: false,
  open: false,
  alertPopup: false,
};

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/Modelo/Obtener', // server URL
};

export function useGetModelo() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getModelos);
  
    console.log('Data Modelos:', data);
  
    const memoizedValue = useMemo(
      () => ({
        modelo: data || [], 
        modeloLoading: !error && !data,
        modeloError: error,
        modeloValidating: isValidating,
        modeloEmpty: data ? data.length === 0 : true
      }),
      [data, error, isValidating]
    );
    return memoizedValue;
  }