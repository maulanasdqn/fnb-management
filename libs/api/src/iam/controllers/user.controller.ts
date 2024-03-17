import { router, procedure } from '../../common';
import { z } from 'zod';

export const userController = router({
  hello: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
});
