import { router, procedure } from '@fms/trpc-server';
//import { findMany, findOne, create, update, destroy } from '../services/recipe.service';
import { findMany } from '../services/recipe.service';
import {
  recipeResponseSchema,
  recipeQueryParamSchema,
  recipeCreateRequestSchema,
  recipeUpdateRequestSchema,
  queryParamsSchema,
} from '@fms/entities';

export const recipeController = router({
  findMany: procedure
    .output(recipeResponseSchema.array())
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      console.log('test')
      return await findMany(input);
    }),

  //  findOne: procedure
  //    .output(recipeResponseSchema)
  //    .input(recipeQueryParamSchema.pick({ id: true }))
  //    .query(async ({ input }) => {
  //      return await findOne(input.id as string);
  //    }),
  //
  //  create: procedure
  //    .output(recipeResponseSchema)
  //    .input(recipeCreateRequestSchema)
  //    .mutation(async ({ input }) => {
  //      console.log("controller", input)
  //      return await create(input);
  //    }),
  //
  //  update: procedure
  //    .output(recipeResponseSchema)
  //    .input(recipeUpdateRequestSchema)
  //    .mutation(async ({ input }) => {
  //      return await update(input);
  //    }),
  //
  //  destroy: procedure
  //    .output(recipeResponseSchema)
  //    .input(recipeQueryParamSchema.pick({ id: true }))
  //    .mutation(async ({ input }) => {
  //      return await destroy(input.id as string);
  //    }),
});
