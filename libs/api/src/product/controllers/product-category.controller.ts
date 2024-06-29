import { router, procedure } from '@fms/trpc-server';

import {
  responseSchema,
  productCategorySchema,
  productCategoryCreateSchema,
  productCategoryUpdateSchema,
  queryParamsSchema,
} from '@fms/entities';
import { z } from 'zod';
import { productCategoryService } from '../services/product-category.service';

export const productCategoryController = router({
  findMany: procedure
    .output(responseSchema(productCategorySchema))
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      return await productCategoryService.pagination(input);
    }),

  findOne: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await productCategoryService.detail(input?.id as string);
    }),

  create: procedure
    .input(productCategoryCreateSchema)
    .mutation(async ({ input }) => {
      return await productCategoryService.create(input);
    }),

  update: procedure
    .input(productCategoryUpdateSchema)
    .mutation(async ({ input }) => {
      return await productCategoryService.update(input);
    }),

  delete: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await productCategoryService.delete(input.id as string);
    }),
});
