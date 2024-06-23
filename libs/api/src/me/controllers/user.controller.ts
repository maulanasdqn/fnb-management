import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';

import { userService } from '../services/user.service';
import {
  queryParamsSchema,
  userCreateSchema,
  userUpdateSchema,
} from '@fms/entities';

export const userController = router({
  index: procedure.input(queryParamsSchema).query(({ input }) => {
    return userService.pagination(input);
  }),
  detail: procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return userService.detail(input.id);
  }),
  create: procedure.input(userCreateSchema).mutation(({ input }) => {
    return userService.create(input);
  }),
  update: procedure.input(userUpdateSchema).mutation(({ input }) => {
    return userService.update(input);
  }),
  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return userService.delete(input.id);
    }),
});
