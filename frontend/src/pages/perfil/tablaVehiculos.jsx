import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TablaVehiculos = ({ vehiculos, modelos, marcas }) => {
  // Función para obtener el nombre del modelo basado en idModelo
  const getModeloName = (idModelo) => {
    const modelo = modelos.find((m) => m.id === idModelo);
    return modelo ? modelo.nombre : 'Desconocido'; // Devuelve 'Desconocido' si no se encuentra
  };

  // Función para obtener el nombre de la marca basado en idMarca
  const getMarcaName = (idMarca) => {
    const marca = marcas.find((m) => m.id === idMarca);
    return marca ? marca.nombre : 'Desconocida'; // Devuelve 'Desconocida' si no se encuentra
  };


  return (
    <>
    
    <Box sx={{ width: '95%', margin: '0 auto', overflowX: 'auto' }}>
    <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
        Mis Vehículos
    </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Modelo</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Matrícula</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {vehiculos.map((vehiculo) => (
              <TableRow key={vehiculo.id}>
                <TableCell>{getModeloName(vehiculo.idmodelo)}</TableCell>
                <TableCell>{getMarcaName(vehiculo.idmodelo)}</TableCell>
                <TableCell>{vehiculo.matricula}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
};

export default TablaVehiculos;
