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
    idConductor: 4, // El conductor es conocido (id 4)
  });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({ ...vehiculo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = {
      idconductor: vehiculo.idConductor,
      idmodelo: vehiculo.idModelo,
      matricula: vehiculo.matricula,
    };
  
    console.log("Datos que se envían al backend:", dataToSend);
  
    try {
      const response = await fetch("https://localhost:7294/Vehiculo/Agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Vehículo agregado exitosamente!");
        console.log("Respuesta del servidor:", data);
      } else {
        alert("Error al agregar el vehículo");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al conectar con el servidor");
    }
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
