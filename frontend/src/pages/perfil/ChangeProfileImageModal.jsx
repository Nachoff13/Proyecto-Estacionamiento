import React from 'react';
import {
  Box,
  Typography,
  Modal,
  Button
} from '@mui/material';

const ChangeProfileImageModal = ({ open, handleClose, setProfileData }) => {
  // Maneja la carga de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newImage = reader.result;
      setProfileData((prevData) => ({
        ...prevData,
        image: newImage
      }));
      localStorage.setItem('profileImage', newImage); // Guardar la imagen en localStorage
      handleClose();
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Cambiar Imagen de Perfil
        </Typography>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mb: 2 }}
        >
          Seleccionar Archivo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 2 }}>Cancelar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeProfileImageModal;