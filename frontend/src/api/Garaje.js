import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { getGarajes} from './api-Garaje';


const initialState = {
  isOpen: false,
  open: false,
  alertPopup: false,
};

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/Garaje/Obtener', // server URL
};

export function useGetGaraje() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getGarajes);
  
    console.log('Data Gataje:', data);
  
    const memoizedValue = useMemo(
      () => ({
        garaje: data || [], 
        garajeLoading: !error && !data,
        garajeError: error,
        garajeValidating: isValidating,
        garajeEmpty: data ? data.length === 0 : true
      }),
      [data, error, isValidating]
    );
    return memoizedValue;
  }