import { FC, PropsWithChildren, ReactElement } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const ReactQueryProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
