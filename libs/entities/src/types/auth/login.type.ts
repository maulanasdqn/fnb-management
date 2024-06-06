import { z } from 'zod';
import { roleSchema, userSchema } from '../me';

export const loginRequestSchema = z.object({
  userName: z.string().min(1, 'Please enter your username'),
  password: z.string().min(1, 'Please enter your password'),
});

export const loginResponseSchema = z.object({
  user: z.object({
    ...userSchema.shape,
    role: roleSchema.optional(),
  }),
  token: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export type TLoginRequest = z.infer<typeof loginRequestSchema>;
export type TLoginResponse = z.infer<typeof loginResponseSchema>;
