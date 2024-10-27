import React from 'react';
import { Switch } from 'antd';
import { useNavigate } from 'react-router-dom';

const ModeSwitch = ({ usuario }) => {
  const [modo, setModo] = React.useState(() => {
    // Obtener el modo inicial desde localStorage
    const savedModo = localStorage.getItem('modo');
    return savedModo ? JSON.parse(savedModo) : false;
  });
  const navigate = useNavigate(); // Hook para navegar programáticamente

  // cambia la pagina segun el modo
  const handleSwitchChange = (checked) => {
    setModo(checked);
    localStorage.setItem('modo', JSON.stringify(checked)); // Guardar el modo en localStorage

    if (checked) {
      navigate('/home-conductor'); // Navega a la página del conductor
    } else {
      navigate('/home-propietario'); // Navega a la página del propietario
    }
  };

  React.useEffect(() => {
    if (usuario.esPropietario && usuario.esConductor) {
      // es propietario y conductor
      setModo(false); 
    } else if (!usuario.esPropietario && usuario.esConductor) {
      //es solo conductor
      setModo(true);
      navigate('/home-conductor');
    } else if (usuario.esPropietario && !usuario.esConductor) {
      // es solo propietario
      setModo(false);
      navigate('/home-propietario');
    }
  }, [usuario, navigate]);

  // deshabilita el switch
  const isDisabled = (!usuario.esPropietario && usuario.esConductor) || (usuario.esPropietario && !usuario.esConductor);

  return (
    <div style={{ padding: '16px', marginLeft: '5px' }}>
      <span style={{ marginRight: '5px' }}>Modo {modo ? 'Conductor' : 'Propietario'}</span>
      <Switch
        checked={modo}
        onChange={handleSwitchChange}
        disabled={isDisabled} 
      />
    </div>
  );
};

export default ModeSwitch;