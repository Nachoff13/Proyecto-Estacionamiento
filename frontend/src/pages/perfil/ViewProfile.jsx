import React from 'react';
import { Box, Typography, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import avatar from './avatar.png'; 

const user = {
  nombre: 'John',
  apellido: 'Doe',
  email: 'john.doe@example.com',
  username: 'jhondoe',
  bio: 'Aca podría ir una breve descripción del usuario.',
};

// fake data de los garages
const garages = [
  {
    localidad: 'La Plata',
    altura: '1234',
    calle: 'Av. Libertador',
    precioPorHora: '$10',
    capacidad: '2 autos',
    estado: 'Disponible',
    imagen: 'path/to/image1.jpg', // aca iria la ruta de la imagen
  },
  {
    localidad: 'City Bell',
    altura: '5678',
    calle: 'Calle Falsa',
    precioPorHora: '$15',
    capacidad: '1 auto',
    estado: 'Ocupado',
    imagen: 'path/to/image2.jpg', 
  },
  {
    localidad: 'Los Hornos',
    altura: '4321',
    calle: 'Calle Ejemplo',
    precioPorHora: '$12',
    capacidad: '3 autos',
    estado: 'Disponible',
    imagen: 'path/to/image3.jpg', 
  },
];

export default function UserProfile() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 4, bgcolor: '#f5f5f5' }}>
      <Typography variant="h2" component="h1" sx={{ mb: 3, alignSelf: 'flex-start' }}>
        Perfil
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
        <Box
          component="img"
          alt="Perfil de usuario"
          src={avatar} 
          sx={{ borderRadius: '50%', width: '180px', height: '180px', mb: 3 }} 
        />
        <Typography variant="h3" component="div" sx={{ mb: 1 }}>
          {user.nombre} {user.apellido}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          @{user.username}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center', maxWidth: 600, fontSize: '1.2rem' }}>
          {user.bio}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.2rem' }}>
          Email: {user.email}
        </Typography>
      </Box>

      {/* Tabla de Mis Garages */}
      <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
        Mis Garages
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Localidad</TableCell>
              <TableCell>Altura</TableCell>
              <TableCell>Calle</TableCell>
              <TableCell>Precio por Hora</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Imágenes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {garages.map((garage, index) => (
              <TableRow key={index}>
                <TableCell>{garage.localidad}</TableCell>
                <TableCell>{garage.altura}</TableCell>
                <TableCell>{garage.calle}</TableCell>
                <TableCell>{garage.precioPorHora}</TableCell>
                <TableCell>{garage.capacidad}</TableCell>
                <TableCell>{garage.estado}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                    Ver Imágenes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item>
          <Button variant="contained" color="primary" size="small">
            Editar Perfil
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" size="small">
            Cerrar Sesión
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
