import { createHashRouter, Navigate } from 'react-router';

import FrontendLayout from '../layout/FrontendLayout';
import Home from '../pages/Home';
import News from '../pages/News';
import Teachers from '../pages/Teachers';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Orders from '../pages/Orders';

export const router = createHashRouter([
  {
    path: '/',
    element: <FrontendLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/news',
        element: <News />,
      },
      {
        path: '/teachers',
        element: <Teachers />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
]);
