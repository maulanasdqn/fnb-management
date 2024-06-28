import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';
import { stockOpenameService } from '../services/stock-opname.service';
import {
  queryParamsSchema,
  stockOpnameCreateSchema,
  stockOpnameUpdateSchema,
} from '@fms/entities';
export const stockOpnameController = router({
  index: procedure.input(queryParamsSchema).query(({ input }) => {
    return stockOpenameService.pagination(input);
  }),
  detail: procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return stockOpenameService.detail(input.id);
  }),
  create: procedure.input(stockOpnameCreateSchema).mutation(({ input }) => {
    return stockOpenameService.create(input);
  }),
  update: procedure.input(stockOpnameUpdateSchema).mutation(({ input }) => {
    return stockOpenameService.update(input);
  }),
  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return stockOpenameService.delete(input.id);
    }),
});
