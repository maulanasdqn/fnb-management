import { FC, ReactElement } from 'react';
import { Button } from '@fms/atoms';
import { ControlledFieldText } from '@fms/organisms';
import { useForm } from 'react-hook-form';

export const LoginPage: FC = (): ReactElement => {
  const { control } = useForm();
  return (
    <div className="bg-grey-100 flex items-center justify-center w-full h-screen text-white">
      <form className="bg-white shadow-sm rounded-lg p-6 w-1/2 md:w-1/3 h-1/2 flex-col justify-start flex">
        <h1 className="text-black text-3xl font-medium">Login Warehouse</h1>
        <section className="flex flex-col gap-y-4 justify-center h-full">
          <ControlledFieldText
            required
            control={control}
            size="md"
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
          />
          <ControlledFieldText
            required
            control={control}
            size="md"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
          />
          <Button size="md">Login</Button>
        </section>
      </form>
    </div>
  );
};
