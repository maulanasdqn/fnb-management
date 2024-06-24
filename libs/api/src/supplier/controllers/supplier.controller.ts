import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';

import { supplierService } from '../services/supplier.service';
import {
  queryParamsSchema,
  supplierCreateSchema,
  supplierUpdateSchema,
} from '@fms/entities';

export const supplierController = router({
  index: procedure.input(queryParamsSchema).query(({ input }) => {
    return supplierService.pagination(input);
  }),
  detail: procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return supplierService.detail(input.id);
  }),
  create: procedure.input(supplierCreateSchema).mutation(({ input }) => {
    return supplierService.create(input);
  }),
  update: procedure.input(supplierUpdateSchema).mutation(({ input }) => {
    return supplierService.update(input);
  }),
  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return supplierService.delete(input.id);
    }),
});
