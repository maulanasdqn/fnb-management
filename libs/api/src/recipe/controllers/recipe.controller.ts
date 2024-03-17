import { router, procedure } from '../../common';
import { z } from 'zod';

export const recipeController = router({
  hello: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
});
