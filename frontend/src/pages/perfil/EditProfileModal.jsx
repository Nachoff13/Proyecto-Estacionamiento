import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';

const EditProfileModal = ({ open, handleClose, usuarioData, setUsuarioData }) => {
  const [tempUsuarioData, setTempUsuarioData] = useState(usuarioData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setTempUsuarioData(usuarioData); // Resetear los datos temporales cuando se abre el modal
    }
  }, [open, usuarioData]);

  // Maneja el cambio en los campos del formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUsuarioData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Maneja la validación y el cierre del modal
  const handleSave = () => {
    let validationErrors = {};

    if (!tempUsuarioData.username) {
      validationErrors.username = 'El nombre de usuario no puede estar vacío';
    }

    if (!tempUsuarioData.nombre) {
      validationErrors.nombre = 'El nombre no puede estar vacío';
    }
    if (!tempUsuarioData.apellido) {
      validationErrors.apellido = 'El apellido no puede estar vacío';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setUsuarioData(tempUsuarioData); // Actualizar el estado principal solo cuando se hace clic en "Guardar"
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
        {/* Verificación de tempUsuarioData antes de acceder a sus propiedades */}
        {tempUsuarioData ? (
          <>
            {/* Campo para Nombre */}
            <TextField
              label="Nombre"
              name="nombre"
              value={tempUsuarioData.nombre}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.nombre}
              helperText={errors.nombre}
            />

            {/* Campo para Apellido */}
            <TextField
              label="Apellido"
              name="apellido"
              value={tempUsuarioData.apellido}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.apellido}
              helperText={errors.apellido}
            />

            {/* Campo para Nombre de Usuario */}
            <TextField
              label="Nombre de Usuario"
              name="username"
              value={tempUsuarioData.username}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.username}
              helperText={errors.username}
            />
          </>
        ) : (
          <Typography variant="h6" color="text.secondary">
            Cargando datos del usuario...
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;