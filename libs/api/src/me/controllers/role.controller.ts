import {
  queryParamsSchema,
  responseSchema,
  roleCreateSchema,
  roleSchema,
  roleUpdateSchema,
} from '@fms/entities';
import { router, procedure } from '@fms/trpc-server';
import { findMany, findOne, create, update } from '../services/role.service';
import { z } from 'zod';
export const roleController = router({
  findMany: procedure
    .output(responseSchema(roleSchema))
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
  create: procedure.input(roleCreateSchema).mutation(async ({ input }) => {
    return await create(input);
  }),
  update: procedure.input(roleUpdateSchema).mutation(async ({ input }) => {
    return await update(input);
  }),
  delete: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await findOne(input.id);
    }),
});
