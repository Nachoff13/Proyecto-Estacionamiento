import useSWR from 'swr';
import { useMemo } from 'react';
import { getVehiculoConConductor } from './api-Vehiculo';

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
};

export function useGetVehiculoConConductor(idConductor) {
  console.log('idConductor:', idConductor);

  const { data, error, isValidating } = useSWR(
    idConductor ? `/Vehiculo/ObtenerPorConductor/${idConductor}` : null,
    (url) => getVehiculoConConductor(idConductor) 
  );

  console.log('Data Vehiculo x Conductor:', data);

  const memoizedValue = useMemo(
    () => ({
      vehiculo: data || [],
      vehiculoLoading: !error && !data,
      vehiculoError: error,
      vehiculoValidating: isValidating,
      vehiculoEmpty: data ? data.length === 0 : true
    }),
    [data, error, isValidating]
  );

  return memoizedValue;
}