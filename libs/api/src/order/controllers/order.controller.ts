import { router, procedure } from '@fms/trpc-server';
import { create, findMany,findOne } from '../services/order.service';
import {
  orderCreateRequestSchema,
  orderQueryParamSchema,
} from '@fms/entities';

export const orderController = router({
  create: procedure
    .input(orderCreateRequestSchema)
    .mutation(async ({ input }) => {
      return await create(input);
    }),

  findMany: procedure
  .query(async () => {
    return findMany();
  }),
  findOne: procedure
    .input(orderQueryParamSchema.pick({ id: true }))
    .query(async ({ input }) => {
      return await findOne(input?.id as string);
    }),
});
