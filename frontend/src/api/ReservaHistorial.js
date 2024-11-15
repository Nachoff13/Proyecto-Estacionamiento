import useSWR from 'swr';
import { useMemo } from 'react';
import { getHistorialReserva } from './api-ReservaHistorial';

export function useGetHistorialReserva(idGaraje) {
    const { data, error, isValidating } = useSWR(idGaraje ? `/Reserva/ObtenerPorGaraje/${idGaraje}` : null, () => getHistorialReserva(idGaraje));

    const memoizedValue = useMemo(
        () => ({
            reservas: data || [],
            reservasLoading: !error && !data,
            reservasError: error,
            reservasValidating: isValidating,
            reservasEmpty: data ? data.length === 0 : true
        }),
        [data, error, isValidating]
    );
    return memoizedValue;
}
