import {
  placeCreateSchema,
  placeUpdateSchema,
  queryParamsSchema,
} from '@fms/entities';
import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';
import { placeService } from '../services/place.service';

export const placeController = router({
  index: procedure.input(queryParamsSchema).query(({ input }) => {
    return placeService.paginations(input);
  }),
  detail: procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return placeService.detail(input.id);
  }),
  create: procedure.input(placeCreateSchema).mutation(({ input }) => {
    return placeService.create(input);
  }),
  update: procedure.input(placeUpdateSchema).mutation(({ input }) => {
    return placeService.update(input);
  }),
  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return placeService.delete(input.id);
    }),
});
