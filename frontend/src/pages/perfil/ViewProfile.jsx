import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal
} from '@mui/material';
import avatar from './avatar.png';
import fakeGarajes from 'data/data-garajes'; // Importa los datos de garajes
import fakeGarajeEstado from 'data/data-garajeestado'; // Importa los estados de los garajes
import fakeFotosGarajes from 'data/data-garajefoto'; // Importa las fotos de los garajes
import fakeLocalidades from 'data/data-localidades'; // Importa las localidades
import fakeUsuarios from 'data/data-usuarios'; // Importa los usuarios

// Simulación de un usuario logueado
const currentUser = fakeUsuarios.find((user) => user.username === 'johndoe'); // Puedes cambiar esto para obtener el usuario dinámicamente

export default function UserProfile() {
  // Estado para manejar el modal de la imagen
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Filtra los garajes del usuario actual (idPropietario)
  const userGarages = fakeGarajes.filter((garage) => garage.idPropietario === currentUser.id);

  // Función para obtener el nombre del estado del garaje
  const getGarageState = (idGarajeEstado) => {
    const estado = fakeGarajeEstado.find((estado) => estado.id === idGarajeEstado);
    return estado ? estado.nombre : 'Desconocido';
  };

  // Función para obtener el nombre de la localidad
  const getLocalidadName = (idLocalidad) => {
    const localidad = fakeLocalidades.find((localidad) => localidad.id === idLocalidad);
    return localidad ? localidad.nombre : 'Desconocido';
  };

  // Función para obtener las imágenes del garaje
  const getGarageImages = (idGaraje) => {
    return fakeFotosGarajes.filter((foto) => foto.idGaraje === idGaraje);
  };

  // Maneja el evento de abrir el modal
  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  // Maneja el evento de cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 4, bgcolor: '#f5f5f5' }}>
      <Typography variant="h2" component="h1" sx={{ mb: 3, alignSelf: 'flex-start' }}>
        Perfil
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
        <Box component="img" alt="Perfil de usuario" src={avatar} sx={{ borderRadius: '50%', width: '180px', height: '180px', mb: 3 }} />
        <Typography variant="h3" component="div" sx={{ mb: 1 }}>
          {currentUser.nombre} {currentUser.apellido}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          @{currentUser.username}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center', maxWidth: 600, fontSize: '1.2rem' }}>
          Aquí podría ir una breve descripción del usuario.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.2rem' }}>
          Email: {currentUser.mail}
        </Typography>
      </Box>

      {/* Tabla de Mis Garages */}
      <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
        Mis Garages
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 1, overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Localidad</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Altura</TableCell>
              <TableCell>Calle</TableCell>
              <TableCell>Precio por Hora</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Capacidad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Imágenes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userGarages.map((garage, index) => (
              <TableRow key={index}>
                <TableCell>{getLocalidadName(garage.idLocalidad)}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{garage.altura}</TableCell>
                <TableCell>{garage.calle}</TableCell>
                <TableCell>{`$${garage.precioHora}`}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  {garage.capacidad} {garage.capacidad > 1 ? 'autos' : 'auto'}
                </TableCell>
                <TableCell>{getGarageState(garage.idGarajeEstado)}</TableCell>
                <TableCell>
                  {getGarageImages(garage.id).map((img, idx) => (
                    <Button key={idx} onClick={() => handleOpen(img.foto)} sx={{ padding: 0, minWidth: 'auto' }}>
                      <img src={img.foto} alt="Garage" width="50" style={{ marginRight: '8px' }} />
                    </Button>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para mostrar imagen ampliada */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img src={selectedImage} alt="Imagen del garaje" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Box>
      </Modal>

      <Grid container spacing={3} justifyContent="flex-end" sx={{ mt: 10 }}>
        <Grid item>
          <Button variant="contained" color="primary" size="medium" sx={{ minWidth: '120px' }}>
            Editar Perfil
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" size="medium" sx={{ minWidth: '120px' }}>
            Cerrar Sesión
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
