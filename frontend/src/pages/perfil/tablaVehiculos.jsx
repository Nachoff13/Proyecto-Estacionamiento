import React, { useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { PlusOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';

const TablaVehiculos = ({ vehiculos, modelos, marcas }) => {
  const [redirect, setRedirect] = useState(false); // Estado para manejar la redirección
  console.log('marcas', marcas);
  // Función para obtener el nombre del modelo basado en idModelo
  const getModeloName = (idModelo) => {
    const modelo = modelos.find((m) => m.id === idModelo);
    return modelo ? modelo.nombre : 'Desconocido'; // Devuelve 'Desconocido' si no se encuentra
  };

  // Función para obtener el nombre de la marca basado en idModelo
  const getMarcaName = (idModelo) => {
    // Busca el modelo por su ID
    const modelo = modelos.find((m) => m.id === idModelo);

    if (modelo && modelo.idmarca) {
      // Busca la marca usando el idMarca del modelo
      const marca = marcas.find((m) => m.id === modelo.idmarca);

      console.log('marca', marca); // Verifica que la marca se haya encontrado
      return marca ? marca.nombre : 'Desconocida'; // Devuelve el nombre de la marca o 'Desconocida'
    }
    return 'Desconocida'; // Si no hay modelo o no tiene un idMarca
  };
  
  // Función para manejar la navegación al formulario de alta de vehículo
  const handleAddNuevoVehiculo = () => {
    setRedirect(true); // Cambiar el estado para activar la redirección
  };

  // Si se debe redirigir, renderiza Navigate
  if (redirect) {
    return <Navigate to="/alta-vehiculo" />;
  }

  return (
    <>
      <Box sx={{ width: '95%', margin: '0 auto', overflowX: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h2">
            Mis Vehículos
          </Typography>
          <Button variant="contained" color="primary" startIcon={<PlusOutlined />} onClick={handleAddNuevoVehiculo}>
            Agregar Nuevo
          </Button>
        </Box>
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
