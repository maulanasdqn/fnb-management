import { router, procedure } from '@fms/trpc-server';
import {
  findMany,
  findOne,
  create,
  update,
  destroy,
} from '../services/item.service';
import {
  itemResponseSchema,
  itemQueryParamSchema,
  itemCreateRequestSchema,
  itemUpdateRequestSchema,
  queryParamsSchema,
} from '@fms/entities';

export const itemController = router({
  findMany: procedure
    .output(itemResponseSchema.array())
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      return await findMany(input);
    }),

  findOne: procedure
    .output(itemResponseSchema)
    .input(itemQueryParamSchema.pick({ id: true }))
    .query(async ({ input }) => {
      return await findOne(input.id as string);
    }),

  create: procedure
    .output(itemResponseSchema)
    .input(itemCreateRequestSchema)
    .mutation(async ({ input }) => {
      console.log('controller', input);
      return await create(input);
    }),

  update: procedure
    .output(itemResponseSchema)
    .input(itemUpdateRequestSchema)
    .mutation(async ({ input }) => {
      return await update(input);
    }),

  destroy: procedure
    .output(itemResponseSchema)
    .input(itemQueryParamSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      return await destroy(input.id as string);
    }),
});
