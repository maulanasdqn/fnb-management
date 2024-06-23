import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';

export const variantController = router({
  index: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return input;
  }),
  detail: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return input;
  }),
  create: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
  update: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
  delete: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
});
