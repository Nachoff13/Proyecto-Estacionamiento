import { useState, useEffect } from 'react';
import { Typography, Button, Chip, Fab, Tooltip, IconButton, ImageList, ImageListItem } from '@mui/material';
import MainCard from 'components/MainCard';
import EditModal from 'components/modals/EditModal';
import { useNavigate } from 'react-router-dom';
import EditOutlined from '@ant-design/icons/EditOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';

export default function HomePropietario() {
  const [opened, setOpened] = useState(false);
  const [currentGaraje, setCurrentGaraje] = useState({});
  const [garages, setGarages] = useState([]);
  const [garageImages, setGarageImages] = useState({});
  const [localidades, setLocalidades] = useState([]);
  const navigate = useNavigate();

  const propietarioId = 3;

  const fetchGarages = async () => {
    try {
      const response = await fetch(`https://localhost:7294/Garaje/ObtenerConPropietario/${propietarioId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const garagesData = await response.json();
      setGarages(garagesData);

      for (const garage of garagesData) {
        await fetchGarageImages(garage.id);
      }
    } catch (error) {
      console.error("Error fetching garages:", error);
    }
  };

  const fetchLocalidades = async () => {
    try {
      const response = await fetch("https://localhost:7294/Localidad/Obtener", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const localidadesData = await response.json();
      setLocalidades(localidadesData);
    } catch (error) {
      console.error("Error fetching localidades:", error);
    }
  };

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
          [idGaraje]: imagesData.map((img) => URL.createObjectURL(new Blob([new Uint8Array(img.foto.split(',').map(Number))], { type: 'image/jpeg' })))
        }));
      }
    } catch (error) {
      console.error(`Error fetching images for garage ${idGaraje}:`, error);
    }
  };

  useEffect(() => {
    fetchGarages();
    fetchLocalidades();
  }, []);

  const getLocalidadName = (idLocalidad) => {
    const localidad = localidades.find(loc => loc.id === idLocalidad);
    return localidad ? localidad.nombre : "Localidad desconocida";
  };

  const handleOpen = (garaje) => {
    setCurrentGaraje(garaje);
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
    setCurrentGaraje({});
  };

  const handleAddGaraje = () => {
    navigate('/alta-garaje');
  };

  const handleOpenHistorial = (garaje) => {
    setCurrentGaraje(garaje);
    navigate('/historial-reservas', { state: { garajeId: garaje.id } });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '16px' }}>
      {garages.map((garaje, index) => (
        <MainCard
          key={garaje.id}
          style={{
            width: '32%', 
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            padding: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" style={{ marginBottom: '8px' }}>
              Mi garaje {index + 1}
            </Typography>
            <Chip
              label={garaje.disponible ? "Disponible" : "Reservado"}
              color={garaje.disponible ? "success" : "warning"}
              variant="outlined"
              style={{ marginBottom: '8px' }}
            />
          </div>
          <div style={{ flex: '1', overflow: 'hidden', marginBottom: '8px' }}>
            <ImageList cols={1} rowHeight={150} style={{ width: '100%', height: 'auto' }}>
              {(garageImages[garaje.id] || []).map((src, idx) => (
                <ImageListItem key={idx}>
                  <img
                    src={src}
                    alt={`Foto ${idx + 1} del garaje ${garaje.id}`}
                    style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: '8px' }} 
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
          <Typography variant="body2" style={{ paddingBottom: '8px' }}>
            <strong>Localidad: </strong> {getLocalidadName(garaje.idlocalidad)} <br />
            <strong>Ubicación:</strong> {garaje.calle} N° {garaje.altura} <br />
            <strong>Descripción:</strong> {garaje.descripcion} <br />
            <strong>Precio por hora:</strong> ${garaje.preciohora} <br />
            <strong>Capacidad:</strong> {garaje.capacidad} vehículos <br />
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Ver Historial">
              <IconButton color="primary" onClick={() => handleOpenHistorial(garaje)}>
                <HistoryOutlined style={{ fontSize: '24px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton color="success" onClick={() => handleOpen(garaje)}>
                <EditOutlined style={{ fontSize: '24px' }} />
              </IconButton>
            </Tooltip>
          </div>
        </MainCard>
      ))}
      
      <Fab
        color="secondary"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}
        onClick={handleAddGaraje}
      >
        +
      </Fab>

      <EditModal opened={opened} onClose={handleClose} data={currentGaraje} />
    </div>
  );
}