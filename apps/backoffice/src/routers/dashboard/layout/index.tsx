import { Navbar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: FC = (): ReactElement => {
  const navMenu = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Stock Opname', path: '/dashboard/stock-opname' },
    { name: 'Request Purchase', path: '/dashboard/request-purchase' },
    { name: 'Logout', path: '/auth/login' },
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
