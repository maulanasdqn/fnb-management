import { router, procedure } from '@fms/trpc-server';
import { findMany } from '../services/product.service';
import { productResponseSchema, productQueryParamSchema } from '@fms/entities';

export const productController = router({
  findMany: procedure
    .output(productResponseSchema.array())
    .input(productQueryParamSchema)
    .query(async ({ input }) => {
      return await findMany(input);
    }),
});
