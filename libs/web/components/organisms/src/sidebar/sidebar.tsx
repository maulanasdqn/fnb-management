import { Link, useLocation } from 'react-router-dom';
import { FC, Fragment, ReactElement } from 'react';
import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { PERMISSION_DASHBOARD, PERMISSION_ORDER } from '@fms/entities';
import { permissionChecker } from '@fms/utilities';
import { userService } from '@fms/web-services';

type TSidebar = {
  name: string;
  icon: ReactElement;
  path: string;
  permissions: Array<string>;
};

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
    permissions: [PERMISSION_ORDER.READ_ORDER, PERMISSION_ORDER.READ_ALL_ORDER],
  },
];

export const Sidebar: FC = (): ReactElement => {
  const { pathname } = useLocation();

  const className = (url: string) =>
    clsx('text-primary flex gap-x-4 hover:bg-primary-50 p-2 items-center', {
      'bg-primary-50': pathname === url,
    });

  return (
    <aside
      className={
        'min-h-screen h-full bg-white shadow-md w-1/6 flex flex-col p-4'
      }
    >
      <figure className="flex bg-grey-50 p-2 rounded-lg shadow-sm flex-col w-full">
        <figcaption className="w-full text-1xl text-primary">
          Serasa Erat Backoffice
        </figcaption>
        <div className="flex gap-x-2 mt-2 text-primary-2 items-center">
          <Icon icon="fa:user" />
          <span>Jhon Doe - Barista</span>
        </div>
      </figure>

      <ul className="mt-6 flex flex-col gap-y-3 cursor-pointer w-full">
        {sidebarMenu.map((menu, key) => (
          <Fragment key={key}>
            {permissionChecker(
              menu.permissions,
              userService.getUserData()?.role?.permissions
            ) && (
              <Link to={menu.path}>
                <li className={className(menu.path)}>
                  {menu.icon}
                  <span className="font-medium text-[13px]">{menu.name}</span>
                </li>
              </Link>
            )}
          </Fragment>
        ))}
        <Link
          to="/auth/logout"
          className="text-primary flex gap-x-4 hover:bg-primary-50 p-2 items-center"
        >
          <Icon icon="fa:sign-out" />
          <span className="font-medium text-[13px]">Logout</span>
        </Link>
      </ul>
    </aside>
  );
};
