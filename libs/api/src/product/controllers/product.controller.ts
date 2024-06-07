import { router, procedure } from '@fms/trpc-server';
import {
  findMany,
  findOne,
  create,
  update,
  destroy,
} from '../services/product.service';
import {
  responseSchema,
  productSchema,
  productCreateSchema,
  productUpdateSchema,
  queryParamsSchema,
} from '@fms/entities';
import { z } from 'zod';

export const productController = router({
  findMany: procedure
    .output(responseSchema(productSchema))
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

  create: procedure.input(productCreateSchema).mutation(async ({ input }) => {
    return await create(input);
  }),

  update: procedure.input(productUpdateSchema).mutation(async ({ input }) => {
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
