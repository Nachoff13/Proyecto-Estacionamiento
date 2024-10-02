import ModoSwitch from 'components/ModeSwitch';

// assets
import {
    AppstoreAddOutlined,
  } from '@ant-design/icons';
  
  
  // ==============================|| MENU ITEMS - MODO ||============================== //
  
  const modo = {
    id: 'modo',
    title: 'Modo',
    type: 'group',
    children: [
      {
        id: 'modo',
        title: 'Modo',
        type: 'component',
        component: () => (
          <ModoSwitch
            esConductor={usuario.esConductor}
            esPropietario={usuario.esPropietario}
            onModeChange={(checked) => {
              // Lógica para manejar el cambio de modo
              console.log(`Modo cambiado a: ${checked ? 'Conductor' : 'Propietario'}`);
            }}
          />
        ),
        icon: AppstoreAddOutlined,
      }
    ]
  };
  
  export default modo;
  