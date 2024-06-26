import { router, procedure } from '@fms/trpc-server';
import {
  orderCreateSchema,
  orderUpdateSchema,
  queryParamsSchema,
} from '@fms/entities';

import { orderService } from '../services/order.service';
import { z } from 'zod';

export const orderController = router({
  create: procedure.input(orderCreateSchema).mutation(async ({ input }) => {
    return await orderService.create(input);
  }),
  update: procedure.input(orderUpdateSchema).mutation(async ({ input }) => {
    return await orderService.update(input);
  }),
  findMany: procedure.input(queryParamsSchema).query(async ({ input }) => {
    return await orderService.pagination(input);
  }),
  findOne: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return;
    }),
});
