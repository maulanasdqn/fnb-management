import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';

export const orderController = router({
  create: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
});
