import useSWR from 'swr';
import { useMemo } from 'react';
import { getProvincias } from './api-Provincia';  

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/Provincia/Obtener',
};

// DEVUELVE EL ARRAY DE PROVINCIAS
export function useGetProvincia() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getProvincias);

    const memoizedValue = useMemo(
      () => ({
        provincia: data || [],  
        provinciaLoading: !error && !data, 
        provinciaError: error,  
        provinciaValidating: isValidating,  
        provinciaEmpty: data ? data.length === 0 : true 
      }),
      [data, error, isValidating]
    );

    return memoizedValue;
}
