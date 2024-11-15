import React, { useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal
} from '@mui/material';

const TablaGarajes = ({ modo, userGarages, getLocalidadName, getGarageState, getGarageImages }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      {/* Condicionalmente renderizar la tabla de Mis Garages */}
      {modo === false && (
        <>
          <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
            Mis Garages
          </Typography>
          <Box sx={{ width: '95%', margin: '0 auto', overflowX: 'auto' }}>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Localidad</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Altura</TableCell>
                    <TableCell>Calle</TableCell>
                    <TableCell>Precio por Hora</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Capacidad</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Imágenes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userGarages.map((garage, index) => (
                    <TableRow key={index}>
                      <TableCell>{getLocalidadName(garage.idLocalidad)}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{garage.altura}</TableCell>
                      <TableCell>{garage.calle}</TableCell>
                      <TableCell>{`$${garage.precioHora}`}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        {garage.capacidad} {garage.capacidad > 1 ? 'autos' : 'auto'}
                      </TableCell>
                      <TableCell>{getGarageState(garage.idGarajeEstado)}</TableCell>
                      <TableCell>
                        {getGarageImages(garage.id).map((img, idx) => (
                          <Button key={idx} onClick={() => handleOpen(img.foto)} sx={{ padding: 0, minWidth: 'auto' }}>
                            <img src={img.foto} alt="Garage" width="80" style={{ marginRight: '8px' }} />
                          </Button>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}

      {/* Modal para mostrar imagen ampliada */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img src={selectedImage} alt="Imagen del garaje" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Box>
      </Modal>
    </>
  );
};

export default TablaGarajes;