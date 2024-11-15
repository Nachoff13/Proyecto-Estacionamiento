import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal
} from '@mui/material';
import avatar from './avatar.png';
import fakeGarajes from 'data/data-garajes'; // Importa los datos de garajes
import fakeGarajeEstado from 'data/data-garajeestado'; // Importa los estados de los garajes
import fakeFotosGarajes from 'data/data-garajefoto'; // Importa las fotos de los garajes
import fakeLocalidades from 'data/data-localidades'; // Importa las localidades
import fakeUsuarios from 'data/data-usuarios'; // Importa los usuarios
import EditProfileModal from './EditProfileModal'; // Importa el componente de edición de perfil
import ChangeProfileImageModal from './ChangeProfileImageModal'; // Importa el nuevo componente

//componentes
import TablaGarajes from './tablaGarajes';
import TablaVehiculos from './tablaVehiculos';

//data
import { useGetVehiculoConConductor } from 'api/Vehiculo';
import { useGetModelo } from 'api/Modelo';
import { useGetMarca } from 'api/Marca';

// Simulación de un usuario logueado
const currentUser = fakeUsuarios.find((user) => user.username === 'johndoe'); // Puedes cambiar esto para obtener el usuario dinámicamente

export default function UserProfile() {
  // Estado para manejar el modal de la imagen
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [modo, setModo] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    username: currentUser.username,
    bio: 'Argentino de corazón, amante del fútbol, el mate y los asados. Disfruto de las pequeñas cosas de la vida, rodeado de amigos y familia.',
    image: localStorage.getItem('profileImage') || avatar // Cargar la imagen desde localStorage o usar la imagen por defecto
  });

  const idConductor = 3;

  // Obtengo datos de la API pasando el idConductor
  const { vehiculo, vehiculoLoading, vehiculoError } = useGetVehiculoConConductor(idConductor);
  // Obtengo datos de modelos
  const { modelo } = useGetModelo();
  // Obtengo datos de marcas
  const { marca } = useGetMarca();

  useEffect(() => {
    if (vehiculoError) {
      console.error('Error al obtener vehículos:', vehiculoError);
      return; // Salir si hay un error
    }
    if (vehiculo.length > 0) {
      console.log('Vehículos obtenidos:', vehiculo);
    } else {
      console.log('No se encontraron vehículos.');
    }

    if (modelo.length > 0) {
      console.log('Modelos obtenidos:', modelo);
    } else {
      console.log('No se encontraron modelos.');
    }

    if (marca.length > 0) {
      console.log('Marcas obtenidos:', marca);
    } else {
      console.log('No se encontraron marcas.');
    }
  }, [vehiculo, vehiculoLoading, vehiculoError, modelo, marca]);

  useEffect(() => {
    // Obtener el modo desde localStorage
    const savedModo = localStorage.getItem('modo');
    setModo(savedModo ? JSON.parse(savedModo) : false);
  }, []);

  // Filtra los garajes del usuario actual (idPropietario)
  const userGarages = fakeGarajes.filter((garage) => garage.idPropietario === currentUser.id);

  // Función para obtener el nombre del estado del garaje
  const getGarageState = (idGarajeEstado) => {
    const estado = fakeGarajeEstado.find((estado) => estado.id === idGarajeEstado);
    return estado ? estado.nombre : 'Desconocido';
  };

  // Función para obtener el nombre de la localidad
  const getLocalidadName = (idLocalidad) => {
    const localidad = fakeLocalidades.find((localidad) => localidad.id === idLocalidad);
    return localidad ? localidad.nombre : 'Desconocido';
  };

  // Función para obtener las imágenes del garaje
  const getGarageImages = (idGaraje) => {
    return fakeFotosGarajes.filter((foto) => foto.idGaraje === idGaraje);
  };

  // Maneja el evento de abrir el modal de imagen
  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  // Maneja el evento de cerrar el modal de imagen
  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  // Maneja el evento de abrir el modal de edición
  const handleEditOpen = () => {
    setEditOpen(true);
  };

  // Maneja el evento de cerrar el modal de edición
  const handleEditClose = () => {
    setEditOpen(false);
  };

  // Maneja el evento de abrir el modal de cambio de imagen
  const handleImageModalOpen = () => {
    setImageModalOpen(true);
  };

  // Maneja el evento de cerrar el modal de cambio de imagen
  const handleImageModalClose = () => {
    setImageModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, bgcolor: '#f5f5f5' }}>
      <Typography variant="h3" component="h1" sx={{ mb: -4, alignSelf: 'flex-start' }}>
        Perfil
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
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

      <TablaGarajes
        modo={modo}
        userGarages={userGarages}
        getLocalidadName={getLocalidadName}
        getGarageState={getGarageState}
        getGarageImages={getGarageImages}
      />
      <br></br>
      {/* Renderiza la tabla de vehículos */}
      {vehiculoLoading && <p>Cargando vehículos...</p>}
      {vehiculoError && <p>Error al cargar vehículos: {vehiculoError.message}</p>}
      {!vehiculoLoading && !vehiculoError && <TablaVehiculos vehiculos={vehiculo} modelos={modelo} marcas={marca} />}

      {/* Modal para editar perfil */}
      <EditProfileModal open={editOpen} handleClose={handleEditClose} profileData={profileData} setProfileData={setProfileData} />

      {/* Modal para cambiar imagen de perfil */}
      <ChangeProfileImageModal open={imageModalOpen} handleClose={handleImageModalClose} setProfileData={setProfileData} />

      <Grid container spacing={3} justifyContent="flex-end" sx={{ mt: 10 }}>
        <Grid item>
          <Button variant="contained" color="primary" size="medium" sx={{ minWidth: '120px' }} onClick={handleEditOpen}>
            Editar Perfil
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" size="medium" sx={{ minWidth: '120px' }}>
            Cerrar Sesión
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
