import { createBrowserRouter } from 'react-router-dom';
import { MenuPage } from './menu';
import { LoginPage } from './login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
