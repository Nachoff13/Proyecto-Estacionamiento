// src/components/ModoSwitch.jsx

import React from 'react';
import { Switch } from 'antd'; // Asegúrate de que 'antd' esté instalado

const ModeSwitch = ({ onModeChange }) => {
  // Estado inicial del modo (puedes cambiarlo a true o false según tus necesidades)
  const [modo, setModo] = React.useState(false);

  const handleSwitchChange = (checked) => {
    setModo(checked);
    onModeChange(checked); // Llama a la función de cambio de modo pasándolo al padre
  };

  return (
    <div style={{ padding: '16px', marginLeft:'5px' }}>
      <span style={{marginRight: '5px'}}>Modo {modo ? 'Conductor' : 'Propietario'}</span>
      <Switch checked={modo} onChange={handleSwitchChange} />
    </div>
  );
};

export default ModeSwitch;