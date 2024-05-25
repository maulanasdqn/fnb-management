import {
  queryParamsSchema,
  responseSchema,
  roleResponseSchema,
} from '@fms/entities';
import { router, procedure } from '@fms/trpc-server';
import { findMany } from '../services/role.service';
export const roleController = router({
  findMany: procedure
    .output(responseSchema(roleResponseSchema))
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      return await findMany(input);
    }),
});
