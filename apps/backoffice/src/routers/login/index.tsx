import { FC, ReactElement } from 'react';
import { Button } from '@fms/atoms';
import { ControlledFieldText } from '@fms/organisms';
import { useForm } from 'react-hook-form';
import { tokenService, userService } from '@fms/web-services';

export const LoginPage: FC = (): ReactElement => {
  const { control } = useForm();
  return (
    <div className="bg-grey-100 flex items-center justify-center w-full h-screen text-white">
      <form
        onSubmit={() => {
          tokenService.setAccessToken(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjQ4MjU5MjYyfQ.3k5fVXKqy6Hj8Z7t2J8n0j5h4nVxQf6e6p9cBwZUfGw'
          );
          tokenService.setRefreshToken(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjQ4MjU5MjYyfQ.3k5fVXKqy6Hj8Z7t2J8n0j5h4nVxQf6e6p9cBwZUfGw'
          );
          userService.setUserData({
            id: '1',
            fullname: 'Jhon Doe',
            email: 'jL6kN@example.com',
            role: {
              id: '1',
              name: 'Barista',
              permissions: ['read-order', 'read-all-order', 'read-dashboard'],
            },
          });
        }}
        className="bg-white shadow-sm rounded-lg p-6 md:w-1/3 w-1/2 h-1/2 flex-col justify-start flex"
      >
        <h1 className="text-black text-3xl font-medium">Login Backoffice</h1>
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
          <Button type="submit" size="md">
            Login
          </Button>
        </section>
      </form>
    </div>
  );
};
