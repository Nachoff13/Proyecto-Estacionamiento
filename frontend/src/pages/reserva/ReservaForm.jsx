import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'src/pages/reserva/ReservaForm.css';

const ReservaForm = () => {
  const [garaje, setGaraje] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [monto, setMonto] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const today = new Date().toISOString().slice(0, 16); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const garajeResponse = await axios.get(`https://localhost:7294/Garaje/ObtenerIndividual/${id}`);
        setGaraje(garajeResponse.data);

        const propietarioResponse = await axios.get(`https://localhost:7294/Usuario/ObtenerIndividual/${garajeResponse.data.idpropietario}`);
        setUsuario(propietarioResponse.data);

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const calcularMonto = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
      setMonto(null);
      return;
    }

    const diferenciaHoras = Math.abs(fin - inicio) / 36e5;
    const total = diferenciaHoras * garaje.preciohora;
    setMonto(total.toFixed(2)); 
  };

  const handleFechaChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fechaInicio') {
      setFechaInicio(value);
    } else if (name === 'fechaFin') {
      setFechaFin(value);
    }

    if (fechaInicio && fechaFin) {
      calcularMonto(fechaInicio, fechaFin);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!monto || monto === 'XXX') {
      alert('Por favor, selecciona fechas válidas para calcular el monto.');
      return;
    }

    // Confirmación de la reserva con el monto
    const confirmReserva = window.confirm(`¿Estás seguro de que quieres hacer la reserva? El costo total es ${monto} pesos argentinos.`);

    if (!confirmReserva) {
      return; // Si el usuario no confirma, no se hace nada
    }

    const reserva = {
      idGaraje: garaje.id,
      idConductor: 4, 
      idReservaEstado: 1, 
      fechaInicio,
      fechaFin
    };

    try {
      const response = await axios.post('https://localhost:7294/Reserva/Agregar', reserva);
      alert(`Reserva agregada con éxito. El monto total es ${monto} pesos argentinos.`);
      navigate('/home-conductor'); // Redirige al home-conductor después de la reserva
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al guardar la reserva');
    }
  };

  if (!garaje || !usuario) {
    return <div>Cargando información...</div>;
  }

  return (
    <div className="reservation-form">
      <h2>Formulario de Reserva</h2>

      <div className="row">
        <div className="info">
          <p><strong>Dueño:</strong> {`${usuario.nombre} ${usuario.apellido}`}</p>
          <p><strong>Email:</strong> {usuario.mail}</p>
          <p><strong>Ubicación del Garaje:</strong> {`${garaje.calle} ${garaje.altura}`}</p>
          <p><strong>Descripción:</strong> {garaje.descripcion}</p>
        </div>
      </div>

      <div className="row">
        <div className="input">
          <label htmlFor="fecha-inicio">Fecha y Hora Inicio</label><br />
          <input
            type="datetime-local"
            id="fecha-inicio"
            name="fechaInicio"
            value={fechaInicio}
            onChange={handleFechaChange}
            min={today}
          />
        </div>
        <div className="input">
          <label htmlFor="fecha-fin">Fecha y Hora Fin</label><br />
          <input
            type="datetime-local"
            id="fecha-fin"
            name="fechaFin"
            value={fechaFin}
            onChange={handleFechaChange}
            min={fechaInicio || today}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <p><strong>Monto Total:</strong> {monto ? `${monto} $ ARG` : 'XXX'}</p>
        </div>
      </div>

      <div className="buttons">
        <button className="cancelar" onClick={() => window.location.href = '/home-conductor'}>
          Volver al Home
        </button>
        <button className="confirmar" onClick={handleSubmit}>
          Guardar Reserva
        </button>
      </div>
    </div>
  );
};

export default ReservaForm;
