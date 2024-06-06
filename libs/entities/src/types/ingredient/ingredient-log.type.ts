import { z } from 'zod';
import { baseSchema } from '../common';

export const ingredientLogSchema = z.object({
  ingredient: z.object({
    id: z.string(),
    name: z.string(),
  }),
  amountBefore: z.number(),
  amountAfter: z.number(),
  amountCurrent: z.number(),
  ...baseSchema.shape,
});
