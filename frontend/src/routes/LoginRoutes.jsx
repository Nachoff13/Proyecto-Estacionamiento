// LoginRoutes.jsx
import { lazy } from 'react';


// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import PresentacionWithBootstrap from 'pages/presentacion/PresentacionWithBootstrap';


// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));


// ==============================|| AUTH ROUTING ||============================== //


const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/presentacion',
      element: <PresentacionWithBootstrap />
    },
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    }
  ]
};


export default LoginRoutes;
