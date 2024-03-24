import { createBrowserRouter } from 'react-router-dom';
import { MenuPage } from './menu';
import { MenutLayout } from './layout';
import { MenuDetailModule } from './menu/modules/menu-detail';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MenutLayout />,
    children: [
      {
        path: '',
        element: <MenuPage />,
      },
      {
        path: 'detail',
        element: <MenuDetailModule />,
      }
    ],
  },
]);
