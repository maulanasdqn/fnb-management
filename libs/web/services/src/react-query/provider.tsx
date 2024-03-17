import { FC, PropsWithChildren, ReactElement } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { trpc } from '../trpc';
import { httpBatchLink } from '@trpc/client';

export const ReactQueryProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const queryClient = new QueryClient();

  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: import.meta.env.VITE_TRPC_URL || 'http://localhost:3000/trpc',
      }),
    ],
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
