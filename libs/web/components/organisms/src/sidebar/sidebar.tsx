import { Link, useLocation } from 'react-router-dom';
import { FC, Fragment, ReactElement } from 'react';
import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { permissionChecker } from '@fms/utilities';
import { userService } from '@fms/web-services';
import { TUser } from '@fms/entities';

export type TSidebar = {
  name: string;
  icon: ReactElement;
  path: string;
  permissions: Array<string>;
};

export const Sidebar: FC<{ menu: TSidebar[]; userData: TUser }> = (
  props
): ReactElement => {
  const { pathname } = useLocation();
  const userPermissions = userService.getUserData()?.role?.permissions?.map(val => val.name)


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
      <figure className="hidden md:flex w-full justify-center items-center bg-grey-50 p-2 rounded-lg shadow-sm flex-col gap-2">
        <figcaption className="w-full text-1xl text-primary text-center font-bold">
          Serasa Erat Warehouse
        </figcaption>
        <Icon icon="gg:profile" width={50} className="text-grey-500" />
        <p className="font-bold">{props.userData.fullname}</p>
      </figure>

      <ul className="mt-6 flex flex-col gap-y-3 cursor-pointer w-full">
        {props.menu.map((menu, key) => (
          <Fragment key={key}>
            {permissionChecker(
              menu.permissions,
              userPermissions
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
