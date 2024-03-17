import { router, procedure } from '../../common';
import { z } from 'zod';

export const roleController = router({
  hello: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
});
