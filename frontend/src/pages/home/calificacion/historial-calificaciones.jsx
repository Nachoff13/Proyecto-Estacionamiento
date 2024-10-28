import React from 'react';
import { useParams } from 'react-router-dom';

import { Typography, List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar } from '@mui/material';
import MainCard from 'components/MainCard';

// import data
import fakeCalificaciones from 'data/data-calificaciones';

const HistorialCalificaciones = () => {
  const { id } = useParams(); // ID de los parámetros de la URL
  console.log('El ID del garaje es:', id);

  // Filtrar calificaciones por IdGaraje
  const calificacionesFiltradas = fakeCalificaciones.filter((calificacion) => calificacion.IdGaraje === parseInt(id));

  return (
    <MainCard title="Historial de Calificaciones" sx={{ mt: 2 }} content={false} spacing={2}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {calificacionesFiltradas.length > 0 ? (
          calificacionesFiltradas.map((calificacion) => (
            <MainCard key={calificacion.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="" size="sm">
                    U
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body1" color="text.primary">
                        {calificacion.comentario} - Puntuación: {calificacion.puntuacion} estrellas
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {calificacion.usuario}
                      </Typography>
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
    </MainCard>
  );
};

export default HistorialCalificaciones;
