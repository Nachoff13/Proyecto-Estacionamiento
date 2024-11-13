import React from 'react';
import { Stack, Typography } from '@mui/material';
import Dot from 'components/@extended/Dot'; 
import { fakeReservaEstado } from 'data/data-reservas'; 

// mostrar los posibles estados de la reserva
const ReservaEstados = ({ idEstado }) => {
  const estado = fakeReservaEstado.find((e) => e.id === idEstado);
  let color = 'primary';
  let title = 'Ninguno';

  if (estado) {
    switch (estado.id) {
      case 1:
        color = 'warning';
        title = estado.nombre;
        break;
      case 2:
        color = 'success';
        title = estado.nombre;
        break;
      case 3:
        color = 'error';
        title = estado.nombre;
        break;
      default:
        break;
    }
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

export default ReservaEstados;
