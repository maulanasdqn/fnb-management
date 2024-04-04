import { router, procedure } from '@fms/trpc-server';
import { deleteData, findMany, findOne } from '../services/product.service';
import { productResponseSchema, productQueryParamSchema } from '@fms/entities';

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

  delete: procedure
    .input(productQueryParamSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      return await deleteData(input.id as string);
    }),
});
