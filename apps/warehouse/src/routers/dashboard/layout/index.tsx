import { Sidebar, TSidebar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import {
  PERMISSION_INGREDIENTS,
  PERMISSION_PRODUCT,
  PERMISSION_PURCHASE,
  PERMISSION_ROLE,
  PERMISSION_TRANSACTION,
  TUser,
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
      path: '/dashboard/transaction',
      permissions: [PERMISSION_TRANSACTION.READ_TRANSACTION],
    },
    {
      name: 'Role',
      icon: <Icon icon="fa:shield" />,
      path: '/dashboard/role',
      permissions: [PERMISSION_ROLE.READ_ROLE],
    },
   
  ];
  return (
    <div className="flex bg-grey-50 h-screen overflow-hidden">
      <Sidebar userData={userService.getUserData() as TUser} menu={sidebarMenu} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
