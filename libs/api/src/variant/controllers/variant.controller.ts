import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';
import { variantService } from '../services/variant.service';
import {
  queryParamsSchema,
  variantOptionCreateSchema,
  variantOptionUpdateSchema,
} from '@fms/entities';
export const variantController = router({
  index: procedure.input(queryParamsSchema).query(({ input }) => {
    return variantService.pagination(input);
  }),
  detail: procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return variantService.detail(input.id);
  }),
  create: procedure.input(variantOptionCreateSchema).mutation(({ input }) => {
    return variantService.create(input);
  }),
  update: procedure.input(variantOptionUpdateSchema).mutation(({ input }) => {
    return variantService.update(input);
  }),
  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return variantService.delete(input.id);
    }),
});
