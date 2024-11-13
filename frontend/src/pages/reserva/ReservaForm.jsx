import React, { useState } from 'react';
import fakeGarajes from '../../data/data-garajes';
import fakeUsuarios from '../../data/data-usuarios'; // Importar los datos de usuarios
import './ReservaForm.css';

const ReservaForm = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [monto, setMonto] = useState(null);

  // Obtenemos el primer garaje de los datos
  const garaje = fakeGarajes[0];

  // Simula obtener el usuario actual
  const usuarioId = 3; // Cambia esto según el usuario que necesites
  const usuario = fakeUsuarios.find((user) => user.id === usuarioId);

  // Obtener la fecha actual en el formato 'YYYY-MM-DDTHH:MM' requerido por el input datetime-local
  const today = new Date().toISOString().slice(0, 16); 

  const calcularMonto = () => {
    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);

      if (fin <= inicio) {
        alert('La fecha de fin no puede ser anterior o igual a la fecha de inicio.');
        return;
      }

      // Calculamos la diferencia en horas entre las dos fechas
      const diferenciaHoras = Math.abs(fin - inicio) / 36e5;

      // Calculamos el monto total basado en el precio por hora del garaje
      const total = diferenciaHoras * garaje.precioHora;
      setMonto(total.toFixed(2)); // Fijamos dos decimales
    } else {
      alert('Por favor, selecciona ambas fechas y horas.');
    }
  };

  return (
    <div className="reservation-form">
      <h2>Formulario de Reserva</h2>

      {usuario && (
        <div className="row">
          <div className="info">
            <p><strong>Dueño:</strong> {`${usuario.nombre} ${usuario.apellido}`}</p>
            <p><strong>Email:</strong> {usuario.mail}</p>
            <p><strong>Ubicación del Garaje:</strong> {`${garaje.calle} ${garaje.altura}`}</p>
            <p><strong>Descripción:</strong> {garaje.descripcion}</p>
          </div>
        </div>
      )}

      <div className="row">
        <div className="input">
          <label htmlFor="fecha-inicio">Fecha y Hora Inicio</label><br />
          <input
            type="datetime-local"
            id="fecha-inicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            min={today} // Evita fechas anteriores a hoy
          />
        </div>
        <div className="input">
          <label htmlFor="fecha-fin">Fecha y Hora Fin</label><br />
          <input
            type="datetime-local"
            id="fecha-fin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            min={fechaInicio || today} // Evita fechas anteriores a la fecha de inicio
          />
        </div>
      </div>

      <div className="row">
        <div>
          <p><strong>Monto Total:</strong> {monto ? `${monto} USD` : 'XXX'}</p>
        </div>
      </div>

      <div className="buttons">
        <button className="cancelar" onClick={() => window.location.href = 'home-conductor'}>
          Volver al Home
        </button>
        <button className="confirmar" onClick={calcularMonto}>
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
};

export default ReservaForm;
