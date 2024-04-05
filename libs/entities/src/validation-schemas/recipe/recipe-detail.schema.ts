import { z } from 'zod';
import { baseSchema } from '../common';
import { itemResponseSchema } from '../item';

export const recipeDetailResponseSchema = z.object({
  id: z.string(),
  item: itemResponseSchema,
  amount: z.number(),
  ...baseSchema.omit({ id: true }).shape,
});

export const recipeDetailRequestSchema = z.object({
  itemId: z.string(),
  amount: z.number(),
  ...baseSchema.omit({ id: true }).shape,
});
