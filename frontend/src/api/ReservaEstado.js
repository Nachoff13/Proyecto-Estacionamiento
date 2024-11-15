import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { getReservaEstados } from './api-ReservaEstado';


const initialState = {
  isOpen: false,
  open: false,
  alertPopup: false,
};

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/Reservaestado/Obtener', // server URL
};


//DEVUELVE EL ARRAY DE LOCALIDADES
export function useGetReservaEstado() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getReservaEstados);
   
    const memoizedValue = useMemo(
      () => ({
        reservaEstado: data || [],  
        reservaEstadoLoading: !error && !data,
        reservaEstadoError: error,
        reservaEstadoValidating: isValidating,
        reservaEstadoEmpty: data ? data.length === 0 : true
      }),
      [data, error, isValidating]
    );

    return memoizedValue;
}