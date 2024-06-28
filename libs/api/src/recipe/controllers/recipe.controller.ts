import { router, procedure } from '@fms/trpc-server';

import {
  queryParamsSchema,
  recipeCreateSchema,
  recipeUpdateSchema,
} from '@fms/entities';
import { z } from 'zod';
import { recipeService } from '../services/recipe.service';
export const recipeController = router({
  index: procedure.input(queryParamsSchema).query(async ({ input }) => {
    return await recipeService.pagination(input);
  }),

  detail: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await recipeService.detail(input.id);
    }),

  create: procedure.input(recipeCreateSchema).mutation(async ({ input }) => {
    return await recipeService.create(input);
  }),

  update: procedure.input(recipeUpdateSchema).mutation(async ({ input }) => {
    return await recipeService.update(input);
  }),

  delete: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await recipeService.delete(input.id);
    }),
});
