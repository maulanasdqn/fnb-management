import { z } from 'zod';
import { baseSchema } from '../common';

export const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  priceSelling: z.number(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  ...baseSchema.omit({ id: true }).shape,
});

export const productQueryParamSchema = z.object({
  search: z.string().optional(),
  productCategoryId: z.string().optional(),
  ...baseSchema.shape,
});
