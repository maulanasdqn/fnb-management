import { Link, useLocation } from 'react-router-dom';
import { FC, Fragment, ReactElement } from 'react';
import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { permissionChecker } from '@fms/utilities';
import { userService } from '@fms/web-services';

export type TSidebar = {
  name: string;
  icon: ReactElement;
  path: string;
  permissions: Array<string>;
};

export const Sidebar: FC<{ menu: TSidebar[] }> = (props): ReactElement => {
  const { pathname } = useLocation();

  const className = (url: string) =>
    clsx(
      'text-primary flex gap-x-2 hover:bg-primary-50 p-2 items-center justify-start',
      {
        'bg-primary-50': pathname === url,
      }
    );

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
        {props.menu.map((menu, key) => (
          <Fragment key={key}>
            {permissionChecker(
              menu.permissions,
              userService.getUserData()?.role?.permissions
            ) && (
              <Link to={menu.path}>
                <li className={className(menu.path)}>
                  <div className="w-6 h-6 items-center flex">{menu.icon}</div>
                  <span className="font-medium text-[13px]">{menu.name}</span>
                </li>
              </Link>
            )}
          </Fragment>
        ))}
        <Link
          to="/auth/logout"
          className="text-primary flex gap-x-2 hover:bg-primary-50 p-2 items-center"
        >
          <div className="w-6 h-6 items-center flex">
            <Icon icon="fa:sign-out" />
          </div>
          <span className="font-medium text-[13px]">Logout</span>
        </Link>
      </ul>
    </aside>
  );
};
