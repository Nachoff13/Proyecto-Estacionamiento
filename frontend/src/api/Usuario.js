import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { getUsuarios} from './api-Usuario';


const initialState = {
  isOpen: false,
  open: false,
  alertPopup: false,
};

export const endpoints = {
  key: 'https://localhost:7294',
  actions: 'actions',
  list: '/Usuario/Obtener', // server URL
};

export function useGetUsuario() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getUsuarios);
  
    // Agregar console.log para depuración
    console.log('Fetching Usuario from:', endpoints.key + endpoints.list);
    console.log('Data Usuario:', data);
  
    const memoizedValue = useMemo(
      () => ({
        usuario: data?.datos || [], 
        usuarioLoading: !error && !data,
        usuarioError: error,
        usuarioValidating: isValidating,
        usuarioEmpty: data?.datos ? data.datos.length === 0 : true
      }),
      [data, error, isValidating]
    );
    return memoizedValue;
  }

  export function useGetPropietario() {
    const { data, error, isValidating } = useSWR(endpoints.key + endpoints.list, getUsuarios);
    
    // Agregar console.log para depuración
    console.log('Fetching Usuario from:', endpoints.key + endpoints.list);
    console.log('Data Propietario:', data);
    
    const memoizedValue = useMemo(
      () => ({
        usuarios: data?.datos || [],
        usuariosLoading: !error && !data,
        usuariosError: error,
        usuariosValidating: isValidating,
        usuariosEmpty: data?.datos ? data.datos.length === 0 : true,
        propietarios: (data?.datos || []).filter(usuario => usuario.espropietario) || [], // Filtra los propietarios
      }),
      [data, error, isValidating]
    );
  
    return memoizedValue;
  }