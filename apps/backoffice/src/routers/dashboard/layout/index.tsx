import { Sidebar, TSidebar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import {
  PERMISSION_DASHBOARD,
  PERMISSION_ORDER,
  PERMISSION_PURCHASE,
  PERMISSION_ROLE,
  PERMISSION_USER,
} from '@fms/entities';
import { Icon } from '@iconify/react';

export const DashboardLayout: FC = (): ReactElement => {
  const sidebarMenu: TSidebar[] = [
    {
      name: 'Dashboard',
      icon: <Icon icon="fa:desktop" />,
      path: '/dashboard',
      permissions: [PERMISSION_DASHBOARD.READ_DASHBOARD],
    },
    {
      name: 'Order',
      icon: <Icon icon="fa:shopping-cart" />,
      path: '/dashboard/order',
      permissions: [
        PERMISSION_ORDER.READ_ORDER,
        PERMISSION_ORDER.READ_ALL_ORDER,
      ],
    },
    {
      name: 'User',
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
    {
      name: 'Request Purchase',
      icon: <Icon icon="fa:external-link" />,
      path: '/dashboard/request-purchase',
      permissions: [PERMISSION_PURCHASE.REQUEST_PURCHASE],
    },
  ];
  return (
    <div className="flex gap-x-4">
      <Sidebar menu={sidebarMenu} />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};
