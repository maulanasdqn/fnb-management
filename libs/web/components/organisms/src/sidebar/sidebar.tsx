import { Link, useLocation } from 'react-router-dom';
import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
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
  const userPermissions = userService
    .getUserData()
    ?.role?.permissions?.map((val) => val.name);
  const [isScrolled, setIsScrolled] = useState(false);
  const className = (url: string) =>
    clsx(
      'text-primary flex gap-x-2 hover:bg-primary-50 p-2 items-center justify-start',
      {
        'bg-primary-50': pathname === url,
      }
    );
  useEffect(() => {
    const handleScroll = (event: any) => {
      if (event.target.scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    const sidebar = document.getElementById('sidebar-content');
    sidebar?.addEventListener('scroll', handleScroll);
    console.log(isScrolled);
    return () => {
      sidebar?.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);
  return (
    <aside
      className={
        'top-0 left-0 z-[9999] flex min-h-screen w-1/5 flex-col overflow-y-hidden ease-linear lg:static bg-white shadow-md p-4 lg:translate-x-0'
      }
    >
      <figure
        className={clsx(
          'hidden md:flex w-full justify-center bg-grey-50 items-center p-2 rounded-lg flex-col gap-2 sticky top-0',
          isScrolled ? 'blur-bottom' : ''
        )}
      >
        <figcaption className="w-full text-1xl text-primary text-center font-bold">
          Serasa Erat Warehouse
        </figcaption>
        <Icon icon="gg:profile" width={50} className="text-grey-500" />
        <p className="font-bold">{props.userData.fullname}</p>
      </figure>
      <div
        id="sidebar-content"
        className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear"
      >
        <ul className="mt-6 flex flex-col gap-y-3 cursor-pointer w-full">
          {props.menu.map((menu, key) => (
            <Fragment key={key}>
              {permissionChecker(menu.permissions, userPermissions) && (
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
      </div>
    </aside>
  );
};
