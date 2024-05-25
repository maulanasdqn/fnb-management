import { z } from 'zod';

export const permissionResponseSchema = z.object({
  name: z.string(),
  id: z.string(),
});
