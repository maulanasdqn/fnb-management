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
  id: z.string(),
  search: z.string().optional(),
  productCategoryId: z.string().optional(),
});

export const productCreateRequestSchema = z.object({
  name: z.string(),
  price: z.number(),
  priceSelling: z.number(),
  productCategoryId: z.string().optional(),
  image: z.string().nullable(),
  description: z.string().optional().nullable(),
  recipeId: z.string().optional(),
  ...baseSchema.omit({ id: true }).shape,
});

export const productUpdateRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  priceSelling: z.number(),
  productCategoryId: z.string().optional(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  recipeId: z.string().optional(),
  ...baseSchema.omit({ id: true }).shape,
});
