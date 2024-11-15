import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, TextField, InputAdornment } from '@mui/material';
import MainCard from 'components/MainCard';

// Icons
import SearchOutlined from '@ant-design/icons/SearchOutlined';

// Components
import ReservaEstados from 'components/reserva/ReservaEstados';
import ConductorModal from 'components/modals/home-propietario/ConductorModal';

// Hooks
import { useGetHistorialReserva } from 'api/ReservaHistorial';
import { useGetConductores } from 'api/Usuario';
import { useGetGaraje } from 'api/Garaje';


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
    id: 'fechainicio',
    align: 'left',
    disablePadding: false,
    label: 'Fecha Inicio'
  },
  { id: 'fechafin', align: 'left', disablePadding: false, label: 'Fecha Fin' },
  { id: 'estado', align: 'left', disablePadding: false, label: 'Estado' }
];

export default function HistorialReservas() {
  const location = useLocation();
  const garajeId = location.state?.garajeId;

  const { reservas, loading, error } = useGetHistorialReserva(garajeId);
  const { conductores } = useGetConductores();
  const { garaje } = useGetGaraje();

  const [searchTerm, setSearchTerm] = React.useState('');
  //modal usuario
  const [selectedConductor, setSelectedConductor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getGarajeDireccion = (idGaraje) => {
    const garajeEncontrado = garaje.find((g) => g.id === idGaraje);
    return garajeEncontrado ? `${garajeEncontrado.calle} N° ${garajeEncontrado.altura}` : 'Desconocido';
  };

  const getConductorNombre = (idConductor) => {
    const conductorEncontrado = conductores.find((u) => u.id === idConductor);
    return conductorEncontrado ? `${conductorEncontrado.nombre} ${conductorEncontrado.apellido}` : 'Desconocido';
  };

  // Filtrado de reservas
  const filteredReservas = reservas.filter((reserva) => {
    const conductorNombre = getConductorNombre(reserva.idconductor)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // elimina tildes
      .toLowerCase(); 
  
    const normalizedSearchTerm = searchTerm
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') 
      .toLowerCase(); 
    console.log("Conductor Nombre:", conductorNombre);
    console.log("Search Term:", normalizedSearchTerm);
  
    return reserva.idgaraje === garajeId && conductorNombre.includes(normalizedSearchTerm);
  });
  
  const handleConductorClick = (conductorId) => {
    const conductor = conductores.find((c) => c.id === conductorId);
    setSelectedConductor(conductor);
    setModalOpen(true);
  };

  // Manejo de estados de carga y error
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar reservas: {error.message}</div>;

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
                  <TableCell key={headCell.id} align="left" padding="normal">
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReservas.map((reserva) => (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={reserva.id}>
                  <TableCell>{getGarajeDireccion(reserva.idgaraje)}</TableCell> 
                  <TableCell>
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleConductorClick(reserva.idconductor)}>
                      {getConductorNombre(reserva.idconductor)}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(reserva.fechainicio).toLocaleString()}</TableCell>
                  <TableCell>{new Date(reserva.fechafin).toLocaleString()}</TableCell>
                  <TableCell>
                    <ReservaEstados idEstado={reserva.idreservaestado} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ConductorModal conductor={selectedConductor} open={modalOpen} onClose={() => setModalOpen(false)} />
    </MainCard>
  );
}