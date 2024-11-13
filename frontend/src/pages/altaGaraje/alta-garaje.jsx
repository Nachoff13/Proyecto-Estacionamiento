import { useState, useEffect } from "react";
import { Typography, Button, TextField, MenuItem, Grid } from "@mui/material";
import MainCard from "components/MainCard";
import { useNavigate } from 'react-router-dom';

// ==============================|| ALTA GARAJE ||============================== //

export default function AltaGaraje() {

  const navigate=useNavigate();
  //-------------------------------LOGICA-----------------------------------
  const [garaje, setGaraje] = useState({
    calle: "",
    altura: "",
    descripcion: "",
    capacidad: "",
    precioHora: "",
    idLocalidad: "",
    idPropietario: 3, // Hardcoded for now
    disponible:true ,
  });

  const [garajeFoto, setGarajeFoto] = useState({
    idgaraje: 0, 
    fotos: [], 
  });
  const [localidades, setLocalidades] = useState([]); 

  const [previewImages, setPreviewImages] = useState([]); 

  useEffect(() => {
    const fetchLocalidades = async () => {
      try {
        const response = await fetch("https://localhost:7294/Localidad/Obtener");
        if (response.ok) {
          const data = await response.json();
          setLocalidades(data); 
        } else {
          console.error("Error al obtener localidades");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchLocalidades();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGaraje({ ...garaje, [name]: value });
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const imagesArray = [];
    const previewArray = [];

    for (let i = 0; i < files.length; i++) {
      const byteString = await convertToBytes(files[i]);
      imagesArray.push(byteString); // Guardar las imágenes en bytes
      previewArray.push(URL.createObjectURL(files[i])); // Crear previsualización de la imagen
    }

    // Acumular las nuevas imágenes con las anteriores
    setGarajeFoto((prevState) => ({
      ...prevState,
      fotos: [...prevState.fotos, ...imagesArray],
    }));
    setPreviewImages((prevImages) => [...prevImages, ...previewArray]); // Acumular previsualizaciones
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7294/Garaje/Agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(garaje),
      });
      
      if (response.ok) {
        const idgaraje = await response.json();
  
        for (const foto of garajeFoto.fotos) {
          const garajeFotoData = {
            idgaraje, // Usar el ID recibido
            foto, 
          };
  
          const fotoResponse = await fetch("https://localhost:7294/GarajeFoto/Agregar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(garajeFotoData),
          });
  
          if (!fotoResponse.ok) {
            alert(`Error al agregar la imagen ${foto}`);
            return; 
          }
        }
        
        alert("Garaje y todas las fotos agregados exitosamente");
        navigate('/home-propietario');


      } else {
        alert("Error al agregar el garaje");
      }
    } catch (error) {
      console.error("Error en el envío:", error);
    }
  };

  const convertToBytes = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function(event) {
        const arrayBuffer = event.target.result;
        const bytes = new Uint8Array(arrayBuffer);
        const byteString = bytes.toString(); 
        console.log(byteString);
        resolve(byteString);
      };

      reader.onerror = function(error) {
        reject(error);
      };

      reader.readAsArrayBuffer(file); // Leer el archivo como un array buffer para obtener los bytes
    });
  };

  return (
    <MainCard style={{ maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Alta de Garaje
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Calle"
          name="calle"
          value={garaje.calle}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Altura"
          name="altura"
          type="number"
          value={garaje.altura}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="descripcion"
          value={garaje.descripcion}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Capacidad"
          name="capacidad"
          type="number"
          value={garaje.capacidad}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Precio por hora"
          name="precioHora"
          type="number"
          value={garaje.precioHora}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Localidad"
          name="idLocalidad"
          value={garaje.idLocalidad}
          onChange={handleInputChange}
          select
          fullWidth
          margin="normal"
          required
        >
          {localidades.map((localidad) => (
            <MenuItem key={localidad.id} value={localidad.id}>
              {localidad.nombre} ({localidad.codpostal})
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          component="label"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Subir Imágenes
          <input type="file" hidden onChange={handleImageChange} multiple />
        </Button>

        <Grid container spacing={2} style={{ marginTop: "16px" }}>
          {previewImages.map((image, index) => (
            <Grid item xs={4} key={index}>
              <img src={image} alt={`Preview ${index}`} style={{ width: "100%", height: "auto" }} />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Guardar Garaje
        </Button>
      </form>
    </MainCard>
  );
}
