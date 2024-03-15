import { createBrowserRouter } from 'react-router-dom';
import { MenuPage } from './menu';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuPage />,
  },
]);
