import { queryParamsSchema } from '@fms/entities';
import { router, procedure } from '@fms/trpc-server';
import { findMany } from '../services/permission.service';

export const permissionController = router({
  findMany: procedure.input(queryParamsSchema).query(async ({ input }) => {
    return await findMany(input);
  }),
});
