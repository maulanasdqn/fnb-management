import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';

export const purchaseController = router({
  index: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
  detail: procedure.input(z.object({ id: z.string() })).query(({ input }) => {
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
  request: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return input;
    }),
});
