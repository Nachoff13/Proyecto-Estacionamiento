import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button
} from '@mui/material';

const EditProfileModal = ({ open, handleClose, profileData, setProfileData }) => {
  const [errors, setErrors] = useState({});

  // Maneja el cambio en los campos del formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Maneja la validación y el cierre del modal
  const handleSave = () => {
    let validationErrors = {};

    if (!profileData.username) {
      validationErrors.username = 'El nombre de usuario no puede estar vacío';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      handleClose();
    }
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
          Editar Perfil
        </Typography>
        <TextField
          label="Nombre de Usuario"
          name="username"
          value={profileData.username}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Biografía"
          name="bio"
          value={profileData.bio}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 2 }}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>Guardar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;