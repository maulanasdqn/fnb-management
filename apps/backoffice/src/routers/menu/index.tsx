import { FC, ReactElement } from 'react';
import { Button } from '@fms/atoms';

export const MenuPage: FC = (): ReactElement => {
  return (
    <div className="flex items-center">
      <h1>Welcome</h1>
      <Button>Testing</Button>
    </div>
  );
};
