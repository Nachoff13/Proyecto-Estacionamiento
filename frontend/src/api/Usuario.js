import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { getPropietarios, getUsuarios} from './api-Usuario';


const initialState = {
  isOpen: false,
  open: false,
  alertPopup: false,
};

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/Usuario/ObtenerPropietario' // server URL
};

//DEVUELVE EL ARRAY DE PROPIETARIOS
export function useGetPropietario() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getPropietarios);
    const memoizedValue = useMemo(
      () => ({
        propietario: data|| [], 
        propietarioLoading: !error && !data,
        propietarioError: error,
        propietarioValidating: isValidating,
        propietarioEmpty: data ? data.length === 0 : true
      }),
      [data, error, isValidating]
    );

    return memoizedValue;
  }

