import { Navbar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: FC = (): ReactElement => {
  return (
    <div className="max-w-auto relative">
      <Navbar />
      <div className="md:p-8 p-4">
        <Outlet />'
      </div>
    </div>
  );
};
