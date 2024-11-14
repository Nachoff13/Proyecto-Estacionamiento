// useGarajeFoto.js
import useSWR from 'swr';
import { useMemo } from 'react';
import { getGarajeFotos } from './api-GarajeFoto';

// Hook para obtener las fotos del garaje
export function useGetGarajeFoto(idGaraje) {
    const { data, error, isValidating } = useSWR(idGaraje ? `/GarajeFoto/ObtenerFotosDeGaraje/${idGaraje}` : null, () => getGarajeFotos(idGaraje));

    console.log('Data Garaje Fotos:', data);

    const memoizedValue = useMemo(
      () => ({
        garajeFotos: data || [],
        garajeFotosLoading: !error && !data,
        garajeFotosError: error,
        garajeFotosValidating: isValidating,
        garajeFotosEmpty: data ? data.length === 0 : true
      }),
      [data, error, isValidating]
    );

    return memoizedValue;
}
