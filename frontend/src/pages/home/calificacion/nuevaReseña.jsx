import React, { useState } from 'react';
import { Modal, Typography, Button, TextField, Box } from '@mui/material';

// Componentes
import StarRating from 'utils/StarRating';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

const NuevaCalificacionModal = ({ opened, onClose, title, idGaraje, onSubmit }) => {
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [nuevaPuntuacion, setNuevaPuntuacion] = useState(0);

  const handleSubmit = () => {
    onSubmit(nuevoComentario, nuevaPuntuacion);
    setNuevoComentario('');
    setNuevaPuntuacion(0);
    onClose();
  };

  const handleClose = () => {
    setNuevoComentario('');
    setNuevaPuntuacion(0);
    onClose();
  };

  return (
    <Modal open={opened} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {title} al garaje N° {idGaraje}
        </Typography>
        <TextField
          label="Comentario"
          name="comentario"
          value={nuevoComentario}
          onChange={(event) => setNuevoComentario(event.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          sx={{ minHeight: '100px' }}
        />
        {/* Componente de selección de estrellas */}
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Puntuación:
        </Typography>
        <StarRating rating={nuevaPuntuacion} onRatingChange={setNuevaPuntuacion} />

        {/* Contenedor para los botones */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="contained" color="error" onClick={handleClose} sx={{ marginRight: 1 }}>
            Cancelar
          </Button>

          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginLeft: 1 }}>
            Enviar reseña
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NuevaCalificacionModal;
