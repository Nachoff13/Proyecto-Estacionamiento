import garaje1 from '../../assets/images/home/listado-garaje/garaje1.jpg';
import garaje2 from '../../assets/images/home/listado-garaje/garaje2.jpg'; 
import garaje3 from '../../assets/images/home/listado-garaje/garaje3.jpeg'; 


const dataGarajes = [
    {
      id: 1,
      idPropietario: 123,
      idLocalidad: 456,
      altura: 15,
      Calle: "Av 7 entre 16 y 17",
      descripcion: "Garaje amplio, techado y seguro.",
      precioHora: 50,
      capacidad: 4,
      estado: "Disponible",
      garajeFoto: {
        id: 1,
        idGaraje: 1,
        src: garaje1,
        alt: "Foto del Garaje 1"
      }
    },
    {
      id: 2,
      idPropietario: 124,
      idLocalidad: 457,
      altura: 22,
      Calle: "Calle 530 entre 48 y 49",
      descripcion: "Garaje pequeño, ideal para motocicletas.",
      precioHora: 30,
      capacidad: 1,
      estado: "Disponible",
      garajeFoto: {
        id: 2,
        idGaraje: 2,
        src: garaje2,
        alt: "Foto del Garaje 2"
      }
    },
    {
      id: 3,
      idPropietario: 125,
      idLocalidad: 458,
      altura: 10,
      Calle: "Av 13",
      descripcion: "Garaje espacioso con vigilancia 24 horas.",
      precioHora: 60,
      capacidad: 5,
      estado: "Disponible",
      garajeFoto: {
        id: 3,
        idGaraje: 3,
        src: garaje3,
        alt: "Foto del Garaje 3"
      }
    },
    {
        id: 4,
        idPropietario: 126,
        idLocalidad: 459,
        altura: 10,
        Calle: "Av 32",
        descripcion: "Garaje espacioso con vigilancia 24 horas.",
        precioHora: 60,
        capacidad: 5,
        estado: "Disponible",
        garajeFoto: {
          id: 4,
          idGaraje: 4,
          src: garaje3,
          alt: "Foto del Garaje 4"
        }
      }
  ];
  
export default dataGarajes;
  