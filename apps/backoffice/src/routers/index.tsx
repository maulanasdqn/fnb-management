import { createBrowserRouter, redirect } from 'react-router-dom';
import { LoginPage } from './login';
import { Dashboard } from './dashboard/default';
import { DashboardOrder } from './dashboard/order';
import { DashboardNotification } from './dashboard/notification';
import { DashboardLayout } from './dashboard/layout';
import { isAuthenticated, logOut, pagePermission } from '@fms/utilities';
import {
  PERMISSION_DASHBOARD,
  PERMISSION_NOTIFICATION,
  PERMISSION_ORDER,
  PERMISSION_PURCHASE,
  PERMISSION_ROLE,
  PERMISSION_USER,
} from '@fms/entities';
import { DashboardRequestPurchase } from './dashboard/request-purchase';
import { DashboardUser } from './dashboard/user';
import { DashboardRole } from './dashboard/role';
import { DashboardStockOpname } from './dashboard/stock-opname';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/auth/login'),
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
    loader: () => (isAuthenticated ? redirect('/dashboard') : null),
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
    element: <DashboardLayout />,
    loader: () => (isAuthenticated ? null : redirect('/auth/login')),
    children: [
      {
        path: '',
        element: <Dashboard />,
        loader: () => pagePermission([PERMISSION_DASHBOARD.READ_DASHBOARD]),
      },
      {
        path: 'order',
        element: <DashboardOrder />,
        loader: () => pagePermission([PERMISSION_ORDER.READ_ORDER]),
      },
      {
        path: 'notification',
        element: <DashboardNotification />,
        loader: () =>
          pagePermission([PERMISSION_NOTIFICATION.READ_NOTIFICATION]),
      },
      {
        path: 'user',
        element: <DashboardUser />,
        loader: () => pagePermission([PERMISSION_USER.READ_USER]),
      },
      {
        path: 'role',
        element: <DashboardRole />,
        loader: () => pagePermission([PERMISSION_ROLE.READ_ROLE]),
      },
      {
        path: 'stock-opname',
        element: <DashboardStockOpname />,
        loader: () => pagePermission([PERMISSION_PURCHASE.REQUEST_PURCHASE]),
      },
      {
        path: 'request-purchase',
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
