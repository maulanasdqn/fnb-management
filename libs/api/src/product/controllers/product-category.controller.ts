import { router, procedure } from '@fms/trpc-server';

import {
  queryParamsSchema,
  responseSchema,
  productCategorySchema,
  productCategoryCreateSchema,
  productCategoryUpdateSchema,
} from '@fms/entities';
import { z } from 'zod';

import {
  findMany,
  findOne,
  create,
  update,
  destroy,
} from '../services/product-category.service';

export const productCategoryController = router({
  findMany: procedure
    .output(responseSchema(productCategorySchema))
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      return await findMany(input);
    }),

  findOne: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await findOne(input?.id as string);
    }),

  create: procedure
    .input(productCategoryCreateSchema)
    .mutation(async ({ input }) => {
      return await create(input);
    }),

  update: procedure
    .input(productCategoryUpdateSchema)
    .mutation(async ({ input }) => {
      return await update(input);
    }),

  delete: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await destroy(input.id as string);
    }),
});
