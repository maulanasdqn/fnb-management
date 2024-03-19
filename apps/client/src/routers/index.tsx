import { createBrowserRouter } from 'react-router-dom';
import { MenuPage } from './menu';
import { MenutLayout } from './layout';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MenutLayout />,
    children: [
      {
        path: '',
        element: <MenuPage />,
      },
    ],
  },
]);
