import { createBrowserRouter, redirect } from 'react-router-dom';
import { DashboardLayout } from './dashboard/layout';
import { isAuthenticated, logOut, pagePermission } from '@fms/utilities';
import { lazily } from 'react-lazily';
import { Suspense } from 'react';
import { PERMISSION_DASHBOARD, PERMISSION_PURCHASE } from '@fms/entities';
import { DashboardRequestPurchase } from './dashboard/request-purchase';
import { DashboardStockOpname } from './dashboard/stock-opname';
import { DetailOrder } from './dashboard/order/detail-order';
import { Spinner } from '@fms/atoms';
import { RecipeOrder } from './dashboard/order/recipe-order';

const { LoginPage } = lazily(() => import('./login'));
const { Dashboard } = lazily(() => import('./dashboard/default'));

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
        element: (
          <Suspense fallback={<Spinner />}>
            <Dashboard />
          </Suspense>
        ),
        loader: () => pagePermission([PERMISSION_DASHBOARD.READ_DASHBOARD]),
      },
      {
        path: 'detail',
        element: (
          <Suspense fallback={<Spinner />}>
            <DetailOrder />
          </Suspense>
        ),
      },
      {
        path: 'recipe',
        element: (
          <Suspense fallback={<Spinner />}>
            <RecipeOrder />
          </Suspense>
        ),
      },
      {
        path: 'stock-opname',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardStockOpname />
          </Suspense>
        ),
        loader: () => pagePermission([PERMISSION_PURCHASE.REQUEST_PURCHASE]),
      },
      {
        path: 'request-purchase',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardRequestPurchase />
          </Suspense>
        ),
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
