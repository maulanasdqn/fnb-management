import { Sidebar, TSidebar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import {
  PERMISSION_DASHBOARD,
  PERMISSION_INGREDIENTS,
  PERMISSION_PRODUCT,
  PERMISSION_PURCHASE,
  PERMISSION_ROLE,
  PERMISSION_USER,
} from '@fms/entities';
import { Icon } from '@iconify/react';
import { userService } from '@fms/web-services';

export const DashboardLayout: FC = (): ReactElement => {
  const sidebarMenu: TSidebar[] = [
    {
      name: 'Dashboard',
      icon: <Icon icon="fa:desktop" />,
      path: '/dashboard',
      permissions: [],
    },
    {
      name: 'Ingredient',
      icon: <Icon icon="fa:shopping-cart" />,
      path: '/dashboard/ingredient',
      permissions: [PERMISSION_INGREDIENTS.READ_INGREDIENT],
    },
    {
      name: 'Product',
      icon: <Icon icon="material-symbols:fact-check-outline-rounded" />,
      path: '/dashboard/product',
      permissions: [PERMISSION_PRODUCT.READ_PRODUCT],
    },
    {
      name: 'Stock Opname',
      icon: <Icon icon="fa:calculator" />,
      path: '/dashboard/stock-opname',
      permissions: [PERMISSION_PURCHASE.REQUEST_PURCHASE],
    },
    {
      name: 'Request Purchase',
      icon: <Icon icon="fa:external-link" />,
      path: '/dashboard/request-purchase',
      permissions: [PERMISSION_PURCHASE.REQUEST_PURCHASE],
    },
    {
      name: 'History Transaction',
      icon: <Icon icon="fa:users" />,
      path: '/dashboard/user',
      permissions: [PERMISSION_USER.READ_USER],
    },
    {
      name: 'Role',
      icon: <Icon icon="fa:shield" />,
      path: '/dashboard/role',
      permissions: [PERMISSION_ROLE.READ_ROLE],
    },
  ];
  return (
    <div className="flex gap-x-4 bg-grey-50 w-full">
      <Sidebar userData={userService.getUserData()} menu={sidebarMenu} />
      <div className="p-6 w-full">
        <Outlet />
      </div>
    </div>
  );
};
