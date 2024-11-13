// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  CarOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  CarOutlined
};

// data
import fakeUsuarios from 'data/data-usuarios';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //
// Simula obtener el usuario actual
const usuarioId = 3; // Juan Perez, Propietario
// const usuarioId = 4; // Martin Suarez, Conductor
// const usuarioId = 6; // David Torres, Conductor y Propietario
const usuario = fakeUsuarios.find((user) => user.id === usuarioId);

let utilities = {
  id: 'utilities',
  title: 'Utilidades',
  type: 'group',
  children: []
};

// Construir el menú basado en el rol del usuario
if (usuario) {
  if (usuario.esPropietario) {
    utilities.children.push({
      id: 'home-propietario',
      title: 'Mis Garajes',
      type: 'item',
      url: '/home-propietario',
      icon: icons.CarOutlined 
    });
  }
  
  if (usuario.esConductor) {
    utilities.children.push({
      id: 'home-conductor',
      title: 'Listado de Garajes',
      type: 'item',
      url: '/home-conductor',
      icon: icons.CarOutlined
    });

    utilities.children.push({
      id: 'alta-vehiculo',
      title: 'Alta de Vehículo',
      type: 'item',
      url: '/alta-vehiculo',
      icon: icons.CarOutlined 
    });
  }
}

export default utilities;