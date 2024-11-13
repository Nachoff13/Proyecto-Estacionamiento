import { lazy } from 'react';
import { Navigate } from 'react-router-dom'; // Importar Navigate para redirecciones

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

// data
import fakeUsuarios from 'data/data-usuarios';

// Importar ViewProfile
const ViewProfile = Loadable(lazy(() => import('pages/perfil/ViewProfile.jsx')));

// Otros componentes
const HomePropietario = Loadable(lazy(() => import('pages/home/home-propietario')));
const ReservaForm = Loadable(lazy(() => import('pages/reserva/ReservaForm')));
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
      path: 'home-propietario',
      element: <HomePropietario />
    },
    {
      path: 'reserva',
      element: <ReservaForm />
    },
    {
      path: 'home-conductor',
      element: <HomeConductor />
    },
    {
      path: 'alta-garaje',
      element: <AltaGaraje />
    },
    {
      path: 'apps/profiles/account/basic', // Ruta para ver perfil
      element: <ViewProfile /> // Carga del componente ViewProfile
    }
  ]
};

export default MainRoutes;
