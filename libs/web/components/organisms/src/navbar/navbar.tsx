import { InputText } from '@fms/atoms';
import { Icon } from '@iconify/react';
import { FC, ReactElement, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: FC = (): ReactElement => {
  const [isBarOpen, setIsBarOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleNavigate = () => {
    navigate('/');
  };

  const navMenu = [
    { name: 'Home', path: '#' },
    { name: 'Coffee', path: '#' },
    { name: 'Non Coffee', path: '#' },
    { name: 'Recomendation', path: '#' },
  ];

  return (
    <>
      {isBarOpen && (
        <section className="bg-success-50 min-h-48 w-full z-20 p-10 fixed ">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-xl font-bold">Serasa Erat Kopi</h1>
            <Icon
              icon="fa:close"
              className="text-xl text-error-700"
              onClick={() => setIsBarOpen(!isBarOpen)}
            />
          </div>
          <div className="mt-10">
            <ul className="flex flex-col gap-y-4 text-xl font-semibold text-primary-700">
              {navMenu.map((menu, key) => (
                <li key={key}>
                  <Link to={menu.path}>{menu.name}</Link>
                </li>
              ))}
              <div>
                <InputText placeholder="Search" />
              </div>
            </ul>
          </div>
        </section>
      )}
      <header className="flex items-center  bg-primary text-white w-full p-5 z-10 sticky top-0">
        <div className="flex gap-x-6 w-full items-center">
          {pathname !== '/' && (
            <div>
              <Icon
                icon="fa:arrow-left"
                className="text-xl"
                onClick={handleNavigate}
              />
            </div>
          )}
          <figure>
            <h1 className="text-2xl">Serasa Erat Kopi</h1>
          </figure>
        </div>

        <div>
          <Icon
            icon="fa:bars"
            className="text-xl"
            onClick={() => setIsBarOpen(!isBarOpen)}
          />
        </div>
      </header>
    </>
  );
};
