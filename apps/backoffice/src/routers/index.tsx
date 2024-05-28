import { createBrowserRouter, redirect } from 'react-router-dom';
import { LoginPage } from './login';
import { Dashboard } from './dashboard/default';
import { DashboardLayout } from './dashboard/layout';
import { logOut, pagePermission } from '@fms/utilities';
import { PERMISSION_DASHBOARD, PERMISSION_PURCHASE } from '@fms/entities';
import { DashboardRequestPurchase } from './dashboard/request-purchase';
import { DashboardStockOpname } from './dashboard/stock-opname';
import { DetailOrder } from './dashboard/order/detail-order';
import { AuthProvider, GuestProvider } from '@fms/web-modules';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/auth/login'),
  },
  {
    path: '/auth/login',
    element: (
      <GuestProvider>
        <LoginPage />
      </GuestProvider>
    ),
  },
  {
    path: '/auth/logout',
    loader: () => {
      logOut();
      return redirect('/auth/login');
    },
  },
  {
    path: '/dashboard',
    element: (
      <AuthProvider>
        <DashboardLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
        loader: () => pagePermission([PERMISSION_DASHBOARD.READ_DASHBOARD]),
      },
      {
        path: 'detail',
        element: <DetailOrder />,
      },
      {
        path: 'stock-opname',
        element: <DashboardStockOpname />,
        loader: () => pagePermission([PERMISSION_PURCHASE.REQUEST_PURCHASE]),
      },
      {
        path: 'req-purchase',
        element: <DashboardRequestPurchase />,
        loader: () => pagePermission([PERMISSION_PURCHASE.REQUEST_PURCHASE]),
      },
    ],
  },
  {
    path: '/permission-denied',
    element: (
      <div>
        <h1>Permission Denied</h1>
      </div>
    ),
  },
]);
