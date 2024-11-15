import React, { useState, useEffect } from 'react';
// material-ui
import { Typography, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import SearchBar from 'components/home/SearchBar';

//data imports
import dataGarajes from 'data/data-garajes';
import fakeFotosGarajes from 'data/data-garajefoto';
import fakeLocalidades from 'data/data-localidades';
import fakeGarajeEstado from 'data/data-garajeestado';
import fakePropietario from 'data/data-usuarios';

export default function HomeConductor() {
  const navigate = useNavigate();
  const [selectedLocalidad, setSelectedLocalidad] = useState('');

  const getLocalidad = (idLocalidad) => {
    const localidad = fakeLocalidades.find((loc) => loc.id === idLocalidad);
    return localidad ? localidad.nombre : 'Desconocido';
  };

  const getEstadoGaraje = (idGarajeEstado) => {
    const estado = fakeGarajeEstado.find((est) => est.id === idGarajeEstado);
    return estado ? estado.nombre : 'Desconocido';
  };

  const getFotoGaraje = (idGaraje) => {
    const fotoGaraje = fakeFotosGarajes.find((foto) => foto.idGaraje === idGaraje);
    return fotoGaraje ? fotoGaraje.foto : 'default-foto.jpg';
  };

  const getPropietario = (idPropietario) => {
    const propietario = fakePropietario.find((propietario) => propietario.id === idPropietario);
    return propietario ? propietario.nombre + ' ' + propietario.apellido : 'Desconocido';
  };

  const getColorEstado = (idGarajeEstado) => {
    switch (idGarajeEstado) {
      case 1:
        return 'success';
      case 2:
        return 'warning';
      case 3:
        return 'error';
      default:
        return 'default';
    }
  };

  // Modificar handleReservar para recibir el id del garaje
  const handleReservar = (idGaraje) => {
    navigate(`/reserva/${idGaraje}`);
  };

  const handleHistorialCalificaciones = (idGaraje) => {
    navigate(`/historial-calificaciones/${idGaraje}`);
  };

  const handleSearch = ({ selectedLocalidad }) => {
    setSelectedLocalidad(selectedLocalidad);
    console.log("localidad seleccionada:", selectedLocalidad);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {dataGarajes
          .filter((garaje) => garaje.idGarajeEstado === 1 && 
          (selectedLocalidad ? garaje.idLocalidad === selectedLocalidad : true))
        .map((garaje, index) => (
            <MainCard key={garaje.id} style={{ width: '33.33%', boxSizing: 'border-box', height: '450px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="h6" style={{ marginBottom: '8px' }}>
                  Garaje {index + 1}
                </Typography>
                <Chip
                  label={getEstadoGaraje(garaje.idGarajeEstado)}
                  color={getColorEstado(garaje.idGarajeEstado)}
                  variant="outlined"
                  style={{ marginBottom: '8px' }}
                />
              </div>
              <img
                src={getFotoGaraje(garaje.id)}
                alt={`Foto del garaje ${garaje.id}`}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ flex: '1', overflow: 'hidden' }}>
                <Typography variant="body2">
                  <strong>Propietario: </strong> {getPropietario(garaje.idPropietario)} <br />
                  <strong>Localidad: </strong> {getLocalidad(garaje.idLocalidad)} <strong>Ubicación:</strong> {garaje.Calle} N°{' '}
                  {garaje.altura} <br />
                  <strong>Descripción:</strong> {garaje.descripcion} <br />
                  <strong>Precio por hora:</strong> ${garaje.precioHora} <br />
                  <strong>Capacidad:</strong> {garaje.capacidad} vehículos <br />
                </Typography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleHistorialCalificaciones(garaje.id)}
                  style={{ textDecoration: 'underline', marginTop: '10px', marginRight: '10px' }}
                >
                  Reseñas
                </Button>
                {/* Pasar el id del garaje seleccionado a handleReservar */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleReservar(garaje.id)}
                  style={{ marginTop: '10px' }}
                >
                  Reservar
                </Button>
              </div>
            </MainCard>
          ))}
      </div>
    </div>
  );
}
