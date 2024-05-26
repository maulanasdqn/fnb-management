import { z } from 'zod';

export const loginRequestSchema = z.object({
  userName: z.string(),
  password: z.string(),
});
