import { z } from 'zod';

export const roleResponseSchema = z.object({
  name: z.string(),
  id: z.string(),
  permissions: z.array(z.object({ name: z.string(), id: z.string() })),
});
