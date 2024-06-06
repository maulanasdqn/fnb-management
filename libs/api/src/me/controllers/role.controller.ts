import {
  queryParamsSchema,
  responseSchema,
  roleResponseSchema,
} from '@fms/entities';
import { router, procedure } from '@fms/trpc-server';
import { findMany, findOne } from '../services/role.service';
import { z } from 'zod';
export const roleController = router({
  findMany: procedure
    .output(responseSchema(roleResponseSchema))
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      return await findMany(input);
    }),

  findOne: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await findOne(input.id);
    }),
});
