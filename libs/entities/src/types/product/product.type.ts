import { baseSchema, TBaseResponse } from '../common';
import { z } from 'zod';
import { variantProductSchema } from '../variant';
import { recipeIngredientSchema, recipeSchema } from '../recipe';

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  priceSelling: z.number(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  variants: z.array(variantProductSchema).optional().nullable(),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional()
    .nullable(),
  recipe: recipeSchema.optional().nullable(),
  ...baseSchema.omit({ id: true }).shape,
});

export const productCreateSchema = z.object({
  name: z.string(),
  priceSelling: z.number(),
  productCategoryId: z.string(),
  recipeId: z.string(),
  image: z.string().nullable(),
  description: z.string().optional().nullable(),
});

export const productUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  priceSelling: z.number().optional(),
  productCategoryId: z.string().optional(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  recipeId: z.string().optional(),
});

export type TProduct = z.infer<typeof productSchema>;
export type TProductSingleResponse = TBaseResponse<TProduct>;
export type TProductResponse = TBaseResponse<
  Omit<TProduct, 'recipe' | 'variants'>[]
>;
export type TProductCreateRequest = z.infer<typeof productCreateSchema>;
export type TProductUpdateRequest = z.infer<typeof productUpdateSchema>;
