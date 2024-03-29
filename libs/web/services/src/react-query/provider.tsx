import { FC, PropsWithChildren, ReactElement } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { trpc } from '@fms/trpc-client';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

export const ReactQueryProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const queryClient = new QueryClient();

  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        transformer: superjson,
        url: import.meta.env?.['VITE_TRPC_URL'] || 'http://localhost:3000/trpc',
        headers() {
          return {
            cookie: document.cookie,
            authorization: document.cookie,
          };
        },
      }),
    ],
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
