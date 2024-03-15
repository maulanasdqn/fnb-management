import { FC, ReactElement } from 'react';
import { Button } from '@fms/atoms';

export const LoginPage: FC = (): ReactElement => {
  return (
    <div className="bg-grey-100 flex items-center justify-center w-full h-screen text-white">
      <form className="bg-white shadow-sm rounded-lg p-6 w-1/2 h-1/2 flex-col justify-between flex">
        <h1 className="text-black text-3xl font-medium">Login Backoffice</h1>
        <Button size="md">Login</Button>
      </form>
    </div>
  );
};
