import { useState } from "react";

// material-ui
import { Typography, Button, Chip } from "@mui/material";

// project import
import MainCard from "components/MainCard";

//components
import EditModal from "components/modals/EditModal";

// data imports
import fakeGarajes from "data/data-garajes";
import fakeFotosGarajes from "data/data-garajefoto";
import fakeUsuarios from "data/data-usuarios";
import fakeLocalidades from "data/data-localidades";
import fakeGarajeEstado from "data/data-garajeestado";

// ==============================|| HOME PROPIETARIO ||============================== //

export default function HomePropietario() {
  //-------------------------------LOGICA-----------------------------------
  const [opened, setOpened] = useState(false);
  const [currentGaraje, setCurrentGaraje] = useState({
    id: null,
    idPropietario: null,
    idLocalidad: null,
    idGarajeEstado: null,
    altura: '',
    calle: '',
    descripcion: '',
    precioHora: null,
    capacidad: null
  });

  console.log("Garajes:", currentGaraje);

  // Obtener el propietario con id 2
  const propietarioId = 3;
  const garajesPropietario = fakeGarajes.filter(
    (garaje) => garaje.idPropietario === propietarioId
  );

  const getLocalidad = (idLocalidad) => {
    const localidad = fakeLocalidades.find((loc) => loc.id === idLocalidad);
    return localidad ? localidad.nombre : "Desconocido";
  };

  const getFotoGaraje = (idGaraje) => {
    const fotoGaraje = fakeFotosGarajes.find(
      (foto) => foto.idGaraje === idGaraje
    );
    return fotoGaraje ? fotoGaraje.foto : "default-foto.jpg"; // En caso de que no encuentre foto
  };

  const getEstadoGaraje = (idGarajeEstado) => {
    const estado = fakeGarajeEstado.find((est) => est.id === idGarajeEstado);
    return estado ? estado.nombre : "Desconocido";
  };

  //-------------------------------GET COLOR ESTADO-----------------------------------
  const getColorEstado = (idGarajeEstado) => {
    switch (idGarajeEstado) {
      case 1: // Disponible
        return "success";
      case 2: // Reservado
        return "warning";
      case 3: // No Disponible
        return "error";
      default:
        return "default";
    }
  };

  //-------------------------------HANDLE EDITAR-----------------------------------
  const handleOpen = (garaje) => {
    setCurrentGaraje(garaje);
    setOpened(true);
  };
  

  const handleClose = () => {
    setOpened(false);
    setCurrentGaraje(null); 
  };

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", width: "100%", gap: "16px" }}
    >
      {garajesPropietario.map((garaje, index) => (
        <MainCard
          key={garaje.id}
          style={{
            width: "30%",
            boxSizing: "border-box",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "8px" }}>
              Mi garaje {index + 1}
            </Typography>
            <Chip
              label={getEstadoGaraje(garaje.idGarajeEstado)}
              color={getColorEstado(garaje.idGarajeEstado)}
              variant="outlined"
              style={{ marginBottom: "8px" }}
            />
          </div>
          <div style={{ flex: "1", overflow: "hidden" }}>
            <img
              src={getFotoGaraje(garaje.id)} // Obtener la imagen del garaje
              alt={`Foto del garaje ${garaje.id}`}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <Typography variant="body2">
              <strong>Localidad: </strong> {getLocalidad(garaje.idLocalidad)}{" "}
              <br />
              <strong>Ubicación:</strong> {garaje.calle} N° {garaje.altura}{" "}
              <br />
              <strong>Descripción:</strong> {garaje.descripcion} <br />
              <strong>Precio por hora:</strong> ${garaje.precioHora} <br />
              <strong>Capacidad:</strong> {garaje.capacidad} vehículos <br />
            </Typography>
          </div>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(garaje)}
          >
            Editar
          </Button>
          </div>
        </MainCard>
      ))}
      <EditModal
        opened={opened}
        onClose={handleClose}
        data={currentGaraje} // Pasar los datos del garaje seleccionado
      />
    </div>
  );
}
