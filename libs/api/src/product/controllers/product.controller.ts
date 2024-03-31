import { router, procedure } from '@fms/trpc-server';
import { findMany, findOne, create, update, destroy } from '../services/product.service';
import {
  productResponseSchema,
  productQueryParamSchema,
  productCreateRequestSchema,
  productUpdateRequestSchema
} from '@fms/entities';

export const productController = router({
  findMany: procedure
    .output(productResponseSchema.array())
    .input(productQueryParamSchema)
    .query(async ({ input }) => {
      return await findMany(input);
    }),

  findOne: procedure
    .output(productResponseSchema)
    .input(productQueryParamSchema.pick({ id: true }))
    .query(async ({ input }) => {
      return await findOne(input.id as string);
    }),

  create: procedure
    .output(productResponseSchema)
    .input(productCreateRequestSchema)
    .mutation(async ({ input }) => {
      return await create(input);
    }),

  update: procedure
    .output(productResponseSchema)
    .input(productUpdateRequestSchema)
    .mutation(async ({ input }) => {
      return await update(input);
    }),

  destroy: procedure
    .output(productResponseSchema)
    .input(productQueryParamSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      return await destroy(input.id as string);
    }),
});
