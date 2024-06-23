import {
  paymentCreateSchema,
  paymentUpdateSchema,
  queryParamsSchema,
} from '@fms/entities';
import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';
import { paymentService } from '../services/payment.service';

export const paymentController = router({
  index: procedure.input(queryParamsSchema).query(({ input }) => {
    return paymentService.paginations(input);
  }),
  detail: procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return paymentService.detail(input.id);
  }),
  create: procedure.input(paymentCreateSchema).mutation(({ input }) => {
    return paymentService.create(input);
  }),
  update: procedure.input(paymentUpdateSchema).mutation(({ input }) => {
    return paymentService.update(input);
  }),
  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return paymentService.delete(input.id);
    }),
});
