import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';
import { ingredientService } from '../services/ingredient.service';
import {
  ingredientCreateSchema,
  ingredientUpdateSchema,
  queryParamsSchema,
} from '@fms/entities';

export const ingredientController = router({
  findOne: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await ingredientService.findOne(input.id);
    }),

  findMany: procedure.input(queryParamsSchema).query(async ({ input }) => {
    return await ingredientService.findMany(input);
  }),

  create: procedure
    .input(ingredientCreateSchema)
    .mutation(async ({ input }) => {
      return await ingredientService.create(input);
    }),

  update: procedure
    .input(ingredientUpdateSchema)
    .mutation(async ({ input }) => {
      return await ingredientService.update(input);
    }),
});
