import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { getGarajes, getGarajeConPropietario } from './api-Garaje';

const initialState = {
  isOpen: false,
  open: false,
  alertPopup: false
};

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/Garaje/Obtener' // server URL
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

export function useGetGarajeConPropietario(idPropietario) {
  console.log('idPropietario en UseGetGaraje:', idPropietario);

  const { data, error, isValidating } = useSWR(
    idPropietario ? `/Garaje/ObtenerConPropietario/${idPropietario}` : null,
    (url) => getGarajeConPropietario(idPropietario)
  );

  console.log('Data Garaje x Propietario:', data);

  const memoizedValue = useMemo(
    () => ({
      garajeConPropietario: data || [], // Devuelve un array vacío si no hay datos
      garajeConPropietarioLoading: !error && !data, // Indica si está cargando
      garajeConPropietarioError: error, // Maneja el error
      garajeConPropietarioValidating: isValidating, // Indica si está validando
      garajeConPropietarioEmpty: data ? data.length === 0 : true // Indica si está vacío
    }),
    [data, error, isValidating]
  );

  return memoizedValue;
}
