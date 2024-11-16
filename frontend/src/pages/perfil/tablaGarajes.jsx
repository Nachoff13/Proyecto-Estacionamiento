import React, { useState, useEffect } from 'react';
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
  Modal,
  ImageList,
  ImageListItem
} from '@mui/material';
import { useGetGarajeFoto } from 'api/GarajeFoto';

const TablaGarajes = ({ modo, garajeConPropietario, getLocalidad }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  // Estado para almacenar las fotos de cada garaje
  const [garageImages, setGarageImages] = useState({});

  // Función para obtener imágenes del garaje
  const fetchGarageImages = async (idGaraje) => {
    try {
      const response = await fetch(`https://localhost:7294/GarajeFoto/ObtenerFotosDeGaraje/${idGaraje}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 404) {
        console.warn(`No images found for garage ${idGaraje}`);
        return;
      }

      const imagesData = await response.json();
      if (imagesData && imagesData.length > 0) {
        setGarageImages((prevImages) => ({
          ...prevImages,
          [idGaraje]: imagesData.map((img) =>
            URL.createObjectURL(new Blob([new Uint8Array(img.foto.split(',').map(Number))], { type: 'image/jpeg' }))
          )
        }));
      }
    } catch (error) {
      console.error(`Error fetching images for garage ${idGaraje}:`, error);
    }
  };

  useEffect(() => {
    if (garajeConPropietario.length > 0) {
      garajeConPropietario.forEach((garage) => {
        fetchGarageImages(garage.id);
      });
    }
  }, [garajeConPropietario]);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  const Dot = ({ color }) => {
    return (
      <span
        style={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: color,
          marginRight: '8px', // Espaciado entre el punto y el texto
        }}
      />
    );
  };
  return (
    <>
      {/* Condicionalmente renderizar la tabla de Mis Garages */}
      {modo === false && (
        <>
          <Box sx={{ width: '95%', margin: '0 auto', overflowX: 'auto' }}>
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
              Mis Garajes
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Localidad</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Altura</TableCell>
                    <TableCell>Calle</TableCell>
                    <TableCell>Precio por Hora</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Capacidad</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Imágenes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {garajeConPropietario.map((garage) => (
                    <TableRow key={garage.id}>
                      <TableCell>{getLocalidad(garage.idlocalidad)}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{garage.altura}</TableCell>
                      <TableCell>{garage.calle}</TableCell>
                      <TableCell>{`$${garage.preciohora}`}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        {garage.capacidad} {garage.capacidad > 1 ? 'autos' : 'auto'}
                      </TableCell>
                      <TableCell>{garage.descripcion}</TableCell> {/* Agregado para mostrar la descripción */}
                      <TableCell>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Dot color={garage.disponible ? 'green' : 'orange'} />
                            <Typography variant="body1">{garage.disponible ? 'Disponible' : 'Reservado'}</Typography>
                          </div>
                        </TableCell>
                      </TableCell>{' '}
                      {/* Estado de disponibilidad */}
                      <TableCell>
                        {/* Renderiza las imágenes del garaje o un mensaje si no hay fotos */}
                        {garageImages[garage.id] && garageImages[garage.id].length > 0 ? (
                          <div style={{ flex: '1', overflow: 'hidden', marginBottom: '8px' }}>
                            <ImageList cols={1} rowHeight={150} style={{ width: '100%', height: 'auto' }}>
                              {garageImages[garage.id].map((src, idx) => (
                                <ImageListItem key={idx}>
                                  <img
                                    src={src}
                                    alt={`Foto ${idx + 1} del garaje ${garage.id}`}
                                    style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: '8px' }}
                                    onClick={() => handleOpen(src)}
                                  />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          </div>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No tiene fotos disponibles
                          </Typography>
                        )}
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
