import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';


//estilo del modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ opened, onClose, data }) {
  const [formData, setFormData] = useState({
    altura: '',
    calle: '',
    capacidad: '',
    descripcion: '',
    precioHora: ''
  });

  // Actualiza el estado del form al traer nueva data
  useEffect(() => {
    if (data) {
      setFormData({
        altura: data.altura || '',
        calle: data.calle || '',
        capacidad: data.capacidad || '',
        descripcion: data.descripcion || '',
        precioHora: data.precioHora || ''
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      open={opened}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Editar Garaje
        </Typography>
        
        <TextField
          label="Altura"
          name="altura"
          value={formData.altura}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Calle"
          name="calle"
          value={formData.calle}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Capacidad de Vehículos"
          name="capacidad"
          type="number"
          value={formData.capacidad}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Precio por Hora"
          name="precioHora"
          type="number"
          value={formData.precioHora}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        
        {/* Contenedor para los botones */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button 
            variant="contained" 
            color="error" 
            onClick={onClose} // cierra el modal
            sx={{ marginRight: 1 }}
          >
            Cancelar
          </Button>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {}} // todavia no hay logica
            sx={{ marginLeft: 1 }}
          >
            Editar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}