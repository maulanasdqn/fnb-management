import { router, procedure } from '@fms/trpc-server';
import { create } from '../services/order.service';
import { orderCreateRequestSchema } from '@fms/entities';

export const orderController = router({
  create: procedure
    .input(orderCreateRequestSchema)
    .mutation(async ({ input }) => {
      return await create(input);
    }),
});
