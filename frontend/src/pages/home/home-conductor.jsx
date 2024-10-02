// material-ui
import { Typography, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import dataGarajes from './data-garaje';

// ==============================|| SAMPLE PAGE ||============================== //

export default function HomeConductor() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      {dataGarajes.map((garaje) => (
        <MainCard key={garaje.id} title={`Garaje Disponible ${garaje.id}`} style={{ width: '33.33%', boxSizing: 'border-box',  height: '500px' }}>
          <div style={{ flex: '1', overflow: 'hidden' }}> 
            <img
              src={garaje.garajeFoto.src} // Usa la imagen desde los datos
              alt={garaje.garajeFoto.alt}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <Typography variant="body2">
              <strong>Propietario: </strong> {garaje.idPropietario} <br />
              <strong>Localidad: </strong> {garaje.idLocalidad} <br />
              <strong>Ubicación:</strong> {garaje.Calle} N° {garaje.altura} <br />
              <strong>Descripción:</strong> {garaje.descripcion} <br />
              <strong>Precio por hora:</strong> ${garaje.precioHora} <br />
              <strong>Capacidad:</strong> {garaje.capacidad} vehículos <br />
              <strong>Estado:</strong> {garaje.estado} <br />
            </Typography>
          </div>  
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary"  onClick={() => handleReservar(garaje.id)}  style={{ marginTop: '10px' }}>
                Reservar
              </Button>
            </div>
        </MainCard>
      ))}
    </div>
  );
}