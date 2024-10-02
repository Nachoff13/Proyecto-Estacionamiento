import { lazy } from 'react';
import { Navigate } from 'react-router-dom'; // Importar Navigate para redirecciones

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

// data
import fakeUsuarios from 'data/data-usuarios';

const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const HomePropietario = Loadable(lazy(() => import('pages/home/home-propietario')));


// render - home conductor
const HomeConductor = Loadable(lazy(() => import('pages/home/home-conductor')));

// ==============================|| MAIN ROUTING ||============================== //

// Simula obtener el usuario actual
const usuarioId = 3; 
const usuario = fakeUsuarios.find((user) => user.id === usuarioId);

// Lógica de redirección basada en los atributos del usuario
let redirectPath = '/'; // Ruta por defecto

if (usuario) {
  if (usuario.esPropietario) {
    redirectPath = '/home-propietario';
  } else if (usuario.esConductor) {
    redirectPath = '/home-conductor'; 
  } else {
    redirectPath = '/otra-pagina'; 
  }
}

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <Navigate to={redirectPath} replace />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'home-propietario',
      element: <HomePropietario />
    },
    // {
    //   path: 'home-conductor',
    //   element: <HomeConductor /> // Asegúrate de tener esta ruta definida
    // }
  ]
};

export default MainRoutes;