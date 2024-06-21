import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';
import { purchaseService } from '../services/purchase.service';
import {
  purchaseApprovalSchema,
  purchaseCreateSchema,
  purchaseUpdateSchema,
  queryParamsSchema,
} from '@fms/entities';

export const purchaseController = router({
  index: procedure.input(queryParamsSchema).query(({ input }) => {
    return purchaseService.pagination(input);
  }),
  detail: procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return purchaseService.findOne(input.id);
  }),
  create: procedure.input(purchaseCreateSchema).mutation(({ input }) => {
    return purchaseService.create(input);
  }),
  update: procedure.input(purchaseUpdateSchema).mutation(({ input }) => {
    return purchaseService.update(input);
  }),
  requestPurhase: procedure
    .input(purchaseCreateSchema)
    .mutation(({ input }) => {
      return purchaseService.requestPurhase(input);
    }),
  approval: procedure.input(purchaseApprovalSchema).mutation(({ input }) => {
    return purchaseService.approval(input);
  }),
});
