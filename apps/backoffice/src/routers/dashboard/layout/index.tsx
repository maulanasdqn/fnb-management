import { Navbar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: FC = (): ReactElement => {
  const navMenu = [
    { name: 'Home', path: '/dashboard' },
    // { name: 'Stock Opname', path: '/stock-opnmae' },
    // { name: 'Request Purchase', path: 'req-purchase' },
    { name: 'Logout', path: '/auth/logout' },
  ];
  return (
    <div className="max-w-auto relative">
      <Navbar menu={navMenu} />
      <div className="md:p-8 p-4">
        <Outlet />
      </div>
    </div>
  );
};
