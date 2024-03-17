import { createTRPCReact } from '@trpc/react-query';
import type { appRouter } from '@fms/trpc-router';

export const trpc = createTRPCReact<appRouter>();
