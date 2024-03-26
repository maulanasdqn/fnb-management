import { createBrowserRouter } from 'react-router-dom';
import { MenutLayout } from './layout';
import { lazily } from 'react-lazily';

const { MenuPage, MenuDetailPage, MenuCheckoutPage } = lazily(
  () => import('./menu')
);

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
        path: ':id/detail',
        element: <MenuDetailPage />,
      },
      {
        path: ':id/checkout',
        element: <MenuCheckoutPage />,
      },
    ],
  },
]);
