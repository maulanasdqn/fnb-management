import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
export const createContext = () => ({});

type TrpcContext = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const procedure = t.procedure;
