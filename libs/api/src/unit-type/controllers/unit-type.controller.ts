import { router, procedure } from '@fms/trpc-server';
import { unitTypeService } from '../services/unit-type.service';
import {
  unitTypeCreateSchema,
  unitTypeUpdateSchema,
  queryParamsSchema,
} from '@fms/entities';
import { z } from 'zod';
export const unitTypeController = router({
  create: procedure.input(unitTypeCreateSchema).mutation(async ({ input }) => {
    return await unitTypeService.create(input);
  }),
  update: procedure.input(unitTypeUpdateSchema).mutation(async ({ input }) => {
    return await unitTypeService.update(input);
  }),
  delete: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await unitTypeService.delete(input.id);
    }),
  index: procedure.input(queryParamsSchema).query(async ({ input }) => {
    return await unitTypeService.pagination(input);
  }),
  detail: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await unitTypeService.detail(input.id);
    }),
});
