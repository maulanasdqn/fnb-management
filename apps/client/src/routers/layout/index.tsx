import { InputText } from '@fms/atoms';
import { Navbar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const MenutLayout: FC = (): ReactElement => {
  return (
    <div className='max-w-[480px]'>
      <Navbar />
      <Outlet />
    </div>
  );
};
