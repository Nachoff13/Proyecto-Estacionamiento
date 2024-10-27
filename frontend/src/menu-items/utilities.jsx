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

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilidades',
  type: 'group',
  children: [
    {
      id: 'home-conductor',
      title: 'Listado de Garajes',
      type: 'item',
      url: '/home-conductor',
      icon: icons.CarOutlined
    },
    {
      id: 'home-propietario',
      title: 'Mis Garajes',
      type: 'item',
      url: '/home-propietario',
      icon: CarOutlined
    },
  ]
};

export default utilities;
