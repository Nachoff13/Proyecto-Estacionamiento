import React, { useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const InfoPerfil = ({profileData , currentUser, handleImageModalOpen}) => {
  return (
    <>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
      <Typography variant="h3" component="h1" sx={{ mb: -4, alignSelf: 'flex-start' }}>
        Perfil
      </Typography>
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
          {currentUser.nombre} {currentUser.apellido}
        </Typography>
        <Typography variant="h4" color="text.secondary" sx={{ mb: 2 }}>
          @{profileData.username}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'center', maxWidth: 600, fontSize: '1.2rem' }}>
          {profileData.bio}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontSize: '1.2rem' }}>
          Email: {currentUser.mail}
        </Typography>
      </Box>
    </>
  );
};

export default InfoPerfil;
