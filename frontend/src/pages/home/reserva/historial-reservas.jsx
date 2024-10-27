import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, TextField, InputAdornment } from '@mui/material';
import MainCard from 'components/MainCard';

//icons
import SearchOutlined from '@ant-design/icons/SearchOutlined';

//components
import ReservaEstados from 'components/reserva/ReservaEstados';

// Fake data imports
import { fakeReservas } from 'data/data-reservas';
import fakeGarajes from 'data/data-garajes';
import fakeUsuarios from 'data/data-usuarios';

// Crear datos de reserva
const reservas = fakeReservas.map((reserva) => ({
  id: reserva.id,
  idGaraje: reserva.idGaraje,
  idConductor: reserva.idConductor,
  fechaInicio: reserva.fechaInicio,
  fechaFin: reserva.fechaFin,
  idEstado: reserva.idEstado
}));

// Nombres de las columnas
const headCells = [
  {
    id: 'garaje',
    align: 'left',
    disablePadding: false,
    label: 'Dirección del Garaje'
  },
  { id: 'conductor', align: 'left', disablePadding: false, label: 'Conductor' },
  {
    id: 'fechaInicio',
    align: 'left',
    disablePadding: false,
    label: 'Fecha Inicio'
  },
  { id: 'fechaFin', align: 'left', disablePadding: false, label: 'Fecha Fin' },
  { id: 'estado', align: 'left', disablePadding: false, label: 'Estado' }
];

export default function HistorialReservas() {
  const location = useLocation();
  const garajeId = location.state?.garajeId;

  // busqueda
  const [searchTerm, setSearchTerm] = React.useState('');

  const getGarajeDireccion = (idGaraje) => {
    const garaje = fakeGarajes.find((g) => g.id === idGaraje);
    return garaje ? `${garaje.calle} N° ${garaje.altura}` : 'Desconocido';
  };

  const getConductorNombre = (idConductor) => {
    const usuario = fakeUsuarios.find((u) => u.id === idConductor);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido';
  };

  // filtro reservas, sin ditinciion de mayusculas y minusculas, y sin tildes
  const filteredReservas = reservas.filter((reserva) => {
    const conductorNombre = getConductorNombre(reserva.idConductor)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const normalizedSearchTerm = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return reserva.idGaraje === garajeId && conductorNombre.toLowerCase().includes(normalizedSearchTerm.toLowerCase());
  });

  return (
    <MainCard sx={{ mt: 2 }} content={false} spacing={2}>
      <Box sx={{ mb: 2, mt: 4, ml: 2, width: 250 }}>
        <TextField
          fullWidth
          label="Buscar por conductor"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box>
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' },
            boxShadow: 1,
            borderRadius: '8px',
            bgcolor: 'white'
          }}
        >
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReservas.map((reserva) => (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={reserva.id}>
                  <TableCell>{getGarajeDireccion(reserva.idGaraje)}</TableCell>
                  <TableCell>{getConductorNombre(reserva.idConductor)}</TableCell>
                  <TableCell>{new Date(reserva.fechaInicio).toLocaleString()}</TableCell>
                  <TableCell>{new Date(reserva.fechaFin).toLocaleString()}</TableCell>
                  <TableCell>
                    <ReservaEstados idEstado={reserva.idEstado} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MainCard>
  );
}
