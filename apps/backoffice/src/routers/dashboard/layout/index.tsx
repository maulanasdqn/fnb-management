import { Sidebar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: FC = (): ReactElement => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};
