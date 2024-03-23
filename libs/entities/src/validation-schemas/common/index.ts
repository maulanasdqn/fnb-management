import { z } from 'zod';

export const baseSchema = z.object({
  id: z.string(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
});

export const queryParamsSchema = z
  .object({
    id: z.string().optional(),
    search: z.string().optional(),
  })
  .optional();
