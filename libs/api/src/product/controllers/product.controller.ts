import { router, procedure } from '@fms/trpc-server';
import {
  findMany,
  findOne,
  create,
  update,
  destroy,
} from '../services/product.service';
import {
  productResponseSchema,
  productQueryParamSchema,
  productCreateRequestSchema,
  productUpdateRequestSchema,
  queryParamsSchema,
  dataResponseSchema,
  dataSingleResponseSchema,
} from '@fms/entities';

export const productController = router({
  findMany: procedure
    .output(dataResponseSchema(productResponseSchema))
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      return await findMany(input);
    }),

  findOne: procedure
    .output(dataSingleResponseSchema(productResponseSchema))
    .input(productQueryParamSchema.pick({ id: true }))
    .query(async ({ input }) => {
      return await findOne(input?.id as string);
    }),

  create: procedure
    .output(dataSingleResponseSchema(productResponseSchema))
    .input(productCreateRequestSchema)
    .mutation(async ({ input }) => {
      return await create(input);
    }),

  update: procedure
    .output(dataSingleResponseSchema(productResponseSchema))
    .input(productUpdateRequestSchema)
    .mutation(async ({ input }) => {
      return await update(input);
    }),

  destroy: procedure
    .output(dataSingleResponseSchema(productResponseSchema))
    .input(productQueryParamSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      return await destroy(input.id as string);
    }),

  delete: procedure
    .input(productQueryParamSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      return await destroy(input.id as string);
    }),
});
