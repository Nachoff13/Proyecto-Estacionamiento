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
import EditProfileModal from './EditProfileModal'; // Importa el componente de edición de perfil
import ChangeProfileImageModal from './ChangeProfileImageModal'; // Importa el nuevo componente

//componentes
import TablaGarajes from './tablaGarajes';
import TablaVehiculos from './tablaVehiculos';

//data
import { useGetUsuarioIndividual } from 'api/Usuario';
import { useGetGarajeConPropietario } from 'api/Garaje';
import { useGetLocalidad } from 'api/Localidad';
import { useGetVehiculoConConductor } from 'api/Vehiculo';
import { useGetModelo } from 'api/Modelo';
import { useGetMarca } from 'api/Marca';
import InfoPerfil from './infoPerfil';

export default function UserProfile() {
  // Estado para manejar el modal de la imagen
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [modo, setModo] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: 'Argentino de corazón, amante del fútbol, el mate y los asados. Disfruto de las pequeñas cosas de la vida, rodeado de amigos y familia.',
    image: localStorage.getItem('profileImage') || avatar // Cargar la imagen desde localStorage o usar la imagen por defecto
  });
  const [usuarioData, setUsuarioData] = useState(null);

  const { localidad, localidadLoading, localidadError } = useGetLocalidad();

  const idUsuario = 3;
  const { usuarioIndividual, usuarioIndividualLoading, usuarioIndividualError } = useGetUsuarioIndividual(idUsuario);

  const idPropietario = 3;
  const { garajeConPropietario, garajeConPropietarioLoading, garajeConPropietarioError } = useGetGarajeConPropietario(idPropietario);

  const idConductor = 4;
  const { vehiculo, vehiculoLoading, vehiculoError } = useGetVehiculoConConductor(idConductor);

  // Obtengo datos de modelos
  const { modelo } = useGetModelo();

  // Obtengo datos de marcas
  const { marca } = useGetMarca();

  // Función para manejar la carga del usuario
  const manejarCargaUsuario = () => {
    if (usuarioIndividualLoading) {
      console.log('Cargando datos del usuario...');
      return;
    }

    if (usuarioIndividualError) {
      console.error('Error al obtener usuario:', usuarioIndividualError);
      return; // Salir si hay un error
    }

    if (usuarioIndividual) {
      console.log('Usuario obtenido:', usuarioIndividual);
      setUsuarioData(usuarioIndividual);
    } else {
      console.log('No se encontraron usuarios.');
    }
  };

  const manejarCargaGaraje = () => {
    if (garajeConPropietarioError) {
      console.error('Error al obtener garajes:', garajeConPropietarioError);
      return; // Salir si hay un error
    }

    // Verifica si los datos están disponibles
    if (garajeConPropietario && Array.isArray(garajeConPropietario) && garajeConPropietario.length > 0) {
      console.log('Garajes obtenidos:', garajeConPropietario);
    } else {
      console.log('No se encontraron garajes.');
    }
  };

  const manejarCargaVehiculo = () => {
    if (vehiculoError) {
      console.error('Error al obtener vehículos:', vehiculoError);
      return; // Salir si hay un error
    }
    if (vehiculo.length > 0) {
      console.log('Vehículos obtenidos:', vehiculo);
    } else {
      console.log('No se encontraron vehículos.');
    }
  };

  const manejarCargaModelo = () => {
    if (modelo.length > 0) {
      console.log('Modelos obtenidos:', modelo);
    } else {
      console.log('No se encontraron modelos.');
    }
  };
  const manejarCargaMarca = () => {
    if (marca.length > 0) {
      console.log('Marcas obtenidos:', marca);
    } else {
      console.log('No se encontraron marcas.');
    }
  };

  useEffect(() => {
    manejarCargaUsuario();
    manejarCargaGaraje();
    manejarCargaVehiculo();
    manejarCargaModelo();
    manejarCargaMarca();
  }, [
    garajeConPropietario,
    garajeConPropietarioLoading,
    garajeConPropietarioError,
    vehiculo,
    vehiculoLoading,
    vehiculoError,
    modelo,
    marca,
    usuarioIndividual,
    usuarioIndividualError,
    usuarioIndividualLoading
  ]);

  useEffect(() => {
    // Obtener el modo desde localStorage
    const savedModo = localStorage.getItem('modo');
    setModo(savedModo ? JSON.parse(savedModo) : false);
  }, []);

  // Función para obtener la localidad por ID
  const getLocalidad = (idLocalidad) => {
    const localidadEncontrada = localidad.find((loc) => loc.id === idLocalidad);
    return localidadEncontrada ? localidadEncontrada.nombre : 'Desconocido';
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
      {usuarioIndividualLoading ? (
        <p>Cargando...</p> // Muestra un mensaje de carga mientras se obtienen los datos
      ) : (
        <InfoPerfil profileData={profileData} usuarioData={usuarioData} handleImageModalOpen={handleImageModalOpen} />
      )}

      {/* Mostrar TablaGarajes si es propietario */}
      {usuarioData?.espropietario && <TablaGarajes modo={modo} garajeConPropietario={garajeConPropietario} getLocalidad={getLocalidad} />}
      <br />
      {/* Mostrar TablaVehiculos si es conductor */}
      {usuarioData?.esconductor && <TablaVehiculos vehiculos={vehiculo} modelos={modelo} marcas={marca} />}

      {/* Si el usuario es ambos (conductor y propietario), se mostrarán ambas tablas */}
      {(usuarioData?.esconductor || usuarioData?.espropietario)}

      {/* Modal para editar perfil */}
      <EditProfileModal open={editOpen} handleClose={handleEditClose} usuarioData={usuarioData} setUsuarioData={setUsuarioData} />

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
