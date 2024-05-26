import { FC, ReactElement } from 'react';
import { Button } from '@fms/atoms';
import { ControlledFieldText } from '@fms/organisms';
import { useForm } from 'react-hook-form';
import { tokenService, userService } from '@fms/web-services';
import { trpc } from '@fms/trpc-client';
import { loginRequestSchema } from '@fms/entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const LoginPage: FC = (): ReactElement => {
  const { control, handleSubmit } = useForm<z.infer<typeof loginRequestSchema>>(
    {
      resolver: zodResolver(loginRequestSchema),
      defaultValues: {
        userName: '',
        password: '',
      },
    }
  );

  const { mutate } = trpc.auth.login.useMutation();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (resp) => {
        if (resp) {
          tokenService.setAccessToken(resp?.token?.accessToken);
          tokenService.setRefreshToken(resp?.token?.refreshToken);
          userService.setUserData(resp?.user);
        }
      },
    });
  });

  return (
    <div className="bg-grey-100 flex items-center justify-center w-full h-screen text-white">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-sm rounded-lg p-6 md:w-1/3 w-1/2 h-1/2 flex-col justify-start flex"
      >
        <h1 className="text-black text-3xl font-medium">Login Backoffice</h1>
        <section className="flex flex-col gap-y-4 justify-center h-full">
          <ControlledFieldText
            required
            control={control}
            size="md"
            name="userName"
            type="text"
            label="Username"
            placeholder="Username"
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
