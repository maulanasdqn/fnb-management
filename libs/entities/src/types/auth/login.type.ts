import { z } from 'zod';

export const loginRequestSchema = z.object({
  userName: z.string().min(1, 'Please enter your username'),
  password: z.string().min(1, 'Please enter your password'),
});

export type TLoginRequest = z.infer<typeof loginRequestSchema>;
