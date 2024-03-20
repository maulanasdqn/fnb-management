import { Navbar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const MenutLayout: FC = (): ReactElement => {
  return (
    <div className="max-w-auto relative">
      <Navbar />
      <Outlet />
    </div>
  );
};
