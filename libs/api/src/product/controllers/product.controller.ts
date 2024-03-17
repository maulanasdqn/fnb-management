import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';

export const productController = router({
  hello: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
});
