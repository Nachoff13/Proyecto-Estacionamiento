import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Box, Typography, Tooltip, List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar } from '@mui/material';
import MainCard from 'components/MainCard';

//icons
import { PlusCircleOutlined } from '@ant-design/icons';

// import data
import fakeCalificaciones from 'data/data-calificaciones';
import fakeUsuarios from 'data/data-usuarios';

//import compinetnes
import NuevaCalificacionModal from './nuevaReseña';
import getColorFromName from 'utils/getColorFromName';
import StarRating from 'utils/StarRating';

const HistorialCalificaciones = () => {
  const { id } = useParams(); // ID de los parámetros de la URL
  console.log('El ID del garaje es:', id);

  const [modalOpened, setModalOpened] = useState(false);

  // Filtrar calificaciones por IdGaraje
  const calificacionesFiltradas = fakeCalificaciones.filter((calificacion) => calificacion.IdGaraje === parseInt(id));

  // Mapear calificaciones a incluir nombres y apellidos de usuarios
  const calificacionesConNombres = calificacionesFiltradas.map((calificacion) => {
    const usuario = fakeUsuarios.find((user) => user.id === calificacion.idUsuario);

    return {
      ...calificacion,
      nombreUsuario: usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido'
    };
  });

  const manejarEnvio = (comentario, puntuacion) => {
    const nuevaCalificacion = {
      id: Date.now(),
      comentario,
      puntuacion,
      idUsuario: 3 //jhon dhoe
    };
  };
  return (
    <MainCard sx={{ mt: 2, p: 3 }} content={false}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Reseñas del garaje N° {id}
        </Typography>
        <Tooltip title="Nueva reseña">
          <Button variant="outlined" startIcon={<PlusCircleOutlined />} onClick={() => setModalOpened(true)}>
            Nueva
          </Button>
        </Tooltip>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {calificacionesConNombres.length > 0 ? (
          calificacionesConNombres.map((calificacion) => (
            <MainCard key={calificacion.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={calificacion.nombreUsuario} sx={{ bgcolor: getColorFromName(calificacion.nombreUsuario) }} size="sm">
                    {calificacion.nombreUsuario.charAt(0)} {/* Muestra la inicial del nombre */}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body1" color="text.primary">
                        {calificacion.comentario}
                      </Typography>
                      <StarRating rating={calificacion.puntuacion} /> {/* Muestra las estrellas */}
                      <Box display="flex" alignItems="center">
                        {' '}
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                          {' '}
                          {calificacion.nombreUsuario}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {calificacion.fecha}
                        </Typography>
                      </Box>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </MainCard>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No hay reseñas disponibles para este garaje.
          </Typography>
        )}
      </List>
      <NuevaCalificacionModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Nueva reseña"
        idGaraje={id}
        onSubmit={manejarEnvio}
      />
    </MainCard>
  );
};

export default HistorialCalificaciones;
