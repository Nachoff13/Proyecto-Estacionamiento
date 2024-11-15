import React, { useState } from 'react';
import { Typography, Box, Chip } from '@mui/material';

const InfoPerfil = ({ profileData, usuarioData, handleImageModalOpen }) => {
  // Función para determinar los roles del usuario
  const obtenerRoles = () => {
    const roles = [];
    if (usuarioData) {
      if (usuarioData.espropietario) {
        roles.push({ label: 'Propietario', color: 'primary' }); // Azul
      }
      if (usuarioData.esconductor) {
        roles.push({ label: 'Conductor', color: 'success' }); // Verde oscuro
      }
    }
    return roles;
  };

  const roles = obtenerRoles();

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ mb: -4, alignSelf: 'flex-start' }}>
          Perfil
        </Typography>

        {/* Verificación de usuarioData antes de acceder a sus propiedades */}
        {usuarioData ? (
          <>
            <Box
              component="img"
              alt="Perfil de usuario"
              src={profileData.image}
              sx={{
                borderRadius: '50%',
                width: '180px',
                height: '180px',
                mb: 3,
                cursor: 'pointer',
                transition: 'transform 0.3s, opacity 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                  opacity: 0.8
                }
              }}
              onClick={handleImageModalOpen}
            />
            <Typography variant="h2" component="div" sx={{ mb: 1 }}>
              {usuarioData.nombre} {usuarioData.apellido}
            </Typography>
            <Typography variant="h4" color="text.secondary" sx={{ mb: 2 }}>
              @{usuarioData.username}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {roles.length > 0 ? (
                roles.map((role, index) => <Chip key={index} label={role.label} color={role.color} />)
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Sin rol asignado
                </Typography>
              )}
            </Box>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.2rem' }}>
              Email: {usuarioData.mail}
            </Typography>
          </>
        ) : (
          <Typography variant="h6" color="text.secondary">
            Cargando datos del usuario...
          </Typography>
        )}
      </Box>
    </>
  );
};

export default InfoPerfil;
