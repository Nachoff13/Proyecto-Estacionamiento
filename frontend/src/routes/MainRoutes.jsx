import { lazy } from 'react';
import { Navigate } from 'react-router-dom'; // Importar Navigate para redirecciones

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

// data
import fakeUsuarios from 'data/data-usuarios';

const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const HomePropietario = Loadable(lazy(() => import('pages/home/home-propietario')));
const HomeConductor = Loadable(lazy(() => import('pages/home/home-conductor')));
const AltaGaraje = Loadable(lazy(() => import('pages/altaGaraje/alta-garaje')));

// ==============================|| MAIN ROUTING ||============================== //

// Simula obtener el usuario actual
const usuarioId = 6; 
const usuario = fakeUsuarios.find((user) => user.id === usuarioId);


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
    {
      path: 'home-conductor',
      element: <HomeConductor />
    },
    {
      path: 'alta-garaje',
      element: <AltaGaraje />
    }
  ]
};

export default MainRoutes;