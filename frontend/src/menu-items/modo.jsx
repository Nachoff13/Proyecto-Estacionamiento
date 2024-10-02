// src/components/modo.js

import ModeSwitch from 'components/ModeSwitch';
import { AppstoreAddOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - MODO ||============================== //

const modo = {
  id: 'modo',
  title: 'Modo',
  type: 'group', // Asegúrate de que sea 'group'
  children: [
    {
      id: 'modo-switch',
      title: 'Cambiar Modo',
      type: 'component', // Asegúrate de que sea 'component'
      component: () => <ModeSwitch />, // Renderiza el switch sin lógica
      icon: AppstoreAddOutlined,
    }
  ]
};

export default modo;