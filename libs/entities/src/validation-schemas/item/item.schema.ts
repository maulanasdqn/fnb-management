import { z } from 'zod';
import { baseSchema } from '../common';

export const itemResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  itemAmountTypeId: z.string(),
  itemAmount: z.string().nullable(),
  ingredientUnit: z.string().nullable(),
  ingredientAmount: z.string().nullable(),
  ...baseSchema.omit({ id: true }).shape,
});

export const itemQueryParamSchema = z.object({
  search: z.string().optional(),
  ...baseSchema.shape,
});

export const itemCreateRequestSchema = z.object({
  name: z.string(),
  price: z.number(),
  itemAmountTypeId: z.string(),
  itemAmount: z.string().nullable(),
  ingredientUnit: z.enum(['ml', 'g']).nullable(),
  ingredientAmount: z.string().nullable(),
  quantity: z.number().default(0),
  ...baseSchema.omit({ id: true }).shape,
});

export const itemUpdateRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  itemAmountTypeId: z.string(),
  itemAmount: z.string().nullable(),
  ingredientUnit: z.enum(['ml', 'g']).nullable(),
  ingredientAmount: z.string().nullable(),
  ...baseSchema.omit({ id: true }).shape,
});
