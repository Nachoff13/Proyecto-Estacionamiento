// src/components/modo.js

import ModeSwitch from 'components/ModeSwitch';
import { AppstoreAddOutlined } from '@ant-design/icons';

//data imports
import fakeUsuarios from 'data/data-usuarios';

// ==============================|| MENU ITEMS - MODO ||============================== //
// Simula obtener el usuario actual
const usuarioId = 6; 
const usuario = fakeUsuarios.find((user) => user.id === usuarioId);


const modo = {
  id: 'modo',
  title: 'Modo',
  type: 'group', 
  children: [
    {
      id: 'modo-switch',
      title: 'Cambiar Modo',
      type: 'component',
      component: () => <ModeSwitch usuario={usuario} />, 
      icon: AppstoreAddOutlined,
    }
  ]
};

export default modo;