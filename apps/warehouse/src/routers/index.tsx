import { createBrowserRouter, redirect } from 'react-router-dom';
import { LoginPage } from './login';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/auth/login'),
  },

  {
    path: '/auth/login',
    element: <LoginPage />,
  },
]);
