import { z } from 'zod';

export const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  priceSelling: z.number(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export const productQueryParamSchema = z.object({
  id: z.string().optional(),
  search: z.string().optional(),
  productCategoryId: z.string().optional(),
});
