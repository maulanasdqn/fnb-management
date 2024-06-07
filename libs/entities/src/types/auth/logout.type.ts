import { z } from 'zod';

export const logoutRequestSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});

export type TLogoutRequest = z.infer<typeof logoutRequestSchema>;
