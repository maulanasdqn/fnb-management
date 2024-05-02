import { z } from 'zod';
import { baseSchema } from '../common';
import { recipeDetailResponseSchema, recipeDetailRequestSchema } from './recipe-detail.schema';
export const recipeResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  variants: z.array(z.string()),
  recipeDetails: recipeDetailResponseSchema.array(),
  ...baseSchema.omit({ id: true }).shape,
});

export const recipeQueryParamSchema = z.object({
  search: z.string().optional(),
  ...baseSchema.shape,
});

export const recipeCreateRequestSchema = z.object({
  name: z.string(),
  variants: z.array(z.string()),
  recipeDetails: recipeDetailRequestSchema.array(),
  ...baseSchema.omit({ id: true }).shape,
});

export const recipeUpdateRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  variants: z.array(z.string()),
  recipeDetails: recipeDetailRequestSchema.array(),
  ...baseSchema.omit({ id: true }).shape,
});
