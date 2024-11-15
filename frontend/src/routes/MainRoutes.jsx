// MainRoutes.jsx
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';


// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';


// data
import fakeUsuarios from 'data/data-usuarios';


// Importar ViewProfile
const ViewProfile = Loadable(lazy(() => import('pages/perfil/ViewProfile.jsx')));


// Otros componentes
const HomePropietario = Loadable(lazy(() => import('pages/home/home-propietario')));
const HistorialReservas = Loadable(lazy(() => import('pages/home/reserva/historial-reservas')));
const ReservaForm = Loadable(lazy(() => import('pages/reserva/ReservaForm.jsx')));
const HomeConductor = Loadable(lazy(() => import('pages/home/home-conductor')));
const AltaGaraje = Loadable(lazy(() => import('pages/altaGaraje/alta-garaje')));
const HistorialCalificaciones = Loadable(lazy(() => import('pages/home/calificacion/historial-calificaciones')));
const AltaVehiculo = Loadable(lazy(() => import('pages/altaVehiculo/alta-vehiculo')));


// ==============================|| MAIN ROUTING ||============================== //


const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <Navigate to="/login" replace />
    },
    {
      path: 'home-propietario',
      element: <HomePropietario />
    },
    {
      path: 'reserva/:id',
      element: <ReservaForm />
    },
    {
      path: 'home-conductor',
      element: <HomeConductor />
    },
    {
      path: 'historial-reservas',
      element: <HistorialReservas />
    },
    {
      path: 'alta-garaje',
      element: <AltaGaraje />
    },
    {
      path: 'apps/profiles/account/basic',
      element: <ViewProfile />
    },
    {
      path: 'historial-calificaciones/:id',
      element: <HistorialCalificaciones />
    },
    {
      path: 'alta-vehiculo',
      element: <AltaVehiculo />
    }
  ]
};


export default MainRoutes;
