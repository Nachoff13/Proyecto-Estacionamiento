import { useState, useEffect } from "react";
import { Typography, Button, TextField, MenuItem } from "@mui/material";
import MainCard from "components/MainCard";

// ==============================|| ALTA VEHICULO ||============================== // 

export default function AltaVehiculo() {
  //-------------------------------LOGICA----------------------------------- 
  const [vehiculo, setVehiculo] = useState({
    matricula: "",
    idMarca: "",  // Marca seleccionada
    idModelo: "", // Modelo seleccionado
    idConductor: 4, // El conductor es conocido (id 4)
  });

  const [marcas, setMarcas] = useState([]); // Estado para almacenar las marcas
  const [modelos, setModelos] = useState([]); // Estado para almacenar los modelos

  // Cargar las marcas al montar el componente
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await fetch("https://localhost:7294/Marca/Obtener");
        if (response.ok) {
          const data = await response.json();
          setMarcas(data); // Actualizar el estado de marcas con la respuesta del servidor
        } else {
          console.error("Error al obtener las marcas:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchMarcas(); // Llamar a la función para obtener marcas
  }, []); // Dependencia vacía para que se ejecute solo al montar

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({ ...vehiculo, [name]: value });
    
    // Si se cambia la marca, se deben obtener los modelos
    if (name === "idMarca") {
      fetchModelos(value);
    }
  };

  // Función para obtener los modelos de acuerdo a la marca seleccionada
  const fetchModelos = async (idMarca) => {
    try {
      const response = await fetch(`https://localhost:7294/Marca/ObtenerModelos/${idMarca}`);
      if (response.ok) {
        const data = await response.json();
        setModelos(data); // Actualizar el estado de modelos con la respuesta del servidor
      } else {
        console.error("Error al obtener los modelos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
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
          {marcas.map((marca) => (
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
          {modelos.map((modelo) => (
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
