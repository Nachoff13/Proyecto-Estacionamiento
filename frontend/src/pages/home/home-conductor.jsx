import React, { useState, useEffect } from 'react';
// material-ui
import { Typography, Button, Chip, ImageList, ImageListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import SearchBar from 'components/home/SearchBar';

// API imports
import { useGetLocalidad } from 'src/api/Localidad';
import { useGetPropietario } from 'src/api/Usuario';
import { useGetGaraje } from 'api/Garaje';

// ==============================|| SAMPLE PAGE ||============================== //

export default function HomeConductor() {
  const navigate = useNavigate();
  const [selectedLocalidad, setSelectedLocalidad] = useState(''); // Buscador
    // Estado para almacenar las fotos de cada garaje
    const [garageImages, setGarageImages] = useState({});

  // Obtener datos de API
  const { localidad, localidadLoading, localidadError } = useGetLocalidad();
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
          [idGaraje]: imagesData.map((img) => URL.createObjectURL(new Blob([new Uint8Array(img.foto.split(',').map(Number))], { type: 'image/jpeg' })))
        }));
      }
    } catch (error) {
      console.error(`Error fetching images for garage ${idGaraje}:`, error);
    }
  };


  useEffect(() => {
    if (garaje.length > 0) {
      garaje.forEach(garage => {
        fetchGarageImages(garage.id);
      });
    }
  }, [garaje]); 

  // Manejo de errores
  if (localidadError || propietarioError || garajeError) {
    return <div>Error al cargar los datos.</div>;
  }

  // Manejo de carga
  if (localidadLoading || propietarioLoading || garajeLoading) {
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

  return (
    <div>
      <SearchBar onSearch={(search) => setSelectedLocalidad(search.selectedLocalidad)} />
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {garaje.filter(garageItem => garageItem.disponible && (!selectedLocalidad || garageItem.idlocalidad === selectedLocalidad)).map((garageItem, index) => (
          <MainCard key={garageItem.id} style={{ width: '33.33%', boxSizing: 'border-box', height: '450px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>
                Garaje {index + 1}
              </Typography>
              <Chip
                label={garageItem.disponible ? "Disponible" : "No disponible"}
                color={garageItem.disponible ? "success" : "error"}
                variant="outlined"
                style={{ marginBottom: '8px' }}
              />
            </div>
            <div style={{ flex: '1', overflow: 'hidden', marginBottom: '8px' }}>
              <ImageList cols={1} rowHeight={150} style={{ width: '100%', height: 'auto' }}>
                {(garageImages[garageItem.id] || []).map((src, idx) => (
                  <ImageListItem key={idx}>
                    <img
                      src={src}
                      alt={`Foto ${idx + 1} del garaje ${garageItem.id}`}
                      style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: '8px' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
            <div style={{ flex: '1', overflow: 'hidden' }}>
              <Typography variant="body2">
                <strong>Propietario:</strong> {getPropietario(garageItem.idpropietario)}<br />
                <strong>Localidad:</strong> {getLocalidad(garageItem.idlocalidad)}<br />
                <strong>Ubicación:</strong> {garageItem.calle} N° {garageItem.altura}<br />
                <strong>Descripción:</strong> {garageItem.descripcion}<br />
                <strong>Precio por hora:</strong> ${garageItem.preciohora}<br />
                <strong>Capacidad:</strong> {garageItem.capacidad} vehículos<br />
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate(`/historial-calificaciones/${garageItem.id}`)}
                style={{ textDecoration: 'underline', marginTop: '10px', marginRight: '10px' }}
              >
                Reseñas
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate('/reserva')} style={{ marginTop: '10px' }}>
                Reservar
              </Button>
            </div>
          </MainCard>
        ))}
      </div>
    </div>
  );
}