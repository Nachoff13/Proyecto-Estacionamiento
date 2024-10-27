import { useState } from "react";
import { Typography, Button, TextField, MenuItem } from "@mui/material";
import MainCard from "components/MainCard";
import fakeMarcas from "data/data-marcas";

// ==============================|| ALTA VEHICULO ||============================== //

export default function AltaVehiculo() {
  //-------------------------------LOGICA-----------------------------------
  const [vehiculo, setVehiculo] = useState({
    matricula: "",
    idMarca: "",  // Marca seleccionada
    idModelo: "", // Modelo seleccionado
    idConductor: 3, // El conductor es conocido (id 3)
  });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({ ...vehiculo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Vehículo agregado:", vehiculo);
    console.log(vehiculo);
  };

  // Filtrar los modelos según la marca seleccionada
  const modelosFiltrados = vehiculo.idMarca
    ? fakeMarcas.find((marca) => marca.id === parseInt(vehiculo.idMarca))?.modelos || []
    : [];

  return (
    <MainCard style={{ maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Alta de Vehículo
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Matrícula"
          name="matricula"
          type="text"
          value={vehiculo.matricula}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        
        {/* Selección de Marca */}
        <TextField
          label="Marca"
          name="idMarca"
          value={vehiculo.idMarca}
          onChange={handleInputChange}
          select
          fullWidth
          margin="normal"
          required
        >
          {fakeMarcas.map((marca) => (
            <MenuItem key={marca.id} value={marca.id}>
              {marca.nombre}
            </MenuItem>
          ))}
        </TextField>

        {/* Selección de Modelo (Filtrado por Marca) */}
        <TextField
          label="Modelo"
          name="idModelo"
          value={vehiculo.idModelo}
          onChange={handleInputChange}
          select
          fullWidth
          margin="normal"
          required
          disabled={!vehiculo.idMarca}  // Desactivar si no se selecciona una marca
        >
          {modelosFiltrados.map((modelo) => (
            <MenuItem key={modelo.id} value={modelo.id}>
              {modelo.nombre}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Guardar Vehículo
        </Button>
      </form>
    </MainCard>
  );
}
