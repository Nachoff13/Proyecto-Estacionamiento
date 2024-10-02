// src/components/ModoSwitch.jsx

import React from 'react';
import { Switch } from 'antd'; // Asegúrate de que 'antd' esté instalado

const ModoSwitch = ({ esConductor, esPropietario, onModeChange }) => {
  // Determina el modo inicial basado en las propiedades del usuario
  const [modo, setModo] = React.useState(esConductor ? true : false);

  const handleSwitchChange = (checked) => {
    setModo(checked);
    onModeChange(checked); // Llama a la función de cambio de modo pasándolo al padre
  };

  return (
    <div style={{ padding: '16px' }}>
      <span>Modo: {modo ? 'Conductor' : 'Propietario'}</span>
      <Switch checked={modo} onChange={handleSwitchChange} />
    </div>
  );
};

export default ModoSwitch;
