import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';
import { findManyProducts } from '../services/product.service';

export const productController = router({
  findMany: procedure
    .input(
      z.object({
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return await findManyProducts(input);
    }),
});
