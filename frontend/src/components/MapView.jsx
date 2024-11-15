import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


// Función para obtener las coordenadas de la dirección usando OpenCage
const obtenerCoordenadas = async (direccion) => {
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(direccion)}&key=${API_KEY}&language=es&pretty=1`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    
    if (data && data.results && data.results.length > 0) {
      const result = data.results.reduce((prev, current) => (prev.confidence > current.confidence ? prev : current));
      const coordenadas = {
        latitud: parseFloat(result.geometry.lat),
        longitud: parseFloat(result.geometry.lng),
      };
      return coordenadas;
    }
    return null;
  } catch (error) {
    console.error('Error al obtener coordenadas:', error);
    return null;
  }
};

// Función para agregar un retraso de 1 segundo entre las solicitudes porque la api de OpenCage tiene un límite de solicitudes 1 por segundo
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MapView = ({ garajes, localidades, provincias }) => {
  const [mapMarkers, setMapMarkers] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar el indicador de carga

  useEffect(() => {
    const fetchCoordinates = async () => {
      const markers = [];
      for (const garaje of garajes) {
        const localidad = localidades.find(loc => loc.id === garaje.idlocalidad);
        const localidadNombre = localidad?.nombre || 'Desconocido';
        const provinciaNombre = provincias.find(prov => prov.id === localidad?.idprovincia)?.nombre || 'Desconocido';
        const esAvenida = garaje.calle.toLowerCase().includes("av.");
        const tipoCalle = esAvenida ? "Av." : "Calle";
        const address = `${tipoCalle} ${garaje.calle} ${garaje.altura}, ${localidadNombre}, ${provinciaNombre}, Argentina`;

        console.log(address);

        // Obtener las coordenadas para la dirección
        const coordinates = await obtenerCoordenadas(address);
        if (coordinates) {
          markers.push({
            ...coordinates,
            id: garaje.id,
            descripcion: garaje.descripcion,
          });
        }

        // Pausar 1 segundo entre cada solicitud
        await delay(1000);
      }

      // Actualizar los marcadores con los resultados
      setMapMarkers(markers);
      setLoading(false); 
    };

    fetchCoordinates();
  }, [garajes, localidades, provincias]);

  if (loading) {
    // Mostrar el indicador de carga mientras se obtienen los marcadores
    return (
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!garajes || garajes.length === 0) {
    return <Typography>No hay garajes para mostrar en el mapa</Typography>;
  }

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <MapContainer
        center={[-34.9214, -57.9544]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {mapMarkers.map((marker) => (
          <Marker key={marker.id} position={[marker.latitud, marker.longitud]}>
            <Popup>
              <Typography variant="subtitle1">
                <strong>Garaje:</strong> {marker.descripcion}
              </Typography>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapView;
