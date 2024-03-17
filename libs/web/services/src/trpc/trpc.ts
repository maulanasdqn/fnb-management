import { createTRPCReact } from '@trpc/react-query';
import type { TrpcController } from '@fms/api';

export const trpc = createTRPCReact<TrpcController>();
