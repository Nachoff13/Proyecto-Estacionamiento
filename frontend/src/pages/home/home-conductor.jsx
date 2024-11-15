import React, { useState, useEffect } from 'react';
// material-ui
import { Typography, Button, Chip, ImageList, ImageListItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import SearchBar from 'components/home/SearchBar';
import MapView from 'components/MapView'; 

// API imports
import { useGetLocalidad } from 'src/api/Localidad';
import { useGetProvincia } from 'src/api/Provincia';
import { useGetPropietario } from 'src/api/Usuario';
import { useGetGaraje } from 'api/Garaje';

export default function HomeConductor() {
  const [isDataLoaded, setIsDataLoaded] = useState(false); 
  const navigate = useNavigate();
  const [selectedLocalidad, setSelectedLocalidad] = useState(''); // Buscador
  // Estado para almacenar las fotos de cada garaje
  const [garageImages, setGarageImages] = useState({});

  // Obtener datos de API
  const { provincia, provinciaLoading, provinciaError } = useGetProvincia();
  console.log("Primero provincias:", provincia);
  const { localidad, localidadLoading, localidadError } = useGetLocalidad();
  console.log("Primero localidades", localidad)
  const { propietario, propietarioLoading, propietarioError } = useGetPropietario();
  const { garaje, garajeLoading, garajeError } = useGetGaraje();

  // Función para obtener imágenes del garaje
  const fetchGarageImages = async (idGaraje) => {
    try {
      const response = await fetch(`https://localhost:7294/GarajeFoto/ObtenerFotosDeGaraje/${idGaraje}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 404) {
        console.warn(`No images found for garage ${idGaraje}`);
        return;
      }

      const imagesData = await response.json();
      if (imagesData && imagesData.length > 0) {
        setGarageImages((prevImages) => ({
          ...prevImages,
          [idGaraje]: imagesData.map((img) =>
            URL.createObjectURL(new Blob([new Uint8Array(img.foto.split(',').map(Number))], { type: 'image/jpeg' })))
        }));
      }
    } catch (error) {
      console.error(`Error fetching images for garage ${idGaraje}:`, error);
    }
  };

  useEffect(() => {
    if (garaje.length > 0) {
      garaje.forEach((garage) => {
        fetchGarageImages(garage.id);
      });
    }
  }, [garaje]);

  useEffect(() => {
    // Verifica cuando las provincias y localidades estén listas
    if (!provinciaLoading && !localidadLoading) {
      setIsDataLoaded(true);
    }
  }, [provinciaLoading, localidadLoading]);

  // Manejo de errores
  if (provinciaError || localidadError || propietarioError || garajeError) {
    return <div>Error al cargar los datos.</div>;
  }

  // Manejo de carga
  if (provinciaLoading || localidadLoading || propietarioLoading || garajeLoading) {
    return <div>Cargando...</div>;
  }


  // Función para obtener la localidad por ID
  const getLocalidad = (idLocalidad) => {
    const localidadEncontrada = localidad.find((loc) => loc.id === idLocalidad);
    return localidadEncontrada ? localidadEncontrada.nombre : 'Desconocido';
  };

  // Función para obtener el propietario por ID
  const getPropietario = (idPropietario) => {
    const propietarioEncontrado = propietario.find((prop) => prop.id === idPropietario);
    return propietarioEncontrado ? `${propietarioEncontrado.nombre} ${propietarioEncontrado.apellido}` : 'Desconocido';
  };

  const handleSearch = ({ selectedLocalidad }) => {
    setSelectedLocalidad(selectedLocalidad);
    console.log('localidad seleccionada:', selectedLocalidad);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', gap: '16px' }}>

      {/* Contenedor de las tarjetas */}
      <Box style={{ flex: 6, overflowY: 'auto', padding: '16px' }}>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {garaje
          .filter(
            (garageItem) =>
              garageItem.disponible &&
              (!selectedLocalidad || garageItem.idlocalidad === selectedLocalidad)
          )
          .map((garageItem, index) => (
            <MainCard
              key={garageItem.id}
              style={{
                flex: '0 1 calc(50% - 16px)',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" style={{ marginBottom: '8px' }}>
                  Garaje {index + 1}
                </Typography>
                <Chip
                  label={garageItem.disponible ? 'Disponible' : 'Reservado'}
                  color={garageItem.disponible ? 'success' : 'warning'}
                  variant="outlined"
                  style={{ marginBottom: '8px' }}
                />
              </div>
              <ImageList
                cols={1}
                rowHeight={150}
                style={{ width: '100%', height: 'auto' }}
              >
                {(garageImages[garageItem.id] || []).map((src, idx) => (
                  <ImageListItem key={idx}>
                    <img
                      src={src}
                      alt={`Foto ${idx + 1} del garaje ${garageItem.id}`}
                      style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <Typography variant="body2">
                <strong>Propietario:</strong> {getPropietario(garageItem.idpropietario)}
                <br />
                <strong>Localidad:</strong> {getLocalidad(garageItem.idlocalidad)}
                <br />
                <strong>Ubicación:</strong> {garageItem.calle} N° {garageItem.altura}
                <br />
                <strong>Descripción:</strong> {garageItem.descripcion}
                <br />
                <strong>Precio por hora:</strong> ${garageItem.preciohora}
                <br />
                <strong>Capacidad:</strong> {garageItem.capacidad} vehículos
                <br />
              </Typography>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '10px',
                }}
              >
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => navigate(`/historial-calificaciones/${garageItem.id}`)}
                  style={{
                    textDecoration: 'underline',
                    marginTop: '10px',
                    marginRight: '10px',
                  }}
                >
                  Reseñas
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/reserva/${garageItem.id}`)}
                  style={{ marginTop: '10px' }}
                >
                  Reservar
                </Button>
              </div>
            </MainCard>
          ))}
      </div>
    </Box>


      {isDataLoaded && (
        <Box style={{  flex: 4, height: '100%' }}>
          
          <MapView 
          garajes={garaje.filter((garageItem) => garageItem.disponible)}
          localidades={localidad}
          provincias={provincia}
          />
        </Box>
      )}
    </div>
  );
}
