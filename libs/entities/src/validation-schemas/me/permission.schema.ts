import { z } from 'zod';

export const permissionResponseSchema = z.object({
  name: z.string(),
  id: z.string(),
  parent: z.string(),
  group: z.string(),
  key: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});
