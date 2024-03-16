import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
]);
