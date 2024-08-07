import { Navbar } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const MenutLayout: FC = (): ReactElement => {
  const navMenu = [
    { name: 'Home', path: '/' },
    { name: 'Coffee', path: '#' },
    { name: 'Non Coffee', path: '#' },
    // { name: 'Recomendation', path: '#' },
  ];
  return (
    <div className="max-w-auto relative">
      <Navbar menu={navMenu} />
      <Outlet />
    </div>
  );
};
