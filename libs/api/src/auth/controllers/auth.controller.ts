import { loginRequestSchema, logoutRequestSchema } from '@fms/entities';
import { router, procedure } from '@fms/trpc-server';
import { login } from '../services/auth.service';

export const authController = router({
  login: procedure.input(loginRequestSchema).mutation(async ({ input }) => {
    return await login(input);
  }),
  logout: procedure.input(logoutRequestSchema).mutation(({ input }) => {
    return input;
  }),
});
