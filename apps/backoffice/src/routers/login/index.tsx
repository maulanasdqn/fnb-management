import { FC, ReactElement, useEffect, useState } from 'react';
import { Button } from '@fms/atoms';
import { ControlledFieldText } from '@fms/organisms';
import { useForm } from 'react-hook-form';
import {
  tokenService,
  useIsAuthenticated,
  userService,
} from '@fms/web-services';
import { trpc } from '@fms/trpc-client';
import { loginRequestSchema } from '@fms/entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const LoginPage: FC = (): ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useIsAuthenticated();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<typeof loginRequestSchema>>({
    resolver: zodResolver(loginRequestSchema),
    mode: 'all',
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const { mutate, isPending } = trpc.auth.login.useMutation();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (resp) => {
        setIsAuthenticated(true);
        if (resp) {
          tokenService.setAccessToken(resp?.token?.accessToken);
          tokenService.setRefreshToken(resp?.token?.refreshToken);
          userService.setUserData(resp?.user);
        }
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
  });
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }, [errorMessage]);
  return (
    <div className="bg-grey-100 flex items-center justify-center w-full h-screen text-white">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-sm rounded-lg p-6 md:w-1/3 w-1/2 h-2/3 flex-col justify-start flex"
      >
       <div className="flex flex-col gap-y-2">
          <h1 className="text-black text-3xl font-medium">Login Backoffice</h1>
          {errorMessage && (
            <span className="text-error-500 bg-error-50 border border-error-500 rounded-lg p-2 text-center">
              {errorMessage}
            </span>
          )}
        </div>
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
          <Button state={isPending ? 'loading' : 'default'} disabled={!isValid || isPending} type="submit" size="md">
            Login
          </Button>
        </section>
      </form>
    </div>
  );
};
