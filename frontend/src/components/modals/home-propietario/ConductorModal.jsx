import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

const ConductorModal = ({ open, onClose, conductor }) => {
  if (!conductor) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          p: 4,
          bgcolor: 'white',
          borderRadius: '8px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'red'
          }}
        >
          <CloseOutlined />
        </IconButton>

        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Información del Conductor
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Nombre: {conductor.nombre} {conductor.apellido}
        </Typography>

        <Box sx={{ my: 2, height: '1px', bgcolor: 'lightgray' }} />
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Información de Contacto
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Correo: {conductor.mail}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ConductorModal;
