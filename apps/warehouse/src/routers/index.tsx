import { Link, createBrowserRouter, redirect } from 'react-router-dom';
import { LoginPage } from './login';
import { Dashboard } from './dashboard/default';
import { DashboardNotification } from './dashboard/notification';
import { DashboardLayout } from './dashboard/layout';
import { logOut, pagePermission } from '@fms/utilities';
import {
  PERMISSION_INGREDIENTS,
  PERMISSION_NOTIFICATION,
  PERMISSION_PRODUCT,
  PERMISSION_PURCHASE,
  PERMISSION_ROLE,
  PERMISSION_TRANSACTION,
} from '@fms/entities';
import { DashboardRequestPurchase } from './dashboard/request-purchase';
import { DashboardTransaction } from './dashboard/transaction';
import { DashboardRole } from './dashboard/role';
import { DashboardStockOpname } from './dashboard/stock-opname';
import { DashboardIngredient } from './dashboard/ingredient';
import { DashboardProduct } from './dashboard/product';
import { DashboardProductEdit } from './dashboard/product/_id/edit';
import { DashboardProductCreate } from './dashboard/product/create/create';
import { EditRole } from './dashboard/role/modules';
import { AuthProvider, GuestProvider } from '@fms/web-modules';
import { tokenService } from '@fms/web-services';
import { CreateRole } from './dashboard/role/modules/create/create-role';

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
    errorElement: (
      <div className="h-screen flex items-center w-full justify-center">
        <h1 className="text-4xl font-bold text-error-600">
          You are being redirected
        </h1>
      </div>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'ingredient',
        element: <DashboardIngredient />,
        loader: () => pagePermission([PERMISSION_INGREDIENTS.READ_INGREDIENT]),
      },
      {
        path: 'product',
        element: <DashboardProduct />,
        loader: () => pagePermission([PERMISSION_PRODUCT.READ_PRODUCT]),
      },
      {
        path: 'product/:id/edit',
        element: <DashboardProductEdit />,
        loader: () => pagePermission([PERMISSION_PRODUCT.READ_PRODUCT]),
      },
      {
        path: 'product/create',
        element: <DashboardProductCreate />,
        loader: () => pagePermission([PERMISSION_PRODUCT.READ_PRODUCT]),
      },
      {
        path: 'notification',
        element: <DashboardNotification />,
        loader: () =>
          pagePermission([PERMISSION_NOTIFICATION.READ_NOTIFICATION]),
      },
      {
        path: 'transaction',
        element: <DashboardTransaction />,
        loader: () => pagePermission([PERMISSION_TRANSACTION.READ_TRANSACTION]),
      },
      {
        path: 'role',
        element: <DashboardRole />,
        loader: () => pagePermission([PERMISSION_ROLE.READ_ROLE]),
      },
      {
        path: 'role/create',
        element: <CreateRole />,
        loader: () => pagePermission([PERMISSION_ROLE.READ_ROLE]),
      },
      {
        path: 'role/:id/edit',
        element: <EditRole />,
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
        <Link to={'/dashboard'}>Back</Link>
      </div>
    ),
  },
]);
